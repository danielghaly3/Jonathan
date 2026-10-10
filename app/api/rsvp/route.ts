import { appendFile, mkdir } from "node:fs/promises";
import { invitation } from "@/invitation.config";
import { rsvpEmail } from "@/lib/email";
import { csvRow, parseRsvp } from "@/lib/rsvp";

/**
 * Delivers an RSVP. Every configured channel is used:
 * - RESEND_API_KEY + RSVP_TO_EMAIL: emailed (branded HTML) through Resend. RSVP_FROM_EMAIL optional.
 * - RSVP_WEBHOOK_URL: POSTed as JSON (e.g. a Google Apps Script that appends to a Sheet).
 * - Neither: appended to data/rsvps.csv.
 * shortcut: the CSV fallback only persists on a host with a writable disk (local / VPS), not on Vercel; configure email there.
 */
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") return Response.json({ error: "Invalid request." }, { status: 400 });
  if (body.website) return Response.json({ ok: true }); // honeypot: bots fill hidden fields

  const parsed = parseRsvp(body, invitation.rsvp.maxGuests);
  if (!parsed.ok) return Response.json({ error: parsed.error, field: parsed.field }, { status: 400 });

  const { attending, name, phone, guests } = parsed.data;
  const receivedAt = new Date().toISOString();
  const { RESEND_API_KEY: key, RSVP_TO_EMAIL: to, RSVP_FROM_EMAIL: from, RSVP_WEBHOOK_URL: hook } = process.env;
  try {
    if (key && to) {
      const mail = rsvpEmail(parsed.data, receivedAt, invitation.name);
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from: from || `${invitation.name}'s Baptism <onboarding@resend.dev>`, to: to.split(",").map((t) => t.trim()), ...mail }),
      });
      if (!res.ok) throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
    }
    if (hook) {
      const res = await fetch(hook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ attending, name, phone, guests, receivedAt }) });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    }
    if (!(key && to) && !hook) {
      await mkdir("data", { recursive: true });
      await appendFile("data/rsvps.csv", csvRow([receivedAt, attending ? "attending" : "declined", name, phone, guests]));
    }
  } catch (err) {
    console.error("RSVP not saved:", err);
    return Response.json({ error: "We couldn't save your reply. Please try again in a moment." }, { status: 500 });
  }
  return Response.json({ ok: true });
}
