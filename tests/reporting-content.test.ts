// Fact checks for the /automated-reporting page copy. Every claim on the page
// lives in src/components/reporting/content.ts; these tests fail the build if
// a banned phrase, an em dash, an unapproved price or an unshipped tool slips in.
// Run: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import * as content from "../src/components/reporting/content";

const {
  TOOLS_SHIPPED,
  TOOLS_SIMILAR,
  DELIVERY,
  EXAMPLES,
  PRICING,
  ANSWER_BLOCK,
} = content;

// Every string reachable from the module's exports.
function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === "object") return Object.values(value).flatMap(strings);
  return [];
}
const all = strings(Object.values(content));

test("no banned phrases", () => {
  const banned = ["no hourly rates", "fixed fee", "fixed-fee", "no retainer", "by night"];
  for (const s of all) for (const b of banned) assert.ok(!s.toLowerCase().includes(b), `"${b}" in: ${s}`);
});

test("no em dashes", () => {
  for (const s of all) assert.ok(!s.includes("—"), `em dash in: ${s}`);
});

test("prices are exact", () => {
  assert.equal(PRICING.build, "$200/hr");
  assert.equal(PRICING.maintenance, "$150/hr");
  assert.ok(ANSWER_BLOCK.includes("$1,000 to $4,000"));
  const allowed = new Set(["$200", "$150", "$1,000", "$4,000"]);
  for (const s of all) for (const m of s.match(/\$\d{1,3}(?:,\d{3})*/g) ?? []) assert.ok(allowed.has(m), `unapproved amount ${m} in: ${s}`);
});

test("tools", () => {
  assert.deepEqual(
    [...TOOLS_SHIPPED],
    ["Excel", "Google Sheets", "QuickBooks", "Shopify", "Yardi GL exports", "Emailed exports (Gmail)", "Notion"],
  );
  for (const t of TOOLS_SIMILAR) assert.ok(!TOOLS_SHIPPED.includes(t), `${t} listed as shipped`);
  assert.equal(DELIVERY.find((d) => d.label === "Slack")?.status, "can-do");
});

test("examples", () => {
  assert.equal(EXAMPLES.length, 4);
  const illustrative = EXAMPLES.filter((e) => e.illustrative);
  assert.equal(illustrative.length, 1);
  assert.equal(illustrative[0].client, null);
  for (const s of strings(illustrative[0])) assert.ok(!/\d/.test(s), `figure in illustrative example: ${s}`);
  const accounting = EXAMPLES.find((e) => e.team === "Accounting");
  assert.ok(accounting, "Accounting example missing");
  assert.equal(accounting.client, "RECO");
  for (const s of strings(accounting)) assert.ok(!s.includes("QuickBooks"), `QuickBooks in accounting example: ${s}`);
});

test("answer block targets the phrase", () => {
  assert.ok(ANSWER_BLOCK.toLowerCase().includes("automated reporting"));
});

test("site wiring", async () => {
  const { SITE_PAGES } = await import("../src/lib/site-pages");
  const entries = SITE_PAGES.filter((p) => p.path === "/automated-reporting");
  assert.equal(entries.length, 1);
  assert.equal(entries[0].llms.section, "Services");
});
