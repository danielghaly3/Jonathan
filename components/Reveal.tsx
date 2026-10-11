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

/** Hero name: written left to right as if by a pen once the invitation opens, the climax of the hero. */
export function HeroName({ name }: { name: string }) {
  const reduce = useReducedMotion();
  const opened = useOpened();
  return (
    <motion.h1
      className="px-6 pb-1 font-name text-[clamp(4.6rem,19vw,8.6rem)] leading-[1.2] text-accent"
      initial={{ clipPath: "inset(-20% 100% -20% 0)" }}
      animate={opened ? { clipPath: "inset(-20% -5% -20% 0)" } : {}}
      transition={reduce ? { duration: 0 } : { duration: 2.2, delay: 1.1, ease: [0.45, 0, 0.25, 1] }}
    >
      {name}
    </motion.h1>
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
