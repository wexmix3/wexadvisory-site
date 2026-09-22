import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Inter, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

const SITE_URL = "https://www.wexadvisory.com";

export const metadata: Metadata = {
  title: "AI Consulting for Small Business | Wex Advisory",
  description:
    "Wex Advisory helps small businesses save time with AI consulting and automation. No tech team needed. Get your free AI Audit today.",
  metadataBase: new URL(SITE_URL),
  // No sitewide canonical or robots here: a root-level canonical leaked the
  // homepage URL onto the 404 page, and a root-level robots index,follow
  // rendered alongside Next's automatic noindex on not-found. Each page sets
  // its own canonical; indexable is the default when robots is omitted.
  openGraph: {
    title: "AI Consulting for Small Business | Wex Advisory",
    description:
      "AI is complex. Working with us isn't. Custom AI automation and systems work, scoped to what your team actually needs, plus a free AI Audit.",
    url: SITE_URL,
    siteName: "Wex Advisory",
    type: "website",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Wex Advisory | AI Consulting for Small Business",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Consulting for Small Business | Wex Advisory",
    description:
      "AI is complex. Working with us isn't. Custom AI automation and systems work, scoped to what your team actually needs, plus a free AI Audit.",
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
    "AI consulting and automation for small businesses. Competitor analysis, AI readiness audits, and custom-scoped automation systems.",
  priceRange: "$200+",
  areaServed: [
    { "@type": "City", name: "New York" },
    { "@type": "Country", name: "United States" },
  ],
  founder: {
    "@type": "Person",
    "@id": `${SITE_URL}/#max-wexley`,
    name: "Max Wexley",
    jobTitle: "Founder",
    url: SITE_URL,
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
    <html lang="en" className={`${inter.variable} ${dmSerif.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
      </head>
      <body className="font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
