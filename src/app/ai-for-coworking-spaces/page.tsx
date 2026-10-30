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

const PAGE_URL = "https://www.wexadvisory.com/ai-for-coworking-spaces";

export const metadata: Metadata = {
  title: "AI for Coworking Spaces: Finance Dashboards & Month-End Close | Wex Advisory",
  description:
    "AI and automation for multi-location coworking operators: a live GL dashboard, automated month-end financial packets, and occupancy tracking in one place. Start with a free AI Audit.",
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    title: "AI for Coworking Spaces | Wex Advisory",
    description:
      "A live GL dashboard, automated month-end financial packets, and occupancy tracking for multi-location coworking operators.",
    url: PAGE_URL,
    siteName: "Wex Advisory",
    type: "website",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "AI for Coworking Spaces | Wex Advisory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI for Coworking Spaces | Wex Advisory",
    description:
      "A live GL dashboard, automated month-end financial packets, and occupancy tracking for multi-location coworking operators.",
    images: ["/api/og"],
  }
};

const SIGNS = [
  "Month-end close means exporting the general ledger and reconciling it in Excel, one location at a time",
  "Nobody can answer \"which location is behind budget this month, and why?\" without a day of spreadsheet work",
  "Occupancy lives in one system and financials in another, so nobody sees them side by side",
];

const BUILT = [
  {
    title: "Live GL financial dashboard",
    body: "Every location's P&L in one place: revenue and NOI against budget, month-over-month variance flags at the section and account level, a six-month trend, run-rate projections for partial months, and a health badge per location.",
  },
  {
    title: "Email-ingested GL reports",
    body: "The operator's accounting system (Yardi) already emails daily general ledger exports. A watcher picks those up automatically and pushes them into the dashboard, so nobody downloads, renames or forwards a file.",
  },
  {
    title: "Automated month-end financial packets",
    body: "A per-location close packet generated from the same data: income statement against budget, balance sheet, cash flow, AR and AP aging, and occupancy, as a PDF and an Excel workbook.",
  },
  {
    title: "Occupancy tracking",
    body: "A daily occupancy pull from the operator's space-management platform for every location, backfilled for prior months and locked automatically at month end so the close numbers don't drift.",
  },
];

const DELIVERABLES = [
  "Live financial dashboard rolling up all 5 locations",
  "GL check that flags entries breaking per-account rules before the close",
  "Automatic ingestion of the daily GL exports the accounting system already emails",
  "Month-end financial packet per location, in PDF and Excel",
  "Daily occupancy tracking with historical backfill and month-end lock",
  "Competitive analysis against 5 direct rivals, delivered 9 hours after kickoff",
];

const OUTCOMES = [
  { stat: "5", label: "Locations rolled up" },
  { stat: "Daily", label: "GL and occupancy refresh" },
  { stat: "PDF + Excel", label: "Close packet per location" },
  { stat: "9hrs", label: "To first delivery" },
];

