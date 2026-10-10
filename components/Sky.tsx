"use client";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from "motion/react";
import { useEffect, useState, type CSSProperties } from "react";
import { Cloud } from "./Cloud";
import { Dove, type DoveArt } from "./Dove";

// Cloud placements on each layer's tall strip: left %, top %, width (vw), drift seconds.
const FAR = [
  [-6, 2, 34, 70], [62, 6, 30, 90], [24, 18, 22, 80], [78, 27, 26, 75],
  [-4, 40, 28, 85], [52, 50, 32, 70], [10, 66, 24, 95], [70, 76, 30, 80], [30, 90, 26, 75],
] as const;
const NEAR = [
  [-14, 8, 48, 60], [74, 20, 44, 70], [-18, 38, 52, 65], [70, 55, 50, 75], [-10, 74, 46, 60], [66, 90, 52, 70],
] as const;
const SPARKS = Array.from({ length: 16 }, (_, i) => ({ left: (i * 43 + 9) % 100, size: 2 + (i % 3), duration: 14 + ((i * 5) % 10), delay: -((i * 3) % 16) }));

// The dove's path across the viewport (vw / vh) through the whole page.
const AT = [0, 0.12, 0.28, 0.44, 0.6, 0.76, 0.9, 1];
const DX = [78, 18, 82, 14, 80, 20, 76, 50];
// Phones have no side margins to speak of, so the dove keeps to the very edges there.
const DX_PHONE = [88, 10, 90, 9, 89, 11, 88, 50];
const DY = [24, 34, 22, 36, 26, 34, 24, 30];

/**
 * The page's fixed sky. Morning light at the top of the page warms to golden light at the end;
 * far and near cloud layers drift and rise at different speeds; a dove flies between them,
 * always behind the text.
 */
export function Sky({ clouds, dove }: { clouds: string[]; dove: DoveArt }) {
  const reduce = useReducedMotion();
  const { scrollYProgress, scrollY } = useScroll();
  const dusk = useTransform(scrollYProgress, [0.35, 1], [0, 1]);
  const farY = useTransform(scrollYProgress, [0, 1], ["0vh", reduce ? "0vh" : "-160vh"]);
  const nearY = useTransform(scrollYProgress, [0, 1], ["0vh", reduce ? "0vh" : "-330vh"]);

  const p = useSpring(scrollYProgress, { stiffness: 40, damping: 18, mass: 0.6 });
  const [phone, setPhone] = useState(false);
  useEffect(() => {
    const mq = matchMedia("(max-width: 640px)");
    const update = () => setPhone(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const x = useTransform(p, AT, phone ? DX_PHONE : DX);
  const y = useTransform(p, AT, DY);
  const left = useTransform(x, (v) => `${v}vw`);
  const top = useTransform(y, (v) => `${v}vh`);
  const xv = useVelocity(x);
  const tilt = useTransform(xv, [-60, 0, 60], [-14, 0, 14], { clamp: true });
  const [facing, setFacing] = useState(1);
  const [busy, setBusy] = useState(false);
  useMotionValueEvent(xv, "change", (v) => Math.abs(v) > 2 && setFacing(v < 0 ? -1 : 1));
  useMotionValueEvent(useVelocity(scrollY), "change", (v) => setBusy(Math.abs(v) > 120));

  const src = (i: number) => (clouds.length ? clouds[i % clouds.length] : "");
  const layer = (items: readonly (readonly number[])[], offset: number, extra = "") =>
    items.map(([l, t, w, d], i) => (
      <Cloud
        key={i}
        variant={i + offset}
        src={src(i + offset)}
        className={`drift absolute ${extra}`}
        style={{ left: `${l}vw`, top: `${t}%`, width: `${w}vw`, "--drift": `${d}s`, "--drift-x": `${20 + (i % 3) * 14}px` } as CSSProperties}
      />
    ));

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="sky-morning absolute inset-0" />
      <motion.div className="sky-dusk absolute inset-0" style={{ opacity: dusk }} />

      <motion.div className="absolute inset-x-0 top-0 h-[260vh] opacity-80" style={{ y: farY }}>
        {layer(FAR, 0, "min-w-48")}
      </motion.div>

      {!reduce &&
        SPARKS.map((m, i) => (
          <span key={i} className="mote absolute bottom-[-10px] rounded-full bg-[#e9cf98]" style={{ left: `${m.left}%`, width: m.size, height: m.size, animationDuration: `${m.duration}s`, animationDelay: `${m.delay}s` }} />
        ))}

      {!reduce && (dove.front || dove.flyUp) && (
        <motion.div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left, top, rotate: tilt }}>
          <div style={{ transform: dove.flyUp ? `scaleX(${facing})` : undefined, transition: "transform 0.4s ease" }}>
            <Dove art={dove} size={phone ? 48 : 70} speed={busy ? 0.32 : 0.85} />
          </div>
        </motion.div>
      )}

      <motion.div className="absolute inset-x-0 top-0 h-[430vh]" style={{ y: nearY }}>
        {layer(NEAR, 2, "min-w-72 opacity-95")}
      </motion.div>
    </div>
  );
}
