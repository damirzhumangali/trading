import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { BlurText } from "@/components/BlurText";
import { SERVICES, SERVICES_HEADLINE, SERVICES_SUB } from "@/lib/constants";
import { iconMap } from "@/lib/icon-map";

const cardClasses = [
  "lg:col-[1/5] lg:row-[1/3] p-8 min-h-[480px]",
  "lg:col-[5/9] lg:row-[1/2] p-6 min-h-[228px]",
  "lg:col-[9/13] lg:row-[1/2] p-6 min-h-[228px]",
  "lg:col-[5/10] lg:row-[2/3] p-7 min-h-[228px]",
  "lg:col-[10/13] lg:row-[2/3] p-6 min-h-[228px]",
  "lg:col-[1/13] lg:row-[3/4] p-7 min-h-[200px]",
];

export function ServicesBento() {
  return (
    <section id="services" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-[var(--max)] px-[var(--gutter)]">
        <span className="liquid-glass rounded-full px-4 py-1.5 text-xs text-foreground/80">
          What we do
        </span>
        <BlurText
          text={SERVICES_HEADLINE}
          className="mt-5 max-w-[14ch] font-display text-4xl leading-[0.9] tracking-tight uppercase md:text-6xl"
        />
        <motion.p
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-2xl text-sm leading-relaxed text-foreground/65 md:text-base"
        >
          {SERVICES_SUB}
        </motion.p>
      </div>

      <div className="mx-auto mt-16 grid max-w-[var(--max)] grid-cols-1 gap-4 px-[var(--gutter)] md:grid-cols-2 md:gap-5 lg:grid-cols-12 lg:[grid-auto-flow:dense]">
        {SERVICES.map((service, index) => {
          const Icon = iconMap[service.icon];
          return (
            <motion.div
              key={service.title}
              className={`liquid-glass group relative overflow-hidden rounded-2xl ${cardClasses[index]}`}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
            >
              <div className="liquid-glass-strong mb-5 flex h-11 w-11 items-center justify-center rounded-full">
                <Icon className="size-5 text-foreground" />
              </div>
              <h3 className="mb-3 max-w-[18ch] font-display text-2xl leading-[0.95] tracking-tight uppercase md:text-3xl">
                {service.title}
              </h3>
              <p className="max-w-[38ch] text-sm leading-relaxed text-foreground/65">
                {service.body}
              </p>
              <ArrowUpRight className="absolute right-6 top-6 size-5 text-foreground/30 transition-colors group-hover:text-foreground/80" />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
