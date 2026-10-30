import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AboutFounder from "@/components/AboutFounder";
import Button from "@/components/brand/Button";
import Card from "@/components/brand/Card";
import Eyebrow from "@/components/brand/Eyebrow";
import FaqList from "@/components/brand/FaqList";
import Heading from "@/components/brand/Heading";
import PageHero from "@/components/brand/PageHero";
import Quote from "@/components/brand/Quote";
import Rail from "@/components/brand/Rail";
import RevealScope from "@/components/brand/RevealScope";
import Section from "@/components/brand/Section";
import StatSheet from "@/components/brand/StatSheet";
import Tag from "@/components/brand/Tag";
import { CALENDLY } from "@/components/brand/links";

// 2026-10-29 brand pass (phase 2): navy/gold/glass layout converted to the
// brand system. Copy, metadata and JSON-LD unchanged. The case study stays
// anonymized ("recovery-tools brand"); its figures are RECO's sourced ones.
// The closing block is page-local (the old shared ServiceCTA was removed).

const PAGE_URL = "https://www.wexadvisory.com/ai-ops-dashboard-for-ecommerce-brands";

export const metadata: Metadata = {
  title: "AI for Ecommerce: Ops Dashboard and Agents | Wex Advisory",
  description:
    "AI for ecommerce operations: one dashboard for wholesale accounts, Shopify orders and leads, plus agents that catch the follow-ups. See a real build.",
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    title: "AI for Ecommerce: Ops Dashboard and Agents | Wex Advisory",
    description:
      "AI for ecommerce operations: one dashboard for wholesale accounts, Shopify orders and leads, plus agents that catch the follow-ups. See a real build.",
    url: PAGE_URL,
    siteName: "Wex Advisory",
    type: "website",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "AI for Ecommerce: Ops Dashboard and Agents | Wex Advisory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI for Ecommerce: Ops Dashboard and Agents | Wex Advisory",
    description:
      "AI for ecommerce operations: one dashboard for wholesale accounts, Shopify orders and leads, plus agents that catch the follow-ups. See a real build.",
    images: ["/api/og"],
  }
};

const SIGNS = [
  { text: "Wholesale accounts, sales leads, and Shopify orders live in separate spreadsheets or tabs, none of them talking to each other" },
  { text: "No way to tell which accounts are going quiet or which orders need attention without manually checking each source" },
  { text: "Meeting notes and inbox follow-ups fall through because nothing turns them into tracked action items automatically" },
];

const DELIVERABLES = [
  "Ops dashboard unifying wholesale accounts + sales leads in one view",
  "Live Shopify inventory and DTC order sync",
  "Automated agents: inbox/calendar gap detection + meeting-notes action items",
  "Full write layer: edit, snooze, and audit trail on every account and lead",
  "Daily priority digest delivered by email",
];

const OUTCOMES = [
  { stat: "119", label: "Wholesale accounts unified" },
  { stat: "2,500+", label: "Sales leads tracked" },
  { stat: "5", label: "Automated agents live" },
  { stat: "Daily", label: "Priority digest delivered" },
];

const BUILT = [
  {
    title: "One ops dashboard",
    body: "Wholesale accounts, sales leads, inventory and events in one view, plus a daily Shopify sync for inventory and DTC orders. Every account and lead can be edited, snoozed or flagged, with a full audit trail.",
  },
  {
    title: "A priority queue you approve",
    body: "Everything that needs attention today lands in one queue. Approving a drafted reply sends it as a real threaded Gmail reply. Approving a scheduling item creates the real calendar event.",
  },
  {
    title: "Agents that do the watching",
    body: "Agents flag inbox threads left unanswered for 3+ days, turn meeting notes into action items, find outreach opportunities and draft posts for the Shopify blog. Every finding has to cite a real email thread or event.",
  },
  {
    title: "Finance in the same place",
    body: "QuickBooks P&L, cash flow, balance sheet and aging on a Finance tab, next to the accounts and orders that drive them.",
  },
];

