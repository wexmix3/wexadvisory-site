import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Eyebrow from "@/components/brand/Eyebrow";
import Heading from "@/components/brand/Heading";
import PageHero from "@/components/brand/PageHero";
import RevealScope from "@/components/brand/RevealScope";
import Section from "@/components/brand/Section";
import LandingClose from "@/components/landing/LandingClose";
import LandingFaq from "@/components/landing/LandingFaq";
import StepList from "@/components/landing/StepList";
import TopicRail from "@/components/landing/TopicRail";
import { inlineLink, lede } from "@/components/landing/styles";

// 2026-10-29 brand redesign (Phase 2): restyled onto src/components/brand.
// Copy, metadata and JSON-LD unchanged.

const PAGE_URL = "https://www.wexadvisory.com/ai-solutions-for-small-businesses";

export const metadata: Metadata = {
  title: "AI Solutions for Small Businesses | Wex Advisory",
  description:
    "Not sure which AI solution fits your business? I audit your operations, rank the options by ROI, and build the one that matters. Not a list of 50 tools.",
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    title: "AI Solutions for Small Businesses | Wex Advisory",
    description:
      "Not sure which AI solution fits your business? I audit your operations, rank the options by ROI, and build the one that matters. Not a list of 50 tools.",
    url: PAGE_URL,
    siteName: "Wex Advisory",
    type: "website",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "AI Solutions for Small Businesses | Wex Advisory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Solutions for Small Businesses | Wex Advisory",
    description:
      "Not sure which AI solution fits your business? I audit your operations, rank the options by ROI, and build the one that matters. Not a list of 50 tools.",
    images: ["/api/og"],
  }
};

const CATEGORIES: { title: string; desc: string }[] = [
  {
    title: "Customer-Facing",
    desc: "Follow-up sequences, lead intake, appointment scheduling: the conversations that currently require someone to remember to send an email.",
  },
  {
    title: "Back-Office",
    desc: "Weekly reporting, invoice reminders, CRM updates: the recurring work that's rule-based enough to run without you.",
  },
  {
    title: "Content & Marketing",
    desc: "Draft queues for social and email that still get a human review before anything goes out.",
  },
  {
    title: "Competitive Intelligence",
    desc: "Real traffic and positioning data on the businesses you're actually competing against, not guesswork.",
  },
];

const FAQS = [
  {
    q: "How do I know which AI solution my business actually needs?",
    a: "You usually don't, going in, and that's fine. I start with an audit of how your team actually spends its time, then rank the candidate solutions by expected hours saved, not by what's trending.",
  },
  {
    q: "Do you sell specific AI software, or is this vendor-neutral?",
    a: "Vendor-neutral. I recommend and build whatever fits your workflow and budget: the goal is the outcome (hours back, costs down), not pushing a specific product.",
  },
  {
    q: "What if I've already tried an AI tool and it didn't stick?",
    a: "Common story: usually the tool was fine but it didn't fit how the team actually works, or nobody owned the rollout. I build for adoption first: plain-language docs and a live walkthrough before handoff.",
  },
];

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function AISolutionsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      <Nav />
      <main>
        <RevealScope>
          <PageHero
            eyebrow="AI Solutions"
            title="AI solutions for small businesses, not a list of 50 tools"
            subhead={
              <p>
                Most &ldquo;AI solutions&rdquo; guides hand you a spreadsheet of software. You don&apos;t need 50
                tools: you need the 2 or 3 that actually fix the thing costing you the most hours.
              </p>
            }
            primary={{ href: "/audit", label: "Find My Best-Fit Solutions →" }}
          />

          {/* Categories */}
          <Section divider>
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
              <div>
                <Eyebrow>What I Evaluate</Eyebrow>
                <Heading reveal>Four categories, one filter</Heading>
              </div>
              <p className={`max-w-md ${lede}`}>
                Every candidate solution gets weighed against one question: how many hours does this actually save,
                this quarter, for your team specifically.
              </p>
            </div>
            <TopicRail
              label="Four categories of AI solutions"
              cols={4}
              items={CATEGORIES.map((c) => ({ title: c.title, body: c.desc }))}
            />
          </Section>

          {/* Process */}
          <Section tone="band">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
              <div>
                <Eyebrow>How I Pick</Eyebrow>
                <Heading reveal>Audit first, tools second</Heading>
              </div>
              <StepList
                steps={[
                  {
                    title: "Audit your actual workflows",
                    body: "Free AI Audit maps where time and money are leaking, with a maturity score across your operations.",
                  },
                  {
                    title: "Rank by ROI, not novelty",
                    body: "Every candidate solution gets a savings estimate before you commit to anything.",
                  },
                  {
                    title: "Build or recommend: your call",
                    body: "Take the report and run with it yourself, or have me build the top-ranked solution directly.",
                  },
                ]}
              />
            </div>
          </Section>

          <LandingFaq
            title="Common questions"
            items={FAQS}
            note={
              <>
                Not sure which solution fits yet? Start with a{" "}
                <a href="/audit" className={inlineLink}>
                  free AI audit
                </a>
                , or see how I work as an{" "}
                <a href="/ai-consulting-for-small-businesses" className={inlineLink}>
                  AI consultant for small business
                </a>
                .
              </>
            }
          />

          <LandingClose
            heading="Ready to see your best-fit solutions?"
            subheading="Free AI Audit. Ranked by expected savings, no credit card, no signup."
          />
        </RevealScope>
      </main>
      <Footer />
    </>
  );
}
