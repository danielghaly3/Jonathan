"use client";
import { CheckCircle, HandHeart, HeartStraight, Minus, Plus } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState, type FormEvent } from "react";
import { parseRsvp, type Rsvp } from "@/lib/rsvp";
import { Courier } from "./Courier";
import type { DoveArt } from "./Dove";

type Choice = "yes" | "no";
type Status = { state: "idle" | "sending" } | { state: "flying" | "done"; name: string; attending: boolean } | { state: "error"; message: string; field?: keyof Rsvp };

const input =
  "min-h-12 w-full rounded-2xl border border-gold/45 bg-[#fffaf0]/80 px-5 font-sans text-base text-ink transition outline-none placeholder:text-ink-soft/80 focus:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent aria-[invalid=true]:border-accent";
const labelCls = "font-sans text-[0.72rem] font-medium tracking-[0.2em] text-blue-ink uppercase";

const CHOICES = [
  { value: "yes", label: "I'll be there", Icon: HeartStraight },
  { value: "no", label: "I can't make it", Icon: HandHeart },
] as const;

export function RsvpForm({ maxGuests, dove }: { maxGuests: number; dove: DoveArt }) {
  const [choice, setChoice] = useState<Choice | null>(null);
  const [guests, setGuests] = useState(1);
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const reduce = useReducedMotion();

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const values = Object.fromEntries(new FormData(e.currentTarget));
    const checked = parseRsvp(values, maxGuests);
    if (!checked.ok) return setStatus({ state: "error", message: checked.error, field: checked.field });

    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/rsvp", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) return setStatus({ state: "error", message: body.error ?? "Something went wrong. Please try again.", field: body.field });
      // The reply leaves by dove first (skipped when motion is reduced or there is no dove art).
      const canFly = !reduce && Boolean(dove.front || dove.flyUp);
      setStatus({ state: canFly ? "flying" : "done", name: checked.data.name.split(" ")[0], attending: checked.data.attending });
    } catch {
      setStatus({ state: "error", message: "No connection. Please check your internet and try again." });
    }
  }

  const err = (field: keyof Rsvp) => status.state === "error" && status.field === field;
  const fade = reduce ? {} : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -12 } };
  const grow = reduce
    ? {}
    : { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } };

  return (
    <AnimatePresence mode="wait">
      {status.state === "flying" ? (
        <motion.div key="flying" exit={{ opacity: 0 }}>
          <Courier art={dove} onDone={() => setStatus({ ...status, state: "done" })} />
        </motion.div>
      ) : status.state === "done" ? (
        <motion.div key="done" {...fade} className="flex flex-col items-center py-6 text-center" role="status">
          {status.attending ? <CheckCircle size={44} weight="thin" className="text-gold" /> : <HandHeart size={44} weight="thin" className="text-gold" />}
          <p className="mt-5 font-display text-[1.9rem] leading-tight font-light">Thank you, {status.name}.</p>
          <p className="mt-3 max-w-[30ch] text-lg text-balance text-ink-soft italic">
            {status.attending
              ? "Your reply is received. We can't wait to pray and celebrate with you."
              : "Thank you for letting us know. You will be missed, and remembered in our prayers."}
          </p>
        </motion.div>
      ) : (
        <motion.form key="form" {...fade} onSubmit={submit} onChange={() => status.state === "error" && setStatus({ state: "idle" })} noValidate className="grid text-left">
          {/* Honeypot: hidden from people, filled by bots. */}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" className="absolute -left-[9999px]" aria-hidden />

          <fieldset aria-describedby="rsvp-error">
            <legend className="sr-only">Will you attend?</legend>
            <div className="grid grid-cols-2 gap-3">
              {CHOICES.map(({ value, label, Icon }) => (
                <label key={value} className="cursor-pointer">
                  <input type="radio" name="attending" value={value} checked={choice === value} onChange={() => setChoice(value)} className="peer sr-only" />
                  <span className="flex min-h-28 flex-col items-center justify-center gap-2.5 rounded-3xl border border-gold/45 bg-[#fffaf0]/65 px-3 py-4 text-center text-gold-ink transition duration-300 peer-checked:border-accent peer-checked:bg-accent peer-checked:text-on-accent peer-checked:shadow-[0_18px_40px_-18px_rgb(107_42_54/0.7)] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent hover:border-gold">
                    <Icon size={26} weight="light" />
                    <span className="font-display text-[1.3rem] leading-tight">{label}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <AnimatePresence initial={false}>
            {choice && (
              <motion.div key="fields" {...grow} className="overflow-hidden">
                <div className="grid gap-6 px-0.5 pt-8 pb-8">
                  <div className="grid gap-2">
                    <label htmlFor="rsvp-name" className={labelCls}>Full name</label>
                    <input id="rsvp-name" name="name" autoComplete="name" required maxLength={80} className={input} aria-invalid={err("name")} aria-describedby="rsvp-error" />
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="rsvp-phone" className={labelCls}>Phone number</label>
                    <input id="rsvp-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required maxLength={24} className={input} aria-invalid={err("phone")} aria-describedby="rsvp-error" />
                  </div>

                  <AnimatePresence initial={false}>
                    {choice === "yes" && (
                      <motion.div key="guests" {...grow} className="-mb-6 overflow-hidden">
                        <div className="grid gap-2 px-0.5 pb-6">
                          <label htmlFor="rsvp-guests" className={labelCls}>Number of guests, including you</label>
                          <div className="flex items-stretch overflow-hidden rounded-full border border-gold/45 bg-[#fffaf0]/80">
                            <button type="button" aria-label="Fewer guests" onClick={() => setGuests((g) => Math.max(1, g - 1))} disabled={guests <= 1} className="flex w-14 cursor-pointer items-center justify-center text-gold-ink transition hover:bg-bg-tint disabled:cursor-default disabled:opacity-35">
                              <Minus size={18} />
                            </button>
                            <input
                              id="rsvp-guests"
                              name="guests"
                              type="number"
                              min={1}
                              max={maxGuests}
                              value={guests}
                              onChange={(e) => setGuests(Math.min(maxGuests, Math.max(1, Number(e.target.value) || 1)))}
                              className="min-h-12 w-full border-x border-gold/60 bg-transparent text-center font-display text-2xl text-ink outline-none [appearance:textfield] focus-visible:outline-2 focus-visible:outline-accent [&::-webkit-inner-spin-button]:appearance-none"
                              aria-invalid={err("guests")}
                            />
                            <button type="button" aria-label="More guests" onClick={() => setGuests((g) => Math.min(maxGuests, g + 1))} disabled={guests >= maxGuests} className="flex w-14 cursor-pointer items-center justify-center text-gold-ink transition hover:bg-bg-tint disabled:cursor-default disabled:opacity-35">
                              <Plus size={18} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    type="submit"
                    disabled={status.state === "sending"}
                    className="min-h-13 cursor-pointer rounded-full bg-accent px-6 font-sans text-[0.8rem] font-medium tracking-[0.18em] text-on-accent uppercase shadow-[0_10px_22px_-12px_rgb(107_42_54/0.6)] transition hover:opacity-90 active:translate-y-px disabled:cursor-wait disabled:opacity-70"
                  >
                    {status.state === "sending" ? "Sending…" : "Send my reply"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <p id="rsvp-error" aria-live="polite" className="-mt-4 min-h-5 text-center font-sans text-sm text-accent">
            {status.state === "error" ? status.message : ""}
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
