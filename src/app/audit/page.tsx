import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Eyebrow from "@/components/design-system/Eyebrow";
import GlassCard from "@/components/design-system/GlassCard";
import { PrimaryCta, SecondaryCta } from "@/components/design-system/Cta";

export const metadata: Metadata = {
  title: "Free AI Opportunity Audit — Wex Advisory",
  description:
    "Get a free AI audit for your business. See quantified savings opportunities, automation recommendations, and a full PDF report — no signup needed.",
  alternates: {
    canonical: "https://www.wexadvisory.com/audit",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Free AI Opportunity Audit — Wex Advisory",
    description:
      "Get a free AI audit for your business. See quantified savings opportunities, automation recommendations, and a full PDF report — no signup needed.",
    url: "https://www.wexadvisory.com/audit",
    siteName: "Wex Advisory",
    type: "website",
  },
};

const AUDIT_URL = "https://audit.wexadvisory.com/audit";

const WHAT_YOU_GET = [
  "5 AI maturity scores across key areas of your business",
  "Top automation opportunities ranked by annual savings",
  "Full labor math: hours × rate × automation ceiling",
  "Implementation roadmap with specific tool recommendations",
  "PDF report delivered to your inbox",
];

const SCORES = [
  { label: "AI Readiness", score: 42, color: "#C8A84B" },
  { label: "Automation Opp.", score: 71, color: "#22c55e" },
  { label: "Data Visibility", score: 28, color: "#ef4444" },
  { label: "Revenue Accel.", score: 55, color: "#C8A84B" },
  { label: "Overall Maturity", score: 49, color: "#C8A84B" },
];

const RADIUS = 26;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const STEPS = [
  {
    num: "01",
    title: "Enter your business URL",
    desc: "Paste your website address and business email. 30 seconds — no signup, no credit card.",
  },
  {
    num: "02",
    title: "AI analyzes your operations",
    desc: "Claude reads your site, job postings, and reviews to identify exactly where AI can save you time and money.",
  },
  {
    num: "03",
    title: "PDF delivered to your inbox",
    desc: "A full report with specific tools, savings estimates, and a prioritized implementation roadmap — delivered in minutes.",
  },
];

function ScoreRing({ label, score, color }: { label: string; score: number; color: string }) {
  const offset = CIRCUMFERENCE - (score / 100) * CIRCUMFERENCE;
  return (
    <div className="text-center">
      <div className="relative w-16 h-16 mx-auto mb-2">
        <svg className="transform -rotate-90" width="64" height="64">
          <circle cx="32" cy="32" r={RADIUS} fill="none" stroke="#1e293b" strokeWidth="6" />
          <circle
            cx="32"
            cy="32"
            r={RADIUS}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white font-bold text-sm">{score}</span>
        </div>
      </div>
      <div className="text-white/40 text-xs leading-tight max-w-[72px] mx-auto">{label}</div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="flex-shrink-0 mt-0.5"
    >
      <circle cx="8" cy="8" r="8" fill="#C8A84B" fillOpacity="0.15" />
      <path
        d="M4.5 8.5L6.5 10.5L11.5 5.5"
        stroke="#C8A84B"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AuditPage() {
  return (
    <>
      <Nav />
      <main className="pt-20">

        {/* Hero */}
        <section className="bg-[#0A1226] py-24 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
              See exactly where AI saves{" "}
              <span className="text-gold">your business money</span>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              Free AI audit — specific automation opportunities, labor cost math,
              and tool recommendations. PDF delivered to your inbox in minutes.
              No credit card, no signup.
            </p>
            <PrimaryCta href={AUDIT_URL}>Analyze My Business →</PrimaryCta>
            <p className="text-white/30 text-sm mt-4">
              PDF report emailed to you · Tailored to your industry
            </p>
          </div>
        </section>

        {/* What you get */}
        <ScrollReveal>
          <section className="bg-[#0A1226] py-24 px-6 border-t border-white/5">
            <div className="max-w-5xl mx-auto grid md:grid-cols-[5fr_7fr] gap-10 items-center">

              {/* Left: copy */}
              <div>
                <Eyebrow>What You Get</Eyebrow>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  A full AI opportunity report — not a generic checklist
                </h2>
                <ul className="space-y-4">
                  {WHAT_YOU_GET.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-white/60 text-sm leading-relaxed">
                      <CheckIcon />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: sample output card */}
              <GlassCard className="p-8">
                <div className="text-white/30 text-xs font-medium uppercase tracking-wider mb-5">
                  Sample Output — 25-person services firm
                </div>
                <div className="text-center mb-7">
                  <div className="text-white/40 text-xs mb-1">Estimated Annual Savings Potential</div>
                  <div className="text-gold text-5xl font-extrabold">$312K</div>
                  <div className="text-white/30 text-xs mt-1">across 6 identified automation opportunities</div>
                </div>
                <div className="flex justify-center gap-4 flex-wrap">
                  {SCORES.map((s) => (
                    <ScoreRing key={s.label} {...s} />
                  ))}
                </div>
                <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-xs text-white/25">
                  <span>Powered by Claude AI</span>
                  <span>audit.wexadvisory.com</span>
                </div>
              </GlassCard>
            </div>
          </section>
        </ScrollReveal>

        {/* How it works — vertical stacked flow */}
        <ScrollReveal>
          <section className="bg-[#0A1226] py-24 px-6 border-t border-white/5">
            <div className="max-w-2xl mx-auto">
              <Eyebrow>How It Works</Eyebrow>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-14">
                Three steps. Two minutes. Zero guesswork.
              </h2>
              <div className="space-y-0">
                {STEPS.map((step, i) => (
                  <div key={step.num} className="flex gap-8">
                    {/* Left: number + connector line */}
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-xl border border-gold/30 bg-gold/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-gold font-bold text-sm">{step.num}</span>
                      </div>
                      {i < STEPS.length - 1 && (
                        <div className="w-px flex-1 bg-gold/15 my-2" />
                      )}
                    </div>
                    {/* Right: content */}
                    <div className={i < STEPS.length - 1 ? "pb-10" : ""}>
                      <h3 className="text-white font-bold text-lg mb-2 mt-1.5">{step.title}</h3>
                      <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Final CTA */}
        <ScrollReveal>
          <section className="bg-[#0A1226] py-24 px-6 border-t border-white/5">
            <div className="max-w-xl mx-auto text-center">
              <Eyebrow>Free · Instant</Eyebrow>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to see your number?
              </h2>
              <p className="text-white/60 text-base leading-relaxed mb-8">
                Free. No credit card. PDF in your inbox in under 3 minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <PrimaryCta href={AUDIT_URL}>Analyze My Business →</PrimaryCta>
                <SecondaryCta
                  href="https://calendly.com/maxwexley-wexadvisory/free-strategy-call"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Prefer to talk first? Book a call
                </SecondaryCta>
              </div>
            </div>
          </section>
        </ScrollReveal>

      </main>
      <Footer />
    </>
  );
}
