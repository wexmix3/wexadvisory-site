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
    "Wex Advisory helps small businesses save time with AI consulting and automation. No tech team needed. Get your free AI Snapshot today.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "AI Consulting for Small Business | Wex Advisory",
    description:
      "Custom AI automation and systems work, scoped to what your team actually needs — plus flat-fee competitive analysis reports starting at $299.",
    url: SITE_URL,
    siteName: "Wex Advisory",
    type: "website",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Wex Advisory — AI Consulting for Small Business",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Consulting for Small Business | Wex Advisory",
    description:
      "Custom AI automation and systems work, scoped to what your team actually needs — plus flat-fee competitive analysis reports starting at $299.",
    images: ["/api/og"],
  },
};

const jsonLdOrg = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Wex Advisory",
  url: SITE_URL,
  description:
    "AI consulting and automation for small businesses. Competitor analysis, AI readiness audits, and custom-scoped automation systems.",
  priceRange: "$200+",
  areaServed: "US",
  founder: {
    "@type": "Person",
    name: "Max Wexley",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "maxwexley@wexadvisory.com",
    contactType: "customer service",
  },
};

const jsonLdServices = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Free AI Snapshot",
    description:
      "A free AI readiness audit that analyzes your business and delivers a PDF report with maturity scores, automation opportunities, and a phased implementation roadmap.",
    provider: { "@type": "Organization", name: "Wex Advisory" },
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Competitive Intelligence Report",
    description:
      "A 13-page AI-powered competitor analysis report with real traffic data, 5 competitor deep-dives, market sizing, and actionable recommendations — generated in ~60 seconds.",
    provider: { "@type": "Organization", name: "Wex Advisory" },
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Workshops & Team Training",
    description:
      "Live workshops and demos teaching small business teams how to use AI tools day-to-day — walkthroughs of tools already built for the client, plus hands-on AI literacy sessions for non-technical staff, scoped to the client's actual stack rather than a generic slide deck.",
    provider: { "@type": "Organization", name: "Wex Advisory" },
  },
];

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does an AI consultant do for small businesses?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An AI consultant analyzes your business operations to identify where artificial intelligence can save time and money — recommending specific tools, workflows, and automations tailored to your team size and industry. Wex Advisory focuses exclusively on high-ROI opportunities backed by labor math, not generic recommendations.",
      },
    },
    {
      "@type": "Question",
      name: "How much does AI consulting cost for small businesses?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wex Advisory offers a free AI Snapshot audit, competitive analysis reports starting at $299 flat-fee, and custom AI automation engagements scoped and priced individually based on what your team actually needs.",
      },
    },
    {
      "@type": "Question",
      name: "Is AI consulting worth it for a small business?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For most small businesses, even one automated workflow can save 5–15 hours per week. Wex Advisory's audit identifies your highest-ROI opportunities with specific savings estimates — so you know the return before committing.",
      },
    },
    {
      "@type": "Question",
      name: "What is included in a free AI audit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The free AI Snapshot analyzes your business website and online presence, then delivers a PDF report with 5 AI maturity scores, automation opportunities ranked by annual savings, labor cost math, and a phased implementation roadmap with specific tool recommendations.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable}`}>
      <head>
        <meta name="robots" content="index, follow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
        {jsonLdServices.map((s, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
          />
        ))}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
        />
      </head>
      <body className="font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
