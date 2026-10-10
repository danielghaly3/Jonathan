import type { ReactNode } from "react";

/** The one heading style for every section: a small gold star of light, display title (italic emphasis), optional line. */
export function SectionHeading({ children, sub, className = "" }: { children: ReactNode; sub?: ReactNode; className?: string }) {
  return (
    <header className={`flex flex-col items-center ${className}`}>
      <svg aria-hidden width="22" height="22" viewBox="-10 -10 20 20" className="text-gold">
        <path d="M0 -9 C1 -2 2 -1 9 0 C2 1 1 2 0 9 C-1 2 -2 1 -9 0 C-2 -1 -1 -2 0 -9 Z" fill="currentColor" opacity="0.85" />
      </svg>
      <h2 className="mt-5 font-display text-[clamp(2.3rem,7vw,3.4rem)] leading-[1.1] font-light text-balance [&_em]:text-accent">{children}</h2>
      {sub && <p className="mx-auto mt-4 max-w-[34ch] text-lg text-balance text-ink-soft italic">{sub}</p>}
    </header>
  );
}
