// Dates are parsed and formatted in UTC so the server's timezone never shifts the day.
const at = (date: string, time = "00:00") => new Date(`${date}T${time}:00Z`);

export const formatDate = (date: string, locale: string) =>
  new Intl.DateTimeFormat(locale, { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(at(date));

export const formatDayMonth = (date: string, locale: string) =>
  new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", timeZone: "UTC" }).format(at(date));

export const formatTime = (date: string, time: string, locale: string) =>
  new Intl.DateTimeFormat(locale, { hour: "numeric", minute: "2-digit", timeZone: "UTC" }).format(at(date, time));

export const mapsHref = (query: string, override = "") =>
  override || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

// Floating local time (no Z): calendars place it at the event's local wall-clock time.
const icsStamp = (d: Date) => d.toISOString().replace(/[-:]/g, "").slice(0, 15);

export type CalEvent = { title: string; date: string; time: string; durationMinutes: number; location: string; details: string };

// No time: an all-day entry (the end is the exclusive next day).
const span = (e: CalEvent) => {
  const start = at(e.date, e.time || "00:00");
  const end = new Date(start.getTime() + (e.time ? e.durationMinutes * 60_000 : 86_400_000));
  const f = (d: Date) => (e.time ? icsStamp(d) : icsStamp(d).slice(0, 8));
  return { start, from: f(start), to: f(end) };
};

/** The .ics file served at /event.ics (Apple Calendar, Outlook, Samsung...). */
export const icsText = (e: CalEvent) => {
  const { start, from, to } = span(e);
  const when = (v: string) => (e.time ? `:${v}` : `;VALUE=DATE:${v}`);
  const esc = (s: string) => s.replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Baptism Invitation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${from}-baptism@invitation`,
    `DTSTAMP:${icsStamp(start)}Z`,
    `DTSTART${when(from)}`,
    `DTEND${when(to)}`,
    `SUMMARY:${esc(e.title)}`,
    `LOCATION:${esc(e.location)}`,
    `DESCRIPTION:${esc(e.details)}`,
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ]
    .map((l) => l.match(/.{1,74}/g)?.join("\r\n ") ?? l) // fold long lines (RFC 5545) for strict calendar apps
    .join("\r\n");
};

/** Google Calendar's "add event" page, prefilled (Android / Gmail users). */
export const googleCalendarHref = (e: CalEvent) => {
  const { from, to } = span(e);
  const q = new URLSearchParams({ action: "TEMPLATE", text: e.title, dates: `${from}/${to}`, location: e.location, details: e.details });
  return `https://calendar.google.com/calendar/render?${q}`;
};


export const formatWeekday = (date: string, locale: string) =>
  new Intl.DateTimeFormat(locale, { weekday: "long", timeZone: "UTC" }).format(at(date));

export const year = (date: string) => date.slice(0, 4);

export const formatMonth = (date: string, locale: string) =>
  new Intl.DateTimeFormat(locale, { month: "long", timeZone: "UTC" }).format(at(date));

export const dayOfMonth = (date: string) => String(Number(date.slice(8, 10)));
