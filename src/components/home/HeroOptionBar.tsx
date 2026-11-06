// TEMPORARY (2026-11-06, branch trim-homepage-2026-11-06): switcher for
// comparing hero options on the real homepage via ?hero=a|b|c. Delete this
// file, the ?hero handling in app/page.tsx and the losing options before the
// branch merges to master.
const OPTIONS = [
  { key: "", label: "Current" },
  { key: "a", label: "A · Polished scroll" },
  { key: "b", label: "B · Rows feed KPIs" },
  { key: "c", label: "C · Before / after" },
];

export default function HeroOptionBar({ active }: { active: string }) {
  return (
    <nav
      aria-label="Hero options (preview only)"
      className="fixed bottom-4 left-1/2 z-[100] flex max-w-[calc(100vw-24px)] -translate-x-1/2 gap-1 overflow-x-auto rounded-full border border-ink/15 bg-white/95 p-1 font-mono text-[12px] shadow-[0_10px_30px_-10px_rgba(15,31,61,0.4)] backdrop-blur"
    >
      {OPTIONS.map((o) => (
        <a
          key={o.label}
          href={o.key ? `/?hero=${o.key}` : "/?hero=current"}
          className={`whitespace-nowrap rounded-full px-3 py-1.5 ${
            active === (o.key || "current") ? "bg-ink text-white" : "text-ink hover:bg-chrome"
          }`}
        >
          {o.label}
        </a>
      ))}
    </nav>
  );
}
