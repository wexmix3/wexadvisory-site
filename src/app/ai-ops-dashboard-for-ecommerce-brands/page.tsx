import type { Metadata } from "next";
import { LayoutDashboard, Bot, RefreshCw, ClipboardCheck } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import AboutFounder from "@/components/AboutFounder";
import ServiceCTA from "@/components/ServiceCTA";
import { PrimaryCta } from "@/components/design-system/Cta";

const PAGE_URL = "https://www.wexadvisory.com/ai-ops-dashboard-for-ecommerce-brands";

export const metadata: Metadata = {
  title: "AI Ops Dashboard for Wholesale & DTC E-Commerce Brands | Wex Advisory",
  description:
    "Unify wholesale accounts, Shopify orders, and sales leads into one AI-powered ops dashboard. No engineering team required. See a real build + free AI Audit.",
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    title: "AI Ops Dashboard for Wholesale & DTC E-Commerce Brands | Wex Advisory",
    description:
      "Unify wholesale accounts, Shopify orders, and sales leads into one AI-powered ops dashboard. No engineering team required.",
    url: PAGE_URL,
    siteName: "Wex Advisory",
    type: "website",
  },
};

const SIGNS = [
  { icon: LayoutDashboard, text: "Wholesale accounts, sales leads, and Shopify orders live in separate spreadsheets or tabs, none of them talking to each other" },
  { icon: RefreshCw, text: "No way to tell which accounts are going quiet or which orders need attention without manually checking each source" },
  { icon: ClipboardCheck, text: "Meeting notes and inbox follow-ups fall through because nothing turns them into tracked action items automatically" },
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

const FAQS = [
  {
    q: "What does an 'AI ops dashboard' actually mean for an e-commerce brand?",
    a: "It means your wholesale accounts, sales leads, and Shopify/DTC data live in one place instead of scattered across spreadsheets and tabs, with agents watching your inbox and meeting notes so follow-ups don't fall through. It's not a generic BI tool: it's built around your actual accounts and your actual workflow.",
  },
  {
    q: "We don't have an engineering team. Can we still use this?",
    a: "That's exactly who this is built for. The founders in the case study below run their brand with zero engineers. I build and maintain the system; you use it.",
  },
  {
    q: "How long does a build like this take?",
    a: "The core dashboard and Shopify sync typically ship in the first 1-2 weeks, with automated agents layered in after. Scoped and priced per engagement, not a fixed package.",
  },
  {
    q: "Do you only work with e-commerce brands?",
    a: "No. This page describes one real engagement with a wholesale + DTC brand, but the same approach (unify scattered data, automate the follow-up work) applies across service businesses, coworking operators, and retailers. See the free AI Audit for what it looks like in your operation.",
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
  name: "AI Ops Dashboard for E-Commerce Brands",
  description:
    "Custom AI-powered ops dashboards unifying wholesale accounts, DTC orders, and sales leads for e-commerce brands without an engineering team.",
  provider: {
    "@type": "ProfessionalService",
    name: "Wex Advisory",
    founder: { "@type": "Person", name: "Max Wexley" },
  },
  areaServed: "US",
};

export default function AIOpsDashboardPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      <Nav />
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-navy py-24 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">
              AI Ops Dashboards
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              One dashboard for wholesale accounts, DTC orders, and every lead in between{" "}
              <span className="text-gold">no engineering team required</span>
            </h1>
            <p className="text-white/65 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              Most wholesale + DTC brands run on a patchwork of spreadsheets, Shopify tabs, and inbox
              threads. Wex Advisory builds the dashboard that unifies it, plus the AI agents that catch
              what falls through the cracks.
            </p>
            <PrimaryCta href="/audit">Get My Free AI Audit →</PrimaryCta>
          </div>
        </section>

        {/* Signs you need this */}
        <ScrollReveal variant="up">
        <section className="bg-[#0a1a30] py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">Sound Familiar?</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">
              The signs your ops are outgrowing your spreadsheet
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

        {/* Case study */}
        <ScrollReveal variant="up-lg">
        <section className="bg-navy py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">A Real Build</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Wholesale + DTC recovery-tools brand
            </h2>
            <p className="text-white/65 text-base leading-relaxed mb-6">
              A two-founder e-commerce brand selling recovery equipment through wholesale (gyms, schools,
              teams, retailers) and a Shopify DTC storefront. 119 wholesale accounts and 2,500+ sales leads
              were tracked in a spreadsheet with no unified view of which relationships were going quiet,
              which orders needed urgent attention, or which follow-ups were falling through. No engineering
              team of their own.
            </p>
            <p className="text-white/65 text-base leading-relaxed mb-10">
              The build unified real wholesale-account and sales-lead data with live Shopify inventory and
              order sync, then layered in automated agents (one flagging inbox and calendar follow-up gaps,
              another turning meeting notes into action items) feeding a single daily-priority queue with a
              full audit trail on every action taken.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {OUTCOMES.map((o) => (
                <div key={o.label} className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
                  <div className="text-gold text-3xl font-extrabold mb-2">{o.stat}</div>
                  <div className="text-white/50 text-xs leading-tight">{o.label}</div>
                </div>
              ))}
            </div>

            <div className="border border-white/10 rounded-xl px-6 py-5 mb-10">
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

            <blockquote className="border-l-2 border-gold/40 pl-5">
              <p className="text-white/70 italic text-base leading-relaxed">
                &ldquo;We were operating out of a Google Sheet, but now we have systems and tools in place
                to ensure we are organized, efficient, and making the right decisions every day.&rdquo;
              </p>
              <p className="text-white/30 text-xs mt-2">Co-Founder, Recovery-Tools E-Commerce Brand</p>
            </blockquote>
          </div>
        </section>
        </ScrollReveal>

        {/* How I help */}
        <ScrollReveal variant="left">
        <section className="bg-[#0a1a30] py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">How I Help</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">
              Start with a free audit, then a scoped build
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/[0.04] rounded-2xl p-8">
                <div className="text-gold mb-5">
                  <LayoutDashboard className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Free AI Audit</h3>
                <p className="text-white/40 text-xs mb-4">Free · Delivered in minutes</p>
                <p className="text-white/60 text-sm leading-relaxed mb-5">
                  For when you know your ops are scattered but don&apos;t yet know what to unify first.
                </p>
                <a href="/audit" className="text-gold text-sm font-semibold hover:underline">
                  Get your free audit →
                </a>
              </div>
              <div className="bg-white/[0.04] rounded-2xl p-8">
                <div className="text-gold mb-5">
                  <Bot className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Custom Ops Dashboard + Agents</h3>
                <p className="text-white/40 text-xs mb-4">Scoped to your data · Priced per project</p>
                <p className="text-white/60 text-sm leading-relaxed mb-5">
                  For when wholesale, DTC, and lead data need one home, plus agents watching what you
                  don&apos;t have time to.
                </p>
                <a href="/work" className="text-gold text-sm font-semibold hover:underline">
                  See the full case study →
                </a>
              </div>
            </div>
          </div>
        </section>
        </ScrollReveal>

        {/* FAQ */}
        <ScrollReveal variant="fade">
        <section className="bg-navy py-24 px-6">
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
          heading="See where your ops are leaking time and money"
          subheading="Free AI Audit. Quantified savings opportunities, no credit card, no signup."
        />
      </main>
      <Footer />
    </>
  );
}