const FAQS = [
  {
    q: "How can AI help a coworking space?",
    a: "Mostly by taking the repetitive finance and operations work off your team's plate. For a multi-location operator that usually means pulling accounting data automatically instead of by hand, flagging GL entries that look wrong before the close, generating the month-end packet for each location, and putting occupancy next to the financials. AI also writes plain-English notes on what changed at each location, so you read a summary before you open a spreadsheet.",
  },
  {
    q: "Do we have to switch accounting or membership software?",
    a: "No. The build reads what your systems already produce. In the engagement on this page, the accounting system kept running exactly as before; the dashboard picked up the GL exports it already emailed every day and pulls occupancy from the space-management platform the team already uses.",
  },
  {
    q: "We only have a few locations. Is this worth it?",
    a: "The work scales with locations, but the pain starts early. If month-end close already takes someone days of spreadsheet work, or you can't see how each location is doing against budget without asking for a report, there's likely something worth automating. The free AI Audit will tell you where the biggest opportunity is before you spend anything.",
  },
  {
    q: "Is our financial data kept confidential?",
    a: "Yes. Access to the dashboard is limited to named logins, and your data is used solely to produce your deliverables. I don't share client information with third parties. The screenshots on this site are blurred for the same reason.",
  },
  {
    q: "Do you only work with coworking operators?",
    a: "No. I also build for e-commerce brands, service firms and retailers. Coworking is where I've done the deepest finance work, so it gets its own page.",
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
  name: "AI for Coworking Spaces",
  serviceType: "AI automation and financial reporting for coworking operators",
  url: PAGE_URL,
  description:
    "Live GL financial dashboards, automated month-end financial packets, email-ingested accounting exports and occupancy tracking for multi-location coworking operators.",
  audience: { "@type": "BusinessAudience", audienceType: "Coworking and flexible workspace operators" },
  provider: { "@id": "https://www.wexadvisory.com/#organization" },
  areaServed: [
    { "@type": "City", name: "New York" },
    { "@type": "Country", name: "United States" },
  ],
};

export default function AIForCoworkingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      <Nav />
      <main>
        <RevealScope>
          <PageHero
            eyebrow="AI for Coworking Spaces"
            title="AI for coworking spaces: close the month without the spreadsheet marathon"
            subhead={
              <p>
                I build finance and operations systems for multi-location coworking operators. A live dashboard across
                every location, month-end packets that generate themselves, and occupancy next to the numbers it
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
                <Heading reveal>Where coworking operators lose the most time</Heading>
              </div>
              <PointList items={SIGNS} />
            </div>
          </Section>

          {/* What gets built */}
          <Section divider>
            <Eyebrow>What Gets Built</Eyebrow>
            <Heading reveal>Four systems that run the finance side for you</Heading>
            <TopicRail label="Four finance systems" items={BUILT.map((b) => ({ title: b.title, body: b.body }))} />
          </Section>

          {/* Case study */}
          <Section tone="band" id="case-25n">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
              <div>
                <Eyebrow>A Real Build</Eyebrow>
                <Heading reveal>25N Coworking</Heading>
                <p className={`mt-6 ${lede}`}>
                  25N runs five coworking locations across the Chicago and Dallas-Fort Worth metro areas. The finance
                  team was reconciling general ledger exports in Excel location by location, with no systematic view
                  of occupancy or how each location stood against budget.
                </p>
                <p className={`mt-4 ${lede}`}>
                  I started with a competitive analysis for the leadership team, then built the finance side: a
                  dashboard fed automatically from the daily GL exports their accounting system already sent, a
                  rules-based GL check that flagged problem entries before the close, a month-end financial packet for
                  each location, and occupancy pulled daily from their space-management platform. Each round of
                  feedback from the finance team went straight back into the build.
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
                  body: "The sample audit on the audit page was run on a coworking operator, so you can see what the output looks like for a business like yours before running your own.",
                  href: "/audit",
                  cta: "See the free AI audit →",
                },
                {
                  title: "Finance Dashboard + Close Automation",
                  terms: "Scoped to your locations · Priced per project",
                  body: (
                    <>
                      For when the close eats days every month and you want every location&apos;s numbers in one
                      place.
                    </>
                  ),
                  href: "/work",
                  cta: "See client work →",
                },
              ]}
            />
            <p className="mt-8 text-[16px] leading-relaxed">
              Run an e-commerce brand instead? See the{" "}
              <a href="/ai-ops-dashboard-for-ecommerce-brands" className={inlineLink}>
                AI ops dashboard for e-commerce brands
              </a>
              .
            </p>
          </Section>

          <LandingFaq title="Common questions" items={FAQS} />

          <AboutFounder />
          <LandingClose
            heading="See where your locations are losing time"
            subheading="Free AI Audit. Quantified savings opportunities, no credit card, no signup."
          />
        </RevealScope>
      </main>
      <Footer />
    </>
  );
}
