import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import DashboardShowcase from "@/components/DashboardShowcase";
import ProductsSection from "@/components/ProductsSection";
import Card from "@/components/brand/Card";
import CtaBand from "@/components/brand/CtaBand";
import Eyebrow from "@/components/brand/Eyebrow";
import FactList from "@/components/brand/FactList";
import Heading from "@/components/brand/Heading";
import PageHero from "@/components/brand/PageHero";
import Quote from "@/components/brand/Quote";
import RevealScope from "@/components/brand/RevealScope";
import Section from "@/components/brand/Section";
import StatSheet from "@/components/brand/StatSheet";
import { CALENDLY } from "@/components/brand/links";

// 2026-10-29 brand pass (phase 2): converted from the navy/glass layout to the
// brand system. Copy unchanged. 25N stays strictly past tense (the engagement
// ended 2026-10-19). RECO's measured row (488 / 102 / 8) matches the homepage
// case and its source line; do not add figures without a source.

export const metadata: Metadata = {
  title: "Client Work | Wex Advisory",
  description:
    "Case studies from RECO and 25N Coworking: AI ops dashboards, automated agents, GL finance dashboards and month-end close automation for growing businesses.",
  alternates: {
    canonical: "https://www.wexadvisory.com/work",
  },
};

type CaseStudy = {
  id: string;
  industry: string;
  client: string;
  location: string;
  challenge: string;
  narrative: string[];
  deliverables: string[];
  outcomes: { stat: string; label: string }[];
  quote?: { text: string; attribution: string };
};

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "reco",
    industry: "E-Commerce Operations",
    client: "RECO",
    location: "Wholesale & Shopify DTC",
    challenge:
      "The whole wholesale operation ran out of one Google Sheet: 119 wholesale accounts, 2,509 sales leads across 7 segments, and 151 events. Nothing told the founders which accounts were going quiet, which orders needed attention, or which emails had gone unanswered.",
    narrative: [
      "RECO sells recovery equipment (massage guns, cupping, compression sleeves, saunas, cold plunges) to gyms, schools, teams and retailers, and direct to consumers through Shopify. Two founders, no engineering staff, so building a system themselves wasn't an option. Follow-ups from meetings lived in notes and got lost.",
      "I built one dashboard around their real data, then added agents that do the watching for them. Wholesale accounts, leads, inventory and events load from the sheet, plus a daily Shopify sync for inventory and DTC orders. Every account and lead can be edited, snoozed or flagged, with a full audit trail.",
      "A single Priority Action Queue collects what needs attention today. Approving a drafted email reply sends it as a real threaded Gmail reply; approving a scheduling item creates the real calendar event. Agents flag inbox threads left unanswered for 3+ days, turn meeting notes into action items, find outreach and blogger opportunities, and draft posts for RECO's Shopify blog. Every finding has to cite a real email thread or event, and a second model checks tone and accuracy before anything reaches the queue.",
      "The dashboard also carries QuickBooks P&L, cash flow, balance sheet and aging on a Finance tab, and a two-way sync between the accounts list and Notion.",
    ],
    deliverables: [
      "Ops dashboard unifying 119 wholesale accounts and 2,500+ sales leads in one view",
      "Live Shopify inventory and DTC order sync",
      "Priority Action Queue with approve-to-send Gmail replies and calendar events",
      "Automated agents: inbox and calendar gaps, meeting-note action items, outreach, blog drafts",
      "QuickBooks financials and two-way Notion sync",
      "Daily priority digest delivered by email",
    ],
    outcomes: [
      { stat: "119", label: "Wholesale accounts unified" },
      { stat: "2,500+", label: "Sales leads tracked" },
      { stat: "5", label: "Automated agents live" },
      { stat: "Daily", label: "Priority digest delivered" },
    ],
    quote: {
      text: "We were operating out of a Google Sheet, but now we have systems and tools in place to ensure we are organized, efficient, and making the right decisions every day.",
      attribution: "Co-Founder, RECO",
    },
  },
  {
    id: "25n-coworking",
    industry: "Flexible Coworking",
    client: "25N Coworking",
    location: "Chicago, IL · Dallas-Fort Worth, TX",
    challenge:
      "The finance team ran month-end close by hand. Each location's general ledger came out of the accounting system as an export and was reconciled in Excel, one location at a time, with no single view of how each location stood against budget.",
    narrative: [
      "At the time, 25N ran five coworking locations across the Chicago and Dallas-Fort Worth metro areas. Occupancy lived in a separate space-management platform that nobody looked at next to the financials, and leadership had no systematic read on how they compared to regional competitors.",
      "I started with the question leadership could act on fastest: where do we stand against competitors? A competitive analysis covering five direct rivals, local SEO, Google Business Profile health and review velocity was delivered 9 hours after kickoff.",
      "Then I built the finance side, one piece at a time, with the finance team reviewing every round. A GL dashboard put every location's P&L in one place, with revenue and NOI against budget, month-over-month variance flags, a six-month trend, run-rate projections for partial months, and a plain-English AI summary for each location whenever new data landed. A GL check applied per-account rules to flag entries that looked wrong before the close.",
      "The accounting system already emailed daily GL exports, so a watcher picked them up and loaded them automatically. Month-end financial packets (income statement against budget, balance sheet, cash flow, AR and AP aging, occupancy) generated per location as PDF and Excel. Occupancy was pulled daily for every location and locked automatically at month end so close numbers didn't drift.",
    ],
    deliverables: [
      "Competitive analysis against 5 direct rivals, delivered 9 hours after kickoff",
      "GL dashboard rolling up all 5 locations, refreshed daily",
      "GL check that flags entries breaking per-account rules before the close",
      "Automatic ingestion of the daily GL exports the accounting system already emails",
      "Month-end financial packet per location, in PDF and Excel, January 2026 onward",
      "Daily occupancy tracking with historical backfill and month-end lock",
    ],
    outcomes: [
      { stat: "5", label: "Locations in one dashboard" },
      { stat: "Daily", label: "GL and occupancy refresh, while the engagement ran" },
      { stat: "PDF + Excel", label: "Close packet per location" },
      { stat: "9hrs", label: "First delivery after kickoff" },
    ],
  },
];

