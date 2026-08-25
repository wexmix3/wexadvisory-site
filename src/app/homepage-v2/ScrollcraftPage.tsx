"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import ParticleGlobe from "@/components/ParticleGlobe";

declare global {
  interface Window {
    ScrollCraft?: { mount: (root: Element | Document) => unknown };
  }
}

const AUDIT_URL = "https://audit.wexadvisory.com/audit";

export default function ScrollcraftPage({
  displayFont,
  textFont,
  monoFont,
}: {
  displayFont: string;
  textFont: string;
  monoFont: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const folioNRef = useRef<HTMLSpanElement>(null);
  const folioTRef = useRef<HTMLSpanElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [heroNearby, setHeroNearby] = useState(true);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const chapters = Array.from(root.querySelectorAll<HTMLElement>("[data-chapter]"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            if (folioNRef.current) folioNRef.current.textContent = String(el.dataset.chapter).padStart(2, "0");
            if (folioTRef.current) folioTRef.current.textContent = el.dataset.chapterTitle ?? "";
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    chapters.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  // The particle globe runs a continuous WebGL + bloom render loop
  // (react-three-fiber's Canvas defaults to frameloop="always"), which keeps
  // costing a frame budget for the rest of the scroll even once the hero is
  // long gone. Root-caused via a controlled A/B: removing the canvas entirely
  // dropped average scroll frame time from ~560ms to ~42ms and long tasks from
  // 119 (137s total) to 1 (139ms total). Fully unmounting it when the hero is
  // out of view stops the render loop instead of just hiding it.
  //
  // Deliberately a plain scroll listener, not IntersectionObserver: profiling
  // showed that under the load this canvas itself generates, IntersectionObserver
  // callbacks (spec'd as low-priority/best-effort) never got a turn to fire —
  // the expensive thing prevented its own kill-switch from running. A `scroll`
  // listener is a normal-priority DOM event and fired reliably in the same test.
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const threshold = hero.offsetHeight + window.innerHeight * 0.5;
    function onScroll() {
      setHeroNearby(window.scrollY < threshold);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleEngineLoad() {
    if (rootRef.current && window.ScrollCraft) {
      window.ScrollCraft.mount(rootRef.current);
    }
  }

  return (
    <div ref={rootRef} className="sc-root">
      <Script src="/scrollcraft/scrollcraft.js" strategy="afterInteractive" onLoad={handleEngineLoad} />

      <span data-sc-progress />
      <div className="sc-grain" aria-hidden="true" />
      <nav className="folio" aria-hidden="true">
        <span className="folio__n" ref={folioNRef}>00</span>
        <span className="folio__t" ref={folioTRef}>Wex Advisory</span>
      </nav>

      <main id="top">
        {/* 0 · TITLE PAGE — the real particle globe as ground, not as inserted media */}
        <section ref={heroRef} className="ch0" data-chapter="0" data-chapter-title="Wex Advisory" data-sc-act="flow">
          {heroNearby && <ParticleGlobe />}
          <div className="ch0__vignette" aria-hidden="true" />
          <div className="grid-texture" aria-hidden="true" />
          <div className="ch0__body sc-stack" data-sc-in data-sc-stagger="90">
            <p className="ch0__mark">
              <span className="ch0__dot" />
              Wex<span className="accent-text">·</span>Advisory
            </p>
            <h1>AI consulting for businesses that don&apos;t have time to figure out AI themselves.</h1>
            <p className="sc-body">Boutique, on call, no fluff. I bridge the gap between what AI tools can do and what your business actually needs.</p>
            <a className="cta-glass" href="#audit">
              Get my free AI Audit
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>
        </section>

        {/* 1 · RECOGNITION — flow, glass panel */}
        <section className="ch1 sc-section" data-chapter="1" data-chapter-title="Recognition" data-sc-act="flow">
          <div className="ambient ambient--1" data-sc-parallax="-0.7" aria-hidden="true" />
          <div className="sc-wrap">
            <div className="glass glass--pad sc-stack" data-sc-in data-sc-stagger="70">
              <p className="eyebrow">01 — Recognition</p>
              <h2 className="sc-display sc-display--lg">You already suspect where the time is going.</h2>
              <p className="sc-body">The reports that take a full day to assemble by hand. The tool everyone in your inbox is pitching, that you haven&apos;t had an afternoon to evaluate. The process that works, but only because someone remembers all the steps. None of that is a mystery to you. It&apos;s just never been anyone&apos;s job to fix.</p>
            </div>
          </div>
        </section>

        {/* 2 · TENSION — flow, glass panel (was a pin act; dropped to cut scroll-hijack weight) */}
        <section className="ch2 sc-section" data-chapter="2" data-chapter-title="Tension" data-sc-act="flow">
          <div className="ambient ambient--2" data-sc-parallax="0.9" aria-hidden="true" />
          <div className="sc-wrap">
            <div className="glass glass--pad tension-card" data-sc-in data-sc-stagger="110">
              <p className="tension-line">Every week it stays a manual process is a week it costs the same thing again.</p>
              <div className="tension-rule" aria-hidden="true" />
              <p className="tension-line">Most businesses don&apos;t need more AI tools. They need to know which three problems are actually worth solving first.</p>
              <p className="tension-quiet">Here&apos;s how to find out.</p>
            </div>
          </div>
        </section>

        {/* 3 · TURN — PEAK: the self-filling scorecard (signature move) */}
        <section className="ch3" data-chapter="3" data-chapter-title="The Audit" data-sc-act="pin" data-sc-span="3.4" data-sc-drift="#070a0f">
          <div data-sc-stage>
            <div className="grid-texture grid-texture--panel" aria-hidden="true" />
            <div className="scorecard glass">
              <div className="scorecard__head sc-stack">
                <p className="eyebrow">What the free AI Audit measures</p>
                <h2>Four categories. Real ones, not a pitch deck: an actual scan of your business.</h2>
              </div>
              <div className="rings">
                <div className="score-ring" data-i="0">
                  <svg viewBox="0 0 108 108"><circle className="score-ring__track" cx="54" cy="54" r="48" /><circle className="score-ring__fill" cx="54" cy="54" r="48" strokeDasharray="301.6" /></svg>
                  <span className="score-ring__label">Automation<br />Opportunity</span>
                </div>
                <div className="score-ring" data-i="1">
                  <svg viewBox="0 0 108 108"><circle className="score-ring__track" cx="54" cy="54" r="48" /><circle className="score-ring__fill" cx="54" cy="54" r="48" strokeDasharray="301.6" /></svg>
                  <span className="score-ring__label">Data<br />Readiness</span>
                </div>
                <div className="score-ring" data-i="2">
                  <svg viewBox="0 0 108 108"><circle className="score-ring__track" cx="54" cy="54" r="48" /><circle className="score-ring__fill" cx="54" cy="54" r="48" strokeDasharray="301.6" /></svg>
                  <span className="score-ring__label">Workflow<br />Friction</span>
                </div>
                <div className="score-ring score-ring--locked">
                  <svg viewBox="0 0 108 108"><circle className="score-ring__track" cx="54" cy="54" r="48" /><circle className="score-ring__fill score-ring__fill--locked" cx="54" cy="54" r="48" strokeDasharray="301.6" strokeDashoffset="0" /></svg>
                  <span className="score-ring__label">Yours:<br />unlocked in 3 min</span>
                </div>
              </div>
              <div className="scorecard__foot" data-sc-cue="0.7 1">
                <p className="sc-body">This is the mechanic, not a mockup of your score (I&apos;m not going to invent one). Run it on your own site and the fourth ring is the one that actually fills in.</p>
                <a className="cta-glass" id="audit" href={AUDIT_URL} target="_blank" rel="noopener noreferrer">
                  Get my free AI Audit
                  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* boundary reveal into the case study chapter */}
        <div className="divider">
          <figure className="divider__panel" data-sc-reveal="up" data-sc-reveal-at="0.1 0.7">
            <div className="divider__glow" aria-hidden="true" />
            <hr className="sc-rule" />
          </figure>
        </div>

        {/* 4 · SUBSTANCE — 25N case study, glass panel */}
        <section className="ch4 sc-section" data-chapter="4" data-chapter-title="Case Study" data-sc-act="flow">
          <div className="ambient ambient--4" data-sc-parallax="-0.6" aria-hidden="true" />
          <div className="sc-wrap">
            <div className="glass glass--pad case" data-sc-in data-sc-stagger="70">
              <p className="eyebrow">Who I&apos;ve done it for: 25N Coworking</p>
              <h2>A finance team that used to close the books by hand, and a CFO who wanted to know occupancy in real time, not at month end.</h2>
              <dl className="case__facts">
                <div className="case__fact">
                  <dt>Financial close</dt>
                  <dd>GL verification and packet generation, built to run the same way every month.</dd>
                </div>
                <div className="case__fact">
                  <dt>Occupancy dashboards</dt>
                  <dd>Daily refresh, location-level detail, no more waiting on a spreadsheet.</dd>
                </div>
                <div className="case__fact">
                  <dt>Status</dt>
                  <dd><span className="status-dot" aria-hidden="true" />Live, in daily use by their finance team.</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* 5 · RANGE — flow grid (was a pan rail; horizontal scroll-jack was a real
             source of the "not smooth" feeling, so this reads as a normal page now) */}
        <section className="ch5 sc-section" data-chapter="5" data-chapter-title="The Set" data-sc-act="flow">
          <div className="sc-wrap">
            <div className="sc-stack" data-sc-in data-sc-stagger="60">
              <h2>Three ways to work together.</h2>
              <p className="sc-body">Start free. Go deeper when it&apos;s worth it.</p>
            </div>
            <div className="offer-grid" data-sc-in data-sc-stagger="90">
              <article className="offer glass" data-sc-tilt="5">
                <svg className="offer__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M20 20L15.2 15.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  <path d="M7.5 10.5L9.5 12.5L13.5 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="offer__eyebrow">Free</p>
                <h3>AI Audit</h3>
                <p>A real scan of where AI already applies in your business. Emailed as a report.</p>
                <p className="offer__price">$0</p>
              </article>
              <article className="offer glass" data-sc-tilt="5">
                <svg className="offer__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 20V4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  <path d="M4 20H21" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  <rect x="7.5" y="13" width="3" height="7" stroke="currentColor" strokeWidth="1.4" />
                  <rect x="13" y="9" width="3" height="11" stroke="currentColor" strokeWidth="1.4" />
                  <rect x="18.5" y="5.5" width="3" height="14.5" stroke="currentColor" strokeWidth="1.4" />
                </svg>
                <p className="offer__eyebrow">Flat fee</p>
                <h3>Competitive Analysis</h3>
                <p>A 13-page report on where you stand against the businesses you&apos;re actually competing with.</p>
                <p className="offer__price">$299</p>
              </article>
              <article className="offer glass" data-sc-tilt="5">
                <svg className="offer__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M12 3V5.5M12 18.5V21M21 12H18.5M5.5 12H3M18.02 5.98L16.24 7.76M7.76 16.24L5.98 18.02M18.02 18.02L16.24 16.24M7.76 7.76L5.98 5.98" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                <p className="offer__eyebrow">Ongoing</p>
                <h3>AI Consulting</h3>
                <p>Hands-on build work, and I stay on call to maintain what we build together.</p>
                <p className="offer__price">$150/hr + $300/mo</p>
              </article>
            </div>
          </div>
        </section>

        {/* 6 · COMMITMENT — colophon close. Last element on the page. */}
        <section className="ch6" data-chapter="6" data-chapter-title="Contact" data-sc-act="pin" data-sc-span="1.2" data-sc-drift="#060709">
          <div data-sc-stage className="close" data-sc-spotlight>
            <div className="close__inner glass glass--pad">
              <h2 data-sc-cue="0.08" data-sc-kinetic="lines">You already know where AI could be doing more here. Let&apos;s find out exactly where.</h2>
              <p className="sc-body" data-sc-cue="0.08">One free audit, three minutes, no call required to start. <a className="close__cta" href={AUDIT_URL} target="_blank" rel="noopener noreferrer">Get my free AI Audit</a>.</p>
              <footer className="close__foot">
                <span>Wex Advisory · Max Wexley</span>
                <a href="mailto:maxwexley@wexadvisory.com">maxwexley@wexadvisory.com</a>
              </footer>
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        /* :global(:root) on purpose: body-level rules in scrollcraft.css (the
           text-selection colour, body background/ink) read these tokens from
           :root, not from an ancestor div — a scoped override here would leave
           selection colour on the imported stylesheet's lime default. */
        :global(:root) {
          --sc-canvas: #07090c;
          --sc-surface: #0e1116;
          --sc-ink: #f3f6fa;
          --sc-ink-soft: #8991a3;
          --sc-accent: #e8c876;
          --sc-accent-glow: rgba(232, 200, 118, 0.45);
          --sc-accent-ink: #191207;
          --sc-font-display: ${displayFont}, system-ui, sans-serif;
          --sc-font-text: ${textFont}, system-ui, sans-serif;
          --sc-font-mono: ${monoFont}, ui-monospace, monospace;
          --glass-bg: linear-gradient(135deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.02));
          --glass-border: rgba(255, 255, 255, 0.1);
          --glass-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.09), 0 24px 70px -24px rgba(0, 0, 0, 0.7);
        }
        /* Fights the "rubber-band" wheel-scroll complaint: scroll-behavior:smooth
           (set globally by the imported engine stylesheet, for anchor-jump
           niceties) animates every wheel notch on some input devices instead of
           moving instantly, which reads as laggy rather than smooth. The engine's
           own pin/cue mechanics read raw scrollY directly and don't need it. */
        :global(html) {
          scroll-behavior: auto !important;
        }

        .eyebrow {
          font-family: var(--sc-font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--sc-accent);
          margin: 0 0 0.9rem;
        }

        /* ---- glass: the one repeated surface language ---- */
        .glass {
          position: relative;
          background: var(--glass-bg);
          backdrop-filter: blur(28px) saturate(150%);
          -webkit-backdrop-filter: blur(28px) saturate(150%);
          border: 1px solid var(--glass-border);
          border-radius: 1.25rem;
          box-shadow: var(--glass-shadow);
        }
        .glass--pad { padding: clamp(2rem, 4.5vw, 3.5rem); }

        /* a faint high-tech grid, not a decoration bolted on: it reads as an
           interface surface rather than a poster */
        .grid-texture {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
          background-size: 64px 64px;
          -webkit-mask-image: radial-gradient(120% 90% at 70% 30%, black 0%, transparent 70%);
          mask-image: radial-gradient(120% 90% at 70% 30%, black 0%, transparent 70%);
          pointer-events: none;
        }
        .grid-texture--panel {
          border-radius: 1.25rem;
          background-size: 40px 40px;
        }

        .folio {
          position: fixed;
          top: var(--sc-6, 1.5rem);
          left: var(--sc-6, 1.5rem);
          z-index: 40;
          display: flex;
          align-items: baseline;
          gap: 0.6em;
          font-family: var(--sc-font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--sc-ink-soft);
          pointer-events: none;
        }
        .folio__n { color: var(--sc-accent); font-variant-numeric: tabular-nums; }

        .ch0 {
          position: relative;
          min-height: 100svh;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
          background: radial-gradient(120% 90% at 30% 10%, #10141c 0%, #07090c 62%);
        }
        .ch0__vignette {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(7,9,12,0) 0%, rgba(7,9,12,0.55) 72%, rgba(7,9,12,0.94) 100%);
          pointer-events: none;
        }
        .ch0__body {
          position: relative;
          z-index: 2;
          width: 100%;
          padding: var(--sc-gutter, 6vw) var(--sc-gutter, 6vw) clamp(3rem, 8vh, 5.5rem);
          max-width: 74rem;
          margin-inline: auto;
        }
        .ch0__mark {
          display: inline-flex;
          align-items: center;
          gap: 0.6em;
          font-family: var(--sc-font-mono);
          font-weight: 500;
          font-size: clamp(0.8rem, 1.2vw, 0.9rem);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--sc-ink);
          margin: 0 0 clamp(1.6rem, 5vh, 3rem);
        }
        .ch0__dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--sc-accent);
          box-shadow: 0 0 8px 1px var(--sc-accent-glow);
        }
        .accent-text { color: var(--sc-accent); }
        .ch0 h1 {
          font-family: var(--sc-font-display);
          font-weight: 600;
          font-size: clamp(2.4rem, 5.6vw, 4.6rem);
          line-height: 1.02;
          letter-spacing: -0.01em;
          color: var(--sc-ink);
          max-width: 20ch;
          margin: 0 0 var(--sc-5, 1.25rem);
          text-wrap: balance;
        }
        .ch0 p.sc-body { max-width: 46ch; margin: 0 0 var(--sc-6, 1.75rem); }

        /* the one repeated CTA shape: glass pill, accent border-glow on hover */
        .cta-glass {
          display: inline-flex;
          align-items: center;
          gap: 0.6em;
          padding: 0.85rem 1.4rem;
          font-family: var(--sc-font-text);
          font-weight: 500;
          font-size: 0.95rem;
          color: var(--sc-ink);
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid var(--glass-border);
          border-radius: 999px;
          box-shadow: var(--glass-shadow);
          transition: border-color 180ms var(--sc-ease-out, ease-out), box-shadow 180ms var(--sc-ease-out, ease-out);
        }
        .cta-glass svg { width: 1rem; height: 1rem; color: var(--sc-accent); flex-shrink: 0; }
        .cta-glass:hover {
          border-color: var(--sc-accent-glow);
          box-shadow: var(--glass-shadow), 0 0 24px -6px var(--sc-accent-glow);
        }

        .ch1 { position: relative; overflow: hidden; }
        .ch2 { position: relative; overflow: hidden; }

        /* ambient: a faint echo of the hero globe carried through the quieter
           chapters, so the page has one visual idea running underneath it
           rather than going flat the moment the globe scrolls out of view. */
        .ambient {
          position: absolute;
          z-index: 0;
          border-radius: 50%;
          pointer-events: none;
          background: radial-gradient(circle, var(--sc-accent-glow) 0%, rgba(232,200,118,0.06) 45%, transparent 72%);
          filter: blur(4px);
        }
        .ambient--1 { top: -8rem; right: -10rem; width: 34rem; height: 34rem; }
        .ambient--2 { bottom: -12rem; left: -10rem; width: 28rem; height: 28rem; }
        .ambient--4 { top: -10rem; left: 58%; width: 30rem; height: 30rem; }

        .tension-card { position: relative; z-index: 1; max-width: 46rem; }
        .tension-line {
          font-family: var(--sc-font-display);
          font-weight: 500;
          font-size: clamp(1.4rem, 2.8vw, 2rem);
          line-height: 1.32;
          color: var(--sc-ink);
          margin: 0;
        }
        .tension-rule {
          width: 2rem; height: 1px;
          background: var(--sc-accent);
          margin: 1.6rem 0;
          opacity: 0.6;
        }
        .tension-quiet {
          font-family: var(--sc-font-text);
          color: var(--sc-ink-soft);
          margin: 1.6rem 0 0;
        }

        .scorecard {
          position: relative;
          z-index: 1;
          min-height: 60%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: clamp(2rem, 5vh, 3.5rem);
          padding: clamp(2.5rem, 6vh, 4.5rem);
          max-width: 68rem;
          margin: 0 auto;
          /* Driven directly off --sc-p (inherited from the pinned act section
             ancestor), staggered per ring. Previously declared on a selector
             that looked for [data-sc-stage] as a DESCENDANT of .scorecard —
             it's actually an ancestor, so that rule matched nothing and the
             rings never animated at all (verified: --r0 computed as empty,
             stroke-dashoffset permanently stuck at 301.6px across every
             scroll position tested). Declaring it here, on an actual ancestor
             of every .score-ring, is the fix. */
          --r0: clamp(0, calc((var(--sc-p, 0) - 0.05) * 2), 1);
          --r1: clamp(0, calc((var(--sc-p, 0) - 0.22) * 2), 1);
          --r2: clamp(0, calc((var(--sc-p, 0) - 0.39) * 2), 1);
        }
        .scorecard__head { max-width: 40ch; }
        .scorecard__head :global(h2) { font-family: var(--sc-font-display); font-weight: 600; font-size: clamp(1.8rem, 3.6vw, 2.8rem); line-height: 1.08; color: var(--sc-ink); margin: 0; text-wrap: balance; }
        .rings { display: grid; grid-template-columns: repeat(4, 1fr); gap: clamp(1rem, 2.5vw, 2rem); }
        @media (max-width: 720px) { .rings { grid-template-columns: repeat(2, 1fr); } }
        .score-ring { display: flex; flex-direction: column; align-items: center; gap: 0.9rem; }
        .score-ring :global(svg) { width: 100%; height: auto; max-width: 9.5rem; filter: drop-shadow(0 0 10px var(--sc-accent-glow)); }
        .score-ring :global(.score-ring__track) { fill: none; stroke: rgba(255,255,255,0.08); stroke-width: 6; }
        .score-ring :global(.score-ring__fill) { fill: none; stroke: var(--sc-accent); stroke-width: 6; stroke-linecap: round; transform: rotate(-90deg); transform-origin: 50% 50%; }
        .score-ring :global(.score-ring__fill--locked) { fill: none; stroke: var(--sc-ink-soft); stroke-width: 6; stroke-dasharray: 4 7; }
        .score-ring__label { font-family: var(--sc-font-mono); font-size: 0.75rem; letter-spacing: 0.02em; color: var(--sc-ink-soft); text-align: center; max-width: 12ch; }
        .score-ring--locked .score-ring__label { color: var(--sc-accent); }

        .score-ring[data-i="0"] :global(.score-ring__fill) { stroke-dashoffset: calc(301.6 * (1 - var(--r0, 0))); }
        .score-ring[data-i="1"] :global(.score-ring__fill) { stroke-dashoffset: calc(301.6 * (1 - var(--r1, 0))); }
        .score-ring[data-i="2"] :global(.score-ring__fill) { stroke-dashoffset: calc(301.6 * (1 - var(--r2, 0))); }

        .scorecard__foot { display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; flex-wrap: wrap; }
        .scorecard__foot :global(p) { max-width: 34ch; }

        .divider { position: relative; height: 30vh; background: var(--sc-canvas); overflow: hidden; }
        .divider__panel { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }
        .divider__panel :global(.sc-rule) { position: relative; z-index: 1; width: 3.5rem; height: 1px; background: var(--sc-accent); border: none; box-shadow: 0 0 12px var(--sc-accent-glow); }
        .divider__glow {
          position: absolute;
          top: 50%; left: 50%;
          width: 22rem; height: 22rem;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: radial-gradient(circle, var(--sc-accent-glow) 0%, transparent 70%);
          pointer-events: none;
        }

        .ch4 { position: relative; overflow: hidden; }
        .case { position: relative; z-index: 1; max-width: 52rem; margin-inline: auto; }
        .case :global(h2) { font-family: var(--sc-font-display); font-weight: 600; font-size: clamp(1.8rem, 3.2vw, 2.6rem); color: var(--sc-ink); margin: 0 0 1.75rem; text-wrap: balance; }
        .case__facts { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--sc-6, 1.75rem); padding-top: var(--sc-6, 1.75rem); border-top: 1px solid var(--glass-border); }
        @media (max-width: 720px) { .case__facts { grid-template-columns: 1fr; } }
        .case__fact dt { font-family: var(--sc-font-mono); font-size: 0.7rem; letter-spacing: 0.06em; text-transform: uppercase; color: var(--sc-accent); margin: 0 0 0.5rem; }
        .case__fact dd { display: flex; align-items: baseline; gap: 0.5rem; font-family: var(--sc-font-text); font-size: 0.95rem; line-height: 1.5; color: var(--sc-ink-soft); margin: 0; }
        .status-dot {
          flex-shrink: 0;
          width: 6px; height: 6px; border-radius: 50%;
          background: #6ee7a8;
          box-shadow: 0 0 6px 1px rgba(110,231,168,0.5);
          transform: translateY(-1px);
        }

        .offer-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-top: clamp(2rem, 5vh, 3rem); }
        @media (max-width: 860px) { .offer-grid { grid-template-columns: 1fr; } }
        .offer { padding: clamp(1.75rem, 3vw, 2.25rem); }
        .offer__icon { width: 1.75rem; height: 1.75rem; color: var(--sc-accent); margin: 0 0 1.1rem; filter: drop-shadow(0 0 6px var(--sc-accent-glow)); }
        .offer__eyebrow { font-family: var(--sc-font-mono); font-size: 0.7rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--sc-accent); margin: 0 0 0.9rem; }
        .offer h3 { font-family: var(--sc-font-display); font-weight: 600; font-size: 1.35rem; color: var(--sc-ink); margin: 0 0 0.6rem; }
        .offer p { font-family: var(--sc-font-text); font-size: 0.92rem; line-height: 1.55; color: var(--sc-ink-soft); margin: 0 0 1.1rem; }
        .offer__price { font-family: var(--sc-font-mono); font-weight: 500; font-size: 1.05rem; color: var(--sc-ink); }

        .close { min-height: 100%; display: flex; align-items: center; padding: 0 var(--sc-gutter, 6vw); }
        .close__inner { max-width: 40rem; }
        .close :global(h2) { font-family: var(--sc-font-display); font-weight: 600; font-size: clamp(1.7rem, 3vw, 2.3rem); line-height: 1.3; color: var(--sc-ink); margin: 0 0 1.5rem; text-wrap: balance; }
        .close__cta { font-weight: 600; color: var(--sc-accent); text-decoration: underline; text-underline-offset: 0.2em; }
        .close__foot { margin-top: clamp(3rem, 8vh, 5rem); display: flex; align-items: baseline; justify-content: space-between; gap: 1rem; flex-wrap: wrap; font-family: var(--sc-font-mono); font-size: 0.75rem; color: var(--sc-ink-soft); }
        .close__foot a { color: var(--sc-ink-soft); }
      `}</style>
    </div>
  );
}
