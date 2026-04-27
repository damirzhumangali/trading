import AVFoundation
import CoreImage
import CoreGraphics
import Foundation
import ImageIO
import UniformTypeIdentifiers

enum ExtractFramesError: Error, LocalizedError {
  case invalidArguments
  case invalidDuration
  case couldNotWriteFrame(URL)

  var errorDescription: String? {
    switch self {
    case .invalidArguments:
      return "Usage: swift scripts/extract-frames.swift <input.mp4> <output-dir> [fps] [max-width] [jpeg-quality]"
    case .invalidDuration:
      return "The video duration could not be read."
    case let .couldNotWriteFrame(url):
      return "Could not write frame to \(url.path)."
    }
  }
}

@main
enum ExtractFrames {
  static func main() async throws {
    let args = CommandLine.arguments
    guard args.count >= 3 else {
      throw ExtractFramesError.invalidArguments
    }

    let inputURL = URL(fileURLWithPath: args[1])
    let outputDirURL = URL(fileURLWithPath: args[2], isDirectory: true)
    let fps = args.count > 3 ? max(1, Int(args[3]) ?? 24) : 24
    let maxWidth = args.count > 4 ? max(640, Int(args[4]) ?? 1600) : 1600
    let jpegQuality = args.count > 5 ? min(max(Double(args[5]) ?? 0.82, 0.1), 1.0) : 0.82

    let fileManager = FileManager.default
    try fileManager.createDirectory(at: outputDirURL, withIntermediateDirectories: true)

    if let existing = try? fileManager.contentsOfDirectory(
      at: outputDirURL,
      includingPropertiesForKeys: nil
    ) {
      for fileURL in existing where fileURL.lastPathComponent.hasPrefix("frame_") && fileURL.pathExtension.lowercased() == "jpg" {
        try? fileManager.removeItem(at: fileURL)
      }
    }

    let asset = AVURLAsset(url: inputURL)
    let duration = try await asset.load(.duration)
    let durationSeconds = CMTimeGetSeconds(duration)
    guard durationSeconds.isFinite, durationSeconds > 0 else {
      throw ExtractFramesError.invalidDuration
    }

    let tracks = try await asset.loadTracks(withMediaType: .video)
    guard let track = tracks.first else {
      throw ExtractFramesError.invalidDuration
    }

    let preferredTransform = try await track.load(.preferredTransform)
    let expectedFrameCount = max(1, Int(floor(durationSeconds * Double(fps))))
    let reader = try AVAssetReader(asset: asset)
    let output = AVAssetReaderTrackOutput(
      track: track,
      outputSettings: [
        kCVPixelBufferPixelFormatTypeKey as String: Int(kCVPixelFormatType_32BGRA),
      ]
    )
    output.alwaysCopiesSampleData = false

    guard reader.canAdd(output) else {
      throw ExtractFramesError.invalidDuration
    }

    reader.add(output)
    guard reader.startReading() else {
      throw reader.error ?? ExtractFramesError.invalidDuration
    }

    print("duration_seconds=\(String(format: "%.3f", durationSeconds))")
    print("fps=\(fps)")
    print("expected_frame_count=\(expectedFrameCount)")
    print("output_dir=\(outputDirURL.path)")

    let captureStep = 1.0 / Double(fps)
    let ciContext = CIContext()
    var nextCaptureSeconds = 0.0
    var writtenFrames = 0

    while let sampleBuffer = output.copyNextSampleBuffer() {
      let presentationTime = CMSampleBufferGetPresentationTimeStamp(sampleBuffer)
      let presentationSeconds = CMTimeGetSeconds(presentationTime)
      if !presentationSeconds.isFinite {
        continue
      }

      if presentationSeconds + captureStep * 0.35 < nextCaptureSeconds {
        continue
      }

      guard let imageBuffer = CMSampleBufferGetImageBuffer(sampleBuffer) else {
        continue
      }

      try autoreleasepool {
        var image = CIImage(cvPixelBuffer: imageBuffer).transformed(by: preferredTransform)
        let transformedExtent = image.extent.integral
        image = image.transformed(
          by: CGAffineTransform(
            translationX: -transformedExtent.origin.x,
            y: -transformedExtent.origin.y
          )
        )

        let translatedExtent = image.extent.integral
        let width = max(translatedExtent.width, 1)
        let scale = min(1.0, CGFloat(maxWidth) / width)
        if scale < 1 {
          image = image.transformed(by: CGAffineTransform(scaleX: scale, y: scale))
        }

        let finalExtent = image.extent.integral
        guard let cgImage = ciContext.createCGImage(image, from: finalExtent) else {
          return
        }

        let filename = String(format: "frame_%04d.jpg", writtenFrames + 1)
        let outputURL = outputDirURL.appendingPathComponent(filename)
        try writeJPEG(cgImage, to: outputURL, quality: jpegQuality)
        writtenFrames += 1
        nextCaptureSeconds += captureStep
      }

      if writtenFrames.isMultiple(of: 24) {
        print("progress=\(writtenFrames)")
      }
    }

    print("frame_count=\(writtenFrames)")
  }

  static func writeJPEG(_ image: CGImage, to outputURL: URL, quality: Double) throws {
    guard let destination = CGImageDestinationCreateWithURL(
      outputURL as CFURL,
      UTType.jpeg.identifier as CFString,
      1,
      nil
    ) else {
      throw ExtractFramesError.couldNotWriteFrame(outputURL)
    }

    let properties = [
      kCGImageDestinationLossyCompressionQuality: quality,
    ] as CFDictionary

    CGImageDestinationAddImage(destination, image, properties)

    guard CGImageDestinationFinalize(destination) else {
      throw ExtractFramesError.couldNotWriteFrame(outputURL)
    }
  }
}
