import type { Rsvp } from "./rsvp";

// Server-only access to the Supabase `rsvps` table (row level security blocks everyone else).
const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SECRET_KEY;
export const dbConfigured = Boolean(url && key);

const headers = () => ({ apikey: key!, Authorization: `Bearer ${key}`, "Content-Type": "application/json" });

export async function saveRsvp(r: Rsvp) {
  const res = await fetch(`${url}/rest/v1/rsvps`, { method: "POST", headers: { ...headers(), Prefer: "return=minimal" }, body: JSON.stringify(r) });
  if (!res.ok) throw new Error(`Supabase responded ${res.status}: ${await res.text()}`);
}

export type StoredRsvp = Rsvp & { id: number; created_at: string };

export async function listRsvps(): Promise<StoredRsvp[]> {
  const res = await fetch(`${url}/rest/v1/rsvps?select=*&order=created_at.desc`, { headers: headers(), cache: "no-store" });
  if (!res.ok) throw new Error(`Supabase responded ${res.status}`);
  return res.json();
}
