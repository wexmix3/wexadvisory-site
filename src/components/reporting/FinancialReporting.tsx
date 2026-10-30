import Eyebrow from "@/components/brand/Eyebrow";
import Heading from "@/components/brand/Heading";
import Section from "@/components/brand/Section";
import { FINANCIAL } from "./content";

export default function FinancialReporting() {
  return (
    <Section divider width="narrow" aria-labelledby="financial-title">
      <Eyebrow>For finance teams</Eyebrow>
      <Heading id="financial-title" reveal>
        {FINANCIAL.h2}
      </Heading>
      <div className="mt-6 space-y-4">
        {FINANCIAL.body.map((p) => (
          <p key={p.slice(0, 24)} className="text-[16.5px] leading-relaxed">
            {p}
          </p>
        ))}
      </div>
    </Section>
  );
}
