#!/usr/bin/env node
// Pre-publish page check. Exits non-zero and lists every problem if:
//
//   1. the hand-maintained page list behind the sitemap and the indexable
//      routes under src/app have drifted apart, or
//   2. an indexable page lost its canonical, or
//   3. a page lost the one element that makes it worth indexing (the audit
//      sample, the dashboard screenshots, the real numbers on a case page).
//
// Why: an edit that rewrites a page can silently drop its original element,
// and a sitemap kept by hand silently stops listing new pages. Neither one
// throws anywhere. This is the only automated check on the site.
//
// Usage:
//   npm run check-pages                                  source checks only
//   npm run check-pages -- --url http://localhost:3000   plus rendered checks
//   npm run check-pages -- --url https://www.wexadvisory.com
//
// Run the --url form against `next start` before a merge, and against
// production after a deploy.
//
// MAINTENANCE: the markers below are exact strings on purpose. If you reword a
// heading deliberately, update the marker in the same commit. A failure here
// means "confirm this element was meant to change", not "the check is flaky".

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, relative, sep } from "node:path";

const CANONICAL_BASE = "https://www.wexadvisory.com";

// Per-route key elements. `imports` are checked in the page source,
// `markers` in the rendered HTML (--url mode).
const KEY_ELEMENTS = {
  "": {
    imports: ["CaseStudies", "ToolsShowcase", "AuditHighlight"],
    markers: [
      "Real clients, real systems",
      "Not a slide deck. Shipped systems.",
      "See exactly where AI saves your business money",
    ],
  },
  "/audit": {
    imports: ["AuditSurface", "AuditGuide"],
    markers: [
      "Five workflows, run by hand.",
      "What's in the report",
      "About the sample on this page",
    ],
  },
  "/work": {
    imports: ["DashboardShowcase"],
    markers: [
      "What we actually ship",
      "Ops dashboard pulse view",
      "Finance dashboard income statement view",
    ],
  },
  "/ai-ops-dashboard-for-ecommerce-brands": {
    imports: [],
    markers: ["119 wholesale accounts"],
  },
};

// Routes that are indexable but deliberately absent from the static PAGES
// list (e.g. generated elsewhere in sitemap.ts). Add with a reason.
const SITEMAP_EXEMPT = [
  "/blog", // added by sitemap.ts itself, and only once a post is published
];

const args = process.argv.slice(2);
const flag = (name) => {
  const i = args.indexOf(name);
  return i === -1 ? null : args[i + 1];
};
const root = flag("--root") ?? process.cwd();
const url = flag("--url")?.replace(/\/$/, "") ?? null;

const problems = [];
const fail = (msg) => problems.push(msg);

// ---------- source checks ----------

const appDir = join(root, "src", "app");
if (!existsSync(appDir)) {
  console.error(`check-pages: ${appDir} not found. Run from the site root or pass --root.`);
  process.exit(2);
}

function findPages(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...findPages(full));
    else if (entry.name === "page.tsx") out.push(full);
  }
  return out;
}

const routes = new Map(); // route -> source text
for (const file of findPages(appDir)) {
  const segments = relative(appDir, file).split(sep).slice(0, -1);
  // Route groups "(x)" do not appear in the URL; dynamic segments cannot be
  // listed statically, so they are out of scope here.
  if (segments.some((s) => s.startsWith("[") || s.startsWith("_"))) continue;
  const route = segments.filter((s) => !s.startsWith("(")).map((s) => `/${s}`).join("");
  routes.set(route, readFileSync(file, "utf8"));
}

