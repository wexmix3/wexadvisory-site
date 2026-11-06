"use client";

import { cx } from "@/components/brand/cx";
import { DEST_LABEL, SALES_MAX, flowTotals, usd0, type Dest } from "./flow-data";
import { useCountUp } from "./useCountUp";

// The three dashboard tiles beside the hero sheet (HeroFlow, 2026-11-06). Every
// figure is computed from the first `fed` sample rows, so the tiles fill as
// rows land. data-dest marks each tile as the landing spot for a flying amount.

function Tile({ dest, pulse, children }: { dest: Dest; pulse: number; children: React.ReactNode }) {
  return (
    <div
      data-dest={dest}
      // Re-keyed on every landing so the ring animation replays.
      key={`${dest}-${pulse}`}
      className={cx(
        "relative rounded-[10px] border border-[var(--line)] bg-white p-4",
        pulse > 0 && "motion-safe:animate-[tilePulse_700ms_ease-out]"
      )}
    >
      {children}
    </div>
  );
}

function Label({ dest, children }: { dest: Dest; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <p className="text-[15px] font-bold leading-tight tracking-[-0.01em]">{children}</p>
      <span className="shrink-0 rounded-[4px] bg-chrome px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted">
        {DEST_LABEL[dest]}
      </span>
    </div>
  );
}

export default function FlowTiles({
  fed,
  pulses,
}: {
  fed: number;
  pulses: Record<Dest, number>;
}) {
  const t = flowTotals(fed);
  const sales = useCountUp(t.sales);
  const spend = useCountUp(t.spend);

  return (
    <div className="grid gap-3">
      <Tile dest="sales" pulse={pulses.sales}>
        <Label dest="sales">Sales this week</Label>
        <p className="mt-2 text-[34px] font-extrabold leading-none tracking-[-0.03em] tabular-nums">{usd0(sales)}</p>
        <ul className="mt-3 space-y-1.5 font-mono text-[11.5px]">
          {t.channels.map((c) => (
            <li key={c.name} className="grid grid-cols-[64px_1fr_64px] items-center gap-2">
              <span>{c.name}</span>
              <span className="h-1.5 rounded-[2px] bg-[#EFE9DB]" aria-hidden="true">
                <span
                  className="block h-full rounded-[2px] bg-ink transition-[width] duration-500 ease-out"
                  style={{ width: `${Math.round((c.value / SALES_MAX) * 100)}%` }}
                />
              </span>
              <span className="text-right tabular-nums">{usd0(c.value)}</span>
            </li>
          ))}
        </ul>
      </Tile>

      <Tile dest="calls" pulse={pulses.calls}>
        <Label dest="calls">
          Wholesale: {t.calls.length} {t.calls.length === 1 ? "account needs" : "accounts need"} a call
        </Label>
        {/* min-heights hold the final size, so tiles do not grow as rows land. */}
        <ul className="mt-2 min-h-[87px] font-mono text-[11.5px]">
          {t.calls.length === 0 && <li className="py-1.5 text-muted">Nothing yet</li>}
          {t.calls.map((r) => (
            <li key={r.detail} className="flex justify-between gap-3 border-t border-grid py-1.5 first:border-t-0">
              <span className="truncate">{r.detail}</span>
              <span className="shrink-0 tabular-nums text-muted">{r.days}d since order</span>
            </li>
          ))}
        </ul>
      </Tile>

      <Tile dest="books" pulse={pulses.books}>
        <Label dest="books">Books: {t.books.length} to review</Label>
        <p className="mt-2 text-[26px] font-extrabold leading-none tracking-[-0.03em] tabular-nums">
          {usd0(spend)} <span className="font-mono text-[11px] font-normal tracking-normal text-muted">spent</span>
        </p>
        <ul className="mt-2 min-h-[58px] font-mono text-[11.5px]">
          {t.books.map((r) => (
            <li key={r.detail} className="flex justify-between gap-3 border-t border-grid py-1.5">
              <span className="truncate">{r.detail}</span>
              <span className="shrink-0 text-muted">{r.flag}</span>
            </li>
          ))}
        </ul>
      </Tile>
    </div>
  );
}
