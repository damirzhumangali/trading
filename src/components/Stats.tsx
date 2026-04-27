import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { VideoBackground } from "@/components/VideoBackground";
import { STATS, STATS_BG_VIDEO, STATS_VIDEO_TODO } from "@/lib/constants";

function AnimatedStatValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const match = useMemo(() => value.match(/^(\d+)(.*)$/), [value]);
  const target = match ? Number(match[1]) : null;
  const suffix = match?.[2] ?? "";
  const [display, setDisplay] = useState<string | number>(target ? 0 : value);

  useEffect(() => {
    if (!inView || target === null) {
      return;
    }

    let frameId = 0;
    const duration = 1200;
    const start = performance.now();

    const tick = (time: number) => {
      const progress = Math.min(1, (time - start) / duration);
      const nextValue = Math.round(target * progress);
      setDisplay(`${nextValue}${suffix}`);
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [inView, suffix, target]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="font-display text-5xl leading-none italic text-foreground md:text-6xl lg:text-7xl"
    >
      {display}
    </motion.span>
  );
}

export function Stats() {
  const hasVideo = Boolean(STATS_BG_VIDEO) && !STATS_BG_VIDEO.startsWith("[TODO");

  return (
    <section className="relative overflow-hidden py-32 md:py-44">
      <VideoBackground
        src={STATS_BG_VIDEO}
        videoClassName="object-cover saturate-0"
      />
      <div className="absolute inset-x-0 top-0 h-[200px] gradient-fade-t" />
      <div className="absolute bottom-0 inset-x-0 h-[200px] gradient-fade-b" />

      {!hasVideo ? (
        <div className="absolute left-6 top-6 z-10">
          <span className="liquid-glass rounded-full px-4 py-1.5 text-xs text-foreground/80">
            {STATS_VIDEO_TODO}
          </span>
        </div>
      ) : null}

      <div className="liquid-glass relative z-10 mx-[var(--gutter)] rounded-[32px] p-10 md:mx-auto md:max-w-[var(--max)] md:p-14">
        <div className="relative grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          <div className="absolute left-1/4 top-1/2 hidden h-12 w-px -translate-y-1/2 bg-border md:block" />
          <div className="absolute left-2/4 top-1/2 hidden h-12 w-px -translate-y-1/2 bg-border md:block" />
          <div className="absolute left-3/4 top-1/2 hidden h-12 w-px -translate-y-1/2 bg-border md:block" />

          {STATS.map((stat) => (
            <div key={stat.label}>
              <AnimatedStatValue value={stat.value} />
              <p className="mt-3 text-sm uppercase tracking-wide text-foreground/60">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
