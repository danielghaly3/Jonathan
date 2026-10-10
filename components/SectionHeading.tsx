import type { ReactNode } from "react";
import { CopticCross } from "./CopticCross";

/** The one heading style for every section: a small gold Coptic cross, display title (italic emphasis), optional line. */
export function SectionHeading({ children, sub, className = "" }: { children: ReactNode; sub?: ReactNode; className?: string }) {
  return (
    <header className={`flex flex-col items-center ${className}`}>
      <CopticCross size={26} animate={false} />
      <h2 className="mt-5 font-display text-[clamp(2.3rem,7vw,3.4rem)] leading-[1.1] font-light text-balance [&_em]:text-accent">{children}</h2>
      {sub && <p className="mx-auto mt-4 max-w-[34ch] text-lg text-balance text-ink-soft italic">{sub}</p>}
    </header>
  );
}
