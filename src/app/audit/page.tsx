import type { Metadata } from "next";
import AuditSurface from "./AuditSurface";
import AuditGuide from "./AuditGuide";
import { AUDIT_FAQS } from "./audit-content";

const PAGE_URL = "https://www.wexadvisory.com/audit";
const TITLE = "AI Opportunity Audit: Free AI Audit for Small Business | Wex Advisory";
const DESCRIPTION =
  "The AI Opportunity Audit is a free report for small businesses: 5 AI maturity scores, automation opportunities ranked by annual savings, and the labor math behind each. PDF in minutes.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PAGE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "AI Opportunity Audit | Free for Small Businesses | Wex Advisory",
    description:
      "See a real AI opportunity audit run on a real business, then run your own, free. PDF in minutes.",
    url: PAGE_URL,
    siteName: "Wex Advisory",
    type: "website",
  },
};

// One FAQPage for this page, built from the same Q&As AuditGuide renders.
const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: AUDIT_FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const jsonLdService = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI Opportunity Audit",
  serviceType: "AI readiness audit",
  url: PAGE_URL,
  description:
    "A free AI opportunity audit for small businesses. Researches the business from its website and public signals, scores five dimensions of AI maturity, and emails a PDF ranking automation opportunities by estimated annual savings, with recommended tools, payback estimates and a phased implementation plan.",
  provider: { "@id": "https://www.wexadvisory.com/#organization" },
  areaServed: [
    { "@type": "City", name: "New York" },
    { "@type": "Country", name: "United States" },
  ],
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function AuditPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      <AuditSurface>
        <AuditGuide />
      </AuditSurface>
    </>
  );
}
