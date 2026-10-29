"use client";

import { Fragment, useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, useWordReveal, prefersReducedMotion } from "@/components/lab/motion";
import Shelves from "./Shelves";
import s from "./labc.module.css";

const CALENDLY = "https://calendly.com/maxwexley-wexadvisory/30min";
const H1 = "Stop running your brand out of a spreadsheet.";

const RESULTS = [
  { n: "119 → 1", label: "wholesale accounts moved from a spreadsheet into one live dashboard at RECO" },
  { n: "2,500+", label: "sales leads tracked in the same dashboard, not a second tab" },
  { n: "5", label: "automated agents working for a two-founder team with no engineers" },
];

const PROBLEMS = [
  {
    tag: "Reporting",
    quote: "We find out last month's margin three weeks late.",
    answer: "Sales, margin and finance reports that build themselves from Shopify, Amazon and your books.",
  },
  {
    tag: "Automation",
    quote: "Wholesale follow-ups live in someone's head.",
    answer: "Agents that watch accounts, orders and the inbox, and queue the next step for you to approve.",
  },
  {
    tag: "Team",
    quote: "We bought the AI seats. Nothing changed.",
    answer: "Training and assistants your team actually uses.",
  },
];

export default function LabC() {
  const heroRef = useRef<HTMLDivElement>(null);
  const wordsScope = useWordReveal<HTMLDivElement>();

  // Branded entrance: H1 words rise, then the covers slide onto the shelves
  // from the right edge of the screen, one after another. Covers are pre-hidden
  // by CSS ([data-entrance="pending"]) so the server-rendered frame never flashes
  // them in place first. Reduced motion: everything simply appears.
  useGSAP(
    () => {
      const root = heroRef.current;
      if (!root) return;
      if (prefersReducedMotion()) {
        root.dataset.entrance = "done";
        return;
      }
      const words = root.querySelectorAll<HTMLElement>("[data-h1w]");
      const slots = gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-slot]"));
      const idx = root.querySelectorAll<HTMLElement>("[data-idx]");
      const vw = window.innerWidth;

      gsap.set(words, { yPercent: 110 });
      gsap.set(idx, { opacity: 0 });
      slots.forEach((el) => {
        const left = el.getBoundingClientRect().left;
        gsap.set(el, { x: Math.max(vw - left, 0) + 60 });
      });
      root.dataset.entrance = "done";

      const tl = gsap.timeline();
      tl.to(words, { yPercent: 0, duration: 0.9, stagger: 0.045, ease: "power4.out" })
        .to(
          slots,
          { x: 0, duration: 1.15, stagger: 0.08, ease: "power3.out", clearProps: "transform" },
          0.25
        )
        .to(idx, { opacity: 1, duration: 0.5, stagger: 0.08, ease: "none" }, 0.75);
    },
    { scope: heroRef }
  );

  const h1Words = H1.split(" ");

  return (
    <main className={s.root}>
      <noscript>
        <style>{`[data-entrance="pending"] [data-slot],[data-entrance="pending"] [data-idx],[data-entrance="pending"] [data-h1w]{opacity:1!important}`}</style>
      </noscript>

      {/* top bar */}
      <header className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 sm:px-8">
        <a href="/" className="flex items-center gap-2.5 text-[15px] font-semibold tracking-[-0.01em] text-[#111]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/wex-icon-wa.png" alt="" width={36} height={24} className="h-6 w-auto" />
          Wex Advisory
        </a>
        <nav aria-label="Main" className="flex items-center gap-5 text-[14px]">
          <a href="/work" className="hidden text-[#111] hover:underline sm:inline">
            Work
          </a>
          <a href="/products" className="hidden text-[#111] hover:underline sm:inline">
            Products
          </a>
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-9 items-center rounded-full bg-[#111] px-4 text-[13px] font-semibold text-white"
          >
            Book a call
          </a>
        </nav>
      </header>

      {/* hero: copy on top, the shelf of systems below */}
      <div ref={heroRef} data-entrance="pending" className={`${s.hero} mx-auto max-w-[1280px] px-4 pb-10 pt-6 sm:px-8 sm:pt-10`}>
        <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:items-end lg:gap-14">
          <div>
            <p className="mb-4 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
              AI automation for consumer brands · New York
            </p>
            <h1 data-lab
              className={`${s.h1} max-w-[15ch] text-[clamp(34px,4.6vw,62px)] font-extrabold leading-[0.98] tracking-[-0.025em] text-[#111]`}
            >
              {h1Words.map((w, i) => (
                <Fragment key={i}>
                  <span className={s.h1Word}>
                    <span data-h1w="">{w}</span>
                  </span>
                  {i < h1Words.length - 1 ? " " : ""}
                </Fragment>
              ))}
            </h1>
          </div>
          <div className="max-w-[520px]">
            <p className="text-[15px] leading-[1.6] text-[#3d3d42] sm:text-[16px]">
              I build the dashboards, reporting and AI agents that pull Shopify, Amazon, wholesale and your books
              into one place, for owner-led brands with no engineering team. $200 an hour to build, with a written
              estimate before any work starts.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href="/audit" className={s.ctaGold}>
                Get your free AI Audit
              </a>
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className={s.ctaLine}>
                Book a strategy call
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 sm:mt-16">
          <Shelves />
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-[var(--rule)] pt-4 text-[13px] sm:flex-row sm:items-baseline sm:justify-between">
          <p className="max-w-[640px] text-[#111]">
            Running today for RECO, a wholesale + DTC brand: 119 accounts, 2,500+ leads and 5 agents in one dashboard.
          </p>
          <p className="text-[var(--muted)]">Hover or tap a cover to turn it over.</p>
        </div>
      </div>

      <div ref={wordsScope}>
        {/* results */}
        <section aria-labelledby="c-results" className="mx-auto max-w-[1280px] px-4 py-20 sm:px-8 sm:py-28">
          <h2
            id="c-results"
            data-words
            className="mb-12 text-[clamp(28px,3.6vw,44px)] font-extrabold leading-[1.05] tracking-[-0.02em]"
          >
            Results from client work
          </h2>
          <div className="grid gap-10 sm:grid-cols-3 sm:gap-8">
            {RESULTS.map((r) => (
              <div key={r.n} className="border-t border-[#111] pt-5">
                <p className={`${s.condensed} text-[clamp(64px,8vw,112px)] leading-[0.9] tracking-[-0.01em]`}>{r.n}</p>
                <p className="mt-4 max-w-[30ch] text-[15px] leading-[1.5] text-[#3d3d42]">{r.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* problems */}
        <section aria-labelledby="c-problems" className="border-t border-[var(--rule)]">
          <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-8 sm:py-28">
            <h2
              id="c-problems"
              data-words
              className="mb-12 max-w-[20ch] text-[clamp(28px,3.6vw,44px)] font-extrabold leading-[1.05] tracking-[-0.02em]"
            >
              Three problems every growing brand hits
            </h2>
            <ol className="grid gap-10 sm:grid-cols-3 sm:gap-8">
              {PROBLEMS.map((p, i) => (
                <li key={p.tag} className="border-t border-[var(--rule)] pt-5">
                  <p className="mb-5 text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                    <span className="mr-2 tabular-nums">0{i + 1}</span>
                    {p.tag}
                  </p>
                  <h3 className="mb-4 text-[clamp(21px,2vw,26px)] font-bold leading-[1.2] tracking-[-0.015em]">
                    &ldquo;{p.quote}&rdquo;
                  </h3>
                  <p className="text-[15px] leading-[1.6] text-[#3d3d42]">{p.answer}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* case */}
        <section aria-labelledby="c-case" className="border-t border-[var(--rule)]">
          <div className="mx-auto grid max-w-[1280px] gap-12 px-4 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16">
            <div className={s.framed}>
              <div className="relative aspect-[1280/760] overflow-hidden">
                <Image
                  src="/projects/reco-dashboard-blurred.png"
                  alt="RECO operations dashboard, figures blurred for confidentiality"
                  fill
                  sizes="(max-width: 1024px) 100vw, 680px"
                  className="object-cover object-top"
                />
              </div>
            </div>
            <div>
              <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                Client work · Wholesale + DTC
              </p>
              <h2
                id="c-case"
                data-words
                className="mb-8 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.08] tracking-[-0.02em]"
              >
                RECO: one live command center for a two-founder team.
              </h2>
              <dl className="border-t border-[var(--rule)] text-[15px] leading-[1.6]">
                <div className="border-b border-[var(--rule)] py-4">
                  <dt className="mb-1 text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                    Problem
                  </dt>
                  <dd className="text-[#2a2a2e]">
                    119 wholesale accounts and 2,500+ sales leads lived in a Google Sheet, and there was no engineering
                    staff to build anything better.
                  </dd>
                </div>
                <div className="border-b border-[var(--rule)] py-4">
                  <dt className="mb-1 text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                    Built
                  </dt>
                  <dd className="text-[#2a2a2e]">
                    One live dashboard, a live Shopify sync, 5 automated agents and a daily priority digest.
                  </dd>
                </div>
              </dl>
              <figure className="mt-8">
                <blockquote className="text-[18px] font-semibold leading-[1.45] tracking-[-0.01em] text-[#111]">
                  &ldquo;We were operating out of a Google Sheet, but now we have systems and tools in place to ensure
                  we are organized, efficient, and making the right decisions every day.&rdquo;
                </blockquote>
                <figcaption className="mt-3 text-[14px] text-[var(--muted)]">Co-Founder, RECO</figcaption>
              </figure>
              <a href="/work" className="mt-6 inline-flex min-h-11 items-center text-[14px] font-semibold underline underline-offset-4">
                See the work <span aria-hidden="true">&nbsp;→</span>
              </a>
            </div>
          </div>
        </section>

        {/* pricing */}
        <section aria-labelledby="c-pricing" className="border-t border-[var(--rule)]">
          <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-8 sm:py-28">
            <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">Pricing</p>
            <h2
              id="c-pricing"
              data-words
              className={`${s.condensed} text-[clamp(52px,8.5vw,128px)] leading-[0.92]`}
            >
              $200 an hour to build.
            </h2>
            <p className="mt-6 max-w-[46ch] text-[clamp(18px,1.8vw,22px)] leading-[1.45] text-[#2a2a2e]">
              $150 an hour for changes after launch. A written estimate before any work starts.
            </p>
          </div>
        </section>

        {/* close */}
        <section aria-labelledby="c-close" className="border-t border-[var(--rule)]">
          <div className="mx-auto flex max-w-[1280px] flex-col items-start gap-5 px-4 py-20 sm:px-8 sm:py-24">
            <h2 id="c-close" className="sr-only">
              Next step
            </h2>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className={s.ctaBlack}>
              Book a free strategy call
            </a>
            <a href="/audit" className="inline-flex min-h-11 items-center text-[15px] font-semibold underline-offset-4 hover:underline">
              Or run the free AI Audit (2 min) <span aria-hidden="true">&nbsp;→</span>
            </a>
          </div>
        </section>

        <footer className="border-t border-[var(--rule)]">
          <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-8 pb-20 text-[12px] text-[var(--muted)] sm:px-8">
            <span>Wex Advisory · New York</span>
            <a href="mailto:max@wexadvisory.com" className="hover:underline">
              max@wexadvisory.com
            </a>
          </div>
        </footer>
      </div>

      <a href="/lab" className={s.pill}>
        Option C · Systems on the shelf
      </a>
    </main>
  );
}
