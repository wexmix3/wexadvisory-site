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
import TopicRail from "@/components/landing/TopicRail";
import { inlineLink, lede } from "@/components/landing/styles";

// 2026-10-29 brand redesign (Phase 2): restyled onto src/components/brand.
// Copy, metadata and JSON-LD unchanged.

const PAGE_URL = "https://www.wexadvisory.com/ai-integration-for-small-businesses";

export const metadata: Metadata = {
  title: "AI Integration for Small Businesses | Wex Advisory",
  description:
    "AI integration for small businesses that plugs into the tools you already run: CRM, spreadsheets, scheduling, invoicing. No rip-and-replace, no dev team.",
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    title: "AI Integration for Small Businesses | Wex Advisory",
    description:
      "AI integration for small businesses that plugs into the tools you already run: CRM, spreadsheets, scheduling, invoicing. No rip-and-replace, no dev team.",
    url: PAGE_URL,
    siteName: "Wex Advisory",
    type: "website",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "AI Integration for Small Businesses | Wex Advisory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Integration for Small Businesses | Wex Advisory",
    description:
      "AI integration for small businesses that plugs into the tools you already run: CRM, spreadsheets, scheduling, invoicing. No rip-and-replace, no dev team.",
    images: ["/api/og"],
  }
};

const INTEGRATIONS: { title: string; desc: string }[] = [
  { title: "Spreadsheets & CRM", desc: "New leads logged and routed without anyone re-typing them." },
  { title: "Email & Follow-Up", desc: "Personalized sequences that go out on schedule, not when someone remembers." },
  { title: "Scheduling", desc: "Appointment flows that skip the back-and-forth entirely." },
  { title: "Invoicing", desc: "Payment reminders sent automatically, every time, on time." },
];

const FAQS = [
  {
    q: "Do I have to replace my existing software to use AI with it?",
    a: "No. That's the whole premise: I build the automation to plug into the CRM, spreadsheet, or scheduling tool you already use. Rip-and-replace projects are expensive and risky for a small team; integration isn't.",
  },
  {
    q: "What if my systems don't have an official integration or API?",
    a: "Most small business stacks (spreadsheets, common CRMs, email, calendars) have enough of a connection point to work with. If something genuinely can't be integrated, I'll tell you upfront rather than force a fragile workaround.",
  },
  {
    q: "Who maintains the integration after it's built?",
    a: "You do, with plain-language documentation and a live walkthrough. Or I can maintain it under an optional ongoing plan, priced when we scope the work, if you'd rather not think about it again.",
  },
  {
    q: "How long does an integration project take?",
    a: "A single-workflow integration (e.g. lead intake → CRM) usually takes 1–2 weeks from kickoff to handoff. Multi-system projects run 3–4 weeks. You get a timeline before any work starts.",
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

export default function AIIntegrationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      <Nav />
      <main>
        <RevealScope>
          <PageHero
            eyebrow="AI Integration"
            title="AI integration for small businesses, without ripping out what already works"
            subhead={
              <p>
                You don&apos;t need new software. You need the tools you already run (your CRM, your spreadsheets,
                your inbox) to stop needing a human in the loop for repetitive steps.
              </p>
            }
            primary={{ href: "/audit", label: "See What Can Be Automated →" }}
          />

          {/* Where it plugs in */}
          <Section divider>
            <Eyebrow>Where It Plugs In</Eyebrow>
            <Heading reveal>Tools you already run, working on their own</Heading>
            <TopicRail
              label="Where AI integration plugs in"
              cols={4}
              items={INTEGRATIONS.map((i) => ({ title: i.title, body: i.desc }))}
            />
          </Section>

          {/* Integration vs replacement */}
          <Section tone="band">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
              <div>
                <Eyebrow>Integration, Not Replacement</Eyebrow>
                <Heading reveal>A rip-and-replace project is the wrong bet for a small team</Heading>
              </div>
              <div className="space-y-4 lg:pt-9">
                <p className={lede}>
                  Swapping your CRM or your entire back-office stack for something &ldquo;AI-native&rdquo; is
                  expensive, disruptive, and usually unnecessary. The team already knows how to use what you have.
                  The fix is making the repetitive parts of it automatic, not starting over.
                </p>
                <p className={lede}>
                  Everything I build is designed to sit alongside your existing tools, not replace them, and to be
                  maintainable by your team without a developer on staff.
                </p>
              </div>
            </div>
          </Section>

          <LandingFaq
            title="Common questions"
            items={FAQS}
            note={
              <>
                Want help deciding what to connect first? Start with a{" "}
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
            heading="See what's ready to run on its own"
            subheading="Free AI Audit. Specific automation opportunities, no credit card, no signup."
          />
        </RevealScope>
      </main>
      <Footer />
    </>
  );
}
