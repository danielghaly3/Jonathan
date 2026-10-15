import { createHash, timingSafeEqual } from "node:crypto";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { dbConfigured, deleteRsvp, listRsvps } from "@/lib/db";
import { AutoRefresh } from "./AutoRefresh";
import { PasswordInput } from "./PasswordInput";
import { RemoveButton } from "./RemoveButton";

export const metadata: Metadata = { title: "Replies · Admin", robots: { index: false, follow: false } };

const COOKIE = "rsvp_admin";
// The cookie holds a hash of the password, never the password itself.
const token = () => createHash("sha256").update(`rsvp-admin:${process.env.ADMIN_PASSWORD ?? ""}`).digest("hex");
const same = (a: string, b: string) => a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b));

async function login(form: FormData) {
  "use server";
  const pass = String(form.get("password") ?? "");
  const expected = process.env.ADMIN_PASSWORD ?? "";
  if (!expected || !same(pass, expected)) redirect("/admin?error=1");
  (await cookies()).set(COOKIE, token(), { httpOnly: true, secure: true, sameSite: "strict", path: "/admin", maxAge: 60 * 60 * 24 * 30 });
  redirect("/admin");
}

async function logout() {
  "use server";
  (await cookies()).delete({ name: COOKIE, path: "/admin" });
  redirect("/admin");
}

const isAdmin = async () => Boolean(process.env.ADMIN_PASSWORD) && same((await cookies()).get(COOKIE)?.value ?? "", token());

async function remove(form: FormData) {
  "use server";
  // Server actions are public endpoints: re-check the sign-in before deleting.
  if (!(await isAdmin())) redirect("/admin");
  const id = Number(form.get("id"));
  if (Number.isInteger(id) && id > 0) await deleteRsvp(id);
  redirect("/admin");
}

const when = (iso: string) => new Intl.DateTimeFormat("en-CA", { dateStyle: "medium", timeStyle: "short", timeZone: "America/Toronto" }).format(new Date(iso));

async function Admin({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const authed = await isAdmin();
  const { error } = await searchParams;

  if (!authed)
    return (
      <form action={login} className="glass mx-auto mt-24 grid max-w-sm gap-4 rounded-[32px] p-8 text-left">
        <h1 className="font-display text-3xl">Replies</h1>
        <label htmlFor="password" className="label text-blue-ink">Password</label>
        <PasswordInput />
        {error && <p className="font-sans text-sm text-accent">That password is not right.</p>}
        <button className="min-h-12 cursor-pointer rounded-full bg-accent font-sans text-sm tracking-[0.18em] text-on-accent uppercase">Sign in</button>
      </form>
    );

  if (!dbConfigured) return <p className="mt-24 text-center font-sans">The database is not configured (SUPABASE_URL / SUPABASE_SECRET_KEY).</p>;
  const rows = await listRsvps();
  const yes = rows.filter((r) => r.attending);
  const stats = [
    ["Replies", rows.length],
    ["Attending", yes.length],
    ["Guests coming", yes.reduce((a, r) => a + r.guests, 0)],
    ["Can't attend", rows.length - yes.length],
  ] as const;

  return (
    <div className="mx-auto max-w-4xl">
      <AutoRefresh />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-4xl">Replies</h1>
          <p className="font-sans text-xs text-ink-soft">Live: updates every few seconds</p>
        </div>
        <form action={logout}>
          <button className="cursor-pointer font-sans text-sm text-ink-soft underline">Sign out</button>
        </form>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map(([label, n]) => (
          <div key={label} className="glass rounded-3xl p-5 text-center">
            <p className="font-display text-4xl text-accent">{n}</p>
            <p className="label mt-1 text-gold-ink">{label}</p>
          </div>
        ))}
      </div>
      <div className="glass mt-6 overflow-x-auto rounded-3xl">
        <table className="w-full min-w-[560px] text-left font-sans text-sm">
          <thead className="label text-gold-ink">
            <tr>{["Name", "Answer", "Guests", "Phone", "Received"].map((h) => <th key={h} className="px-4 py-3">{h}</th>)}<th className="w-12"><span className="sr-only">Remove</span></th></tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-ink-soft">No replies yet.</td></tr>
            )}
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-gold/25">
                <td className="px-4 py-3 font-medium">{r.name}</td>
                <td className="px-4 py-3">{r.attending ? <span className="text-accent">Attending</span> : <span className="text-ink-soft">Can&apos;t attend</span>}</td>
                <td className="px-4 py-3">{r.attending ? r.guests : "None"}</td>
                <td className="px-4 py-3"><a href={`tel:${r.phone.replace(/[^\d+]/g, "")}`} className="text-accent">{r.phone}</a></td>
                <td className="px-4 py-3 text-ink-soft">{when(r.created_at)}</td>
                <td className="py-1 pr-2">
                  <form action={remove}>
                    <input type="hidden" name="id" value={r.id} />
                    <RemoveButton name={r.name} />
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/** Private list of RSVP replies, behind ADMIN_PASSWORD. */
export default function AdminPage(props: { searchParams: Promise<{ error?: string }> }) {
  return (
    <main className="min-h-dvh bg-bg px-4 py-10 text-ink">
      <Suspense fallback={<p className="mt-24 text-center font-sans text-ink-soft">Loading…</p>}>
        <Admin {...props} />
      </Suspense>
    </main>
  );
}
