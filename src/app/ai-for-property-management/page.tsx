import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AboutFounder from "@/components/AboutFounder";
import Eyebrow from "@/components/brand/Eyebrow";
import Heading from "@/components/brand/Heading";
import PageHero from "@/components/brand/PageHero";
import RevealScope from "@/components/brand/RevealScope";
import Section from "@/components/brand/Section";
import StatSheet from "@/components/brand/StatSheet";
import DeliveredList from "@/components/landing/DeliveredList";
import LandingClose from "@/components/landing/LandingClose";
import LandingFaq from "@/components/landing/LandingFaq";
import OfferCards from "@/components/landing/OfferCards";
import PointList from "@/components/landing/PointList";
import TopicRail from "@/components/landing/TopicRail";
import { inlineLink, lede } from "@/components/landing/styles";

// 2026-10-29 brand redesign (Phase 2): restyled onto src/components/brand.
// Copy, metadata and JSON-LD unchanged. 25N stays in past tense (the
// engagement ended 2026-10-19).

const PAGE_URL = "https://www.wexadvisory.com/ai-for-property-management";

export const metadata: Metadata = {
  title: "AI for Property Management | Wex Advisory",
  description:
    "AI for property management: a live P&L dashboard across every property, month-end packets that build themselves, and occupancy next to the numbers.",
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    title: "AI for Property Management | Wex Advisory",
    description:
      "AI for property management: a live P&L dashboard across every property, month-end packets that build themselves, and occupancy next to the numbers.",
    url: PAGE_URL,
    siteName: "Wex Advisory",
    type: "website",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "AI for Property Management | Wex Advisory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI for Property Management | Wex Advisory",
    description:
      "AI for property management: a live P&L dashboard across every property, month-end packets that build themselves, and occupancy next to the numbers.",
    images: ["/api/og"],
  }
};

const SIGNS = [
  "Month-end close means exporting the general ledger and reconciling it in Excel, one property at a time",
  "Nobody can say which property is behind budget this month, or why, without a day of spreadsheet work",
  "Occupancy lives in one system and financials in another, so nobody sees them side by side",
];

const BUILT = [
  {
    title: "Live P&L dashboard across properties",
    body: "Every location's P&L in one place: revenue and NOI against budget, month-over-month variance flags, a six-month trend, run-rate projections for partial months, and a plain-English AI summary for each location when new data lands.",
  },
  {
    title: "GL exports that load themselves",
    body: "The accounting system (Yardi, in the build below) already emails daily general ledger exports. A watcher picks them up and loads them into the dashboard. Nobody downloads, renames or forwards a file.",
  },
  {
    title: "Month-end packets per property",
    body: "A close packet for each location, built from the same data: income statement against budget, balance sheet, cash flow, AR and AP aging, and occupancy. Delivered as a PDF and an Excel workbook.",
  },
  {
    title: "Occupancy next to the financials",
    body: "Occupancy pulled daily for every location, backfilled for prior months and locked automatically at month end, so the close numbers don't drift.",
  },
];

const DELIVERABLES = [
  "Financial dashboard rolling up all 5 locations, refreshed daily",
  "GL check that flags entries breaking per-account rules before the close",
  "Automatic ingestion of the daily GL exports the accounting system already emails",
  "Month-end financial packet per location, in PDF and Excel",
  "Daily occupancy tracking with historical backfill and month-end lock",
];

const OUTCOMES = [
  { stat: "5", label: "Locations in one dashboard" },
  { stat: "Daily", label: "GL and occupancy refresh, while the engagement ran" },
  { stat: "PDF + Excel", label: "Close packet per location" },
  { stat: "9hrs", label: "First delivery after kickoff" },
];

