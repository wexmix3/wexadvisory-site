"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/components/brand/motion";
import ProductWindow from "@/components/brand/ProductWindow";
import styles from "./sheet.module.css";
import SheetTiles from "./SheetTiles";
import { JITTER, ROWS, SORTED_INDEX, TILE_GROUPS } from "./sheet-data";

// Homepage signature (Option B, promoted 2026-10-29): the hero sheet is
// pinned for about half a viewport of scroll and scrubbed. Rows start scattered in a mixed-source mess, the selection moves
// to the Source column, the rows sort into contiguous groups, then each group
// lifts out of the grid and lands as a dashboard tile (a FLIP from the group's
// rectangle to the tile's resting place). Phones and reduced motion get no pin:
// the messy sheet, then the tiles stacked under it (the end state). Phones
// show the first 7 rows only (sheet.module.css) to keep the hero short.

const COL_HEAD_H = 28;
const ROW_H = 34;
const BODY_TOP = COL_HEAD_H + ROW_H; // column letters + header row 1
const GUTTER_W = 40;
const COL_A_W = 96;
const COL_B_W = 104;
const LETTERS = ["A", "B", "C", "D", "E", "F"];
const HEADERS = ["Date", "Source", "Ref", "Detail", "Amount", "Note"];
const ANIMATED_MQ = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

function Stack({ items, className }: { items: string[]; className?: string }) {
  // Crossfading labels for the name box and formula bar. Only the first is
  // exposed to assistive tech; the others are visual states of the same box.
  return (
    <span className={`relative block w-full h-full ${className ?? ""}`}>
      {items.map((t, i) => (
        <span
          key={t}
          data-stack={i}
          aria-hidden={i > 0 ? true : undefined}
          className="absolute inset-0 flex items-center truncate"
          style={i > 0 ? { opacity: 0 } : undefined}
        >
          {t}
        </span>
      ))}
    </span>
  );
}

