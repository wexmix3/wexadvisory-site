import type { Metadata } from "next";
import { FileSpreadsheet, Building2, Mail, BarChart3, LayoutDashboard } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import AboutFounder from "@/components/AboutFounder";
import ServiceCTA from "@/components/ServiceCTA";
import { PrimaryCta } from "@/components/design-system/Cta";

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
  },
};

const SIGNS = [
  { icon: FileSpreadsheet, text: "Month-end close means exporting the general ledger and reconciling it in Excel, one property at a time" },
  { icon: BarChart3, text: "Nobody can say which property is behind budget this month, or why, without a day of spreadsheet work" },
  { icon: Building2, text: "Occupancy lives in one system and financials in another, so nobody sees them side by side" },
];

const BUILT = [
  {
    icon: LayoutDashboard,
    title: "Live P&L dashboard across properties",
    body: "Every location's P&L in one place: revenue and NOI against budget, month-over-month variance flags, a six-month trend, run-rate projections for partial months, and a plain-English AI summary for each location when new data lands.",
  },
  {
    icon: Mail,
    title: "GL exports that load themselves",
    body: "The accounting system (Yardi, in the build below) already emails daily general ledger exports. A watcher picks them up and loads them into the dashboard. Nobody downloads, renames or forwards a file.",
  },
  {
    icon: FileSpreadsheet,
    title: "Month-end packets per property",
    body: "A close packet for each location, built from the same data: income statement against budget, balance sheet, cash flow, AR and AP aging, and occupancy. Delivered as a PDF and an Excel workbook.",
  },
  {
    icon: Building2,
    title: "Occupancy next to the financials",
    body: "Occupancy pulled daily for every location, backfilled for prior months and locked automatically at month end, so the close numbers don't drift.",
  },
];

const DELIVERABLES = [
  "Live financial dashboard rolling up all 5 locations, refreshed daily",
  "GL check that flags entries breaking per-account rules before the close",
  "Automatic ingestion of the daily GL exports the accounting system already emails",
  "Month-end financial packet per location, in PDF and Excel",
  "Daily occupancy tracking with historical backfill and month-end lock",
];

const OUTCOMES = [
  { stat: "5", label: "Locations in one dashboard" },
  { stat: "Daily", label: "GL and occupancy refresh" },
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
    a: "No. The build reads what your systems already produce. In the engagement on this page, Yardi kept running exactly as before, and the dashboard picks up the GL exports it already emails every day.",
  },
  {
    q: "Have you built this for a real estate operator?",
    a: "Yes. 25N Coworking runs five locations across Chicago and Dallas-Fort Worth, and I built their finance dashboard, GL check, month-end packets and occupancy tracking. Coworking is my deepest real estate work so far, so it's the example on this page.",
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
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-navy py-24 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">AI for Property Management</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              AI for property management:{" "}
              <span className="text-gold">every property&apos;s numbers, without the spreadsheet marathon</span>
            </h1>
            <p className="text-white/65 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              I build finance and operations systems for multi-location property operators. One live
              dashboard across every location, month-end packets that build themselves, and occupancy
              next to the numbers it drives.
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
              Where property operators lose the most time
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              What AI for property management looks like in practice
            </h2>
            <p className="text-white/65 text-base leading-relaxed mb-10">
              Most of the time a property team loses goes to the same few jobs: pulling reports, checking
              the ledger, building the close, and chasing occupancy. These four systems take those jobs
              over. They sit on top of the software you already run, so nothing gets replaced.
            </p>
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
              25N Coworking: five locations, one dashboard
            </h2>
            <p className="text-white/65 text-base leading-relaxed mb-6">
              25N runs five coworking locations across the Chicago and Dallas-Fort Worth metro areas. The
              finance team was reconciling general ledger exports in Excel location by location, with no
              single view of occupancy or how each location stood against budget.
            </p>
            <p className="text-white/65 text-base leading-relaxed mb-10">
              I started with a competitive analysis for the leadership team, delivered 9 hours after
              kickoff. Then I built the finance side: a live dashboard fed from the daily GL exports their
              accounting system already sends, a rules-based GL check that flags problem entries before
              the close, a month-end financial packet for each location, and occupancy pulled daily. The
              finance team reviewed every round, and their feedback went straight back into the build.
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
                  For when you know the reporting eats your team&apos;s week but don&apos;t yet know what to
                  automate first.
                </p>
                <a href="/audit" className="text-gold text-sm font-semibold hover:underline">
                  Get your free AI audit →
                </a>
              </div>
              <div className="bg-white/[0.04] rounded-2xl p-8">
                <div className="text-gold mb-5">
                  <LayoutDashboard className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Finance Dashboard + Close Automation</h3>
                <p className="text-white/40 text-xs mb-4">Scoped to your properties · Priced per project</p>
                <p className="text-white/60 text-sm leading-relaxed mb-5">
                  For when the close eats days every month and you want every property&apos;s numbers in
                  one place.
                </p>
                <a href="/work" className="text-gold text-sm font-semibold hover:underline">
                  See client work →
                </a>
              </div>
            </div>
            <p className="text-white/40 text-sm mt-8 leading-relaxed">
              Want to talk it through first? See how I work as an{" "}
              <a href="/ai-consulting-for-small-businesses" className="text-gold hover:underline">
                AI consultant for small business
              </a>
              , or read about{" "}
              <a href="/ai-for-coworking-spaces" className="text-gold hover:underline">
                AI for coworking spaces
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">Questions about AI for property management</h2>
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
          heading="See where your properties are losing time"
          subheading="Free AI Audit. Quantified savings opportunities, no credit card, no signup."
        />
      </main>
      <Footer />
    </>
  );
}
