import Image from "next/image";
import type { CSSProperties } from "react";

// Puff layouts (centre x %, top %, diameter as % of width) for the drawn fallback clouds.
const SHAPES = [
  [[14, 42, 34], [30, 18, 48], [52, 4, 56], [72, 22, 44], [86, 44, 30]],
  [[12, 38, 40], [34, 10, 54], [58, 20, 46], [80, 36, 36]],
  [[18, 30, 44], [42, 6, 60], [68, 18, 50], [88, 42, 28]],
  [[10, 46, 28], [26, 26, 40], [46, 12, 50], [64, 8, 48], [82, 30, 38]],
] as const;

const PUFF = "radial-gradient(circle at 50% 42%, #fffdf7 0 42%, rgb(255 251 242 / 0.85) 52%, rgb(255 251 242 / 0) 70%)";
const BASE = "radial-gradient(ellipse 50% 60% at 50% 30%, rgb(255 255 255 / 0.95), rgb(240 226 202 / 0.6) 55%, rgb(240 226 202 / 0) 75%)";

/**
 * One soft cloud. Uses a painted cloud image when one is provided (see CODEX_SKY_ART.md);
 * otherwise draws a puffy cloud from layered radial gradients. Size it with a width class.
 */
export function Cloud({ variant = 0, src = "", className = "", style }: { variant?: number; src?: string; className?: string; style?: CSSProperties }) {
  if (src)
    return (
      <div aria-hidden className={`pointer-events-none ${className}`} style={style}>
        <Image src={src} alt="" width={1600} height={800} sizes="60vw" className="h-auto w-full select-none" draggable={false} />
      </div>
    );
  const puffs = SHAPES[variant % SHAPES.length];
  return (
    <div aria-hidden className={`pointer-events-none ${className}`} style={style}>
      <div className="relative aspect-[5/2] w-full">
        <div className="absolute inset-x-[6%] top-[42%] bottom-0 rounded-[50%]" style={{ background: BASE }} />
        {puffs.map(([x, y, d], i) => (
          <div key={i} className="absolute aspect-square" style={{ left: `${x - d / 2}%`, top: `${y}%`, width: `${d}%`, background: PUFF }} />
        ))}
      </div>
    </div>
  );
}
