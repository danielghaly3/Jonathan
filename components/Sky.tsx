"use client";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from "motion/react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
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
  // Each cloud moves on its own small layer (one tall layer per depth is far too heavy for phones).
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
  // Transforms, not left/top: moving with left/top re-lays-out the page on every frame.
  const dx = useTransform(x, (v) => `${v}vw`);
  const dy = useTransform(y, (v) => `${v}vh`);
  const xv = useVelocity(x);
  const tilt = useTransform(xv, [-60, 0, 60], [-14, 0, 14], { clamp: true });
  const [facing, setFacing] = useState(1);
  const flap = useRef<HTMLDivElement>(null);
  useMotionValueEvent(xv, "change", (v) => Math.abs(v) > 2 && setFacing(v < 0 ? -1 : 1));
  // Faster wingbeat while scrolling, set straight on the element so the sky never re-renders for it.
  useMotionValueEvent(useVelocity(scrollY), "change", (v) => flap.current?.style.setProperty("--flap", Math.abs(v) > 120 ? "0.32s" : "0.85s"));

  const src = (i: number) => (clouds.length ? clouds[i % clouds.length] : "");
  // Phones get a lighter sky: fewer clouds and no sideways drift (the scroll parallax stays).
  const layer = (items: readonly (readonly number[])[], offset: number, stripVh: number, y: typeof farY, extra = "") =>
    items
      .filter((_, i) => !phone || i % 2 === 0)
      .map(([l, t, w, d], i) => (
        <motion.div key={i} className="absolute will-change-transform" style={{ left: `${l}vw`, top: `${(t * stripVh) / 100}vh`, width: `${w}vw`, y }}>
          <Cloud
            variant={i + offset}
            src={src(i + offset)}
            className={`${phone ? "" : "drift"} ${extra}`}
            style={{ "--drift": `${d}s`, "--drift-x": `${20 + (i % 3) * 14}px` } as CSSProperties}
          />
        </motion.div>
      ));

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="sky-morning absolute inset-0" />
      <motion.div className="sky-dusk absolute inset-0" style={{ opacity: dusk }} />

      <div className="opacity-80">{layer(FAR, 0, 260, farY, "min-w-48")}</div>

      {!reduce && !phone &&
        SPARKS.map((m, i) => (
          <span key={i} className="mote absolute bottom-[-10px] rounded-full bg-[#e9cf98]" style={{ left: `${m.left}%`, width: m.size, height: m.size, animationDuration: `${m.duration}s`, animationDelay: `${m.delay}s` }} />
        ))}

      {!reduce && (dove.front || dove.flyUp) && (
        <motion.div className="absolute top-0 left-0 will-change-transform" style={{ x: dx, y: dy, rotate: tilt }}>
          <div ref={flap} className="-translate-x-1/2 -translate-y-1/2" style={{ transform: dove.flyUp ? `scaleX(${facing})` : undefined, transition: "transform 0.4s ease" }}>
            <Dove art={dove} size={phone ? 48 : 70} />
          </div>
        </motion.div>
      )}

      {layer(NEAR, 2, 430, nearY, "min-w-72 opacity-95")}
    </div>
  );
}
