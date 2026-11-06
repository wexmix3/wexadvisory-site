import Button from "@/components/brand/Button";
import Heading from "@/components/brand/Heading";
import { CALENDLY } from "@/components/brand/links";
import HeroFlow from "./HeroFlow";
import HeroToggle from "./HeroToggle";
import SheetHero from "./SheetHero";
import SheetHeroA from "./SheetHeroA";

// TEMPORARY (2026-11-06 preview): ?hero=a|b|c picks the sheet animation option.
export type HeroVariant = "current" | "a" | "b" | "c";
const SHEETS: Record<HeroVariant, () => JSX.Element> = {
  current: SheetHero,
  a: SheetHeroA,
  b: HeroFlow,
  c: HeroToggle,
};

// Homepage hero (2026-10-29 hybrid): centred h1 in ink on the canvas, mono
// subhead, gold audit CTA + outline booking CTA, the RECO proof line, then the
// sheet that sorts itself into a dashboard. The h1 has no reveal and no
// entrance animation, so it is the first-paint LCP element.
// 2026-11-06 trim: subhead cut to two short sentences; the proof line keeps one
// number (the full RECO figures sit in #work).
export default function HomeHero({ variant = "current" }: { variant?: HeroVariant }) {
  const Sheet = SHEETS[variant];
  return (
    <section className="bg-canvas px-4 pb-16 pt-12 sm:px-8 sm:pt-16 md:pb-20">
      <div className="mx-auto max-w-[920px] text-center">
        <p className="mb-6 font-mono text-[12px] text-muted sm:text-[13px]">
          AI automation for growing businesses · New York
        </p>
        <Heading as="h1" size="display">
          Stop running your business out of a spreadsheet.
        </Heading>
        <p className="mx-auto mt-7 max-w-[680px] font-mono text-[14.5px] leading-[1.65] sm:text-[16px]">
          I build dashboards, reports and AI agents that put your sales, ops and books in one place. Try it free for 30
          days. Keep it for $1,000 setup and $300 a month.
        </p>
        {/* One primary CTA (Max, 2026-10-30): the audit; the call is a quiet link. */}
        <div className="mt-9 flex flex-col items-center justify-center gap-1 sm:flex-row sm:gap-6">
          <Button href="/audit" block>
            Get your free AI Audit
          </Button>
          <Button href={CALENDLY} external variant="quiet">
            Or book a strategy call →
          </Button>
        </div>
        <p className="mx-auto mt-8 max-w-[620px] text-balance font-mono text-[12.5px] leading-relaxed text-muted">
          Running today at RECO, a wholesale + DTC brand: 5+ hours a week back for the founders.
        </p>
      </div>

      <div className="mt-12 sm:mt-14">
        <Sheet />
      </div>
    </section>
  );
}
