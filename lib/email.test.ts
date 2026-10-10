import { test } from "node:test";
import assert from "node:assert/strict";
import { rsvpEmail } from "./email.ts";

const at = "2026-10-20T15:30:00.000Z";

test("subject tells the answer at a glance", () => {
  assert.equal(rsvpEmail({ attending: true, name: "Mary Habib", phone: "905 555 0142", guests: 3 }, at, "Jonathan").subject, "RSVP · Mary Habib · Attending, 3 guests");
  assert.equal(rsvpEmail({ attending: true, name: "Mary", phone: "905 555 0142", guests: 1 }, at, "Jonathan").subject, "RSVP · Mary · Attending, 1 guest");
  assert.equal(rsvpEmail({ attending: false, name: "Mary", phone: "905 555 0142", guests: 0 }, at, "Jonathan").subject, "RSVP · Mary · Can't attend");
});

test("guest input is escaped in the HTML", () => {
  const { html } = rsvpEmail({ attending: true, name: `<img src=x onerror="alert(1)">`, phone: "905 555 0142", guests: 2 }, at, "Jonathan");
  assert.ok(!html.includes("<img src=x"));
  assert.ok(html.includes("&lt;img src=x onerror=&quot;alert(1)&quot;&gt;"));
});
