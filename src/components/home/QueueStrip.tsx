"use client";

import { useEffect, useState } from "react";
import { cx } from "@/components/brand/cx";
import { FLOW_ROWS, usd0 } from "./flow-data";

// "Queued for you today" under the hero sheet and dashboard (2026-11-06, from
// hero option C; Max: add it if it helps). The agents' side of the story: the
// same sample rows that fill the tiles also queue actions for the owner to
// approve, which previews the RECO proof (actions flagged, then approved).
// Each slot fills when its source row lands (fed), like the tiles; empty slots
// keep their size so nothing jumps. Approve is a real toggle, nothing is sent.
const ACTIONS = (() => {
  const call = FLOW_ROWS.map((r, i) => ({ r, i }))
    .filter(({ r }) => r.dest === "calls")
    .sort((a, b) => (b.r.days ?? 0) - (a.r.days ?? 0))[0];
  const books = FLOW_ROWS.map((r, i) => ({ r, i })).filter(({ r }) => r.flag);
  return [
    { row: call.i, text: `Call ${call.r.detail}: ${call.r.days} days since their last order` },
    ...books.map(({ r, i }) => ({
      row: i,
      text:
        r.flag === "uncategorized"
          ? `Categorize ${r.detail} (${usd0(r.value)})`
          : `Send the ${r.detail} charge (${usd0(r.value)}) to your CPA`,
    })),
  ];
})();

export default function QueueStrip({ fed }: { fed: number }) {
  const [approved, setApproved] = useState<Record<number, boolean>>({});
  const ready = ACTIONS.filter((a) => a.row < fed).length;

  // Replay starts from an empty queue, approvals included.
  useEffect(() => {
    if (fed === 0) setApproved({});
  }, [fed]);

  return (
    <div className="mt-4 rounded-[12px] border border-[var(--line)] bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[15px] font-bold leading-tight tracking-[-0.01em]">
          Queued for you today{ready > 0 && <span className="font-mono text-[12px] font-normal text-muted"> · {ready}</span>}
        </p>
        <span className="shrink-0 rounded-[4px] bg-chrome px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted">
          Agents
        </span>
      </div>
      <ul className="mt-3 grid gap-2 font-mono text-[11.5px] md:grid-cols-3">
        {ACTIONS.map((a) => {
          const shown = a.row < fed;
          const ok = approved[a.row];
          return (
            <li
              key={a.text}
              className={cx(
                // Fixed height fits two lines, so a slot never grows when its text arrives.
                "flex h-[58px] items-center justify-between gap-3 rounded-[8px] border px-3 py-2 transition-[opacity,border-color] duration-300",
                shown ? "border-grid opacity-100" : "border-dashed border-grid opacity-60"
              )}
            >
              {shown ? (
                <>
                  <span className="line-clamp-2 min-w-0">{a.text}</span>
                  <button
                    type="button"
                    aria-pressed={!!ok}
                    onClick={() => setApproved((s) => ({ ...s, [a.row]: !s[a.row] }))}
                    className={cx(
                      "shrink-0 rounded-[6px] border px-2 py-1 text-[10.5px] transition-colors",
                      ok ? "border-ink bg-ink text-white" : "border-ink/25 hover:border-ink"
                    )}
                  >
                    {ok ? "Approved ✓" : "Approve"}
                  </button>
                </>
              ) : (
                <span className="text-muted">Waiting on today&apos;s rows</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
