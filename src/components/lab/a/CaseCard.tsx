"use client";

import { useRef, useState } from "react";
import Image from "next/image";

// Option A case media: the blurred RECO screenshot by default; on mouse hover,
// keyboard focus or a tap it crossfades to the 3 sourced numbers. The numbers
// stay in the DOM the whole time, so screen readers get them either way.
const NUMBERS = [
  { figure: "119", label: "wholesale accounts" },
  { figure: "2,500+", label: "sales leads" },
  { figure: "5", label: "agents" },
];

export default function CaseCard() {
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const [tapped, setTapped] = useState(false);
  const pointer = useRef<string>("mouse");
  const open = hover || focus || tapped;

  return (
    <div
      role="group"
      tabIndex={0}
      aria-label="RECO dashboard and its numbers"
      onPointerDown={(e) => {
        pointer.current = e.pointerType;
      }}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setHover(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") setHover(false);
      }}
      onFocus={(e) => {
        if (e.currentTarget.matches(":focus-visible")) setFocus(true);
      }}
      onBlur={() => setFocus(false)}
      onClick={() => {
        if (pointer.current !== "mouse") setTapped((t) => !t);
      }}
      className="relative block aspect-[1280/760] w-full cursor-default overflow-hidden rounded-[10px] border border-white/[0.08] bg-[#12151A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
    >
      <Image
        src="/projects/reco-dashboard-blurred.png"
        alt="RECO operations dashboard, figures blurred for confidentiality"
        fill
        sizes="(min-width: 768px) 700px, 100vw"
        className={`object-cover transition-opacity duration-500 motion-reduce:transition-none ${open ? "opacity-0" : "opacity-100"}`}
      />

      <div
        className={`absolute inset-0 flex flex-col justify-between bg-[#12151A] p-5 transition-opacity duration-500 motion-reduce:transition-none sm:p-8 ${open ? "opacity-100" : "opacity-0"}`}
      >
        <p className="text-[13px] text-[#8A9099]">RECO, running today</p>
        <dl className="grid grid-cols-3 gap-3 sm:gap-6">
          {NUMBERS.map((n) => (
            <div key={n.label} className="flex flex-col-reverse border-t border-white/[0.12] pt-3">
              <dt className="mt-2 text-[12px] text-[#8A9099] sm:text-[14px]">{n.label}</dt>
              <dd className="text-[1.9rem] font-light leading-none tracking-[-0.03em] text-[#F2F2F0] tabular-nums sm:text-5xl">
                {n.figure}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <span
        aria-hidden="true"
        className={`absolute bottom-3 right-3 rounded-[6px] bg-[#0B0D10]/80 px-2 py-1 text-[11px] text-[#B7BCC4] transition-opacity duration-300 ${open ? "opacity-0" : "opacity-100"}`}
      >
        Hover or tap for the numbers
      </span>
    </div>
  );
}
