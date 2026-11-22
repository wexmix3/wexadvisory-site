#!/usr/bin/env node
// One-time (and re-runnable) Resend setup for the newsletter. Idempotent:
// anything that already exists is reported, not created twice.
//
//   node scripts/newsletter-setup.mjs            create what is missing, print DNS records
//   node scripts/newsletter-setup.mjs --status   read only: segments, domain status, records
//   node scripts/newsletter-setup.mjs --verify   ask Resend to check the news. DNS records now
//
// What it can create, and nothing else:
//   - segments "Newsletter" and "Newsletter test"
//   - the sending domain news.wexadvisory.com
//   - one contact, max@wexadvisory.com, in "Newsletter test" only
// It never sends email and never deletes anything. Key: RESEND_API_KEY from
// the environment or .env.local. Exits non-zero on any Resend error.

import fs from "node:fs";
import path from "node:path";

const DOMAIN = "news.wexadvisory.com";
const SEGMENTS = ["Newsletter", "Newsletter test"];
const TEST_CONTACT = "max@wexadvisory.com";
const mode = process.argv.includes("--status") ? "status" : process.argv.includes("--verify") ? "verify" : "setup";

function env(name) {
  if (process.env[name]) return process.env[name].replace(/^﻿/, "").trim();
  const file = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(file)) return "";
  const line = fs.readFileSync(file, "utf8").split(/\r?\n/).find((l) => l.replace(/^﻿/, "").startsWith(`${name}=`));
  return line ? line.slice(line.indexOf("=") + 1).replace(/^﻿/, "").replace(/^["']|["']$/g, "").trim() : "";
}
const key = env("RESEND_API_KEY");
if (!key) {
  console.error("newsletter-setup: RESEND_API_KEY not found.");
  process.exit(1);
}

async function api(method, p, body) {
  const res = await fetch(`https://api.resend.com${p}`, {
    method,
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const text = await res.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {}
  return { status: res.status, ok: res.ok, json, text };
}
function must(r, what) {
  if (!r.ok) {
    console.error(`newsletter-setup: ${what} failed: ${r.status} ${r.text}`);
    process.exit(1);
  }
  return r.json;
}

// ---------- segments ----------
const segList = must(await api("GET", "/segments"), "list segments").data ?? [];
const segIds = {};
for (const name of SEGMENTS) {
  const found = segList.find((s) => s.name === name);
  if (found) segIds[name] = found.id;
  else if (mode === "setup") {
    segIds[name] = must(await api("POST", "/segments", { name }), `create segment ${name}`).id;
    console.log(`created segment "${name}"`);
  }
}

// ---------- domain ----------
const domList = must(await api("GET", "/domains"), "list domains").data ?? [];
let dom = domList.find((d) => d.name === DOMAIN);
if (!dom && mode === "setup") {
  dom = must(await api("POST", "/domains", { name: DOMAIN, region: "us-east-1" }), `add domain ${DOMAIN}`);
  console.log(`added domain ${DOMAIN}`);
}
if (dom && mode === "verify") {
  must(await api("POST", `/domains/${dom.id}/verify`), `verify ${DOMAIN}`);
  console.log(`asked Resend to verify ${DOMAIN}; rerun with --status in a few minutes.`);
}
const domain = dom ? must(await api("GET", `/domains/${dom.id}`), `read domain ${DOMAIN}`) : null;

// ---------- test contact ----------
if (mode === "setup" && segIds["Newsletter test"]) {
  const contactPath = `/contacts/${encodeURIComponent(TEST_CONTACT)}`;
  const existing = await api("GET", contactPath);
  if (existing.status === 404) {
    must(
      await api("POST", "/contacts", { email: TEST_CONTACT, first_name: "Max", unsubscribed: false, segments: [{ id: segIds["Newsletter test"] }] }),
      "create test contact"
    );
    console.log(`added ${TEST_CONTACT} to "Newsletter test"`);
  } else {
    must(existing, "look up test contact");
    const add = await api("POST", `${contactPath}/segments/${segIds["Newsletter test"]}`);
    if (!add.ok && add.status !== 409 && !/already/i.test(add.text)) must(add, "add test contact to segment");
    console.log(`${TEST_CONTACT} is in "Newsletter test"`);
  }
}

// ---------- report ----------
console.log("");
console.log("Segment ids (for env vars):");
for (const name of SEGMENTS) console.log(`  ${name}: ${segIds[name] ?? "(missing)"}`);
console.log(`  NEWSLETTER_SEGMENT_ID=${segIds["Newsletter"] ?? ""}`);
console.log(`  NEWSLETTER_TEST_SEGMENT_ID=${segIds["Newsletter test"] ?? ""}`);
console.log("");
if (!domain) console.log(`Domain ${DOMAIN}: not added yet.`);
else {
  console.log(`Domain ${DOMAIN}: ${domain.status}`);
  for (const r of domain.records ?? []) {
    console.log(`  [${r.status}] ${r.record} ${r.type}  host: ${r.name}  value: ${r.value}${r.priority !== undefined ? `  priority: ${r.priority}` : ""}`);
  }
}
