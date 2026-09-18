import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import DashboardShowcase from "@/components/DashboardShowcase";
import Link from "next/link";

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
      "25N runs five coworking locations across the Chicago and Dallas-Fort Worth metro areas. Occupancy lived in a separate space-management platform that nobody looked at next to the financials, and leadership had no systematic read on how they compared to regional competitors.",
      "I started with the question leadership could act on fastest: where do we stand against competitors? A competitive analysis covering five direct rivals, local SEO, Google Business Profile health and review velocity was delivered 9 hours after kickoff.",
      "Then I built the finance side, one piece at a time, with the finance team reviewing every round. A live GL dashboard puts every location's P&L in one place, with revenue and NOI against budget, month-over-month variance flags, a six-month trend, run-rate projections for partial months, and a plain-English AI summary for each location whenever new data lands. A GL check applies per-account rules to flag entries that look wrong before the close.",
      "The accounting system already emailed daily GL exports, so a watcher picks them up and loads them automatically. Month-end financial packets (income statement against budget, balance sheet, cash flow, AR and AP aging, occupancy) generate per location as PDF and Excel. Occupancy is pulled daily for every location and locked automatically at month end so close numbers don't drift.",
    ],
    deliverables: [
      "Competitive analysis against 5 direct rivals, delivered 9 hours after kickoff",
      "Live GL dashboard rolling up all 5 locations, refreshed daily",
      "GL check that flags entries breaking per-account rules before the close",
      "Automatic ingestion of the daily GL exports the accounting system already emails",
      "Month-end financial packet per location, in PDF and Excel, January 2026 onward",
      "Daily occupancy tracking with historical backfill and month-end lock",
    ],
    outcomes: [
      { stat: "5", label: "Locations in one dashboard" },
      { stat: "Daily", label: "GL and occupancy refresh" },
      { stat: "PDF + Excel", label: "Close packet per location" },
      { stat: "9hrs", label: "First delivery after kickoff" },
    ],
  },
];

const COMING_SOON = [
  { industry: "Hospitality & Events", teaser: "Operational AI strategy for a multi-market brand" },
  { industry: "Professional Services", teaser: "Competitive positioning for a regional firm" },
];

export default function WorkPage() {
  return (
    <>
      <Nav />
      <main className="bg-navy min-h-screen pt-28 pb-24 px-6">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="mb-16">
            <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">
              Client Work
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">
              Real engagements.
              <br />
              Real outcomes.
            </h1>
            <p className="text-white/50 text-lg max-w-2xl">
              Every engagement is different. Here&apos;s what the work actually looks like: the
              problems, the approach, and the results delivered.
            </p>
          </div>

          {/* Case studies */}
          <ScrollReveal variant="up-lg">
          <div className="space-y-10">
            {CASE_STUDIES.map((cs) => (
              <article
                key={cs.id}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
              >
                {/* Header bar */}
                <div className="border-l-4 border-gold bg-white/[0.03] px-8 py-6 flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <p className="text-gold text-xs font-bold tracking-[0.25em] uppercase mb-1">
                      {cs.industry}
                    </p>
                    <p className="text-white text-2xl font-bold">{cs.client}</p>
                  </div>
                  <p className="text-white/40 text-sm self-center">{cs.location}</p>
                </div>

                <div className="px-8 py-8 space-y-8">
                  {/* Challenge */}
                  <div>
                    <p className="text-white/40 text-xs font-bold tracking-widest uppercase mb-2">
                      The Challenge
                    </p>
                    <p className="text-white/70 text-base leading-relaxed">{cs.challenge}</p>
                  </div>

                  {/* Narrative */}
                  <div className="space-y-3">
                    {cs.narrative.map((para, i) => (
                      <p key={i} className="text-white/60 text-sm leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>

                  {/* Outcomes */}
                  <div>
                    <p className="text-white/40 text-xs font-bold tracking-widest uppercase mb-3">
                      Outcomes
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {cs.outcomes.map((o) => (
                        <div
                          key={o.label}
                          className="bg-navy/60 border border-white/10 rounded-xl p-5 text-center"
                        >
                          <div className="text-gold text-3xl font-extrabold mb-2">{o.stat}</div>
                          <div className="text-white/50 text-xs leading-tight">{o.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Deliverables */}
                  <div className="border border-white/10 rounded-xl px-6 py-5">
                    <p className="text-white/40 text-xs font-bold tracking-widest uppercase mb-3">
                      What Was Delivered
                    </p>
                    <ul className="space-y-2">
                      {cs.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-white/60">
                          <span className="text-white/40 font-bold flex-shrink-0 mt-0.5">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Quote */}
                  {cs.quote && (
                    <blockquote className="border-l-2 border-gold/40 pl-5">
                      <p className="text-white/70 italic text-base leading-relaxed">
                        &ldquo;{cs.quote.text}&rdquo;
                      </p>
                      <p className="text-white/30 text-xs mt-2">{cs.quote.attribution}</p>
                    </blockquote>
                  )}
                </div>
              </article>
            ))}
          </div>
          </ScrollReveal>

          {/* Coming soon */}
          {COMING_SOON.length > 0 && (
            <ScrollReveal variant="fade">
            <div className="mt-10">
              <p className="text-white/30 text-xs font-bold tracking-widest uppercase mb-4">
                More Engagements
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {COMING_SOON.map((cs) => (
                  <div
                    key={cs.industry}
                    className="border border-white/10 rounded-xl px-6 py-5 opacity-50"
                  >
                    <p className="text-gold text-xs font-bold tracking-widest uppercase mb-1">
                      {cs.industry}
                    </p>
                    <p className="text-white/50 text-sm">{cs.teaser}</p>
                    <p className="text-white/25 text-xs mt-2">Case study coming soon</p>
                  </div>
                ))}
              </div>
            </div>
            </ScrollReveal>
          )}

          {/* CTA */}
          <ScrollReveal variant="fade">
          <div className="mt-20 text-center">
            <p className="text-white/40 text-sm mb-6">
              Want to see what this looks like for your business?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/audit"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-gold to-[#e9d9a8] text-navy font-bold text-sm hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(200,168,75,0.25)] transition-all"
              >
                Get Your Free AI Audit →
              </Link>
              <Link
                href="https://calendly.com/maxwexley-wexadvisory/free-strategy-call"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full border border-white/20 text-white/70 hover:border-gold/50 hover:text-white font-semibold text-sm transition-colors"
              >
                Book a Strategy Call
              </Link>
            </div>
          </div>
          </ScrollReveal>

        </div>
      </main>
      <ScrollReveal variant="up-lg">
        <DashboardShowcase />
      </ScrollReveal>
      <Footer />
    </>
  );
}
