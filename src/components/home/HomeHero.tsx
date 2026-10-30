import Button from "@/components/brand/Button";
import Heading from "@/components/brand/Heading";
import { CALENDLY } from "@/components/brand/links";
import SheetHero from "./SheetHero";

// Homepage hero (2026-10-29 hybrid): centred h1 in ink on the canvas, mono
// subhead, gold audit CTA + outline booking CTA, the RECO proof line, then the
// sheet that sorts itself into a dashboard. The h1 has no reveal and no
// entrance animation, so it is the first-paint LCP element.
export default function HomeHero() {
  return (
    <section className="bg-canvas px-4 pb-16 pt-12 sm:px-8 sm:pt-16 md:pb-20">
      <div className="mx-auto max-w-[920px] text-center">
        <p className="mb-6 font-mono text-[12px] text-muted sm:text-[13px]">
          AI automation for growing businesses · New York
        </p>
        <Heading as="h1" size="display">
          Stop running your business out of a spreadsheet.
        </Heading>
        <p className="mx-auto mt-7 max-w-[760px] font-mono text-[14.5px] leading-[1.65] sm:text-[16px]">
          I build the dashboards, reporting and AI agents that pull your sales, operations and books into one place, for
          owner-led businesses with no engineering team. $200 an hour to build, with a written estimate before
          any work starts.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/audit" block>
            Get your free AI Audit
          </Button>
          <Button href={CALENDLY} external variant="secondary" block>
            Book a strategy call
          </Button>
        </div>
        <p className="mx-auto mt-8 max-w-[620px] text-balance font-mono text-[12.5px] leading-relaxed text-muted">
          Running today for RECO, a wholesale + DTC brand: 119 accounts, 2,500+ leads and 5 agents in one dashboard, and 5+ hours a week back for the founders.
        </p>
      </div>

      <div className="mt-12 sm:mt-14">
        <SheetHero />
      </div>
    </section>
  );
}
