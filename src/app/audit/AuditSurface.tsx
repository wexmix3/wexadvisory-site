"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Button from "@/components/brand/Button";
import Eyebrow from "@/components/brand/Eyebrow";
import Heading from "@/components/brand/Heading";
import PageHero from "@/components/brand/PageHero";
import ProductWindow from "@/components/brand/ProductWindow";
import Section from "@/components/brand/Section";
import Tag from "@/components/brand/Tag";
import { Input, Label } from "@/components/brand/Field";
import { cardClass } from "@/components/brand/Card";
import { cx } from "@/components/brand/cx";
import { prefersReducedMotion } from "@/components/brand/motion";

/* 2026-10-29 brand pass (phase 2): the dark "diagnostic" surface (own header,
   fixed audit log, ScrollCraft pinned acts, own footer) became the site's
   brand system: Nav + PageHero + Sections + Footer, composed in page.tsx.
   Copy, the sample-report numbers, the audit.wexadvisory.com hand-off and its
   utm/pid pass-through are unchanged. The sample is a real audit with details
   changed, so its windows are tagged "Anonymized", not "Sample data". */

/* ------------------------------------------------------------------ data --
   Real output from an actual audit run (production pipeline, 2026), shown as
   the labelled sample. Company name, industry and identifying details are
   changed: workflow titles and gaps are written in industry-neutral terms, and
   no location counts, places or sector vocabulary appear anywhere on the page.
   The hours, rates, ceilings, savings and scores are the report's own numbers.
   Totals are computed from the rows below, not hardcoded, so the page's own
   math is the report's math. */

const SPECIMEN = "Multi-site service business · 11–50 staff";

const OPPORTUNITIES = [
  { title: "Self-service scheduling and booking", dept: "Operations", hrsMo: 48, rate: 28, ceiling: 75, savings: 60480, roiMonths: 3, quickWin: false },
  { title: "New-client onboarding and account setup", dept: "Operations", hrsMo: 52, rate: 28, ceiling: 70, savings: 58200, roiMonths: 2, quickWin: true },
  { title: "Prospect follow-up sequences", dept: "Sales", hrsMo: 40, rate: 35, ceiling: 65, savings: 54600, roiMonths: 1, quickWin: true },
  { title: "Recurring billing and renewals", dept: "Finance", hrsMo: 36, rate: 28, ceiling: 80, savings: 24700, roiMonths: 6, quickWin: false },
  { title: "Service requests and vendor follow-up", dept: "Operations", hrsMo: 30, rate: 28, ceiling: 60, savings: 18144, roiMonths: 5, quickWin: true },
];

const SCORES = [
  { label: "AI Readiness", score: 26 },
  { label: "Data Visibility", score: 20 },
  { label: "Overall Maturity", score: 35, big: true },
  { label: "Automation Opp.", score: 41 },
  { label: "Revenue Accel.", score: 58 },
];

const KEY_GAPS = [
  "No CRM detected: follow-ups tracked by hand",
  "No scheduling or booking automation: staff coordinate bookings by hand",
  "No onboarding workflow automation at any site",
];

const TOTAL_SAVINGS = OPPORTUNITIES.reduce((s, o) => s + o.savings, 0); // 216,124
const QUICK_WIN_SAVINGS = OPPORTUNITIES.filter((o) => o.quickWin).reduce((s, o) => s + o.savings, 0); // 130,944
const TOTAL_HRS = OPPORTUNITIES.reduce((s, o) => s + o.hrsMo, 0); // 206

const fmt = (n: number) => n.toLocaleString("en-US");

const AUDIT_APP = "https://audit.wexadvisory.com/audit";
const CTA_LABEL = "Analyze My Business";
const CALL_URL = "https://calendly.com/maxwexley-wexadvisory/30min";

const WINDOW_TAG = "Anonymized";

const BOOT_LINES = [
  "website crawled, business model classified",
  "job postings + reviews read",
  "3 manual-process signals detected",
  "benchmarked vs industry averages",
];

