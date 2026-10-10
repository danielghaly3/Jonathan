import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import type { ReactNode } from "react";
import { MapPin } from "@phosphor-icons/react/dist/ssr";
import { invitation as c } from "@/invitation.config";
import { Opening } from "@/components/Opening";
import { ReflectedPhoto } from "@/components/ReflectedPhoto";
import { Sanctuary } from "@/components/Sanctuary";
import { HeroName, OpenReveal, Reveal } from "@/components/Reveal";
import { RsvpForm } from "@/components/RsvpForm";
import { SaveTheDay } from "@/components/SaveTheDay";
import { SectionHeading } from "@/components/SectionHeading";
import { Signs } from "@/components/Signs";
import { Ripples, WaveLine } from "@/components/Water";
import { formatDate, formatDayMonth, formatMonth, formatTime, formatWeekday, icsHref, mapsHref, year } from "@/lib/format";

// Artwork is optional: use a file only if it is actually in /public.
const asset = (p: string) => (p && existsSync(join(process.cwd(), "public", p)) ? p : "");

export default function Home() {
  const { event: e, rsvp, photos, scripture } = c;
  const when = e.time ? formatTime(e.date, e.time, c.locale) : e.timeNote;
  const location = `${e.venue}, ${e.venueDetail}, ${e.address}`;
  const signs = c.signs.map((s) => ({ ...s, image: asset(s.image) }));
  const dove = { front: asset(c.art.dove), flyUp: asset(c.art.flyUp), flyDown: asset(c.art.flyDown) };
  const wide = asset(c.art.sanctuaryWide);
  const tall = asset(c.art.sanctuaryTall);
  const venuePhoto = asset(photos.venue.src);
  const section = "relative px-5 py-28 sm:py-36";

  return (
    <Opening name={c.name} heading={c.heading} date={formatDate(e.date, c.locale)} dove={dove.front} wide={wide} tall={tall}>
      <Sanctuary wide={wide} tall={tall} dove={dove} />
      <main className="overflow-x-clip text-center">
        {/* Hero: Jonathan in the arch, reflected in the water of the font */}
        <section className="flex min-h-[100dvh] flex-col items-center justify-center px-5 pt-16 pb-24">
          <OpenReveal delay={0.2}>
            <p className="label text-gold-ink">{c.heading}</p>
          </OpenReveal>
          <OpenReveal delay={0.4} className="mt-10 w-[min(64vw,calc(42dvh*0.8),20rem)]">
            <ReflectedPhoto photo={photos.main} preload />
          </OpenReveal>
          <div className="relative z-10 -mt-4">
            <HeroName name={c.name} />
          </div>
          <OpenReveal delay={2} className="mt-4 flex flex-col items-center">
            <p className="glass rounded-full px-7 py-2.5 font-display text-[1.25rem] text-accent sm:text-[1.4rem]">{formatDate(e.date, c.locale)}</p>
            <p className="mt-6 max-w-[34ch] text-[1.15rem] leading-[1.55] text-balance text-ink-soft italic sm:text-[1.3rem]">{c.message}</p>
          </OpenReveal>
        </section>

        <WaveLine />

        {/* The verse */}
        {scripture.show && (
          <section className={section}>
            <Reveal>
              <blockquote>
                <p className="mx-auto max-w-[20ch] font-display text-[clamp(2rem,6vw,3.4rem)] leading-[1.22] font-light text-balance text-ink italic">
                  &ldquo;{scripture.text}&rdquo;
                </p>
                <footer className="mt-8">
                  <cite className="label text-gold-ink not-italic">{scripture.reference}</cite>
                </footer>
              </blockquote>
            </Reveal>
          </section>
        )}

        {/* The signs of baptism */}
        <section className={section}>
          <Reveal>
            <SectionHeading>
              The signs of <em>baptism</em>
            </SectionHeading>
          </Reveal>
          <div className="mt-16">
            <Signs signs={signs} />
          </div>
        </section>

        <WaveLine />

        {/* Family */}
        <section className={section}>
          <Reveal>
            <SectionHeading>
              With <em>grateful</em> hearts
            </SectionHeading>
          </Reveal>
          <Reveal className="mx-auto mt-8 max-w-2xl">
            <p className="font-display text-[clamp(1.35rem,3.8vw,1.85rem)] leading-[1.5] font-light text-balance text-ink-soft">{c.invitationText}</p>
          </Reveal>
          {photos.family.src && (
            <Reveal className="mt-16 sm:mt-20">
              <ReflectedPhoto photo={photos.family} ratio="3/4" className="w-[min(70vw,24rem)]" />
              {c.hosts && <p className="mt-4 font-display text-xl text-gold-ink italic">{c.hosts}</p>}
            </Reveal>
          )}
        </section>

        {/* The day: an illuminated calendar page between two candles */}
        <section className={section}>
          <Reveal>
            <SectionHeading>
              Save the <em>day</em>
            </SectionHeading>
          </Reveal>
          <div className="mt-24 mb-10">
            <SaveTheDay
              date={e.date}
              weekday={formatWeekday(e.date, c.locale)}
              month={formatMonth(e.date, c.locale)}
              when={when}
              countdownTarget={`${e.date}T${e.time || "00:00"}:00${e.utcOffset}`}
              icsHref={icsHref({ title: `${c.name}'s Baptism`, date: e.date, time: e.time, durationMinutes: e.durationMinutes, location })}
              icsName={`${c.name.toLowerCase()}-baptism.ics`}
              dove={dove.front}
            />
          </div>
        </section>

        {/* The place */}
        <section className={section}>
          <Reveal>
            <SectionHeading>
              Where we <em>gather</em>
            </SectionHeading>
          </Reveal>
          <Reveal className="glass mx-auto mt-12 max-w-md rounded-[40px] px-6 pt-6 pb-10 sm:px-8">
            {venuePhoto && (
              <div className="relative mb-8 aspect-[4/3] overflow-hidden rounded-[999px_999px_28px_28px] ring-1 ring-gold/50">
                <Image src={venuePhoto} alt={photos.venue.alt} fill sizes="(min-width: 640px) 400px, 85vw" className="object-cover" />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#fffaf0]/45 via-transparent to-transparent" />
              </div>
            )}
            <p className="font-display text-[clamp(2rem,6vw,2.6rem)] leading-tight">{e.venue}</p>
            <p className="label mt-3 text-gold-ink">{e.venueDetail}</p>
            <p className="mt-3 text-lg text-balance text-ink-soft">{e.address}</p>
            <div className="mt-8 flex justify-center">
              <Action href={mapsHref(`${e.venueDetail}, ${e.address}`, e.mapsUrl)} icon={<MapPin size={18} weight="light" />} external>
                Open in Maps
              </Action>
            </div>
          </Reveal>
        </section>

        <WaveLine />

        {/* Reply */}
        <section id="rsvp" className={section}>
          <Reveal className="mx-auto max-w-md">
            <SectionHeading sub={`Kindly let us know, so we may prepare a place for you${rsvp.by ? ` by ${formatDayMonth(rsvp.by, c.locale)}` : ""}.`}>
              Will you <em>join us?</em>
            </SectionHeading>
            <div className="glass mt-10 rounded-[40px] px-5 py-8 sm:px-8">
              <RsvpForm maxGuests={rsvp.maxGuests} dove={dove} />
            </div>
          </Reveal>
        </section>

        {/* Blessing: the dove above the water of the font */}
        <footer className="relative px-5 pt-20 pb-24">
          <Reveal className="flex flex-col items-center">
            <div className="relative flex h-40 w-72 items-end justify-center">
              <div aria-hidden className="absolute bottom-0 h-10 w-full rounded-[50%] bg-[radial-gradient(closest-side,rgb(159_180_197/0.5),rgb(159_180_197/0))]" />
              <Ripples className="absolute -bottom-4 w-[120%]" rings={4} />
              {dove.front && <Image src={dove.front} alt="" width={176} height={176} className="bob relative mb-8 w-22 drop-shadow-[0_10px_20px_rgb(177_141_72/0.4)]" />}
            </div>
            <p className="mt-10 font-display text-[clamp(1.5rem,4.5vw,2rem)] font-light text-ink-soft italic">With love and prayers</p>
            <p className="mt-3 font-inscription text-[clamp(1.9rem,7vw,2.8rem)] leading-none text-accent uppercase" style={{ letterSpacing: "0.14em", paddingLeft: "0.14em" }}>
              {c.name}
            </p>
            <p className="label mt-4 text-gold-ink">{year(e.date)}</p>
          </Reveal>
        </footer>
      </main>
    </Opening>
  );
}

function Action({ href, icon, children, external, download }: { href: string; icon: ReactNode; children: ReactNode; external?: boolean; download?: string }) {
  return (
    <a
      href={href}
      download={download}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-[#fffaf0]/75 px-5 font-sans text-[0.76rem] font-medium tracking-[0.16em] whitespace-nowrap text-gold-ink uppercase ring-1 ring-gold/50 transition duration-300 hover:bg-[#fffaf0] active:translate-y-px"
    >
      {icon}
      {children}
    </a>
  );
}
