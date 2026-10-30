import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AboutFounder from "@/components/AboutFounder";
import DataTable from "@/components/brand/DataTable";
import Eyebrow from "@/components/brand/Eyebrow";
import Heading from "@/components/brand/Heading";
import PageHero from "@/components/brand/PageHero";
import RevealScope from "@/components/brand/RevealScope";
import Section from "@/components/brand/Section";
import LandingClose from "@/components/landing/LandingClose";
import LandingFaq from "@/components/landing/LandingFaq";
import OfferCards from "@/components/landing/OfferCards";
import PointList from "@/components/landing/PointList";
import StepList from "@/components/landing/StepList";
import TopicRail from "@/components/landing/TopicRail";
import { inlineLink, lede } from "@/components/landing/styles";

// 2026-10-29 brand redesign (Phase 2): restyled onto src/components/brand.
// Copy, metadata and JSON-LD unchanged.

const PAGE_URL = "https://www.wexadvisory.com/ai-consulting-for-small-businesses";

// Same rates the automatic proposals quote (ai-audit lib/proposal/terms.ts).
// Change them there and here together.
const BUILD_RATE_USD = 200;
const MAINTENANCE_RATE_USD = 150;

const PAGE_TITLE = "AI Consultant for Small Business: Costs & How It Works | Wex Advisory";
const PAGE_DESCRIPTION = `AI consulting for small businesses: what it includes and costs. Most charge $100 to $300 an hour. I charge $${BUILD_RATE_USD} for new builds. Free AI audit first.`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: "Wex Advisory",
    type: "website",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "AI Consultant for Small Business | Wex Advisory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ["/api/og"],
  }
};

const WHAT_IT_INCLUDES = [
  {
    title: "Workflow audit",
    text: "I go through how the work gets done today and rank the tasks worth automating by the hours and dollars they cost you. This is the free AI audit.",
  },
  {
    title: "Tool selection",
    text: "I match tools to the systems you already pay for, so you aren't asked to switch platforms to make the automation work.",
  },
  {
    title: "Build and connect",
    text: "I build the automation myself and connect it to the email, CRM, books, or scheduling you already use. Most projects take 1 to 4 weeks.",
  },
  {
    title: "Team handoff",
    text: "Every build ends with a live walkthrough for your team, about an hour, recorded. You keep the recording and a short written guide, so it keeps running without me.",
  },
];

const COST_ROWS = [
  {
    kind: "Audit or readiness assessment",
    market: "$2,000 to $8,000",
    wex: "Free, delivered in minutes",
  },
  {
    kind: "Hourly work",
    market: "$100 to $300 an hour",
    wex: `$${BUILD_RATE_USD} an hour for new builds`,
  },
  {
    kind: "One fixed-scope project",
    market: "$2,500 to $10,000",
    wex: "Quoted in hours before any work starts",
  },
  {
    kind: "Monthly retainer",
    market: "$1,500 to $8,000 a month",
    wex: `Varies by project, quoted up front. Maintenance is $${MAINTENANCE_RATE_USD} an hour`,
  },
];

const PAYS_BACK_FIRST = [
  {
    title: "Lead follow-up",
    text: "Every inquiry gets a reply and a reminder, without someone remembering to send it.",
  },
  {
    title: "Customer intake and scheduling",
    text: "Questions answered and appointments booked after hours.",
  },
  {
    title: "Month-end reporting",
    text: "The same report, built from your books automatically instead of by hand in a spreadsheet.",
  },
  {
    title: "Quotes and data entry",
    text: "Details typed once and carried into every system that needs them.",
  },
];

const BEFORE_YOU_HIRE = [
  "Ask for the payback period in writing, not a productivity percentage.",
  "Start with one small project before committing to a retainer.",
  "Ask what it costs to run each month after they leave.",
  "If the deliverable is a slide deck with no first build, keep looking.",
];

const WHO_ITS_FOR = [
  "Teams of 1–30 people, no dedicated IT or ops hire",
  "Spending real hours on follow-ups, reporting, or scheduling that should run itself",
  "Losing ground to competitors who are already using AI to move faster",
];

