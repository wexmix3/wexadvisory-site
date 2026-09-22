import type { Metadata } from "next";
import { FileSpreadsheet, Building2, Mail, BarChart3, LayoutDashboard } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import AboutFounder from "@/components/AboutFounder";
import ServiceCTA from "@/components/ServiceCTA";
import { PrimaryCta } from "@/components/design-system/Cta";

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
  },
};

const SIGNS = [
  { icon: FileSpreadsheet, text: "Month-end close means exporting the general ledger and reconciling it in Excel, one location at a time" },
  { icon: BarChart3, text: "Nobody can answer \"which location is behind budget this month, and why?\" without a day of spreadsheet work" },
  { icon: Building2, text: "Occupancy lives in one system and financials in another, so nobody sees them side by side" },
];

const BUILT = [
  {
    icon: LayoutDashboard,
    title: "Live GL financial dashboard",
    body: "Every location's P&L in one place: revenue and NOI against budget, month-over-month variance flags at the section and account level, a six-month trend, run-rate projections for partial months, and a health badge per location.",
  },
  {
    icon: Mail,
    title: "Email-ingested GL reports",
    body: "The operator's accounting system (Yardi) already emails daily general ledger exports. A watcher picks those up automatically and pushes them into the dashboard, so nobody downloads, renames or forwards a file.",
  },
  {
    icon: FileSpreadsheet,
    title: "Automated month-end financial packets",
    body: "A per-location close packet generated from the same data: income statement against budget, balance sheet, cash flow, AR and AP aging, and occupancy, as a PDF and an Excel workbook.",
  },
  {
    icon: Building2,
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
    a: "No. The build reads what your systems already produce. In the engagement on this page, the accounting system kept running exactly as before; the dashboard picks up the GL exports it already emails every day and pulls occupancy from the space-management platform the team already uses.",
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
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-navy py-24 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">AI for Coworking Spaces</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              AI for coworking spaces:{" "}
              <span className="text-gold">close the month without the spreadsheet marathon</span>
            </h1>
            <p className="text-white/65 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              I build finance and operations systems for multi-location coworking operators. A live
              dashboard across every location, month-end packets that generate themselves, and
              occupancy next to the numbers it drives.
            </p>
            <PrimaryCta href="/audit">Get My Free AI Audit →</PrimaryCta>
          </div>
        </section>

        {/* Signs */}
        <ScrollReveal variant="up">
        <section className="bg-[#0a1a30] py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">Sound Familiar?</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">
              Where coworking operators lose the most time
            </h2>
            <div className="space-y-5">
              {SIGNS.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-gold" strokeWidth={1.5} />
                  </div>
                  <p className="text-white/70 text-base leading-relaxed pt-2">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        </ScrollReveal>

        {/* What gets built */}
        <ScrollReveal variant="left">
        <section className="bg-navy py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">What Gets Built</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">
              Four systems that run the finance side for you
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {BUILT.map(({ icon: Icon, title, body }) => (
                <div key={title} className="bg-white/[0.04] rounded-2xl p-8">
                  <div className="text-gold mb-5">
                    <Icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-3">{title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        </ScrollReveal>

        {/* Case study */}
        <ScrollReveal variant="up-lg">
        <section className="bg-[#0a1a30] py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">A Real Build</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              25N Coworking
            </h2>
            <p className="text-white/65 text-base leading-relaxed mb-6">
              25N runs five coworking locations across the Chicago and Dallas-Fort Worth metro
              areas. The finance team was reconciling general ledger exports in Excel location by
              location, with no systematic view of occupancy or how each location stood against
              budget.
            </p>
            <p className="text-white/65 text-base leading-relaxed mb-10">
              I started with a competitive analysis for the leadership team, then built the finance
              side: a live dashboard fed automatically from the daily GL exports their accounting
              system already sends, a rules-based GL check that flags problem entries before the
              close, a month-end financial packet for each location, and occupancy pulled daily from
              their space-management platform. Each round of feedback from the finance team went
              straight back into the build.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {OUTCOMES.map((o) => (
                <div key={o.label} className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
                  <div className="text-gold text-3xl font-extrabold mb-2">{o.stat}</div>
                  <div className="text-white/50 text-xs leading-tight">{o.label}</div>
                </div>
              ))}
            </div>

            <div className="border border-white/10 rounded-xl px-6 py-5">
              <p className="text-white/40 text-xs font-bold tracking-widest uppercase mb-3">
                What Was Delivered
              </p>
              <ul className="space-y-2">
                {DELIVERABLES.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-white/60">
                    <span className="text-white/40 font-bold flex-shrink-0 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        </ScrollReveal>

        {/* How I help */}
        <ScrollReveal variant="right">
        <section className="bg-navy py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">How I Help</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">
              Start with a free audit, then a scoped build
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/[0.04] rounded-2xl p-8">
                <div className="text-gold mb-5">
                  <BarChart3 className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Free AI Audit</h3>
                <p className="text-white/40 text-xs mb-4">Free · Delivered in minutes</p>
                <p className="text-white/60 text-sm leading-relaxed mb-5">
                  The sample audit on the audit page was run on a coworking operator, so you can see
                  what the output looks like for a business like yours before running your own.
                </p>
                <a href="/audit" className="text-gold text-sm font-semibold hover:underline">
                  See the free AI audit →
                </a>
              </div>
              <div className="bg-white/[0.04] rounded-2xl p-8">
                <div className="text-gold mb-5">
                  <LayoutDashboard className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Finance Dashboard + Close Automation</h3>
                <p className="text-white/40 text-xs mb-4">Scoped to your locations · Priced per project</p>
                <p className="text-white/60 text-sm leading-relaxed mb-5">
                  For when the close eats days every month and you want every location&apos;s numbers
                  in one place.
                </p>
                <a href="/work" className="text-gold text-sm font-semibold hover:underline">
                  See client work →
                </a>
              </div>
            </div>
            <p className="text-white/40 text-sm mt-8 leading-relaxed">
              Run an e-commerce brand instead? See the{" "}
              <a href="/ai-ops-dashboard-for-ecommerce-brands" className="text-gold hover:underline">
                AI ops dashboard for e-commerce brands
              </a>
              .
            </p>
          </div>
        </section>
        </ScrollReveal>

        {/* FAQ */}
        <ScrollReveal variant="fade">
        <section className="bg-[#0a1a30] py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">Common questions</h2>
            <div className="space-y-6">
              {FAQS.map((f) => (
                <div key={f.q} className="border-t border-white/[0.08] pt-6 first:border-t-0 first:pt-0">
                  <h3 className="text-white font-semibold text-base mb-2">{f.q}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        </ScrollReveal>

        <AboutFounder />
        <ServiceCTA
          heading="See where your locations are losing time"
          subheading="Free AI Audit. Quantified savings opportunities, no credit card, no signup."
        />
      </main>
      <Footer />
    </>
  );
}
