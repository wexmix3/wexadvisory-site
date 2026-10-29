// Added 2026-10-27: every product a visitor can start with, each with its own
// way in. Before this, the competitor report had no link anywhere on the site,
// and /invoice-check, Card Fee Check and Canon could not be reached from it.
// Supplier check links carry ?from=site so web requests are not counted as
// replies to the hand-written letters (their QR code opens the bare URL).
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
];

// asPage: rendered as the /products page (h1) instead of a homepage section (h2).
export default function ProductsSection({ asPage = false }: { asPage?: boolean }) {
  const Heading = asPage ? "h1" : "h2";
  return (
    <section id="products" className="bg-[#0A1226] py-24 px-6 border-t border-white/5 scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">Products</p>
        <Heading className="text-3xl md:text-4xl font-bold text-white mb-4 text-balance">
          Start with one thing, no project needed
        </Heading>
        <p className="text-white/70 text-base max-w-2xl mb-10">
          Each one has a set scope, and the two checks are free.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 auto-rows-fr">
          {PRODUCTS.map((p) => (
            <div
              key={p.id}
              className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 backdrop-blur-sm flex flex-col h-full"
            >
              <span className="inline-block self-start text-[10px] font-bold tracking-[0.15em] uppercase border rounded-full px-2.5 py-1 mb-4 text-gold/90 border-gold/35">
                {p.price}
              </span>
              <h3 className="text-white text-lg font-bold mb-2">{p.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed mb-6">{p.body}</p>
              <a
                href={p.href}
                target={p.external ? "_blank" : undefined}
                rel={p.external ? "noopener noreferrer" : undefined}
                className="mt-auto self-start inline-flex items-center min-h-11 px-5 rounded-full border border-gold/50 text-white font-semibold text-sm hover:bg-gold/10 hover:border-gold transition-colors"
              >
                {p.cta} →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
