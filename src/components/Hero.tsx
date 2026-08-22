import { ChevronDown } from "lucide-react";
import ParticleGlobe from "./ParticleGlobe";

const AUDIT_URL = "https://audit.wexadvisory.com/audit";

export default function Hero() {
  return (
    <section className="relative min-h-dvh bg-navy glow-navy flex flex-col justify-center pt-28 pb-16 px-6 overflow-hidden">
      <ParticleGlobe />

      {/* Scrim: protects text contrast against the globe without dimming the globe itself */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, #0F1F3D 0%, rgba(15,31,61,0.92) 38%, rgba(15,31,61,0.55) 58%, rgba(15,31,61,0) 78%)",
        }}
      />

      <div className="max-w-4xl mx-auto w-full relative z-10">
        {/* Eyebrow */}
        <p className="text-gold text-xs font-bold tracking-[0.35em] uppercase mb-6">
          Custom AI Automation &amp; Systems
        </p>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
          The same caliber of automation{" "}
          <span className="text-gold">running two real businesses today</span> — built around whatever
          your team actually needs.
        </h1>

        {/* Subhead */}
        <p className="text-white/60 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          I build the automation and systems mid-sized teams can&apos;t get from a $10K/mo agency and
          can&apos;t build themselves without an engineer on staff — customer-facing tools, internal
          dashboards, financial workflows, or anything in between. Agents that actually run in production,
          not a slide deck.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 mb-10">
          <a
            href="#flagship"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gold text-navy font-bold text-sm hover:bg-gold-muted transition-colors"
          >
            See What This Looks Like →
          </a>
          <a
            href={AUDIT_URL}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/20 text-white/80 font-semibold text-sm hover:border-gold hover:text-gold transition-colors"
          >
            Free AI Snapshot (no cost)
          </a>
        </div>

        {/* Trust bar */}
        <div className="flex flex-wrap gap-6 text-white/30 text-xs">
          <span className="flex items-center gap-1.5">Built and running for real clients today</span>
          <span className="flex items-center gap-1.5">No tech team required on your side</span>
          <span className="flex items-center gap-1.5">Scoped to the actual work — never a generic package</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 flex justify-center mt-12 md:mt-16">
        <a href="#proof" className="text-white/20 hover:text-white/40 transition-colors animate-bounce">
          <ChevronDown className="w-6 h-6" strokeWidth={1.5} />
        </a>
      </div>
    </section>
  );
}
