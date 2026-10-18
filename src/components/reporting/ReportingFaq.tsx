import Eyebrow from "@/components/design-system/Eyebrow";
import { FAQS } from "./content";

export default function ReportingFaq() {
  return (
    <section id="faq" className="bg-[#0A1226] py-24 px-6 border-t border-white/5 scroll-mt-20">
      <div className="max-w-3xl mx-auto">
        <Eyebrow>Questions</Eyebrow>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 text-balance">Automated reporting, answered</h2>
        <div className="space-y-3">
          {FAQS.map((f) => (
            <details key={f.q} className="group bg-white/[0.04] border border-white/10 rounded-2xl px-6">
              <summary className="flex items-center justify-between gap-4 min-h-14 py-4 cursor-pointer list-none text-white/90 font-semibold">
                {f.q}
                <span className="text-gold text-xl leading-none transition-transform group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="text-white/75 text-sm leading-relaxed pb-5">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
