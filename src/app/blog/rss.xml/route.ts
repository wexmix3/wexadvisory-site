import { SITE_URL } from "@/lib/site-pages";
import { getAllPosts } from "@/lib/blog";

// RSS 2.0 feed of visible posts, built at build time.
export const dynamic = "force-static";

const FEED_URL = `${SITE_URL}/blog/rss.xml`;

const escapeXml = (text: string) =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const rfc822 = (date: string) => new Date(`${date}T12:00:00Z`).toUTCString();

export function GET() {
  const posts = getAllPosts();
  // No feed while there are no posts, same as the /blog index.
  if (posts.length === 0) return new Response("Not found", { status: 404 });

  const newest = posts.map((p) => p.updated).sort().at(-1)!;
  const items = posts
    .map((p) => {
      const url = `${SITE_URL}/blog/${p.slug}`;
      return `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${rfc822(p.date)}</pubDate>
      <description>${escapeXml(p.description)}</description>
      <author>max@wexadvisory.com (Max Wexley)</author>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Wex Advisory Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Practical notes on AI automation for small businesses, by Max Wexley.</description>
    <language>en-us</language>
    <lastBuildDate>${rfc822(newest)}</lastBuildDate>
    <atom:link href="${FEED_URL}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
