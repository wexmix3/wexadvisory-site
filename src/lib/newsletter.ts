import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { SHOW_DRAFTS } from "@/lib/blog";

// Weekly newsletter (2026-11-17). Issues are markdown files in
// content/newsletter/<slug>.md, written by the aios /newsletter skill and
// committed after Max approves them. The same file is the web archive copy
// and the source of the broadcast email (scripts/newsletter-broadcast.mjs).
// Issue pages are noindex: the newsletter is for readers, not search, and its
// lesson section repeats the week's blog post.

/** Max picked "Hours Back" on 2026-11-21. Change it here and nowhere else. */
export const NEWSLETTER_NAME = "Hours Back";
export const NEWSLETTER_PITCH =
  "AI that gives small business owners their hours back. Every Tuesday: the AI news that matters to your business and what to do about it, 1 free tool worth knowing, and 1 tested prompt you can copy. About 5 minutes to read.";
export const NEWSLETTER_CADENCE = "One email every Tuesday. Unsubscribe in one click.";

/** Signup sources the API accepts. Anything else is recorded as "site". */
export const SIGNUP_SOURCES = ["footer", "blog", "playbooks", "newsletter-page", "issue"] as const;
export type SignupSource = (typeof SIGNUP_SOURCES)[number] | "site";
export const toSignupSource = (v: unknown): SignupSource =>
  typeof v === "string" && (SIGNUP_SOURCES as readonly string[]).includes(v) ? (v as SignupSource) : "site";

const DIR = path.join(process.cwd(), "content", "newsletter");

export type Issue = {
  slug: string;
  /** Issue number, 1, 2, 3 ... */
  number: number;
  /** Email subject line and page title. */
  title: string;
  /** One-line summary for the archive list and the inbox preview text. */
  description: string;
  /** Send date, YYYY-MM-DD. */
  date: string;
  draft: boolean;
  body: string;
};

export const stripComments = (md: string) => md.replace(/<!--[\s\S]*?-->[ \t]*\r?\n?/g, "");

function fail(file: string, problem: string): never {
  throw new Error(`[newsletter] content/newsletter/${file}: ${problem}`);
}

export function readIssueFile(file: string, raw: string): Issue {
  const slug = file.replace(/\.md$/, "");
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
    fail(file, "the filename is the URL slug: lowercase letters, numbers and single hyphens.");
  }
  const parsed = matter(raw, {});
  const { data, content } = parsed;

  if (typeof data.draft !== "boolean") fail(file, '"draft" is required and must be true or false.');
  if (!Number.isInteger(data.number) || data.number < 1) fail(file, '"number" must be a whole number from 1.');
  for (const field of ["title", "description"] as const) {
    if (typeof data[field] !== "string" || data[field].trim() === "") {
      fail(file, `"${field}" is required and must be a non-empty string.`);
    }
  }
  // YAML turns an unquoted date into a Date; read the typed text instead.
  const typed = parsed.matter.match(/^date:[ \t]*["']?([^"'\s#]+)/m)?.[1] ?? "";
  const text = data.date instanceof Date ? typed : typeof data.date === "string" ? data.date.trim() : "";
  const d = new Date(`${text}T00:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text) || Number.isNaN(d.getTime()) || d.toISOString().slice(0, 10) !== text) {
    fail(file, '"date" is required, written as YYYY-MM-DD.');
  }
  if (content.trim() === "") fail(file, "the issue has no body.");

  return {
    slug,
    number: data.number,
    title: data.title.trim(),
    description: data.description.trim(),
    date: text,
    draft: data.draft,
    // HTML comments carry checker data (<!-- published: ... -->). react-markdown
    // prints them as text, so they are removed before rendering.
    body: stripComments(content),
  };
}

/** Visible issues, newest first. Every file is validated, drafts included. */
export function getAllIssues(): Issue[] {
  if (!fs.existsSync(DIR)) return [];
  const issues = fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => readIssueFile(f, fs.readFileSync(path.join(DIR, f), "utf8")));
  const seen = new Map<number, string>();
  for (const i of issues) {
    if (seen.has(i.number)) fail(i.slug + ".md", `issue number ${i.number} is also used by ${seen.get(i.number)}.md.`);
    seen.set(i.number, i.slug);
  }
  return issues.filter((i) => SHOW_DRAFTS || !i.draft).sort((a, b) => b.number - a.number);
}

export function getIssue(slug: string): Issue | undefined {
  return getAllIssues().find((i) => i.slug === slug);
}
