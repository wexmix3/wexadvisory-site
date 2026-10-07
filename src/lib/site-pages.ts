import type { MetadataRoute } from "next";

// The one list of hand-written pages. sitemap.ts and the /llms.txt route both
// read it, so a page added here shows up in both and the two cannot drift.
// Blog posts are not listed here: they come from content/blog via lib/blog.ts.

export const SITE_URL = "https://www.wexadvisory.com";

export type LlmsSection =
  | "Free AI Opportunity Audit"
  | "Services"
  | "Industries"
  | "Work"
  | "Contact"
  | "Optional";

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
export type SitePage = {
  path: string;
  lastModified: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
  // llms.txt line: which section it sits in, the link text, and a short
  // description (omitted for the legal pages).
  llms: { section: LlmsSection; title: string; description?: string };
};

// Order here is the sitemap order.
export const SITE_PAGES: SitePage[] = [
  {
    path: "",
    lastModified: "2026-09-18",
    changeFrequency: "monthly",
    priority: 1,
    llms: {
      section: "Contact",
      title: "Home",
      description: "Overview of services, methodology and case studies.",
    },
  },
  {
    path: "/audit",
    lastModified: "2026-09-23",
    changeFrequency: "weekly",
    priority: 0.9,
    llms: {
      section: "Free AI Opportunity Audit",
      title: "AI Opportunity Audit",
      description:
        "Free report for small businesses. Submit a website URL and a few details; get a PDF with 5 AI maturity scores, automation opportunities ranked by annual savings with the labor math behind each, recommended tools, payback estimates and a phased implementation plan.",
    },
  },
  {
    path: "/ai-consulting-for-small-businesses",
    lastModified: "2026-09-23",
    changeFrequency: "monthly",
    priority: 0.8,
    llms: {
      section: "Services",
      title: "AI Consulting for Small Businesses",
      description:
        "Hands-on AI consulting sized for businesses without an IT department. Free audit first, then a scoped engagement.",
    },
  },
  {
    path: "/ai-solutions-for-small-businesses",
    lastModified: "2026-09-21",
    changeFrequency: "monthly",
    priority: 0.7,
    llms: {
      section: "Services",
      title: "AI Solutions for Small Businesses",
      description: "Operations audit that ranks AI options by ROI, then builds the one that matters.",
    },
  },
  {
    path: "/ai-integration-for-small-businesses",
    lastModified: "2026-09-21",
    changeFrequency: "monthly",
    priority: 0.7,
    llms: {
      section: "Services",
      title: "AI Integration for Small Businesses",
      description:
        "AI that plugs into existing tools (CRM, spreadsheets, scheduling, invoicing) without replacing them.",
    },
  },
  {
    path: "/ai-training-for-small-businesses",
    lastModified: "2026-09-21",
    changeFrequency: "monthly",
    priority: 0.7,
    llms: {
      section: "Services",
      title: "AI Training for Small Businesses",
      description: "Live workshops and team training on the tools a team actually uses.",
    },
  },
  {
    path: "/ai-ops-dashboard-for-ecommerce-brands",
    lastModified: "2026-09-21",
    changeFrequency: "monthly",
    priority: 0.7,
    llms: {
      section: "Industries",
      title: "AI Ops Dashboard for E-Commerce Brands",
      description: "Ops dashboard and automated agents for a wholesale and Shopify DTC brand.",
    },
  },
  {
    path: "/ai-for-coworking-spaces",
    lastModified: "2026-09-21",
    changeFrequency: "monthly",
    priority: 0.7,
    llms: {
      section: "Industries",
      title: "AI for Coworking Spaces",
      description:
        "Live GL financial dashboard, automated month-end financial packets and occupancy tracking for multi-location coworking operators.",
    },
  },
  {
    path: "/ai-for-property-management",
    lastModified: "2026-09-21",
    changeFrequency: "monthly",
    priority: 0.7,
    llms: {
      section: "Industries",
      title: "AI for Property Management",
      description:
        "Live P&L dashboard across every property, month-end packets that build themselves, and occupancy next to the numbers.",
    },
  },
  {
    path: "/ai-automation-for-law-firms",
    lastModified: "2026-10-07",
    changeFrequency: "monthly",
    priority: 0.7,
    llms: {
      section: "Industries",
      title: "AI for Law Firms",
      description:
        "Search your own documents with cited answers, never lose an intake email, and see billing numbers without building the report by hand.",
    },
  },
  {
    path: "/work",
    lastModified: "2026-09-18",
    changeFrequency: "monthly",
    priority: 0.6,
    llms: {
      section: "Work",
      title: "Client Work",
      description:
        "Case studies from real engagements, including a wholesale and DTC e-commerce ops dashboard and a multi-location coworking competitive analysis.",
    },
  },
  {
    path: "/privacy",
    lastModified: "2026-09-04",
    changeFrequency: "yearly",
    priority: 0.3,
    llms: { section: "Optional", title: "Privacy Policy" },
  },
  {
    path: "/terms",
    lastModified: "2026-09-04",
    changeFrequency: "yearly",
    priority: 0.3,
    llms: { section: "Optional", title: "Terms of Service" },
  },
];
