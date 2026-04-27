import { useEffect, useState } from "react";
import type { RefObject } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Play } from "lucide-react";
import { BlurText } from "@/components/BlurText";
import { ScrubSequence } from "@/components/ScrubSequence";
import { Button } from "@/components/ui/button";
import {
  BRAND_TAGLINE,
  CTA_HREF,
  FRAME_COUNT,
  FRAME_EXT,
  FRAMES_PATH,
  HERO_CTA_PRIMARY,
  HERO_CTA_SECONDARY,
  HERO_HEADLINE,
  HERO_SUB,
  HERO_VIDEO_SUMMARY,
  NEW_LABEL,
  PARTNERS,
  TRUSTED_BY_LABEL,
} from "@/lib/constants";

type HeroProps = {
  scrollRef: RefObject<HTMLElement>;
};

export function Hero({ scrollRef }: HeroProps) {
  const [hasFrames, setHasFrames] = useState<boolean | null>(null);

  useEffect(() => {
    const image = new Image();
    image.onload = () => setHasFrames(true);
    image.onerror = () => setHasFrames(false);
    image.src = `${FRAMES_PATH}/frame_0001.${FRAME_EXT}`;
  }, []);

  const scrollIntoSequence = () => {
    if (!scrollRef.current) {
      return;
    }

    window.scrollTo({
      top: scrollRef.current.offsetTop + window.innerHeight * 0.85,
      behavior: "smooth",
    });
  };

  return (
    <section ref={scrollRef} id="top" className="relative h-[250vh] bg-background">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <ScrubSequence
          framesPath={FRAMES_PATH}
          frameCount={FRAME_COUNT}
          ext={FRAME_EXT}
          scrollTargetRef={scrollRef}
          className="absolute inset-0 z-0 h-full w-full"
        />

        <p className="sr-only">{HERO_VIDEO_SUMMARY}</p>

        <div className="absolute inset-0 z-[1] bg-[radial-gradient(120%_80%_at_50%_60%,transparent_40%,rgba(0,0,0,0.55)_100%)]" />
        <div className="absolute bottom-0 inset-x-0 z-[2] h-[40vh] gradient-fade-b" />

        {import.meta.env.DEV && hasFrames === false ? (
          <div className="absolute inset-x-0 top-28 z-[12] flex justify-center px-6">
            <div className="liquid-glass-strong rounded-full px-5 py-2 text-sm text-foreground/90">
              Aucun frame détecté. Ajoutez <span className="font-medium">input/source.mp4</span> puis lancez la commande ffmpeg du README.
            </div>
          </div>
        ) : null}

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full px-1 py-1 liquid-glass">
              <span className="rounded-full bg-foreground px-3 py-1 text-xs font-semibold text-background">
                {NEW_LABEL}
              </span>
              <span className="pr-3 text-sm text-foreground/85">{BRAND_TAGLINE}</span>
            </div>
          </motion.div>

          <BlurText
            text={HERO_HEADLINE}
            as="h1"
            className="mt-6 max-w-[14ch] font-display text-[clamp(56px,9vw,144px)] leading-[0.92] tracking-[-0.02em] text-foreground uppercase"
            delay={0.09}
            startDelay={0.15}
          />

          <motion.p
            initial={{ filter: "blur(10px)", opacity: 0, y: 16 }}
            animate={{ filter: "blur(0)", opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-base leading-relaxed text-foreground/70 md:text-lg"
          >
            {HERO_SUB}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <Button variant="hero" asChild>
              <a href={CTA_HREF}>
                {HERO_CTA_PRIMARY}
                <ArrowUpRight className="ml-1 size-4" />
              </a>
            </Button>
            <Button variant="heroGlass" type="button" onClick={scrollIntoSequence}>
              <Play className="mr-1.5 size-4 fill-current" />
              {HERO_CTA_SECONDARY}
            </Button>
          </motion.div>

          <div className="absolute bottom-10 inset-x-0 flex flex-col items-center gap-4">
            <span className="liquid-glass rounded-full px-4 py-1.5 text-xs text-foreground/80">
              {TRUSTED_BY_LABEL}
            </span>
            <div className="flex flex-wrap items-center justify-center gap-8 px-6 md:gap-14">
              {PARTNERS.map((partner) => (
                <span
                  key={partner}
                  className="font-display text-xl italic tracking-tight text-foreground/70 md:text-2xl"
                >
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
