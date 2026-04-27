import { useEffect, useRef } from "react";
import type { RefObject } from "react";

type VideoScrubSequenceProps = {
  videoSrc: string;
  posterSrc?: string;
  className?: string;
  scrollTargetRef: RefObject<HTMLElement>;
  onDecodeError?: () => void;
};

export function VideoScrubSequence({
  videoSrc,
  posterSrc,
  className,
  scrollTargetRef,
  onDecodeError,
}: VideoScrubSequenceProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);
  const durationRef = useRef(0);
  const visibleRef = useRef(true);
  const prefersReduced = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    const onLoadedMetadata = () => {
      durationRef.current = video.duration || 0;
      if (prefersReduced.current && durationRef.current > 0) {
        video.currentTime = durationRef.current * 0.5;
      }
    };

    const onLoadedData = () => {
      if (!prefersReduced.current && video.currentTime === 0) {
        video.currentTime = 0.001;
      }
    };

    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("loadeddata", onLoadedData);

    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("loadeddata", onLoadedData);
    };
  }, []);

  useEffect(() => {
    const element = scrollTargetRef.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [scrollTargetRef]);

  useEffect(() => {
    const currentProgress = () => {
      const element = scrollTargetRef.current;
      if (!element) {
        return 0;
      }

      const rect = element.getBoundingClientRect();
      const total = element.offsetHeight - window.innerHeight;
      return total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
    };

    const tick = () => {
      const video = videoRef.current;
      if (
        video &&
        visibleRef.current &&
        !prefersReduced.current &&
        durationRef.current > 0
      ) {
        const progress = currentProgress();
        const targetTime = progress * durationRef.current;
        if (Math.abs(video.currentTime - targetTime) > 1 / 30) {
          video.currentTime = targetTime;
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [scrollTargetRef]);

  return (
    <video
      ref={videoRef}
      aria-hidden="true"
      className={className}
      muted
      playsInline
      preload="auto"
      poster={posterSrc}
      src={videoSrc}
      onError={onDecodeError}
      style={{ objectFit: "cover" }}
    />
  );
}