const isNoindex = (src) => /index:\s*false/.test(src);
// A page that only calls redirect() serves no content of its own.
const isRedirectOnly = (src) => /\bredirect\(/.test(src) && !/return\s*\(?\s*</.test(src);
const indexable = [...routes]
  .filter(([, src]) => !isNoindex(src) && !isRedirectOnly(src))
  .map(([r]) => r);

// The page list lives in sitemap.ts today, and in src/lib/site-pages.ts on
// the blog branch (where each entry carries its own lastModified). Read both.
const listFiles = [join(appDir, "sitemap.ts"), join(root, "src", "lib", "site-pages.ts")].filter(existsSync);
const listSrc = listFiles.map((f) => readFileSync(f, "utf8")).join("\n");
const sitemapPaths = [...listSrc.matchAll(/\{\s*path:\s*"([^"]*)"/g)].map((m) => m[1]);
const lastModBlock = listSrc.match(/LAST_MODIFIED[^=]*=\s*\{([\s\S]*?)\};/);
const inlineDates = [
  ...listSrc.matchAll(/\{\s*path:\s*"([^"]*)",\s*lastModified:\s*"\d{4}-\d{2}-\d{2}"/g),
].map((m) => m[1]);
const lastModKeys = lastModBlock
  ? [...lastModBlock[1].matchAll(/^\s*"([^"]*)":/gm)].map((m) => m[1])
  : inlineDates;

if (sitemapPaths.length === 0) fail("sitemap: found no `path:` entries in sitemap.ts or src/lib/site-pages.ts. The parser no longer matches; fix check-pages.mjs.");
if (lastModKeys.length === 0) fail("sitemap: found no last-modified dates. The parser no longer matches; fix check-pages.mjs.");

for (const route of indexable) {
  if (SITEMAP_EXEMPT.includes(route)) continue;
  if (!sitemapPaths.includes(route)) fail(`sitemap: indexable page "${route || "/"}" is missing from the sitemap page list`);
}
for (const path of sitemapPaths) {
  if (!routes.has(path)) fail(`sitemap: PAGES lists "${path || "/"}" but no page exists at that route`);
  else if (isNoindex(routes.get(path))) fail(`sitemap: PAGES lists "${path || "/"}" but that page is noindex`);
  if (!lastModKeys.includes(path)) fail(`sitemap: "${path || "/"}" has no LAST_MODIFIED date (it would render as an invalid date)`);
}
for (const key of lastModKeys) {
  if (!sitemapPaths.includes(key)) fail(`sitemap: LAST_MODIFIED has "${key || "/"}" but PAGES does not`);
}

for (const route of indexable) {
  if (!/canonical/.test(routes.get(route))) fail(`canonical: page "${route || "/"}" declares no canonical in its metadata`);
}

for (const [route, { imports }] of Object.entries(KEY_ELEMENTS)) {
  const src = routes.get(route);
  if (src === undefined) {
    fail(`key elements: route "${route || "/"}" is in KEY_ELEMENTS but no page exists there`);
    continue;
  }
  for (const name of imports) {
    const imported = new RegExp(`import\\s+${name}\\b`).test(src);
    const used = new RegExp(`<${name}[\\s/>]`).test(src);
    if (!imported || !used) fail(`key elements: "${route || "/"}" no longer imports and renders <${name}>`);
  }
}

// ---------- rendered checks ----------

// Typographic quotes and entities vary between source and HTML; compare on a
// folded form so a curly apostrophe is not a false failure.
const fold = (s) =>
  s
    .replace(/&#x27;|&#39;|&apos;|&rsquo;|[‘’]/g, "'")
    .replace(/&quot;|&ldquo;|&rdquo;|[“”]/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/<!--.*?-->/g, "")
    .replace(/\s+/g, " ");

if (url) {
  for (const route of indexable) {
    const label = route || "/";
    let res;
    try {
      res = await fetch(`${url}${route || "/"}`, { redirect: "manual" });
    } catch (err) {
      fail(`rendered: ${label} could not be fetched from ${url} (${err.message})`);
      continue;
    }
    if (res.status !== 200) {
      fail(`rendered: ${label} returned HTTP ${res.status}, expected 200`);
      continue;
    }
    const html = await res.text();
    const text = fold(html);

    const h1s = (html.match(/<h1[\s>]/g) ?? []).length;
    if (h1s !== 1) fail(`rendered: ${label} has ${h1s} <h1> elements, expected exactly 1`);

    const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
    const expected = `${CANONICAL_BASE}${route}`;
    if (canonical !== expected) fail(`rendered: ${label} canonical is ${canonical ?? "missing"}, expected ${expected}`);

    const robots = html.match(/<meta name="robots" content="([^"]*)"/)?.[1] ?? "";
    if (/noindex/i.test(robots)) fail(`rendered: ${label} is served with robots "${robots}" but is meant to be indexable`);

    const title = html.match(/<title>([^<]*)<\/title>/)?.[1]?.trim();
    if (!title) fail(`rendered: ${label} has no <title>`);

    for (const marker of KEY_ELEMENTS[route]?.markers ?? []) {
      if (!text.includes(fold(marker))) fail(`rendered: ${label} is missing its key element "${marker}"`);
    }
  }
}

// ---------- report ----------

const scope = url ? `source + rendered (${url})` : "source only";
if (problems.length > 0) {
  console.error(`check-pages FAILED, ${problems.length} problem(s) [${scope}]:`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log(`check-pages passed [${scope}]: ${indexable.length} indexable pages, ${sitemapPaths.length} sitemap entries, ${Object.keys(KEY_ELEMENTS).length} pages with key elements.`);
