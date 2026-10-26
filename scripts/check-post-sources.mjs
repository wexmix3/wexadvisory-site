// Before merging a post: npm run check:sources -- content/blog/<slug>.md
// Every ERROR must be fixed, or the claim removed from the post. Never merge
// a post with an ERROR left in it.
//
// Re-reads every page a blog post cites, at publish time, and checks the post
// against what those pages say today. Posts are drafted days ahead, and cited
// pages get rewritten in between (relayfi.com dropped two figures and a quote
// we attributed to it).
//
//   node scripts/check-post-sources.mjs content/blog/a.md content/blog/b.md
//
// Checks, per post:
//   fetch   every external link in the body and every sources[].url answers 200
//   title   each sources[].title matches the page's <title>, og:title or first <h1>
//   quote   each "quoted phrase" of 3+ words in a paragraph that links out is on
//           one of the pages linked in that same paragraph
//   figure  each number in a paragraph that links out is on one of the pages
//           linked in that same paragraph
// Paragraphs with no external link are first-hand content and are skipped.
//
// Exits 1 on any ERROR. A page that fails to load is an ERROR, never a pass.

import fs from "node:fs";
import matter from "gray-matter";

const TIMEOUT_MS = 20_000;
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36";

const started = Date.now();
const files = process.argv.slice(2).filter((a) => !a.startsWith("--"));
if (files.length === 0) {
  console.error("[check-sources] usage: node scripts/check-post-sources.mjs content/blog/<slug>.md [...]");
  process.exit(1);
}
for (const file of files) {
  if (!fs.existsSync(file)) {
    console.error(`[check-sources] FAILED: ${file} does not exist.`);
    process.exit(1);
  }
}

// ---------- text normalization ----------

const ENTITIES = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", rsquo: "'", lsquo: "'",
  rdquo: '"', ldquo: '"', sbquo: "'", bdquo: '"', ndash: "-", mdash: "-", hellip: "...",
  trade: "(tm)", copy: "(c)", reg: "(r)", middot: "*", bull: "*", shy: "", zwj: "", zwnj: "",
};

function decodeEntities(s) {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (whole, name) => {
    if (name[0] === "#") {
      const code = name[1].toLowerCase() === "x" ? parseInt(name.slice(2), 16) : parseInt(name.slice(1), 10);
      try {
        return String.fromCodePoint(code);
      } catch {
        return whole;
      }
    }
    return ENTITIES[name.toLowerCase()] ?? whole;
  });
}

