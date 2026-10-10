# Jonathan · Baptism Invitation

Interactive invitation (`/`) and printable 5 × 7 in card (`/print`). Next.js 16, React 19, Tailwind v4, Motion.

## Edit
Everything lives in **`invitation.config.ts`**: name, wording, scripture (on/off), date, time, church, address, RSVP, photos, locale.

Photos: put files in `public/photos/` and set `src`, e.g. `"/photos/main.jpg"`.
- `main` 4:5 (hero arch and print card)
- `secondary` 1:1
- `detail` 3:4

## Run
```bash
npm install
npm run dev        # http://localhost:3000 and /print
npm test           # date / calendar helper checks
```

## Export the printable card
```bash
npx playwright install chromium   # once
npm run export                    # builds, then writes exports/invitation-5x7.png (1500×2100, 300 dpi) and .pdf
```
Or open `/print` and print at 5 × 7 in, margins none, background graphics on.

## Intro artwork (optional)
Drop these into `public/intro/` and they are picked up automatically (paths in `invitation.config.ts` → `intro`). Missing files fall back to the built-in light.
- `sanctuary-wide.jpg` (2400×1350), `sanctuary-tall.jpg` (1350×2400): blurred sanctuary background
- `dove-gold.png` (1024×1024, transparent): the descending dove

## RSVP replies
Replies are emailed as a designed card when these Vercel environment variables are set
(Project Settings → Environment Variables, then redeploy):
- `RSVP_TO_EMAIL`: who receives replies (comma-separated for several)
- `RESEND_API_KEY`: from https://resend.com (free). Without a verified domain, Resend only delivers to the email
  address that owns the Resend account, so sign up with the receiving address.
- `RSVP_FROM_EMAIL` (optional): e.g. `Jonathan's Baptism <rsvp@yourdomain.com>` once a domain is verified.

Without email configured:
The form ("I'll be there" / "I can't make it", name, phone, and number of guests when attending) posts to `/api/rsvp`. CSV columns: time, attending|declined, name, phone, guests.
- **Locally / on a server with a disk:** replies are appended to `data/rsvps.csv` (git-ignored; it contains guests' phone numbers, so keep it private).
- **On Vercel or other serverless hosts:** set `RSVP_WEBHOOK_URL` to an endpoint that stores JSON (e.g. a Google Apps Script bound to a Sheet). Without it, submissions there will fail with a friendly error.

Design decisions: see `DESIGN.md`.
