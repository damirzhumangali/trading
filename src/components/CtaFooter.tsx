import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { BlurText } from "@/components/BlurText";
import { VideoBackground } from "@/components/VideoBackground";
import { Button } from "@/components/ui/button";
import {
  COPYRIGHT,
  CTA_BG_VIDEO,
  CTA_HEADLINE,
  CTA_HREF,
  CTA_LABEL,
  CTA_SUB,
  FOOTER_LINKS,
} from "@/lib/constants";

export function CtaFooter() {
  return (
    <section id="cta" className="relative flex min-h-[100vh] flex-col items-center justify-center overflow-hidden">
      <VideoBackground
        src={CTA_BG_VIDEO}
        videoClassName="object-cover brightness-[0.55]"
      />
      <div className="absolute inset-x-0 top-0 h-[200px] gradient-fade-t" />
      <div className="absolute bottom-0 inset-x-0 h-[200px] gradient-fade-b" />

      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-28 text-center md:py-36">
        <BlurText
          as="h2"
          text={CTA_HEADLINE}
          className="max-w-[16ch] font-display text-[clamp(56px,10vw,180px)] leading-[0.88] tracking-[-0.02em] italic"
        />
        <motion.p
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-xl text-base text-foreground/75 md:text-lg"
        >
          {CTA_SUB}
        </motion.p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button variant="hero" asChild>
            <a href={CTA_HREF}>
              {CTA_LABEL}
              <ArrowUpRight className="ml-1 size-4" />
            </a>
          </Button>
          <Button variant="heroGlass" asChild>
            <a href="#faq">Pricing</a>
          </Button>
        </div>
      </div>

      <div className="relative z-10 mt-auto w-full border-t border-border/40">
        <div className="mx-auto flex max-w-[var(--max)] flex-col items-center justify-between gap-4 px-[var(--gutter)] py-8 md:flex-row">
          <span className="text-xs text-foreground/50">{COPYRIGHT}</span>
          <nav className="flex items-center gap-6">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-foreground/50 transition-colors hover:text-foreground/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
