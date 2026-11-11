import Button from "@/components/brand/Button";
import FactList from "@/components/brand/FactList";
import { PLAN_PRICE_LINE, type SolutionTopic } from "@/lib/solutions";

// The five headline solutions on /solutions (2026-11-02, "solutions, not
// tools"). Headline rule (Max, 11-02): built for a real business at least
// once AND a buyer named the problem; everything else goes under "Something
// else?". Tool names live only in the "What's inside" line.
//
// Proof lines repeat claims already published elsewhere on the site, word for
// word where possible: RECO's daily priority digest (/work, homepage case),
// the RECO hero line (HomeHero), and the five-location month-end close
// (/work, homepage case; the client is not named here). Solutions 4 and 5
// have no published proof yet, so they carry no proof line. Add nothing
// without a source.
//
// Layout: sheet rows, not a card grid. A mono number column, the copy, and a
// price cell styled like a DataTable cell. One column on phones.
type Cta = { label: string; href: string; topic?: SolutionTopic; external?: boolean; quiet?: boolean };

type Solution = {
  id: SolutionTopic;
  num: string;
  title: string;
  pain: string;
  outcome: string;
  who: string;
  inside: string;
  proof?: string;
  price: string;
  ctas: Cta[];
};

const ask = (topic: SolutionTopic, label = "Ask about this"): Cta => ({
  label,
  href: `/solutions?topic=${topic}#start`,
  topic,
});

export const SOLUTIONS: Solution[] = [
  {
    id: "daily-priorities",
    num: "01",
    title: "Your day's priorities, every morning",
    pain: "I spend the first hour of every day working out what needs me.",
    outcome:
      "One email each morning with what needs you today: accounts going quiet, orders that need a look, emails nobody answered. Built from the inbox, calendar and sheets you already use.",
    who: "Owners whose to-do list is spread across an inbox, a spreadsheet and their own memory.",
    inside: "Gmail · Google Calendar · Google Sheets · Shopify · an AI summary · one email a day",
    proof: "Running for RECO: a daily priority digest by email for its two founders.",
    price: PLAN_PRICE_LINE,
    ctas: [ask("daily-priorities")],
  },
  {
    id: "numbers",
    num: "02",
    title: "All your numbers in one place",
    pain: "Sales, ads and the books live in five tabs, and none of them agree.",
    outcome:
      "One live dashboard across your sales channels, accounts, ads and books, with agents that flag what needs attention and queue the next step for you to approve.",
    who: "Brands selling through more than one channel (DTC, wholesale, marketplaces) with no engineering team.",
    inside: "Shopify · Google Sheets · QuickBooks · Meta Ads · Gmail · AI agents",
    proof:
      "Running today for RECO, a wholesale + DTC brand: 119 accounts, 2,500+ leads and 5 agents in one dashboard.",
    price: PLAN_PRICE_LINE,
    ctas: [
      { label: "See how it works", href: "/ai-ops-dashboard-for-ecommerce-brands" },
      { ...ask("numbers", "Or ask about it →"), quiet: true },
    ],
  },
  {
    id: "close-the-month",
    num: "03",
    title: "Close the month without the spreadsheet",
    pain: "We find out last month's margin three weeks late.",
    outcome:
      "Month-end reports and close packets that build themselves from your books: checked, summarized in plain English and delivered by email, PDF or Excel.",
    who: "Owners and finance leads who rebuild the same report by hand every month, for one location or several.",
    inside: "QuickBooks · Excel · Google Sheets · GL exports · an AI summary · PDF and Excel packets",
    proof: "Built for a five-location operator: a GL check, a finance dashboard and a close packet per location.",
    price: PLAN_PRICE_LINE,
    ctas: [
      { label: "See how it works", href: "/automated-reporting" },
      { ...ask("close-the-month", "Or ask about it →"), quiet: true },
    ],
  },
  {
    id: "found",
    num: "04",
    title: "Get found on Google and in AI answers",
    pain: "People search for exactly what we do and find our competitors.",
    outcome:
      "Pages that answer the questions your buyers search for, set up so Google and AI assistants can read and quote them. Your free business profiles on Google and in ChatGPT, claimed and filled in.",
    who: "Local and specialist businesses whose customers search before they call.",
    inside: "Google Search Console · Bing Webmaster Tools · Google Business Profile · ChatGPT business profile · structured data · search volume data · page rewrites",
    price: PLAN_PRICE_LINE,
    ctas: [ask("found")],
  },
  {
    id: "lost-money",
    num: "05",
    title: "Find the money you're losing",
    pain: "Our costs keep creeping up and I can't see where.",
    outcome:
      "A free check of your supplier invoices or card processing statements: what went up, what was billed twice, which fees to question. You keep the report either way.",
    who: "Restaurants (supplier invoices) and any storefront that takes cards (card fees).",
    inside: "Your invoices or statements, as PDFs or phone photos · a short written report",
    price: "Free",
    ctas: [
      { label: "Supplier invoice check", href: "/invoice-check?from=site" },
      { label: "Card fee check", href: "/card-fee-check" },
    ],
  },
];

