// Run: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { formatDate, formatTime, icsHref } from "./format.ts";

test("date and time format without timezone drift", () => {
  assert.equal(formatDate("2026-11-21", "en-GB"), "Saturday, 21 November 2026");
  assert.equal(formatTime("2026-11-21", "11:00", "en-GB"), "11:00");
});

test("ics has floating start, computed end, escaped location", () => {
  const ics = decodeURIComponent(icsHref({ title: "Baptism", date: "2026-11-21", time: "23:30", durationMinutes: 90, location: "Church, City" }).split(",").slice(1).join(","));
  assert.match(ics, /DTSTART:20261121T233000\r\n/);
  assert.match(ics, /DTEND:20261122T010000\r\n/);
  assert.match(ics, /LOCATION:Church\\, City/);
});

test("ics without a time is an all-day entry", () => {
  const ics = decodeURIComponent(icsHref({ title: "Baptism", date: "2026-11-14", time: "", durationMinutes: 120, location: "Hall" }));
  assert.match(ics, /DTSTART;VALUE=DATE:20261114\r\n/);
  assert.match(ics, /DTEND;VALUE=DATE:20261115\r\n/);
});
