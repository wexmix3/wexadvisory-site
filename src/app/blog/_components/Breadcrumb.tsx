// Page-local breadcrumb for the blog (2026-10-29 brand redesign): mono, muted,
// the current page last. Matches the BreadcrumbList JSON-LD on each page.
type Crumb = { href?: string; label: string };

export default function Breadcrumb({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[12.5px] text-muted">
        {items.map((c, i) => (
          <li key={c.label} className="flex min-w-0 items-center gap-x-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {c.href ? (
              <a
                href={c.href}
                className="underline-offset-4 hover:text-ink hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                {c.label}
              </a>
            ) : (
              <span aria-current="page" className="text-ink">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