export default function SheetHero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const stage = stageRef.current;
      const canvas = canvasRef.current;
      if (!stage || !canvas) return;

      const mm = gsap.matchMedia();
      mm.add(ANIMATED_MQ, () => {
        const q = gsap.utils.selector(stage);
        const rows = q<HTMLElement>("[data-row]");
        const tiles = q<HTMLElement>("[data-anim-tile]");
        const bodies = q<HTMLElement>("[data-anim-body]");
        const bars = q<HTMLElement>("[data-anim-bar]");
        const nameBox = q<HTMLElement>("[data-namebox] [data-stack]");
        const formula = q<HTMLElement>("[data-formula] [data-stack]");

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: stage,
            // The sticky nav is 64px: pin below it when the sheet is taller than the
            // space left, else centre it in the viewport.
            start: () => (stage.offsetHeight + 104 > window.innerHeight ? "top 80px" : "center center"),
            end: "+=55%",
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Phase 1: select the Source column and sort by it.
        tl.to(q("[data-sel]"), { left: GUTTER_W + COL_A_W - 1, width: COL_B_W + 2, duration: 1.4, ease: "power1.inOut" }, 0.6)
          .to(nameBox[0], { opacity: 0, duration: 0.4 }, 1.2)
          .to(nameBox[1], { opacity: 1, duration: 0.4 }, 1.2)
          .to(formula[0], { opacity: 0, duration: 0.4 }, 1.2)
          .to(formula[1], { opacity: 1, duration: 0.4 }, 1.2)
          .fromTo(q("[data-colfill]"), { opacity: 0 }, { opacity: 1, duration: 0.8 }, 1.4);

        rows.forEach((row, i) => {
          tl.fromTo(
            row,
            { x: JITTER[i] ?? 0, y: 0 },
            { x: 0, y: (SORTED_INDEX[i] - i) * ROW_H, duration: 2.6, ease: "power2.inOut" },
            2 + i * 0.06
          );
        });

        // Phase 2: each sorted group lifts out and lands as a tile.
        tl.to(nameBox[1], { opacity: 0, duration: 0.4 }, 5.6)
          .to(nameBox[2], { opacity: 1, duration: 0.4 }, 5.6)
          .to(formula[1], { opacity: 0, duration: 0.4 }, 5.6)
          .to(formula[2], { opacity: 1, duration: 0.4 }, 5.6)
          .to(q("[data-sel], [data-colfill], [data-headrow]"), { opacity: 0, duration: 0.8 }, 5.6)
          .to(q("[data-rows]"), { opacity: 0, duration: 1.2 }, 6);

        tiles.forEach((tile, i) => {
          const [start, count] = TILE_GROUPS[i];
          const at = 5.8 + i * 0.3;
          tl.fromTo(tile, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, at).fromTo(
            tile,
            {
              x: () => -tile.offsetLeft,
              y: () => BODY_TOP + start * ROW_H - tile.offsetTop,
              scaleX: () => canvas.offsetWidth / Math.max(tile.offsetWidth, 1),
              scaleY: () => (count * ROW_H) / Math.max(tile.offsetHeight, 1),
              backgroundColor: "#F3E3B0",
              borderRadius: 4,
            },
            { x: 0, y: 0, scaleX: 1, scaleY: 1, backgroundColor: "#FFFFFF", borderRadius: 12, duration: 2.4, ease: "power2.inOut" },
            at
          );
        });

        // Phase 3: tile contents settle in, bars grow.
        tl.fromTo(bodies, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.2 }, 8.2)
          .fromTo(bars, { scaleX: 0 }, { scaleX: 1, duration: 1.1, stagger: 0.12, ease: "power2.out" }, 8.6)
          .to({}, { duration: 0.6 });
      });

      return () => mm.revert();
    },
    { scope: stageRef }
  );

  return (
    <div ref={stageRef} className="relative mx-auto w-full max-w-[1040px]">
      <ProductWindow
        icon="sheet"
        shadow={false}
        label="Sample spreadsheet that sorts itself into a dashboard"
        title={<span className="font-mono text-[12px] font-normal">ops_tracker_FINAL_v7 (2).xlsx</span>}
      >
        {/* Menu row */}
        <div
          className={`font-mono hidden sm:flex items-center gap-5 px-4 h-8 border-b border-grid text-[11.5px] text-muted`}
          aria-hidden="true"
        >
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>Insert</span>
          <span>Format</span>
          <span>Data</span>
        </div>

        {/* Formula bar */}
        <div className={`font-mono flex items-stretch h-9 border-b border-grid text-[12px]`}>
          <div className="w-[76px] shrink-0 border-r border-grid px-3" data-namebox>
            <Stack items={["A1", "B1", "A1:F13"]} />
          </div>
          <div className="shrink-0 px-3 flex items-center border-r border-grid italic text-muted">
            fx
          </div>
          <div className="flex-1 min-w-0 px-3" data-formula>
            <Stack items={["Date", "=GROUP(A2:F13, B2:B13)", "=DASHBOARD(A1:F13)"]} />
          </div>
        </div>

        {/* Grid */}
        <div className={styles.scroller} tabIndex={0} role="region" aria-label="Sample spreadsheet, scrolls sideways">
          <div ref={canvasRef} className={styles.canvas}>
            <div className={`${styles.gridRow} font-mono`} style={{ height: COL_HEAD_H }} aria-hidden="true">
              <span className={`${styles.cell} ${styles.colHead}`} />
              {LETTERS.map((l) => (
                <span key={l} className={`${styles.cell} ${styles.colHead}`}>
                  {l}
                </span>
              ))}
            </div>

            {/* Column B selection fill, then the selection outline (A1 to start). */}
            <div
              data-colfill
              aria-hidden="true"
              className="absolute z-0"
              style={{
                left: GUTTER_W + COL_A_W,
                width: COL_B_W,
                top: COL_HEAD_H,
                height: ROW_H * (ROWS.length + 1),
                background: "#F3E3B0",
                opacity: 0,
              }}
            />
            <div
              data-sel
              aria-hidden="true"
              className="absolute z-20 pointer-events-none"
              style={{
                left: GUTTER_W - 1,
                width: COL_A_W + 2,
                top: COL_HEAD_H - 1,
                height: ROW_H + 2,
                border: "2px solid #C8A84B",
              }}
            >
              <span className="absolute -right-[4px] -bottom-[4px] w-[6px] h-[6px] bg-[#C8A84B] border border-white" />
            </div>

            <div role="table" aria-label="Sample data: orders, payouts, wholesale accounts and expenses in one sheet" className={`font-mono relative z-10 text-[12px]`}>
              <div role="row" data-headrow className={`${styles.gridRow} font-bold`}>
                <span className={`${styles.cell} ${styles.gutter}`} aria-hidden="true">
                  1
                </span>
                {HEADERS.map((h) => (
                  <span key={h} role="columnheader" className={styles.cell}>
                    {h}
                  </span>
                ))}
              </div>
              <div data-rows role="rowgroup" className={styles.rows}>
                {ROWS.map((r, i) => (
                  <div key={`${r.ref}-${r.detail}`} role="row" data-row className={styles.gridRow}>
                    <span className={`${styles.cell} ${styles.gutter}`} aria-hidden="true">
                      {i + 2}
                    </span>
                    <span role="cell" className={styles.cell}>
                      {r.date}
                    </span>
                    <span role="cell" className={styles.cell}>
                      {r.source}
                    </span>
                    <span role="cell" className={`${styles.cell} text-muted`}>
                      {r.ref}
                    </span>
                    <span role="cell" className={styles.cell}>
                      {r.detail}
                    </span>
                    <span role="cell" className={`${styles.cell} justify-end tabular-nums`}>
                      {r.amount}
                    </span>
                    <span role="cell" className={`${styles.cell} text-muted`}>
                      {r.note}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.overlay} data-overlay>
              <SheetTiles animated />
            </div>
          </div>
        </div>

        {/* Sheet tabs */}
        <div
          className={`font-mono flex items-center gap-1 px-2 h-9 border-t border-grid text-[11px] text-muted overflow-hidden whitespace-nowrap`}
          aria-hidden="true"
        >
          <span className="px-3 py-1 rounded-[4px] bg-chrome text-ink">Sheet1</span>
          <span className="px-3 py-1">Copy of Sheet1</span>
          <span className="px-3 py-1">Wholesale (old)</span>
          <span className="px-3 py-1">DO NOT EDIT</span>
        </div>
      </ProductWindow>

      {/* Phones and reduced motion: the end state, stacked under the sheet. */}
      <div className={styles.staticWrap}>
        <p className={`font-mono text-center text-[12px] text-muted my-5`} aria-hidden="true">
          ↓ sorted into
        </p>
        <div className={styles.staticTiles}>
          <SheetTiles animated={false} />
        </div>
      </div>
    </div>
  );
}
