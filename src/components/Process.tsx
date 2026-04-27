import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { BlurText } from "@/components/BlurText";
import { PROCESS_HEADLINE, PROCESS_STEPS, PROCESS_SUB } from "@/lib/constants";

export function Process() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section id="process" ref={ref} className="relative py-28 md:py-40">
      <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)]">
        <span className="liquid-glass rounded-full px-4 py-1.5 text-xs text-foreground/80">
          Notre méthode
        </span>
        <BlurText
          text={PROCESS_HEADLINE}
          className="mt-5 max-w-[16ch] font-display text-4xl leading-[0.9] tracking-tight uppercase md:text-6xl"
        />
        <motion.p
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-2xl text-sm leading-relaxed text-foreground/65 md:text-base"
        >
          {PROCESS_SUB}
        </motion.p>
      </div>

      <div className="mx-auto mt-16 max-w-[var(--max)] px-[var(--gutter)]">
        <div className="liquid-glass-strong relative overflow-hidden rounded-[32px]">
          <motion.div
            aria-hidden="true"
            initial={{ scaleX: 0, opacity: 0.4 }}
            animate={inView ? { scaleX: 1, opacity: 1 } : undefined}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="absolute left-[12.5%] right-[12.5%] top-20 hidden h-px origin-left bg-gradient-to-r from-transparent via-border to-transparent md:block"
          />

          <div className="relative grid grid-cols-1 gap-0 md:grid-cols-4">
            {PROCESS_STEPS.map((step, index) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                  delay: index * 0.08,
                }}
                className="relative flex flex-col items-start gap-4 px-6 py-10 md:px-10 md:py-14"
              >
                {index < PROCESS_STEPS.length - 1 ? (
                  <motion.div
                    initial={{ scaleY: 0, opacity: 0.3 }}
                    whileInView={{ scaleY: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.2 + index * 0.06,
                    }}
                    className="absolute bottom-0 left-8 top-32 w-px origin-top bg-gradient-to-b from-transparent via-border to-transparent md:hidden"
                  />
                ) : null}
                <span className="-mb-6 select-none font-display text-[96px] leading-none text-primary/25 md:text-[140px]">
                  {step.n.padStart(2, "0")}
                </span>
                <h3 className="font-display text-2xl tracking-tight uppercase md:text-3xl">
                  {step.title}
                </h3>
                <p className="max-w-[30ch] text-sm leading-relaxed text-foreground/65">
                  {step.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
