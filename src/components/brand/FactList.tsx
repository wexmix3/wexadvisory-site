import { cx } from "./cx";

// Labelled facts separated by hairlines (Problem / Built / Result on a case).
// columns={3} lays them side by side from lg up; size="sm" for compact rows.
export default function FactList({
  items,
  columns = 1,
  size = "md",
  className,
}: {
  items: Array<[label: string, text: React.ReactNode]>;
  columns?: 1 | 3;
  size?: "md" | "sm";
  className?: string;
}) {
  return (
    <dl className={cx("border-t border-ink/10", columns === 3 && "grid gap-x-8 lg:grid-cols-3", className)}>
      {items.map(([label, text]) => (
        <div
          key={label}
          className={cx("border-b border-ink/10", size === "sm" ? "py-4" : "py-5", columns === 3 && "lg:border-b-0")}
        >
          <dt className="mb-2 font-mono text-[12px] uppercase tracking-[0.12em] text-muted">{label}</dt>
          <dd className={cx("leading-relaxed", size === "sm" ? "text-[15px]" : "text-[16px]")}>{text}</dd>
        </div>
      ))}
    </dl>
  );
}
