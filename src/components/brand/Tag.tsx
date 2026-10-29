import { cx } from "./cx";

// A small mono label in a hairline box: "Sample data", a price, a status.
export default function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cx(
        "inline-block shrink-0 rounded-[4px] border border-grid bg-white px-1.5 py-0.5 font-mono text-[10.5px] uppercase tracking-[0.08em] text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
