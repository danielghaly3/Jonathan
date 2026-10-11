"use client";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { useOpened } from "./Opening";

const ease = [0.22, 1, 0.36, 1] as const;

/** Gentle fade-and-rise as content enters the viewport, once. Instant under reduced motion. */
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={reduce ? { duration: 0 } : { duration: 1, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/** Hero name: letters rise out of a soft blur one by one once the doors open, the climax of the hero. */
export function HeroName({ name }: { name: string }) {
  const reduce = useReducedMotion();
  const opened = useOpened();
  return (
    <h1
      aria-label={name}
      className="font-name text-[clamp(3.4rem,14vw,7rem)] leading-[1.1] text-accent"
      style={{ letterSpacing: "0.03em" }}
    >
      {[...name].map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block"
          initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
          animate={opened ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={reduce ? { duration: 0 } : { duration: 1.4, delay: 1.1 + i * 0.09, ease }}
        >
          {ch}
        </motion.span>
      ))}
    </h1>
  );
}

/** Like Reveal, but waits for the doors to open (for content already in view at load). */
export function OpenReveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  const opened = useOpened();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={opened ? { opacity: 1, y: 0 } : {}}
      transition={reduce ? { duration: 0 } : { duration: 1.2, delay, ease }}
    >
      {children}
    </motion.div>
  );
}
