"use client";
import { motion, useReducedMotion } from "motion/react";
import { useOpened } from "./Opening";

// One arm (pointing up), centred on 0,0: three-pointed terminal, so 12 points in all.
const ARM: string[] = [
  "L 5.5 -20", "Q 6 -30 12 -33", "L 14 -42", "L 6.5 -36", "L 0 -46",
  "L -6.5 -36", "L -14 -42", "L -12 -33", "Q -6 -30 -5.5 -20", "L -5.5 -8", "Q -5.5 -5.5 -8 -5.5",
];

// Rotate a command's coordinates by k quarter turns (up -> left -> down -> right).
const rotate = (cmd: string, k: number) =>
  cmd.replace(/(-?[\d.]+) (-?[\d.]+)/g, (_, x, y) => {
    let [a, b] = [+x, +y];
    for (let i = 0; i < k; i++) [a, b] = [b, -a];
    return `${+a.toFixed(2)} ${+b.toFixed(2)}`;
  });

const CROSS = `M 5.5 -8 ${[0, 1, 2, 3].flatMap((k) => ARM.map((c) => rotate(c, k))).join(" ")} Z`;

const ease = [0.22, 1, 0.36, 1] as const;

type Props = { size?: number; animate?: boolean; play?: boolean; delay?: number; className?: string };

/** `animate` draws the cross in once `play` is true (defaults to: the invitation doors have opened). */
export function CopticCross({ size = 64, animate = true, play, delay = 0, className = "" }: Props) {
  const opened = useOpened();
  const go = play ?? opened;
  // Always animate when `animate`: the server can't know the user's motion preference, so reduced motion means duration 0, not skipping.
  const reduce = useReducedMotion();
  const t = (duration: number, d: number) => (reduce ? { duration: 0 } : { duration, delay: delay + d, ease });
  const draw = (d: number) =>
    animate ? { initial: { pathLength: 0, opacity: 0 }, animate: go ? { pathLength: 1, opacity: 1 } : {}, transition: t(1.8, d) } : {};
  const fade = (d: number) => (animate ? { initial: { opacity: 0 }, animate: go ? { opacity: 1 } : {}, transition: t(1.2, d) } : {});

  return (
    <svg viewBox="-50 -50 100 100" width={size} height={size} className={`text-gold ${className}`} role="img" aria-label="Coptic cross">
      <motion.circle r="25" fill="none" stroke="currentColor" strokeWidth="0.9" {...draw(0.35)} />
      <motion.path d={CROSS} fill="var(--bg)" stroke="none" {...fade(0.2)} />
      <motion.path d={CROSS} fill="currentColor" fillOpacity="0.14" stroke="none" {...fade(1.4)} />
      <motion.path d={CROSS} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" {...draw(0)} />
      <motion.circle r="2.6" fill="currentColor" {...fade(1.4)} />
    </svg>
  );
}
