import Button from "@/components/brand/Button";
import Eyebrow from "@/components/brand/Eyebrow";
import Heading from "@/components/brand/Heading";
import Section from "@/components/brand/Section";
import StatSheet from "@/components/brand/StatSheet";
import { PRICING } from "./content";

// 2026-11-02: reporting is the "Close the month" solution on /solutions and
// runs on the same plan. Figures come from content.ts (tested against
// src/lib/solutions.ts).
const TILES = [
  { figure: "Free", title: "30-day trial", note: PRICING.trial },
  { figure: PRICING.setup, title: "Setup", note: "Only if you keep it. Half at signing, half at go-live." },
  { figure: `${PRICING.monthly}/mo`, title: "Monthly", note: "Founding price. Upkeep and up to 2 hours of changes a month." },
];

export default function ReportingPricing() {
  return (
    <Section id="pricing" divider aria-labelledby="pricing-title">
      <Eyebrow>Pricing</Eyebrow>
      <Heading id="pricing-title" reveal className="max-w-2xl">
        What automated reporting costs.
      </Heading>
      <StatSheet
        className="mt-10"
        label="Reporting build pricing"
        items={TILES.map((t) => ({
          value: t.figure,
          label: (
            <>
              <span className="mb-1 block font-sans text-[14px] font-bold text-ink">{t.title}</span>
              {t.note}
            </>
          ),
        }))}
      />
      <p className="mt-6 text-[15.5px]">{PRICING.terms}</p>
      <div className="mt-2 flex flex-wrap gap-x-6">
        <Button href="/solutions#pricing" variant="quiet">
          How pricing works →
        </Button>
        <Button href="/ai-consulting-for-small-businesses" variant="quiet">
          Compare with typical market rates →
        </Button>
      </div>
    </Section>
  );
}
