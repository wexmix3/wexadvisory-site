"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/components/brand/motion";
import ProductWindow from "@/components/brand/ProductWindow";
import { cx } from "@/components/brand/cx";
import FlowTiles from "./FlowTiles";
import { DEST_LABEL, FLOW_ROWS, type Dest } from "./flow-data";

// Hero option B (2026-11-06): the sheet and the dashboard side by side, both
// visible the whole time. Plays once when it scrolls into view (no pin, no
// scroll-jacking): each row lights up, its amount flies to the tile it feeds,
// and that tile's number counts up. Ends with every row tagged and a Replay
// link. Reduced motion: the finished state, no flights.
const STEP = 0.62; // seconds between rows
const ZERO: Record<Dest, number> = { sales: 0, calls: 0, books: 0 };

export default function HeroFlow() {
  const stage = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const [fed, setFed] = useState(0);
  const [pulses, setPulses] = useState(ZERO);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      const el = stage.current;
      if (!el) return;
      if (prefersReducedMotion()) {
        setFed(FLOW_ROWS.length);
        setDone(true);
        return;
      }
      const q = gsap.utils.selector(el);

      // One amount chip flies from row i's Amount cell to its tile, then the
      // tile takes the row (fed + 1) and pulses.
      const fly = (i: number) => {
        const row = FLOW_ROWS[i];
        const from = q<HTMLElement>(`[data-flow-amount="${i}"]`)[0];
        const to = q<HTMLElement>(`[data-dest="${row.dest}"]`)[0];
        if (!from || !to) return;
        const box = el.getBoundingClientRect();
        const a = from.getBoundingClientRect();
        const b = to.getBoundingClientRect();
        const chip = document.createElement("span");
        chip.textContent = row.amount;
        chip.setAttribute("aria-hidden", "true");
        chip.className =
          "pointer-events-none absolute z-40 rounded-[6px] border border-gold bg-selection px-2 py-1 font-mono text-[12px] tabular-nums text-ink shadow-[0_8px_20px_-8px_rgba(15,31,61,0.45)]";
        el.appendChild(chip);
        const x0 = a.right - box.left - chip.offsetWidth;
        const y0 = a.top - box.top + (a.height - chip.offsetHeight) / 2;
        const x1 = b.left - box.left + 16;
        const y1 = b.top - box.top + 14;
        gsap.set(chip, { x: x0, y: y0, left: 0, top: 0 });
        gsap
          .timeline({ onComplete: () => chip.remove() })
          .to(chip, { x: x1, duration: 0.7, ease: "power2.inOut" }, 0)
          .to(chip, { y: y1, duration: 0.7, ease: "power1.in" }, 0)
          .to(chip, { scale: 0.6, autoAlpha: 0, duration: 0.18, ease: "power1.in" }, 0.6)
          .add(() => {
            setFed(i + 1);
            setPulses((p) => ({ ...p, [row.dest]: p[row.dest] + 1 }));
          }, 0.62);
      };

      const rows = q<HTMLElement>("[data-flow-row]");
      // Start from transparent gold, not transparent black, or the highlight
      // passes through grey on its way in.
      gsap.set(rows, { backgroundColor: "rgba(243,227,176,0)" });
      const t = gsap.timeline({ paused: true, onComplete: () => setDone(true) });
      rows.forEach((r, i) => {
        const at = 0.3 + i * STEP;
        t.to(r, { backgroundColor: "#F3E3B0", duration: 0.18 }, at)
          .add(() => fly(i), at + 0.12)
          .to(r, { backgroundColor: "rgba(243,227,176,0)", duration: 0.6 }, at + 0.75);
      });
      t.to({}, { duration: 0.6 });
      tl.current = t;

      ScrollTrigger.create({ trigger: el, start: "top 65%", once: true, onEnter: () => t.play(0) });
    },
    { scope: stage }
  );

  const replay = () => {
    setFed(0);
    setPulses(ZERO);
    setDone(false);
    tl.current?.play(0);
  };

  return (
    <div ref={stage} className="relative mx-auto w-full max-w-[1040px] text-left">
      <div className="grid items-stretch gap-4 md:grid-cols-[minmax(0,1.2fr)_auto_minmax(0,0.8fr)] md:gap-3">
        <div className="min-w-0">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Your spreadsheet</p>
          <ProductWindow
            icon="sheet"
            shadow={false}
            label="Sample spreadsheet whose rows feed a dashboard"
            title={<span className="font-mono text-[12px] font-normal">ops_tracker_FINAL_v7 (2).xlsx</span>}
          >
            <div role="table" aria-label="Sample data: orders, payouts, wholesale accounts and expenses" className="font-mono text-[12px]">
              <div role="row" className="grid h-9 grid-cols-[88px_minmax(0,1fr)_88px_58px] sm:grid-cols-[54px_92px_minmax(0,1fr)_96px_62px] items-center border-b border-grid bg-chrome text-[11px] text-muted">
                {["Date", "Source", "Detail", "Amount", "Feeds"].map((h, i) => (
                  <span key={h} role="columnheader" className={cx("px-2.5", i === 0 && "hidden sm:block", i === 3 && "text-right")}>
                    {h}
                  </span>
                ))}
              </div>
              {FLOW_ROWS.map((r, i) => (
                <div
                  key={r.detail}
                  role="row"
                  data-flow-row
                  className="grid h-[38px] md:h-[47px] grid-cols-[88px_minmax(0,1fr)_88px_58px] sm:grid-cols-[54px_92px_minmax(0,1fr)_96px_62px] items-center border-b border-grid last:border-b-0"
                >
                  <span role="cell" className="hidden px-2.5 text-muted sm:block">{r.date}</span>
                  <span role="cell" className="truncate px-2.5">{r.source}</span>
                  <span role="cell" className="truncate px-2.5">{r.detail}</span>
                  <span role="cell" data-flow-amount={i} className="px-2.5 text-right tabular-nums">{r.amount}</span>
                  <span role="cell" className="px-2.5">
                    <span
                      className={cx(
                        "inline-flex items-center gap-1 text-[10.5px] uppercase tracking-wide transition-opacity duration-300",
                        i < fed ? "opacity-100" : "opacity-0"
                      )}
                    >
                      <span aria-hidden="true">✓</span>
                      {DEST_LABEL[r.dest]}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </ProductWindow>
        </div>

        <div className="hidden items-center justify-center pt-6 md:flex" aria-hidden="true">
          <span className="font-mono text-[18px] text-muted">→</span>
        </div>

        <div className="min-w-0">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Your dashboard</p>
          <div className="rounded-[12px] border border-[var(--line)] bg-chrome p-2.5">
            <FlowTiles fed={fed} layout="stack" pulses={pulses} />
          </div>
        </div>
      </div>

      <p className="mt-4 text-center font-mono text-[12px] text-muted" aria-live="polite">
        {done ? (
          <>
            8 rows in, 3 live numbers out. Sample data.{" "}
            <button type="button" onClick={replay} className="underline underline-offset-4 hover:text-ink">
              Replay
            </button>
          </>
        ) : (
          "Sample data. Each row lands in the number it changes."
        )}
      </p>
    </div>
  );
}
