"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/components/brand/motion";
import ProductWindow from "@/components/brand/ProductWindow";
import styles from "./sheet.module.css";
import SheetTiles from "./SheetTiles";
import { JITTER, ROWS, SORTED_INDEX, TILE_GROUPS, type Source } from "./sheet-data";

// Hero option A (2026-11-06): the pinned sheet-to-dashboard scroll from
// SheetHero, reworked after Max called it "rigid and confusing". Same story,
// four fixes: (1) a 3-step strip says what is happening (sheet, sort,
// dashboard); (2) each row gets a colour stripe for the tile it feeds, so the
// groups read before they move, and rows are opaque so crossing rows never
// jumble; (3) no blank beat: rows fade while the groups morph into tiles and
// the tile contents fade in mid-morph; (4) a longer, smoother scrub (110% of a
// viewport, eased) instead of 55% at constant speed. Phones and reduced motion
// get the same static end state as SheetHero.

const COL_HEAD_H = 28;
const ROW_H = 34;
const BODY_TOP = COL_HEAD_H + ROW_H;
const GUTTER_W = 40;
const COL_A_W = 96;
const COL_B_W = 104;
const LETTERS = ["A", "B", "C", "D", "E", "F"];
const HEADERS = ["Date", "Source", "Ref", "Detail", "Amount", "Note"];
const ANIMATED_MQ = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";
const STEPS = ["Your sheet today", "Sorted by source", "Your dashboard, every morning"];

// Stripe colour = the tile the row feeds (tile 1 wholesale, 2 sales, 3 books).
const STRIPE: Record<Source, string> = {
  Wholesale: "#C8A84B",
  Shopify: "#0F1F3D",
  Amazon: "#0F1F3D",
  QuickBooks: "#8A93A3",
};

