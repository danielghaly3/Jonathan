// Run: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { formatDate, formatTime, googleCalendarHref, icsText } from "./format.ts";

test("date and time format without timezone drift", () => {
  assert.equal(formatDate("2026-11-21", "en-GB"), "Saturday, 21 November 2026");
  assert.equal(formatTime("2026-11-21", "11:00", "en-GB"), "11:00");
});

test("ics has floating start, computed end, escaped location", () => {
  const ics = icsText({ title: "Baptism", date: "2026-11-21", time: "23:30", durationMinutes: 90, location: "Church, City", details: "" });
  assert.match(ics, /DTSTART:20261121T233000\r\n/);
  assert.match(ics, /DTEND:20261122T010000\r\n/);
  assert.match(ics, /LOCATION:Church\\, City/);
});

test("ics without a time is an all-day entry", () => {
  const ics = icsText({ title: "Baptism", date: "2026-11-14", time: "", durationMinutes: 120, location: "Hall", details: "After the liturgy" });
  assert.match(ics, /DTSTART;VALUE=DATE:20261114\r\n/);
  assert.match(ics, /DTEND;VALUE=DATE:20261115\r\n/);
});

test("google calendar link carries the all-day range", () => {
  const u = new URL(googleCalendarHref({ title: "Baptism", date: "2026-11-14", time: "", durationMinutes: 120, location: "Hall", details: "" }));
  assert.equal(u.searchParams.get("dates"), "20261114/20261115");
  assert.equal(u.searchParams.get("text"), "Baptism");
});

test("ics folds long lines", () => {
  const ics = icsText({ title: "Baptism", date: "2026-11-14", time: "", durationMinutes: 0, location: "x".repeat(200), details: "" });
  assert.ok(ics.split("\r\n").every((l) => l.length <= 75));
  assert.match(ics.replace(/\r\n /g, ""), new RegExp(`LOCATION:${"x".repeat(200)}\r\n`));
});
