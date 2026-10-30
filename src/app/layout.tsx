import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Brand fonts (2026-10-29 redesign): Inter Tight for everything, JetBrains
// Mono for data and small copy.
// Inter is gone: --font-sans is aliased to Inter Tight in globals.css.
const tight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-tight",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
});

const SITE_URL = "https://www.wexadvisory.com";

export const metadata: Metadata = {
  title: "AI Automation for Consumer Brands | Wex Advisory",
  description:
    "Wex Advisory helps small businesses save time with AI consulting and automation. No tech team needed. Get your free AI Audit today.",
  metadataBase: new URL(SITE_URL),
  // No sitewide canonical or robots here: a root-level canonical leaked the
  // homepage URL onto the 404 page, and a root-level robots index,follow
  // rendered alongside Next's automatic noindex on not-found. Each page sets
  // its own canonical; indexable is the default when robots is omitted.
  openGraph: {
    title: "AI Automation for Consumer Brands | Wex Advisory",
    description:
      "Dashboards, reporting and AI agents for owner-led consumer brands selling on Shopify, Amazon and wholesale. $200 an hour to build, with a written estimate first.",
    url: SITE_URL,
    siteName: "Wex Advisory",
    type: "website",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Wex Advisory | AI Automation for Consumer Brands",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Automation for Consumer Brands | Wex Advisory",
    description:
      "Dashboards, reporting and AI agents for owner-led consumer brands selling on Shopify, Amazon and wholesale. $200 an hour to build, with a written estimate first.",
    images: ["/api/og"],
  },
};

// Sitewide structured data: one ProfessionalService block (with founder
// Person and the service catalog nested). FAQPage is NOT emitted here: it
// belongs only on pages that visibly render those Q&As (home, /audit, and
// each landing page emit their own, one per page).
const jsonLdOrg = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#organization`,
  name: "Wex Advisory",
  url: SITE_URL,
  logo: `${SITE_URL}/wex-icon-wa.png`,
  email: "max@wexadvisory.com",
  description:
    "AI automation for owner-led consumer brands: dashboards, reporting and AI agents across Shopify, marketplaces, wholesale and the books, plus a free AI Audit and set-scope products.",
  priceRange: "$200+",
  areaServed: [
    { "@type": "Country", name: "United States" },
    { "@type": "City", name: "New York, NY" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "New York",
    addressRegion: "NY",
    addressCountry: "US",
  },
  sameAs: ["https://www.linkedin.com/in/max-wexley", "https://x.com/wexadvisory"],
  founder: {
    "@type": "Person",
    "@id": `${SITE_URL}/#max-wexley`,
    name: "Max Wexley",
    jobTitle: "Founder",
    url: SITE_URL,
    image: `${SITE_URL}/headshot.jpg`,
    description:
      "Max Wexley is the founder of Wex Advisory in New York City. He has a background in finance, studied at the University of Michigan (2024), and builds dashboards, reporting and AI agents for owner-led consumer brands.",
    alumniOf: { "@type": "CollegeOrUniversity", name: "University of Michigan" },
    sameAs: ["https://www.linkedin.com/in/max-wexley", "https://x.com/wexadvisory"],
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "max@wexadvisory.com",
    contactType: "customer service",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Wex Advisory services",
    itemListElement: [
      {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        itemOffered: {
          "@type": "Service",
          name: "Free AI Audit",
          alternateName: "AI Opportunity Audit",
          url: `${SITE_URL}/audit`,
          description:
            "A free AI readiness audit that analyzes your business and delivers a PDF report with maturity scores, automation opportunities, and a phased implementation roadmap.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Competitive Intelligence Report",
          description:
            "A 13-page AI-powered competitor analysis report with real traffic data, 5 competitor deep-dives, market sizing, and actionable recommendations, generated in ~60 seconds.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Workshops & Team Training",
          url: `${SITE_URL}/ai-training-for-small-businesses`,
          description:
            "Live workshops and demos teaching small business teams how to use AI tools day-to-day: walkthroughs of tools already built for the client, plus hands-on AI literacy sessions for non-technical staff, scoped to the client's actual stack rather than a generic slide deck.",
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${tight.variable} ${mono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
        {/* Origami visitor identification (trial from 2026-10-28). Public key
            only; the secret key never goes in the page. Allowed in the CSP
            in next.config.mjs. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "window.origami = window.origami || function () { (origami.q = origami.q || []).push(arguments) };",
          }}
        />
        <script
          async
          src="https://origami-web-visitors.com/v1/o.js"
          data-key="og_pk_yHxPlamQX_179KwbmzKapg"
        />
      </head>
      <body className="font-sans bg-canvas text-ink">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
