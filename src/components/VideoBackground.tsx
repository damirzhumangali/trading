import { useEffect, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";

type VideoBackgroundProps = {
  src: string;
  className?: string;
  videoClassName?: string;
};

export function VideoBackground({
  src,
  className,
  videoClassName,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasSource = useMemo(
    () => Boolean(src) && !src.startsWith("[TODO"),
    [src],
  );

  useEffect(() => {
    if (!hasSource || !videoRef.current) {
      return;
    }

    const video = videoRef.current;
    let cancelled = false;
    let hls:
      | {
          destroy: () => void;
          loadSource: (nextSource: string) => void;
          attachMedia: (media: HTMLVideoElement) => void;
        }
      | undefined;

    const attach = async () => {
      if (src.endsWith(".m3u8")) {
        const { default: Hls } = await import("hls.js");

        if (cancelled) {
          return;
        }

        if (Hls.isSupported()) {
          const instance = new Hls({
            autoStartLoad: true,
            enableWorker: true,
          });
          instance.loadSource(src);
          instance.attachMedia(video);
          hls = instance;
          return;
        }

        if (video.canPlayType("application/vnd.apple.mpegurl")) {
          video.src = src;
        }
        return;
      }

      video.src = src;
    };

    void attach();

    return () => {
      cancelled = true;
      hls?.destroy();
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [hasSource, src]);

  return (
    <div className={cn("absolute inset-0", className)} aria-hidden="true">
      {hasSource ? (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className={cn("absolute inset-0 h-full w-full object-cover", videoClassName)}
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(110%_90%_at_50%_18%,rgba(224,197,151,0.18),transparent_48%),linear-gradient(180deg,rgba(255,255,255,0.06),transparent_24%),linear-gradient(135deg,rgba(111,52,29,0.9),rgba(24,18,16,0.96))]" />
      )}
    </div>
  );
}
