"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import "./engine.css";
import "./audit-surface.css";

/* ------------------------------------------------------------------ data --
   Real output from an actual audit run (production pipeline, 2026), shown as
   the labelled sample. Anonymized to "5-location coworking operator" — same
   anonymization pattern as the /work showcase. Totals are computed from the
   rows below, not hardcoded, so the page's own math is the report's math. */

const SPECIMEN = "5-location coworking operator · 11–50 staff";

const OPPORTUNITIES = [
  { title: "Self-service room & desk booking", dept: "Operations", hrsMo: 48, rate: 28, ceiling: 75, savings: 60480, roiMonths: 3, quickWin: false },
  { title: "New-member onboarding & access provisioning", dept: "Operations", hrsMo: 52, rate: 28, ceiling: 70, savings: 58200, roiMonths: 2, quickWin: true },
  { title: "Prospect follow-up sequences", dept: "Sales", hrsMo: 40, rate: 35, ceiling: 65, savings: 54600, roiMonths: 1, quickWin: true },
  { title: "Membership renewal billing & dunning", dept: "Finance", hrsMo: 36, rate: 28, ceiling: 80, savings: 24700, roiMonths: 6, quickWin: false },
  { title: "Facility tickets & vendor follow-up", dept: "Facilities", hrsMo: 30, rate: 28, ceiling: 60, savings: 18144, roiMonths: 5, quickWin: true },
];

const SCORES = [
  { label: "AI Readiness", score: 26 },
  { label: "Data Visibility", score: 20 },
  { label: "Overall Maturity", score: 35, big: true },
  { label: "Automation Opp.", score: 41 },
  { label: "Revenue Accel.", score: 58 },
];

const KEY_GAPS = [
  "No CRM or member-management platform detected — follow-ups tracked by hand",
  "No scheduling or room-booking automation — staff coordinate reservations manually",
  "No onboarding workflow automation across any of the 5 locations",
];

const TOTAL_SAVINGS = OPPORTUNITIES.reduce((s, o) => s + o.savings, 0); // 216,124
const QUICK_WIN_SAVINGS = OPPORTUNITIES.filter((o) => o.quickWin).reduce((s, o) => s + o.savings, 0); // 130,944
const TOTAL_HRS = OPPORTUNITIES.reduce((s, o) => s + o.hrsMo, 0); // 206

const fmt = (n: number) => n.toLocaleString("en-US");

const AUDIT_APP = "https://audit.wexadvisory.com/audit";
const CTA_LABEL = "Analyze My Business";

/* ------------------------------------------------------------- ring SVG -- */

function Ring({ label, score, big = false, idx }: { label: string; score: number; big?: boolean; idx: number }) {
  const r = big ? 54 : 33;
  const stroke = big ? 8 : 6;
  const size = (r + stroke) * 2 + 4;
  const c = 2 * Math.PI * r;
  const a = (0.06 + idx * 0.05).toFixed(2);
  const b = (0.34 + idx * 0.05).toFixed(2);
  return (
    <div
      className={`scoring${big ? " scoring--big" : ""}`}
      style={{ "--score": score / 100, "--c": c, "--ra": a, "--rb": b } as CSSProperties}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" className="scoring__track" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          className="scoring__arc" strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={c}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="scoring__num">
        <span data-sc-count={`0 ${score}`} data-sc-count-at={`${a} ${b}`}>0</span>
      </div>
      <div className="scoring__label">{label}</div>
    </div>
  );
}

/* ---------------------------------------------------------------- page ---- */

declare global {
  interface Window {
    ScrollCraft?: { mount: (root: Element | Document, opts?: object) => void };
    __auditSurfaceMounted?: boolean;
  }
}

