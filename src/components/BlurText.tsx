import { motion, useInView } from "motion/react";
import { createElement, useRef } from "react";
import type { ElementType } from "react";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  startDelay?: number;
  as?: ElementType;
};

export function BlurText({
  text,
  className = "",
  delay = 0.07,
  startDelay = 0,
  as: Tag = "h2",
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const words = text.split(" ");

  return (
    createElement(
      Tag,
      { ref: ref as never, className },
      words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="inline-block will-change-[filter,transform,opacity]"
          initial={{ filter: "blur(10px)", opacity: 0, y: 24 }}
          animate={inView ? { filter: "blur(0)", opacity: 1, y: 0 } : undefined}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
            delay: startDelay + index * delay,
          }}
        >
          {word}
          {index < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      )),
    )
  );
}