const FAQS = [
  {
    q: "What does AI for ecommerce actually do for an operations team?",
    a: "It puts your wholesale accounts, sales leads and Shopify orders in one place, then has agents watch the work that slips. In the build on this page, agents flag inbox threads left unanswered for 3+ days and turn meeting notes into action items. Everything lands in one daily priority queue.",
  },
  {
    q: "Is this a chatbot for our storefront?",
    a: "No. This is AI for the operations side of an ecommerce brand: accounts, orders, follow-ups and the numbers behind them. It's built around your actual accounts and your actual workflow, not a generic tool.",
  },
  {
    q: "Does the AI send emails without us checking?",
    a: "No. Agents draft replies and calendar items into a queue, and nothing goes out until you approve it. Every finding has to cite a real email thread or event, and a second model checks tone and accuracy before it reaches the queue.",
  },
  {
    q: "We don't have an engineering team. Can we still use this?",
    a: "Yes. That's who it's built for. The founders in the build below run their brand with no engineers, so I build and maintain the system and they use it.",
  },
  {
    q: "How long does a build like this take?",
    a: "The core dashboard and Shopify sync typically ship in the first 1-2 weeks, with agents layered in after. It's scoped and priced per project, not a fixed package.",
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
  name: "AI for Ecommerce Operations",
  alternateName: "AI Ops Dashboard for E-Commerce Brands",
  serviceType: "AI ops dashboards and automated agents for ecommerce brands",
  url: PAGE_URL,
  description:
    "AI for ecommerce operations: custom ops dashboards unifying wholesale accounts, DTC orders and sales leads, plus agents that flag follow-ups, for brands without an engineering team.",
  // Reference the sitewide ProfessionalService (layout.tsx) instead of
  // re-declaring it, so the org and founder appear once per page.
  provider: { "@id": "https://www.wexadvisory.com/#organization" },
  areaServed: [
    { "@type": "City", name: "New York" },
    { "@type": "Country", name: "United States" },
  ],
};

const LINK = "font-semibold text-ink underline underline-offset-4 hover:decoration-2";

export default function AIOpsDashboardPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      <Nav />
      <main>
        <RevealScope>
          <PageHero
            eyebrow="AI for Ecommerce"
            title="AI for ecommerce operations: one dashboard, no engineering team required"
            subhead="Most wholesale and DTC brands run on a patchwork of spreadsheets, Shopify tabs and inbox threads. I build the dashboard that pulls it into one place, plus the AI agents that catch what falls through the cracks."
            primary={{ href: "/audit", label: "Get My Free AI Audit →" }}
          />

          {/* Signs you need this */}
          <Section divider aria-labelledby="signs-title">
            <Eyebrow>Sound Familiar?</Eyebrow>
            <Heading id="signs-title" reveal>
              Signs your ecommerce ops need more than a spreadsheet
            </Heading>
            <Rail label="Signs" ordered className="mt-10">
              {SIGNS.map(({ text }, i) => (
                <Card as="li" key={text} padding="lg">
                  <span className="font-mono text-[12px] text-muted" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <p className="mt-3 text-[16px] leading-relaxed">{text}</p>
                </Card>
              ))}
            </Rail>
          </Section>

          {/* What gets built */}
          <Section divider aria-labelledby="built-title">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
              <div>
                <Eyebrow>What Gets Built</Eyebrow>
                <Heading id="built-title" size="h2-sm" reveal>
                  What AI for ecommerce looks like in practice
                </Heading>
                <p className="mt-5 text-[16.5px] leading-relaxed">
                  Most talk about AI for ecommerce is about the storefront. For a small brand, the bigger time sink
                  usually sits behind it: wholesale accounts going quiet, orders that need a human, and follow-ups
                  buried in an inbox. That&apos;s the part I build for.
                </p>
                <p className="mt-4 text-[16.5px] leading-relaxed">
                  It starts with one dashboard built on your real data. Then agents watch the work nobody has time to
                  watch, and put what matters today in a single queue. You approve what goes out.
                </p>
              </div>
              <ul className="grid gap-4 sm:grid-cols-2">
                {BUILT.map(({ title, body }) => (
                  <Card as="li" key={title} padding="lg">
                    <h3 className="text-h3 text-ink">{title}</h3>
                    <p className="mt-3 text-[15.5px] leading-relaxed">{body}</p>
                  </Card>
                ))}
              </ul>
            </div>
          </Section>

          {/* Case study (the page's one band) */}
          <Section tone="band" aria-labelledby="build-title">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
              <div>
                <Eyebrow>A Real Build</Eyebrow>
                <Heading id="build-title" size="h2-sm" reveal>
                  Wholesale + DTC recovery-tools brand
                </Heading>
                <p className="mt-5 text-[16.5px] leading-relaxed">
                  A two-founder e-commerce brand selling recovery equipment through wholesale (gyms, schools, teams,
                  retailers) and a Shopify DTC storefront. 119 wholesale accounts and 2,500+ sales leads were tracked
                  in a spreadsheet with no unified view of which relationships were going quiet, which orders needed
                  urgent attention, or which follow-ups were falling through. No engineering team of their own.
                </p>
                <p className="mt-4 text-[16.5px] leading-relaxed">
                  The build unified real wholesale-account and sales-lead data with live Shopify inventory and order
                  sync, then layered in automated agents (one flagging inbox and calendar follow-up gaps, another
                  turning meeting notes into action items) feeding a single daily-priority queue with a full audit
                  trail on every action taken.
                </p>
                <Quote cite="Co-Founder, Recovery-Tools E-Commerce Brand" className="mt-8">
                  We were operating out of a Google Sheet, but now we have systems and tools in place to ensure we are
                  organized, efficient, and making the right decisions every day.
                </Quote>
              </div>
              <div className="min-w-0">
                <StatSheet
                  items={OUTCOMES.slice(0, 2).map((o) => ({ value: o.stat, label: o.label }))}
                  label="Results of the build"
                />
                <StatSheet
                  className="mt-3"
                  row={2}
                  items={OUTCOMES.slice(2).map((o) => ({ value: o.stat, label: o.label }))}
                  label="Results of the build, continued"
                />
                <Card padding="lg" className="mt-6">
                  <h3 className="font-mono text-[12px] uppercase tracking-[0.12em] text-muted">What Was Delivered</h3>
                  <ul className="mt-5 space-y-3">
                    {DELIVERABLES.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[15.5px] leading-relaxed">
                        <span aria-hidden="true" className="mt-[3px] font-mono text-[13px] text-muted">
                          ✓
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>
          </Section>

          {/* How I help */}
          <Section aria-labelledby="help-title">
            <Eyebrow>How I Help</Eyebrow>
            <Heading id="help-title" reveal>
              Start with a free audit, then a scoped build
            </Heading>
            <ul className="mt-10 grid gap-4 md:grid-cols-2">
              <Card as="li" padding="lg" className="flex flex-col">
                <h3 className="text-h3 text-ink">Free AI Audit</h3>
                <p className="mt-3">
                  <Tag>Free · Delivered in minutes</Tag>
                </p>
                <p className="mb-5 mt-4 text-[15.5px] leading-relaxed">
                  For when you know your ops are scattered but don&apos;t yet know what to unify first.
                </p>
                <div className="mt-auto">
                  <Button href="/audit" variant="quiet">
                    Get your free audit →
                  </Button>
                </div>
              </Card>
              <Card as="li" padding="lg" className="flex flex-col">
                <h3 className="text-h3 text-ink">Custom Ops Dashboard + Agents</h3>
                <p className="mt-3">
                  <Tag>Scoped to your data · Priced per project</Tag>
                </p>
                <p className="mb-5 mt-4 text-[15.5px] leading-relaxed">
                  For when wholesale, DTC, and lead data need one home, plus agents watching what you don&apos;t have
                  time to.
                </p>
                <div className="mt-auto">
                  <Button href="/work" variant="quiet">
                    See the full case study →
                  </Button>
                </div>
              </Card>
            </ul>
            <p className="mt-8 text-[15.5px] leading-relaxed text-muted">
              Not sure where to start? Run a{" "}
              <a href="/audit" className={LINK}>
                free AI audit
              </a>
              , or see how I work as an{" "}
              <a href="/ai-consulting-for-small-businesses" className={LINK}>
                AI consultant for small business
              </a>
              .
            </p>
          </Section>

          {/* FAQ */}
          <Section divider width="narrow" aria-labelledby="faq-title">
            <Eyebrow>FAQ</Eyebrow>
            <Heading id="faq-title" reveal>
              Questions about AI for ecommerce
            </Heading>
            <div className="mt-8">
              <FaqList items={FAQS} defaultOpen={0} />
            </div>
          </Section>

          <AboutFounder />

          {/* Close. Page-local, same copy as the landing pages. */}
          <section aria-labelledby="close-title" className="scroll-mt-20 bg-canvas px-4 pb-16 pt-4 sm:px-8 md:pb-20">
            <Card padding="none" className="mx-auto max-w-[1180px] px-6 py-12 text-center sm:py-16">
              <Heading id="close-title" reveal className="mx-auto max-w-[760px]">
                See where your ops are leaking time and money
              </Heading>
              <p className="mx-auto mt-4 max-w-[560px] text-[17px] leading-relaxed">
                Free AI Audit. Quantified savings opportunities, no credit card, no signup.
              </p>
              <div className="mt-8 flex flex-col items-center gap-3">
                <Button href="/audit" block>
                  Analyze My Business →
                </Button>
                <p className="mt-4 text-[14px] text-muted">Prefer to talk first?</p>
                <Button href={CALENDLY} external variant="quiet">
                  Book a free 30-min strategy call →
                </Button>
              </div>
            </Card>
          </section>
        </RevealScope>
      </main>
      <Footer />
    </>
  );
}
