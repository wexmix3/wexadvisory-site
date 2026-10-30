import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AboutFounder from "@/components/AboutFounder";
import Card from "@/components/brand/Card";
import Eyebrow from "@/components/brand/Eyebrow";
import Heading from "@/components/brand/Heading";
import PageHero from "@/components/brand/PageHero";
import RevealScope from "@/components/brand/RevealScope";
import Rail from "@/components/brand/Rail";
import Section from "@/components/brand/Section";
import LandingClose from "@/components/landing/LandingClose";
import LandingFaq from "@/components/landing/LandingFaq";
import OfferCards from "@/components/landing/OfferCards";
import PointList from "@/components/landing/PointList";
import TopicRail from "@/components/landing/TopicRail";
import { inlineLink, lede } from "@/components/landing/styles";

// 2026-10-29 brand redesign (Phase 2): restyled onto src/components/brand.
// Copy, metadata and JSON-LD unchanged. 25N stays in past tense (the
// engagement ended 2026-10-19).

const PAGE_URL = "https://www.wexadvisory.com/ai-automation-for-law-firms";

const DESCRIPTION =
  "AI for law firms: search your own documents with cited answers, never lose an intake email, and see billing numbers without building the report by hand.";

export const metadata: Metadata = {
  title: "AI for Law Firms | Wex Advisory",
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    title: "AI for Law Firms | Wex Advisory",
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "Wex Advisory",
    type: "website",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "AI for Law Firms | Wex Advisory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI for Law Firms | Wex Advisory",
    description: DESCRIPTION,
    images: ["/api/og"],
  }
};

const SIGNS = [
  "Finding the clause you drafted last year means digging through folders and old matters",
  "A prospective client's intake email sits unanswered for days because nobody owns the inbox",
  "Month-end billing and collections numbers get pieced together in a spreadsheet by hand",
];

const BUILT = [
  {
    title: "Search your own documents, with citations",
    body: "Ask a question in plain English and get an answer drawn only from your firm's documents: templates, engagement letters, policies, past work product. Every answer cites the file it came from, so a lawyer can check the source in one click.",
  },
  {
    title: "Intake and inbox follow-up",
    body: "Threads left unanswered for three days get flagged. A reply is drafted and waits in a queue, and nothing is sent until a person approves it. Approving it sends a normal threaded email from your own account.",
  },
  {
    title: "A daily priority list",
    body: "One list of what needs attention today, delivered by email each morning, built from your inbox and calendar. Every item links back to the real email or event it came from.",
  },
  {
    title: "Billing and financial reporting",
    body: "A live dashboard fed from the exports your accounting or practice management system already produces, with month-over-month variance flags and a plain-English summary of what changed.",
  },
];

const PROOF = [
  {
    client: "RECO",
    text: "Priority action queue with approve-to-send Gmail replies, agents that flag threads unanswered for 3+ days, and a daily priority digest. Every finding must cite a real email thread or event, and a second model checks it before it reaches the queue.",
  },
  {
    client: "25N Coworking",
    text: "Financial dashboard across 5 locations, fed daily from the accounting system's own GL exports, with a rules-based check that flagged problem entries before the close and a month-end packet per location.",
  },
  {
    client: "Canon",
    text: "My private document search product. Each client's documents sit in their own isolated workspace, and answers are grounded in those documents with citations.",
  },
];

