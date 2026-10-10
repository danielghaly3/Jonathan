"use client";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties } from "react";
import type { Photo } from "@/invitation.config";
import { Cloud } from "./Cloud";

/**
 * A photo in a christening oval resting in the clouds: soft glow, fine gold inner ring,
 * the photo settling from a gentle zoom, and clouds drifting across its base.
 */
export function CloudPhoto({ photo, clouds, preload = false, className = "" }: { photo: Photo; clouds: string[]; preload?: boolean; className?: string }) {
  const reduce = useReducedMotion();
  const src = (i: number) => (clouds.length ? clouds[i % clouds.length] : "");
  return (
    <figure className={`relative mx-auto ${className}`}>
      <div aria-hidden className="absolute -inset-[18%] rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.85),rgb(255_255_255/0)_75%)]" />
      <div className="relative aspect-[4/5] overflow-hidden rounded-[50%] shadow-[0_30px_70px_-30px_rgb(120_86_40/0.5)] ring-4 ring-[#fffaf0]/90">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: reduce ? 1 : 1.14 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: reduce ? 0 : 2.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 640px) 380px, 75vw" className="object-cover" {...(preload ? { loading: "eager", fetchPriority: "high" } : {})} />
        </motion.div>
        <div aria-hidden className="absolute inset-2.5 rounded-[50%] ring-1 ring-[#e3cd9c]/80" />
      </div>
      <Cloud variant={1} src={src(0)} className="drift absolute -bottom-[14%] -left-[30%] w-[85%]" style={{ "--drift": "26s", "--drift-x": "14px" } as CSSProperties} />
      <Cloud variant={3} src={src(1)} className="drift absolute -right-[32%] -bottom-[18%] w-[95%]" style={{ "--drift": "32s", "--drift-x": "18px" } as CSSProperties} />
    </figure>
  );
}
