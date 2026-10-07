import { SITE_PAGES, SITE_URL, type LlmsSection } from "@/lib/site-pages";
import { getAllPosts } from "@/lib/blog";

// /llms.txt, generated at build time from the same page list the sitemap uses
// (lib/site-pages.ts) plus the visible blog posts. It replaced a hand-kept
// public/llms.txt that had fallen two pages behind.
export const dynamic = "force-static";

const INTRO = `# Wex Advisory

> Wex Advisory is a boutique AI consulting practice for small and mid-sized businesses, run by Max Wexley in New York City. It finds where AI can save a business time and money, then builds the fix: workflow automation, operations dashboards, financial reporting pipelines and team training, scoped to the tools a business already uses. The starting point is a free AI Opportunity Audit that scores a business on AI maturity and ranks automation opportunities by estimated annual savings.

Contact: max@wexadvisory.com`;

// "Optional" stays last: the llms.txt convention treats it as skippable.
const BEFORE_BLOG: LlmsSection[] = ["Free AI Opportunity Audit", "Services", "Industries", "Work"];
const AFTER_BLOG: LlmsSection[] = ["Contact", "Optional"];

// The contact form is an anchor on the homepage, so it is not a sitemap page.
const CONTACT_FORM_LINE = `- [Contact form](${SITE_URL}/#contact): Send a message, or email max@wexadvisory.com directly.`;

const line = (title: string, url: string, description?: string) =>
  `- [${title}](${url})${description ? `: ${description}` : ""}`;

function section(name: LlmsSection): string {
  const lines = SITE_PAGES.filter((p) => p.llms.section === name).map((p) =>
    line(p.llms.title, `${SITE_URL}${p.path || "/"}`, p.llms.description)
  );
  if (name === "Contact") lines.unshift(CONTACT_FORM_LINE);
  return `## ${name}\n\n${lines.join("\n")}`;
}

export function GET() {
  const posts = getAllPosts();
  const blocks = [INTRO, ...BEFORE_BLOG.map(section)];

  if (posts.length > 0) {
    blocks.push(
      `## Blog\n\n${posts.map((p) => line(p.title, `${SITE_URL}/blog/${p.slug}`, p.description)).join("\n")}`
    );
  }

  blocks.push(...AFTER_BLOG.map(section));

  return new Response(`${blocks.join("\n\n")}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
