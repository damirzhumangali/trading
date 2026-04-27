import { motion } from "motion/react";
import { BlurText } from "@/components/BlurText";
import { POURQUOI_HEADLINE, POURQUOI_SUB, REASONS } from "@/lib/constants";
import { iconMap } from "@/lib/icon-map";

export function Pourquoi() {
  return (
    <section id="pourquoi" className="relative border-t border-border/40 py-28 md:py-40">
      <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)] text-center">
        <span className="liquid-glass rounded-full px-4 py-1.5 text-xs text-foreground/80">
          Pourquoi nous
        </span>
        <BlurText
          text={POURQUOI_HEADLINE}
          className="mx-auto mt-5 max-w-[18ch] font-display text-4xl leading-[0.9] tracking-tight uppercase md:text-6xl"
        />
        <motion.p
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-foreground/65 md:text-base"
        >
          {POURQUOI_SUB}
        </motion.p>
      </div>

      <div className="mx-auto mt-16 grid max-w-[var(--max)] grid-cols-1 gap-5 px-[var(--gutter)] md:grid-cols-2 lg:grid-cols-4">
        {REASONS.map((reason, index) => {
          const Icon = iconMap[reason.icon];
          return (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: index * 0.08,
              }}
              className="liquid-glass flex min-h-[260px] flex-col gap-5 rounded-2xl p-7"
            >
              <div className="liquid-glass-strong flex h-11 w-11 items-center justify-center rounded-full">
                <Icon className="size-5 text-foreground" />
              </div>
              <h3 className="font-display text-xl tracking-tight uppercase">
                {reason.title}
              </h3>
              <p className="text-sm leading-relaxed text-foreground/65">
                {reason.body}
              </p>
              <div className="mt-auto h-px w-10 bg-gradient-to-r from-primary to-transparent" />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
