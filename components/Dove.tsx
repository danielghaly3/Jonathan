"use client";
import Image from "next/image";
import type { CSSProperties } from "react";

export type DoveArt = { front: string; flyUp: string; flyDown: string };

/**
 * A flapping gold dove. With side-view frames it alternates wings-up / wings-down (facing right);
 * otherwise the front-facing dove squeezes its wings in and out. `speed` is seconds per wingbeat.
 */
export function Dove({ art, size, speed, className = "" }: { art: DoveArt; size: number; speed?: number; className?: string }) {
  // Without `speed` the wingbeat inherits --flap from a parent (e.g. set imperatively while scrolling).
  const style = { width: size, height: size, ...(speed ? { "--flap": `${speed}s` } : {}) } as CSSProperties;
  const img = "h-full w-full object-contain drop-shadow-[0_8px_18px_rgb(168_132_63/0.45)]";
  if (art.flyUp && art.flyDown)
    return (
      <span aria-hidden className={`relative block ${className}`} style={style}>
        <Image src={art.flyUp} alt="" fill sizes={`${size * 2}px`} className={`flap-a ${img}`} />
        <Image src={art.flyDown} alt="" fill sizes={`${size * 2}px`} className={`flap-b opacity-0 ${img}`} />
      </span>
    );
  if (!art.front) return null;
  return (
    <span aria-hidden className={`block ${className}`} style={style}>
      <Image src={art.front} alt="" width={size * 2} height={size * 2} className={`flap ${img}`} />
    </span>
  );
}