// Measured from RECO's dashboard, October 2026 (real counts, not sample data).
// Same figures and caption as the homepage case (components/home/Cases.tsx).
const RECO_MEASURED = [
  { value: "488", label: "actions flagged by RECO's agents since July 2026" },
  { value: "102", label: "approved and acted on by the founders" },
  { value: "8", label: "turned down" },
];

function CaseStudyBlock({ cs }: { cs: CaseStudy }) {
  const headingId = `case-${cs.id}-title`;
  return (
    <Section id={cs.id} divider aria-labelledby={headingId}>
      <article>
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between md:gap-8">
          <div>
            <Eyebrow>Client work · {cs.industry}</Eyebrow>
            <Heading id={headingId}>{cs.client}</Heading>
          </div>
          <p className="font-mono text-[12.5px] text-muted md:pb-2">{cs.location}</p>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
          <div>
            <FactList items={[["The challenge", cs.challenge]]} />
            {cs.quote && (
              <Quote cite={cs.quote.attribution} className="mt-8">
                {cs.quote.text}
              </Quote>
            )}
          </div>
          <div className="space-y-4 text-[16px] leading-relaxed">
            {cs.narrative.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>

        <h3 className="mt-12 mb-4 font-mono text-[12px] uppercase tracking-[0.12em] text-muted">Outcomes</h3>
        <StatSheet
          items={cs.outcomes.map((o) => ({ value: o.stat, label: o.label }))}
          label={`${cs.client} outcomes`}
        />
        {cs.id === "reco" && (
          <StatSheet
            className="mt-4"
            items={RECO_MEASURED}
            row={2}
            label="Measured at RECO"
            caption="Measured from RECO’s dashboard, October 2026. Real numbers, not sample data."
          />
        )}

        <Card padding="lg" className="mt-8">
          <h3 className="font-mono text-[12px] uppercase tracking-[0.12em] text-muted">What was delivered</h3>
          <ul className="mt-5 grid gap-x-10 gap-y-3 md:grid-cols-2">
            {cs.deliverables.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[15.5px] leading-relaxed">
                <span aria-hidden="true" className="mt-[3px] font-mono text-[13px] text-muted">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </article>
    </Section>
  );
}

export default function WorkPage() {
  return (
    <>
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <RevealScope>
          <PageHero
            eyebrow="Client Work"
            title={
              <>
                Real engagements.
                <br />
                Real outcomes.
              </>
            }
            subhead={
              <p>
                Every engagement is different. Here&apos;s what the work actually looks like: the problems, the
                approach, and the results delivered. Reporting work like the 25N close is also its own service:{" "}
                <a
                  href="/automated-reporting"
                  className="font-semibold text-ink underline underline-offset-4 hover:decoration-2"
                >
                  automated reporting
                </a>
                .
              </p>
            }
          />

          {CASE_STUDIES.map((cs) => (
            <CaseStudyBlock key={cs.id} cs={cs} />
          ))}

          <DashboardShowcase />
          <ProductsSection />
          <CtaBand
            title="Want to see what this looks like for your business?"
            primary={{ href: "/audit", label: "Get Your Free AI Audit →" }}
            secondary={{ href: CALENDLY, label: "Book a Strategy Call", external: true }}
          />
        </RevealScope>
      </main>
      <Footer />
    </>
  );
}
