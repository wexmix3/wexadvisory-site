import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import DashboardShowcase from "@/components/DashboardShowcase";
import ScrollReveal from "@/components/ScrollReveal";
import Eyebrow from "@/components/design-system/Eyebrow";
import GlassCard from "@/components/design-system/GlassCard";
import { PrimaryCta, SecondaryCta } from "@/components/design-system/Cta";

export const metadata: Metadata = {
  title: "Client Work — Wex Advisory",
  description:
    "Real engagements, real outcomes. See how Wex Advisory delivers competitive intelligence and AI strategy for growing businesses.",
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
    id: "ecommerce-recovery-tools",
    industry: "E-Commerce Operations",
    client: "Wholesale + DTC recovery-tools brand",
    location: "Wholesale & Shopify DTC",
    challenge:
      "119 wholesale accounts and 2,500+ sales leads were tracked in a spreadsheet with no unified view of which relationships were going quiet, which orders needed urgent attention, or which inbox and meeting-note follow-ups were falling through.",
    narrative: [
      "This engagement covers a two-founder e-commerce brand selling recovery equipment — massage guns, cupping, compression sleeves, saunas, cold plunges — through wholesale (gyms, schools, teams, retailers) and a Shopify DTC storefront. With no engineering team of their own, the founders needed a single view across the entire operation without hiring for it.",
      "The build unified real wholesale-account and sales-lead data with live Shopify inventory and order sync, then layered in two automated agents — one flagging inbox and calendar follow-up gaps, another turning meeting notes into action items — feeding a single daily-priority queue with a full audit trail on every action taken.",
    ],
    deliverables: [
      "Ops dashboard unifying 119 wholesale accounts + 2,500+ sales leads in one view",
      "Live Shopify inventory and DTC order sync",
      "Two automated agents: inbox/calendar gap detection + meeting-notes action items",
      "Full write layer — edit, snooze, and audit trail on every account and lead",
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
      attribution: "Co-Founder, Recovery-Tools E-Commerce Brand",
    },
  },
  {
    id: "coworking-midwest",
    industry: "Flexible Coworking",
    client: "Multi-location coworking operator",
    location: "Chicago, IL · Dallas-Fort Worth, TX",
    challenge:
      "Regional competitors were intensifying while the client had no systematic view of how they stacked up on traffic, reviews, or local search presence.",
    narrative: [
      "This engagement covered a suburban coworking operator with locations across two major metro areas. With the flexible workspace market growing at 12–15% CAGR and new entrants launching regularly, the business needed to understand exactly where it stood — and where to focus limited resources.",
      "The analysis covered five direct competitors, mapped the client's Local SEO footprint against each, audited Google Business Profile health and review velocity, benchmarked online traffic, and surfaced a prioritized set of strategic actions calibrated to actual budget constraints.",
    ],
    deliverables: [
      "Full competitor traffic and SEO benchmarks vs. 5 direct rivals",
      "Google Business Profile health audit across all locations",
      "Review velocity analysis — where competitors were pulling ahead",
      "Prioritized action plan: 5 items ranked by expected impact and cost",
    ],
    outcomes: [
      { stat: "5", label: "Competitor profiles built" },
      { stat: "3", label: "Local SEO gaps identified" },
      { stat: "5", label: "Ranked action items delivered" },
      { stat: "9hrs", label: "Delivered after kickoff" },
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
      <main className="pt-20">

        {/* Hero */}
        <section className="bg-[#0A1226] pt-8 pb-16 px-6">
          <div className="max-w-5xl mx-auto">
            <Eyebrow>Client Work</Eyebrow>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">
              Real engagements.
              <br />
              Real outcomes.
            </h1>
            <p className="text-white/50 text-lg max-w-2xl">
              Every engagement is different. Here&apos;s what the work actually looks like — the
              problems, the approach, and the results delivered.
            </p>
          </div>
        </section>

        {/* Case studies */}
        <ScrollReveal>
          <section className="bg-[#0A1226] py-16 px-6 border-t border-white/5">
            <div className="max-w-5xl mx-auto space-y-10">
              {CASE_STUDIES.map((cs) => (
                <GlassCard key={cs.id} className="overflow-hidden">
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
                            className="bg-black/20 border border-white/10 rounded-xl p-5 text-center"
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
                </GlassCard>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* Coming soon */}
        {COMING_SOON.length > 0 && (
          <ScrollReveal>
            <section className="bg-[#0A1226] py-16 px-6 border-t border-white/5">
              <div className="max-w-5xl mx-auto">
                <p className="text-white/30 text-xs font-bold tracking-widest uppercase mb-4">
                  More Engagements
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {COMING_SOON.map((cs) => (
                    <GlassCard key={cs.industry} className="px-6 py-5 opacity-50">
                      <p className="text-gold text-xs font-bold tracking-widest uppercase mb-1">
                        {cs.industry}
                      </p>
                      <p className="text-white/50 text-sm">{cs.teaser}</p>
                      <p className="text-white/25 text-xs mt-2">Case study coming soon</p>
                    </GlassCard>
                  ))}
                </div>
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* Final CTA */}
        <ScrollReveal>
          <section className="bg-[#0A1226] py-24 px-6 border-t border-white/5">
            <div className="max-w-xl mx-auto text-center">
              <Eyebrow>Ready When You Are</Eyebrow>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Want to see what this looks like for your business?
              </h2>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <PrimaryCta href="https://audit.wexadvisory.com/audit">
                  Get Your Free AI Audit →
                </PrimaryCta>
                <SecondaryCta
                  href="https://calendly.com/maxwexley-wexadvisory/free-strategy-call"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book a Strategy Call
                </SecondaryCta>
              </div>
            </div>
          </section>
        </ScrollReveal>

      </main>
      <DashboardShowcase />
      <Footer />
    </>
  );
}
