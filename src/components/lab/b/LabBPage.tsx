"use client";

import { useWordReveal } from "@/components/lab/motion";
import styles from "./labb.module.css";
import SheetHero from "./SheetHero";
import CaseCard from "./CaseCard";

// Option B, "The sheet sorts itself" (refs.md lock, primary ref Rows). Warm
// off-white canvas, navy ink for all type, gold only where selection or an
// action happens, one pale-gold band (the problems section).
const CALENDLY = "https://calendly.com/maxwexley-wexadvisory/30min";

const RESULTS = [
  { figure: "119 → 1", label: "wholesale accounts moved from a spreadsheet into one live dashboard at RECO", cell: "B2" },
  { figure: "2,500+", label: "sales leads tracked in the same dashboard, not a second tab", cell: "B3" },
  { figure: "5", label: "automated agents working for a two-founder team with no engineers", cell: "B4" },
];

const PROBLEMS = [
  {
    num: "01",
    tag: "Reporting",
    quote: "We find out last month's margin three weeks late.",
    body: "Sales, margin and finance reports that build themselves from Shopify, Amazon and your books.",
  },
  {
    num: "02",
    tag: "Automation",
    quote: "Wholesale follow-ups live in someone's head.",
    body: "Agents that watch accounts, orders and the inbox, and queue the next step for you to approve.",
  },
  {
    num: "03",
    tag: "Team",
    quote: "We bought the AI seats. Nothing changed.",
    body: "Training and assistants your team actually uses.",
  },
];

const PRICES = [
  { item: "Build", rate: "$200 / hr" },
  { item: "Changes after launch", rate: "$150 / hr" },
  { item: "Estimate", rate: "Written, before any work" },
];

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className={`${styles.mono} text-[12px] uppercase tracking-[0.14em] text-[color:var(--muted)] mb-4`}>
      {children}
    </p>
  );
}

