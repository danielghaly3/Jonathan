"use client";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { Cloud } from "./Cloud";

const Opened = createContext(true);
/** True once the clouds have parted; hero animations wait for it. */
export const useOpened = () => useContext(Opened);

const soft = [0.22, 1, 0.36, 1] as const;
const part = [0.65, 0, 0.35, 1] as const;
// One bank of clouds (top %, offset from its outer edge in vw, width vw); the right bank mirrors it.
const BANK = [
  [-10, -26, 86],
  [14, -38, 92],
  [36, -24, 82],
  [58, -40, 94],
  [80, -24, 86],
] as const;

type Props = { name: string; date: string; heading: string; dove: string; clouds: string[]; children: ReactNode };

/**
 * The intro: the screen is a bank of clouds that drifts open to reveal the dove and Jonathan's name.
 * "Open the invitation" parts the clouds completely onto the sky of the site.
 */
export function Opening({ name, date, heading, dove, clouds, children }: Props) {
  const [opened, setOpened] = useState(false);
  const [gone, setGone] = useState(false);
  const reduce = useReducedMotion();

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

  const at = (s: number) => (reduce ? 0 : s);
  const t = (s: number, duration = 1.2) => (reduce ? { duration: 0 } : { duration, delay: s, ease: soft });
  // Closed -> ajar (on load) -> fully parted (on open).
  const bankX = (side: number) => (opened ? `${side * 95}vw` : `${side * 22}vw`);

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
            className="fixed inset-0 z-50 overflow-hidden text-center"
            data-theme="light"
          >
            <motion.div
              className="sky-morning absolute inset-0"
              animate={{ opacity: opened ? 0 : 1 }}
              transition={{ duration: reduce ? 0.2 : 1.4, delay: opened ? at(0.5) : 0 }}
              onAnimationComplete={() => opened && setGone(true)}
            />

            {[-1, 1].map((side) => (
              <motion.div
                key={side}
                aria-hidden
                className={`absolute inset-y-0 w-full ${side < 0 ? "left-0" : "right-0"}`}
                initial={{ x: "0vw" }}
                animate={{ x: bankX(side), scale: opened ? 1.25 : 1 }}
                transition={reduce ? { duration: 0.2 } : opened ? { duration: 1.9, ease: part } : { duration: 3.2, delay: 0.4, ease: soft }}
              >
                {BANK.map(([top, edge, width], i) => (
                  <Cloud
                    key={i}
                    variant={i + (side > 0 ? 2 : 0)}
                    src={clouds.length ? clouds[(i + (side > 0 ? 2 : 0)) % clouds.length] : ""}
                    className={`absolute ${side > 0 ? "-scale-x-100" : ""}`}
                    style={{ top: `${top}%`, [side < 0 ? "left" : "right"]: `${edge}vw`, width: `${width}vw`, minWidth: 420 }}
                  />
                ))}
              </motion.div>
            ))}

            <motion.div
              className="relative flex h-full flex-col items-center justify-center px-6"
              animate={opened ? { opacity: 0, y: -40 } : {}}
              transition={{ duration: 0.9, ease: soft }}
            >
              {dove && (
                <motion.div initial={{ opacity: 0, y: -90 }} animate={{ opacity: 1, y: 0 }} transition={t(at(1.2), 2.2)} className="w-24 sm:w-28">
                  <Image src={dove} alt="" width={224} height={224} priority className="bob h-auto w-full drop-shadow-[0_10px_24px_rgb(177_141_72/0.45)]" />
                </motion.div>
              )}
              <motion.p className="mt-6 font-display text-[clamp(1.2rem,4vw,1.5rem)] text-[#6a5d55] italic" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={t(at(2))}>
                You are invited to the holy baptism of
              </motion.p>
              {/* The name in Roman inscription capitals, each letter surfacing as if carved. */}
              <p
                aria-label={name}
                className="mt-3 font-inscription text-[clamp(2.6rem,10.5vw,5.2rem)] leading-[1.15] text-[#6b2a36] uppercase drop-shadow-[0_2px_18px_rgb(255_250_240/0.9)]"
                style={{ letterSpacing: "0.12em", paddingLeft: "0.12em" }}
              >
                {[...name].map((ch, i) => (
                  <motion.span
                    key={i}
                    aria-hidden
                    className="inline-block"
                    initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={t(at(2.2 + i * 0.12), 1.3)}
                  >
                    {ch}
                  </motion.span>
                ))}
              </p>
              <motion.p className="label mt-3 text-[#7e6129]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={t(at(3.6))}>
                {heading}
              </motion.p>
              <motion.p className="mt-2 font-display text-xl text-[#6a5d55]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={t(at(3.85))}>
                {date}
              </motion.p>
              <motion.button
                type="button"
                onClick={() => setOpened(true)}
                autoFocus
                className="glass mt-10 inline-flex min-h-13 cursor-pointer items-center rounded-full px-8 font-sans text-[0.76rem] font-medium tracking-[0.2em] text-[#6b2a36] uppercase transition hover:bg-[#fffaf0]/85 active:scale-[0.98]"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={t(at(4.2), 1)}
              >
                Open the invitation
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Opened.Provider>
  );
}
