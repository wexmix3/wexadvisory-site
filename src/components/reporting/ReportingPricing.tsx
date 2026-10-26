import Eyebrow from "@/components/design-system/Eyebrow";
import { PRICING } from "./content";

const TILES = [
  { figure: PRICING.build, title: "To build", note: PRICING.estimate },
  { figure: "5 to 20 hrs", title: "Most reporting builds", note: "$1,000 to $4,000 in total." },
  { figure: PRICING.maintenance, title: "Maintenance", note: "After launch, only when something needs changing." },
];

export default function ReportingPricing() {
  return (
    <section id="pricing" className="bg-[#0A1226] py-24 px-6 border-t border-white/5 scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <Eyebrow>Pricing</Eyebrow>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 max-w-2xl text-balance">What a reporting build costs.</h2>
        <div className="grid sm:grid-cols-3 gap-5">
          {TILES.map((t) => (
            <div key={t.title} className="bg-white/[0.04] border border-white/10 rounded-2xl backdrop-blur-sm p-7 flex flex-col">
              <span className="font-display text-white text-4xl leading-none tabular-nums mb-4">{t.figure}</span>
              <span className="text-white text-base font-bold mb-1.5">{t.title}</span>
              <span className="text-white/70 text-sm leading-relaxed">{t.note}</span>
            </div>
          ))}
        </div>
        <p className="text-white/70 text-sm mt-6">{PRICING.retainer}</p>
        <a
          href="/ai-consulting-for-small-businesses"
          className="inline-flex items-center min-h-11 mt-2 text-gold text-sm font-semibold hover:underline underline-offset-4"
        >
          Compare with typical market rates →
        </a>
      </div>
    </section>
  );
}
