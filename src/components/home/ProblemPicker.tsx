import Button from "@/components/brand/Button";
import Card from "@/components/brand/Card";
import Eyebrow from "@/components/brand/Eyebrow";
import Heading from "@/components/brand/Heading";
import Rail from "@/components/brand/Rail";
import Section from "@/components/brand/Section";

// Services written as the buyer's pain, on the page's one pale-gold band
// (2026-10-29 brand redesign). id="services" is the Nav "Services" target.
// Reporting links to /automated-reporting; Automation to the ecommerce
// ops-dashboard page, the only page about dashboards.
const PROBLEMS = [
  {
    num: "01",
    tag: "Reporting",
    pain: "We find out last month's margin three weeks late.",
    fix: "Sales, margin and finance reports that build themselves from the tools you already use and your books.",
    href: "/automated-reporting",
  },
  {
    num: "02",
    tag: "Automation",
    pain: "Follow-ups live in someone's head.",
    fix: "Agents that watch accounts, orders and the inbox, and queue the next step for you to approve.",
    href: "/ai-ops-dashboard-for-ecommerce-brands",
  },
  {
    num: "03",
    tag: "Team",
    pain: "We bought the AI seats. Nothing changed.",
    fix: "Training and assistants your team actually uses.",
    href: "/ai-training-for-small-businesses",
  },
];

const INDUSTRIES = [
  { label: "E-commerce brands", href: "/ai-ops-dashboard-for-ecommerce-brands" },
  { label: "Coworking", href: "/ai-for-coworking-spaces" },
  { label: "Property management", href: "/ai-for-property-management" },
  { label: "Law firms", href: "/ai-automation-for-law-firms" },
];

export default function ProblemPicker() {
  return (
    <Section id="services" tone="band">
      {/* Legacy anchor: keeps old /#flagship links (bookmarks, external) landing here. */}
      <span id="flagship" className="relative -top-20 block" aria-hidden="true" />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:items-end lg:gap-14">
        <div>
          <Eyebrow>Pick the problem</Eyebrow>
          <Heading reveal className="max-w-[820px]">
            Three problems every growing business hits.
          </Heading>
          <p className="mt-4 text-[17px] leading-relaxed">Start with whichever costs you most.</p>
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">Built for</p>
          <ul className="flex flex-wrap gap-2">
            {INDUSTRIES.map((i) => (
              <li key={i.href}>
                <Button href={i.href} variant="secondary" size="sm">
                  {i.label}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Rail label="Services" className="mt-10">
        {PROBLEMS.map((p) => (
          <li key={p.tag}>
            <Card href={p.href} padding="lg" className="flex h-full flex-col">
              <span className="font-mono text-[12px] text-muted">
                {p.num} · {p.tag}
              </span>
              <span className="mt-5 block text-h3 text-ink">&ldquo;{p.pain}&rdquo;</span>
              <span className="mb-6 mt-4 block text-[16px] leading-relaxed">{p.fix}</span>
              <span className="mt-auto font-mono text-[13px] underline-offset-4 group-hover:underline">How I fix it →</span>
            </Card>
          </li>
        ))}
      </Rail>
    </Section>
  );
}
