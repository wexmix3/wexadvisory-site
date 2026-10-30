import Button from "@/components/brand/Button";
import Eyebrow from "@/components/brand/Eyebrow";
import Heading from "@/components/brand/Heading";
import Section from "@/components/brand/Section";
import StatSheet from "@/components/brand/StatSheet";
import { PRICING } from "./content";

const TILES = [
  { figure: PRICING.build, title: "To build", note: PRICING.estimate },
  { figure: "5 to 20 hrs", title: "Most reporting builds", note: "$1,000 to $4,000 in total." },
  { figure: PRICING.maintenance, title: "Maintenance", note: "After launch, only when something needs changing." },
];

export default function ReportingPricing() {
  return (
    <Section id="pricing" divider aria-labelledby="pricing-title">
      <Eyebrow>Pricing</Eyebrow>
      <Heading id="pricing-title" reveal className="max-w-2xl">
        What a reporting build costs.
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
      <p className="mt-6 text-[15.5px]">{PRICING.retainer}</p>
      <div className="mt-2">
        <Button href="/ai-consulting-for-small-businesses" variant="quiet">
          Compare with typical market rates →
        </Button>
      </div>
    </Section>
  );
}
