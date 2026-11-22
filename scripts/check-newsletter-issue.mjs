#!/usr/bin/env node
// Checks one newsletter issue before Max sees it and again before it goes on
// the site. Exits non-zero and lists every problem. Rules that can be checked
// in code live here, not only in the /newsletter skill's prose.
//
// Usage: node scripts/check-newsletter-issue.mjs <path-to-issue.md> [--offline]
//   --offline skips the network checks (links and the GitHub repo).
//
// Issue shape (the /newsletter skill writes this). The bar, set by Max on
// 2026-11-22: meet Tenex's Ultrathink on depth, sourcing and look, and beat it
// on usefulness (every story ends in something an owner can do).
//   (opener)            -> a lead from Max plus an "In this issue" list, 3+ bullets
//   ## The big one      -> one "### " headline, a <!-- published --> date, links
//        to 3+ different sites, an image with alt text, a "> **What to do"
//        callout, and <!-- share -->
//   ## Quick hits       -> 3 to 6 items, each starting at a <!-- published -->
//        comment, each with a source link and a "For you:" line
//   ## Repo of the week -> one GitHub repo (public, licensed, pushed in 90 days),
//        "Setup:" and "Cost:" facts, and "we tried it" or "we read the docs"
//   ## Prompt of the week -> the prompt in a fenced code block plus the real
//        output it gave, as a "> " block quote
//   ## From Wex Advisory -> any text
// Every <!-- published --> date is at most 10 days before the issue. 6+
// different source sites across the issue. 900 to 1,400 reading words. Images
// are files in public/newsletter/. No em dashes. No banned names.

import fs from "node:fs";
import matter from "gray-matter";

const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith("--"));
const offline = args.includes("--offline");
if (!file || !fs.existsSync(file)) {
  console.error("check-newsletter-issue: pass the path to an existing issue .md file.");
  process.exit(2);
}

const problems = [];
const fail = (m) => problems.push(m);
// Some sites (openai.com, for one) answer scripts with 401/403/429 while the
// page works in a browser. Those are listed for a manual check, not failed.
const warnings = [];
const parsed = matter(fs.readFileSync(file, "utf8"), {});
const { data, content } = parsed;

