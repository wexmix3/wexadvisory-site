import { cx } from "./cx";

// The system card: 1px ink/10 border, 12px radius, paper fill, no shadow.
// With href the whole card is one link and its border darkens on hover; put a
// "→" line inside with group-hover:underline for the affordance.
type Props = {
  as?: "div" | "article" | "li" | "section" | "aside";
  href?: string;
  external?: boolean;
  padding?: "none" | "md" | "lg";
  className?: string;
  id?: string;
  children: React.ReactNode;
};

const PAD = { none: "", md: "p-6", lg: "p-6 sm:p-8" } as const;

export function cardClass(padding: Props["padding"] = "md") {
  return cx("rounded-[12px] border border-ink/10 bg-paper", PAD[padding]);
}

export default function Card({ as: Tag = "div", href, external, padding = "md", className, id, children }: Props) {
  if (href) {
    return (
      <a
        id={id}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={cx(cardClass(padding), "group block transition-colors hover:border-ink", className)}
      >
        {children}
        {external && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    );
  }
  return (
    <Tag id={id} className={cx(cardClass(padding), className)}>
      {children}
    </Tag>
  );
}
