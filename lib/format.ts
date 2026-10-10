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

export const icsHref = (e: { title: string; date: string; time: string; durationMinutes: number; location: string }) => {
  // No time: an all-day entry (DTEND is the exclusive next day).
  const start = at(e.date, e.time || "00:00");
  const end = e.time ? new Date(start.getTime() + e.durationMinutes * 60_000) : new Date(start.getTime() + 86_400_000);
  const when = (d: Date) => (e.time ? `:${icsStamp(d)}` : `;VALUE=DATE:${icsStamp(d).slice(0, 8)}`);
  const esc = (s: string) => s.replace(/([,;\\])/g, "\\$1");
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Baptism Invitation//EN",
    "BEGIN:VEVENT",
    `UID:${icsStamp(start)}-baptism@invitation`,
    `DTSTAMP:${icsStamp(start)}Z`,
    `DTSTART${when(start)}`,
    `DTEND${when(end)}`,
    `SUMMARY:${esc(e.title)}`,
    `LOCATION:${esc(e.location)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
};


export const formatWeekday = (date: string, locale: string) =>
  new Intl.DateTimeFormat(locale, { weekday: "long", timeZone: "UTC" }).format(at(date));

export const year = (date: string) => date.slice(0, 4);

export const formatMonth = (date: string, locale: string) =>
  new Intl.DateTimeFormat(locale, { month: "long", timeZone: "UTC" }).format(at(date));

export const dayOfMonth = (date: string) => String(Number(date.slice(8, 10)));
