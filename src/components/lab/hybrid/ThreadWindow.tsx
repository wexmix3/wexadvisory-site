"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/components/lab/motion";
import b from "@/components/lab/b/labb.module.css";
import h from "./hybrid.module.css";

// Option A's agent thread, redrawn in Option B's palette for the hybrid
// homepage (2026-10-29). White window on the warm canvas, ink type, mono for
// timestamps and table numbers, gold only on the Approve buttons, and the
// approved row takes B's selection fill (#F3E3B0) instead of A's green.
// The demo fires once, when the window scrolls into view (not on page load).
// Every account and number is SAMPLE data (the chrome says so); never swap in
// RECO's real accounts.

type Row = {
  account: string;
  lastOrder: string;
  delta: string;
  late: boolean;
  action: string;
};

const ROWS: Row[] = [
  {
    account: "Harbor & Pine Market",
    lastOrder: "41 days ago",
    delta: "20 days late",
    late: true,
    action: "Call to reorder, share the spring list",
  },
  {
    account: "Fieldhouse Goods",
    lastOrder: "18 days ago",
    delta: "-30% units",
    late: true,
    action: "Call: order down, check sell-through",
  },
  {
    account: "Coast Co-op",
    lastOrder: "9 days ago",
    delta: "+18% units",
    late: false,
    action: "Offer case-pack pricing on the next order",
  },
  {
    account: "Northside Provisions",
    lastOrder: "36 days ago",
    delta: "15 days late",
    late: true,
    action: "Email: invoice 1042 unpaid, then a reorder nudge",
  },
];

function ApproveButton({
  row,
  approved,
  onApprove,
}: {
  row: Row;
  approved: boolean;
  onApprove: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onApprove}
      aria-pressed={approved}
      aria-label={approved ? `Approved: ${row.account}` : `Approve: ${row.action} (${row.account})`}
      className={`${h.approve} ${b.focus}`}
      data-approved={approved}
    >
      {approved ? "Approved ✓" : "Approve"}
    </button>
  );
}

function Avatar({ kind }: { kind: "owner" | "agent" }) {
  if (kind === "owner") {
    return (
      <span
        aria-hidden="true"
        className={`${b.mono} flex h-9 w-9 shrink-0 items-center justify-center rounded-[6px] border border-[color:var(--grid)] bg-[color:var(--head)] text-[11px] font-medium text-[color:var(--ink)]`}
      >
        JO
      </span>
    );
  }
  return (
    <span
      aria-hidden="true"
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[6px] bg-[color:var(--ink)]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/wex-icon-wa.png" alt="" width={22} height={15} className="h-[15px] w-[22px]" />
    </span>
  );
}

