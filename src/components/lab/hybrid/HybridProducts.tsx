"use client";

import { COVERS, type CoverData } from "@/components/lab/c/covers";
import styles from "@/components/lab/b/labb.module.css";
import h from "./hybrid.module.css";
import ProductCover from "./ProductCover";

// Hybrid /products (art-direction lab, 2026-10-29). B's top bar and heading,
// then Option C's shelf of covers on B's warm canvas (colour lives only inside
// the covers), then a plain list of the same products so nothing depends on
// hovering. Product copy is ProductsSection.tsx; the AI Audit line is the
// site's own "Free AI Audit" subheading. Products only, no client builds.
const CALENDLY = "https://calendly.com/maxwexley-wexadvisory/30min";

// C's covers, re-sized for Inter Tight 800 (wider than C's condensed Archivo,
// so every title is smaller to stay inside its square).
const SIZES: Record<string, number> = {
  competitor: 12.5,
  invoice: 15,
  "card-fee": 17,
  canon: 21,
  audit: 21,
};
const ORDER = ["competitor", "invoice", "card-fee", "canon", "audit"];

const SHELF: CoverData[] = ORDER.map((id) => {
  const c = COVERS.find((x) => x.id === id);
  if (!c) throw new Error(`Lab hybrid: cover "${id}" missing from lab/c/covers`);
  return { ...c, size: SIZES[id] };
});

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

export default function HybridProducts() {
  const mono = styles.mono;

  return (
    <main className={styles.root}>
      {/* Top bar (B) */}
      <header className="px-4 sm:px-8">
        <div className="mx-auto max-w-[1180px] h-16 flex items-center justify-between gap-4">
          <a href="/lab/hybrid" className={`${styles.focus} flex items-center gap-2.5 rounded`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/wex-icon-wa.png" alt="" width={40} height={27} className="h-7 w-auto" />
            <span className="text-[17px] font-bold tracking-[-0.01em]">Wex Advisory</span>
          </a>
          <nav aria-label="Main" className={`${mono} flex items-center gap-5 text-[13px]`}>
            <a
              href="/lab/hybrid/products"
              aria-current="page"
              className={`${styles.focus} underline underline-offset-4 rounded`}
            >
              Products
            </a>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.focus} underline-offset-4 hover:underline rounded`}
            >
              Book a call
            </a>
          </nav>
        </div>
      </header>

      {/* Heading (B) */}
      <section className="px-4 sm:px-8 pt-14 sm:pt-20 pb-12 sm:pb-16">
        <div className="mx-auto max-w-[920px] text-center">
          <p className={`${mono} text-[12px] uppercase tracking-[0.14em] text-[color:var(--muted)] mb-5`}>Products</p>
          <h1 data-lab className={`${styles.h2} text-balance`} style={{ fontSize: "clamp(2.3rem, 6vw, 4.2rem)" }}>
            Start with one thing, no project needed
          </h1>
          <p className={`${mono} mt-6 text-[14.5px] sm:text-[16px] leading-[1.65]`}>
            Each one has a set scope, and the two checks are free.
          </p>
        </div>
      </section>

      {/* Shelf (C, on B's canvas) */}
      <section aria-label="Products on the shelf" className="px-4 sm:px-8 pb-16 sm:pb-24">
        <div className={`${h.shelf} mx-auto max-w-[1180px]`}>
          <div className={h.scroller}>
            <ul className={h.track}>
              {SHELF.map((c) => (
                <li key={c.id} className={h.slot}>
                  <ProductCover c={c} />
                  <div className={`${h.index} ${mono}`}>
                    <span>{c.status}</span>
                    <span>{c.type}</span>
                    <span className={h.indexName}>{c.name}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <p className={`${mono} mt-10 text-center text-[12px] text-[color:var(--muted)]`}>
            Hover or tap a cover to turn it over.
          </p>
        </div>
      </section>

      {/* Plain list (B): same products, scannable without hovering */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 border-t border-[color:var(--grid)]">
        <div className="mx-auto max-w-[1180px]">
          <h2 className="sr-only">All products</h2>
          <ul className={h.list}>
            {PRODUCTS.map((p) => (
              <li key={p.id} className={h.listRow}>
                <span className={`${mono} text-[13px] font-bold tabular-nums`}>{p.price}</span>
                <div className="min-w-0">
                  <h3 className="text-[19px] sm:text-[20px] font-bold tracking-[-0.015em] leading-tight">{p.title}</h3>
                  <p className="mt-1.5 text-[15.5px] leading-relaxed max-w-[640px]">{p.body}</p>
                </div>
                <a
                  href={p.href}
                  target={p.external ? "_blank" : undefined}
                  rel={p.external ? "noopener noreferrer" : undefined}
                  className={`${styles.btnGhost} ${styles.focus} justify-self-start md:justify-self-end whitespace-nowrap text-[14.5px]`}
                >
                  {p.cta} →{p.external && <span className="sr-only"> (opens in a new tab)</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Close */}
      <section className="px-4 sm:px-8 pb-28 pt-4">
        <div className={`${styles.card} mx-auto max-w-[1180px] px-6 py-12 sm:py-16 text-center`}>
          <h2 className={`${styles.h2} mx-auto max-w-[760px]`}>Next step</h2>
          <div className="mt-8 flex flex-col items-center gap-4">
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.btnPrimary} ${styles.focus} w-full sm:w-auto`}
            >
              Book a free strategy call
            </a>
            <a href="/audit" className={`${styles.focus} ${mono} text-[13px] underline-offset-4 hover:underline rounded px-1`}>
              Or run the free AI Audit (2 min) →
            </a>
          </div>
        </div>
      </section>

      <footer className={`${mono} px-4 sm:px-8 pb-24 text-[12px] text-[color:var(--muted)]`}>
        <div className="mx-auto max-w-[1180px] border-t border-[color:var(--grid)] pt-6">
          Wex Advisory · New York · max@wexadvisory.com
        </div>
      </footer>

      <a href="/lab" className={`${styles.pill} ${styles.focus} ${mono}`}>
        Hybrid · B + A&rsquo;s thread + C&rsquo;s covers
      </a>
    </main>
  );
}
