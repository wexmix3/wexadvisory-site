import { MetadataRoute } from "next";

// Per-page last-modified dates.
//
// These were `new Date()` until 2026-09-28, which stamped every URL with the
// build time -- so /privacy and /terms claimed to change every time anything
// deployed. Google documents that it ignores `lastmod` when it is demonstrably
// unreliable, so the churn was actively burning the signal rather than helping.
//
// Dates below are the real last content change per page, taken from git
// (`git log -1 --format=%cs -- src/app/<page>`).
//
// MAINTENANCE: bump the entry for a page when you meaningfully change that
// page's content. Do not bump them all, and do not wire this back to a build
// timestamp -- a date that always says "today" is the same as no date at all.
const LAST_MODIFIED: Record<string, string> = {
  "": "2026-09-18",
  "/audit": "2026-09-23",
  "/ai-consulting-for-small-businesses": "2026-09-23",
  "/ai-solutions-for-small-businesses": "2026-09-21",
  "/ai-integration-for-small-businesses": "2026-09-21",
  "/ai-training-for-small-businesses": "2026-09-21",
  "/ai-ops-dashboard-for-ecommerce-brands": "2026-09-21",
  "/ai-for-coworking-spaces": "2026-09-21",
  "/ai-for-property-management": "2026-09-21",
  "/work": "2026-09-18",
  "/privacy": "2026-09-04",
  "/terms": "2026-09-04",
};

const BASE = "https://www.wexadvisory.com";

type Entry = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

const PAGES: Entry[] = [
  { path: "", changeFrequency: "monthly", priority: 1 },
  { path: "/audit", changeFrequency: "weekly", priority: 0.9 },
  { path: "/ai-consulting-for-small-businesses", changeFrequency: "monthly", priority: 0.8 },
  { path: "/ai-solutions-for-small-businesses", changeFrequency: "monthly", priority: 0.7 },
  { path: "/ai-integration-for-small-businesses", changeFrequency: "monthly", priority: 0.7 },
  { path: "/ai-training-for-small-businesses", changeFrequency: "monthly", priority: 0.7 },
  { path: "/ai-ops-dashboard-for-ecommerce-brands", changeFrequency: "monthly", priority: 0.7 },
  { path: "/ai-for-coworking-spaces", changeFrequency: "monthly", priority: 0.7 },
  { path: "/ai-for-property-management", changeFrequency: "monthly", priority: 0.7 },
  { path: "/work", changeFrequency: "monthly", priority: 0.6 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map(({ path, changeFrequency, priority }) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(`${LAST_MODIFIED[path]}T12:00:00Z`),
    changeFrequency,
    priority,
  }));
}
