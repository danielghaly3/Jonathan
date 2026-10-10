"use client";
import Image from "next/image";
import { CalendarPlus } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { Cloud } from "./Cloud";
import { Countdown } from "./Countdown";

type Props = {
  date: string; // YYYY-MM-DD
  weekday: string;
  month: string;
  when: string;
  countdownTarget: string;
  icsHref: string;
  icsName: string;
  dove: string;
  cloud: string;
};

const soft = [0.22, 1, 0.36, 1] as const;
const WEEK = ["S", "M", "T", "W", "T", "F", "S"];

/**
 * "Save the day" as an illuminated calendar page resting on a cloud: the day glowing in a golden halo,
 * the month laid out beneath with the day ringed in gold, the countdown, and "Add to calendar".
 */
export function SaveTheDay({ date, weekday, month, when, countdownTarget, icsHref, icsName, dove, cloud }: Props) {
  const reduce = useReducedMotion();
  const [y, m, d] = date.split("-").map(Number);
  const lead = new Date(Date.UTC(y, m - 1, 1)).getUTCDay();
  const days = new Date(Date.UTC(y, m, 0)).getUTCDate();
  const cells = [...Array(lead).fill(0), ...Array.from({ length: days }, (_, i) => i + 1)];

  const view = { once: true, amount: 0.3 } as const;
  const t = (duration: number, delay = 0) => (reduce ? { duration: 0 } : { duration, delay, ease: soft });

  return (
    <figure className="relative mx-auto w-full max-w-[27rem]">
      {dove && (
        <motion.div className="absolute -top-14 left-1/2 z-10 w-20 -translate-x-1/2" initial={{ opacity: 0, y: -30 }} whileInView={{ opacity: 1, y: 0 }} viewport={view} transition={t(1.4)}>
          <Image src={dove} alt="" width={160} height={160} className="bob h-auto w-full drop-shadow-[0_8px_18px_rgb(168_132_63/0.4)]" />
        </motion.div>
      )}

      {/* The card rests on clouds that drift out from behind it, never over the button. */}
      <Cloud variant={0} src={cloud} className="drift absolute -bottom-14 -left-[34%] w-[80%]" />
      <Cloud variant={3} src={cloud} className="drift absolute -right-[36%] -bottom-16 w-[85%]" />

      <div className="glass relative overflow-hidden rounded-[999px_999px_44px_44px] px-6 pt-24 pb-10 sm:px-10">
        {/* The day */}
        <p className="font-display text-xl text-ink-soft italic">{weekday}</p>
        <div className="mt-2 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold" />
          <span className="label text-gold-ink">{month}</span>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold" />
        </div>
        <div className="relative mt-1 flex justify-center">
          <div aria-hidden className="halo absolute top-1/2 left-1/2 size-72 -translate-x-1/2 -translate-y-1/2" />
          <motion.p
            className="relative font-display text-[clamp(6.5rem,30vw,8.5rem)] leading-[1] font-light text-accent"
            initial={{ opacity: 0, scale: 0.85, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={view}
            transition={t(1.4, 0.2)}
          >
            {d}
          </motion.p>
        </div>
        <p className="label text-gold-ink" style={{ letterSpacing: "0.5em", paddingLeft: "0.5em" }}>
          {y}
        </p>
        <p className="mt-5 font-display text-[1.35rem] text-ink italic">{when}</p>

        {/* The month, with the day ringed in gold */}
        <div className="mx-auto mt-8 max-w-[17rem] border-t border-gold/35 pt-6" aria-hidden>
          <div className="grid grid-cols-7 gap-y-1 font-sans text-[0.6rem] tracking-[0.15em] text-gold-ink">
            {WEEK.map((w, i) => (
              <span key={i}>{w}</span>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-7 gap-y-1.5">
            {cells.map((n, i) => (
              <motion.span
                key={i}
                className="relative flex h-8 items-center justify-center font-sans text-[0.8rem] text-ink-soft tabular-nums"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: n ? 1 : 0 }}
                viewport={view}
                transition={t(0.5, 0.3 + i * 0.015)}
              >
                {n === d ? (
                  <>
                    <motion.span className="absolute size-8 rounded-full bg-accent" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={view} transition={t(0.6, 1.1)} />
                    <svg className="absolute size-10 -rotate-90 text-gold" viewBox="0 0 40 40">
                      <motion.circle cx="20" cy="20" r="18.5" fill="none" stroke="currentColor" strokeWidth="1" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={view} transition={t(1.2, 1.4)} />
                    </svg>
                    <span className="relative font-medium text-on-accent">{n}</span>
                  </>
                ) : n ? (
                  n
                ) : null}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Countdown */}
        <div className="mt-6 border-t border-gold/35 pt-6">
          <p className="font-display text-lg text-ink-soft italic">Until the day</p>
          <div className="mt-3">
            <Countdown target={countdownTarget} />
          </div>
        </div>

        <a
          href={icsHref}
          download={icsName}
          className="mt-8 inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-accent px-7 font-sans text-[0.76rem] font-medium tracking-[0.18em] text-on-accent uppercase shadow-[0_14px_32px_-14px_rgb(107_42_54/0.7)] transition hover:opacity-90 active:translate-y-px"
        >
          <CalendarPlus size={18} weight="light" /> Add to calendar
        </a>
      </div>

      <figcaption className="sr-only">
        {weekday}, {month} {d}, {y}. {when}.
      </figcaption>
    </figure>
  );
}