export default function ThreadWindow() {
  const scope = useRef<HTMLDivElement>(null);
  const [approved, setApproved] = useState<Record<number, boolean>>({});
  const approve = (i: number) => setApproved((a) => ({ ...a, [i]: !a[i] }));
  const mono = b.mono;

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const msgs = Array.from(root.querySelectorAll<HTMLElement>("[data-msg]"));
      const rows = Array.from(root.querySelectorAll<HTMLElement>("[data-row]"));
      const follow = root.querySelector<HTMLElement>("[data-follow]");

      // Reduced motion: the end state of the demo, shown at once (CSS already
      // shows the messages; this just approves the first row).
      if (prefersReducedMotion()) {
        setApproved({ 0: true });
        root.dataset.demo = "done";
        return;
      }

      // The messages start hidden in CSS (.msg), so the server frame never shows
      // the finished thread before the demo runs; here they just get their offset.
      gsap.set([...msgs, ...(follow ? [follow] : [])], { y: 10 });

      const tl = gsap.timeline({
        paused: true,
        onComplete: () => {
          root.dataset.demo = "done";
        },
      });
      tl.to(msgs, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out", stagger: 0.4 });
      tl.from(rows, { opacity: 0, y: 6, duration: 0.3, stagger: 0.08, ease: "power1.out" }, "-=0.2");
      tl.call(() => setApproved((a) => ({ ...a, 0: true })), [], "+=0.9");
      if (follow) {
        tl.to(follow, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, "+=0.6");
      }

      gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 72%",
          once: true,
          onEnter: () => {
            root.dataset.demo = "running";
            tl.play();
          },
        },
      });
    },
    { scope }
  );

  return (
    <div
      ref={scope}
      data-demo="idle"
      className={`${h.thread} overflow-hidden bg-white text-[color:var(--ink)]`}
      role="region"
      aria-label="Example: a wholesale agent thread with sample data"
    >
      {/* Window chrome */}
      <div className="flex h-12 items-center justify-between gap-3 border-b border-[color:var(--grid)] bg-[color:var(--head)] px-4 md:px-5">
        <p className="flex min-w-0 items-center gap-2 truncate text-[14.5px] font-semibold">
          <span aria-hidden="true" className="flex gap-1.5 pr-2">
            <span className="h-2.5 w-2.5 rounded-full border border-[color:var(--line)]" />
            <span className="h-2.5 w-2.5 rounded-full border border-[color:var(--line)]" />
            <span className="h-2.5 w-2.5 rounded-full border border-[color:var(--line)]" />
          </span>
          <span aria-hidden="true" className="text-[color:var(--muted)]">
            #
          </span>
          wholesale-agent
        </p>
        <span
          className={`${mono} shrink-0 rounded-[4px] border border-[color:var(--grid)] bg-white px-1.5 py-0.5 text-[10.5px] uppercase tracking-[0.08em] text-[color:var(--muted)]`}
        >
          Sample data
        </span>
      </div>

      <div className="space-y-5 px-4 py-5 md:px-6 md:py-6">
        <div className="flex items-center gap-3" aria-hidden="true">
          <span className="h-px flex-1 bg-[color:var(--grid)]" />
          <span className={`${mono} text-[11px] text-[color:var(--muted)]`}>Monday</span>
          <span className="h-px flex-1 bg-[color:var(--grid)]" />
        </div>

        {/* Owner question */}
        <div data-msg className={`${h.msg} flex gap-3`}>
          <Avatar kind="owner" />
          <div className="min-w-0">
            <p className="text-[14px]">
              <span className="font-semibold">Jordan, owner</span>
              <span className={`${mono} ml-2 text-[11.5px] text-[color:var(--muted)]`}>8:02 AM</span>
            </p>
            <p className="text-[15.5px] leading-snug">Which wholesale accounts need a call this week?</p>
          </div>
        </div>

        {/* Agent reply with proposed actions */}
        <div data-msg className={`${h.msg} flex gap-3`}>
          <Avatar kind="agent" />
          <div className="min-w-0 flex-1">
            <p className="text-[14px]">
              <span className="font-semibold">Wholesale agent</span>
              <span
                className={`${mono} ml-1.5 rounded-[3px] border border-[color:var(--grid)] px-1 py-px text-[9.5px] text-[color:var(--muted)]`}
              >
                APP
              </span>
              <span className={`${mono} ml-2 text-[11.5px] text-[color:var(--muted)]`}>8:02 AM</span>
            </p>
            <p className="text-[15.5px] leading-snug">
              I checked 86 active accounts against their usual reorder gap. These 4 need you this week:
            </p>

            {/* Desktop: table */}
            <table className="mt-3 hidden w-full border-separate border-spacing-0 overflow-hidden rounded-[4px] border border-[color:var(--grid)] text-left text-[13.5px] md:table">
              <thead className={`${mono} bg-[color:var(--head)] text-[11px] text-[color:var(--muted)]`}>
                <tr>
                  <th scope="col" className="border-b border-[color:var(--grid)] px-3 py-2 font-normal">
                    Account
                  </th>
                  <th scope="col" className="border-b border-[color:var(--grid)] px-3 py-2 font-normal">
                    Last order
                  </th>
                  <th scope="col" className="border-b border-[color:var(--grid)] px-3 py-2 font-normal">
                    Proposed action
                  </th>
                  <th scope="col" className="border-b border-[color:var(--grid)] px-3 py-2 text-right font-normal">
                    <span className="sr-only">Approve</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r, i) => (
                  <tr key={r.account} data-row className={h.row} data-selected={!!approved[i]}>
                    <td className="px-3 py-2.5 font-semibold">{r.account}</td>
                    <td className={`${mono} whitespace-nowrap px-3 py-2.5 text-[12.5px] tabular-nums`}>
                      <span className="block">{r.lastOrder}</span>
                      <span
                        className={`block text-[11.5px] ${
                          r.late ? "font-bold text-[color:var(--ink)]" : "text-[color:var(--muted)]"
                        }`}
                      >
                        {r.delta}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 leading-snug">{r.action}</td>
                    <td className="px-3 py-2.5 text-right">
                      <ApproveButton row={r} approved={!!approved[i]} onApprove={() => approve(i)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Phones: stacked rows */}
            <ul className="mt-3 overflow-hidden rounded-[4px] border border-[color:var(--grid)] md:hidden">
              {ROWS.map((r, i) => (
                <li key={r.account} data-row className={`${h.row} space-y-1.5 p-3`} data-selected={!!approved[i]}>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-[14px] font-semibold">{r.account}</span>
                    <span
                      className={`${mono} shrink-0 text-[11.5px] tabular-nums ${
                        r.late ? "font-bold" : "text-[color:var(--muted)]"
                      }`}
                    >
                      {r.delta}
                    </span>
                  </div>
                  <p className="text-[13.5px] leading-snug">{r.action}</p>
                  <div className="flex items-center justify-between gap-3 pt-0.5">
                    <span className={`${mono} text-[11.5px] text-[color:var(--muted)]`}>
                      Last order {r.lastOrder}
                    </span>
                    <ApproveButton row={r} approved={!!approved[i]} onApprove={() => approve(i)} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Follow-up after the first approval */}
        <div data-follow className={`${h.msg} flex gap-3`}>
          <Avatar kind="agent" />
          <div className="min-w-0">
            <p className="text-[14px]">
              <span className="font-semibold">Wholesale agent</span>
              <span className={`${mono} ml-2 text-[11.5px] text-[color:var(--muted)]`}>8:03 AM</span>
            </p>
            <p className="text-[15.5px] leading-snug">
              Done. Harbor &amp; Pine is on Thursday&rsquo;s call list with their last 3 orders attached.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
