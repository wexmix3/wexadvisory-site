import ScrollReveal from "@/components/ScrollReveal";
import Eyebrow from "@/components/design-system/Eyebrow";
import { PrimaryCta, SecondaryCta } from "@/components/design-system/Cta";

const AUDIT_URL = "https://audit.wexadvisory.com/audit";

export default function ServiceCTA({
  heading,
  subheading,
}: {
  heading: string;
  subheading: string;
}) {
  return (
    <ScrollReveal>
      <section className="bg-[#0A1226] py-24 px-6 border-t border-white/5">
        <div className="max-w-xl mx-auto text-center">
          <Eyebrow>Free · Instant</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{heading}</h2>
          <p className="text-white/60 text-base leading-relaxed mb-8">{subheading}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <PrimaryCta href={AUDIT_URL}>Analyze My Business →</PrimaryCta>
            <SecondaryCta
              href="https://calendly.com/maxwexley-wexadvisory/free-strategy-call"
              target="_blank"
              rel="noopener noreferrer"
            >
              Prefer to talk first? Book a call
            </SecondaryCta>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
