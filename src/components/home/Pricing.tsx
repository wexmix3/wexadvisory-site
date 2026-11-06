import Button from "@/components/brand/Button";
import DataTable from "@/components/brand/DataTable";
import Eyebrow from "@/components/brand/Eyebrow";
import Heading from "@/components/brand/Heading";
import Section from "@/components/brand/Section";
import { MONTHLY_FEE_USD, MONTHLY_INCLUDED_HOURS, SETUP_FEE_USD, TRIAL_DAYS } from "@/lib/solutions";

// Published prices as a sheet-style table (2026-10-29 brand redesign; rows
// replaced 2026-11-02 with the plan). Source of truth: the canonical pricing
// copy in the aios worksheet state/worksheets/solutions-pricing-2026-11-02.md
// and ai-audit lib/proposal/terms.ts; the figures come from src/lib/solutions.ts.
// Never write "fixed fee", "retainer", "billed hourly" or "as needed".
// 2026-11-06 trim: the homepage shows the three numbers a buyer needs; custom
// builds, extra hours and training live on /solutions#pricing. The AI Audit
// card that sat beside the table was cut (the hero already leads with it).
const usd = (n: number) => `$${n.toLocaleString("en-US")}`;
const RATES = [
  { title: "Free trial", figure: `${TRIAL_DAYS} days`, note: "On your real data." },
  { title: "Setup", figure: usd(SETUP_FEE_USD), note: "Only if you keep it." },
  { title: "Monthly", figure: usd(MONTHLY_FEE_USD), note: `${MONTHLY_INCLUDED_HOURS} change hours included.` },
];

export default function Pricing() {
  return (
    <Section id="pricing" divider>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-14">
        <div>
          <Eyebrow>Pricing</Eyebrow>
          <Heading reveal className="max-w-[640px]">
            Published, so you don&apos;t need a call to find out.
          </Heading>
        </div>
        <div>
          <DataTable
            caption="Prices"
            columns={[
              { key: "title", label: "What", rowHeader: true },
              { key: "figure", label: "Price", align: "right", strong: true },
              { key: "note", label: "Note" },
            ]}
            rows={RATES.map((r) => ({ ...r, figure: <span className="sm:whitespace-nowrap">{r.figure}</span> }))}
          />
          <div className="mt-4">
            <Button href="/solutions#pricing" variant="quiet">
              Full pricing and how it works →
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