/* ------------------------------------------------------------- ring SVG -- */

function Ring({ label, score, big = false, drawn }: { label: string; score: number; big?: boolean; drawn: boolean }) {
  const r = big ? 54 : 33;
  const stroke = big ? 8 : 6;
  const size = (r + stroke) * 2 + 4;
  const c = 2 * Math.PI * r;
  const arc: CSSProperties = {
    strokeDashoffset: drawn ? c * (1 - score / 100) : c,
    transition: "stroke-dashoffset 1.2s cubic-bezier(0.22, 1, 0.36, 1)",
  };
  return (
    <div className={cx("flex flex-col items-center text-center", big && "order-first col-span-2 sm:order-none sm:col-span-1")}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--grid)" strokeWidth={stroke} />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="var(--ink)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={c}
            style={arc}
            className="motion-reduce:!transition-none"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </svg>
        <span
          className={cx(
            "absolute inset-0 flex items-center justify-center font-extrabold tabular-nums tracking-[-0.03em] text-ink",
            big ? "text-[40px]" : "text-[24px]"
          )}
        >
          {score}
        </span>
      </div>
      <p className="mt-3 font-mono text-[11.5px] uppercase tracking-[0.1em] text-muted">{label}</p>
    </div>
  );
}

/* -------------------------------------------------------- ledger table --
   DataTable's sheet style, page-local because this table needs a tfoot total
   row with merged cells (the DataTable primitive has no footer). */

const TH = "border-b border-r border-grid px-2.5 py-2 font-normal last:border-r-0 sm:px-4";
const TD = "border-b border-r border-grid px-2.5 py-3.5 align-top leading-snug last:border-r-0 sm:px-4";
// Phones: Dept folds under the workflow name so the three figures stay on screen.
const WIDE = "hidden sm:table-cell";

