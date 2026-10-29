"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/components/lab/motion";

// Option A hero product window (art-direction lab, 2026-10-29). A Slack-like
// agent thread: the owner asks a question, the wholesale agent answers with a
// table of proposed actions, and one action gets approved on its own. Every
// account name and number here is SAMPLE data (the chrome says so); never
// swap in RECO's real figures.

const CHANNELS = [
  "wholesale-agent",
  "inventory-agent",
  "finance-digest",
  "inbox-agent",
  "leads-agent",
];

type Tone = "up" | "down";
type Row = {
  account: string;
  lastOrder: string;
  delta: string;
  tone: Tone;
  action: string;
};

const ROWS: Row[] = [
  {
    account: "Harbor & Pine Market",
    lastOrder: "41 days ago",
    delta: "20 days late",
    tone: "down",
    action: "Call to reorder, share the spring list",
  },
  {
    account: "Fieldhouse Goods",
    lastOrder: "18 days ago",
    delta: "-30% units",
    tone: "down",
    action: "Call: order down, check sell-through",
  },
  {
    account: "Coast Co-op",
    lastOrder: "9 days ago",
    delta: "+18% units",
    tone: "up",
    action: "Offer case-pack pricing on the next order",
  },
  {
    account: "Northside Provisions",
    lastOrder: "36 days ago",
    delta: "15 days late",
    tone: "down",
    action: "Email: invoice 1042 unpaid, then a reorder nudge",
  },
];

const toneClass: Record<Tone, string> = {
  up: "text-[#1F7A4D]",
  down: "text-[#B4372F]",
};