const details = (s: Solution): Array<[string, React.ReactNode]> => [
  ["Who it's for", s.who],
  ["What's inside", <span key="inside" className="font-mono text-[12.5px] leading-relaxed">{s.inside}</span>],
];

function PriceCell({ price }: { price: string }) {
  return (
    <div className="overflow-hidden rounded-[4px] border border-grid bg-white font-mono">
      <p className="border-b border-grid bg-chrome px-4 py-2 text-[11px] text-muted">Price</p>
      <p className="px-4 py-3 text-[14px] font-bold leading-snug text-ink">{price}</p>
    </div>
  );
}

export function SolutionRows() {
  return (
    <ol className="mt-10 border-t border-ink">
      {SOLUTIONS.map((s) => (
        <li
          key={s.id}
          id={s.id}
          className="grid scroll-mt-24 gap-x-10 gap-y-6 border-b border-ink/10 py-10 md:grid-cols-[3.5rem_minmax(0,1fr)_15rem] md:py-12"
        >
          <span aria-hidden="true" className="font-mono text-[13px] font-bold text-muted md:pt-1.5">
            {s.num}
          </span>
          <div className="min-w-0">
            <h3 className="text-h3 text-ink">{s.title}</h3>
            <p className="mt-3 font-mono text-[13.5px] leading-relaxed text-muted">&ldquo;{s.pain}&rdquo;</p>
            <p className="mt-4 max-w-[640px] text-[16.5px] leading-relaxed">{s.outcome}</p>
            {s.proof && <FactList className="mt-6 max-w-[640px]" size="sm" items={[["Proof", s.proof]]} />}
            {/* Phones fold who/what's-inside behind one tap (each row was ~1.5 screens); md+ shows them open. */}
            <details className="group mt-6 max-w-[640px] border-y border-ink/10 md:hidden">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between font-mono text-[12px] uppercase tracking-[0.12em] text-muted">
                Who it&apos;s for, what&apos;s inside
                <span aria-hidden="true" className="transition-transform group-open:rotate-45">+</span>
              </summary>
              <FactList size="sm" items={details(s)} />
            </details>
            <FactList className={s.proof ? "-mt-px hidden max-w-[640px] md:block" : "mt-6 hidden max-w-[640px] md:block"} size="sm" items={details(s)} />
          </div>
          <div className="flex flex-col items-start gap-3">
            {/* Phones: the plan price is in the pricing sheet below, so plan rows link to it instead of repeating it. */}
            <div className={s.price === PLAN_PRICE_LINE ? "hidden w-full md:block" : "w-full"}>
              <PriceCell price={s.price} />
            </div>
            {s.price === PLAN_PRICE_LINE && (
              <a href="#pricing" className="font-mono text-[13px] font-bold text-ink underline underline-offset-4 md:hidden">
                Free 30 days, then the plan below ↓
              </a>
            )}
            {s.ctas.map((c) => (
              <Button
                key={c.href}
                href={c.href}
                external={c.external}
                variant={c.quiet ? "quiet" : "secondary"}
                size="sm"
                data-topic={c.topic}
                className={c.quiet ? undefined : "w-full"}
              >
                {c.label}
                {!c.quiet && " →"}
              </Button>
            ))}
          </div>
        </li>
      ))}
    </ol>
  );
}
