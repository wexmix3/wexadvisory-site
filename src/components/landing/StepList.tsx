import { cx } from "@/components/brand/cx";

// A numbered process as hairline rows: mono step number, an h3 and its text.
// Number beside the copy from sm up; stacked on phones.
export type Step = { title: string; body: React.ReactNode };

export default function StepList({ steps, className }: { steps: Step[]; className?: string }) {
  return (
    <ol className={cx("border-t border-ink/10", className)}>
      {steps.map((s, i) => (
        <li
          key={s.title}
          className="grid gap-2 border-b border-ink/10 py-6 sm:grid-cols-[64px_minmax(0,1fr)] sm:gap-6"
        >
          <span className="font-mono text-[12px] leading-[1.9] text-muted">{String(i + 1).padStart(2, "0")}</span>
          <div>
            <h3 className="text-h3 text-ink">{s.title}</h3>
            <p className="mt-2 max-w-[640px] text-[16px] leading-relaxed">{s.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