// ---------- frontmatter ----------
for (const f of ["title", "description"]) if (typeof data[f] !== "string" || !data[f].trim()) fail(`frontmatter "${f}" is missing.`);
if (!Number.isInteger(data.number) || data.number < 1) fail('frontmatter "number" must be a whole number from 1.');
if (typeof data.draft !== "boolean") fail('frontmatter "draft" must be true or false.');
const typedDate = parsed.matter.match(/^date:[ \t]*["']?([^"'\s#]+)/m)?.[1] ?? "";
const issueDate = /^\d{4}-\d{2}-\d{2}$/.test(typedDate) ? new Date(`${typedDate}T12:00:00Z`) : null;
if (!issueDate || Number.isNaN(issueDate.getTime())) fail('frontmatter "date" must be YYYY-MM-DD.');
if (typeof data.title === "string" && data.title.length > 80) fail(`subject line is ${data.title.length} characters; keep it under 80.`);

// ---------- sections ----------
const sections = new Map();
const intro = [];
let current = null;
for (const line of content.split(/\r?\n/)) {
  const m = line.match(/^## (.+)$/);
  if (m) {
    current = m[1].trim();
    sections.set(current, []);
  } else if (current) sections.get(current).push(line);
  else intro.push(line);
}
const find = (prefix) => [...sections.keys()].find((k) => k.toLowerCase().startsWith(prefix.toLowerCase()));
const need = ["The big one", "Quick hits", "Repo of the week", "Prompt of the week", "From Wex Advisory"];
for (const n of need) if (!find(n)) fail(`missing section "## ${n}...".`);
const linksIn = (text) => [...text.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)].map((m) => m[1]);
const siteOf = (u) => {
  try {
    return new URL(u).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
};
const OWN = ["wexadvisory.com", "github.com"];
const checkPublished = (pub, label) => {
  if (!pub) return fail(`${label} needs a <!-- published: YYYY-MM-DD --> comment.`);
  if (!issueDate) return;
  const days = (issueDate - new Date(`${pub}T12:00:00Z`)) / 86400000;
  if (days > 10) fail(`${label} was published ${Math.round(days)} days before the issue; the limit is 10.`);
  if (days < -1) fail(`${label} has a published date after the issue date.`);
};

// Opener: Max's lead plus an "In this issue" list.
if ((intro.join("\n").match(/^\s*[-*] \S/gm) ?? []).length < 3) fail('the opener needs an "In this issue" list with at least 3 bullets.');

// The big one: one story told from several sources, a visual, and what to do.
const bigKey = find("The big one");
if (bigKey) {
  const text = sections.get(bigKey).join("\n");
  const heads = text.match(/^### .+$/gm) ?? [];
  if (heads.length !== 1) fail(`"The big one" has ${heads.length} "### " headlines; it needs exactly 1.`);
  checkPublished(text.match(/<!--\s*published:\s*(\d{4}-\d{2}-\d{2})\s*-->/)?.[1], '"The big one"');
  const sites = new Set(linksIn(text).map(siteOf).filter((d) => d && !OWN.includes(d)));
  if (sites.size < 3) fail(`"The big one" links ${sites.size} different source sites; it needs at least 3.`);
  if (!/!\[[^\]]+\]\([^)]+\)/.test(text)) fail('"The big one" needs an image with alt text: ![what it shows](/newsletter/<n>/<file>.png).');
  if (!/^> \*\*What to do/m.test(text)) fail('"The big one" needs a "> **What to do..." callout.');
  if (!/<!--\s*share\s*-->/.test(text)) fail('"The big one" needs <!-- share --> on its own line at the end.');
}

// Quick hits: each item starts at its published comment.
const quickKey = find("Quick hits");
if (quickKey) {
  const items = sections.get(quickKey).join("\n").split(/(?=<!--\s*published:)/).slice(1);
  if (items.length < 3 || items.length > 6) fail(`"Quick hits" has ${items.length} items (one per <!-- published --> comment); it needs 3 to 6.`);
  items.forEach((item, i) => {
    const head = item.match(/\*\*([^*]+)\*\*/)?.[1]?.trim() ?? `item ${i + 1}`;
    checkPublished(item.match(/<!--\s*published:\s*(\d{4}-\d{2}-\d{2})\s*-->/)?.[1], `quick hit "${head}"`);
    if (!linksIn(item).length) fail(`quick hit "${head}" has no source link.`);
    if (!/\*\*For you:\*\*/.test(item)) fail(`quick hit "${head}" needs a "**For you:**" line (what an owner does with it).`);
  });
}

// Images: alt text, and site images must exist before the issue ships.
for (const m of content.matchAll(/!\[([^\]]*)\]\(([^)\s]+)\)/g)) {
  if (!m[1].trim()) fail(`image ${m[2]} has no alt text.`);
  if (m[2].startsWith("/")) {
    if (!m[2].startsWith("/newsletter/")) fail(`image ${m[2]} must live under public/newsletter/.`);
    else if (!fs.existsSync(`public${m[2]}`)) fail(`image ${m[2]} is not in public/ (run this from the site root).`);
  }
}

// Sourcing across the whole issue.
const allSites = new Set(linksIn(content).map(siteOf).filter((d) => d && !OWN.includes(d)));
if (allSites.size < 6) fail(`the issue links ${allSites.size} different source sites; it needs at least 6.`);

