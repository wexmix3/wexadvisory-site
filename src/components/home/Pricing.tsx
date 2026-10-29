import Button from "@/components/brand/Button";
import DataTable from "@/components/brand/DataTable";
import Eyebrow from "@/components/brand/Eyebrow";
import Heading from "@/components/brand/Heading";
import Section from "@/components/brand/Section";
import AuditHighlight from "./AuditHighlight";

// Published rates as a sheet-style table, with the AI Audit card beside it
// (2026-10-29 brand redesign). Source of truth for the numbers: the consulting
// page and ai-audit lib/proposal/terms.ts. Never write "no retainer" or
// "fixed fee".
const RATES = [
  { title: "New builds", figure: "$200/hr", note: "Written estimate up front, before any work starts." },
  { title: "Maintenance", figure: "$150/hr", note: "After launch." },
  { title: "Retainer", figure: "Varies", note: "Set by project." },
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
            caption="Rates"
            columns={[
              { key: "title", label: "Work", rowHeader: true },
              { key: "figure", label: "Rate", align: "right", strong: true },
              { key: "note", label: "Note" },
            ]}
            rows={RATES}
          />
          <Button href="/ai-consulting-for-small-businesses" variant="quiet" className="mt-4">
            Compare with typical market rates →
          </Button>
        </div>
        <AuditHighlight />
      </div>
    </Section>
  );
}