export default function AuditSurface() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [logEntries, setLogEntries] = useState<string[]>(["SAMPLE LOADED"]);
  const [url, setUrl] = useState("");

  /* Engine mount */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const boot = () => {
      if (window.__auditSurfaceMounted) return;
      window.__auditSurfaceMounted = true;
      window.ScrollCraft?.mount(root);
    };
    if (window.ScrollCraft) boot();
    else {
      const s = document.createElement("script");
      s.src = "/sc/scrollcraft.js";
      s.onload = boot;
      document.body.appendChild(s);
    }
  }, []);

  /* Signature move: the read-line. An invisible commit threshold at 62vh;
     values start unresolved and commit as they cross it, stamping the
     specimen log. Implemented with IntersectionObserver (rootMargin shrinks
     the viewport to its top 62%) so scrolling never forces layout — a
     per-frame getBoundingClientRect loop here was measurable jank. Pinned
     acts don't move relative to the viewport, so their commits key off the
     act's own --sc-p, read from inline style (no layout) on scroll. One-way,
     like a real log. */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reads = Array.from(root.querySelectorAll<HTMLElement>("[data-diag-read]"));
    const stamped = new Set<string>();
    const stamp = (t: string) => {
      if (stamped.has(t)) return;
      stamped.add(t);
      setLogEntries((prev) => [...prev, t]);
    };

    if (reduce) {
      reads.forEach((el) => el.classList.add("is-read"));
      return;
    }

    const readIo = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          el.classList.add("is-read");
          const note = el.getAttribute("data-diag-log");
          if (note) stamp(note);
          readIo.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -38% 0px" }
    );
    reads.forEach((el) => readIo.observe(el));

    const intake = root.querySelector<HTMLElement>("#intake");
    const scorePlate = root.querySelector<HTMLElement>("#score");
    const pinThresholds: Array<[HTMLElement | null, number, string]> = [
      [intake, 0.3, "SITE + JOB SIGNALS CRAWLED"],
      [intake, 0.7, "BENCHMARKED VS INDUSTRY"],
      [scorePlate, 0.3, "SCORES DRAWN"],
      [scorePlate, 0.55, `$${fmt(TOTAL_SAVINGS)} COMMITTED`],
    ];
    let pending = 0;
    const onScroll = () => {
      if (pending) return;
      pending = requestAnimationFrame(() => {
        pending = 0;
        for (const [el, at, note] of pinThresholds) {
          if (!el) continue;
          const p = parseFloat(el.style.getPropertyValue("--sc-p") || "0");
          if (p >= at) stamp(note);
        }
      });
    };
    addEventListener("scroll", onScroll, { passive: true });

    const run = root.querySelector("#run");
    let io: IntersectionObserver | undefined;
    if (run) {
      io = new IntersectionObserver(
        (es) => es.forEach((e) => e.isIntersecting && stamp("NEXT UP: YOUR BUSINESS")),
        { threshold: 0.4 }
      );
      io.observe(run);
    }
    return () => {
      readIo.disconnect();
      removeEventListener("scroll", onScroll);
      if (pending) cancelAnimationFrame(pending);
      io?.disconnect();
    };
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = new URLSearchParams({ utm_source: "audit-landing-v2" });
    const u = url.trim();
    if (u) q.set("url", u);
    window.location.href = `${AUDIT_APP}?${q.toString()}`;
  };

  return (
    <div ref={rootRef} className="diag">
      {/* -------------------------------------------------- fixed chrome -- */}
      <header className="diag-bar">
        <a className="diag-bar__mark" href="https://www.wexadvisory.com">
          <Image src="/wex-icon-wa.png" alt="Wex Advisory" width={83} height={56} priority className="diag-bar__logo" />
          <span className="diag-bar__word">
            <span className="diag-bar__word-top">Wex</span>
            <span className="diag-bar__word-bottom">Advisory</span>
          </span>
        </a>
        <span className="diag-bar__module">AI OPPORTUNITY AUDIT</span>
        <span className="diag-bar__status">FREE · PDF IN MINUTES</span>
        <a className="diag-bar__cta" href="#run">{CTA_LABEL}</a>
      </header>

      <aside className="diag-log" aria-label="Audit log">
        <div className="diag-log__head">AUDIT LOG</div>
        <ol>
          {logEntries.map((t, i) => (
            <li key={t}>
              <span className="diag-log__n">{String(i + 1).padStart(2, "0")}</span> {t}
            </li>
          ))}
        </ol>
      </aside>
      <div className="diag-chip" aria-hidden="true">LOG {String(logEntries.length).padStart(2, "0")}</div>

      <main>
        {/* --------------------------- ACT 1 · RECOGNITION: the boot (pin) -- */}
        <section id="intake" data-sc-act="pin" data-sc-span="1.7">
          <div data-sc-stage className="diag-stage diag-intake">
            <div className="diag-panel" data-sc-cue="0 0.9 0">
              <div className="diag-panel__head">
                <span>LIVE SAMPLE — REAL AUDIT RUN</span>
                <span className="diag-panel__spec">SUBJECT: {SPECIMEN.toUpperCase()} · ANONYMIZED</span>
              </div>
              <h1>See exactly where AI saves a business money.</h1>
              <p className="sc-body">
                This page is a real audit, run by our production pipeline on a real
                company. Scroll to read it. Then run your own, free.
              </p>
            </div>
            <div className="diag-boot">
              <p className="diag-boot__line" data-sc-cue="0 0.93 0">
                <span className="diag-boot__ok">OK</span> website crawled — 5 locations, 2 states
              </p>
              <p className="diag-boot__line" data-sc-cue="0.2 0.93">
                <span className="diag-boot__ok">OK</span> job postings + reviews read
              </p>
              <p className="diag-boot__line" data-sc-cue="0.35 0.94">
                <span className="diag-boot__ok">OK</span> 3 manual-process signals detected
              </p>
              <p className="diag-boot__line" data-sc-cue="0.5 0.95">
                <span className="diag-boot__ok">OK</span> benchmarked vs industry averages
              </p>
              {/* One-value cue: holds through the un-pin so the exit slide is
                  not an empty viewport (template's tension-pin precedent). */}
              <p className="diag-boot__line diag-boot__line--hot" data-sc-cue="0.66">
                analysis complete — rendering findings
              </p>
              <div className="diag-meter" aria-hidden="true"><i /></div>
            </div>
          </div>
        </section>

        {/* ------------------------- ACT 2 · TENSION: the labor ledger ----- */}
        <section id="cost" data-sc-act="flow" className="diag-cost">
          <div className="sc-wrap">
            <div className="diag-sechead" data-sc-in data-sc-stagger="60">
              <p className="sc-label">What manual work costs this business</p>
              <h2>Five workflows, run by hand.</h2>
              <p className="sc-body">
                Staff hours logged each month, at fully loaded rates, before any
                automation. Every figure below is from the actual report.
              </p>
            </div>

            <table className="diag-ledger">
              <thead>
                <tr>
                  <th scope="col">Workflow</th>
                  <th scope="col">Dept</th>
                  <th scope="col" className="num">Hrs / mo</th>
                  <th scope="col" className="num">Loaded rate</th>
                  <th scope="col" className="num">Automatable</th>
                </tr>
              </thead>
              <tbody>
                {OPPORTUNITIES.map((o) => (
                  <tr key={o.title} data-sc-in>
                    <td>{o.title}</td>
                    <td className="dim">{o.dept}</td>
                    <td className="num"><span data-diag-read>{o.hrsMo}</span></td>
                    <td className="num"><span data-diag-read>${o.rate}/hr</span></td>
                    <td className="num"><span data-diag-read>{o.ceiling}%</span></td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={2}>Staff-hours on work software can do</td>
                  <td className="num total">
                    <span data-diag-read data-diag-log={`${TOTAL_HRS} HRS/MO COMMITTED`}>{TOTAL_HRS}</span>
                  </td>
                  <td className="num dim" colSpan={2}>every month</td>
                </tr>
              </tfoot>
            </table>

            <ul className="diag-gaps" data-sc-in data-sc-stagger="70">
              {KEY_GAPS.map((g) => (
                <li key={g}><span className="diag-gaps__flag">GAP</span>{g}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* --------------------- ACT 3 · TURN: findings unsealed (reveal) -- */}
        <section id="findings" data-sc-act="flow" className="diag-findings">
          <div className="sc-wrap">
            <div className="diag-board" data-sc-reveal="up" data-sc-reveal-at="0.12 0.5">
              <div className="diag-board__head">
                <span>ANALYSIS COMPLETE</span>
                <span>5 OPPORTUNITIES · RANKED BY ANNUAL SAVINGS</span>
              </div>
              <ol className="diag-board__rows">
                {OPPORTUNITIES.map((o, i) => (
                  <li key={o.title}>
                    <span className="diag-board__rank">{i + 1}</span>
                    <span className="diag-board__title">
                      {o.title}
                      {o.quickWin && <em className="diag-board__qw">QUICK WIN</em>}
                    </span>
                    <span className="diag-board__roi">ROI {o.roiMonths} mo</span>
                    <span className="diag-board__save">
                      <span data-diag-read>${fmt(o.savings)}</span>
                      <i>/yr</i>
                    </span>
                  </li>
                ))}
              </ol>
              <p className="diag-board__foot" data-diag-read data-diag-log="5 OPPORTUNITIES RANKED">
                Each line: hours × loaded rate × automation ceiling, with named tools,
                implementation cost and payback period in the full report.
              </p>
            </div>
          </div>
        </section>

        {/* -------------------- ACT 4 · SUBSTANCE, THE PEAK: the score ----- */}
        <section id="score" data-sc-act="pin" data-sc-span="2" className="diag-score">
          <div data-sc-stage className="diag-stage diag-score__stage">
            <p className="sc-label" data-sc-cue="0 0.96 0">The readout</p>
            {/* Greet: the empty dials are the stage's ground during the entry
                slide; the arcs draw once the pin's progress starts. */}
            <div className="diag-rings" data-sc-cue="0 1 0 0.03">
              {SCORES.map((s, i) => (
                <Ring key={s.label} label={s.label} score={s.score} big={s.big} idx={i} />
              ))}
            </div>
            <div className="diag-total" data-sc-cue="0.34 1 0.2 0.03">
              <p className="diag-total__label">Identified annual savings</p>
              <p className="diag-total__num">
                $<span data-sc-count={`0 ${fmt(TOTAL_SAVINGS)}`} data-sc-count-at="0.4 0.62">0</span>
              </p>
              <p className="diag-total__sub">
                across 5 automatable workflows · ${fmt(QUICK_WIN_SAVINGS)} of it in
                quick wins with payback inside 6 months
              </p>
            </div>
          </div>
        </section>

        {/* Authored silence: a breath between the number landing and the ask. */}
        <div className="diag-silence" aria-hidden="true" />

        {/* ----------------------- ACT 5 · COMMITMENT: a real input --------- */}
        <section id="run" data-sc-act="flow" className="diag-run">
          <div className="sc-wrap">
            <div className="diag-run__plate" data-sc-in data-sc-stagger="70">
              <p className="diag-run__you">
                That was a real audit of someone else&rsquo;s business. This one is yours.
              </p>
              <form onSubmit={submit} className="diag-run__form">
                <label htmlFor="diag-url">YOUR WEBSITE URL</label>
                <div className="diag-run__row">
                  <input
                    id="diag-url"
                    type="text"
                    inputMode="url"
                    autoComplete="url"
                    placeholder="yourbusiness.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                  <button type="submit">{CTA_LABEL}</button>
                </div>
              </form>
              <p className="diag-run__fine">
                Free · no signup, no credit card · scores, ranked opportunities and
                full labor math · PDF in your inbox in minutes
              </p>
            </div>
            <footer className="diag-foot">
              <div className="diag-foot__brand">
                <p className="diag-foot__mark">Wex Advisory</p>
                <p className="diag-foot__tag">AI consulting for growing businesses.</p>
              </div>
              <nav className="diag-foot__links">
                <a href="https://www.wexadvisory.com/#flagship">Services</a>
                <a href="https://www.wexadvisory.com/work">Work</a>
                <a href="https://www.wexadvisory.com/#contact">Contact</a>
                <a href="https://www.wexadvisory.com/privacy">Privacy</a>
                <a href="https://www.wexadvisory.com/terms">Terms</a>
              </nav>
              <p className="diag-foot__copy">© {new Date().getFullYear()} Wex Advisory</p>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}
