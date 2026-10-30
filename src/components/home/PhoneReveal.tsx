"use client";

import { useEffect, useRef, useState } from "react";
import { cx } from "@/components/brand/cx";

// On phones, hides its children behind one button; from md up they always
// show. Used to fold the contact form under the booking CTA so the phone
// homepage stays short (2026-10-30). Renders the children once, so form ids
// stay unique. A /#contact deep link opens it (those links promise a way to
// write), and opening by tap moves focus to the first field so keyboard and
// screen-reader users are not dropped back to the top of the page.
export default function PhoneReveal({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const tapped = useRef(false);
  const content = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.location.hash === "#contact") setOpen(true);
  }, []);

  useEffect(() => {
    if (open && tapped.current) content.current?.querySelector<HTMLElement>("input, textarea")?.focus();
  }, [open]);

  return (
    <div>
      {!open && (
        <button
          type="button"
          onClick={() => {
            tapped.current = true;
            setOpen(true);
          }}
          className="flex min-h-11 w-full items-center justify-center rounded-[10px] border border-ink/30 bg-paper px-4 text-[15px] font-semibold text-ink md:hidden"
        >
          {label}
        </button>
      )}
      <div ref={content} className={cx(open ? "block" : "hidden md:block")}>
        {children}
      </div>
    </div>
  );
}
