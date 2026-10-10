"use client";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import type { Photo } from "@/invitation.config";
import { Ripples } from "./Water";

/**
 * A photo in a church arch standing over still water: the arch frame in gold, and below it
 * the photo's reflection in perspective, fading, with drifting water light and soft ripples.
 */
export function ReflectedPhoto({ photo, ratio = "4/5", preload = false, waterLight = "", className = "" }: { photo: Photo; ratio?: "4/5" | "3/4"; preload?: boolean; waterLight?: string; className?: string }) {
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

      {/*
        Reflection in the water: the photo mirrored about the waterline and squashed in perspective,
        tinted like clear water, fading away, with drifting light on the surface and soft ripples.
      */}
      <div aria-hidden className="relative h-0 overflow-hidden pb-[55%] [mask-image:linear-gradient(#000_0%,rgb(0_0_0/0.6)_40%,transparent_92%)]">
        <div className={`absolute inset-x-0 bottom-full ${aspect} origin-bottom px-1.5 sm:px-2`} style={{ transform: "scaleY(-0.62)" }}>
          <div className="relative h-full overflow-hidden rounded-[999px_999px_26px_26px] opacity-45 blur-[2px] saturate-[0.8]">{img(true)}</div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[rgb(205_222_230/0.45)] via-[rgb(233_226_211/0.35)] to-transparent" />
        {waterLight && (
          <div className="absolute inset-0 overflow-hidden opacity-70 mix-blend-screen">
            <div className="wave h-full w-[200%]" style={{ backgroundImage: `url(${waterLight})`, backgroundSize: "50% 100%", animationDuration: "26s" }} />
          </div>
        )}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />
      </div>
      <Ripples className="absolute bottom-[18%] left-1/2 w-[110%] -translate-x-1/2" rings={2} />
    </figure>
  );
}
