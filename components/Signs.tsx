"use client";
import Image from "next/image";
import { Drop, Flask, Sparkle } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties } from "react";
import { Cloud } from "./Cloud";
import { CopticCross } from "./CopticCross";

export type Sign = { title: string; line: string; text: string; image: string; icon: string };

// Fallback emblems until the gold-leaf PNGs exist.
function Emblem({ sign }: { sign: Sign }) {
  if (sign.image) return <Image src={sign.image} alt="" width={240} height={240} className="h-full w-full object-contain drop-shadow-[0_12px_20px_rgb(177_141_72/0.35)]" />;
  const props = { size: 56, weight: "thin" as const, className: "text-gold" };
  if (sign.icon === "water") return <Drop {...props} />;
  if (sign.icon === "oil") return <Flask {...props} />;
  if (sign.icon === "garment") return <Sparkle {...props} />;
  return <CopticCross size={60} animate={false} />;
}

/** The signs of baptism: four gold emblems floating on little clouds, each with its meaning beneath. */
export function Signs({ signs, clouds }: { signs: readonly Sign[]; clouds: string[] }) {
  const reduce = useReducedMotion();
  return (
    <ul className="mx-auto grid max-w-5xl grid-cols-2 gap-x-5 gap-y-14 lg:grid-cols-4 lg:gap-x-8">
      {signs.map((s, i) => (
        <motion.li
          key={s.title}
          className="flex flex-col items-center"
          initial={reduce ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative flex h-36 w-full items-end justify-center sm:h-44">
            <Cloud variant={i} src={clouds.length ? clouds[i % clouds.length] : ""} className="absolute -bottom-3 w-[115%] max-w-60" />
            <div className="bob relative mb-5 size-24 sm:size-28" style={{ "--bob": `${5 + i * 0.7}s` } as CSSProperties}>
              <Emblem sign={s} />
            </div>
          </div>
          <h3 className="mt-6 font-display text-[1.6rem] leading-tight">{s.title}</h3>
          <p className="mt-1 font-display text-lg text-accent italic">{s.line}</p>
          <p className="mt-3 max-w-[28ch] text-[1.02rem] leading-relaxed text-balance text-ink-soft">{s.text}</p>
        </motion.li>
      ))}
    </ul>
  );
}