export default function LabBPage() {
  const scope = useWordReveal<HTMLElement>();
  const mono = styles.mono;

  return (
    <main ref={scope} className={styles.root}>
      {/* Top bar */}
      <header className="px-4 sm:px-8">
        <div className="mx-auto max-w-[1180px] h-16 flex items-center justify-between gap-4">
          <a href="/" className={`${styles.focus} flex items-center gap-2.5 rounded`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/wex-icon-wa.png" alt="" width={40} height={27} className="h-7 w-auto" />
            <span className="text-[17px] font-bold tracking-[-0.01em]">Wex Advisory</span>
          </a>
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className={`${styles.focus} ${mono} text-[13px] underline-offset-4 hover:underline rounded`}>
            Book a call
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="px-4 sm:px-8 pt-14 sm:pt-20 pb-16 sm:pb-24">
        <div className="mx-auto max-w-[920px] text-center">
          <p className={`${mono} text-[12px] sm:text-[13px] text-[color:var(--muted)] mb-6`}>
            AI automation for consumer brands · New York
          </p>
          <h1 data-lab className={`${styles.h1} text-balance`}>Stop running your brand out of a spreadsheet.</h1>
          <p className={`${mono} mt-7 mx-auto max-w-[760px] text-[14.5px] sm:text-[16px] leading-[1.65]`}>
            I build the dashboards, reporting and AI agents that pull Shopify, Amazon, wholesale and your books into
            one place, for owner-led brands with no engineering team. $200 an hour to build, with a written estimate
            before any work starts.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="/audit" className={`${styles.btnPrimary} ${styles.focus} w-full sm:w-auto`}>
              Get your free AI Audit
            </a>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className={`${styles.btnGhost} ${styles.focus} w-full sm:w-auto`}>
              Book a strategy call
            </a>
          </div>
          <p className={`${mono} mt-8 mx-auto max-w-[620px] text-[12.5px] leading-relaxed text-[color:var(--muted)] text-balance`}>
            Running today for RECO, a wholesale + DTC brand: 119 accounts, 2,500+ leads and 5 agents in one dashboard.
          </p>
        </div>

        <div className="mt-14 sm:mt-16">
          <SheetHero />
        </div>
      </section>

      {/* Results */}
      <section className="px-4 sm:px-8 py-20 sm:py-28 border-t border-[color:var(--grid)]">
        <div className="mx-auto max-w-[1180px]">
          <Kicker>Proof, not promises</Kicker>
          <h2 data-words className={`${styles.h2} max-w-[760px]`}>
            Results from client work
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {RESULTS.map((r) => (
              <a
                key={r.figure}
                href="#case"
                className={`${styles.card} ${styles.focus} group block p-6 sm:p-7 hover:border-[color:var(--ink)] transition-colors`}
              >
                <span className={`${mono} block text-[11px] text-[color:var(--muted)] mb-6`}>RECO!{r.cell}</span>
                <span className="block text-[44px] sm:text-[52px] font-extrabold leading-none tracking-[-0.04em] tabular-nums">
                  {r.figure}
                </span>
                <span className="block mt-4 text-[16px] leading-snug text-balance">{r.label}</span>
                <span className={`${mono} block mt-6 text-[12px] group-hover:underline underline-offset-4`}>
                  See the work →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Problems: the one pale-gold band */}
      <section className="px-4 sm:px-8 py-20 sm:py-28 bg-[color:var(--band)]">
        <div className="mx-auto max-w-[1180px]">
          <Kicker>Services</Kicker>
          <h2 data-words className={`${styles.h2} max-w-[820px]`}>
            Three problems every growing brand hits
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {PROBLEMS.map((p) => (
              <article key={p.num} className={`${styles.card} p-6 sm:p-7 flex flex-col`}>
                <p className={`${mono} text-[12px] text-[color:var(--muted)]`}>
                  {p.num} · {p.tag}
                </p>
                <h3 className="mt-5 text-[22px] sm:text-[24px] font-bold leading-[1.15] tracking-[-0.015em]">
                  &ldquo;{p.quote}&rdquo;
                </h3>
                <p className="mt-4 text-[16px] leading-relaxed">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Case */}
      <section id="case" className="px-4 sm:px-8 py-20 sm:py-28 scroll-mt-8">
        <div className="mx-auto max-w-[1180px]">
          <Kicker>Client work · Wholesale + DTC</Kicker>
          <h2 data-words className={`${styles.h2} max-w-[900px]`}>
            RECO: one live command center for a two-founder team.
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-center">
            <div>
              <CaseCard />
              <p className={`${mono} mt-3 text-[11.5px] text-[color:var(--muted)]`}>
                Hover or focus the screenshot for the numbers. Figures blurred, client data.
              </p>
            </div>
            <div>
              <dl className="border-t border-[color:var(--line)]">
                <div className="py-5 border-b border-[color:var(--line)]">
                  <dt className={`${mono} text-[12px] uppercase tracking-[0.12em] text-[color:var(--muted)] mb-2`}>Problem</dt>
                  <dd className="text-[16px] leading-relaxed">
                    119 wholesale accounts and 2,500+ sales leads lived in a Google Sheet, and there was no
                    engineering staff to build anything better.
                  </dd>
                </div>
                <div className="py-5 border-b border-[color:var(--line)]">
                  <dt className={`${mono} text-[12px] uppercase tracking-[0.12em] text-[color:var(--muted)] mb-2`}>Built</dt>
                  <dd className="text-[16px] leading-relaxed">
                    One live dashboard, a live Shopify sync, 5 automated agents and a daily priority digest.
                  </dd>
                </div>
              </dl>
              <figure className="mt-7">
                <blockquote className="text-[19px] sm:text-[21px] font-semibold leading-snug tracking-[-0.01em]">
                  &ldquo;We were operating out of a Google Sheet, but now we have systems and tools in place to ensure
                  we are organized, efficient, and making the right decisions every day.&rdquo;
                </blockquote>
                <figcaption className={`${mono} mt-3 text-[12.5px] text-[color:var(--muted)]`}>
                  Co-Founder, RECO
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-4 sm:px-8 py-20 sm:py-28 border-t border-[color:var(--grid)]">
        <div className="mx-auto max-w-[1180px] grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-end">
          <div>
            <h2 data-words className={`${styles.h2}`}>
              Pricing
            </h2>
            <p className="mt-6 text-[18px] sm:text-[20px] leading-relaxed max-w-[560px]">
              $200 an hour to build. $150 an hour for changes after launch. A written estimate before any work
              starts.
            </p>
          </div>
          <table className={`${mono} w-full text-[13px] border border-[color:var(--grid)] bg-white rounded-[4px] border-separate border-spacing-0 overflow-hidden`}>
            <caption className="sr-only">Rates</caption>
            <tbody>
              {PRICES.map((p, i) => (
                <tr key={p.item}>
                  <th
                    scope="row"
                    className={`text-left font-normal px-4 py-3.5 border-r border-[color:var(--grid)] ${
                      i < PRICES.length - 1 ? "border-b" : ""
                    } border-[color:var(--grid)]`}
                  >
                    {p.item}
                  </th>
                  <td
                    className={`px-4 py-3.5 text-right font-bold tabular-nums ${
                      i < PRICES.length - 1 ? "border-b border-[color:var(--grid)]" : ""
                    }`}
                  >
                    {p.rate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Close */}
      <section className="px-4 sm:px-8 pb-28 pt-4">
        <div className={`${styles.card} mx-auto max-w-[1180px] px-6 py-14 sm:py-20 text-center`}>
          <h2 data-words className={`${styles.h2} mx-auto max-w-[760px]`}>
            Next step
          </h2>
          <div className="mt-9 flex flex-col items-center gap-4">
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className={`${styles.btnPrimary} ${styles.focus} w-full sm:w-auto`}>
              Book a free strategy call
            </a>
            <a href="/audit" className={`${styles.focus} ${mono} text-[13px] underline-offset-4 hover:underline rounded px-1`}>
              Or run the free AI Audit (2 min) →
            </a>
          </div>
        </div>
      </section>

      <footer className={`${mono} px-4 sm:px-8 pb-24 text-[12px] text-[color:var(--muted)]`}>
        <div className="mx-auto max-w-[1180px] border-t border-[color:var(--grid)] pt-6">
          Wex Advisory · New York · max@wexadvisory.com
        </div>
      </footer>

      <a href="/lab" className={`${styles.pill} ${styles.focus} ${mono}`}>
        Option B · The sheet sorts itself
      </a>
    </main>
  );
}