function ApproveButton({
  row,
  approved,
  onApprove,
  wide = false,
}: {
  row: Row;
  approved: boolean;
  onApprove: () => void;
  wide?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onApprove}
      aria-pressed={approved}
      aria-label={approved ? `Approved: ${row.account}` : `Approve: ${row.action} (${row.account})`}
      className={[
        "inline-flex items-center justify-center whitespace-nowrap rounded-[6px] px-3 py-1.5 text-[13px] font-medium",
        "transition-[background-color,color,border-color,transform] duration-300",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B0D10]",
        wide ? "w-full" : "min-w-[96px]",
        approved
          ? "border border-[#1F7A4D]/30 bg-[#EEF6F1] text-[#1F7A4D] scale-[1.02]"
          : "border border-[#C8A84B] bg-[#C8A84B] text-[#0B0D10] hover:bg-[#B8983F]",
      ].join(" ")}
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
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#E7E8EA] text-[12px] font-medium text-[#3B4048]"
      >
        JO
      </span>
    );
  }
  return (
    <span
      aria-hidden="true"
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#0B0D10]"
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

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const msgs = Array.from(root.querySelectorAll<HTMLElement>("[data-msg]"));
      const rows = Array.from(root.querySelectorAll<HTMLElement>("[data-row]"));
      const follow = root.querySelector<HTMLElement>("[data-follow]");
      const all = follow ? [...msgs, follow] : msgs;

      // Reduced motion: show the end state of the little demo at once.
      if (prefersReducedMotion()) {
        gsap.set(all, { opacity: 1, y: 0 });
        setApproved({ 0: true });
        return;
      }

      const tl = gsap.timeline({ delay: 0.5 });
      tl.fromTo(
        msgs,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power2.out", stagger: 0.4 }
      );
      tl.from(rows, { opacity: 0, y: 6, duration: 0.3, stagger: 0.08, ease: "power1.out" }, "-=0.2");
      tl.call(() => setApproved((a) => ({ ...a, 0: true })), [], "+=0.9");
      if (follow) {
        tl.fromTo(
          follow,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
          "+=0.6"
        );
      }
    },
    { scope }
  );

  return (
    <div
      ref={scope}
      className="overflow-hidden rounded-[10px] bg-white text-[#16191D] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] ring-1 ring-white/10"
      role="region"
      aria-label="Example: a wholesale agent thread with sample data"
    >
      <div className="flex md:min-h-[520px]">
        {/* Channel list (desktop only) */}
        <aside className="hidden w-56 shrink-0 flex-col border-r border-[#ECEDEF] bg-[#FAFAFA] md:flex">
          <div className="flex h-14 items-center gap-2.5 border-b border-[#ECEDEF] px-4">
            <span
              aria-hidden="true"
              className="flex h-6 w-6 items-center justify-center rounded bg-[#16191D] text-[11px] font-medium text-white"
            >
              Y
            </span>
            <span className="text-[15px] font-medium">Your brand</span>
          </div>
          <p className="px-4 pb-1.5 pt-4 text-[12px] text-[#6B7079]">Agents</p>
          <ul className="space-y-0.5 px-2 text-[14px]">
            {CHANNELS.map((c, i) => (
              <li
                key={c}
                className={[
                  "flex items-center gap-1.5 rounded-md px-2.5 py-1.5",
                  i === 0 ? "bg-[#ECEDEF] font-medium text-[#16191D]" : "text-[#4A4F57]",
                ].join(" ")}
              >
                <span aria-hidden="true" className="text-[#9AA0A8]">
                  #
                </span>
                {c}
              </li>
            ))}
          </ul>
          <div aria-hidden="true" className="mt-4 space-y-3 px-4">
            <div className="h-2 w-28 rounded bg-[#ECEDEF]" />
            <div className="h-2 w-20 rounded bg-[#ECEDEF]" />
            <div className="h-2 w-24 rounded bg-[#ECEDEF]" />
          </div>
        </aside>

        {/* Thread */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex h-12 items-center justify-between gap-3 border-b border-[#ECEDEF] px-4 md:h-14 md:px-6">
            <p className="truncate text-[15px] font-medium">
              <span aria-hidden="true" className="text-[#9AA0A8]">
                #{" "}
              </span>
              wholesale-agent
            </p>
            <span className="shrink-0 rounded-[4px] border border-[#DADCE0] px-1.5 py-0.5 text-[11px] font-medium uppercase tracking-[0.06em] text-[#6B7079]">
              Sample data
            </span>
          </div>

          <div className="flex-1 space-y-5 px-4 py-5 md:px-6">
            <div className="flex items-center gap-3" aria-hidden="true">
              <span className="h-px flex-1 bg-[#ECEDEF]" />
              <span className="rounded-full border border-[#ECEDEF] px-2.5 py-0.5 text-[11px] text-[#4A4F57]">
                Monday
              </span>
              <span className="h-px flex-1 bg-[#ECEDEF]" />
            </div>

            {/* Owner question */}
            <div data-msg className="la-msg flex gap-3 opacity-0">
              <Avatar kind="owner" />
              <div className="min-w-0">
                <p className="text-[14px]">
                  <span className="font-medium">Jordan, owner</span>
                  <span className="ml-2 text-[12px] text-[#8A9099]">8:02 AM</span>
                </p>
                <p className="text-[15px] leading-snug">Which wholesale accounts need a call this week?</p>
              </div>
            </div>

            {/* Agent reply with proposed actions */}
            <div data-msg className="la-msg flex gap-3 opacity-0">
              <Avatar kind="agent" />
              <div className="min-w-0 flex-1">
                <p className="text-[14px]">
                  <span className="font-medium">Wholesale agent</span>
                  <span className="ml-1.5 rounded-[3px] bg-[#ECEDEF] px-1 py-px text-[10px] font-medium text-[#6B7079]">
                    APP
                  </span>
                  <span className="ml-2 text-[12px] text-[#8A9099]">8:02 AM</span>
                </p>
                <p className="text-[15px] leading-snug">
                  I checked 86 active accounts against their usual reorder gap. These 4 need you this week:
                </p>

                {/* Desktop: table */}
                <table className="mt-3 hidden w-full max-w-[780px] overflow-hidden rounded-lg border border-[#ECEDEF] text-left text-[13.5px] md:table">
                  <thead className="bg-[#FAFAFA] text-[12px] text-[#6B7079]">
                    <tr>
                      <th scope="col" className="px-3.5 py-2 font-medium">Account</th>
                      <th scope="col" className="px-3.5 py-2 font-medium">Last order</th>
                      <th scope="col" className="px-3.5 py-2 font-medium">Proposed action</th>
                      <th scope="col" className="px-3.5 py-2 text-right font-medium">
                        <span className="sr-only">Approve</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ROWS.map((r, i) => (
                      <tr key={r.account} data-row className="border-t border-[#ECEDEF] align-middle">
                        <td className="px-3.5 py-2.5 font-medium">{r.account}</td>
                        <td className="px-3.5 py-2.5">
                          <span className="block">{r.lastOrder}</span>
                          <span className={`block text-[12px] ${toneClass[r.tone]}`}>{r.delta}</span>
                        </td>
                        <td className="px-3.5 py-2.5 text-[#3B4048]">{r.action}</td>
                        <td className="px-3.5 py-2.5 text-right">
                          <ApproveButton row={r} approved={!!approved[i]} onApprove={() => approve(i)} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Mobile: stacked rows */}
                <ul className="mt-3 divide-y divide-[#ECEDEF] rounded-lg border border-[#ECEDEF] md:hidden">
                  {ROWS.map((r, i) => (
                    <li key={r.account} data-row className="space-y-1.5 p-3">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-[14px] font-medium">{r.account}</span>
                        <span className={`shrink-0 text-[12px] ${toneClass[r.tone]}`}>{r.delta}</span>
                      </div>
                      <p className="text-[13px] text-[#3B4048]">{r.action}</p>
                      <div className="flex items-center justify-between gap-3 pt-0.5">
                        <span className="text-[12px] text-[#6B7079]">Last order {r.lastOrder}</span>
                        <ApproveButton row={r} approved={!!approved[i]} onApprove={() => approve(i)} />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Follow-up after the first approval */}
            <div data-follow className="la-msg flex gap-3 opacity-0">
              <Avatar kind="agent" />
              <div className="min-w-0">
                <p className="text-[14px]">
                  <span className="font-medium">Wholesale agent</span>
                  <span className="ml-2 text-[12px] text-[#8A9099]">8:03 AM</span>
                </p>
                <p className="text-[15px] leading-snug">
                  Done. Harbor &amp; Pine is on Thursday&rsquo;s call list with their last 3 orders attached.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
