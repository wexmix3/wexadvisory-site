import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import Card from "@/components/brand/Card";
import Eyebrow from "@/components/brand/Eyebrow";
import Heading from "@/components/brand/Heading";
import PageHero from "@/components/brand/PageHero";
import RevealScope from "@/components/brand/RevealScope";
import Section from "@/components/brand/Section";
import StepList from "@/components/landing/StepList";
import TopicRail from "@/components/landing/TopicRail";
import { inlineLink, lede } from "@/components/landing/styles";

// Canon (repo wexadvisory-client-brain) is invite-only: no self-serve signup,
// so this page sells a demo. No price on the page until one is set; the FAQ
// once contradicted the pricing section and that is not happening twice.
// 2026-10-29 brand redesign (Phase 2): restyled onto src/components/brand.
// Copy, metadata and the demo form (source "canon") unchanged.

const PAGE_URL = "https://www.wexadvisory.com/canon";
const CALENDLY = "https://calendly.com/maxwexley-wexadvisory/30min";
const TITLE = "Canon: answers from your company's own documents | Wex Advisory";
const DESCRIPTION =
  "Canon answers your team's questions from your own documents, with citations. Pin the document that's the source of truth, correct an answer once and it remembers. Hosted and private to your company.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "Wex Advisory",
    type: "website",
    images: [{ url: "/api/og", width: 1200, height: 630, alt: TITLE }],
  },
};

const FEATURES = [
  { h: "Answers with citations", p: "Every answer comes from your documents and shows where it came from, so anyone can check it." },
  { h: "Pin the source of truth", p: "When two documents disagree, pin the one that's right. Canon answers from it first." },
  { h: "Correct it once", p: "Fix a wrong answer and Canon uses your correction the next time someone asks something similar." },
  { h: "Private to your company", p: "Each company's documents and questions are walled off from every other's. Hosted for you, nothing to install." },
];

const STEPS = [
  { n: "1", h: "Upload your documents", p: "Handbooks, SOPs, contracts, product specs. PDF, Word, text or Markdown." },
  { n: "2", h: "Your team asks in plain language", p: "\"What's our refund policy for wholesale?\" gets an answer with the page it came from." },
  { n: "3", h: "It gets better with use", p: "Pins and corrections keep answers right as your documents change." },
];

export default function CanonPage() {
  return (
    <>
      <Nav />
      <main>
        <RevealScope>
          <PageHero
            align="center"
            eyebrow="Canon · by Wex Advisory"
            title={
              <>
                Your company&apos;s answers,{" "}
                <br className="hidden sm:inline" />
                from your own documents.
              </>
            }
            subhead="Stop answering the same questions twice. Canon answers your team from the documents you already have, and shows exactly where each answer came from."
            primary={{ href: "#start", label: "Request a demo" }}
            secondary={{ href: CALENDLY, label: "Book a 30-minute call", external: true }}
          />

          <Section divider>
            <Heading reveal>What makes it different</Heading>
            <TopicRail label="What makes Canon different" cols={4} items={FEATURES.map((f) => ({ title: f.h, body: f.p }))} />
          </Section>

          <Section tone="band">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
              <Heading reveal>How it works</Heading>
              <StepList steps={STEPS.map((s) => ({ title: s.h, body: s.p }))} />
            </div>
          </Section>

          <Section id="start" divider>
            <div className="grid items-start gap-10 md:grid-cols-2 md:gap-14">
              <div>
                <Eyebrow>See it on your documents</Eyebrow>
                <Heading size="h2-sm" reveal>
                  Request a Canon demo
                </Heading>
                <p className={`mt-5 ${lede}`}>
                  Tell me what your team asks about most. I&apos;ll reply within 24 hours to set up a demo on documents
                  like yours.
                </p>
                <p className="mt-4 text-[15.5px] leading-relaxed text-muted">
                  Don&apos;t send any documents yet. If you&apos;d rather talk now,{" "}
                  <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className={inlineLink}>
                    book a free call
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                  .
                </p>
              </div>
              <Card padding="lg">
                <ContactForm
                  source="canon"
                  messageLabel="What does your team ask about most?"
                  messagePlaceholder="Our refund rules, onboarding steps, what's in which contract."
                  submitLabel="Request a demo →"
                />
              </Card>
            </div>
          </Section>
        </RevealScope>
      </main>
      <Footer />
    </>
  );
}
