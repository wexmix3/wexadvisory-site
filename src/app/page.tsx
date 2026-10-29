import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RevealScope from "@/components/brand/RevealScope";
import HomeHero from "@/components/home/HomeHero";
import ProblemPicker from "@/components/home/ProblemPicker";
import Cases from "@/components/home/Cases";
import Methodology from "@/components/home/Methodology";
import Pricing from "@/components/home/Pricing";
import FAQ from "@/components/FAQ";
import { FAQS } from "@/components/faq-data";
import Close from "@/components/home/Close";

// 2026-10-29 brand redesign (Phase 1): the approved hybrid direction, built
// from the brand primitives in src/components/brand. Order: hero with the
// self-sorting sheet -> services (the one gold band) -> results sheet, RECO
// case with the agent thread and measured strip, 25N compact (past tense) ->
// how it works -> pricing beside the audit card -> FAQ -> booking with the
// founder block and the contact form. Section ids kept: #services, #work, #case-reco,
// #case-25n, #about, #contact (plus #pricing, #ai-audit, #faq, #how-it-works).
// Results sit at the top of #work; the founder block sits inside #contact.
// Earlier history: 2026-10-16 wireframe rebuild; 2026-10-29 Tenex teardown cut
// the homepage to one buyer (owner-led consumer brands), RECO as lead proof.
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
        <RevealScope>
          <HomeHero />
          <ProblemPicker />
          <Cases />
          <Methodology />
          <Pricing />
          <FAQ />
          <Close />
        </RevealScope>
      </main>
      <Footer />
    </>
  );
}