const FAQS = [
  {
    q: "What can AI actually do for a small law firm?",
    a: "The biggest wins are usually not legal research. They're the hours lost to finding documents the firm already has, following up on intake, and building billing reports. AI can answer questions from your own files with citations, make sure no prospective client waits days for a reply, and turn accounting exports into a dashboard you read in a minute.",
  },
  {
    q: "Have you built this for a law firm?",
    a: "Not yet. Every system on this page was built for clients in other industries: the inbox queue and daily digest for RECO, the financial dashboard for 25N Coworking, and document search in Canon, my own product. A law firm build uses the same pieces, pointed at your documents and your inbox.",
  },
  {
    q: "What about client confidentiality?",
    a: "Your documents sit in a workspace of their own, and access is limited to named logins. Nothing is sent to a client or opposing counsel without a person approving it. The ABA's Formal Opinion 512 (2024) asks lawyers who use generative AI to understand the tool, protect client confidences and review its output. The builds are designed around that: answers cite their source, and a person approves anything that leaves the firm.",
  },
  {
    q: "Will AI give legal advice or replace our associates?",
    a: "No. These systems find, draft and organize. A lawyer reviews and decides. The point is to give your team back the hours spent searching folders and chasing emails.",
  },
  {
    q: "Where should a law firm start with AI?",
    a: "Start with the free AI audit. It scores your firm on five areas and ranks automation ideas by estimated annual savings, so you know where the biggest opportunity is before you spend anything.",
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

const jsonLdService = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI for Law Firms",
  serviceType: "AI automation for small and mid-size law firms",
  url: PAGE_URL,
  description:
    "Private document search with citations, intake and inbox follow-up with human approval, a daily priority digest, and billing dashboards for law firms.",
  audience: { "@type": "BusinessAudience", audienceType: "Law firms and legal practices" },
  provider: { "@id": "https://www.wexadvisory.com/#organization" },
  areaServed: [
    { "@type": "City", name: "New York" },
    { "@type": "Country", name: "United States" },
  ],
};

export default function AIForLawFirmsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      <Nav />
      <main>
        <RevealScope>
          <PageHero
            eyebrow="AI for Law Firms"
            title="AI for law firms: less time searching, chasing and reconciling"
            subhead={
              <p>
                I build AI systems for small firms that sit on top of the tools you already use. Ask your own documents
                a question and get a cited answer, never lose an intake email, and see the billing numbers without
                building the report.
              </p>
            }
            primary={{ href: "/audit", label: "Get My Free AI Audit →" }}
          />

          {/* Signs */}
          <Section divider>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
              <div>
                <Eyebrow>Sound Familiar?</Eyebrow>
                <Heading reveal>Where small firms lose the most time</Heading>
              </div>
              <PointList items={SIGNS} />
            </div>
          </Section>

          {/* What gets built */}
          <Section divider>
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
              <div>
                <Eyebrow>What Gets Built</Eyebrow>
                <Heading reveal>What AI for law firms looks like in practice</Heading>
              </div>
              <p className={lede}>
                None of this replaces your practice management software or your lawyers&apos; judgment. It takes over
                the searching, the follow-up and the report building, and it shows its sources so the work can be
                checked.
              </p>
            </div>
            <TopicRail label="Four law firm systems" items={BUILT.map((b) => ({ title: b.title, body: b.body }))} />
          </Section>

          {/* Proof */}
          <Section tone="band">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
              <div>
                <Eyebrow>Already Built</Eyebrow>
                <Heading reveal>The same systems, already built</Heading>
              </div>
              <p className={lede}>
                I haven&apos;t done a law firm engagement yet. Each piece above was built for a client in another
                industry, and a firm build starts from these.
              </p>
            </div>
            <Rail label="Systems already built for other clients" cols={3} className="mt-10">
              {PROOF.map((p) => (
                <Card as="li" key={p.client} className="flex h-full flex-col">
                  <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-muted">{p.client}</p>
                  <p className="mt-3 text-[15.5px] leading-relaxed">{p.text}</p>
                </Card>
              ))}
            </Rail>
            <p className="mt-8">
              <a href="/work" className={inlineLink}>
                Read the full RECO and 25N case studies →
              </a>
            </p>
          </Section>

          {/* How I help */}
          <Section>
            <Eyebrow>How I Help</Eyebrow>
            <Heading reveal>Start with a free audit, then a scoped build</Heading>
            <OfferCards
              offers={[
                {
                  title: "Free AI Audit",
                  terms: "Free · Delivered in minutes",
                  body: (
                    <>
                      For when you know admin work eats your team&apos;s week but don&apos;t yet know what to automate
                      first.
                    </>
                  ),
                  href: "/audit",
                  cta: "Get your free AI audit →",
                },
                {
                  title: "Scoped Firm Build",
                  terms: "Scoped to your firm · Priced per project",
                  body: "For when one job, like document search or intake follow-up, is clearly costing hours every week.",
                  href: "/work",
                  cta: "See client work →",
                },
              ]}
            />
            <p className="mt-8 text-[16px] leading-relaxed">
              Want to talk it through first? See how I work as an{" "}
              <a href="/ai-consulting-for-small-businesses" className={inlineLink}>
                AI consultant for small business
              </a>
              , or read about{" "}
              <a href="/ai-training-for-small-businesses" className={inlineLink}>
                AI training for employees
              </a>
              .
            </p>
          </Section>

          <LandingFaq title="Questions about AI for law firms" items={FAQS} />

          <AboutFounder />
          <LandingClose
            heading="See where your firm is losing hours"
            subheading="Free AI Audit. Quantified savings opportunities, no credit card, no signup."
          />
        </RevealScope>
      </main>
      <Footer />
    </>
  );
}
