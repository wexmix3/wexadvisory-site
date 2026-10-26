import type { Metadata } from "next";
import { BarChart3, Zap, Users, Building2, HandCoins } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import AboutFounder from "@/components/AboutFounder";
import ServiceCTA from "@/components/ServiceCTA";
import { PrimaryCta } from "@/components/design-system/Cta";

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
  { icon: Users, text: "Teams of 1–30 people, no dedicated IT or ops hire" },
  { icon: HandCoins, text: "Spending real hours on follow-ups, reporting, or scheduling that should run itself" },
  { icon: Building2, text: "Losing ground to competitors who are already using AI to move faster" },
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
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-navy py-24 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">AI Consulting</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              An AI consultant for small business,{" "}
              <span className="text-gold">without the enterprise price tag</span>
            </h1>
            <p className="text-white/65 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              AI consulting for small businesses is hands-on help finding the tasks that waste the most
              hours, choosing the right tools for them, building the automation, and training your team to
              run it. Most consultants charge $100 to $300 an hour. I charge ${BUILD_RATE_USD} for new builds, quote
              every project before work starts, and the first step, an AI audit, is free.
            </p>
            <PrimaryCta href="/audit">Get My Free AI Audit →</PrimaryCta>
          </div>
        </section>

        {/* What it includes */}
        <ScrollReveal variant="up">
        <section className="bg-[#0a1a30] py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">What This Actually Means</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              What AI consulting for small businesses actually includes
            </h2>
            <p className="text-white/65 text-base leading-relaxed mb-10">
              Most small business owners hear &ldquo;AI consulting&rdquo; and picture a team of engineers and
              a &ldquo;digital transformation roadmap&rdquo; nobody reads twice. That&apos;s enterprise AI.
              For a 5-person or 25-person business, it comes down to four things.
            </p>
            <ol className="space-y-7">
              {WHAT_IT_INCLUDES.map((item, i) => (
                <li key={item.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0 text-gold font-bold text-sm">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
                    <p className="text-white/60 text-base leading-relaxed">{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="text-white/65 text-base leading-relaxed mt-10">
              Most work starts with the{" "}
              <a href="/audit" className="text-gold hover:underline">
                free AI audit
              </a>
              . It doubles as an AI readiness assessment: it scores your business on five dimensions of AI
              maturity and ranks the workflows worth automating by estimated annual savings. From there,
              you decide whether to run with it yourself or have me build the top item.
            </p>
          </div>
        </section>
        </ScrollReveal>

        {/* Cost */}
        <ScrollReveal variant="up">
        <section className="bg-navy py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">What It Costs</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              What AI consulting for small businesses costs in 2026
            </h2>
            <p className="text-white/65 text-base leading-relaxed mb-8">
              AI consultants sell their time four ways. The middle column is the range other firms publish
              for small-business work this year. The right column is what I charge.
            </p>
            <div className="overflow-x-auto rounded-2xl bg-white/[0.04]">
              <table className="w-full text-left text-xs md:text-sm">
                <thead>
                  <tr className="text-white/60 text-xs uppercase tracking-wider">
                    <th scope="col" className="font-semibold px-3 md:px-6 py-4">How it&apos;s sold</th>
                    <th scope="col" className="font-semibold px-3 md:px-6 py-4">Typical range</th>
                    <th scope="col" className="font-semibold px-3 md:px-6 py-4 text-gold">Wex Advisory</th>
                  </tr>
                </thead>
                <tbody>
                  {COST_ROWS.map((row) => (
                    <tr key={row.kind} className="border-t border-white/[0.08] align-top">
                      <th scope="row" className="font-semibold text-white px-3 md:px-6 py-4">{row.kind}</th>
                      <td className="text-white/60 px-3 md:px-6 py-4">{row.market}</td>
                      <td className="text-white font-semibold px-3 md:px-6 py-4">{row.wex}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-white/65 text-base leading-relaxed mt-8">
              Every project is scoped and quoted in hours before any work starts, so you know the number
              up front. Once a build is running, maintenance is ${MAINTENANCE_RATE_USD} an hour. If a project
              needs ongoing work every month, the retainer depends on the project and is quoted up front
              too.
            </p>
            <p className="text-white/65 text-base leading-relaxed mt-4">
              For a line-by-line breakdown of setup costs, see{" "}
              <a href="/blog/how-much-does-ai-automation-setup-cost" className="text-gold hover:underline">
                How much does AI automation setup cost?
              </a>
            </p>
          </div>
        </section>
        </ScrollReveal>

        {/* Where it pays back first */}
        <ScrollReveal variant="left">
        <section className="bg-[#0a1a30] py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">Where To Start</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">
              Where AI pays back first in a small business
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {PAYS_BACK_FIRST.map((item) => (
                <div key={item.title} className="bg-white/[0.04] rounded-2xl p-6">
                  <h3 className="text-white font-bold text-base mb-2">{item.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border border-gold/30 bg-gold/[0.06] p-6">
              <h3 className="text-gold font-bold text-base mb-2">The payback check</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Divide the project cost by what it saves each month. Example: a 20-hour build is $
                {(20 * BUILD_RATE_USD).toLocaleString("en-US")}. If it removes 6 hours a week of work
                worth $40 an hour, that&apos;s about $1,040 a month, so it pays for itself in roughly four
                months. If the math doesn&apos;t work on paper, don&apos;t build it.
              </p>
            </div>
          </div>
        </section>
        </ScrollReveal>

        {/* Before you hire */}
        <ScrollReveal variant="up">
        <section className="bg-navy py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">Before You Hire Anyone</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">
              What to check before hiring an AI consultant
            </h2>
            <ul className="space-y-4">
              {BEFORE_YOU_HIRE.map((text) => (
                <li key={text} className="flex items-start gap-4">
                  <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" aria-hidden="true" />
                  <p className="text-white/70 text-base leading-relaxed">{text}</p>
                </li>
              ))}
            </ul>
            <p className="text-white/40 text-sm mt-8 leading-relaxed">
              These apply to me too. Ask me all four.
            </p>
          </div>
        </section>
        </ScrollReveal>

        {/* Who it's for */}
        <ScrollReveal variant="right">
        <section className="bg-[#0a1a30] py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">Who This Is For</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">
              Built for operators, not enterprises
            </h2>
            <div className="space-y-5">
              {WHO_ITS_FOR.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-gold" strokeWidth={1.5} />
                  </div>
                  <p className="text-white/70 text-base leading-relaxed pt-2">{text}</p>
                </div>
              ))}
            </div>
            <p className="text-white/40 text-sm mt-8 leading-relaxed">
              If you&apos;re a Fortune 500 company looking for an AI governance program and a 12-person
              implementation team, I&apos;m not the right fit, and I&apos;ll tell you that upfront.
            </p>
          </div>
        </section>
        </ScrollReveal>

        {/* How I help */}
        <ScrollReveal variant="left">
        <section className="bg-navy py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">How I Help</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">
              Start with a free audit, then a scoped engagement
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/[0.04] rounded-2xl p-8">
                <div className="text-gold mb-5">
                  <BarChart3 className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Free AI Audit</h3>
                <p className="text-white/40 text-xs mb-4">Free · Delivered in minutes</p>
                <p className="text-white/60 text-sm leading-relaxed mb-5">
                  For when you know you&apos;re behind but don&apos;t yet know where the highest-ROI
                  opportunity is.
                </p>
                <a href="/audit" className="text-gold text-sm font-semibold hover:underline">
                  Get your free audit →
                </a>
              </div>
              <div className="bg-white/[0.04] rounded-2xl p-8">
                <div className="text-gold mb-5">
                  <Zap className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Custom AI Automation</h3>
                <p className="text-white/40 text-xs mb-4">
                  ${BUILD_RATE_USD} an hour for new builds · Quoted before work starts
                </p>
                <p className="text-white/60 text-sm leading-relaxed mb-5">
                  For when specific tasks (follow-ups, intake,{" "}
                  <a href="/automated-reporting" className="text-gold hover:underline">
                    reporting
                  </a>
                  , competitive research) are eating hours every week.
                </p>
                <a href="/#services" className="text-gold text-sm font-semibold hover:underline">
                  See what gets automated →
                </a>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mt-8 max-w-2xl">
              Work is usually scoped to an industry or a team. If you run property
              management, see{" "}
              <a href="/ai-for-property-management" className="text-gold hover:underline">
                AI for property management
              </a>
              . If you run a law firm, see{" "}
              <a href="/ai-automation-for-law-firms" className="text-gold hover:underline">
                AI for law firms
              </a>
              . If you sell wholesale and DTC, see{" "}
              <a href="/ai-ops-dashboard-for-ecommerce-brands" className="text-gold hover:underline">
                AI for ecommerce operations
              </a>
              . If the gap is your team rather than your tooling, see{" "}
              <a href="/ai-training-for-small-businesses" className="text-gold hover:underline">
                AI training for employees
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">
              Questions about hiring an AI consultant
            </h2>
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
          heading="See where AI actually saves you money"
          subheading="Free AI Audit. Quantified savings opportunities, no credit card, no signup."
        />
      </main>
      <Footer />
    </>
  );
}
