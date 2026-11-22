#!/usr/bin/env node
// Turns one newsletter issue (content/newsletter/<slug>.md) into the email
// and either writes a preview file or creates a Resend broadcast DRAFT.
// It never sends. Max reviews the draft in Resend and presses Send himself.
//
// Usage (from the site root):
//   node scripts/newsletter-broadcast.mjs <slug|path.md> --preview <out.html>
//   node scripts/newsletter-broadcast.mjs <slug> --draft --test   draft to the test segment (Max only)
//   node scripts/newsletter-broadcast.mjs <slug> --draft --live   draft to the subscriber segment
//
// Reads from the environment or .env.local: RESEND_API_KEY,
// NEWSLETTER_SEGMENT_ID, NEWSLETTER_TEST_SEGMENT_ID, NEWSLETTER_POSTAL_ADDRESS
// (required by CAN-SPAM in every commercial email), NEWSLETTER_FROM (optional).
// Exits non-zero on any problem.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { createElement as h } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const SITE_URL = "https://www.wexadvisory.com";
// Keep in step with NEWSLETTER_NAME in src/lib/newsletter.ts.
const NAME = fs
  .readFileSync(path.join(process.cwd(), "src", "lib", "newsletter.ts"), "utf8")
  .match(/export const NEWSLETTER_NAME = "([^"]+)"/)?.[1];

function die(msg) {
  console.error(`newsletter-broadcast: ${msg}`);
  process.exit(1);
}

function env(name) {
  const fromEnv = process.env[name];
  if (fromEnv) return fromEnv.replace(/^﻿/, "").trim();
  const file = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(file)) return "";
  const line = fs
    .readFileSync(file, "utf8")
    .split(/\r?\n/)
    .find((l) => l.replace(/^﻿/, "").startsWith(`${name}=`));
  return line ? line.slice(line.indexOf("=") + 1).replace(/^﻿/, "").replace(/^["']|["']$/g, "").trim() : "";
}

const args = process.argv.slice(2);
// First argument: an issue slug in content/newsletter, or a path to any .md
// (the /newsletter skill previews its draft before it is in this repo).
const target = args[0];
const slug = target?.endsWith(".md") ? path.basename(target, ".md") : target;
const has = (f) => args.includes(f);
const val = (f) => (args.indexOf(f) === -1 ? null : args[args.indexOf(f) + 1]);
if (!target || target.startsWith("--")) die("first argument must be the issue slug or a path to the .md file.");
if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) die(`"${slug}" is not a valid issue slug (lowercase letters, numbers, single hyphens).`);
if (args.includes("--draft") && target.endsWith(".md") && !path.resolve(target).startsWith(path.join(process.cwd(), "content", "newsletter") + path.sep)) {
  die("a Resend draft is made only from an issue committed under content/newsletter, so the web copy exists.");
}
if (!NAME) die("could not read NEWSLETTER_NAME from src/lib/newsletter.ts.");
const previewOut = val("--preview");
const draft = has("--draft");
if (!previewOut && !draft) die("pass --preview <file> or --draft (--test|--live).");
if (draft && has("--test") === has("--live")) die("--draft needs exactly one of --test or --live.");

const file = target.endsWith(".md") ? path.resolve(target) : path.join(process.cwd(), "content", "newsletter", `${slug}.md`);
if (!fs.existsSync(file)) die(`${file} not found.`);
const { data, content } = matter(fs.readFileSync(file, "utf8"), {});
for (const f of ["title", "description"]) if (typeof data[f] !== "string" || !data[f].trim()) die(`"${f}" missing.`);
if (!Number.isInteger(data.number)) die('"number" missing.');
const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? "");
if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) die('"date" must be YYYY-MM-DD.');
if (draft && has("--live") && data.draft !== false) die('a live draft needs "draft: false" in the issue (it must be approved and on the site first).');

const postal = env("NEWSLETTER_POSTAL_ADDRESS");
if (!postal) die("NEWSLETTER_POSTAL_ADDRESS is not set. CAN-SPAM requires a postal address (a PO box works) in every issue.");

