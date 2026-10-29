import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Hero from "@/components/homepage-v3/Hero";
import OutcomeStrip from "@/components/home/OutcomeStrip";
import ProblemPicker from "@/components/home/ProblemPicker";
import CaseStudies from "@/components/homepage-v2/CaseStudies";
import Methodology from "@/components/homepage-v3/Methodology";
import Pricing from "@/components/home/Pricing";
import AuditHighlight from "@/components/homepage-v2/AuditHighlight";
import Founder from "@/components/home/Founder";
import FAQ from "@/components/FAQ";
import { FAQS } from "@/components/faq-data";
import CloseSection from "@/components/homepage-v3/CloseSection";

// 2026-10-16 rebuild on the approved competitor-review wireframe (aios
// state/seo/competitor-site-review-2026-10-16.html, section "ideal").
// Current order: hero names buyer, outcome and price -> outcome cards -> pick
// the problem (services) -> case rows -> how it works with outputs -> published
// pricing -> audit ask -> founder -> FAQ -> booking card with contact form.
// 2026-10-29 (Tenex teardown, Max's pick): the homepage speaks to one buyer,
// owner-led consumer brands, with RECO as the lead proof. The 25N before/after,
// the tools shelf and the products shelf came off the homepage to cut its
// length; products now live at /products, the founder story at /about.
export const metadata: Metadata = {
  title: "AI Automation for Consumer Brands | Wex Advisory",
  description:
    "Dashboards, reporting and AI agents for owner-led brands selling on Shopify, Amazon and wholesale. $200 an hour, written estimate first, free AI Audit.",
  alternates: { canonical: "https://www.wexadvisory.com" },
  openGraph: {
    title: "AI Automation for Consumer Brands | Wex Advisory",
    description:
      "Dashboards, reporting and AI agents for owner-led consumer brands selling on Shopify, Amazon and wholesale. $200 an hour to build, with a written estimate first.",
    url: "https://www.wexadvisory.com",
    siteName: "Wex Advisory",
    type: "website",
    images: [{ url: "/api/og", width: 1200, height: 630, alt: "Wex Advisory | AI Automation for Consumer Brands" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Automation for Consumer Brands | Wex Advisory",
    description:
      "Dashboards, reporting and AI agents for owner-led consumer brands selling on Shopify, Amazon and wholesale. $200 an hour to build, with a written estimate first.",
    images: ["/api/og"],
  },
};

// One FAQPage per page, built from the Q&As the FAQ section actually renders.
const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      <Nav />
      <main>
        {/* Hero renders above the fold with no reveal wrapper so it's visible immediately.
            Reveal variants below are varied per section (see ScrollReveal.tsx). */}
        <Hero />
        <ScrollReveal variant="fade">
          <OutcomeStrip />
        </ScrollReveal>
        <ScrollReveal variant="up-lg">
          <ProblemPicker />
        </ScrollReveal>
        <ScrollReveal variant="up">
          <CaseStudies />
        </ScrollReveal>
        <ScrollReveal variant="up-lg">
          <Methodology />
        </ScrollReveal>
        <ScrollReveal variant="fade">
          <Pricing />
        </ScrollReveal>
        <ScrollReveal variant="right">
          <AuditHighlight />
        </ScrollReveal>
        <ScrollReveal variant="up">
          <Founder />
        </ScrollReveal>
        <ScrollReveal variant="fade">
          <FAQ />
        </ScrollReveal>
        <ScrollReveal variant="up-lg">
          <CloseSection />
        </ScrollReveal>
      </main>
      <Footer />
    </>
  );
}
