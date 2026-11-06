import Image from "next/image";
import Eyebrow from "@/components/brand/Eyebrow";
import Heading from "@/components/brand/Heading";
import Quote from "@/components/brand/Quote";
import Section from "@/components/brand/Section";
import StatSheet from "@/components/brand/StatSheet";

// Client work on the homepage (2026-10-29 hybrid). RECO leads: heading and
// quote beside the real dashboard, then the proof strip.
// The full 25N row was cut 2026-10-29 (Max's call, to get the page near 10
// phone screens): 25N is one PAST-TENSE line linking to /work (engagement
// ended 2026-10-19). ids: #work (section), #case-reco, #case-25n.
// 2026-11-06 trim: one heading instead of three, the Problem/Built facts cut,
// and the sample agent thread swapped for the real RECO
// dashboard screenshot already public on /work (figures blurred).

// Real RECO figures (Max approved publishing them 2026-10-30): hours are the
// founders' own estimate (2026-10-29); the counts were measured from RECO's
// dashboard, October 2026. Same figures as /work.
const PROOF = [
  { value: "5+ hrs", label: "a week back for the founders" },
  { value: "488", label: "actions flagged by RECO's agents since July 2026" },
  { value: "102", label: "approved and acted on by the founders" },
  { value: "8", label: "turned down" },
];

export default function Cases() {
  return (
    <Section id="work" divider>
      <article
        id="case-reco"
        className="grid scroll-mt-24 gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-start lg:gap-14"
      >
        <div>
          <Eyebrow>Client work · RECO</Eyebrow>
          <Heading reveal>One live command center for a two-founder team.</Heading>
          {/* Nolan's words verbatim (sent to Max 2026-10-29); do not edit. Photo cropped
              from getreco.shop/pages/talk-to-a-founder, use OK'd by Max 2026-10-30. */}
          <Quote
            cite="Nolan Weiss, Co-Founder, RECO"
            size="sm"
            avatar={{ src: "/nolan-weiss.webp", alt: "Nolan Weiss" }}
            className="mt-8"
          >
            Wex Advisory built us a custom dashboard that&apos;s become central to how we run RECO. It brings our CRM,
            marketing, financials, and daily tasks and reminders into one clear view. What really sets him apart is how
            he takes feedback. He doesn&apos;t just make the change, he understands what we&apos;re trying to achieve
            and builds things that move the needle for the business. Highly recommend.
          </Quote>
        </div>

        <figure className="m-0 min-w-0">
          <div className="overflow-hidden rounded-[10px] border border-ink/10 shadow-[0_18px_40px_-18px_rgba(15,31,61,0.35)]">
            <Image
              src="/projects/reco-dashboard-blurred.png"
              alt="RECO's live ops dashboard: signal, decision and priority queue panels, figures blurred"
              width={1280}
              height={760}
              sizes="(min-width: 1024px) 640px, 100vw"
              className="h-auto w-full"
            />
          </div>
          <figcaption className="mt-3 font-mono text-[12px] text-muted">
            RECO&apos;s live dashboard. Figures blurred for the client&apos;s privacy.
          </figcaption>
        </figure>
      </article>

      <StatSheet
        className="mt-10"
        items={PROOF}
        row={2}
        label="RECO results"
        caption="Hours: the founders’ own estimate. Counts: measured from RECO’s dashboard. October 2026, real numbers, not sample data."
      />

      <p id="case-25n" className="mt-10 scroll-mt-24 border-t border-ink/10 pt-6 text-[15px] leading-relaxed text-muted">
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-ink">Also</span>{" "}
        Built a month-end close for 25N Coworking&apos;s five locations, first delivery 9 hours after kickoff.{" "}
        <a href="/work#25n-coworking" className="font-semibold text-ink underline underline-offset-4 hover:text-ink/70">
          Read the case study →
        </a>
      </p>
    </Section>
  );
}
