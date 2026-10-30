import { Check } from "lucide-react";
import Card from "@/components/brand/Card";

// "What was delivered": a card with a chrome header bar and a checked list.
export default function DeliveredList({ title, items }: { title: string; items: string[] }) {
  return (
    <Card padding="none" className="overflow-hidden">
      <h3 className="border-b border-grid bg-chrome px-6 py-3 font-mono text-[12px] font-normal uppercase tracking-[0.12em] text-muted">
        {title}
      </h3>
      <ul className="space-y-3 px-6 py-5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-[15.5px] leading-relaxed">
            <span className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] bg-selection">
              <Check className="h-3 w-3 text-ink" strokeWidth={2.5} aria-hidden="true" />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </Card>
  );
}
