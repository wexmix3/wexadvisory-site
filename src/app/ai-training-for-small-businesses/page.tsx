import type { Metadata } from "next";
import { MonitorPlay, GraduationCap, type LucideIcon } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ServiceCTA from "@/components/ServiceCTA";
import { PrimaryCta } from "@/components/design-system/Cta";

const PAGE_URL = "https://www.wexadvisory.com/ai-training-for-small-businesses";

export const metadata: Metadata = {
  title: "AI Training for Employees | Wex Advisory",
  description:
    "AI training for employees at small businesses. Live, hands-on sessions on the tools your team already uses, $200/hour, scoped to your stack.",
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    title: "AI Training for Employees | Wex Advisory",
    description:
      "AI training for employees at small businesses. Live, hands-on sessions on the tools your team already uses, $200/hour, scoped to your stack.",
    url: PAGE_URL,
    siteName: "Wex Advisory",
    type: "website",
  },
};

const CATEGORIES: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: MonitorPlay,
    title: "Tool Walkthroughs",
    desc: "Live sessions on the exact tools and systems already built for your team: how to use them, troubleshoot them, and get the most out of what's already running.",
  },
  {
    icon: GraduationCap,
    title: "AI Literacy Basics",
    desc: "Hands-on sessions for non-technical staff: how to actually use AI day-to-day, not a lecture on what AI is.",
  },
];

const FAQS = [
  {
    q: "What does AI training for employees cover?",
    a: "It depends on what your team runs. Sessions are either a live walkthrough of tools already built for your team, or a hands-on AI literacy session that teaches non-technical staff how to use AI day to day. Every session is built around your actual stack, not a generic curriculum.",
  },
  {
    q: "Do our employees need a technical background?",
    a: "No. The AI literacy sessions are built for non-technical staff. They work through real tasks on the tools they already use, not a lecture on what AI is.",
  },
  {
    q: "How much does AI training for employees cost?",
    a: "$200/hour, scoped to your team size and what you actually run. There's no package pricing and no per-seat fee.",
  },
  {
    q: "What do employees keep after the session?",
    a: "Docs and a recording of the session. The team has something to go back to, so the value doesn't stop when the session ends.",
  },
  {
    q: "How is training different from consulting?",
    a: "Consulting is me building the thing and handing it over: an automation, a system, a website. Training is teaching your team to run the tools themselves. Most clients end up using a mix of both.",
  },
];

const jsonLdService = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI Training for Employees",
  alternateName: "AI Training for Small Businesses",
  serviceType: "AI training for employees",
  url: PAGE_URL,
  description:
    "Live AI training for employees at small businesses. Hands-on sessions on the tools they actually use, $200/hour, scoped to their real stack.",
  // Reference the sitewide ProfessionalService (layout.tsx) instead of
  // re-declaring it, so the org and founder appear once per page.
  provider: { "@id": "https://www.wexadvisory.com/#organization" },
  areaServed: [
    { "@type": "City", name: "New York" },
    { "@type": "Country", name: "United States" },
  ],
};

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function AITrainingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      <Nav />
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-navy py-24 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">AI Training</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              AI training for employees,{" "}
              <span className="text-gold">taught on the tools they actually use</span>
            </h1>
            <p className="text-white/65 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              Most AI training for employees is a generic webinar that doesn&apos;t map to how your team
              works. I run live, hands-on sessions scoped to your real stack, so your team walks out able to
              use it, not just having watched a demo.
            </p>
            <PrimaryCta href="/audit">Get My Free AI Audit →</PrimaryCta>
          </div>
        </section>

        {/* Categories */}
        <ScrollReveal variant="up">
        <section className="bg-[#0a1a30] py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">What I Teach</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Two formats of AI training for employees</h2>
            <p className="text-white/50 text-base max-w-2xl mb-14">
              No generic curriculum. Every session is built around what your team actually runs, and it
              works for staff who have never used AI at work before.
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
        </ScrollReveal>

        {/* Process */}
        <ScrollReveal variant="left">
        <section className="bg-navy py-24 px-6 border-y border-white/10">
          <div className="max-w-2xl mx-auto">
            <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">How It Works</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">
              How AI training for employees works
            </h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-10 h-10 rounded-xl border border-gold/30 bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-gold font-bold text-sm">01</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1.5">Scope the session</h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    $200/hour, built around your team and your stack. No generic curriculum, no per-seat fees.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-10 h-10 rounded-xl border border-gold/30 bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-gold font-bold text-sm">02</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1.5">Live, hands-on workshop</h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    In-person or virtual, working through real tasks on the actual tools you use, not a slide deck.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-10 h-10 rounded-xl border border-gold/30 bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-gold font-bold text-sm">03</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1.5">Docs + recording handoff</h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    Walk away with something to reference later, so the value doesn&apos;t evaporate when the session ends.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        </ScrollReveal>

        {/* FAQ */}
        <ScrollReveal variant="fade">
        <section className="bg-[#0a1a30] py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">Questions about AI training for employees</h2>
            <div className="space-y-6">
              {FAQS.map((f) => (
                <div key={f.q} className="border-t border-white/[0.08] pt-6 first:border-t-0 first:pt-0">
                  <h3 className="text-white font-semibold text-base mb-2">{f.q}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
            <p className="text-white/40 text-sm mt-8 leading-relaxed">
              Rather have the tools built for you? Start with a{" "}
              <a href="/audit" className="text-gold hover:underline">
                free AI audit
              </a>
              , or see how I work as an{" "}
              <a href="/ai-consulting-for-small-businesses" className="text-gold hover:underline">
                AI consultant for small business
              </a>
              .
            </p>
          </div>
        </section>
        </ScrollReveal>

        <ServiceCTA
          heading="Ready to get your team trained on AI?"
          subheading="$200/hour, scoped to your actual stack. No signup needed to start."
        />
      </main>
      <Footer />
    </>
  );
}
