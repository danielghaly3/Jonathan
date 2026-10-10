import { useId } from "react";

/** Lozenge with an inscribed cross: the repeating unit of Coptic textile and iconostasis lattice. */
export function Lozenge({ x, y = 10, s = 1 }: { x: number; y?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 -7 L7 0 L0 7 L-7 0 Z" fill="none" />
      <path d="M0 -3 V3 M-3 0 H3" />
    </g>
  );
}

/** Full-width lattice band framed by hairlines. */
export function LatticeBand({ className = "" }: { className?: string }) {
  const id = useId().replace(/[^\w-]/g, "");
  return (
    <svg aria-hidden className={`fade-x block h-5 w-full text-gold ${className}`} preserveAspectRatio="none">
      <defs>
        <pattern id={id} width="28" height="20" patternUnits="userSpaceOnUse" x="50%">
          <g stroke="currentColor" strokeWidth="0.9" fill="none">
            <path d="M0 10 H7 M21 10 H28" />
            <Lozenge x={14} />
          </g>
        </pattern>
      </defs>
      <line x1="0" x2="100%" y1="0.5" y2="0.5" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <rect y="0" width="100%" height="20" fill={`url(#${id})`} />
      <line x1="0" x2="100%" y1="19.5" y2="19.5" stroke="currentColor" strokeWidth="1" opacity="0.6" />
    </svg>
  );
}

/** Fading gold hairline with a lozenge-cross at its centre. */
export function GoldDivider({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`flex items-center justify-center gap-3 text-gold ${className}`}>
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold sm:w-24" />
      <svg width="20" height="20" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="1" fill="none">
        <Lozenge x={10} />
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold sm:w-24" />
    </div>
  );
}
