export type Rsvp = { attending: boolean; name: string; phone: string; guests: number };

/** Validates untrusted RSVP input. Shared by the form (instant feedback) and the API (the real gate). */
export function parseRsvp(input: Record<string, unknown>, maxGuests: number): { ok: true; data: Rsvp } | { ok: false; field: keyof Rsvp; error: string } {
  const attending = input.attending === "yes" ? true : input.attending === "no" ? false : null;
  const name = String(input.name ?? "").trim().replace(/\s+/g, " ");
  const phone = String(input.phone ?? "").trim();
  const guests = attending ? Number(input.guests) : 0;

  if (attending === null) return { ok: false, field: "attending", error: "Please let us know if you can make it." };
  if (name.length < 2 || name.length > 80) return { ok: false, field: "name", error: "Please enter your full name." };
  const digits = phone.replace(/\D/g, "");
  if (!/^\+?[\d\s().-]+$/.test(phone) || digits.length < 7 || digits.length > 15)
    return { ok: false, field: "phone", error: "Please enter a valid phone number." };
  if (attending && (!Number.isInteger(guests) || guests < 1 || guests > maxGuests))
    return { ok: false, field: "guests", error: `Please choose between 1 and ${maxGuests} guests.` };

  return { ok: true, data: { attending, name, phone, guests } };
}

/** One CSV row; neutralises spreadsheet formula injection. */
export const csvRow = (cells: (string | number)[]) =>
  cells.map((c) => `"${String(c).replace(/^[=+\-@]/, "'$&").replace(/"/g, '""')}"`).join(",") + "\n";
