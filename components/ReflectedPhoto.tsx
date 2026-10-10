"use client";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import type { Photo } from "@/invitation.config";
import { Ripples } from "./Water";

/**
 * A photo in a church arch standing over still water: the arch frame in gold, and below it
 * the photo's reflection, fading and shimmering, with ripples spreading at the waterline.
 */
export function ReflectedPhoto({ photo, ratio = "4/5", preload = false, className = "" }: { photo: Photo; ratio?: "4/5" | "3/4"; preload?: boolean; className?: string }) {
  const reduce = useReducedMotion();
  const aspect = ratio === "4/5" ? "aspect-[4/5]" : "aspect-[3/4]";
  const img = (reflection: boolean) => (
    <Image src={photo.src} alt={reflection ? "" : photo.alt} fill sizes="(min-width: 640px) 380px, 75vw" className="object-cover" {...(preload && !reflection ? { loading: "eager", fetchPriority: "high" } : {})} />
  );

  return (
    <figure className={`relative mx-auto ${className}`}>
      <div className="arch frame relative bg-panel/70 p-1.5 sm:p-2">
        <div className={`relative ${aspect} overflow-hidden rounded-[999px_999px_26px_26px] bg-panel`}>
          <motion.div
            className="absolute inset-0"
            initial={{ scale: reduce ? 1 : 1.12 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: reduce ? 0 : 2.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {img(false)}
          </motion.div>
        </div>
      </div>

      {/* Reflection in the water, about half the photo's height, with ripples at the waterline. */}
      <div aria-hidden className="relative">
        <div className="relative aspect-[2/1] overflow-hidden [mask-image:linear-gradient(#000,transparent_90%)]">
          <div className={`relative ${aspect} -scale-y-100 overflow-hidden rounded-[999px_999px_26px_26px] opacity-35 blur-[1.5px]`}>{img(true)}</div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#9fb4c5]/30 to-transparent" />
          <div className="absolute inset-0 overflow-hidden">
            <div className="shimmer shimmer-lines h-[200%] w-full" />
          </div>
        </div>
        <Ripples className="absolute top-0 left-1/2 w-[140%] -translate-x-1/2 -translate-y-1/2" />
      </div>
    </figure>
  );
}
