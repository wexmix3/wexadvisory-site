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

// Email-safe inline styles (mail clients ignore most <style> blocks), in the
// site's brand colors. The masthead and section banners are text, not images,
// so the issue reads correctly with images turned off.
const C = { ink: "#0F1F3D", text: "#1F2430", muted: "#5B6474", gold: "#C8A84B", link: "#8A6D1F", rule: "#E4DED0", canvas: "#FBF8F1", paper: "#FFFDF8", band: "#F6EDD3" };
const FONT = "'Inter Tight',Helvetica,Arial,sans-serif";
const MONO = "Menlo,Consolas,monospace";
const webUrl = `${SITE_URL}/newsletter/${slug}`;
const esc = (t) => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const prettyDate = new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
const textOf = (node) => (node?.type === "text" ? node.value : (node?.children ?? []).map(textOf).join(""));

// "<!-- share -->" under a story becomes share links for that story's
// headline (the last "### " above it). Other comments carry checker data and
// are dropped, the same rule as stripComments in src/lib/newsletter.ts.
const SHARE = "SHAREMARKER";
const md = content.replace(/<!--\s*share\s*-->/g, `\n\n${SHARE}\n\n`).replace(/<!--[\s\S]*?-->[ \t]*\r?\n?/g, "");
let lastHeadline = data.title;
const shareRow = () => {
  const u = encodeURIComponent(`${webUrl}?from=newsletter-share`);
  const t = encodeURIComponent(lastHeadline);
  const a = (href, label) => `<a href="${href}" style="color:${C.muted};text-decoration:underline;">${label}</a>`;
  return `<p style="margin:4px 0 0;font-size:13px;color:${C.muted};">Share this story: ${a(`https://www.linkedin.com/sharing/share-offsite/?url=${u}`, "LinkedIn")} · ${a(`https://x.com/intent/tweet?text=${t}&url=${u}`, "X")} · ${a(`mailto:?subject=${t}&body=${encodeURIComponent("Thought you'd find this useful: ")}${u}`, "Email")}</p>`;
};
const abs = (src) => (src && src.startsWith("/") ? `${SITE_URL}${src}` : src);
// A preview is made before the issue's images are deployed, so it embeds the
// local file from public/. Drafts always point at the live site.
const previewSrc = (src) => {
  const local = src && src.startsWith("/") ? path.join(process.cwd(), "public", src) : null;
  if (previewOut && !draft && local && fs.existsSync(local)) {
    const type = { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".gif": "image/gif", ".webp": "image/webp" }[path.extname(local).toLowerCase()];
    if (type) return `data:${type};base64,${fs.readFileSync(local).toString("base64")}`;
  }
  return abs(src);
};

const components = {
  h1: ({ children }) => h("h2", { style: { fontFamily: FONT, fontSize: "22px", color: C.ink, margin: "28px 0 8px" } }, children),
  // Section banner: an ink bar with a gold edge, like a newspaper section flag.
  h2: ({ children }) =>
    h(
      "table",
      { role: "presentation", width: "100%", cellPadding: 0, cellSpacing: 0, style: { borderCollapse: "collapse", margin: "36px 0 18px" } },
      h("tbody", null, h("tr", null, h("td", { style: { background: C.ink, borderLeft: `6px solid ${C.gold}`, padding: "12px 16px", fontFamily: FONT, fontSize: "19px", fontWeight: 800, letterSpacing: "-0.01em", color: "#FFFFFF" } }, children)))
    ),
  h3: ({ node, children }) => {
    lastHeadline = textOf(node) || lastHeadline;
    return h("h3", { style: { fontFamily: FONT, fontSize: "21px", lineHeight: "1.25", fontWeight: 800, letterSpacing: "-0.01em", color: C.ink, margin: "18px 0 10px" } }, children);
  },
  h4: ({ children }) => h("h4", { style: { fontFamily: MONO, fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: C.muted, margin: "22px 0 8px" } }, children),
  p: ({ node, children }) => {
    const only = node?.children?.length === 1 ? node.children[0] : null;
    if (only?.type === "text" && only.value.trim() === SHARE) return h("div", { dangerouslySetInnerHTML: { __html: shareRow() } });
    // A paragraph that is all italics is a dek (under a banner) or an image caption.
    if (only?.type === "element" && only.tagName === "em") return h("p", { style: { margin: "0 0 14px", fontSize: "15px", lineHeight: "1.5", color: C.muted, fontStyle: "italic" } }, children);
    if (only?.type === "element" && only.tagName === "img") return h("div", { style: { margin: "8px 0 6px" } }, children);
    return h("p", { style: { margin: "0 0 14px" } }, children);
  },
  img: ({ src, alt }) => h("img", { src: previewSrc(src), alt: alt ?? "", width: 568, style: { display: "block", width: "100%", maxWidth: "568px", height: "auto", border: `1px solid ${C.rule}`, borderRadius: "8px" } }),
  a: ({ href, children }) => h("a", { href: abs(href), style: { color: C.link, fontWeight: "bold", textDecoration: "underline" } }, children),
  strong: ({ children }) => h("strong", { style: { color: C.ink } }, children),
  ul: ({ children }) => h("ul", { style: { margin: "0 0 14px", paddingLeft: "20px" } }, children),
  ol: ({ children }) => h("ol", { style: { margin: "0 0 14px", paddingLeft: "20px" } }, children),
  li: ({ children }) => h("li", { style: { margin: "0 0 8px" } }, children),
  // Callouts ("What to do this week", the prompt's real output).
  blockquote: ({ children }) => h("div", { style: { margin: "6px 0 16px", padding: "14px 16px 2px", background: C.band, borderLeft: `4px solid ${C.gold}`, borderRadius: "4px" } }, children),
  pre: ({ children }) => h("pre", { style: { background: C.paper, border: `1px solid ${C.rule}`, borderRadius: "6px", padding: "14px", whiteSpace: "pre-wrap", wordBreak: "break-word", fontSize: "13.5px", lineHeight: "1.5", fontFamily: MONO, margin: "0 0 14px" } }, children),
  code: ({ children }) => h("code", { style: { fontFamily: MONO, fontSize: "13.5px" } }, children),
  table: ({ children }) => h("table", { style: { borderCollapse: "collapse", width: "100%", margin: "0 0 14px", fontSize: "14px" } }, children),
  th: ({ children }) => h("th", { style: { textAlign: "left", borderBottom: `1px solid ${C.ink}`, padding: "6px" } }, children),
  td: ({ children }) => h("td", { style: { borderBottom: `1px solid ${C.rule}`, padding: "6px", verticalAlign: "top" } }, children),
  hr: () => h("hr", { style: { border: 0, borderTop: `1px solid ${C.rule}`, margin: "24px 0" } }),
};

