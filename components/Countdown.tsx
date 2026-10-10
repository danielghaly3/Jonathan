"use client";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const UNITS = [
  ["days", 86_400_000],
  ["hours", 3_600_000],
  ["minutes", 60_000],
  ["seconds", 1000],
] as const;

/** Live countdown to `target` (ISO with offset). Renders dashes until mounted to avoid a server/client mismatch. */
export function Countdown({ target }: { target: string }) {
  const [now, setNow] = useState<number | null>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const left = now === null ? null : Math.max(0, new Date(target).getTime() - now);
  if (left === 0) return <p className="font-display text-2xl text-accent italic">Today is the day</p>;

  return (
    <div className="grid grid-cols-4 divide-x divide-gold/35" role="timer" aria-label="Time until the baptism">
      {UNITS.map(([label, ms], i) => {
        // Days are the total; smaller units wrap within the next larger one.
        const value = left === null ? null : Math.floor((i ? left % UNITS[i - 1][1] : left) / ms);
        const text = value === null ? "--" : String(value).padStart(2, "0");
        return (
          <div key={label} className="flex flex-col items-center px-1">
            <div className="relative h-12 w-full overflow-hidden sm:h-14">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.span
                  key={text}
                  className="absolute inset-0 flex items-center justify-center font-display text-[2.1rem] leading-none font-light text-ink tabular-nums sm:text-[2.5rem]"
                  initial={reduce ? false : { y: "-100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { y: "100%", opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {text}
                </motion.span>
              </AnimatePresence>
            </div>
            <span className="mt-1 font-sans text-[0.6rem] tracking-[0.22em] text-gold-ink uppercase">{label}</span>
          </div>
        );
      })}
    </div>
  );
}