const FAQS = [
  {
    q: "What does AI for property management actually do?",
    a: "It takes the repetitive finance and reporting work off your team. For a multi-location operator that means pulling accounting data in automatically, flagging GL entries that look wrong before the close, and building the month-end packet for each property. It also writes a plain-English summary of what changed at each location, so you read that before you open a spreadsheet.",
  },
  {
    q: "Do we have to switch from Yardi or our current software?",
    a: "No. The build reads what your systems already produce. In the engagement on this page, Yardi kept running exactly as before, and the dashboard picked up the GL exports it already emailed every day.",
  },
  {
    q: "Have you built this for a real estate operator?",
    a: "Yes. At the time, 25N Coworking ran five locations across Chicago and Dallas-Fort Worth, and I built their finance dashboard, GL check, month-end packets and occupancy tracking. Coworking is my deepest real estate work so far, so it's the example on this page.",
  },
  {
    q: "Where should a property manager start with AI?",
    a: "Start with the free AI audit. It scores your business on five areas and ranks automation ideas by estimated annual savings. You'll know where the biggest opportunity is before you spend anything.",
  },
  {
    q: "Is our financial data kept confidential?",
    a: "Yes. Dashboard access is limited to named logins, and your data is used only to produce your deliverables. I don't share client information with third parties.",
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
  name: "AI for Property Management",
  serviceType: "AI automation and financial reporting for property operators",
  url: PAGE_URL,
  description:
    "Live P&L dashboards across properties, automated month-end financial packets, email-ingested GL exports and occupancy tracking for multi-location property operators.",
  audience: { "@type": "BusinessAudience", audienceType: "Property management and real estate operators" },
  provider: { "@id": "https://www.wexadvisory.com/#organization" },
  areaServed: [
    { "@type": "City", name: "New York" },
    { "@type": "Country", name: "United States" },
  ],
};

export default function AIForPropertyManagementPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <RevealScope>
          <PageHero
            eyebrow="AI for Property Management"
            title="AI for property management: every property's numbers, without the spreadsheet marathon"
            subhead={
              <p>
                I build finance and operations systems for multi-location property operators. One live dashboard
                across every location, month-end packets that build themselves, and occupancy next to the numbers it
                drives.
              </p>
            }
            primary={{ href: "/audit", label: "Get My Free AI Audit →" }}
          />

          {/* Signs */}
          <Section divider>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
              <div>
                <Eyebrow>Sound Familiar?</Eyebrow>
                <Heading reveal>Where property operators lose the most time</Heading>
              </div>
              <PointList items={SIGNS} />
            </div>
          </Section>

          {/* What gets built */}
          <Section divider>
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
              <div>
                <Eyebrow>What Gets Built</Eyebrow>
                <Heading reveal>What AI for property management looks like in practice</Heading>
              </div>
              <p className={lede}>
                Most of the time a property team loses goes to the same few jobs: pulling reports, checking the
                ledger, building the close, and chasing occupancy. These four systems take those jobs over. They sit
                on top of the software you already run, so nothing gets replaced.
              </p>
            </div>
            <TopicRail label="Four finance systems" items={BUILT.map((b) => ({ title: b.title, body: b.body }))} />
          </Section>

          {/* Case study */}
          <Section tone="band" id="case-25n">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
              <div>
                <Eyebrow>A Real Build</Eyebrow>
                <Heading reveal>25N Coworking: five locations, one dashboard</Heading>
                <p className={`mt-6 ${lede}`}>
                  At the time, 25N ran five coworking locations across the Chicago and Dallas-Fort Worth metro areas. The finance
                  team was reconciling general ledger exports in Excel location by location, with no single view of
                  occupancy or how each location stood against budget.
                </p>
                <p className={`mt-4 ${lede}`}>
                  I started with a competitive analysis for the leadership team, delivered 9 hours after kickoff. Then
                  I built the finance side: a dashboard fed from the daily GL exports their accounting system already
                  sent, a rules-based GL check that flagged problem entries before the close, a month-end financial
                  packet for each location, and occupancy pulled daily. The finance team reviewed every round, and
                  their feedback went straight back into the build.
                </p>
              </div>
              <div className="lg:pt-10">
                <DeliveredList title="What Was Delivered" items={DELIVERABLES} />
              </div>
            </div>
            <StatSheet
              className="mt-10"
              label="25N Coworking results"
              items={OUTCOMES.map((o) => ({ value: o.stat, label: o.label }))}
            />
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
                      For when you know the reporting eats your team&apos;s week but don&apos;t yet know what to
                      automate first.
                    </>
                  ),
                  href: "/audit",
                  cta: "Get your free AI audit →",
                },
                {
                  title: "Finance Dashboard + Close Automation",
                  terms: "Scoped to your properties · Priced per project",
                  body: (
                    <>
                      For when the close eats days every month and you want every property&apos;s numbers in one
                      place.
                    </>
                  ),
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
              <a href="/ai-for-coworking-spaces" className={inlineLink}>
                AI for coworking spaces
              </a>
              .
            </p>
          </Section>

          <LandingFaq title="Questions about AI for property management" items={FAQS} />

          <AboutFounder />
          <LandingClose
            heading="See where your properties are losing time"
            subheading="Free AI Audit. Quantified savings opportunities, no credit card, no signup."
          />
        </RevealScope>
      </main>
      <Footer />
    </>
  );
}
