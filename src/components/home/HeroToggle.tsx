"use client";

import { useEffect, useRef, useState } from "react";
import ProductWindow from "@/components/brand/ProductWindow";
import { cx } from "@/components/brand/cx";
import { prefersReducedMotion } from "@/components/brand/motion";
import FlowTiles from "./FlowTiles";
import { FLOW_ROWS } from "./flow-data";

// Hero option C (2026-11-06): one window with a Spreadsheet / Dashboard
// switch. It flips to the dashboard once on its own, 1.4s after it is half in
// view, then the visitor can flip it back and forth. No pin, no scroll
// timeline; rows fold away top-down and the tiles rise in with a short
// stagger. Both views share one grid cell, so the window never changes size.
type View = "sheet" | "dash";

// Built from the same sample rows (flow-data.ts): the oldest wholesale gap and
// the two flagged expenses.
const QUEUE = [
  "Call Fern & Co. Grocers: 61 days since their last order",
  "Categorize Packaging, Uline ($642.10)",
  "Send the Meta ads charge ($1,450.00) to your CPA",
];

export default function HeroToggle() {
  const box = useRef<HTMLDivElement>(null);
  const touched = useRef(false);
  const [view, setView] = useState<View>("sheet");

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    let timer = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        timer = window.setTimeout(() => {
          if (!touched.current) setView("dash");
        }, prefersReducedMotion() ? 0 : 1400);
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  const pick = (v: View) => {
    touched.current = true;
    setView(v);
  };

  const dash = view === "dash";

  return (
    <div ref={box} className="mx-auto w-full max-w-[1040px] text-left">
      <div className="mb-3 flex justify-center">
        <div role="tablist" aria-label="Show the sample as" className="inline-flex rounded-[10px] border border-[var(--line)] bg-chrome p-1 font-mono text-[12.5px]">
          {(
            [
              ["sheet", "Your spreadsheet"],
              ["dash", "Your dashboard"],
            ] as const
          ).map(([v, label]) => (
            <button
              key={v}
              role="tab"
              type="button"
              aria-selected={view === v}
              onClick={() => pick(v)}
              className={cx(
                "rounded-[7px] px-4 py-1.5 transition-colors duration-200",
                view === v ? "bg-white text-ink shadow-[0_1px_2px_rgba(15,31,61,0.12)]" : "text-muted hover:text-ink"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <ProductWindow
        icon={dash ? "dots" : "sheet"}
        shadow={false}
        label="Sample spreadsheet and the dashboard built from it"
        title={
          <span className="font-mono text-[12px] font-normal">
            {dash ? "Ops dashboard · updated 7:00 AM" : "ops_tracker_FINAL_v7 (2).xlsx"}
          </span>
        }
      >
        {/* One track capped at the window width, or long rows widen it on phones. */}
        <div className="grid grid-cols-[minmax(0,1fr)]">
          {/* Sheet view */}
          <div
            role="table"
            aria-label="Sample data: orders, payouts, wholesale accounts and expenses"
            aria-hidden={dash}
            className={cx("col-start-1 row-start-1 font-mono text-[12px]", dash && "pointer-events-none")}
          >
            <div role="row" className="grid h-9 grid-cols-[88px_minmax(0,1fr)_96px] sm:grid-cols-[64px_104px_minmax(0,1fr)_112px] items-center border-b border-grid bg-chrome text-[11px] text-muted">
              {["Date", "Source", "Detail", "Amount"].map((h, i) => (
                <span key={h} role="columnheader" className={cx("px-3", i === 0 && "hidden sm:block", i === 3 && "text-right")}>
                  {h}
                </span>
              ))}
            </div>
            {FLOW_ROWS.map((r, i) => (
              <div
                key={r.detail}
                role="row"
                className="grid h-[38px] grid-cols-[88px_minmax(0,1fr)_96px] sm:grid-cols-[64px_104px_minmax(0,1fr)_112px] items-center border-b border-grid transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none"
                style={{
                  opacity: dash ? 0 : 1,
                  transform: dash ? "translateY(-10px)" : "none",
                  transitionDelay: `${(dash ? i : FLOW_ROWS.length - i) * 30}ms`,
                }}
              >
                <span role="cell" className="hidden px-3 text-muted sm:block">{r.date}</span>
                <span role="cell" className="truncate px-3">{r.source}</span>
                <span role="cell" className="truncate px-3">{r.detail}</span>
                <span role="cell" className="px-3 text-right tabular-nums">{r.amount}</span>
              </div>
            ))}
          </div>

          {/* Dashboard view */}
          <div
            aria-hidden={!dash}
            className={cx(
              "col-start-1 row-start-1 bg-chrome p-4 transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none sm:p-5",
              dash ? "opacity-100" : "pointer-events-none opacity-0"
            )}
            style={{ transform: dash ? "none" : "translateY(14px)", transitionDelay: dash ? "220ms" : "0ms" }}
          >
            <FlowTiles fed={dash ? FLOW_ROWS.length : 0} layout="row" />
            {/* What the agents queue from the same rows: the dashboard is not just numbers. */}
            <div className="mt-3 rounded-[10px] border border-[var(--line)] bg-white p-4 md:mt-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[15px] font-bold leading-tight tracking-[-0.01em]">Queued for you today</p>
                <span className="rounded-[4px] bg-chrome px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted">
                  Agents
                </span>
              </div>
              <ul className="mt-2 font-mono text-[11.5px]">
                {QUEUE.map((item) => (
                  <li key={item} className="flex items-center justify-between gap-3 border-t border-grid py-2 first:border-t-0">
                    <span className="min-w-0 truncate">{item}</span>
                    <span className="shrink-0 rounded-[6px] border border-ink/20 px-2 py-0.5 text-[10.5px]">Approve</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </ProductWindow>

      <p className="mt-4 text-center font-mono text-[12px] text-muted">
        Sample data. Same 8 rows, sorted into the 3 numbers you check every morning.
      </p>
    </div>
  );
}
