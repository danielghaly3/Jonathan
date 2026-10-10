"use client";
import Image from "next/image";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from "motion/react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Dove, type DoveArt } from "./Dove";

// Candle glows placed over the candles in the painted sanctuary (x %, y %, size vmin, flicker s).
const GLOWS = [
  [7, 62, 26, 3.1], [21, 66, 20, 2.6], [36, 72, 16, 3.6], [64, 72, 16, 2.9], [79, 66, 20, 3.4], [93, 62, 26, 2.7],
] as const;

// The dove's path across the viewport (vw / vh) through the whole page.
const AT = [0, 0.12, 0.28, 0.44, 0.6, 0.76, 0.9, 1];
const DX = [78, 18, 82, 14, 80, 20, 76, 50];
// Phones have no side margins to speak of, so the dove keeps to the very edges there.
const DX_PHONE = [88, 10, 90, 9, 89, 11, 88, 50];
const DY = [24, 34, 22, 36, 26, 34, 24, 30];

/**
 * The page's fixed backdrop: the sanctuary with its font, veiled in warm ivory so text stays readable,
 * candle glows flickering, light deepening to gold as the page goes on, and the dove of the Spirit
 * flying above, always behind the text.
 */
export function Sanctuary({ wide, tall, dove }: { wide: string; tall: string; dove: DoveArt }) {
  const reduce = useReducedMotion();
  const { scrollYProgress, scrollY } = useScroll();
  const zoom = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08]);
  const warmth = useTransform(scrollYProgress, [0.3, 1], [0, 1]);

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
  // Faster wingbeat while scrolling, set straight on the element so the backdrop never re-renders for it.
  useMotionValueEvent(useVelocity(scrollY), "change", (v) => flap.current?.style.setProperty("--flap", Math.abs(v) > 120 ? "0.32s" : "0.85s"));

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg">
      {(wide || tall) && (
        <motion.div className="absolute inset-0 will-change-transform" style={{ scale: zoom }}>
          <Image src={tall || wide} alt="" fill sizes="100vw" className="object-cover sm:hidden" />
          <Image src={wide || tall} alt="" fill sizes="100vw" className="hidden object-cover sm:block" />
        </motion.div>
      )}
      {/* Ivory veil: strongest at the centre where the text sits. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_45%,rgb(255_250_240/0.9),rgb(250_244_233/0.78)_60%,rgb(243_236_224/0.6))]" />
      <motion.div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_105%,rgb(214_168_98/0.4),transparent_70%)]" style={{ opacity: warmth }} />

      {!reduce &&
        GLOWS.map(([l, t, s, d], i) => (
          <div
            key={i}
            className="flicker absolute rounded-full bg-[radial-gradient(closest-side,rgb(255_210_130/0.42),rgb(255_210_130/0))]"
            style={{ left: `${l}%`, top: `${t}%`, width: `${s}vmin`, height: `${s}vmin`, translate: "-50% -50%", "--flicker": `${d}s` } as CSSProperties}
          />
        ))}

      {!reduce && (dove.front || dove.flyUp) && (
        <motion.div className="absolute top-0 left-0 will-change-transform" style={{ x: dx, y: dy, rotate: tilt }}>
          <div ref={flap} className="-translate-x-1/2 -translate-y-1/2" style={{ transform: dove.flyUp ? `scaleX(${facing})` : undefined, transition: "transform 0.4s ease" }}>
            <Dove art={dove} size={phone ? 48 : 70} />
          </div>
        </motion.div>
      )}
    </div>
  );
}
