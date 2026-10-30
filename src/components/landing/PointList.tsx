import { cx } from "@/components/brand/cx";

// Short statements (pain points, who it's for, checks before hiring) as
// hairline rows with a small mono marker. Plain text items only.
export default function PointList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cx("border-t border-ink/10", className)}>
      {items.map((text, i) => (
        <li key={text} className="flex items-start gap-5 border-b border-ink/10 py-5">
          <span aria-hidden="true" className="w-6 shrink-0 font-mono text-[12px] leading-[2] text-muted">
            {String(i + 1).padStart(2, "0")}
          </span>
          <p className="text-[16.5px] leading-relaxed text-ink">{text}</p>
        </li>
      ))}
    </ul>
  );
}
