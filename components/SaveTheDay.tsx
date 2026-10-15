"use client";
import Image from "next/image";
import { CalendarPlus, Church, Sparkle } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { Candle } from "./Water";
import { Countdown } from "./Countdown";

type Props = {
  date: string; // YYYY-MM-DD
  weekday: string;
  month: string;
  when: string;
  /** Optional Divine Liturgy before the celebration (already formatted time). */
  liturgy?: { time: string; church: string };
  whenNote?: string;
  countdownTarget: string;
  icsHref: string;
  googleHref: string;
  dove: string;
};

const soft = [0.22, 1, 0.36, 1] as const;
const WEEK = ["S", "M", "T", "W", "T", "F", "S"];

/**
 * "Save the day" as an illuminated calendar page between two candles: the day glowing in a golden halo,
 * the month laid out beneath with the day ringed in gold, the countdown, and "Add to calendar".
 */
export function SaveTheDay({ date, weekday, month, when, liturgy, whenNote, countdownTarget, icsHref, googleHref, dove }: Props) {
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

      {/* Two church candles keep watch beside the card (wider screens). */}
      <Candle height={190} className="absolute bottom-0 -left-24 hidden sm:flex" />
      <Candle height={150} className="absolute bottom-0 -right-24 hidden sm:flex" />

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
        {liturgy?.time ? (
          // The day's schedule: a gold thread from the Liturgy to the celebration that follows it.
          <div className="mx-auto mt-8 max-w-[19rem] border-t border-gold/35 pt-6">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-5 bg-gradient-to-r from-transparent to-gold sm:w-8" />
              <h3 className="label whitespace-nowrap text-gold-ink">Our Day&apos;s Schedule</h3>
              <span className="h-px w-5 bg-gradient-to-l from-transparent to-gold sm:w-8" />
            </div>
            <ol className="relative mx-auto mt-6 grid w-fit max-w-full gap-7 text-left">
              <span aria-hidden className="absolute top-6 bottom-6 left-6 w-px -translate-x-1/2 bg-gradient-to-b from-gold/70 via-gold/35 to-accent/60" />
              {[
                { time: liturgy.time, title: "Divine Liturgy", note: liturgy.church, Icon: Church, lit: false },
                { time: when, title: "Celebration", note: whenNote, Icon: Sparkle, lit: true },
              ].map(({ time, title, note, Icon, lit }, i) => (
                <motion.li
                  key={title}
                  className="relative grid grid-cols-[3rem_1fr] items-center gap-4"
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={view}
                  transition={t(0.9, 0.2 + i * 0.3)}
                >
                  <span
                    className={`relative grid size-12 place-items-center rounded-full border ${lit ? "border-accent bg-accent text-on-accent shadow-[0_10px_24px_-10px_rgb(107_42_54/0.7)]" : "border-gold/60 bg-panel text-gold-ink"}`}
                  >
                    <Icon size={22} weight="light" />
                  </span>
                  <div>
                    <p className="font-display text-[2rem] leading-none text-accent lining-nums tabular-nums">{time}</p>
                    <p className="label mt-2 text-gold-ink">{title}</p>
                    {note && <p className="mt-1 font-display text-[1.05rem] leading-snug text-ink-soft italic">{note}</p>}
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        ) : (
          <p className="mt-5 font-display text-[1.35rem] text-ink italic">{when}</p>
        )}

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
          className="mt-8 inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-accent px-7 font-sans text-[0.76rem] font-medium tracking-[0.18em] text-on-accent uppercase shadow-[0_14px_32px_-14px_rgb(107_42_54/0.7)] transition hover:opacity-90 active:translate-y-px"
        >
          <CalendarPlus size={18} weight="light" /> Add to calendar
        </a>
        <a href={googleHref} target="_blank" rel="noopener noreferrer" className="mt-3 block font-display text-base text-ink-soft italic underline decoration-gold/50 underline-offset-4">
          or add to Google Calendar
        </a>
      </div>

      <figcaption className="sr-only">
        {weekday}, {month} {d}, {y}. {liturgy?.time ? `Divine Liturgy at ${liturgy.time}, ${liturgy.church}. Celebration at ${when}${whenNote ? `, ${whenNote.replace(/^F/, "f")}` : ""}` : when}.
      </figcaption>
    </figure>
  );
}