// Repo: one GitHub repo link.
const repoKey = find("Repo of the week");
let repo = null;
if (repoKey) {
  const links = [...sections.get(repoKey).join("\n").matchAll(/https:\/\/github\.com\/([\w.-]+)\/([\w.-]+?)(?=[)/#?\s]|$)/g)];
  const unique = [...new Set(links.map((m) => `${m[1]}/${m[2]}`))];
  if (unique.length !== 1) fail(`repo section links ${unique.length} GitHub repos; it needs exactly 1.`);
  else repo = unique[0];
  if (!/we tried it|we read the docs/i.test(sections.get(repoKey).join(" "))) {
    fail('repo section must say honestly whether Max ran it: "we tried it" or "we read the docs".');
  }
  for (const label of ["Setup:", "Cost:"]) if (!sections.get(repoKey).join(" ").includes(`**${label}**`)) fail(`repo section needs a "**${label}**" fact.`);
}

// Prompt: a code block and a block quote of the real output.
const promptKey = find("Prompt of the week");
if (promptKey) {
  const text = sections.get(promptKey).join("\n");
  if (!/```[\s\S]+?```/.test(text)) fail("prompt section needs the prompt in a fenced code block.");
  if (!/^> \S/m.test(text)) fail('prompt section needs the real output it gave, as a "> " block quote.');
}

// ---------- whole body ----------
// Reading words only: no comments, no code block (the prompt), no images, no
// link URLs, no markdown markers. About 5 minutes; the skill aims for 1,000 to 1,250.
const prose = content
  .replace(/<!--[\s\S]*?-->/g, " ")
  .replace(/```[\s\S]*?```/g, " ")
  .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
  .replace(/\]\([^)]*\)/g, "]")
  .replace(/[#>*_`|[\]-]+/g, " ");
const words = prose.split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length;
if (words < 900 || words > 1400) fail(`body is ${words} reading words (prompt, images and links not counted); keep it between 900 and 1,400.`);
const all = `${data.title ?? ""}\n${data.description ?? ""}\n${content}`;
if (/[–—]/.test(all)) fail("contains an em or en dash. Rewrite the sentence.");
for (const banned of [/\bBBVA\b/i, /\b25N\b/]) if (banned.test(all)) fail(`contains a banned name (${banned.source}).`);
if (/\bRECO\b/.test(all)) warnings.push("mentions RECO: every RECO figure must already be public on wexadvisory.com. Check each one.");
if (/wexadvisory\.com\/(audit|invoice-check|card-fee-check)(?![^)\s]*from=newsletter)/.test(content)) {
  fail("a link to a free check or the audit is missing ?from=newsletter.");
}

// ---------- network ----------
if (!offline) {
  const urls = [...new Set([...content.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)].map((m) => m[1]))];
  // Hosts that drop every scripted connection (even their homepage), checked
  // by hand at approval instead. pnc.com: connection reset from scripts, 11-22.
  const BLOCKS_SCRIPTS = ["pnc.com"];
  // Some sites answer HEAD with 404 or 405 while GET works (support.google.com
  // did on 11-22), so any HEAD failure is retried as a browser-like GET.
  const UA = { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36" };
  await Promise.all(
    urls.map(async (u) => {
      try {
        let r = await fetch(u, { method: "HEAD", redirect: "follow", headers: UA, signal: AbortSignal.timeout(15000) });
        if (r.status >= 400) r = await fetch(u, { redirect: "follow", headers: UA, signal: AbortSignal.timeout(20000) });
        if ([401, 403, 429].includes(r.status)) warnings.push(`link blocks scripts (${r.status}), open it in a browser: ${u}`);
        else if (r.status >= 400) fail(`link returns ${r.status}: ${u}`);
      } catch (e) {
        if (BLOCKS_SCRIPTS.includes(siteOf(u))) warnings.push(`link's site drops scripted connections, open it in a browser: ${u}`);
        else fail(`link did not load (${e.name}): ${u}`);
      }
    })
  );
  if (repo) {
    try {
      const r = await fetch(`https://api.github.com/repos/${repo}`, {
        headers: { Accept: "application/vnd.github+json" },
        signal: AbortSignal.timeout(15000),
      });
      if (!r.ok) fail(`GitHub repo ${repo} could not be read (${r.status}).`);
      else {
        const j = await r.json();
        if (j.private) fail(`repo ${repo} is private.`);
        if (j.archived) fail(`repo ${repo} is archived.`);
        if (!j.license || ["NOASSERTION", "other"].includes(j.license.spdx_id) || j.license.key === "other") {
          fail(`repo ${repo} has no recognized open license.`);
        }
        const age = (Date.now() - new Date(j.pushed_at).getTime()) / 86400000;
        if (age > 90) fail(`repo ${repo} was last pushed ${Math.round(age)} days ago; the limit is 90.`);
      }
    } catch (e) {
      fail(`GitHub repo ${repo} could not be checked (${e.name}). Rerun when the network is back.`);
    }
  }
}

for (const w of warnings) console.warn(`  ! ${w}`);
if (problems.length) {
  console.error(`check-newsletter-issue: ${problems.length} problem(s) in ${file}`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log(`check-newsletter-issue passed${offline ? " (offline)" : ""}: ${file} (${words} words${repo ? `, repo ${repo}` : ""}).`);
