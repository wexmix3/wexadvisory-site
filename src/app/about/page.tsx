import type { Metadata } from "next";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Eyebrow from "@/components/design-system/Eyebrow";
import { PrimaryCta, SecondaryCta } from "@/components/design-system/Cta";

// Added 2026-10-29 (Tenex teardown): /about was a 404 and the founder copy was
// two sentences. For a one-person firm the founder is the product, so this page
// carries the story. Every build listed is a real system; client facts match
// /work and the homepage case rows, and 25N stays in past tense (ended 10-19).
const PAGE_URL = "https://www.wexadvisory.com/about";
const CALENDLY = "https://calendly.com/maxwexley-wexadvisory/30min";
const TITLE = "About Max Wexley | Wex Advisory";
const DESCRIPTION =
  "Max Wexley builds dashboards, reporting and AI agents for owner-led consumer brands. Finance background, New York, and every system built by the person you talk to.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "Wex Advisory",
    type: "profile",
    images: [{ url: "/api/og", width: 1200, height: 630, alt: TITLE }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url: PAGE_URL,
  name: TITLE,
  mainEntity: { "@id": "https://www.wexadvisory.com/#max-wexley" },
};

const BUILDS = [
  {
    h: "RECO's operations dashboard",
    p: "A wholesale + DTC brand run by two founders with no engineers. 119 wholesale accounts and 2,500+ sales leads moved out of a Google Sheet into one dashboard, with a Shopify sync, five automated agents and a daily digest of what needs attention. Still in daily use.",
  },
  {
    h: "A month-end close for five locations",
    p: "For 25N Coworking: a GL check, a finance dashboard and a PDF and Excel packet for every location. The first deliverable, a competitive analysis, shipped 9 hours after kickoff.",
  },
  {
    h: "Tools anyone can start with",
    p: "A free AI Audit, a $299 competitor report, a card fee check and a supplier invoice check. Each one runs on the same pipelines I build for clients.",
  },
];

const PRINCIPLES = [
  {
    h: "You talk to the person who builds it",
    p: "No account manager and no handoff to a junior team. I scope it, build it and support it.",
  },
  {
    h: "The price is written down first",
    p: "$200 an hour to build and $150 an hour for changes after launch. You get a written estimate before any work starts.",
  },
  {
    h: "It runs on your tools and your accounts",
    p: "I build on what you already use and on accounts you own, so nothing stops working if we stop working together.",
  },
  {
    h: "Your team can run it without me",
    p: "Every handoff includes a recorded walkthrough, a written guide and a quarterly refresher.",
  },
];

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <main className="bg-[#0A1226]">
        <section className="pt-32 md:pt-40 pb-16 px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-[280px_1fr] gap-10 md:gap-14 items-start">
            <div className="relative w-full max-w-[280px] aspect-[4/5] rounded-2xl overflow-hidden border border-white/10">
              <Image
                src="/headshot.jpg"
                alt="Max Wexley, founder of Wex Advisory"
                fill
                priority
                className="object-cover object-top"
                sizes="280px"
              />
            </div>
            <div>
              <Eyebrow>About</Eyebrow>
              <h1 className="font-display text-[#f5f5f2] font-bold leading-[1.08] tracking-[-0.01em] text-[clamp(2.2rem,5vw,3.5rem)] mb-6 text-balance">
                I&apos;m Max Wexley. I build the systems myself.
              </h1>
              <div className="space-y-4 text-white/80 text-lg leading-relaxed">
                <p>
                  My background is in finance, and I taught myself to build software. Finance is
                  where most of a business&apos;s hand-built work piles up, so that&apos;s where I
                  started automating.
                </p>
                <p>
                  Wex Advisory is that work, for owner-led consumer brands. A brand&apos;s numbers
                  live in Shopify, Amazon, a wholesale sheet and the books, and almost never in one
                  place. Most brands at this size have no engineers, so the joining-up is done by
                  the founders at night. I build the dashboards, reports and agents that do it for
                  them.
                </p>
                <p>
                  I&apos;m based in New York and studied at the University of Michigan.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-9">
                <PrimaryCta href={CALENDLY} target="_blank" rel="noopener noreferrer">
                  Book a 30-minute call
                </PrimaryCta>
                <SecondaryCta href="/work" className="text-base py-3.5">
                  See the work
                </SecondaryCta>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-6 border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <Eyebrow>What I&apos;ve built</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 text-balance">
              Systems I&apos;ve built
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {BUILDS.map((b) => (
                <div key={b.h} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                  <h3 className="text-white font-semibold text-lg mb-2">{b.h}</h3>
                  <p className="text-white/70 text-[15px] leading-relaxed">{b.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-6 border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <Eyebrow>How I work</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 text-balance">
              Four things you can hold me to
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {PRINCIPLES.map((p) => (
                <div key={p.h} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                  <h3 className="text-white font-semibold text-lg mb-2">{p.h}</h3>
                  <p className="text-white/70 text-[15px] leading-relaxed">{p.p}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-x-6 mt-10 text-sm font-semibold">
              <a
                href="https://www.linkedin.com/in/max-wexley"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center min-h-11 text-gold hover:underline underline-offset-4"
              >
                LinkedIn →
              </a>
              <a
                href="https://x.com/wexadvisory"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center min-h-11 text-gold hover:underline underline-offset-4"
              >
                X →
              </a>
              <a
                href="mailto:max@wexadvisory.com"
                className="inline-flex items-center min-h-11 text-gold hover:underline underline-offset-4"
              >
                max@wexadvisory.com →
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
