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
        <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(92%_74%_at_50%_12%,rgba(230,215,189,0.14),transparent_42%),radial-gradient(52%_44%_at_18%_74%,rgba(124,66,40,0.34),transparent_64%),radial-gradient(44%_38%_at_82%_24%,rgba(212,167,106,0.16),transparent_56%),linear-gradient(180deg,rgba(255,255,255,0.06),transparent_22%),linear-gradient(135deg,rgba(101,48,28,0.92),rgba(21,16,14,0.97))]">
          <div className="absolute left-[8%] top-[14%] h-48 w-48 rounded-full bg-primary/20 blur-3xl animate-[float_18s_ease-in-out_infinite_alternate]" />
          <div className="absolute right-[12%] top-[18%] h-64 w-64 rounded-full bg-foreground/8 blur-3xl animate-[sway_22s_ease-in-out_infinite_alternate]" />
          <div className="absolute bottom-[10%] left-[22%] h-56 w-56 rounded-full bg-secondary/26 blur-3xl animate-[float_24s_ease-in-out_infinite_alternate-reverse]" />
          <div className="absolute inset-[12%] rounded-[40px] border border-white/8 bg-white/[0.03]" />
          <div className="absolute inset-0 noise opacity-45" />
        </div>
      )}
    </div>
  );
}
