import Image from "next/image";
import Eyebrow from "@/components/design-system/Eyebrow";

// Short founder block for the homepage. Deliberately separate from
// AboutFounder.tsx (used on other pages, edited on its own track).
export default function Founder() {
  return (
    <section id="about" className="bg-[#0A1226] py-24 px-6 border-t border-white/5">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/[0.04] border border-white/10 rounded-2xl backdrop-blur-sm p-7 sm:p-9 flex flex-col sm:flex-row gap-7 sm:gap-9 items-start">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-full overflow-hidden border border-gold/30">
            <Image src="/headshot.jpg" alt="Max Wexley" fill className="object-cover" sizes="112px" />
          </div>
          <div>
            <Eyebrow>Who you work with</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Max Wexley</h2>
            <p className="text-white/75 text-base leading-relaxed mb-4">
              I&apos;m based in New York, and my background is in finance. I scope, build and
              support every project myself, so you always talk to the person who built your
              system.
            </p>
            <div className="flex gap-5 text-sm font-semibold">
              <a
                href="https://www.linkedin.com/in/max-wexley"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center min-h-11 text-gold hover:underline underline-offset-4"
              >
                LinkedIn →
              </a>
              <a
                href="https://x.com/wexadvisory"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center min-h-11 text-gold hover:underline underline-offset-4"
              >
                X →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