const bodyHtml = renderToStaticMarkup(h(Markdown, { remarkPlugins: [remarkGfm], components }, md));
if (bodyHtml.includes(SHARE)) die("a share marker was not on its own line; put <!-- share --> on a line by itself.");

// {{{RESEND_UNSUBSCRIBE_URL}}} is filled in per recipient by Resend.
const unsubscribe = previewOut && !draft ? "#unsubscribe-preview" : "{{{RESEND_UNSUBSCRIBE_URL}}}";
const flink = (href, label) => `<a href="${href}" style="color:${C.ink};font-weight:bold;text-decoration:underline;">${label}</a>`;
const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light"><title>${esc(data.title)}</title></head>
<body style="margin:0;padding:0;background:${C.canvas};">
<div style="display:none;max-height:0;overflow:hidden;">${esc(data.description)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.canvas};"><tr><td align="center" style="padding:0 8px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;">
  <tr><td style="padding:16px 8px 10px;font-family:${MONO};font-size:11.5px;color:${C.muted};text-align:right;">#${data.number} · ${esc(prettyDate)} · <a href="${webUrl}" style="color:${C.muted};">Read online</a></td></tr>
  <tr><td style="padding:22px 24px 20px;background:${C.paper};border:1px solid ${C.rule};border-bottom:0;border-radius:10px 10px 0 0;">
    <p style="margin:0 0 6px;font-family:${MONO};font-size:11.5px;letter-spacing:0.14em;text-transform:uppercase;color:${C.muted};"><span style="color:${C.gold};">&#9632;</span> Wex Advisory</p>
    <p style="margin:0;font-family:${FONT};font-size:46px;line-height:1;font-weight:800;letter-spacing:-0.035em;color:${C.ink};">${esc(NAME)}</p>
    <p style="margin:10px 0 0;font-family:${FONT};font-size:15px;line-height:1.45;color:${C.muted};">AI that gives small business owners their hours back. Every Tuesday.</p>
  </td></tr>
  <tr><td style="height:4px;background:${C.gold};font-size:0;line-height:0;">&nbsp;</td></tr>
  <tr><td style="padding:26px 24px 30px;background:#FFFFFF;border:1px solid ${C.rule};border-top:0;font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:1.62;color:${C.text};">
    <h1 style="margin:0 0 18px;font-family:${FONT};font-size:26px;line-height:1.2;font-weight:800;letter-spacing:-0.02em;color:${C.ink};">${esc(data.title)}</h1>
    ${bodyHtml}
  </td></tr>
  <tr><td style="padding:22px 24px;background:${C.band};border:1px solid ${C.rule};border-top:0;border-radius:0 0 10px 10px;font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:1.6;color:${C.text};">
    <p style="margin:0 0 10px;"><strong style="color:${C.ink};">Was this forwarded to you?</strong> ${flink(`${SITE_URL}/newsletter?from=newsletter-forward`, "Get Hours Back every Tuesday")}. Free, one click to leave.</p>
    <p style="margin:0 0 10px;">Hit reply with a question or a job you'd like off your plate. It comes straight to me and I read every one. Max</p>
    <p style="margin:0;">${flink(`${SITE_URL}/playbooks?from=newsletter`, "Free playbooks")} · ${flink(`${SITE_URL}/newsletter`, "Past issues")} · ${flink(webUrl, "Read on the web")}</p>
  </td></tr>
  <tr><td style="padding:16px 8px 28px;font-family:Helvetica,Arial,sans-serif;font-size:12px;line-height:1.6;color:${C.muted};text-align:center;">
    You're getting this because you signed up at wexadvisory.com and confirmed by email. <a href="${unsubscribe}" style="color:${C.muted};">Unsubscribe</a><br>Wex Advisory LLC · ${esc(postal)}
  </td></tr>
</table>
</td></tr></table>
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
