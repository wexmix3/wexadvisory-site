import Image from "next/image";
import Eyebrow from "@/components/design-system/Eyebrow";

// Case rows (ref-2 anatomy): real screenshot on one side, Problem / What I built /
// Result on the other, separated by 1px rules. Facts only; see the brief in
// aios state/worksheets for the sourced list. Do not add figures here without a source.
type Case = {
  id: string;
  num: string;
  category: string;
  title: string;
  problem: string;
  built: string;
  result: string;
  image: string;
  imageAlt: string;
  quote?: { text: string; who: string };
};

const CASES: Case[] = [
  {
    id: "reco",
    num: "01",
    category: "Wholesale + DTC · Operations",
    title: "RECO: one live command center for a two-founder team",
    problem:
      "119 wholesale accounts and 2,500+ sales leads lived in a Google Sheet, and there was no engineering staff to build anything better.",
    built:
      "One live dashboard, a live Shopify sync, 5 automated agents and a daily priority digest.",
    result:
      "All 119 accounts and 2,500+ leads in one live view, with a daily digest of what needs attention.",
    image: "/projects/reco-dashboard-blurred.png",
    imageAlt: "RECO operations dashboard, figures blurred for confidentiality",
    quote: {
      text: "We were operating out of a Google Sheet, but now we have systems and tools in place to ensure we are organized, efficient, and making the right decisions every day.",
      who: "Co-Founder, RECO",
    },
  },
  {
    id: "25n",
    num: "02",
    category: "Coworking · Finance",
    title: "25N Coworking: month-end close for five locations, checked automatically",
    problem:
      "Month-end close was manual Excel reconciliation across five locations in Chicago and Dallas-Fort Worth.",
    built:
      "A GL verification pipeline (the GL export arrives by email and is checked against the rules automatically), occupancy tracking, a finance dashboard with a daily GL and occupancy refresh, and a PDF + Excel close packet for each location.",
    result:
      "First working delivery 9 hours after kickoff. Through the engagement the dashboard and packets refreshed daily, so finance reviewed the exceptions instead of rebuilding the spreadsheet.",
    image: "/projects/25n-dashboard-blurred.png",
    imageAlt: "25N Coworking finance dashboard, figures blurred for confidentiality",
  }
];

// Every row is image-left on desktop (image on top on mobile) and vertically
// centered, so the screenshot never floats above empty space. id="case-<id>" is
// the target of the OutcomeStrip cards.
function Row({ c }: { c: Case }) {
  return (
    <article
      id={`case-${c.id}`}
      className="grid md:grid-cols-[1.15fr_1fr] gap-8 md:gap-12 md:items-center py-14 first:pt-0 border-b border-white/10 last:border-b-0 scroll-mt-24"
    >
      <div>
        <div className="relative aspect-[16/10] rounded-2xl border border-white/10 bg-white/[0.04] overflow-hidden">
          <Image
            src={c.image}
            alt={c.imageAlt}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 540px"
          />
        </div>
      </div>

      <div>
        <p className="text-white/60 text-xs font-semibold tracking-[0.15em] uppercase mb-3">
          <span className="text-gold mr-3 tabular-nums">{c.num}</span>
          {c.category}
        </p>
        <h3 className="text-white text-2xl md:text-[1.7rem] font-bold leading-snug mb-6 text-balance">
          {c.title}
        </h3>
        <dl className="border-t border-white/10">
          {[
            ["Problem:", c.problem],
            ["What I built:", c.built],
            ["Result:", c.result],
          ].map(([label, text]) => (
            <div key={label} className="py-4 border-b border-white/10 text-sm leading-relaxed">
              <dt className="inline text-gold font-semibold mr-1.5">{label}</dt>
              <dd className="inline text-white/75">{text}</dd>
            </div>
          ))}
        </dl>

        {c.quote && (
          <figure className="mt-6 border-l-2 border-gold/60 pl-4">
            <blockquote className="text-white/85 text-base leading-relaxed">
              &ldquo;{c.quote.text}&rdquo;
            </blockquote>
            <figcaption className="text-white/60 text-sm mt-2">{c.quote.who}</figcaption>
          </figure>
        )}

        <a
          href="/#contact"
          className="inline-flex items-center min-h-11 mt-4 text-white text-sm font-semibold hover:text-gold transition-colors"
        >
          Discuss a similar problem →
        </a>
      </div>
    </article>
  );
}

export default function CaseStudies() {
  return (
    <section id="work" className="bg-[#0A1226] py-24 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <Eyebrow>Client work</Eyebrow>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-balance">
          Real clients, real systems
        </h2>
        <p className="text-white/70 text-base max-w-2xl mb-14">
          Figures are blurred because this is client data. The interfaces are the real systems each
          client used, not mockups.
        </p>

        <div>
          {CASES.map((c) => (
            <Row key={c.id} c={c} />
          ))}
        </div>

        <a href="/work" className="inline-flex items-center min-h-11 mt-2 text-gold text-sm font-semibold hover:underline underline-offset-4">
          See all client work →
        </a>
      </div>
    </section>
  );
}
