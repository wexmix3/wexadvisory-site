// FAQ list on native <details>/<summary>: works without JS, every answer is in
// the server HTML (matching any FAQPage JSON-LD built from the same items), and
// keyboard/screen-reader behaviour comes from the browser. defaultOpen="all"
// renders every answer open: the SEO landing pages and /audit showed all
// answers before the 2026-10-29 redesign, so they keep doing so.
export type FaqItem = { q: string; a: React.ReactNode };

export default function FaqList({
  items,
  defaultOpen = null,
}: {
  items: FaqItem[];
  defaultOpen?: number | "all" | null;
}) {
  return (
    <div className="border-t border-ink/10">
      {items.map((item, i) => (
        <details
          key={item.q}
          open={defaultOpen === "all" || defaultOpen === i}
          className="group border-b border-ink/10"
        >
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left hover:underline hover:decoration-ink/30 hover:underline-offset-4 [&::-webkit-details-marker]:hidden">
            <h3 className="m-0 text-[16.5px] font-semibold leading-snug text-ink">{item.q}</h3>
            <span
              aria-hidden="true"
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-[4px] border border-grid bg-white font-mono text-[14px] leading-none"
            >
              <span className="group-open:hidden">+</span>
              <span className="hidden group-open:inline">−</span>
            </span>
          </summary>
          <div className="max-w-[680px] pb-6 text-[15.5px] leading-relaxed text-ink/85">{item.a}</div>
        </details>
      ))}
    </div>
  );
}
