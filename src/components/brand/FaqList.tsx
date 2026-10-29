"use client";

import { useId, useState } from "react";

// Accessible accordion: each question is a <button aria-expanded
// aria-controls> inside an <h3>, one answer open at a time. Answers stay in
// the DOM (hidden when closed) so they are in the server HTML for crawlers and
// match any FAQPage JSON-LD built from the same items.
export type FaqItem = { q: string; a: React.ReactNode };

export default function FaqList({ items, defaultOpen = null }: { items: FaqItem[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const base = useId();

  return (
    <div className="border-t border-ink/10">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btn = `${base}-q${i}`;
        const panel = `${base}-a${i}`;
        return (
          <div key={item.q} className="border-b border-ink/10">
            <h3 className="m-0">
              <button
                id={btn}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panel}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-start justify-between gap-6 py-5 text-left text-[16.5px] font-semibold leading-snug text-ink hover:underline hover:decoration-ink/30 hover:underline-offset-4"
              >
                <span>{item.q}</span>
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-[4px] border border-grid bg-white font-mono text-[14px] leading-none"
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>
            <div
              id={panel}
              role="region"
              aria-labelledby={btn}
              hidden={!isOpen}
              className="max-w-[680px] pb-6 text-[15.5px] leading-relaxed text-ink/85"
            >
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
