import { motion } from "motion/react";
import { BlurText } from "@/components/BlurText";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CTA_HREF, FAQ_ITEMS, FAQ_SUB } from "@/lib/constants";

export function Faq() {
  return (
    <section id="faq" className="relative py-28 md:py-40">
      <div className="mx-auto grid max-w-[var(--max)] grid-cols-1 gap-16 px-[var(--gutter)] md:grid-cols-[0.9fr_1.1fr]">
        <div className="md:sticky md:top-24 md:self-start">
          <span className="liquid-glass rounded-full px-4 py-1.5 text-xs text-foreground/80">
            FAQ
          </span>
          <BlurText
            as="h2"
            text="Frequently asked."
            className="mt-4 font-display text-5xl leading-[0.9] tracking-tight uppercase md:text-6xl"
          />
          <motion.p
            initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-md text-sm leading-relaxed text-foreground/65 md:text-base"
          >
            {FAQ_SUB}
          </motion.p>
          <Button asChild variant="heroGlass" className="mt-8">
            <a href={CTA_HREF}>Contact us</a>
          </Button>
        </div>

        <Accordion type="single" collapsible>
          {FAQ_ITEMS.map((item, index) => (
            <AccordionItem key={item.q} value={`item-${index}`} className="border-border/40">
              <AccordionTrigger className="py-6 text-lg md:text-xl data-[state=open]:text-primary">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="max-w-[60ch] pb-6 text-[15px] leading-relaxed text-foreground/70">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
