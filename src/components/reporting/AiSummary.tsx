import Eyebrow from "@/components/design-system/Eyebrow";
import { AI_SUMMARY_SAMPLE } from "./content";

export default function AiSummary() {
  return (
    <section className="bg-[#0A1226] py-24 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <Eyebrow>The AI part</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 text-balance">
            A plain-English summary of what changed, at the top of every report.
          </h2>
          <p className="text-white/70 text-base leading-relaxed">
            Numbers tell you what happened. The summary tells the reader where to look: what moved, the likely reason,
            and what is worth acting on this week. It is written from the same data as the
            report. 25N&apos;s finance dashboard opens with one every day.
          </p>
        </div>
        <figure className="bg-white/[0.04] border border-white/10 rounded-2xl backdrop-blur-sm p-7">
          <figcaption className="flex items-center justify-between gap-3 mb-5 pb-4 border-b border-white/10">
            <span className="text-white text-sm font-semibold">What changed this week</span>
            <span className="text-[0.625rem] font-bold tracking-[0.15em] uppercase text-white/70 border border-white/25 rounded-full px-2.5 py-1">
              Sample
            </span>
          </figcaption>
          <ul className="space-y-4">
            {AI_SUMMARY_SAMPLE.lines.map((l) => (
              <li key={l} className="text-white/85 text-sm leading-relaxed pl-4 border-l border-gold/50">
                {l}
              </li>
            ))}
          </ul>
          <p className="text-white/60 text-xs mt-5">{AI_SUMMARY_SAMPLE.business}</p>
        </figure>
      </div>
    </section>
  );
}
