// Tells IndexNow (Bing, and the engines that read Bing's index) that pages
// are new or changed. Run by .github/workflows/indexnow.yml after the
// production deploy for a push that touched content/blog or a page file.
//
//   node scripts/indexnow-submit.mjs content/blog/a.md src/app/solutions/page.tsx
//   node scripts/indexnow-submit.mjs --sitemap   every URL in the live sitemap
//   node scripts/indexnow-submit.mjs --all       every published post (+ /blog)
//   add --dry-run to print the request without sending it
//
// Page files are submitted only when their URL is in the live sitemap, so a
// page left out of the sitemap never reaches the engines this way.
//
// Google does not take part in IndexNow. It finds posts through the sitemap.
//
// Exits non-zero on anything short of an accepted submission.

import fs from "node:fs";
import path from "node:path";

const HOST = "www.wexadvisory.com";
const SITE_URL = `https://${HOST}`;
const BLOG_DIR = path.join("content", "blog");
// Not a secret: IndexNow proves ownership by this same value being served
// from the site at /<key>.txt (public/<key>.txt).
const KEY = "8b33f1761feb3c711f41de5d13722424";
const KEY_LOCATION = `${SITE_URL}/${KEY}.txt`;

function fail(message) {
  console.error(`[indexnow] FAILED: ${message}`);
  process.exit(1);
}

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const all = args.includes("--all");
const sitemap = args.includes("--sitemap");
const named = args.filter((a) => !a.startsWith("--"));

const files = all
  ? fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md")).map((f) => path.join(BLOG_DIR, f))
  : named.filter((f) => f.endsWith(".md"));
const pageFiles = all ? [] : named.filter((f) => !f.endsWith(".md"));

// src/app/page.tsx -> the homepage, src/app/(group)/a/b/page.tsx -> /a/b.
// Dynamic routes ([slug]) have no single URL and are skipped (blog posts are
// submitted from their .md file instead).
function pageUrl(file) {
  const m = file.replace(/\\/g, "/").match(/^src\/app\/(?:(.*)\/)?page\.tsx$/);
  if (!m) fail(`${file} is not a src/app page file or a blog post.`);
  const segs = (m[1] ?? "").split("/").filter((s) => s && !/^\(.*\)$/.test(s));
  if (segs.some((s) => s.includes("["))) return null;
  return segs.length ? `${SITE_URL}/${segs.join("/")}` : SITE_URL;
}

async function liveSitemapUrls() {
  const res = await fetch(`${SITE_URL}/sitemap.xml`);
  if (res.status !== 200) fail(`sitemap.xml returned ${res.status}.`);
  const locs = [...(await res.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  if (locs.length === 0) fail("sitemap.xml has no <loc> entries.");
  return locs;
}

// Same rule as src/lib/blog.ts: a post with "draft: true" is not on the live site.
const isDraft = (file) => /^draft:\s*true\s*$/m.test(fs.readFileSync(file, "utf8").split(/^---\s*$/m)[1] ?? "");

const published = files.filter((file) => {
  if (!file.endsWith(".md")) return false;
  if (!fs.existsSync(file)) fail(`${file} does not exist.`);
  return !isDraft(file);
});

const pages = pageFiles.map(pageUrl).filter(Boolean); // fails on a non-page file

if (!sitemap && published.length === 0 && pageFiles.length === 0) {
  console.log("[indexnow] no published post or page in this change. Nothing to submit.");
  process.exit(0);
}

const inSitemap = new Set(await liveSitemapUrls());
let urlList;
if (sitemap) {
  urlList = [...inSitemap];
} else {
  const postUrls = published.length
    ? [...published.map((file) => `${SITE_URL}/blog/${path.basename(file, ".md")}`), `${SITE_URL}/blog`]
    : [];
  const skipped = pages.filter((u) => !inSitemap.has(u));
  if (skipped.length) console.log(`[indexnow] not in the sitemap, skipped: ${skipped.join(", ")}`);
  urlList = [...new Set([...postUrls, ...pages.filter((u) => inSitemap.has(u))])];
}

// Falls through instead of calling process.exit(0) right after a fetch:
// Node 24 on Windows aborts with exit 127 when it exits while closing a
// fetch handle.
if (urlList.length === 0) {
  console.log("[indexnow] every page in this change is outside the sitemap. Nothing to submit.");
} else {
  await submit(urlList);
}

async function submit(urlList) {
  // Submitting an address the site does not serve yet teaches the engines a 404.
  for (const url of [KEY_LOCATION, ...urlList]) {
    const res = await fetch(url, { redirect: "manual" });
    if (res.status !== 200) fail(`${url} returned ${res.status} on the live site, expected 200.`);
  }
  const servedKey = (await (await fetch(KEY_LOCATION)).text()).trim();
  if (servedKey !== KEY) fail(`${KEY_LOCATION} does not contain the key.`);

  const body = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList };
  if (dryRun) {
    console.log("[indexnow] dry run, would send:", JSON.stringify(body, null, 2));
    return;
  }

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });
  // 200 = accepted, 202 = accepted, key check still pending.
  if (res.status !== 200 && res.status !== 202) {
    fail(`IndexNow answered ${res.status}: ${(await res.text()).slice(0, 500)}`);
  }
  console.log(`[indexnow] accepted (${res.status}): ${urlList.join(", ")}`);
}
