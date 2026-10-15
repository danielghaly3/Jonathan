import { invitation as c } from "@/invitation.config";
import { formatTime, type CalEvent } from "./format";

const e = c.event;
/** The baptism as a calendar entry: one source for /event.ics and the Google Calendar link. */
export const calendarEvent: CalEvent = {
  title: `${c.name}'s Baptism`,
  date: e.date,
  time: e.time,
  durationMinutes: e.durationMinutes,
  location: `${e.venue}, ${e.venueDetail}, ${e.address}`,
  details: [
    c.heading,
    e.liturgy.time ? `Divine Liturgy at ${formatTime(e.date, e.liturgy.time, c.locale)}, ${e.liturgy.church}` : "",
    e.time && e.liturgy.time ? `Celebration at ${formatTime(e.date, e.time, c.locale)}, ${e.timeNote.replace(/^F/, "f")}` : e.timeNote,
    e.mapsUrl,
  ].filter(Boolean).join("\n"),
};
