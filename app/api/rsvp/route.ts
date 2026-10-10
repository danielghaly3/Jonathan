import { appendFile, mkdir } from "node:fs/promises";
import { invitation } from "@/invitation.config";
import { csvRow, parseRsvp } from "@/lib/rsvp";

/**
 * Stores an RSVP.
 * - If RSVP_WEBHOOK_URL is set (e.g. a Google Apps Script that appends to a Sheet), the RSVP is POSTed there as JSON.
 * - Otherwise it is appended to data/rsvps.csv.
 * shortcut: the CSV fallback only persists on a host with a writable disk (local / VPS), not on serverless hosts; set the webhook there.
 */
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") return Response.json({ error: "Invalid request." }, { status: 400 });
  if (body.website) return Response.json({ ok: true }); // honeypot: bots fill hidden fields

  const parsed = parseRsvp(body, invitation.rsvp.maxGuests);
  if (!parsed.ok) return Response.json({ error: parsed.error, field: parsed.field }, { status: 400 });

  const { attending, name, phone, guests } = parsed.data;
  const receivedAt = new Date().toISOString();
  try {
    const hook = process.env.RSVP_WEBHOOK_URL;
    if (hook) {
      const res = await fetch(hook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ attending, name, phone, guests, receivedAt }) });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } else {
      await mkdir("data", { recursive: true });
      await appendFile("data/rsvps.csv", csvRow([receivedAt, attending ? "attending" : "declined", name, phone, guests]));
    }
  } catch (err) {
    console.error("RSVP not saved:", err);
    return Response.json({ error: "We couldn't save your reply. Please try again in a moment." }, { status: 500 });
  }
  return Response.json({ ok: true });
}
