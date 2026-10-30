import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CtaBand from "@/components/brand/CtaBand";
import FaqList from "@/components/brand/FaqList";
import PageHero from "@/components/brand/PageHero";
import RevealScope from "@/components/brand/RevealScope";
import Section from "@/components/brand/Section";
import { FAQS } from "@/components/faq-data";

// The homepage FAQ moved here on 2026-10-30 to shorten the phone homepage
// (12.2 screens; Max OK'd the move). Same Q&As (faq-data.ts) and the same
// FAQPage JSON-LD, so search keeps the structured data.
const PAGE_URL = "https://www.wexadvisory.com/faq";

export const metadata: Metadata = {
  title: "FAQ | Wex Advisory",
  description:
    "What I automate, what it costs, how long it takes and what happens after launch: answers for owner-led businesses thinking about AI automation.",
  alternates: { canonical: PAGE_URL },
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

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <RevealScope>
          <PageHero
            eyebrow="FAQ"
            title="Common questions"
            subhead={
              <p>
                Still have questions?{" "}
                <a href="/#contact" className="font-semibold underline underline-offset-4">
                  Send me a message →
                </a>
              </p>
            }
          />
          <Section id="faq" width="narrow">
            <FaqList items={FAQS} />
          </Section>
          <CtaBand title="Want a straight answer for your business?" primary={{ href: "/audit", label: "Get your free AI Audit →" }} />
        </RevealScope>
      </main>
      <Footer />
    </>
  );
}
