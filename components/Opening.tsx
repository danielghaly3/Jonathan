"use client";
import Image from "next/image";
import { animate, AnimatePresence, motion, useMotionTemplate, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { createContext, useContext, useEffect, useState, type CSSProperties, type ReactNode } from "react";

const Opened = createContext(true);
/** True once the intro has been opened; hero animations wait for it. */
export const useOpened = () => useContext(Opened);

const soft = [0.22, 1, 0.36, 1] as const;
const GLOWS = [[8, 66, 30, 3.1], [92, 66, 30, 2.7], [24, 74, 18, 3.5], [76, 74, 18, 2.9]] as const;

type Props = { name: string; date: string; heading: string; dove: string; wide: string; tall: string; children: ReactNode };

/**
 * The intro: the candlelit sanctuary. The dove descends, the name appears as if carved, and
 * "Open the invitation" lets a drop fall into the font: its ripples spread and open onto the invitation.
 */
export function Opening({ name, date, heading, dove, wide, tall, children }: Props) {
  const [opened, setOpened] = useState(false);
  const [gone, setGone] = useState(false);
  const reduce = useReducedMotion();

  // Ripple-shaped opening: a feathered hole that grows from where the drop lands.
  const r = useMotionValue(-200);
  const mask = useMotionTemplate`radial-gradient(circle at 50% 58%, transparent ${r}px, #000 calc(${r}px + 120px))`;
  const ring = useTransform(r, (v) => Math.max(0, v + 60) * 2);

  // Every visit, including a refresh, starts at the beginning: no restored scroll, no #section jump.
  useEffect(() => {
    history.scrollRestoration = "manual";
    if (location.hash) history.replaceState(null, "", location.pathname + location.search);
    scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = gone ? "" : "hidden";
    return () => void (document.documentElement.style.overflow = "");
  }, [gone]);

  const open = () => {
    if (opened) return;
    setOpened(true);
    const end = Math.hypot(innerWidth, innerHeight) + 160;
    // The drop falls first (0.7 s), then the ripple opens.
    animate(r, end, { duration: reduce ? 0.01 : 1.8, delay: reduce ? 0 : 0.7, ease: [0.65, 0, 0.35, 1], onComplete: () => setGone(true) });
  };

  const at = (s: number) => (reduce ? 0 : s);
  const t = (s: number, duration = 1.2) => (reduce ? { duration: 0 } : { duration, delay: s, ease: soft });

  return (
    <Opened.Provider value={opened}>
      {children}
      <AnimatePresence>
        {!gone && (
          <motion.div
            key="intro"
            role="dialog"
            aria-modal="true"
            aria-label={`${name}'s baptism invitation`}
            className="fixed inset-0 z-50 overflow-hidden bg-[#f3ece0] text-center"
            data-theme="light"
            style={{ maskImage: mask, WebkitMaskImage: mask }}
          >
            <motion.div className="absolute inset-0" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} transition={t(0, 4)}>
              {(wide || tall) && (
                <>
                  <Image src={tall || wide} alt="" fill priority sizes="100vw" className="object-cover sm:hidden" />
                  <Image src={wide || tall} alt="" fill priority sizes="100vw" className="hidden object-cover sm:block" />
                </>
              )}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_55%_at_50%_45%,rgb(255_250_240/0.88),rgb(250_244_233/0.55)_65%,rgb(60_40_25/0.25))]" />
            </motion.div>
            {!reduce &&
              GLOWS.map(([l, tp, s, d], i) => (
                <div
                  key={i}
                  aria-hidden
                  className="flicker absolute rounded-full bg-[radial-gradient(closest-side,rgb(255_210_130/0.5),rgb(255_210_130/0))]"
                  style={{ left: `${l}%`, top: `${tp}%`, width: `${s}vmin`, height: `${s}vmin`, translate: "-50% -50%", "--flicker": `${d}s` } as CSSProperties}
                />
              ))}

            <motion.div
              className="relative flex h-full flex-col items-center justify-center px-6"
              animate={opened ? { opacity: 0, y: -24 } : {}}
              transition={{ duration: 0.8, ease: soft }}
            >
              {dove && (
                <motion.div initial={{ opacity: 0, y: -90 }} animate={{ opacity: 1, y: 0 }} transition={t(at(0.8), 2.2)} className="w-24 sm:w-28">
                  <Image src={dove} alt="" width={224} height={224} priority className="bob h-auto w-full drop-shadow-[0_10px_24px_rgb(168_132_63/0.45)]" />
                </motion.div>
              )}
              <motion.p className="mt-6 font-display text-[clamp(1.2rem,4vw,1.5rem)] text-[#6a5d55] italic" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={t(at(1.6))}>
                You are invited to the holy baptism of
              </motion.p>
              <p
                aria-label={name}
                className="mt-3 font-inscription text-[clamp(2.6rem,10.5vw,5.2rem)] leading-[1.15] text-[#6b2a36] uppercase drop-shadow-[0_2px_18px_rgb(255_250_240/0.9)]"
                style={{ letterSpacing: "0.12em", paddingLeft: "0.12em" }}
              >
                {[...name].map((ch, i) => (
                  <motion.span key={i} aria-hidden className="inline-block" initial={{ opacity: 0, y: 14, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={t(at(1.9 + i * 0.12), 1.3)}>
                    {ch}
                  </motion.span>
                ))}
              </p>
              <motion.p className="label mt-3 text-[#7e6129]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={t(at(3.2))}>
                {heading}
              </motion.p>
              <motion.p className="mt-2 font-display text-xl text-[#6a5d55]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={t(at(3.45))}>
                {date}
              </motion.p>
              <motion.button
                type="button"
                onClick={open}
                autoFocus
                className="mt-10 inline-flex min-h-13 cursor-pointer items-center rounded-full bg-[#6b2a36] px-8 font-sans text-[0.76rem] font-medium tracking-[0.2em] text-[#faf6ee] uppercase shadow-[0_18px_40px_-16px_rgb(107_42_54/0.7)] transition hover:opacity-90 active:scale-[0.98]"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={t(at(3.8), 1)}
              >
                Open the invitation
              </motion.button>
            </motion.div>

            {/* The drop that falls into the font when the invitation is opened. */}
            {opened && !reduce && (
              <motion.div
                aria-hidden
                className="absolute top-0 left-1/2 h-5 w-3.5 -translate-x-1/2 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-[radial-gradient(circle_at_40%_35%,#fffaf0,#9fb4c5_55%,#6f889c)] shadow-[0_0_14px_rgb(159_180_197/0.8)]"
                initial={{ y: "-5vh", opacity: 0 }}
                animate={{ y: "56vh", opacity: [0, 1, 1, 0] }}
                transition={{ duration: 0.75, ease: "easeIn", times: [0, 0.15, 0.9, 1] }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* The ripple's edge: a ring of gold light spreading with the opening. */}
      {opened && !gone && !reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed top-[58%] left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_60px_20px_rgb(255_226_160/0.45),inset_0_0_40px_14px_rgb(159_180_197/0.35)] ring-1 ring-[#c9a766]/70"
          style={{ width: ring, height: ring }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 2.4, delay: 0.7, ease: [0.7, 0, 0.84, 0] }}
        />
      )}
    </Opened.Provider>
  );
}
