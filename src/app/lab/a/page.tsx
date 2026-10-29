import type { Metadata } from "next";
import Link from "next/link";
import { Inter_Tight } from "next/font/google";
import ThreadWindow from "@/components/lab/a/ThreadWindow";
import CaseCard from "@/components/lab/a/CaseCard";
import Reveal from "@/components/lab/a/Reveal";

// Art-direction lab, Option A "Approve it" (2026-10-29, branch
// art-direction-lab). Reference lock: aios state/worksheets/refs/
// wex-art-direction/refs.md, Option A (Polar Analytics). Local only; never
// merge this route to master.
export const metadata: Metadata = {
  title: "Lab A · Wex Advisory",
  robots: { index: false, follow: false },
};

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const CALENDLY = "https://calendly.com/maxwexley-wexadvisory/30min";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";
const btnPrimary = `inline-flex items-center justify-center rounded-[6px] bg-[#C8A84B] px-5 py-3 text-[15px] font-medium text-[#0B0D10] transition-colors hover:bg-[#D6B85C] ${focusRing}`;
const btnSecondary = `inline-flex items-center justify-center rounded-[6px] border border-white/[0.14] px-5 py-3 text-[15px] font-medium text-[#F2F2F0] transition-colors hover:border-white/30 hover:bg-white/[0.04] ${focusRing}`;

const RESULTS = [
  {
    figure: "119 → 1",
    label: "wholesale accounts moved from a spreadsheet into one live dashboard at RECO",
  },
  { figure: "2,500+", label: "sales leads tracked in the same dashboard, not a second tab" },
  { figure: "5", label: "automated agents working for a two-founder team with no engineers" },
];

const PROBLEMS = [
  {
    tag: "Reporting",
    quote: "We find out last month’s margin three weeks late.",
    body: "Sales, margin and finance reports that build themselves from Shopify, Amazon and your books.",
  },
  {
    tag: "Automation",
    quote: "Wholesale follow-ups live in someone’s head.",
    body: "Agents that watch accounts, orders and the inbox, and queue the next step for you to approve.",
  },
  {
    tag: "Team",
    quote: "We bought the AI seats. Nothing changed.",
    body: "Training and assistants your team actually uses.",
  },
];

const container = "mx-auto w-full max-w-[1220px] px-4 sm:px-8";
const h2 = "text-[2rem] font-normal leading-[1.08] tracking-[-0.025em] text-[#F2F2F0] sm:text-[2.75rem]";

