import Image from "next/image";
import type { CSSProperties } from "react";

/**
 * Concentric ripples spreading on still water, as from a drop falling into the font.
 * Plain elements with CSS transform/opacity animations: the GPU runs them, so they cost nothing while scrolling.
 */
// Callers position it (e.g. "absolute ..."); the rings fill it.
export function Ripples({ className = "", rings = 3, delay = 0 }: { className?: string; rings?: number; delay?: number }) {
  return (
    <div aria-hidden className={`pointer-events-none aspect-[5/1] ${className}`}>
      {Array.from({ length: rings }, (_, i) => (
        <span
          key={i}
          className="ripple absolute inset-0 rounded-[50%] bg-[radial-gradient(closest-side,transparent_86%,rgb(255_252_245/0.85)_94%,transparent_100%)]"
          style={{ animationDelay: `${delay + (i * 5) / rings}s`, "--rest": 0.45 + i * 0.25 } as CSSProperties}
        />
      ))}
    </div>
  );
}

/**
 * A small pool of still water for things to rest above: the painted pool when provided
 * (see CODEX_WATER_ART.md), otherwise a soft drawn one. Gentle light ripples spread across it.
 */
export function Pool({ src = "", className = "", rings = 3, delay = 0 }: { src?: string; className?: string; rings?: number; delay?: number }) {
  return (
    <div aria-hidden className={`pointer-events-none aspect-[14/5] ${className}`}>
      {src ? (
        <Image src={src} alt="" fill sizes="(min-width: 640px) 320px, 60vw" className="object-contain" />
      ) : (
        <div className="absolute inset-0 rounded-[50%] bg-[radial-gradient(closest-side,rgb(220_232_238/0.85),rgb(196_214_224/0.55)_45%,rgb(196_214_224/0.18)_75%,transparent)] shadow-[inset_0_6px_14px_rgb(255_255_255/0.7)]" />
      )}
      {/* The painted pool already has its own ripples: one soft living ring on top is enough. */}
      <Ripples className="absolute inset-[12%_8%]" rings={src ? 1 : rings} delay={delay} />
    </div>
  );
}

/** A thin gold line of gentle waves drifting sideways: the section divider. */
export function WaveLine({ className = "" }: { className?: string }) {
  const wave = "M0 10 Q 25 2 50 10 T 100 10 T 150 10 T 200 10 T 250 10 T 300 10 T 350 10 T 400 10";
  return (
    <div aria-hidden className={`fade-x mx-auto h-5 w-full max-w-xl overflow-hidden text-gold ${className}`}>
      <svg viewBox="0 0 800 20" preserveAspectRatio="none" className="wave h-full w-[200%]">
        <path d={wave} fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <path d={wave} transform="translate(400 0)" fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}

/** A tall ivory church candle with a flickering flame and a warm glow. */
export function Candle({ height = 140, className = "", style }: { height?: number; className?: string; style?: CSSProperties }) {
  return (
    <div aria-hidden className={`pointer-events-none flex flex-col items-center ${className}`} style={style}>
      <div className="relative h-12 w-12">
        <div className="flicker absolute -inset-8 rounded-full bg-[radial-gradient(closest-side,rgb(255_214_140/0.55),rgb(255_214_140/0))]" />
        <div className="flame absolute left-1/2 bottom-0 h-10 w-4 -translate-x-1/2 rounded-[50%_50%_45%_45%/65%_65%_35%_35%] bg-[radial-gradient(ellipse_at_50%_75%,#fff7df_0_25%,#ffd27a_50%,#e79a3c_80%,transparent)]" />
      </div>
      <div className="h-1.5 w-px bg-[#5a4a3a]" />
      <div className="w-5 rounded-t-[3px] bg-gradient-to-r from-[#e9dcc2] via-[#fffaf0] to-[#e2d2b4] shadow-[0_10px_20px_-10px_rgb(120_86_40/0.5)]" style={{ height }} />
      <div className="h-2 w-9 rounded-full bg-gradient-to-r from-[#a8843f] via-[#d9bd80] to-[#a8843f]" />
    </div>
  );
}
