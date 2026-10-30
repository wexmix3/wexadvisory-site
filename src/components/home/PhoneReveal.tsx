"use client";

import { useState } from "react";
import { cx } from "@/components/brand/cx";

// On phones, hides its children behind one button; from md up they always
// show. Used to fold the contact form under the booking CTA so the phone
// homepage stays short (2026-10-30). Renders the children once, so form ids
// stay unique.
export default function PhoneReveal({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          className="flex min-h-11 w-full items-center justify-center rounded-[10px] border border-ink/20 bg-paper px-4 text-[15px] font-semibold text-ink md:hidden"
        >
          {label}
        </button>
      )}
      <div className={cx(open ? "block" : "hidden md:block")}>{children}</div>
    </div>
  );
}