// Email-safe inline styles. Mail clients ignore most <style> blocks.
const C = { ink: "#0F1F3D", text: "#1a1a1a", muted: "#666666", gold: "#B08F2E", rule: "#E6E1D6", box: "#F6F3EC" };
const s = (o) => o;
const components = {
  h1: ({ children }) => h("h2", { style: s({ fontSize: "20px", color: C.ink, margin: "28px 0 8px" }) }, children),
  h2: ({ children }) => h("h2", { style: s({ fontSize: "20px", color: C.ink, margin: "32px 0 8px", paddingTop: "20px", borderTop: `1px solid ${C.rule}` }) }, children),
  h3: ({ children }) => h("h3", { style: s({ fontSize: "16px", color: C.ink, margin: "20px 0 4px" }) }, children),
  p: ({ children }) => h("p", { style: s({ margin: "0 0 14px" }) }, children),
  a: ({ href, children }) => h("a", { href, style: s({ color: C.gold, fontWeight: "bold" }) }, children),
  ul: ({ children }) => h("ul", { style: s({ margin: "0 0 14px", paddingLeft: "20px" }) }, children),
  ol: ({ children }) => h("ol", { style: s({ margin: "0 0 14px", paddingLeft: "20px" }) }, children),
  li: ({ children }) => h("li", { style: s({ margin: "0 0 6px" }) }, children),
  blockquote: ({ children }) => h("blockquote", { style: s({ margin: "0 0 14px", padding: "8px 14px", borderLeft: `3px solid ${C.gold}`, color: C.muted }) }, children),
  pre: ({ children }) => h("pre", { style: s({ background: C.box, border: `1px solid ${C.rule}`, borderRadius: "6px", padding: "14px", whiteSpace: "pre-wrap", wordBreak: "break-word", fontSize: "14px", lineHeight: "1.5", fontFamily: "Menlo, Consolas, monospace", margin: "0 0 14px" }) }, children),
  code: ({ children }) => h("code", { style: s({ fontFamily: "Menlo, Consolas, monospace", fontSize: "14px" }) }, children),
  table: ({ children }) => h("table", { style: s({ borderCollapse: "collapse", width: "100%", margin: "0 0 14px", fontSize: "14px" }) }, children),
  th: ({ children }) => h("th", { style: s({ textAlign: "left", borderBottom: `1px solid ${C.ink}`, padding: "6px" }) }, children),
  td: ({ children }) => h("td", { style: s({ borderBottom: `1px solid ${C.rule}`, padding: "6px", verticalAlign: "top" }) }, children),
  hr: () => h("hr", { style: s({ border: 0, borderTop: `1px solid ${C.rule}`, margin: "24px 0" }) }),
};

// HTML comments carry checker data (<!-- published: ... -->); react-markdown
// would print them as text. Same rule as stripComments in src/lib/newsletter.ts.
const bodyHtml = renderToStaticMarkup(
  h(Markdown, { remarkPlugins: [remarkGfm], components }, content.replace(/<!--[\s\S]*?-->[ \t]*\r?\n?/g, ""))
);
const webUrl = `${SITE_URL}/newsletter/${slug}`;
const esc = (t) => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const prettyDate = new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

// {{{RESEND_UNSUBSCRIBE_URL}}} is filled in per recipient by Resend.
const unsubscribe = previewOut && !draft ? "#unsubscribe-preview" : "{{{RESEND_UNSUBSCRIBE_URL}}}";
const html = `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(data.title)}</title></head>
<body style="margin:0;padding:0;background:#ffffff;">
<div style="display:none;max-height:0;overflow:hidden;">${esc(data.description)}</div>
<div style="max-width:600px;margin:0 auto;padding:24px 16px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;color:${C.text};">
  <p style="margin:0 0 4px;font-family:Menlo,Consolas,monospace;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:${C.muted};">${esc(NAME)} · #${data.number} · ${esc(prettyDate)}</p>
  <h1 style="font-size:24px;line-height:1.3;color:${C.ink};margin:0 0 20px;">${esc(data.title)}</h1>
  ${bodyHtml}
  <div style="margin-top:32px;padding-top:16px;border-top:1px solid ${C.rule};font-size:13px;color:${C.muted};">
    <p style="margin:0 0 8px;">Reply to this email and it comes straight to me. Max</p>
    <p style="margin:0 0 8px;"><a href="${webUrl}" style="color:${C.muted};">Read on the web</a> · <a href="${SITE_URL}/newsletter" style="color:${C.muted};">Past issues</a></p>
    <p style="margin:0 0 8px;">You're getting this because you signed up at wexadvisory.com and confirmed by email. <a href="${unsubscribe}" style="color:${C.muted};">Unsubscribe</a></p>
    <p style="margin:0;">Wex Advisory LLC · ${esc(postal)}</p>
  </div>
</div>
</body></html>`;

if (previewOut) {
  fs.writeFileSync(previewOut, html, "utf8");
  console.log(`preview written: ${path.resolve(previewOut)}`);
}

if (draft) {
  const apiKey = env("RESEND_API_KEY");
  const segmentId = env(has("--live") ? "NEWSLETTER_SEGMENT_ID" : "NEWSLETTER_TEST_SEGMENT_ID");
  const from = env("NEWSLETTER_FROM") || "Max Wexley <max@news.wexadvisory.com>";
  if (!apiKey) die("RESEND_API_KEY is not set.");
  if (!segmentId) die(`${has("--live") ? "NEWSLETTER_SEGMENT_ID" : "NEWSLETTER_TEST_SEGMENT_ID"} is not set.`);
  const res = await fetch("https://api.resend.com/broadcasts", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      segment_id: segmentId,
      from,
      reply_to: "max@wexadvisory.com",
      subject: data.title,
      name: `${NAME} #${data.number}${has("--test") ? " (TEST)" : ""}`,
      html,
      // No "send": a draft only. Max sends from the Resend dashboard.
    }),
  });
  const text = await res.text();
  if (!res.ok) die(`Resend refused the draft: ${res.status} ${text}`);
  const id = JSON.parse(text).id;
  console.log(`draft created: ${id}`);
  console.log(`review and send: https://resend.com/broadcasts/${id}`);
}
