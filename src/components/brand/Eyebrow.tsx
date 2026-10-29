import { cx } from "./cx";

// The small mono label above a heading ("Client work · Wholesale + DTC").
export default function Eyebrow({
  children,
  as: Tag = "p",
  className,
}: {
  children: React.ReactNode;
  as?: "p" | "span" | "div";
  className?: string;
}) {
  return (
    <Tag className={cx("mb-4 font-mono text-[12px] uppercase tracking-[0.14em] text-muted", className)}>
      {children}
    </Tag>
  );
}
