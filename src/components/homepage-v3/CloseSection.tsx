import { Check } from "lucide-react";
import Eyebrow from "@/components/design-system/Eyebrow";
import ContactForm from "@/components/ContactForm";

const CALENDLY = "https://calendly.com/maxwexley-wexadvisory/30min";

const CHECKLIST = ["Free", "Talk to the person who builds it", "Written estimate before any work starts"];

// Booking card + "not ready?" fallback (ref-5 anatomy). Owns id="contact",
// which the nav, footer, FAQ and llms.txt all link to.
export default function CloseSection() {
  return (
    <section id="contact" className="bg-[#0A1226] py-28 px-6 border-t border-white/5 scroll-mt-20">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-14 items-start">
        <div>
          <Eyebrow>Let&apos;s talk</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 text-balance">
            Book a free strategy call
          </h2>
          <p className="text-white/75 text-base leading-relaxed mb-8">
            No slide deck, no pitch. You leave with a short list of what&apos;s worth automating,
            whether or not you hire me.
          </p>

          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-gold to-[#e9d9a8] text-navy font-bold text-base px-8 py-3.5 rounded-full hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(200,168,75,0.25)] transition-all"
          >
            Book a strategy call
          </a>
          <p className="mt-3 text-white/60 text-xs tracking-wide">Free · 30 minutes · pick any open time</p>

          <ul className="mt-8 space-y-3">
            {CHECKLIST.map((item) => (
              <li key={item} className="flex items-center gap-3 text-white/80 text-sm">
                <span className="w-6 h-6 rounded-full border border-gold/40 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 text-gold" strokeWidth={2.5} />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <p className="mt-8 text-white/70 text-sm">
            Prefer email?{" "}
            <a
              href="mailto:max@wexadvisory.com"
              className="text-gold font-semibold hover:underline underline-offset-4"
            >
              max@wexadvisory.com
            </a>
          </p>
        </div>

        <div className="bg-white/[0.04] border border-white/10 rounded-2xl backdrop-blur-sm p-6 sm:p-8">
          <h3 className="text-white text-xl font-bold mb-2">Not ready to talk?</h3>
          <p className="text-white/70 text-sm leading-relaxed mb-6">
            Send me a note instead. I read every message myself and reply within 24 hours.
          </p>
          <ContactForm />
          <div className="mt-6 pt-5 border-t border-white/10">
            <a href="/audit" className="inline-flex items-center min-h-11 text-gold text-sm font-semibold hover:underline underline-offset-4">
              Or run the free AI Audit (2 min) →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
