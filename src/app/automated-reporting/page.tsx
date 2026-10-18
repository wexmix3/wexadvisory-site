import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ReportingHero from "@/components/reporting/ReportingHero";
import AnswerBlock from "@/components/reporting/AnswerBlock";
import Examples from "@/components/reporting/Examples";
import AiSummary from "@/components/reporting/AiSummary";
import Process from "@/components/reporting/Process";
import Tools from "@/components/reporting/Tools";
import ReportingPricing from "@/components/reporting/ReportingPricing";
import SendAReport from "@/components/reporting/SendAReport";
import ReportingFaq from "@/components/reporting/ReportingFaq";
import BookBand from "@/components/reporting/BookBand";
import { ANSWER_BLOCK, FAQS, META } from "@/components/reporting/content";

// Design: docs/superpowers/specs/2026-10-18-reporting-service-page-design.md.
// Target phrases (DataForSEO, US, 2026-10-18): "automated reporting",
// "report automation", "automate reports" at 320/mo each.
const PAGE_URL = "https://www.wexadvisory.com/automated-reporting";

export const metadata: Metadata = {
  title: META.title,
  description: META.description,
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    title: META.title,
    description: META.description,
    url: PAGE_URL,
    siteName: "Wex Advisory",
    type: "website",
    images: [{ url: "/api/og", width: 1200, height: 630, alt: META.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: META.title,
    description: META.description,
    images: ["/api/og"],
  },
};

const jsonLdService = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Automated Reporting",
  alternateName: "Report Automation for Small Businesses",
  serviceType: "Automated business reporting with AI-written summaries",
  url: PAGE_URL,
  description: ANSWER_BLOCK,
  // The sitewide ProfessionalService lives in layout.tsx.
  provider: { "@id": "https://www.wexadvisory.com/#organization" },
  areaServed: [
    { "@type": "City", name: "New York" },
    { "@type": "Country", name: "United States" },
  ],
  offers: {
    "@type": "Offer",
    priceSpecification: {
      "@type": "PriceSpecification",
      minPrice: 1000,
      maxPrice: 4000,
      priceCurrency: "USD",
    },
  },
};

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function AutomatedReportingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      <Nav />
      <main>
        <ReportingHero />
        <ScrollReveal variant="fade">
          <AnswerBlock />
        </ScrollReveal>
        <ScrollReveal variant="up">
          <Examples />
        </ScrollReveal>
        <ScrollReveal variant="up">
          <AiSummary />
        </ScrollReveal>
        <ScrollReveal variant="up">
          <Process />
        </ScrollReveal>
        <ScrollReveal variant="fade">
          <Tools />
        </ScrollReveal>
        <ScrollReveal variant="up">
          <ReportingPricing />
        </ScrollReveal>
        <ScrollReveal variant="up">
          <SendAReport />
        </ScrollReveal>
        <ScrollReveal variant="fade">
          <ReportingFaq />
        </ScrollReveal>
        <ScrollReveal variant="up">
          <BookBand />
        </ScrollReveal>
      </main>
      <Footer />
    </>
  );
}