const FAQS = [
  {
    q: "How much does an AI consultant cost for a small business?",
    a: `Most charge $100 to $300 an hour, or $2,500 to $10,000 for a single project. I charge $${BUILD_RATE_USD} an hour for new builds and $${MAINTENANCE_RATE_USD} an hour for maintenance, and quote the hours before starting. The audit that shows whether a project is worth doing is free.`,
  },
  {
    q: "What does an AI consultant for a small business actually do?",
    a: "For a small business, it's less \"strategy deck\" and more \"here's the one workflow eating 6 hours of your week, and here's how to make it disappear.\" I audit your operations, find the highest-ROI opportunities, and either hand you a report or build the fix myself.",
  },
  {
    q: "How long before an AI project pays for itself?",
    a: "Divide the project cost by what it saves each month. A 20-hour build that removes 6 hours a week of $40-an-hour work pays for itself in about four months. If the math doesn't work on paper before the build, I'll tell you not to do it.",
  },
  {
    q: "Can I just use ChatGPT and skip the consultant?",
    a: "For writing and research, yes. The bigger savings usually come from connecting your tools to each other, so a lead, an invoice, or a booking moves on its own. A chat window doesn't do that.",
  },
  {
    q: "Is there a monthly retainer?",
    a: `It depends on the project. Maintenance is $${MAINTENANCE_RATE_USD} an hour. Where a project needs ongoing work every month, I quote a retainer sized to it before you commit.`,
  },
  {
    q: "How is this different from hiring a big consulting firm?",
    a: "Big firms price for enterprise budgets and enterprise timelines: six-figure engagements, six-month rollouts. Wex Advisory runs a free audit in minutes and automation projects in 1–4 weeks, sized for a business that doesn't have a six-figure AI budget.",
  },
  {
    q: "Do I need to already know what AI tools I want?",
    a: "No. Most clients start with \"I know I'm behind, I don't know where to start.\" That's exactly what the free AI Audit is for: it tells you where the money actually is before you spend anything.",
  },
  {
    q: "What if my industry isn't tech-heavy?",
    a: "Most of my work is with businesses that aren't tech companies: coworking operators, service firms, retailers. The tasks that eat the most time (follow-ups, reporting, scheduling, intake) look almost identical across industries.",
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
  name: "AI Consultant for Small Business",
  serviceType: "AI consulting",
  description:
    "Hands-on AI consulting for small businesses: a free workflow audit, then automation built at a published hourly rate.",
  // Reference the sitewide ProfessionalService (layout.tsx) instead of
  // re-declaring it, so the org and founder appear once per page.
  provider: { "@id": "https://www.wexadvisory.com/#organization" },
  areaServed: [
    { "@type": "City", name: "New York" },
    { "@type": "Country", name: "United States" },
  ],
};

export default function AIConsultingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      <Nav />
      <main>
        <RevealScope>
          <PageHero
            eyebrow="AI Consulting"
            title="An AI consultant for small business, without the enterprise price tag"
            subhead={
              <p>
                AI consulting for small businesses is hands-on help finding the tasks that waste the most hours,
                choosing the right tools for them, building the automation, and training your team to run it. Most
                consultants charge $100 to $300 an hour. I charge ${BUILD_RATE_USD} for new builds, quote every project
                before work starts, and the first step, an AI audit, is free.
              </p>
            }
            primary={{ href: "/audit", label: "Get My Free AI Audit →" }}
          />

          {/* What it includes */}
          <Section divider>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
              <div>
                <Eyebrow>What This Actually Means</Eyebrow>
                <Heading reveal>What AI consulting for small businesses actually includes</Heading>
                <p className={`mt-6 ${lede}`}>
                  Most small business owners hear &ldquo;AI consulting&rdquo; and picture a team of engineers and a
                  &ldquo;digital transformation roadmap&rdquo; nobody reads twice. That&apos;s enterprise AI. For a
                  5-person or 25-person business, it comes down to four things.
                </p>
              </div>
              <div>
                <StepList steps={WHAT_IT_INCLUDES.map((i) => ({ title: i.title, body: i.text }))} />
                <p className="mt-8 text-[16px] leading-relaxed">
                  Most work starts with the{" "}
                  <a href="/audit" className={inlineLink}>
                    free AI audit
                  </a>
                  . It doubles as an AI readiness assessment: it scores your business on five dimensions of AI
                  maturity and ranks the workflows worth automating by estimated annual savings. From there, you
                  decide whether to run with it yourself or have me build the top item.
                </p>
              </div>
            </div>
          </Section>

          {/* Cost */}
          <Section tone="band">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start lg:gap-16">
              <div>
                <Eyebrow>What It Costs</Eyebrow>
                <Heading reveal>What AI consulting for small businesses costs in 2026</Heading>
                <p className={`mt-6 ${lede}`}>
                  AI consultants sell their time four ways. The middle column is the range other firms publish for
                  small-business work this year. The right column is what I charge.
                </p>
              </div>
              <div>
                <DataTable
                  caption="What AI consulting for small businesses costs in 2026"
                  columns={[
                    { key: "kind", label: "How it's sold", rowHeader: true },
                    { key: "market", label: "Typical range" },
                    { key: "wex", label: "Wex Advisory", strong: true },
                  ]}
                  rows={COST_ROWS}
                />
                <p className="mt-6 text-[16px] leading-relaxed">
                  Every project is scoped and quoted in hours before any work starts, so you know the number up
                  front. Once a build is running, maintenance is ${MAINTENANCE_RATE_USD} an hour. If a project needs
                  ongoing work every month, the retainer depends on the project and is quoted up front too.
                </p>
                <p className="mt-4 text-[16px] leading-relaxed">
                  For a line-by-line breakdown of setup costs, see{" "}
                  <a href="/blog/how-much-does-ai-automation-setup-cost" className={inlineLink}>
                    How much does AI automation setup cost?
                  </a>
                </p>
              </div>
            </div>
          </Section>

          {/* Where it pays back first */}
          <Section>
            <Eyebrow>Where To Start</Eyebrow>
            <Heading reveal>Where AI pays back first in a small business</Heading>
            <TopicRail
              label="Where AI pays back first"
              cols={4}
              items={PAYS_BACK_FIRST.map((p) => ({ title: p.title, body: p.text }))}
            />
            <div className="mt-4 rounded-[12px] border border-ink/15 bg-selection/60 p-6 sm:p-8">
              <h3 className="text-h3 text-ink">The payback check</h3>
              <p className="mt-3 max-w-[820px] text-[16px] leading-relaxed">
                Divide the project cost by what it saves each month. Example: a 20-hour build is $
                {(20 * BUILD_RATE_USD).toLocaleString("en-US")}. If it removes 6 hours a week of work worth $40 an
                hour, that&apos;s about $1,040 a month, so it pays for itself in roughly four months. If the math
                doesn&apos;t work on paper, don&apos;t build it.
              </p>
            </div>
          </Section>

          {/* Before you hire + who it's for */}
          <Section divider>
            <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
              <div>
                <Eyebrow>Before You Hire Anyone</Eyebrow>
                <Heading size="h2-sm" reveal>
                  What to check before hiring an AI consultant
                </Heading>
                <PointList items={BEFORE_YOU_HIRE} className="mt-8" />
                <p className="mt-6 font-mono text-[13px] text-muted">These apply to me too. Ask me all four.</p>
              </div>
              <div>
                <Eyebrow>Who This Is For</Eyebrow>
                <Heading size="h2-sm" reveal>
                  Built for operators, not enterprises
                </Heading>
                <PointList items={WHO_ITS_FOR} className="mt-8" />
                <p className="mt-6 text-[15.5px] leading-relaxed text-muted">
                  If you&apos;re a Fortune 500 company looking for an AI governance program and a 12-person
                  implementation team, I&apos;m not the right fit, and I&apos;ll tell you that upfront.
                </p>
              </div>
            </div>
          </Section>

          {/* How I help */}
          <Section divider>
            <Eyebrow>How I Help</Eyebrow>
            <Heading reveal>Start with a free audit, then a scoped engagement</Heading>
            <OfferCards
              offers={[
                {
                  title: "Free AI Audit",
                  terms: "Free · Delivered in minutes",
                  body: (
                    <>
                      For when you know you&apos;re behind but don&apos;t yet know where the highest-ROI opportunity
                      is.
                    </>
                  ),
                  href: "/audit",
                  cta: "Get your free audit →",
                },
                {
                  title: "Custom AI Automation",
                  terms: `$${BUILD_RATE_USD} an hour for new builds · Quoted before work starts`,
                  body: (
                    <>
                      For when specific tasks (follow-ups, intake,{" "}
                      <a href="/automated-reporting" className={inlineLink}>
                        reporting
                      </a>
                      , competitive research) are eating hours every week.
                    </>
                  ),
                  href: "/#services",
                  cta: "See what gets automated →",
                },
              ]}
            />
            <p className="mt-8 max-w-[760px] text-[16px] leading-relaxed">
              Work is usually scoped to an industry or a team. If you run property management, see{" "}
              <a href="/ai-for-property-management" className={inlineLink}>
                AI for property management
              </a>
              . If you run a law firm, see{" "}
              <a href="/ai-automation-for-law-firms" className={inlineLink}>
                AI for law firms
              </a>
              . If you sell wholesale and DTC, see{" "}
              <a href="/ai-ops-dashboard-for-ecommerce-brands" className={inlineLink}>
                AI for ecommerce operations
              </a>
              . If the gap is your team rather than your tooling, see{" "}
              <a href="/ai-training-for-small-businesses" className={inlineLink}>
                AI training for employees
              </a>
              .
            </p>
          </Section>

          <LandingFaq title="Questions about hiring an AI consultant" items={FAQS} />

          <AboutFounder />
          <LandingClose
            heading="See where AI actually saves you money"
            subheading="Free AI Audit. Quantified savings opportunities, no credit card, no signup."
          />
        </RevealScope>
      </main>
      <Footer />
    </>
  );
}
