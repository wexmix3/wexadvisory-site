import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

// Blog posts are plain markdown files in content/blog/<slug>.md. The filename
// is the slug. Everything here runs at build time (all blog routes are static).

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostFaqItem = { q: string; a: string };
export type PostSource = { title: string; url: string };

export type Post = {
  slug: string;
  title: string;
  description: string;
  /** Published date, YYYY-MM-DD. */
  date: string;
  /** Last meaningful content change, YYYY-MM-DD. Drives lastmod and dateModified. */
  updated: string;
  /** The 40-60 word direct answer shown under the H1. */
  answer: string;
  faqs: PostFaqItem[];
  sources: PostSource[];
  draft: boolean;
  /** Markdown body, frontmatter removed. */
  body: string;
};

// Drafts show in local dev and on Vercel preview deployments, never on
// production. Keyed on VERCEL_ENV because preview builds also run with
// NODE_ENV=production. next.config.mjs applies the same rule to decide whether
// the Blog link renders: change both together.
export const SHOW_DRAFTS = process.env.VERCEL_ENV !== "production";

function fail(file: string, problem: string): never {
  throw new Error(`[blog] content/blog/${file}: ${problem}`);
}

function requireString(file: string, data: Record<string, unknown>, field: string): string {
  const value = data[field];
  if (typeof value !== "string" || value.trim() === "") {
    fail(file, `frontmatter field "${field}" is required and must be a non-empty string.`);
  }
  return value.trim();
}

// YAML turns an unquoted 2026-10-07 into a Date, and silently rolls an
// impossible day forward (Feb 30 becomes Mar 2). So for a Date, check the text
// that was actually typed in the frontmatter. Returns YYYY-MM-DD, rejects
// anything that is not a real day.
function requireDate(file: string, data: Record<string, unknown>, rawFrontmatter: string, field: string): string {
  const value = data[field];
  const typed = rawFrontmatter.match(new RegExp(`^${field}:[ \\t]*["']?([^"'\\s#]+)`, "m"))?.[1] ?? "";
  const text = value instanceof Date ? typed : typeof value === "string" ? value.trim() : "";
  const parsed = new Date(`${text}T00:00:00Z`);
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(text) ||
    Number.isNaN(parsed.getTime()) ||
    parsed.toISOString().slice(0, 10) !== text
  ) {
    fail(file, `frontmatter field "${field}" is required and must be a valid date written as YYYY-MM-DD.`);
  }
  return text;
}

function requireList<T>(
  file: string,
  data: Record<string, unknown>,
  field: string,
  keys: [keyof T & string, keyof T & string]
): T[] {
  const value = data[field];
  if (!Array.isArray(value)) {
    fail(file, `frontmatter field "${field}" is required and must be a list (use [] for none).`);
  }
  return value.map((item, i) => {
    const out: Record<string, string> = {};
    for (const key of keys) {
      const v = (item as Record<string, unknown> | null)?.[key];
      if (typeof v !== "string" || v.trim() === "") {
        fail(file, `${field}[${i}] needs a non-empty "${key}".`);
      }
      out[key] = v.trim();
    }
    return out as T;
  });
}

function readPost(file: string): Post {
  const slug = file.replace(/\.md$/, "");
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
    fail(file, "the filename is the URL slug, so it must be lowercase letters, numbers and single hyphens.");
  }

  // The empty options object is deliberate: without one, gray-matter returns
  // a cached copy on repeat calls and that copy has no raw `.matter` text.
  const parsed = matter(fs.readFileSync(path.join(BLOG_DIR, file), "utf8"), {});
  const { data, content } = parsed;

  if (typeof data.draft !== "boolean") {
    fail(file, 'frontmatter field "draft" is required and must be true or false.');
  }

  const date = requireDate(file, data, parsed.matter, "date");
  const updated = requireDate(file, data, parsed.matter, "updated");
  if (updated < date) {
    fail(file, `"updated" (${updated}) is earlier than "date" (${date}).`);
  }

  const sources = requireList<PostSource>(file, data, "sources", ["title", "url"]);
  sources.forEach((s, i) => {
    if (!/^https?:\/\//.test(s.url)) fail(file, `sources[${i}].url must start with http:// or https://.`);
  });

  if (content.trim() === "") fail(file, "the post has no body.");

  return {
    slug,
    title: requireString(file, data, "title"),
    description: requireString(file, data, "description"),
    date,
    updated,
    answer: requireString(file, data, "answer"),
    faqs: requireList<PostFaqItem>(file, data, "faqs", ["q", "a"]),
    sources,
    draft: data.draft,
    body: content,
  };
}

/** Visible posts, newest first. Every file is validated, drafts included. */
export function getAllPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map(readPost)
    .filter((post) => SHOW_DRAFTS || !post.draft)
    .sort((a, b) => (a.date === b.date ? a.slug.localeCompare(b.slug) : a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

/** "2026-10-07" -> "October 7, 2026", with no timezone drift. */
export function formatPostDate(date: string): string {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
