import Button from "@/components/brand/Button";
import CoverShelf from "@/components/brand/CoverShelf";
import Eyebrow from "@/components/brand/Eyebrow";
import Heading from "@/components/brand/Heading";
import PageHero from "@/components/brand/PageHero";
import Section from "@/components/brand/Section";

// Added 2026-10-27: every product a visitor can start with, each with its own
// way in. Before this, the competitor report had no link anywhere on the site,
// and /invoice-check, Card Fee Check and Canon could not be reached from it.
// Supplier check links carry ?from=site so web requests are not counted as
// replies to the hand-written letters (their QR code opens the bare URL).
// 2026-10-29 brand redesign: as the /products page it is the hybrid layout
// (centred heading, the shelf of covers, then a plain scannable list so
// nothing depends on hovering); as a section elsewhere it is the list alone.
type Product = {
  id: string;
  price: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  external?: boolean;
};

const PRODUCTS: Product[] = [
  {
    id: "competitor-analysis",
    price: "$299",
    title: "Competitor Analysis Report",
    body: "A 13-page report with real traffic data, deep dives on five competitors, market sizing and what to do next. Ready in about a minute.",
    cta: "Get your report",
    href: "https://tool.wexadvisory.com",
    external: true,
  },
  {
    id: "invoice-check",
    price: "Free",
    title: "Supplier Invoice Check",
    body: "For restaurants. Send 4 weeks of supplier invoices and get a 2-page report on what went up, what was billed twice, and where it's cheaper.",
    cta: "Get the invoice check",
    href: "/invoice-check?from=site",
  },
  {
    id: "card-fee-check",
    price: "Free",
    title: "Card Fee Check",
    body: "For any storefront. Send your card processing statements and see what processing really costs, which fees to question, and whether your rate is fair.",
    cta: "Check my card fees",
    href: "/card-fee-check",
  },
  {
    id: "canon",
    price: "Demo",
    title: "Canon",
    body: "Your company's documents, answered in plain language with citations. Pin the source of truth and correct it once; it remembers.",
    cta: "See Canon",
    href: "/canon",
  },
  {
    id: "audit",
    price: "Free",
    title: "AI Audit",
    body: "Quantified savings opportunities, no credit card, no signup.",
    cta: "Get your free AI Audit",
    href: "/audit",
  },
];

// Cover ids (brand/covers.tsx) in shelf order.
const SHELF = ["competitor", "invoice", "card-fee", "canon", "audit"];

const TITLE = "Start with one thing, no project needed";
const SUB = "Each one has a set scope, and the two checks are free.";

function ProductList({ headingLevel }: { headingLevel: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <ul className="border-t border-ink/10">
      {PRODUCTS.map((p) => (
        <li
          key={p.id}
          className="grid items-baseline gap-2 border-b border-ink/10 py-6 md:grid-cols-[7rem_minmax(0,1fr)_auto] md:gap-6"
        >
          <span className="font-mono text-[13px] font-bold tabular-nums">{p.price}</span>
          <div className="min-w-0">
            <H className="text-[19px] font-bold leading-tight tracking-[-0.015em] sm:text-[20px]">{p.title}</H>
            <p className="mt-1.5 max-w-[640px] text-[15.5px] leading-relaxed">{p.body}</p>
          </div>
          <Button
            href={p.href}
            external={p.external}
            variant="secondary"
            size="sm"
            className="mt-2 justify-self-start whitespace-nowrap md:mt-0 md:justify-self-end"
          >
            {p.cta} →
          </Button>
        </li>
      ))}
    </ul>
  );
}

// asPage: rendered as the /products page (h1, shelf) instead of a section (h2).
export default function ProductsSection({ asPage = false }: { asPage?: boolean }) {
  if (asPage) {
    return (
      <>
        <PageHero eyebrow="Products" title={TITLE} subhead={SUB} align="center" />
        <section aria-label="Products on the shelf" className="bg-canvas px-4 pb-14 sm:px-8 md:pb-20">
          <div className="mx-auto max-w-[1180px]">
            <CoverShelf ids={SHELF} label="Products" />
          </div>
        </section>
        <Section id="products" divider aria-labelledby="all-products">
          <h2 id="all-products" className="sr-only">
            All products
          </h2>
          <ProductList headingLevel="h3" />
        </Section>
      </>
    );
  }
  return (
    <Section id="products" divider>
      <Eyebrow>Products</Eyebrow>
      <Heading>{TITLE}</Heading>
      <p className="mb-10 mt-4 max-w-2xl text-[17px] leading-relaxed">{SUB}</p>
      <ProductList headingLevel="h3" />
    </Section>
  );
}
