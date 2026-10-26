import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Hero from "@/components/homepage-v3/Hero";
import OutcomeStrip from "@/components/home/OutcomeStrip";
import BeforeAfter from "@/components/home/BeforeAfter";
import ProblemPicker from "@/components/home/ProblemPicker";
import CaseStudies from "@/components/homepage-v2/CaseStudies";
import ToolsShowcase from "@/components/homepage-v2/ToolsShowcase";
import Methodology from "@/components/homepage-v3/Methodology";
import Pricing from "@/components/home/Pricing";
import AuditHighlight from "@/components/homepage-v2/AuditHighlight";
import Founder from "@/components/home/Founder";
import FAQ from "@/components/FAQ";
import { FAQS } from "@/components/faq-data";
import CloseSection from "@/components/homepage-v3/CloseSection";

// 2026-10-16 rebuild on the approved competitor-review wireframe (aios
// state/seo/competitor-site-review-2026-10-16.html, section "ideal"). Order:
// hero names buyer, outcome and price -> outcome cards -> one real job before
// and after -> pick the problem (services) -> case rows -> tools -> how it works
// with outputs -> published pricing -> audit ask -> founder -> FAQ -> booking
// card with contact form. ClientsMarquee is no longer used here.
export const metadata: Metadata = {
  alternates: { canonical: "https://www.wexadvisory.com" },
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
        <ScrollReveal variant="up">
          <BeforeAfter />
        </ScrollReveal>
        <ScrollReveal variant="up-lg">
          <ProblemPicker />
        </ScrollReveal>
        <ScrollReveal variant="up">
          <CaseStudies />
        </ScrollReveal>
        <ScrollReveal variant="left">
          <ToolsShowcase />
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
