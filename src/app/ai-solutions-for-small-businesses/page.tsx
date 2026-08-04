import type { Metadata } from "next";
import { MessageSquare, ClipboardList, Megaphone, Search, type LucideIcon } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ServiceCTA from "@/components/ServiceCTA";

const PAGE_URL = "https://www.wexadvisory.com/ai-solutions-for-small-businesses";

export const metadata: Metadata = {
  title: "AI Solutions for Small Businesses | Wex Advisory",
  description:
    "Not sure which AI solution actually fits your business? I audit your operations, rank the options by ROI, and build the one that matters — not a list of 50 tools.",
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    title: "AI Solutions for Small Businesses | Wex Advisory",
    description:
      "Not sure which AI solution actually fits your business? I audit your operations, rank the options by ROI, and build the one that matters — not a list of 50 tools.",
    url: PAGE_URL,
    siteName: "Wex Advisory",
    type: "website",
  },
};

const CATEGORIES: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: MessageSquare,
    title: "Customer-Facing",
    desc: "Follow-up sequences, lead intake, appointment scheduling — the conversations that currently require someone to remember to send an email.",
  },
  {
    icon: ClipboardList,
    title: "Back-Office",
    desc: "Weekly reporting, invoice reminders, CRM updates — the recurring work that's rule-based enough to run without you.",
  },
  {
    icon: Megaphone,
    title: "Content & Marketing",
    desc: "Draft queues for social and email that still get a human review before anything goes out.",
  },
  {
    icon: Search,
    title: "Competitive Intelligence",
    desc: "Real traffic and positioning data on the businesses you're actually competing against — not guesswork.",
  },
];

const FAQS = [
  {
    q: "How do I know which AI solution my business actually needs?",
    a: "You usually don't, going in — and that's fine. I start with an audit of how your team actually spends its time, then rank the candidate solutions by expected hours saved, not by what's trending.",
  },
  {
    q: "Do you sell specific AI software, or is this vendor-neutral?",
    a: "Vendor-neutral. I recommend and build whatever fits your workflow and budget — the goal is the outcome (hours back, costs down), not pushing a specific product.",
  },
  {
    q: "What if I've already tried an AI tool and it didn't stick?",
    a: "Common story — usually the tool was fine but it didn't fit how the team actually works, or nobody owned the rollout. I build for adoption first: plain-language docs and a live walkthrough before handoff.",
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

export default function AISolutionsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      <Nav />
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-navy py-24 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">AI Solutions</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              AI solutions for small businesses —{" "}
              <span className="text-gold">not a list of 50 tools</span>
            </h1>
            <p className="text-white/65 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              Most &ldquo;AI solutions&rdquo; guides hand you a spreadsheet of software. You don&apos;t need
              50 tools — you need the 2 or 3 that actually fix the thing costing you the most hours.
            </p>
            <a
              href="https://audit.wexadvisory.com/audit"
              className="inline-block bg-gold hover:bg-gold-muted text-navy font-bold text-base px-10 py-4 rounded-xl
                transition-all duration-150 hover:scale-[1.02] hover:shadow-lg hover:shadow-gold/20 active:scale-[0.99]"
            >
              Find My Best-Fit Solutions →
            </a>
          </div>
        </section>

        {/* Categories */}
        <section className="bg-[#0a1a30] py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">What I Evaluate</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Four categories, one filter</h2>
            <p className="text-white/50 text-base max-w-2xl mb-14">
              Every candidate solution gets weighed against one question: how many hours does this actually
              save, this quarter, for your team specifically.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {CATEGORIES.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-white/[0.04] rounded-2xl p-8 hover:bg-white/[0.07] transition-colors">
                  <div className="text-gold mb-5">
                    <Icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-3">{title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="bg-navy py-24 px-6 border-y border-white/10">
          <div className="max-w-2xl mx-auto">
            <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">How I Pick</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">
              Audit first, tools second
            </h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-10 h-10 rounded-xl border border-gold/30 bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-gold font-bold text-sm">01</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1.5">Audit your actual workflows</h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    Free AI Snapshot maps where time and money are leaking, with a maturity score across
                    your operations.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-10 h-10 rounded-xl border border-gold/30 bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-gold font-bold text-sm">02</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1.5">Rank by ROI, not novelty</h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    Every candidate solution gets a savings estimate before you commit to anything.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-10 h-10 rounded-xl border border-gold/30 bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-gold font-bold text-sm">03</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1.5">Build or recommend — your call</h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    Take the report and run with it yourself, or have me build the top-ranked solution
                    directly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
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

        <ServiceCTA
          heading="Ready to see your best-fit solutions?"
          subheading="Free AI Snapshot audit — ranked by expected savings, no credit card, no signup."
        />
      </main>
      <Footer />
    </>
  );
}
