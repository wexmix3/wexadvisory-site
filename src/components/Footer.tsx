import { EMAIL, LINKEDIN, X_PROFILE } from "@/components/brand/links";

// Brand system footer (2026-10-29): canvas, a hairline on top, mono links in
// three columns. Every link from the old footer is kept (the landing pages
// are reachable from here and nowhere else).
type FooterLink = { href: string; label: string; external?: boolean };

const SITE: FooterLink[] = [
  { href: "/#services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  // /playbooks 404s when no playbook is published; keep one live while this link stays.
  ...(process.env.NEXT_PUBLIC_BLOG_LIVE === "1" ? [{ href: "/playbooks", label: "Playbooks" }] : []),
  // Rendered only when a post is visible. See next.config.mjs.
  ...(process.env.NEXT_PUBLIC_BLOG_LIVE === "1" ? [{ href: "/blog", label: "Blog" }] : []),
  { href: "/#contact", label: "Contact" },
  { href: "/audit", label: "Free AI Audit" },
];

const PRODUCTS: FooterLink[] = [
  { href: "https://tool.wexadvisory.com", label: "Competitor Analysis", external: true },
  { href: "/invoice-check?from=site", label: "Supplier Invoice Check" },
  { href: "/card-fee-check", label: "Card Fee Check" },
  { href: "/canon", label: "Canon" },
  { href: "/automated-reporting", label: "Automated Reporting" },
];

const GUIDES: FooterLink[] = [
  { href: "/ai-consulting-for-small-businesses", label: "AI Consulting" },
  { href: "/ai-solutions-for-small-businesses", label: "AI Solutions" },
  { href: "/ai-integration-for-small-businesses", label: "AI Integration" },
  { href: "/ai-training-for-small-businesses", label: "AI Training" },
  { href: "/ai-ops-dashboard-for-ecommerce-brands", label: "AI for Ecommerce" },
  { href: "/ai-for-coworking-spaces", label: "AI for Coworking" },
  { href: "/ai-for-property-management", label: "AI for Property Management" },
  { href: "/ai-automation-for-law-firms", label: "AI for Law Firms" },
];

const LINK = "inline-flex min-h-8 items-center text-ink underline-offset-4 hover:underline";

function Column({ title, links, split = false }: { title: string; links: FooterLink[]; split?: boolean }) {
  return (
    <div>
      <p className="mb-2 text-[11px] uppercase tracking-[0.14em] text-muted">{title}</p>
      <ul className={split ? "grid grid-cols-2 gap-x-6" : undefined}>
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              target={l.external ? "_blank" : undefined}
              rel={l.external ? "noopener noreferrer" : undefined}
              className={LINK}
            >
              {l.label}
              {l.external && <span className="sr-only"> (opens in a new tab)</span>}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-grid bg-canvas px-4 pb-8 pt-10 font-mono text-[12.5px] sm:px-8">
      <div className="mx-auto grid max-w-[1180px] grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-[1fr_0.8fr_1fr_2fr]">
        <div className="col-span-2 md:col-span-1">
          <p className="font-tight text-[17px] font-bold tracking-[-0.01em] text-ink">Wex Advisory</p>
          <p className="mt-2 text-muted">AI consulting for growing businesses.</p>
          <p className="text-muted">New York, NY</p>
          <ul className="mt-3">
            <li>
              <a href={`mailto:${EMAIL}`} className={LINK}>
                {EMAIL}
              </a>
            </li>
            <li className="flex gap-5">
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className={LINK}>
                LinkedIn<span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a href={X_PROFILE} target="_blank" rel="noopener noreferrer" className={LINK}>
                X<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </div>
        <Column title="Site" links={SITE} />
        <Column title="Products" links={PRODUCTS} />
        <div className="col-span-2 md:col-span-1">
          <Column title="Guides" links={GUIDES} split />
        </div>
      </div>
      <div className="mx-auto mt-8 flex max-w-[1180px] flex-wrap items-center justify-between gap-4 border-t border-grid pt-6 text-muted">
        <p>© {new Date().getFullYear()} Wex Advisory</p>
        <p className="flex gap-5">
          <a href="/privacy" className={LINK}>
            Privacy
          </a>
          <a href="/terms" className={LINK}>
            Terms
          </a>
        </p>
      </div>
    </footer>
  );
}
