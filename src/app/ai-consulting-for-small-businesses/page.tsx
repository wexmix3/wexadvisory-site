import type { Metadata } from "next";
import { BarChart3, Zap, Users, Building2, HandCoins } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AboutFounder from "@/components/AboutFounder";
import ServiceCTA from "@/components/ServiceCTA";

const PAGE_URL = "https://www.wexadvisory.com/ai-consulting-for-small-businesses";

export const metadata: Metadata = {
  title: "AI Consulting for Small Businesses | Wex Advisory",
  description:
    "AI consulting for small businesses without the enterprise price tag. Flat-fee competitive analysis and hands-on automation — no tech team required.",
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    title: "AI Consulting for Small Businesses | Wex Advisory",
    description:
      "AI consulting for small businesses without the enterprise price tag. Flat-fee competitive analysis and hands-on automation — no tech team required.",
    url: PAGE_URL,
    siteName: "Wex Advisory",
    type: "website",
  },
};

const WHO_ITS_FOR = [
  { icon: Users, text: "Teams of 1–30 people, no dedicated IT or ops hire" },
  { icon: HandCoins, text: "Spending real hours on follow-ups, reporting, or scheduling that should run itself" },
  { icon: Building2, text: "Losing ground to competitors who are already using AI to move faster" },
];

const FAQS = [
  {
    q: "What does an AI consultant actually do, day to day?",
    a: "For a small business, it's less \"strategy deck\" and more \"here's the one workflow eating 6 hours of your week, and here's how to make it disappear.\" I audit your operations, find the highest-ROI opportunities, and either hand you a report or build the fix myself.",
  },
  {
    q: "How is this different from hiring a big consulting firm?",
    a: "Big firms price for enterprise budgets and enterprise timelines — six-figure engagements, six-month rollouts. Wex Advisory runs flat-fee reports in 24 hours and automation projects in 1–4 weeks, sized for a business that doesn't have a six-figure AI budget.",
  },
  {
    q: "Do I need to already know what AI tools I want?",
    a: "No. Most clients start with \"I know I'm behind, I don't know where to start.\" That's exactly what the free AI Snapshot audit is for — it tells you where the money actually is before you spend anything.",
  },
  {
    q: "What if my industry isn't tech-heavy?",
    a: "Most of my work is with businesses that aren't tech companies — coworking operators, service firms, retailers. The tasks that eat the most time (follow-ups, reporting, scheduling, intake) look almost identical across industries.",
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
  name: "AI Consulting for Small Businesses",
  description:
    "Flat-fee competitive analysis reports and hands-on AI workflow automation for small and mid-market businesses.",
  provider: {
    "@type": "ProfessionalService",
    name: "Wex Advisory",
    founder: { "@type": "Person", name: "Max Wexley" },
  },
  areaServed: "US",
  offers: { "@type": "Offer", price: "299", priceCurrency: "USD" },
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
              AI consulting for small businesses —{" "}
              <span className="text-gold">without the enterprise price tag</span>
            </h1>
            <p className="text-white/65 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              Most AI consulting is priced and paced for companies with a six-figure budget and an IT
              department. Wex Advisory does the same job — find where AI actually saves you money — sized
              for a business that has neither.
            </p>
            <a
              href="https://audit.wexadvisory.com/audit"
              className="inline-block bg-gold hover:bg-gold-muted text-navy font-bold text-base px-10 py-4 rounded-xl
                transition-all duration-150 hover:scale-[1.02] hover:shadow-lg hover:shadow-gold/20 active:scale-[0.99]"
            >
              Get My Free AI Snapshot →
            </a>
          </div>
        </section>

        {/* What it means */}
        <section className="bg-[#0a1a30] py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">What This Actually Means</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Forget the buzzwords
            </h2>
            <p className="text-white/65 text-base leading-relaxed mb-4">
              Most small business owners hear &ldquo;AI consulting&rdquo; and picture a team of engineers and
              a &ldquo;digital transformation roadmap&rdquo; nobody reads twice. That&apos;s enterprise AI.
              It&apos;s not what a 5-person or 25-person business needs.
            </p>
            <p className="text-white/65 text-base leading-relaxed">
              What it actually means: someone who knows the tools sits down with your real workflows, finds
              the tasks wasting the most time or money, and either hands you a data-backed report or builds
              the automation directly. No PhDs, no jargon — a PDF you can act on or a system that just works.
            </p>
          </div>
        </section>

        {/* Who it's for */}
        <section className="bg-navy py-24 px-6">
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
              implementation team, I&apos;m not the right fit — and I&apos;ll tell you that upfront.
            </p>
          </div>
        </section>

        {/* Two ways I help */}
        <section className="bg-[#0a1a30] py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">Two Ways I Help</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">
              Pick the one that matches where you're stuck
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/[0.04] rounded-2xl p-8">
                <div className="text-gold mb-5">
                  <BarChart3 className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Competitive Analysis</h3>
                <p className="text-white/40 text-xs mb-4">Starting at $299 · Delivered in 24 hours</p>
                <p className="text-white/60 text-sm leading-relaxed mb-5">
                  For when you know competitors are pulling ahead but don&apos;t have the data to prove it —
                  or fix it.
                </p>
                <a href="/#supporting" className="text-gold text-sm font-semibold hover:underline">
                  See what&apos;s in a report →
                </a>
              </div>
              <div className="bg-white/[0.04] rounded-2xl p-8">
                <div className="text-gold mb-5">
                  <Zap className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Custom AI Automation</h3>
                <p className="text-white/40 text-xs mb-4">Scoped to the work · Priced per project</p>
                <p className="text-white/60 text-sm leading-relaxed mb-5">
                  For when specific tasks — follow-ups, intake, reporting — are eating hours every week.
                </p>
                <a href="/#flagship" className="text-gold text-sm font-semibold hover:underline">
                  See what gets automated →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
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

        <AboutFounder />
        <ServiceCTA
          heading="See where AI actually saves you money"
          subheading="Free AI Snapshot audit — quantified savings opportunities, no credit card, no signup."
        />
      </main>
      <Footer />
    </>
  );
}