function Stack({ items, className }: { items: string[]; className?: string }) {
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

export default function SheetHeroA() {
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
        const steps = q<HTMLElement>("[data-step]");

        const tilesBottom = () => Math.max(...tiles.map((t) => t.offsetTop + t.offsetHeight), BODY_TOP) + 24;
        const fullH = canvas.offsetHeight;
        gsap.set(stage, { marginBottom: -Math.max(fullH - tilesBottom(), 0) });
        gsap.set(steps, { opacity: 0.35 });
        gsap.set(steps[0], { opacity: 1 });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: {
            trigger: stage,
            start: () => (stage.offsetHeight + 150 > window.innerHeight ? "top 72px" : "center center"),
            end: "+=110%",
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Step 1 -> 2: stripes show which tile each row feeds, the Source
        // column is selected, and the rows sort by group.
        tl.to(steps[0], { opacity: 0.35, duration: 0.3 }, 0.8)
          .to(steps[1], { opacity: 1, duration: 0.3 }, 0.8)
          .fromTo(q("[data-stripe]"), { scaleY: 0 }, { scaleY: 1, duration: 0.6, stagger: 0.03 }, 0.2)
          .to(q("[data-sel]"), { left: GUTTER_W + COL_A_W - 1, width: COL_B_W + 2, duration: 0.9 }, 0.5)
          .to(nameBox[0], { opacity: 0, duration: 0.3 }, 0.9)
          .to(nameBox[1], { opacity: 1, duration: 0.3 }, 0.9)
          .to(formula[0], { opacity: 0, duration: 0.3 }, 0.9)
          .to(formula[1], { opacity: 1, duration: 0.3 }, 0.9)
          .fromTo(q("[data-colfill]"), { opacity: 0 }, { opacity: 1, duration: 0.6 }, 1);

        rows.forEach((row, i) => {
          const dist = Math.abs(SORTED_INDEX[i] - i);
          tl.fromTo(
            row,
            { x: JITTER[i] ?? 0, y: 0, zIndex: 1 },
            { x: 0, y: (SORTED_INDEX[i] - i) * ROW_H, zIndex: 2 + dist, duration: 1.6 + dist * 0.05, ease: "power3.inOut" },
            1.4 + i * 0.04
          );
        });

        // Step 2 -> 3: rows fade while each group morphs into its tile; the
        // tile contents arrive during the morph, so there is no empty frame.
        tl.to(steps[1], { opacity: 0.35, duration: 0.3 }, 3.9)
          .to(steps[2], { opacity: 1, duration: 0.3 }, 3.9)
          .to(nameBox[1], { opacity: 0, duration: 0.3 }, 3.9)
          .to(nameBox[2], { opacity: 1, duration: 0.3 }, 3.9)
          .to(formula[1], { opacity: 0, duration: 0.3 }, 3.9)
          .to(formula[2], { opacity: 1, duration: 0.3 }, 3.9)
          .to(q("[data-sel], [data-colfill]"), { opacity: 0, duration: 0.5 }, 3.9)
          .to(q("[data-rows], [data-headrow], [data-colheads]"), { opacity: 0, duration: 0.9, ease: "power1.out" }, 4.1);

        // Bodies stay hidden while their box scales (scaled text stretches and
        // reads as noise); each one fades in as its own tile lands.
        gsap.set(bodies, { autoAlpha: 0 });
        tiles.forEach((tile, i) => {
          const [start, count] = TILE_GROUPS[i];
          const at = 3.9 + i * 0.3;
          tl.fromTo(bodies[i], { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }, at + 1.1);
          tl.fromTo(tile, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }, at).fromTo(
            tile,
            {
              x: () => -tile.offsetLeft,
              y: () => BODY_TOP + start * ROW_H - tile.offsetTop,
              scaleX: () => canvas.offsetWidth / Math.max(tile.offsetWidth, 1),
              scaleY: () => (count * ROW_H) / Math.max(tile.offsetHeight, 1),
              backgroundColor: "#FBF5E2",
              borderRadius: 4,
            },
            { x: 0, y: 0, scaleX: 1, scaleY: 1, backgroundColor: "#FFFFFF", borderRadius: 12, duration: 1.2, ease: "power3.inOut" },
            at
          );
        });

        tl.fromTo(canvas, { height: () => canvas.offsetHeight }, { height: tilesBottom, duration: 1.2 }, 4.4)
          .fromTo(bars, { scaleX: 0 }, { scaleX: 1, duration: 0.9, stagger: 0.1, ease: "power2.out" }, 5.2)
          .to({}, { duration: 0.8 });

        const hash = window.location.hash.slice(1);
        const target = hash ? document.getElementById(decodeURIComponent(hash)) : null;
        if (target) {
          requestAnimationFrame(() => {
            ScrollTrigger.refresh();
            target.scrollIntoView({ block: "start" });
          });
        }
      });

      return () => mm.revert();
    },
    { scope: stageRef }
  );

  return (
    <div ref={stageRef} className="relative mx-auto w-full max-w-[1040px]">
      <ol className="mb-4 hidden justify-center gap-8 font-mono text-[12px] text-ink md:flex" aria-hidden="true">
        {STEPS.map((s, i) => (
          <li key={s} data-step className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-ink/30 text-[10.5px]">{i + 1}</span>
            {s}
          </li>
        ))}
      </ol>

      <ProductWindow
        icon="sheet"
        shadow={false}
        label="Sample spreadsheet that sorts itself into a dashboard"
        title={<span className="font-mono text-[12px] font-normal">ops_tracker_FINAL_v7 (2).xlsx</span>}
      >
        <div className="font-mono hidden sm:flex items-center gap-5 px-4 h-8 border-b border-grid text-[11.5px] text-muted" aria-hidden="true">
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>Insert</span>
          <span>Format</span>
          <span>Data</span>
        </div>

        <div className="font-mono flex items-stretch h-9 border-b border-grid text-[12px]">
          <div className="w-[76px] shrink-0 border-r border-grid px-3" data-namebox>
            <Stack items={["A1", "B1", "A1:F13"]} />
          </div>
          <div className="shrink-0 px-3 flex items-center border-r border-grid italic text-muted">fx</div>
          <div className="flex-1 min-w-0 px-3" data-formula>
            <Stack items={["Date", "=SORT(A2:F13, B2:B13)", "=DASHBOARD(A1:F13)"]} />
          </div>
        </div>

        <div className={styles.scroller} tabIndex={0} role="region" aria-label="Sample spreadsheet, scrolls sideways">
          <div ref={canvasRef} className={styles.canvas}>
            <div data-colheads className={`${styles.gridRow} font-mono`} style={{ height: COL_HEAD_H }} aria-hidden="true">
              <span className={`${styles.cell} ${styles.colHead}`} />
              {LETTERS.map((l) => (
                <span key={l} className={`${styles.cell} ${styles.colHead}`}>
                  {l}
                </span>
              ))}
            </div>

            <div
              data-colfill
              aria-hidden="true"
              className="absolute z-0"
              style={{ left: GUTTER_W + COL_A_W, width: COL_B_W, top: COL_HEAD_H, height: ROW_H * (ROWS.length + 1), background: "#F3E3B0", opacity: 0 }}
            />
            <div
              data-sel
              aria-hidden="true"
              className="absolute z-[60] pointer-events-none"
              style={{ left: GUTTER_W - 1, width: COL_A_W + 2, top: COL_HEAD_H - 1, height: ROW_H + 2, border: "2px solid #C8A84B" }}
            >
              <span className="absolute -right-[4px] -bottom-[4px] w-[6px] h-[6px] bg-[#C8A84B] border border-white" />
            </div>

            <div role="table" aria-label="Sample data: orders, payouts, wholesale accounts and expenses in one sheet" className="font-mono relative z-10 text-[12px]">
              <div role="row" data-headrow className={`${styles.gridRow} font-bold bg-white`}>
                <span className={`${styles.cell} ${styles.gutter}`} aria-hidden="true">1</span>
                {HEADERS.map((h) => (
                  <span key={h} role="columnheader" className={styles.cell}>
                    {h}
                  </span>
                ))}
              </div>
              <div data-rows role="rowgroup" className={styles.rows}>
                {ROWS.map((r, i) => (
                  <div key={`${r.ref}-${r.detail}`} role="row" data-row className={`${styles.gridRow} relative bg-white`}>
                    <span className={`${styles.cell} ${styles.gutter} relative`} aria-hidden="true">
                      <span
                        data-stripe
                        className="absolute left-0 top-0 h-full w-[4px] origin-top"
                        style={{ background: STRIPE[r.source], transform: "scaleY(0)" }}
                      />
                      {i + 2}
                    </span>
                    <span role="cell" className={styles.cell}>{r.date}</span>
                    <span role="cell" className={styles.cell}>{r.source}</span>
                    <span role="cell" className={`${styles.cell} text-muted`}>{r.ref}</span>
                    <span role="cell" className={styles.cell}>{r.detail}</span>
                    <span role="cell" className={`${styles.cell} justify-end tabular-nums`}>{r.amount}</span>
                    <span role="cell" className={`${styles.cell} text-muted`}>{r.note}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${styles.overlay} ${styles.accented}`} data-overlay>
              <SheetTiles animated />
            </div>
          </div>
        </div>

        <div className="font-mono flex items-center gap-1 px-2 h-9 border-t border-grid text-[11px] text-muted overflow-hidden whitespace-nowrap" aria-hidden="true">
          <span className="px-3 py-1 rounded-[4px] bg-chrome text-ink">Sheet1</span>
          <span className="px-3 py-1">Copy of Sheet1</span>
          <span className="px-3 py-1">Wholesale (old)</span>
          <span className="px-3 py-1">DO NOT EDIT</span>
        </div>
      </ProductWindow>

      <div className={styles.staticWrap}>
        <p className="font-mono text-center text-[12px] text-muted my-5" aria-hidden="true">↓ sorted into</p>
        <div className={`${styles.staticTiles} ${styles.accented}`}>
          <SheetTiles animated={false} />
        </div>
      </div>
    </div>
  );
}
