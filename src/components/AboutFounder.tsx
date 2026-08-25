import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import Eyebrow from "@/components/design-system/Eyebrow";
import GlassCard from "@/components/design-system/GlassCard";

export default function AboutFounder() {
  return (
    <ScrollReveal>
      <section id="about" className="bg-[#0A1226] py-24 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <Eyebrow>About</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
            Who&apos;s behind the analysis
          </h2>

          <GlassCard className="overflow-hidden">
          <div className="flex flex-col md:flex-row gap-0">
            {/* Photo */}
            <div className="md:w-56 flex-shrink-0">
              <div className="relative w-full h-64 md:h-full min-h-[240px]">
                <Image
                  src="/headshot.jpg"
                  alt="Max Wexley"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 224px"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="flex-1 px-8 py-8 flex flex-col justify-center">
              <p className="text-gold text-xs font-bold tracking-[0.25em] uppercase mb-2">
                Founder
              </p>
              <h3 className="text-white text-2xl font-bold mb-1">Max Wexley</h3>
              <p className="text-white/40 text-sm mb-5">New York City</p>
              <p className="text-white/70 text-base leading-relaxed mb-4">
                I&apos;m a finance analyst by day and a builder by night. I built Wex Advisory
                because competitive intelligence was either out of reach for small businesses — locked
                behind $10,000 retainers — or too shallow to be useful.
              </p>
              <p className="text-white/70 text-base leading-relaxed">
                Every report I deliver is one I&apos;d want to receive myself: specific, actionable,
                and grounded in real data — not guesswork. The goal is simple: give growing companies
                the same quality of insight that larger competitors take for granted.
              </p>
            </div>
          </div>
          </GlassCard>
        </div>
      </section>
    </ScrollReveal>
  );
}
