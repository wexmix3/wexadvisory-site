#!/usr/bin/env node
// Checks one newsletter issue before Max sees it and again before it goes on
// the site. Exits non-zero and lists every problem. Rules that can be checked
// in code live here, not only in the /newsletter skill's prose.
//
// Usage: node scripts/check-newsletter-issue.mjs <path-to-issue.md> [--offline]
//   --offline skips the network checks (links and the GitHub repo).
//
// Issue shape (the /newsletter skill writes this):
//   ## This week in AI for small business   -> exactly 3 "### " items, each with
//        a primary-source link and a <!-- published: YYYY-MM-DD --> comment
//        no more than 10 days before the issue date
//   ## Repo of the week ...                 -> one https://github.com/<owner>/<repo>
//        link; the repo must be public, licensed, pushed in the last 90 days
//   ## Prompt of the week                   -> a fenced code block (the prompt)
//        and a "> " block quote (the real output it gave)
//   ## From Wex Advisory                    -> any text
// Body 350 to 900 words. No em dashes. No banned names.

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
let current = null;
for (const line of content.split(/\r?\n/)) {
  const m = line.match(/^## (.+)$/);
  if (m) {
    current = m[1].trim();
    sections.set(current, []);
  } else if (current) sections.get(current).push(line);
}
const find = (prefix) => [...sections.keys()].find((k) => k.toLowerCase().startsWith(prefix.toLowerCase()));
const need = ["This week in AI", "Repo of the week", "Prompt of the week", "From Wex Advisory"];
for (const n of need) if (!find(n)) fail(`missing section "## ${n}...".`);

// News: 3 items, each with a link and a fresh published date.
const newsKey = find("This week in AI");
if (newsKey) {
  const text = sections.get(newsKey).join("\n");
  const items = text.split(/^### /m).slice(1);
  if (items.length !== 3) fail(`news section has ${items.length} "### " items; it needs exactly 3.`);
  items.forEach((item, i) => {
    const head = item.split("\n")[0].trim();
    if (!/\]\(https?:\/\/[^)]+\)/.test(item)) fail(`news item ${i + 1} ("${head}") has no source link.`);
    const pub = item.match(/<!--\s*published:\s*(\d{4}-\d{2}-\d{2})\s*-->/)?.[1];
    if (!pub) fail(`news item ${i + 1} ("${head}") needs a <!-- published: YYYY-MM-DD --> comment.`);
    else if (issueDate) {
      const days = (issueDate - new Date(`${pub}T12:00:00Z`)) / 86400000;
      if (days > 10) fail(`news item ${i + 1} ("${head}") was published ${Math.round(days)} days before the issue; the limit is 10.`);
      if (days < -1) fail(`news item ${i + 1} ("${head}") has a published date after the issue date.`);
    }
  });
}

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
}

// Prompt: a code block and a block quote of the real output.
const promptKey = find("Prompt of the week");
if (promptKey) {
  const text = sections.get(promptKey).join("\n");
  if (!/```[\s\S]+?```/.test(text)) fail("prompt section needs the prompt in a fenced code block.");
  if (!/^> \S/m.test(text)) fail('prompt section needs the real output it gave, as a "> " block quote.');
}

// ---------- whole body ----------
// Reading words only: no comments, no code block (the prompt), no link URLs,
// no markdown markers. The skill aims for 500 to 700; this allows a margin.
const prose = content
  .replace(/<!--[\s\S]*?-->/g, " ")
  .replace(/```[\s\S]*?```/g, " ")
  .replace(/\]\([^)]*\)/g, "]")
  .replace(/[#>*_`|[\]-]+/g, " ");
const words = prose.split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length;
if (words < 450 || words > 750) fail(`body is ${words} reading words (prompt and links not counted); keep it between 450 and 750.`);
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
  await Promise.all(
    urls.map(async (u) => {
      try {
        let r = await fetch(u, { method: "HEAD", redirect: "follow", signal: AbortSignal.timeout(15000) });
        if (r.status === 405 || r.status === 403) r = await fetch(u, { redirect: "follow", signal: AbortSignal.timeout(15000) });
        if ([401, 403, 429].includes(r.status)) warnings.push(`link blocks scripts (${r.status}), open it in a browser: ${u}`);
        else if (r.status >= 400) fail(`link returns ${r.status}: ${u}`);
      } catch (e) {
        fail(`link did not load (${e.name}): ${u}`);
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