// Curly quotes, apostrophes and dashes to plain ASCII, whitespace collapsed,
// lowercased. Applied the same way to page text and post text.
function normalize(s) {
  return s
    .replace(/[‘’‚‛′`´]/g, "'")
    .replace(/[“”„‟″«»]/g, '"')
    .replace(/[‐‑‒–—―−]/g, "-")
    .replace(/…/g, "...")
    .replace(/[­​‌‍⁠﻿]/g, "")
    .replace(/[\s  -   　]+/g, " ")
    .trim()
    .toLowerCase();
}

// Titles: also drop ASCII punctuation, so "Tools & Risks (2026 Guide)" and
// "tools risks 2026 guide" compare equal.
function normalizeTitle(s) {
  return normalize(s)
    .replace(/[!-/:-@[-`{-~]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Inline tags join without a space so "<b>Quick</b>Books" stays one word;
// every other tag becomes a space (sup/sub too: "5 million<sup>1</sup>").
const INLINE_TAGS = new Set(
  "a abbr b bdi bdo cite code data del dfn em font i ins kbd mark q s samp small span strong time u var wbr".split(" ")
);

function visibleText(html) {
  const body = html
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<(script|style|noscript|template|svg|head)\b[\s\S]*?<\/\1\s*>/gi, " ")
    .replace(/<\/?([a-z][a-z0-9-]*)\b[^>]*>/gi, (_, tag) => (INLINE_TAGS.has(tag.toLowerCase()) ? "" : " "));
  return normalize(decodeEntities(body));
}

function stripTags(s) {
  return decodeEntities(s.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
}

function pageTitles(html) {
  const out = [];
  const head = html.match(/<head\b[\s\S]*?<\/head>/i)?.[0] ?? html;
  const title = head.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1];
  if (title) out.push(["<title>", stripTags(title)]);
  for (const tag of html.match(/<meta\b[^>]*>/gi) ?? []) {
    const attr = (name) => {
      const m = tag.match(new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s"'>]+))`, "i"));
      return m ? (m[1] ?? m[2] ?? m[3]) : undefined;
    };
    if ((attr("property") ?? attr("name") ?? "").toLowerCase() === "og:title") {
      const content = attr("content");
      if (content) out.push(["og:title", stripTags(content)]);
      break;
    }
  }
  const h1 = html
    .replace(/<(script|style|noscript|template)\b[\s\S]*?<\/\1\s*>/gi, " ")
    .match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1];
  if (h1) out.push(["<h1>", stripTags(h1)]);
  return out.filter(([, t]) => t !== "");
}

// ---------- numbers ----------

const SMALL = [
  "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
  "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen",
];
const TENS = { twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90 };
const SCALES = { dozen: 12, hundred: 100, thousand: 1e3, million: 1e6, billion: 1e9, trillion: 1e12 };
const SUFFIX = { k: 1e3, m: 1e6, mn: 1e6, b: 1e9, bn: 1e9 };
const NUMWORD = [...SMALL, ...Object.keys(TENS)].join("|");
const SCALEWORD = Object.keys(SCALES).join("|");

// "seven", "twenty-four", "two dozen", "seven million", "two hundred thousand".
const SPELLED = new RegExp(
  `\\b(?:${NUMWORD})(?:[\\s-]+(?:and[\\s-]+)?(?:${NUMWORD}|${SCALEWORD}))*\\b`,
  "gi"
);
// "a million", "half a million", "a dozen".
const A_SCALE = new RegExp(`\\b(half an?|an?)\\s+(${SCALEWORD})\\b`, "gi");
const aScaleValue = (a, scale) => (a.toLowerCase().startsWith("half") ? 0.5 : 1) * SCALES[scale.toLowerCase()];
const HAS_SCALE = new RegExp(`\\b(${SCALEWORD})\\b`, "i");
// 24, 5.4, 7,000,000, $0.10, 50%, 3.5 million, 7m, 10k, 10x, 20GB. Other
// digits glued to letters (B2B, 1st, Q3, 4pm) are not figures.
const DIGITS = new RegExp(
  `(?<![\\w.,])(\\$)?(\\d{1,3}(?:,\\d{3})+|\\d+)(\\.\\d+)?` +
    `(?:\\s*(%|percent\\b|per cent\\b)|\\s+(${SCALEWORD})s?\\b|(k|m|mn|b|bn)\\b|(?:x|kb|mb|gb|tb|ms|hrs?|mins?)\\b)?` +
    `(?![\\w%]|[.,]\\d)`,
  "gi"
);

function wordsValue(phrase) {
  let total = 0;
  let current = 0;
  for (const w of phrase.toLowerCase().split(/[\s-]+/)) {
    if (w === "and") continue;
    const small = SMALL.indexOf(w);
    if (small >= 0) current += small;
    else if (TENS[w]) current += TENS[w];
    else if (w === "dozen" || w === "hundred") current = (current || 1) * SCALES[w];
    else if (SCALES[w]) {
      total += (current || 1) * SCALES[w];
      current = 0;
    }
  }
  return total + current;
}

const key = (n) => String(+n.toPrecision(12));

// Every value the page text mentions, as digits or words. "50%" adds both
// "50" and "50%"; "7 million" adds both "7" and "7000000". A bare spelled
// "one" to "ten" is left out: nearly every page has them, so they would vouch
// for any small figure. A post's "3" needs a "3" on the page.
function pageNumbers(text) {
  const keys = new Set();
  for (const m of text.matchAll(DIGITS)) {
    const [, , int, dec, pct, scaleWord, suffix] = m;
    const n = Number(int.replace(/,/g, "") + (dec ?? ""));
    keys.add(key(n));
    if (pct) keys.add(key(n) + "%");
    const scale = scaleWord ? SCALES[scaleWord.toLowerCase()] : suffix ? SUFFIX[suffix.toLowerCase()] : 0;
    if (scale) keys.add(key(n * scale));
  }
  for (const m of text.matchAll(A_SCALE)) keys.add(key(aScaleValue(m[1], m[2])));
  for (const m of text.matchAll(SPELLED)) {
    const value = wordsValue(m[0]);
    if (value <= 10 && !HAS_SCALE.test(m[0])) continue;
    keys.add(key(value));
    const after = text.slice(m.index + m[0].length, m.index + m[0].length + 9);
    if (/^\s*(%|percent|per cent)/.test(after)) keys.add(key(value) + "%");
  }
  return keys;
}

// Figures a post paragraph claims. Spelled numbers count only with a scale
// word ("seven million", "two dozen"): a bare "one" or "two" is ordinary prose.
function postFigures(text) {
  const figures = [];
  const taken = [];
  for (const m of text.matchAll(SPELLED)) {
    if (!HAS_SCALE.test(m[0])) continue;
    figures.push({ label: m[0], key: key(wordsValue(m[0])), at: m.index });
    taken.push([m.index, m.index + m[0].length]);
  }
  for (const m of text.matchAll(A_SCALE)) {
    figures.push({ label: m[0], key: key(aScaleValue(m[1], m[2])), at: m.index });
  }
  for (const m of text.matchAll(DIGITS)) {
    if (taken.some(([a, b]) => m.index >= a && m.index < b)) continue;
    const [label, dollar, int, dec, pct, scaleWord, suffix] = m;
    const n = Number(int.replace(/,/g, "") + (dec ?? ""));
    const plain = !dollar && !dec && !pct && !scaleWord && !suffix && !int.includes(",");
    if (plain && n >= 1990 && n <= 2099) continue; // a year
    const scale = scaleWord ? SCALES[scaleWord.toLowerCase()] : suffix ? SUFFIX[suffix.toLowerCase()] : 1;
    figures.push({ label: label.trim(), key: key(n * scale) + (pct ? "%" : ""), at: m.index });
  }
  return figures.sort((a, b) => a.at - b.at);
}

// ---------- markdown ----------

const isExternal = (url) => /^https?:\/\//i.test(url) && !/^https?:\/\/([a-z0-9-]+\.)*wexadvisory\.com(\/|$|[?#])/i.test(url);
// [text](url "title"); the url may hold one level of parentheses. Images are
// not citations and are dropped.
const LINK = /(?<!!)\[([^\]]*)\]\(\s*<?((?:[^()\s>]|\([^()\s]*\))+)>?(?:\s+"[^"]*")?\s*\)/g;
const IMAGE = /!\[[^\]]*\]\([^)]*\)/g;
const AUTOLINK = /<(https?:\/\/[^>\s]+)>/g;
const HREF = /<a\b[^>]*?\bhref\s*=\s*["']([^"']+)["'][^>]*>/gi;
const BARE_URL = /(?<![(<"'])\bhttps?:\/\/[^\s<>()\]]+[^\s<>()\].,;:!?'"]/g;

function linksIn(md) {
  const urls = [];
  md = md.replace(IMAGE, " ");
  for (const m of md.matchAll(LINK)) urls.push(m[2]);
  for (const m of md.matchAll(AUTOLINK)) urls.push(m[1]);
  for (const m of md.matchAll(HREF)) urls.push(m[1]);
  const rest = md.replace(LINK, " ").replace(AUTOLINK, " ").replace(/<[^>]*>/g, " ");
  for (const m of rest.matchAll(BARE_URL)) urls.push(m[0]);
  return [...new Set(urls.filter(isExternal))];
}

// Reference links ([text][ref], [text][], [ref]) rewritten inline, so they
// count as links in the paragraph that uses them.
function inlineReferenceLinks(body) {
  const defs = new Map();
  const rest = body.replace(/^ {0,3}\[([^\]]+)\]:\s*<?(\S+?)>?(?:\s+["'(].*)?$/gm, (_, ref, url) => {
    defs.set(ref.trim().toLowerCase(), url);
    return "";
  });
  if (defs.size === 0) return body;
  return rest.replace(/(?<!!)\[([^\]]+)\](?:\[([^\]]*)\])?(?![(:])/g, (whole, text, ref) => {
    const url = defs.get((ref || text).trim().toLowerCase());
    return url ? `[${text}](${url})` : whole;
  });
}

// Markdown to the words a reader sees: link text kept, URLs and tags dropped.
function plainText(md) {
  return md
    .replace(IMAGE, " ")
    .replace(LINK, (_, text) => text)
    .replace(AUTOLINK, " ")
    .replace(/<[^>]*>/g, "")
    .replace(BARE_URL, " ")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/[*_~]{1,3}([^*_~]+)[*_~]{1,3}/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

// Blank-line separated blocks. Each table row, list item and heading is its
// own unit, so a link in one row does not vouch for figures in another.
function paragraphs(body) {
  const md = body
    .replace(/^(```|~~~)[\s\S]*?^\1.*$/gm, "")
    .replace(/<!--[\s\S]*?-->/g, "");
  const units = [];
  for (const block of md.split(/\n\s*\n/)) {
    let current = null;
    for (const raw of block.split("\n")) {
      const line = raw.replace(/^\s*(>\s?)+/, "").trimEnd();
      if (line.trim() === "") continue;
      if (/^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|?\s*$/.test(line)) continue; // table separator
      const table = /^\s*\|/.test(line);
      const heading = /^\s*#{1,6}\s/.test(line);
      const item = line.match(/^\s*(?:[-*+]|\d+[.)])\s+(.*)$/);
      if (table || heading || item || !current || current.closed) {
        current = { text: item ? item[1] : heading ? line.replace(/^\s*#+\s*/, "") : line, closed: table || heading };
        units.push(current);
      } else {
        current.text += " " + line.trim();
      }
    }
  }
  return units.map((u) => u.text.replace(/^\s*\|/, "").replace(/\|\s*$/, ""));
}

// "quoted phrases" of 3+ words, straight or curly double quotes. An odd count
// of quote marks would pair the wrong text, so it is reported, not guessed.
function quotesIn(text) {
  const norm = normalize(text);
  const out = [];
  for (const m of norm.matchAll(/"([^"]+)"/g)) {
    const q = m[1].replace(/^[\s.,;:!?-]+|[\s.,;:!?-]+$/g, "");
    if (q.split(/\s+/).filter((w) => /[a-z0-9]/.test(w)).length >= 3) out.push(q);
  }
  return { quotes: out, unbalanced: (norm.match(/"/g) ?? []).length % 2 === 1 };
}

// A quote with "..." in it: every piece must be on the page, in order.
function pageHasQuote(pageText, quote) {
  let from = 0;
  for (const piece of quote.split("...").map((p) => p.trim()).filter(Boolean)) {
    const at = pageText.indexOf(piece, from);
    if (at < 0) return false;
    from = at + piece.length;
  }
  return true;
}

// ---------- fetch ----------

async function fetchPage(url) {
  try {
    const res = await fetch(url, {
      redirect: "follow",
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: {
        "User-Agent": USER_AGENT,
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });
    const finalUrl = res.url || url;
    if (res.status !== 200) return { ok: false, error: `HTTP ${res.status} (final URL ${finalUrl})` };
    // A dead article often redirects to the homepage with a 200.
    const from = new URL(url);
    const to = new URL(finalUrl);
    if (from.pathname.replace(/\/+$/, "") !== "" && to.pathname.replace(/\/+$/, "") === "") {
      return { ok: false, error: `redirected to the site's homepage (${finalUrl}); the cited page is likely gone` };
    }
    const type = res.headers.get("content-type") ?? "";
    const charset = type.match(/charset=["']?([\w-]+)/i)?.[1] ?? "utf-8";
    let raw;
    try {
      raw = new TextDecoder(charset).decode(await res.arrayBuffer());
    } catch {
      raw = new TextDecoder("utf-8").decode(await res.arrayBuffer());
    }
    if (!/html|xml|text\/plain/i.test(type)) {
      return { ok: false, error: `content-type "${type}" is not a web page, cannot read its text` };
    }
    const text = /text\/plain/i.test(type) ? normalize(raw) : visibleText(raw);
    if (text.length < 200) return { ok: false, error: `page has almost no visible text (${text.length} chars); likely rendered by JavaScript or blocked` };
    return {
      ok: true,
      finalUrl,
      text,
      numbers: pageNumbers(text),
      titles: /html|xml/i.test(type) ? pageTitles(raw) : [],
    };
  } catch (err) {
    const why = err?.name === "TimeoutError" ? `timed out after ${TIMEOUT_MS / 1000}s` : `${err?.name ?? "Error"}: ${err?.cause?.code ?? err?.message ?? err}`;
    return { ok: false, error: why };
  }
}

// ---------- run ----------

const posts = files.map((file) => {
  const { data, content } = matter(fs.readFileSync(file, "utf8"), {});
  const body = inlineReferenceLinks(content);
  return { file, sources: data.sources, units: paragraphs(body), bodyLinks: linksIn(body) };
});

const allUrls = [
  ...new Set(
    posts.flatMap((p) => [
      ...p.bodyLinks,
      ...(Array.isArray(p.sources) ? p.sources : []).map((s) => s?.url).filter((u) => typeof u === "string"),
    ])
  ),
];
const pages = new Map(await Promise.all(allUrls.map(async (url) => [url, await fetchPage(url)])));

let pass = 0;
let errors = 0;
const ok = (kind, msg) => {
  pass++;
  console.log(`PASS  ${kind.padEnd(6)} ${msg}`);
};
const bad = (kind, msg) => {
  errors++;
  console.log(`ERROR ${kind.padEnd(6)} ${msg}`);
};
const short = (s, n = 80) => (s.length > n ? s.slice(0, n) + "..." : s);

console.log(`== fetched ${allUrls.length} cited page(s)`);
for (const [url, page] of pages) {
  if (page.ok) ok("fetch", `${url} (200${page.finalUrl !== url ? `, redirected to ${page.finalUrl}` : ""})`);
  else bad("fetch", `${url}: ${page.error}`);
}

for (const post of posts) {
  console.log(`\n== ${post.file}`);

  if (!Array.isArray(post.sources)) bad("title", `frontmatter "sources" must be a list, got ${JSON.stringify(post.sources)}`);
  (Array.isArray(post.sources) ? post.sources : []).forEach((source, i) => {
    if (typeof source?.url !== "string" || typeof source?.title !== "string" || !source.url || !source.title) {
      bad("title", `sources[${i}] needs both "title" and "url"`);
      return;
    }
    const page = pages.get(source.url);
    if (!page.ok) {
      bad("title", `"${source.title}": cannot check, ${source.url} did not load`);
      return;
    }
    // Either may contain the other ("... | Blog" suffixes), but a page title of
    // one or two words ("Home", "Blog") is too generic to vouch for anything.
    const want = normalizeTitle(source.title);
    const match = page.titles.find(([, t]) => {
      const got = normalizeTitle(t);
      if (got === "" || want === "") return false;
      return got.includes(want) || (want.includes(got) && got.split(" ").length >= 3);
    });
    if (match) ok("title", `"${source.title}" matches ${match[0]}`);
    else {
      const seen = page.titles.length ? page.titles.map(([k, t]) => `${k} "${t}"`).join(", ") : "no <title>, og:title or <h1> found";
      bad("title", `frontmatter "${source.title}" vs page ${seen} (${source.url})`);
    }
  });

  for (const unit of post.units) {
    const urls = linksIn(unit);
    if (urls.length === 0) continue;
    const text = plainText(unit);
    const loaded = urls.filter((u) => pages.get(u)?.ok);
    const failed = urls.filter((u) => !pages.get(u)?.ok);
    const failNote = failed.length ? ` (did not load: ${failed.join(", ")})` : "";

    const { quotes, unbalanced } = quotesIn(text);
    if (unbalanced) bad("quote", `odd number of double quote marks, check the quotes by hand | paragraph: "${short(text)}"`);
    for (const quote of quotes) {
      const hit = loaded.find((u) => pageHasQuote(pages.get(u).text, quote));
      if (hit) ok("quote", `"${short(quote)}" in ${hit}`);
      else bad("quote", `"${quote}" not found in: ${urls.join(", ")}${failNote}`);
    }

    for (const fig of postFigures(text)) {
      const hit = loaded.find((u) => pages.get(u).numbers.has(fig.key));
      if (hit) ok("figure", `${fig.label} in ${hit} | "${short(text)}"`);
      else bad("figure", `${fig.label} not found in: ${urls.join(", ")}${failNote} | paragraph: "${short(text)}"`);
    }
  }
}

const seconds = ((Date.now() - started) / 1000).toFixed(1);
console.log(`\n${pass + errors} checks: ${pass} PASS, ${errors} ERROR. ${files.length} post(s), ${allUrls.length} page(s), ${seconds}s.`);
process.exit(errors > 0 ? 1 : 0);
