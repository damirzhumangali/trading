import { motion } from "motion/react";
import { Quote } from "lucide-react";
import { BlurText } from "@/components/BlurText";
import {
  TESTIMONIALS,
  TESTIMONIALS_HEADLINE,
  TESTIMONIALS_SUB,
} from "@/lib/constants";

type TestimonialCardProps = (typeof TESTIMONIALS)[number];

function TestimonialCard({ quote, name, role }: TestimonialCardProps) {
  return (
    <article className="liquid-glass flex w-[340px] shrink-0 flex-col gap-5 rounded-2xl p-7 md:w-[400px]">
      <Quote className="size-5 text-primary/70" />
      <p className="text-[15px] leading-relaxed text-foreground/85 italic">
        {quote}
      </p>
      <div className="mt-auto flex items-center gap-3">
        <div className="size-9 rounded-full bg-gradient-to-br from-primary/60 to-secondary/60" />
        <div>
          <p className="text-sm font-medium text-foreground">{name}</p>
          <p className="text-xs uppercase tracking-wide text-foreground/55">{role}</p>
        </div>
      </div>
    </article>
  );
}

export function Testimonials() {
  const firstRow = [...TESTIMONIALS, ...TESTIMONIALS];
  const secondSeed = [...TESTIMONIALS.slice(3), ...TESTIMONIALS.slice(0, 3)];
  const secondRow = [...secondSeed, ...secondSeed];

  return (
    <section id="testimonials" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)]">
        <span className="liquid-glass rounded-full px-4 py-1.5 text-xs text-foreground/80">
          Client voices
        </span>
        <BlurText
          text={TESTIMONIALS_HEADLINE}
          className="mt-5 max-w-[14ch] font-display text-4xl leading-[0.9] tracking-tight uppercase md:text-6xl"
        />
        <motion.p
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-2xl text-sm leading-relaxed text-foreground/65 md:text-base"
        >
          {TESTIMONIALS_SUB}
        </motion.p>
      </div>

      <div className="group/testimonials relative mt-16 flex flex-col gap-5 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max gap-5 animate-marquee hover:[animation-play-state:paused] group-hover/testimonials:[animation-play-state:paused]">
          {firstRow.map((testimonial, index) => (
            <TestimonialCard key={`${testimonial.name}-${index}`} {...testimonial} />
          ))}
        </div>
        <div className="flex w-max gap-5 animate-marquee-rev hover:[animation-play-state:paused] group-hover/testimonials:[animation-play-state:paused]">
          {secondRow.map((testimonial, index) => (
            <TestimonialCard key={`${testimonial.role}-${index}`} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
