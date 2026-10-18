import Eyebrow from "@/components/design-system/Eyebrow";
import { STEPS } from "./content";

// Same anatomy as the homepage Methodology section.
export default function Process() {
  return (
    <section id="how-it-works" className="bg-[#0A1226] py-24 px-6 border-t border-white/5 scroll-mt-20">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-start">
        <div>
          <Eyebrow>How it works</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 text-balance">
            From one report on your desk to one that runs itself.
          </h2>
          <p className="text-white/70 text-base leading-relaxed max-w-md">Each step ends with something you can hold me to.</p>
        </div>
        <ol className="bg-white/[0.04] border border-white/10 rounded-2xl backdrop-blur-sm px-6 sm:px-8">
          {STEPS.map((s, i) => (
            <li
              key={s.title}
              className="grid grid-cols-[2.75rem_1fr] sm:grid-cols-[3.5rem_1fr] py-7 border-b border-white/10 last:border-b-0"
            >
              <span className="font-display text-gold text-2xl leading-none tabular-nums pt-0.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-white text-lg font-bold mb-2">{s.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-3">{s.body}</p>
                <p className="text-sm leading-relaxed">
                  <span className="text-gold font-semibold">Output:</span> <span className="text-white">{s.output}</span>
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
