// Tells IndexNow (Bing, and the engines that read Bing's index) that blog
// pages are new or changed. Run by .github/workflows/indexnow.yml after the
// production deploy for a push that touched content/blog.
//
//   node scripts/indexnow-submit.mjs content/blog/a.md content/blog/b.md
//   node scripts/indexnow-submit.mjs --all       every published post
//   add --dry-run to print the request without sending it
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
const named = args.filter((a) => !a.startsWith("--"));

const files = all
  ? fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md")).map((f) => path.join(BLOG_DIR, f))
  : named;

// Same rule as src/lib/blog.ts: a post with "draft: true" is not on the live site.
const isDraft = (file) => /^draft:\s*true\s*$/m.test(fs.readFileSync(file, "utf8").split(/^---\s*$/m)[1] ?? "");

const published = files.filter((file) => {
  if (!file.endsWith(".md")) return false;
  if (!fs.existsSync(file)) fail(`${file} does not exist.`);
  return !isDraft(file);
});

if (published.length === 0) {
  console.log("[indexnow] no published post in this change. Nothing to submit.");
  process.exit(0);
}

const urlList = [
  ...published.map((file) => `${SITE_URL}/blog/${path.basename(file, ".md")}`),
  `${SITE_URL}/blog`,
];

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
  process.exit(0);
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
