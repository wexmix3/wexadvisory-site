import { PrimaryCta } from "@/components/design-system/Cta";
import { CALENDLY } from "./content";

// Booking only: the page's one form lives in SendAReport.
export default function BookBand() {
  return (
    <section className="bg-[#0A1226] py-24 px-6 border-t border-white/5">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 text-balance">Rather walk me through it?</h2>
        <p className="text-white/75 text-base leading-relaxed mb-8">
          Bring the report to a call and I&apos;ll tell you what I&apos;d automate first, whether or not you hire me.
        </p>
        <PrimaryCta href={CALENDLY} target="_blank" rel="noopener noreferrer">
          Book a 30-minute call
        </PrimaryCta>
        <p className="text-white/60 text-xs tracking-wide mt-3">Free · 30 minutes · pick any open time</p>
        <a
          href="/audit"
          className="inline-flex items-center min-h-11 mt-4 text-gold text-sm font-semibold hover:underline underline-offset-4"
        >
          Or run the free AI Audit (2 min) →
        </a>
      </div>
    </section>
  );
}
