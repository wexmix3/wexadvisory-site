import Card from "@/components/brand/Card";
import Rail from "@/components/brand/Rail";

// A set of titled cards (what gets built, categories, integrations): a grid
// from md up, one swipe row on phones. Each card gets a mono 01/02 index.
export type Topic = { title: string; body: React.ReactNode };

export default function TopicRail({
  items,
  label,
  cols = 2,
  className = "mt-10",
}: {
  items: Topic[];
  label: string;
  cols?: 2 | 3 | 4;
  className?: string;
}) {
  return (
    <Rail label={label} cols={cols} className={className}>
      {items.map((t, i) => (
        <Card as="li" key={t.title} className="flex h-full flex-col">
          <span className="font-mono text-[12px] text-muted" aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-3 text-h3 text-ink">{t.title}</h3>
          <p className="mt-2 text-[15.5px] leading-relaxed">{t.body}</p>
        </Card>
      ))}
    </Rail>
  );
}