function Ledger() {
  return (
    <div className="mt-10 overflow-x-auto rounded-[4px] border border-grid bg-white">
      <table className="w-full border-separate border-spacing-0 font-mono text-[13px]">
        <caption className="sr-only">
          Five workflows run by hand: hours per month, loaded rate and automatable share
        </caption>
        <thead className="bg-chrome text-[11px] text-muted">
          <tr>
            <th scope="col" className={cx(TH, "text-left")}>Workflow</th>
            <th scope="col" className={cx(TH, WIDE, "text-left")}>Dept</th>
            <th scope="col" className={cx(TH, "text-right")}>Hrs / mo</th>
            <th scope="col" className={cx(TH, "text-right")}>Loaded rate</th>
            <th scope="col" className={cx(TH, "text-right")}>Automatable</th>
          </tr>
        </thead>
        <tbody>
          {OPPORTUNITIES.map((o) => (
            <tr key={o.title}>
              <th scope="row" className={cx(TD, "text-left font-normal text-ink")}>
                {o.title}
                <span className="mt-1 block text-[11.5px] text-muted sm:hidden">{o.dept}</span>
              </th>
              <td className={cx(TD, WIDE, "text-muted")}>{o.dept}</td>
              <td className={cx(TD, "text-right tabular-nums")}>{o.hrsMo}</td>
              <td className={cx(TD, "text-right tabular-nums")}>${o.rate}/hr</td>
              <td className={cx(TD, "text-right tabular-nums")}>{o.ceiling}%</td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-chrome">
          <tr>
            <td colSpan={2} className={cx("border-r border-grid px-4 py-3.5 text-ink", WIDE)}>
              Staff-hours on work software can do
            </td>
            <td className="border-r border-grid px-2.5 py-3.5 text-ink sm:hidden">Staff-hours on work software can do</td>
            <td className="border-r border-grid px-2.5 py-3.5 sm:px-4 text-right text-[15px] font-bold tabular-nums text-ink">
              {TOTAL_HRS}
            </td>
            <td colSpan={2} className="px-2.5 py-3.5 text-right text-muted sm:px-4">
              every month
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

/* ---------------------------------------------------------------- page ---- */

export default function AuditSurface() {
  const ringsRef = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);
  const [url, setUrl] = useState("");
  // Preserve incoming attribution (cold outreach sends ?utm_source=coldoutreach&pid=...)
  // through to the intake app on submit, instead of overwriting it with this page's own
  // source tag. Falls back to attributing this page when nothing arrived (organic/nav visits).
  const [tracking] = useState(() => {
    if (typeof window === "undefined") return { utm_source: "audit-landing", pid: "" };
    const p = new URLSearchParams(window.location.search);
    return {
      utm_source: p.get("utm_source") || "audit-landing",
      pid: p.get("pid") || "",
    };
  });

  /* The readout's arcs draw once when the dials scroll into view (at once
     with reduced motion or without IntersectionObserver). */
  useEffect(() => {
    const el = ringsRef.current;
    if (!el) return;
    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      setDrawn(true);
      return;
    }
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = new URLSearchParams({ utm_source: tracking.utm_source });
    if (tracking.pid) q.set("pid", tracking.pid);
    const u = url.trim();
    if (u) q.set("url", u);
    window.location.href = `${AUDIT_APP}?${q.toString()}`;
  };

  return (
    <>
      {/* ---------------------------------------------- hero: the sample -- */}
      <PageHero
        id="intake"
        eyebrow="Real audit, details changed"
        title="Free AI audit: see exactly where AI saves a business money."
        subhead="The AI audit is a free report and AI readiness assessment that ranks where AI can save your business time and money. This page is a real one, run by my production pipeline. Company name, industry and identifying details changed to protect the client. Scroll to read it. Then run your own, free."
        primary={{ href: "#run", label: CTA_LABEL }}
        secondary={{ href: CALL_URL, label: "Prefer to talk? Book a call →", external: true }}
        proof={<>Subject: {SPECIMEN} · anonymized · Free · PDF in minutes</>}
        mediaPosition="end"
        media={
          <ProductWindow title="Free AI audit" label="The audit run behind the sample report" tag={WINDOW_TAG}>
            <div className="space-y-3 p-5 font-mono text-[13px] leading-snug sm:p-6">
              {BOOT_LINES.map((l) => (
                <p key={l} className="flex gap-3">
                  <span className="shrink-0 font-bold text-ink">OK</span>
                  <span className="text-ink/80">{l}</span>
                </p>
              ))}
              <p className="border-t border-grid pt-3 font-bold text-ink">analysis complete, rendering findings</p>
              <div className="h-1.5 overflow-hidden rounded-full bg-grid" aria-hidden="true">
                <div className="h-full w-full bg-ink" />
              </div>
            </div>
          </ProductWindow>
        }
      />

      {/* ------------------------------------------------ the labor ledger -- */}
      <Section id="cost" divider aria-labelledby="cost-title">
        <Eyebrow>What manual work costs this business</Eyebrow>
        <Heading id="cost-title" reveal>
          Five workflows, run by hand.
        </Heading>
        <p className="mt-4 max-w-2xl text-[17px] leading-relaxed">
          Staff hours logged each month, at fully loaded rates, before any automation. Every figure below is from the
          actual report.
        </p>
        <Ledger />
        <ul className="mt-8 border-t border-ink/10" aria-label="Key gaps">
          {KEY_GAPS.map((g) => (
            <li key={g} className="flex items-start gap-3 border-b border-ink/10 py-4 text-[15.5px] leading-relaxed">
              <Tag className="mt-1">Gap</Tag>
              <span>{g}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* ---------------------------------------------------- the findings -- */}
      <Section id="findings" className="!pt-0" aria-label="Findings">
        <Eyebrow>
          Analysis complete<span className="sm:hidden"> · ranked by annual savings</span>
        </Eyebrow>
        <ProductWindow
          icon="sheet"
          title={
            <>
              5 opportunities<span className="hidden sm:inline"> · ranked by annual savings</span>
            </>
          }
          label="Findings: five opportunities ranked by annual savings"
          tag={WINDOW_TAG}
        >
          <ol>
            {OPPORTUNITIES.map((o, i) => (
              <li
                key={o.title}
                className="grid grid-cols-[24px_minmax(0,1fr)_auto] items-baseline gap-x-3 gap-y-1 border-b border-grid px-4 py-4 sm:grid-cols-[32px_minmax(0,1fr)_96px_150px] sm:gap-x-4 sm:px-6"
              >
                <span className="font-mono text-[12px] text-muted">{i + 1}</span>
                <span className="min-w-0 text-[15.5px] font-semibold leading-snug">
                  {o.title}
                  {o.quickWin && <Tag className="ml-2 align-[2px]">Quick win</Tag>}
                </span>
                <span className="col-start-2 row-start-2 font-mono text-[12px] text-muted sm:col-start-auto sm:row-start-auto sm:text-right">
                  ROI {o.roiMonths} mo
                </span>
                <span className="col-start-3 row-span-2 row-start-1 whitespace-nowrap text-right font-bold tabular-nums tracking-[-0.02em] sm:col-start-auto sm:row-span-1 sm:row-start-auto">
                  <span className="text-[18px] sm:text-[21px]">${fmt(o.savings)}</span>
                  <span className="ml-0.5 font-mono text-[11.5px] font-normal text-muted">/yr</span>
                </span>
              </li>
            ))}
          </ol>
          <p className="bg-chrome px-4 py-3 font-mono text-[12px] leading-relaxed text-muted sm:px-6">
            Each line: hours × loaded rate × automation ceiling, with named tools, implementation cost and payback period
            in the full report.
          </p>
        </ProductWindow>
      </Section>

      {/* ----------------------------------------------------- the readout -- */}
      <Section id="score" tone="band" aria-labelledby="score-label">
        <Eyebrow>
          <span id="score-label">The readout</span>
        </Eyebrow>
        <div
          ref={ringsRef}
          className="mt-6 grid grid-cols-2 items-end justify-items-center gap-x-6 gap-y-10 sm:grid-cols-5"
        >
          {SCORES.map((s) => (
            <Ring key={s.label} label={s.label} score={s.score} big={s.big} drawn={drawn} />
          ))}
        </div>
        <div className="mt-14 border-t border-ink/10 pt-10 text-center">
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">Identified annual savings</p>
          <p className="mt-3 text-[clamp(52px,9vw,104px)] font-extrabold leading-none tracking-[-0.045em] tabular-nums text-ink">
            ${fmt(TOTAL_SAVINGS)}
          </p>
          <p className="mx-auto mt-4 max-w-[560px] text-[16px] leading-relaxed text-muted">
            across 5 automatable workflows · ${fmt(QUICK_WIN_SAVINGS)} of it in quick wins with payback inside 6 months
          </p>
        </div>
      </Section>

      {/* ---------------------------------------------- run your own (form) -- */}
      <Section id="run" width="narrow" aria-labelledby="run-title">
        <div className={cx(cardClass("lg"), "sm:p-10")}>
          <p id="run-title" className="text-h3 text-ink">
            That was a real audit of someone else&rsquo;s business, with the details changed. This one is yours.
          </p>
          <form onSubmit={submit} className="mt-8">
            <Label htmlFor="diag-url">YOUR WEBSITE URL</Label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Input
                id="diag-url"
                type="text"
                inputMode="url"
                autoComplete="url"
                placeholder="yourbusiness.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="sm:flex-1"
              />
              <Button type="submit" block className="shrink-0">
                {CTA_LABEL}
              </Button>
            </div>
          </form>
          <p className="mt-4 font-mono text-[12px] leading-relaxed text-muted">
            Free · no signup, no credit card · scores, ranked opportunities and full labor math · PDF in your inbox in
            minutes
          </p>
          <div className="mt-4">
            <Button href={CALL_URL} external variant="quiet">
              Prefer to talk? Book a call &rarr;
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
