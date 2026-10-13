import { calendarEvent } from "@/lib/calendar";
import { icsText } from "@/lib/format";

/** A real calendar file (not a data: link), which phones open straight into their calendar app. */
export function GET() {
  return new Response(icsText(calendarEvent), {
    headers: { "Content-Type": "text/calendar; charset=utf-8", "Content-Disposition": 'inline; filename="baptism.ics"' },
  });
}
