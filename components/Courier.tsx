"use client";
import { motion } from "motion/react";
import { Dove, type DoveArt } from "./Dove";

const D = 3.6; // whole flight, seconds
// Shared beats: envelope appears, dove arrives, dove takes it, both fly off to the upper right.
const TIMES = [0, 0.14, 0.42, 0.52, 1];

/** The reply leaves by dove: the form becomes a sealed envelope, a dove swoops in, takes it, and flies away. */
export function Courier({ art, onDone }: { art: DoveArt; onDone: () => void }) {
  return (
    <div className="relative flex h-80 flex-col items-center justify-center" role="status" aria-live="polite">
      <span className="sr-only">Sending your reply</span>

      <motion.div
        className="absolute top-1/2 left-1/2 -mt-[100px] -ml-[42px]"
        initial={{ x: -320, y: -260, opacity: 0 }}
        animate={{ x: [-320, -320, 0, 0, 340], y: [-260, -260, 0, -6, -460], opacity: [0, 1, 1, 1, 0], rotate: [-10, -10, 0, -4, -14] }}
        transition={{ duration: D, times: TIMES, ease: "easeInOut" }}
      >
        <Dove art={art} size={84} speed={0.34} />
      </motion.div>

      <motion.div
        className="relative"
        initial={{ scale: 0.4, opacity: 0, y: 30 }}
        animate={{ scale: [0.4, 1, 1, 0.92, 0.5], opacity: [0, 1, 1, 1, 0], x: [0, 0, 0, 0, 340], y: [30, 0, 0, -10, -420], rotate: [0, 0, 0, -4, -16] }}
        transition={{ duration: D, times: TIMES, ease: "easeInOut" }}
        onAnimationComplete={onDone}
      >
        <Envelope />
      </motion.div>

      <motion.p
        className="absolute bottom-6 font-display text-xl text-ink-soft italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: D, times: [0, 0.15, 0.8, 1] }}
      >
        Your reply is on its way…
      </motion.p>
    </div>
  );
}

/** A small ivory envelope sealed with burgundy wax and a gold cross. */
function Envelope() {
  return (
    <svg width="132" height="90" viewBox="0 0 132 90" aria-hidden className="drop-shadow-[0_14px_24px_rgb(120_90_40/0.35)]">
      <rect x="1" y="1" width="130" height="88" rx="8" fill="#fffaf0" stroke="#a8843f" strokeWidth="1.2" />
      <path d="M2 86 L52 46 M130 86 L80 46" stroke="#a8843f" strokeWidth="0.8" opacity="0.6" fill="none" />
      <path d="M2 3 L66 52 L130 3" fill="#f6efe2" stroke="#a8843f" strokeWidth="1.2" strokeLinejoin="round" />
      <circle cx="66" cy="52" r="12" fill="#6b2a36" />
      <circle cx="66" cy="52" r="9" fill="none" stroke="#8a3a48" strokeWidth="1" />
      <path d="M66 45.5 V58.5 M59.5 52 H72.5" stroke="#f3d9a6" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
