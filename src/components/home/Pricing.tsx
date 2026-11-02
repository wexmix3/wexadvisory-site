import Button from "@/components/brand/Button";
import DataTable from "@/components/brand/DataTable";
import Eyebrow from "@/components/brand/Eyebrow";
import Heading from "@/components/brand/Heading";
import Section from "@/components/brand/Section";
import { EXTRA_HOUR_USD, MONTHLY_FEE_USD, MONTHLY_INCLUDED_HOURS, SETUP_FEE_USD, TRAINING_HOUR_USD, TRIAL_DAYS } from "@/lib/solutions";
import AuditHighlight from "./AuditHighlight";

// Published prices as a sheet-style table, with the AI Audit card beside it
// (2026-10-29 brand redesign; rows replaced 2026-11-02 with the plan). Source
// of truth: the canonical pricing copy in the aios worksheet
// state/worksheets/solutions-pricing-2026-11-02.md and ai-audit
// lib/proposal/terms.ts; the figures come from src/lib/solutions.ts. Never
// write "fixed fee", "retainer", "billed hourly" or "as needed".
const usd = (n: number) => `$${n.toLocaleString("en-US")}`;
const RATES = [
  { title: "Free trial", figure: `${TRIAL_DAYS} days`, note: "On your real data. The price is in writing on day one." },
  { title: "Setup", figure: usd(SETUP_FEE_USD), note: "Only if you keep it." },
  { title: "Monthly", figure: usd(MONTHLY_FEE_USD), note: `Founding price. ${MONTHLY_INCLUDED_HOURS} change hours included.` },
  { title: "Custom builds", figure: "Fixed price", note: "Quoted before work starts. Replaces the setup fee." },
  { title: "Extra hours", figure: `${usd(EXTRA_HOUR_USD)} an hour`, note: `Beyond the ${MONTHLY_INCLUDED_HOURS} included.` },
  { title: "Training", figure: `${usd(TRAINING_HOUR_USD)} an hour`, note: "Live sessions for your team." },
];

export default function Pricing() {
  return (
    <Section id="pricing" divider>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start lg:gap-14">
        <div>
          <Eyebrow>Pricing</Eyebrow>
          <Heading reveal className="max-w-[640px]">
            Published, so you don&apos;t need a call to find out.
          </Heading>
          <DataTable
            className="mt-8"
            caption="Prices"
            columns={[
              { key: "title", label: "What", rowHeader: true },
              { key: "figure", label: "Price", align: "right", strong: true },
              { key: "note", label: "Note" },
            ]}
            rows={RATES.map((r) => ({ ...r, figure: <span className="sm:whitespace-nowrap">{r.figure}</span> }))}
          />
          <div className="mt-4 flex flex-wrap gap-x-6">
            <Button href="/solutions#pricing" variant="quiet">
              How pricing works →
            </Button>
            <Button href="/ai-consulting-for-small-businesses" variant="quiet">
              Compare with typical market rates →
            </Button>
            <Button href="/faq" variant="quiet">
              Common questions →
            </Button>
          </div>
        </div>
        <AuditHighlight />
      </div>
    </Section>
  );
}
