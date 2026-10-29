import type { CSSProperties } from "react";
import { cx } from "./cx";
import s from "./brand.module.css";

// Key numbers drawn as one spreadsheet row: column letters (A, B, C...), a
// row gutter, a big Inter Tight figure per cell and a mono label under it.
// 2 to 4 items. On phones the row turns into one line per number. caption is
// the source line under the sheet ("Measured from ... Real numbers, not
// sample data."); use it whenever the numbers are real.
type Item = { value: string; label: React.ReactNode };

type Props = {
  items: Item[];
  label: string; // accessible name for the group, e.g. "RECO results"
  caption?: React.ReactNode;
  row?: number; // the gutter's row number, default 1
  className?: string;
};

const LETTERS = "ABCDEFGH";

export default function StatSheet({ items, label, caption, row = 1, className }: Props) {
  const vars = { "--cols": items.length } as CSSProperties;
  return (
    <figure className={cx("m-0", className)} role="group" aria-label={label}>
      <div className={s.sheet} style={vars}>
        <div className={s.sheetHead} aria-hidden="true">
          <span />
          {items.map((_, i) => (
            <span key={i}>{LETTERS[i]}</span>
          ))}
        </div>
        <div className={s.sheetBody}>
          <span className={s.sheetGutter} aria-hidden="true">
            {row}
          </span>
          {items.map((it, i) => (
            <p key={i} className={s.sheetCell}>
              <span className={s.sheetNum}>{it.value}</span>
              <span className={s.sheetLabel}>{it.label}</span>
            </p>
          ))}
        </div>
      </div>
      {caption && <figcaption className="mt-3 font-mono text-[11.5px] text-muted">{caption}</figcaption>}
    </figure>
  );
}
