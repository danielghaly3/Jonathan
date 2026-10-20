import type { Metadata } from "next";
import { invitation as c } from "@/invitation.config";
import { ArchPhoto } from "@/components/ArchPhoto";
import { CopticCross } from "@/components/CopticCross";
import { GoldDivider, LatticeBand } from "@/components/Ornaments";
import { formatDate, formatDayMonth, formatTime } from "@/lib/format";

export const metadata: Metadata = { title: `${c.name} · Printable invitation` };

/** 5 x 7 in card. Print from the browser, or `npm run export` for PNG (300 dpi) + PDF. */
export default function PrintCard() {
  const { event: e, rsvp, scripture } = c;
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-bg-tint py-10 print:block print:min-h-0 print:bg-transparent print:p-0">
      <div
        id="card"
        data-theme="light"
        className="relative flex h-[7in] w-[5in] shrink-0 flex-col items-center overflow-hidden bg-bg px-[46px] pt-[56px] pb-[60px] text-center text-ink shadow-[0_24px_60px_-28px_rgb(80_60_30/0.35)] print:shadow-none"
      >
        <div aria-hidden className="pointer-events-none absolute inset-[14px] border border-gold/70" />
        <div aria-hidden className="pointer-events-none absolute inset-[19px] border border-gold/35" />
        <div aria-hidden className="absolute inset-x-[24px] top-[24px] opacity-70"><LatticeBand /></div>
        <div aria-hidden className="absolute inset-x-[24px] bottom-[24px] opacity-70"><LatticeBand /></div>

        <CopticCross size={40} animate={false} className="mt-1 shrink-0" />
        <p className="label mt-3 !text-[7.5px] text-gold-ink">{c.heading}</p>
        <h1 className="mt-1 font-name text-[70px] leading-[1.2] text-accent">
          {c.name}
        </h1>

        <ArchPhoto photo={c.photos.main} ratio="4:5" shape="arch" sizes="480px" className="mt-5 w-[104px] shrink-0" />

        <p className="mt-6 font-display text-[17px] text-gold-ink">{formatDate(e.date, c.locale)}</p>
        {e.liturgy.time && (
          <p className="mt-0.5 font-display text-[14px] text-ink-soft italic">
            Divine Liturgy {formatTime(e.date, e.liturgy.time, c.locale)}, {e.liturgy.church}
          </p>
        )}
        <p className="mt-0.5 font-display text-[14px] text-ink-soft italic">
          {e.time ? `${e.liturgy.time ? "Celebration " : ""}${formatTime(e.date, e.time, c.locale)}${e.liturgy.time ? `, ${e.timeNote.replace(/^F/, "f")}` : ""}` : e.timeNote}
        </p>
        <p className="mt-1.5 font-display text-[15px]">
          {e.venue}, {e.venueDetail}
        </p>
        <p className="text-[12.5px] text-ink-soft">{e.address}</p>

        {scripture.show && (
          <>
            <GoldDivider className="mt-5 scale-75" />
            <p className="mt-3 max-w-[34ch] text-[12.5px] leading-[1.35] text-ink-soft italic">&ldquo;{scripture.text}&rdquo;</p>
            <p className="mt-1 font-sans text-[8px] tracking-[0.18em] text-gold-ink">{scripture.reference}</p>
          </>
        )}

        <p className="label mt-auto pt-4 !text-[7px] !tracking-[0.2em] text-blue-ink">
          Kindly reply{rsvp.by && ` by ${formatDayMonth(rsvp.by, c.locale)}`} online
        </p>
      </div>
      <p className="font-sans text-xs tracking-wide text-ink-soft print:hidden">Print at 5 × 7 in with no margins, or run npm run export.</p>
    </main>
  );
}
