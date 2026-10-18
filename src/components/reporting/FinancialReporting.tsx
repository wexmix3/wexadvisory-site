import Eyebrow from "@/components/design-system/Eyebrow";
import { FINANCIAL } from "./content";

export default function FinancialReporting() {
  return (
    <section className="bg-[#0A1226] py-24 px-6 border-t border-white/5">
      <div className="max-w-3xl mx-auto">
        <Eyebrow>For finance teams</Eyebrow>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-balance">{FINANCIAL.h2}</h2>
        <div className="space-y-4">
          {FINANCIAL.body.map((p) => (
            <p key={p.slice(0, 24)} className="text-white/75 text-base leading-relaxed">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