export default function LabAPage() {
  return (
    <div className={`${interTight.className} min-h-screen bg-[#0B0D10] text-[#F2F2F0] antialiased`}>
      {/* Page-scoped: the site body is navy; this lab page is near-black. The
          hero messages start hidden for the load-in demo; without JS show them. */}
      <style>{"body{background-color:#0B0D10}"}</style>
      <noscript>
        <style>{".la-msg{opacity:1!important;transform:none!important}"}</style>
      </noscript>

      {/* Top bar */}
      <header className="border-b border-white/[0.08]">
        <div className={`${container} flex h-16 items-center justify-between gap-4`}>
          <Link href="/" className={`flex items-center gap-2.5 rounded-[6px] ${focusRing}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/wex-icon-wa.png" alt="" width={33} height={22} className="h-[22px] w-[33px]" />
            <span className="text-[16px] font-medium tracking-[-0.01em]">Wex Advisory</span>
          </Link>
          <nav aria-label="Page" className="flex items-center gap-1 text-[14px] text-[#8A9099] sm:gap-2">
            <a href="#results" className={`hidden rounded-[6px] px-2.5 py-1.5 hover:text-[#F2F2F0] md:inline ${focusRing}`}>
              Results
            </a>
            <a href="#case" className={`hidden rounded-[6px] px-2.5 py-1.5 hover:text-[#F2F2F0] md:inline ${focusRing}`}>
              Case
            </a>
            <a href="#pricing" className={`hidden rounded-[6px] px-2.5 py-1.5 hover:text-[#F2F2F0] md:inline ${focusRing}`}>
              Pricing
            </a>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className={`ml-1 rounded-[6px] border border-white/[0.14] px-3 py-1.5 text-[#F2F2F0] hover:border-white/30 ${focusRing}`}
            >
              Book a call
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero: split copy, then the product window as the brightest object */}
        <section aria-labelledby="la-h1" className={`${container} pt-14 sm:pt-20 md:pt-24`}>
          <p className="text-[13px] text-[#8A9099]">AI automation for consumer brands · New York</p>
          <div className="mt-5 grid gap-8 md:grid-cols-12 md:items-end md:gap-10">
            <h1 data-lab
              id="la-h1"
              className="text-balance text-[2.6rem] font-normal leading-[1.02] tracking-[-0.035em] sm:text-[3.5rem] md:col-span-7 lg:text-[4.25rem]"
            >
              Stop running your brand out of a spreadsheet.
            </h1>
            <div className="md:col-span-5 md:pb-1.5 lg:pl-6">
              <p className="text-[17px] leading-[1.55] text-[#B7BCC4]">
                I build the dashboards, reporting and AI agents that pull Shopify, Amazon, wholesale and your books
                into one place, for owner-led brands with no engineering team. $200 an hour to build, with a written
                estimate before any work starts.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/audit" className={btnPrimary}>
                  Get your free AI Audit
                </Link>
                <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className={btnSecondary}>
                  Book a strategy call
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 md:mt-16">
            <ThreadWindow />
            <p className="mt-5 max-w-[640px] text-[14px] leading-relaxed text-[#8A9099]">
              Running today for RECO, a wholesale + DTC brand: 119 accounts, 2,500+ leads and 5 agents in one
              dashboard.
            </p>
          </div>
        </section>

        <Reveal>
          {/* Results */}
          <section id="results" aria-labelledby="la-results" className="mt-24 border-t border-white/[0.08] md:mt-32">
            <div className={`${container} py-20 md:py-28`}>
              <h2 id="la-results" data-words className={h2}>
                Results from client work
              </h2>
              <ul className="mt-12 grid border-t border-white/[0.08] md:grid-cols-3">
                {RESULTS.map((r, i) => (
                  <li
                    key={r.figure}
                    className={`border-b border-white/[0.08] py-8 md:border-b-0 md:py-10 ${i > 0 ? "md:border-l md:pl-8" : ""} md:pr-8`}
                  >
                    <p className="text-[3.25rem] font-light leading-none tracking-[-0.04em] tabular-nums sm:text-6xl">
                      {r.figure}
                    </p>
                    <p className="mt-4 max-w-[30ch] text-[15px] leading-snug text-[#8A9099]">{r.label}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Problems */}
          <section aria-labelledby="la-problems" className="border-t border-white/[0.08]">
            <div className={`${container} py-20 md:py-28`}>
              <h2 id="la-problems" data-words className={`${h2} max-w-[18ch]`}>
                Three problems every growing brand hits
              </h2>
              <ol className="mt-12 grid gap-4 md:grid-cols-3">
                {PROBLEMS.map((p, i) => (
                  <li
                    key={p.tag}
                    className="flex flex-col rounded-[10px] border border-white/[0.08] bg-[#12151A] p-6 sm:p-7"
                  >
                    <p className="text-[13px] text-[#8A9099]">
                      <span className="tabular-nums">0{i + 1}</span>
                      <span aria-hidden="true"> · </span>
                      {p.tag}
                    </p>
                    <p className="mt-8 text-[1.35rem] leading-[1.25] tracking-[-0.015em] text-[#F2F2F0]">
                      &ldquo;{p.quote}&rdquo;
                    </p>
                    <p className="mt-4 text-[15px] leading-relaxed text-[#8A9099]">{p.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Case */}
          <section id="case" aria-labelledby="la-case" className="border-t border-white/[0.08]">
            <div className={`${container} py-20 md:py-28`}>
              <p className="text-[13px] text-[#8A9099]">Case study</p>
              <h2 id="la-case" data-words className={`${h2} mt-3 max-w-[22ch]`}>
                RECO: one live command center for a two-founder team.
              </h2>
              <div className="mt-12 grid gap-10 md:grid-cols-12 md:items-start">
                <div className="md:col-span-7">
                  <CaseCard />
                </div>
                <div className="md:col-span-5">
                  <dl className="space-y-6 text-[15px] leading-relaxed">
                    <div className="border-t border-white/[0.08] pt-4">
                      <dt className="text-[13px] text-[#8A9099]">Problem</dt>
                      <dd className="mt-1.5 text-[#D5D8DC]">
                        119 wholesale accounts and 2,500+ sales leads lived in a Google Sheet, and there was no
                        engineering staff to build anything better.
                      </dd>
                    </div>
                    <div className="border-t border-white/[0.08] pt-4">
                      <dt className="text-[13px] text-[#8A9099]">Built</dt>
                      <dd className="mt-1.5 text-[#D5D8DC]">
                        One live dashboard, a live Shopify sync, 5 automated agents and a daily priority digest.
                      </dd>
                    </div>
                  </dl>
                  <figure className="mt-8 border-t border-white/[0.08] pt-6">
                    <blockquote className="text-[1.2rem] leading-[1.4] tracking-[-0.01em] text-[#F2F2F0]">
                      &ldquo;We were operating out of a Google Sheet, but now we have systems and tools in place to
                      ensure we are organized, efficient, and making the right decisions every day.&rdquo;
                    </blockquote>
                    <figcaption className="mt-3 text-[14px] text-[#8A9099]">Co-Founder, RECO</figcaption>
                  </figure>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing: one statement, second line dimmed (ref-polar-2) */}
          <section id="pricing" aria-labelledby="la-pricing" className="border-t border-white/[0.08]">
            <div className={`${container} py-24 text-center md:py-32`}>
              <p className="text-[13px] text-[#8A9099]">Pricing</p>
              <h2 id="la-pricing" data-words className="mx-auto mt-4 text-[2rem] font-normal leading-[1.08] tracking-[-0.025em] text-[#F2F2F0] sm:text-[3.25rem]">
                $200 an hour to build.
              </h2>
              <p className="mx-auto mt-2 max-w-[24ch] text-balance text-[2rem] font-normal leading-[1.1] tracking-[-0.025em] text-[#8A9099] sm:text-[3.25rem]">
                $150 an hour for changes after launch. A written estimate before any work starts.
              </p>
            </div>
          </section>

          {/* Close */}
          <section aria-labelledby="la-close" className="border-t border-white/[0.08]">
            <div className={`${container} flex flex-col items-center gap-5 py-20 text-center md:py-24`}>
              <h2 id="la-close" className="sr-only">
                Next step
              </h2>
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className={`${btnPrimary} px-7 py-3.5 text-[16px]`}>
                Book a free strategy call
              </a>
              <Link
                href="/audit"
                className={`rounded-[6px] px-1 text-[15px] text-[#B7BCC4] underline-offset-4 hover:text-[#F2F2F0] hover:underline ${focusRing}`}
              >
                Or run the free AI Audit (2 min) &rarr;
              </Link>
            </div>
          </section>
        </Reveal>
      </main>

      <footer className="border-t border-white/[0.08]">
        <div className={`${container} flex h-16 items-center text-[13px] text-[#8A9099]`}>
          Wex Advisory · New York
        </div>
      </footer>

      <Link
        href="/lab"
        className={`fixed bottom-4 right-4 z-50 rounded-full border border-white/[0.14] bg-[#12151A] px-3.5 py-2 text-[12px] font-medium text-[#F2F2F0] hover:border-white/30 ${focusRing}`}
      >
        Option A · Approve it
      </Link>
    </div>
  );
}
