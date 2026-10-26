import { MetadataRoute } from "next";
import { SITE_PAGES, SITE_URL } from "@/lib/site-pages";
import { getAllPosts } from "@/lib/blog";

// Hand-written pages and their last-modified dates live in lib/site-pages.ts
// (shared with /llms.txt). The rule there still holds: lastmod is the real
// content-change date, never a build timestamp. Blog entries follow it too:
// a post's lastmod is the `updated` date in its frontmatter.
const lastmod = (date: string) => new Date(`${date}T12:00:00Z`);

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = SITE_PAGES.map(
    ({ path, lastModified, changeFrequency, priority }) => ({
      url: `${SITE_URL}${path}`,
      lastModified: lastmod(lastModified),
      changeFrequency,
      priority,
    })
  );

  // /blog is listed only once a post is visible, so the sitemap never points
  // at a 404.
  const posts = getAllPosts();
  if (posts.length === 0) return pages;

  const newest = posts.map((p) => p.updated).sort().at(-1)!;
  return [
    ...pages,
    { url: `${SITE_URL}/blog`, lastModified: lastmod(newest), changeFrequency: "weekly", priority: 0.6 },
    ...posts.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: lastmod(p.updated),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
