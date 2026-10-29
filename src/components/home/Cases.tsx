import Image from "next/image";
import Button from "@/components/brand/Button";
import Eyebrow from "@/components/brand/Eyebrow";
import FactList from "@/components/brand/FactList";
import Heading from "@/components/brand/Heading";
import Quote from "@/components/brand/Quote";
import Section from "@/components/brand/Section";
import StatSheet from "@/components/brand/StatSheet";
import ThreadWindow from "./ThreadWindow";

// Client work on the homepage (2026-10-29 hybrid). Opens with the results
// sheet (sourced RECO figures; was the separate OutcomeStrip section). RECO
// leads: heading, facts and quote beside the agent-thread demo (sample data),
// then the measured strip (real numbers, sourced below). 25N follows as a compact row in PAST TENSE
// only: the engagement ended 2026-10-19. Facts match /work and /about; do not
// add figures here without a source. ids: #work (section), #case-reco,
// #case-25n (the OutcomeStrip and old links point at them).

// Sourced client facts; do not add one without a source.
const OUTCOMES = [
  { value: "119 → 1", label: "wholesale accounts moved from a spreadsheet into one live dashboard at RECO" },
  { value: "2,500+", label: "sales leads tracked in the same dashboard, not a second tab" },
  { value: "5", label: "automated agents working for a two-founder team with no engineers" },
];

// Measured from RECO's dashboard, October 2026 (real counts, not sample data).
const PROOF = [
  { value: "488", label: "actions flagged by RECO's agents since July 2026" },
  { value: "102", label: "approved and acted on by the founders" },
  { value: "8", label: "turned down" },
];

const N25 = {
  category: "Coworking · Finance",
  title: "25N Coworking: month-end close for five locations, automated",
  problem:
    "Month-end close was manual Excel reconciliation across five locations in Chicago and Dallas-Fort Worth.",
  built:
    "A GL verification pipeline (the GL export arrives by email and is checked against the rules automatically), occupancy tracking, a finance dashboard with a daily GL and occupancy refresh, and a PDF + Excel close packet for each location.",
  result:
    "First working delivery 9 hours after kickoff. Through the engagement the dashboard and packets refreshed daily, so finance reviewed the exceptions instead of rebuilding the spreadsheet.",
};

export default function Cases() {
  return (
    <Section id="work" divider>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1.38fr)] lg:items-end lg:gap-12">
        <div>
          <Eyebrow>Proof, not promises</Eyebrow>
          <Heading reveal>Results from client work</Heading>
        </div>
        <StatSheet items={OUTCOMES} label="Results at RECO" />
      </div>

      <article
        id="case-reco"
        className="mt-12 grid scroll-mt-24 gap-10 border-t border-ink/10 pt-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-start lg:gap-14"
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

      <article id="case-25n" className="mt-12 scroll-mt-24 border-t border-ink/10 pt-10">
        <div className="grid items-center gap-6 md:grid-cols-[minmax(0,1fr)_220px] md:gap-10">
          <div>
            <Eyebrow className="mb-3">Client work · {N25.category}</Eyebrow>
            <Heading as="h3" className="max-w-[720px]">
              {N25.title}
            </Heading>
          </div>
          {/* Decorative on phones (blurred figures); hidden there to save a screen. */}
          <div className="relative hidden aspect-[16/10] overflow-hidden rounded-[12px] border border-ink/10 bg-white md:block">
            <Image
              src="/projects/25n-dashboard-blurred.png"
              alt="25N Coworking finance dashboard, figures blurred for confidentiality"
              fill
              sizes="220px"
              className="object-cover object-top"
            />
          </div>
        </div>
        <FactList
          className="mt-6"
          columns={3}
          size="sm"
          items={[
            ["Problem", N25.problem],
            ["Built", N25.built],
            ["Result", N25.result],
          ]}
        />
      </article>

      <div className="mt-4">
        <Button href="/work" variant="quiet">
          See all client work →
        </Button>
      </div>
    </Section>
  );
}
