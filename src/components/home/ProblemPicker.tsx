import Button from "@/components/brand/Button";
import Card from "@/components/brand/Card";
import CollagePlate from "@/components/brand/CollagePlate";
import Eyebrow from "@/components/brand/Eyebrow";
import Heading from "@/components/brand/Heading";
import Rail from "@/components/brand/Rail";
import Section from "@/components/brand/Section";

// Services written as the buyer's pain, on the page's one pale-gold band
// (2026-10-29 brand redesign). id="services" is the Nav "Services" target.
// 2026-11-02 (solutions, not tools): the three cards are the top three of the
// five solutions on /solutions. Daily priorities has no page of its own yet,
// so it links to its row there; the numbers card goes to the ecommerce
// ops-dashboard page, the close card to /automated-reporting. Each card opens
// on a collage plate (2026-10-30 imagery pick, B + C): Library of Congress
// FSA/OWI photos, public domain, credited under the rail.
// 2026-11-06 trim: the "Built for" industry chips and the subhead were cut (the
// four industry pages stay linked from the footer); each fix is one short line.
const PROBLEMS = [
  {
    num: "01",
    tag: "Daily priorities",
    pain: "I spend the first hour of every day working out what needs me.",
    fix: "One email each morning with what needs you today.",
    href: "/solutions#daily-priorities",
    photo: { src: "/imagery/team.webp", alt: "An office worker adding up checks on an adding machine, Philadelphia, 1943", pos: "50% 35%" },
    tone: "pale",
  },
  {
    num: "02",
    tag: "All your numbers",
    pain: "Sales, ads and the books live in five tabs, and none of them agree.",
    fix: "One live dashboard for your sales, ads and books.",
    href: "/ai-ops-dashboard-for-ecommerce-brands",
    photo: { src: "/imagery/automation.webp", alt: "Two men going over paperwork at an office desk, Westby, Wisconsin, 1942", pos: "50% 40%" },
    tone: "navy",
  },
  {
    num: "03",
    tag: "Month-end close",
    pain: "We find out last month's margin three weeks late.",
    fix: "Month-end reports that build themselves from your books.",
    href: "/automated-reporting",
    photo: { src: "/imagery/reporting.webp", alt: "A bookkeeper working through a ledger, Chicago, 1941", pos: "50% 30%" },
    tone: "gold",
  },
] as const;

export default function ProblemPicker() {
  return (
    <Section id="services" tone="band">
      {/* Legacy anchor: keeps old /#flagship links (bookmarks, external) landing here. */}
      <span id="flagship" className="relative -top-20 block" aria-hidden="true" />
      <Eyebrow>Pick the problem</Eyebrow>
      <Heading reveal className="max-w-[820px]">
        Three problems every growing business hits.
      </Heading>

      <Rail label="Services" className="mt-10">
        {PROBLEMS.map((p, i) => (
          <li key={p.tag}>
            <Card href={p.href} padding="none" className="flex h-full flex-col overflow-hidden">
              <CollagePlate
                src={p.photo.src}
                alt={p.photo.alt}
                photoPos={p.photo.pos}
                tone={p.tone}
                label={p.num}
                flip={i === 1}
                sizes="(min-width: 768px) 220px, 50vw"
              />
              <div className="flex flex-1 flex-col p-6 sm:p-8">
              <span className="font-mono text-[12px] text-muted">
                {p.num} · {p.tag}
              </span>
              <span className="mt-5 block text-h3 text-ink">&ldquo;{p.pain}&rdquo;</span>
              <span className="mb-6 mt-4 block text-[16px] leading-relaxed">{p.fix}</span>
              <span className="mt-auto font-mono text-[13px] underline-offset-4 group-hover:underline">How I fix it →</span>
              </div>
            </Card>
          </li>
        ))}
      </Rail>
      <div className="mt-6">
        <Button href="/solutions" variant="quiet">
          See all 5 solutions and pricing →
        </Button>
      </div>
      <p className="mt-4 font-mono text-[11px] text-muted">
        Photos: Russell Lee, Arthur Rothstein and Arthur Siegel, 1941-43. Library of Congress, FSA/OWI collection.
      </p>
    </Section>
  );
}
