import type { Rsvp } from "./rsvp.ts";

// Guest input goes into HTML: escape everything.
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const when = (iso: string) =>
  new Intl.DateTimeFormat("en-CA", { dateStyle: "full", timeStyle: "short", timeZone: "America/Toronto" }).format(new Date(iso));

/** The RSVP notification: a short subject that tells the answer at a glance, and a branded, table-based HTML body. */
export function rsvpEmail(r: Rsvp, receivedAt: string, childName: string) {
  const answer = r.attending ? `Attending, ${r.guests} ${r.guests === 1 ? "guest" : "guests"}` : "Can't attend";
  const subject = `RSVP · ${r.name} · ${answer}`;
  const tel = r.phone.replace(/[^\d+]/g, "");

  const row = (label: string, value: string) => `
        <tr>
          <td style="padding:14px 0;border-bottom:1px solid #eadfc8;font:500 11px/1.4 Helvetica,Arial,sans-serif;letter-spacing:2px;text-transform:uppercase;color:#7e6129;width:38%;">${label}</td>
          <td style="padding:14px 0;border-bottom:1px solid #eadfc8;font:18px/1.4 Georgia,'Times New Roman',serif;color:#3b302b;">${value}</td>
        </tr>`;

  const badge = r.attending
    ? `<span style="display:inline-block;padding:8px 18px;border-radius:999px;background:#6b2a36;color:#faf6ee;font:500 12px/1 Helvetica,Arial,sans-serif;letter-spacing:2px;text-transform:uppercase;">&#10003;&nbsp; Attending</span>`
    : `<span style="display:inline-block;padding:8px 18px;border-radius:999px;background:#efe6d6;color:#6a5d55;border:1px solid #d9c9a8;font:500 12px/1 Helvetica,Arial,sans-serif;letter-spacing:2px;text-transform:uppercase;">Can&#39;t attend</span>`;

  const html = `<!doctype html>
<html><body style="margin:0;padding:0;background:#f3ece0;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3ece0;padding:32px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#fffaf0;border:1px solid #d9c9a8;border-radius:24px;overflow:hidden;">
        <tr><td align="center" style="background:#6b2a36;padding:28px 24px 24px;">
          <div style="font:22px/1 Georgia,serif;color:#e3c58a;">&#10013;</div>
          <div style="margin-top:10px;font:500 11px/1.4 Helvetica,Arial,sans-serif;letter-spacing:3px;text-transform:uppercase;color:#e3c58a;">New reply</div>
          <div style="margin-top:6px;font:26px/1.2 Georgia,'Times New Roman',serif;letter-spacing:4px;text-transform:uppercase;color:#faf6ee;">${esc(childName)}&#39;s Baptism</div>
        </td></tr>
        <tr><td align="center" style="padding:28px 28px 8px;">
          ${badge}
          <div style="margin-top:16px;font:italic 26px/1.3 Georgia,'Times New Roman',serif;color:#3b302b;">${esc(r.name)}</div>
        </td></tr>
        <tr><td style="padding:8px 32px 28px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${row("Phone", `<a href="tel:${esc(tel)}" style="color:#6b2a36;text-decoration:none;">${esc(r.phone)}</a>`)}
            ${row("Guests", r.attending ? String(r.guests) : "None")}
            ${row("Received", esc(when(receivedAt)))}
          </table>
        </td></tr>
        <tr><td align="center" style="padding:0 24px 28px;font:italic 14px/1.5 Georgia,serif;color:#6a5d55;">Sent from ${esc(childName)}&#39;s baptism invitation</td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

  const text = [`New reply for ${childName}'s Baptism`, "", answer, `Name: ${r.name}`, `Phone: ${r.phone}`, `Guests: ${r.attending ? r.guests : "None"}`, `Received: ${when(receivedAt)}`].join("\n");
  return { subject, html, text };
}
