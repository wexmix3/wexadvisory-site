import { PrimaryCta, SecondaryCta } from "@/components/design-system/Cta";
import { CALENDLY, HERO } from "./content";

export default function ReportingHero() {
  return (
    <section className="bg-[#0A1226] pt-36 md:pt-44 pb-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-6">{HERO.eyebrow}</p>
        <h1 className="font-display text-[#f5f5f2] font-bold leading-[1.08] tracking-[-0.01em] text-[clamp(2.3rem,6vw,4.25rem)] mb-6 text-balance">
          {HERO.h1}
          <br />
          <span className="bg-gradient-to-r from-gold to-[#e9d9a8] bg-clip-text text-transparent">
            {HERO.h1Accent}
          </span>
        </h1>
        <p className="text-white/80 text-lg leading-relaxed max-w-3xl mx-auto mb-10">{HERO.sub}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <PrimaryCta href={CALENDLY} target="_blank" rel="noopener noreferrer">
            Book a 30-minute call
          </PrimaryCta>
          <SecondaryCta href="#send-a-report" className="text-base py-3.5">
            Send me one report
          </SecondaryCta>
        </div>
        <p className="text-white/60 text-sm mt-4">Free · 30 minutes · no pitch</p>
        <p className="text-white/70 text-sm mt-10 pt-6 border-t border-white/10 max-w-xl mx-auto">{HERO.proof}</p>
      </div>
    </section>
  );
}
