import { cx } from "./cx";

// Headings in the brand scale. as defaults to h2; size defaults by level
// (h1 = title, h2 = h2, h3 = h3; size="display" is the homepage h1 only;
// "h2-sm" for a heading inside a two-column block).
// reveal adds the scrubbed word reveal: it needs a <RevealScope> ancestor and
// plain-text children. Never set reveal on an h1 (it must paint at once).
const SIZES = {
  display: "text-display",
  title: "text-title",
  h2: "text-h2",
  "h2-sm": "text-h2-sm",
  h3: "text-h3",
} as const;

export type HeadingSize = keyof typeof SIZES;

type Props = {
  as?: "h1" | "h2" | "h3";
  size?: HeadingSize;
  reveal?: boolean;
  id?: string;
  className?: string;
  children: React.ReactNode;
};

export default function Heading({ as: Tag = "h2", size, reveal = false, id, className, children }: Props) {
  const s = size ?? (Tag === "h1" ? "title" : Tag === "h2" ? "h2" : "h3");
  return (
    <Tag id={id} data-words={reveal ? "" : undefined} className={cx(SIZES[s], "text-ink text-balance", className)}>
      {children}
    </Tag>
  );
}
