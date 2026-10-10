import { test } from "node:test";
import assert from "node:assert/strict";
import { csvRow, parseRsvp } from "./rsvp.ts";

const ok = { attending: "yes", name: "Mary Habib", phone: "9055550142", guests: "3" };

test("accepts an attending RSVP and normalises the name", () => {
  assert.deepEqual(parseRsvp({ ...ok, name: "  Mary   Habib ", phone: "+1 (905) 555-0142" }, 10), {
    ok: true,
    data: { attending: true, name: "Mary Habib", phone: "+1 (905) 555-0142", guests: 3 },
  });
});

test("a decline needs no guest count and records 0", () => {
  assert.deepEqual(parseRsvp({ ...ok, attending: "no", guests: "" }, 10), {
    ok: true,
    data: { attending: false, name: "Mary Habib", phone: "9055550142", guests: 0 },
  });
});

test("rejects bad fields", () => {
  assert.equal(parseRsvp({ ...ok, attending: "maybe" }, 10).ok, false);
  assert.equal(parseRsvp({ ...ok, name: "M" }, 10).ok, false);
  assert.equal(parseRsvp({ ...ok, phone: "call me" }, 10).ok, false);
  assert.equal(parseRsvp({ ...ok, guests: 0 }, 10).ok, false);
  assert.equal(parseRsvp({ ...ok, guests: 11 }, 10).ok, false);
  assert.equal(parseRsvp({ ...ok, guests: 2.5 }, 10).ok, false);
});

test("csv escapes quotes and formula prefixes", () => {
  assert.equal(csvRow(['=HYPERLINK("x")', 2]), `"'=HYPERLINK(""x"")","2"\n`);
});
