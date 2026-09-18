"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQS } from "./faq-data";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-[#0A1226] py-24 px-6 border-t border-white/5">
      <div className="max-w-3xl mx-auto">
        <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">FAQ</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
          Common questions
        </h2>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="bg-white/[0.04] rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 text-white/80 hover:text-white transition-colors"
              >
                <span className="font-semibold text-sm">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 flex-shrink-0 text-gold transition-transform ${open === i ? "rotate-180" : ""}`}
                  strokeWidth={2}
                />
              </button>
              {/* Always in the DOM (hidden when collapsed) so answers are in the
                  server-rendered HTML for crawlers; looks identical to before. */}
              <div
                hidden={open !== i}
                className="px-6 pb-5 text-white/60 text-sm leading-relaxed border-t border-white/[0.06] pt-4"
              >
                {faq.a}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-white/30 text-sm mt-10">
          Still have questions?{" "}
          <a href="/#contact" className="text-gold hover:underline">
            Send me a message →
          </a>
        </p>
      </div>
    </section>
  );
}
