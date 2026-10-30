import Eyebrow from "@/components/brand/Eyebrow";
import FactList from "@/components/brand/FactList";
import Heading from "@/components/brand/Heading";
import Quote from "@/components/brand/Quote";
import Section from "@/components/brand/Section";
import StatSheet from "@/components/brand/StatSheet";
import ThreadWindow from "./ThreadWindow";

// Client work on the homepage (2026-10-29 hybrid). RECO leads: heading, facts
// and quote beside the agent-thread demo (sample data), then the measured
// strip (real numbers, sourced below). The separate 119 / 2,500+ / 5 results
// sheet and the full 25N row were cut 2026-10-29 (Max's call, to get the page
// near 10 phone screens): the hero proof line and RECO's facts already carry
// those figures, and 25N is one PAST-TENSE line linking to /work (engagement
// ended 2026-10-19). ids: #work (section), #case-reco, #case-25n.

// Measured from RECO's dashboard, October 2026 (real counts, not sample data).
const PROOF = [
  { value: "488", label: "actions flagged by RECO's agents since July 2026" },
  { value: "102", label: "approved and acted on by the founders" },
  { value: "8", label: "turned down" },
];

export default function Cases() {
  return (
    <Section id="work" divider>
      <Eyebrow>Proof, not promises</Eyebrow>
      <Heading reveal>Results from client work</Heading>

      <article
        id="case-reco"
        className="mt-10 grid scroll-mt-24 gap-10 border-t border-ink/10 pt-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-start lg:gap-14"
      >
        <div>
          <Eyebrow>Client work · Wholesale + DTC</Eyebrow>
          <Heading as="h3" size="h2-sm" reveal>
            RECO: one live command center for a two-founder team.
          </Heading>
          <FactList
            className="mt-7"
            size="sm"
            items={[
              [
                "Problem",
                "119 wholesale accounts and 2,500+ sales leads lived in a Google Sheet, and there was no engineering staff to build anything better.",
              ],
              ["Built", "One live dashboard, a live Shopify sync, 5 automated agents and a daily priority digest."],
            ]}
          />
          <Quote cite="Co-Founder, RECO" className="mt-7">
            We were operating out of a Google Sheet, but now we have systems and tools in place to ensure we are
            organized, efficient, and making the right decisions every day.
          </Quote>
        </div>

        <div className="min-w-0">
          <ThreadWindow />
          <StatSheet
            className="mt-6"
            items={PROOF}
            row={2}
            label="Measured at RECO"
            caption="Measured from RECO’s dashboard, October 2026. Real numbers, not sample data."
          />
        </div>
      </article>

      <p id="case-25n" className="mt-10 scroll-mt-24 border-t border-ink/10 pt-6 text-[15px] leading-relaxed text-muted">
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-ink">Also</span>{" "}
        Built a month-end close for 25N Coworking&apos;s five locations: GL checks, a finance dashboard and a close
        packet per location, first delivery 9 hours after kickoff.{" "}
        <a href="/work#25n-coworking" className="font-semibold text-ink underline underline-offset-4 hover:text-ink/70">
          Read the case study →
        </a>
      </p>
    </Section>
  );
}
