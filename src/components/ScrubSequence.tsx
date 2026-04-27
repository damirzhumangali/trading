import { useEffect, useRef } from "react";
import type { RefObject } from "react";

export type ScrubSequenceProps = {
  framesPath: string;
  frameCount: number;
  ext?: "jpg" | "webp" | "svg";
  className?: string;
  scrollTargetRef: RefObject<HTMLElement>;
};

const pad4 = (n: number) => String(n).padStart(4, "0");

export function ScrubSequence({
  framesPath,
  frameCount,
  ext = "svg",
  className,
  scrollTargetRef,
}: ScrubSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const rafRef = useRef<number | null>(null);
  const visible = useRef(true);
  const prefersReduced = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const imgs: HTMLImageElement[] = [];
    const urls = Array.from(
      { length: frameCount },
      (_, index) => `${framesPath}/frame_${pad4(index + 1)}.${ext}`,
    );

    const first = new Image();
    first.src = urls[0];
    first.fetchPriority = "high";
    imgs[0] = first;

    urls.slice(1).forEach((src, index) => {
      const image = new Image();
      image.src = src;
      imgs[index + 1] = image;
    });

    imagesRef.current = imgs;
  }, [ext, frameCount, framesPath]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      drawFrame(currentIndex());
    };

    resize();
    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const element = scrollTargetRef.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting;
      },
      { threshold: 0 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [scrollTargetRef]);

  useEffect(() => {
    const tick = () => {
      if (visible.current && !prefersReduced.current) {
        drawFrame(currentIndex());
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!prefersReduced.current) {
      return;
    }

    const mid = Math.floor(frameCount / 2);
    const image = imagesRef.current[mid];

    if (image?.complete) {
      drawImage(image);
      return;
    }

    image?.addEventListener("load", () => drawImage(image), { once: true });
  }, [frameCount]);

  const currentIndex = () => {
    const element = scrollTargetRef.current;
    if (!element) {
      return 0;
    }

    const rect = element.getBoundingClientRect();
    const total = element.offsetHeight - window.innerHeight;
    const progress =
      total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;

    return Math.min(
      frameCount - 1,
      Math.floor(progress * (frameCount - 1)),
    );
  };

  const drawFrame = (index: number) => {
    const image = imagesRef.current[index];
    if (image && image.complete && image.naturalWidth > 0) {
      drawImage(image);
    }
  };

  const drawImage = (image: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const { width: canvasWidth, height: canvasHeight } = canvas;
    const { naturalWidth: imageWidth, naturalHeight: imageHeight } = image;
    const scale = Math.max(canvasWidth / imageWidth, canvasHeight / imageHeight);
    const drawWidth = imageWidth * scale;
    const drawHeight = imageHeight * scale;
    const dx = (canvasWidth - drawWidth) / 2;
    const dy = (canvasHeight - drawHeight) / 2;

    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.drawImage(image, dx, dy, drawWidth, drawHeight);
  };

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ transform: "translateZ(0)", willChange: "contents" }}
    />
  );
}
