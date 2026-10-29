import Button from "@/components/brand/Button";
import Card from "@/components/brand/Card";
import Eyebrow from "@/components/brand/Eyebrow";
import Heading from "@/components/brand/Heading";
import { CALENDLY } from "@/components/brand/links";

// Compact AI Audit card for the homepage (2026-10-29 brand redesign of the
// homepage-v2 AuditHighlight; copy unchanged). Sits beside Pricing. One path
// in (the audit), one path out (talk first).
const INCLUDES = [
  "5 AI maturity scores benchmarked against your industry",
  "Top automation opportunities ranked by annual savings",
  "Full labor math: hours × rate × automation ceiling",
  "Implementation roadmap with specific tool recommendations",
  "PDF report delivered to your inbox",
];

export default function AuditHighlight() {
  return (
    <Card as="aside" id="ai-audit" padding="lg" className="scroll-mt-24">
      <Eyebrow>Free · Instant</Eyebrow>
      <Heading size="h3">See exactly where AI saves your business money</Heading>
      <p className="mt-3 text-[15.5px] leading-relaxed">
        Enter your website URL and get a quantified AI opportunity snapshot in 2–3 minutes. Real savings estimates with
        the math shown, not generic advice.
      </p>
      <ul className="mt-4 space-y-1.5 font-mono text-[12.5px] leading-snug">
        {INCLUDES.map((item) => (
          <li key={item} className="flex gap-2.5">
            <span aria-hidden="true">✓</span>
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-5 flex flex-col items-start gap-1">
        <Button href="/audit" block className="sm:w-full">
          Analyze My Business →
        </Button>
        <Button href={CALENDLY} external variant="quiet">
          Prefer to talk first? Book a strategy call
        </Button>
      </div>
    </Card>
  );
}
