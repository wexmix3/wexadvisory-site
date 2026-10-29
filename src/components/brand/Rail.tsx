import { cx } from "./cx";
import s from "./brand.module.css";

// A row of cards: a grid from md up (2, 3 or 4 columns), one sideways
// scroll-snap row on phones with the next card peeking in, so a set of cards
// costs one screen on a phone instead of three. The row scrolls in its own box
// (never the page) and is keyboard-focusable. Children should be <li>s
// (Card as="li" works).
const COLS = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
} as const;

type Props = {
  label: string; // accessible name of the scroll region, e.g. "Services"
  cols?: keyof typeof COLS;
  ordered?: boolean;
  className?: string;
  children: React.ReactNode;
};

export default function Rail({ label, cols = 3, ordered = false, className, children }: Props) {
  const List = ordered ? "ol" : "ul";
  return (
    <div role="region" aria-label={label} tabIndex={0} className={cx(s.rail, className)}>
      <List className={cx(s.railTrack, "md:grid md:gap-4", COLS[cols])}>{children}</List>
    </div>
  );
}
