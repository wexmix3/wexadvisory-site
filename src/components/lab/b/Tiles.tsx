import styles from "./labb.module.css";
import { BOOKS, CHANNELS, WHOLESALE_CALLS } from "./data";

// The three dashboard tiles the sheet sorts into. Rendered twice by
// SheetHero: once as an overlay inside the sheet (animated layout, desktop with
// motion) and once in normal flow under it (phones, reduced motion). CSS shows
// exactly one copy, so assistive tech only ever meets one.
const MAX = Math.max(...CHANNELS.map((c) => c.value));

function SampleTag() {
  return (
    <span className={`${styles.mono} text-[10px] tracking-wide uppercase text-[color:var(--muted)]`}>
      Sample data
    </span>
  );
}

export default function Tiles({ animated }: { animated: boolean }) {
  const anim = animated ? { "data-anim-tile": "" } : {};
  const body = animated ? { "data-anim-body": "" } : {};
  const bar = animated ? { "data-anim-bar": "" } : {};

  return (
    <>
      <div className={`${styles.tile} p-4`} {...anim}>
        <div {...body}>
          <SampleTag />
          <p className="mt-1.5 text-[17px] font-bold leading-[1.15] tracking-[-0.01em]">
            Wholesale: 4 accounts need a call
          </p>
          <ul className={`${styles.mono} mt-3 text-[12px]`}>
            {WHOLESALE_CALLS.map((a) => (
              <li
                key={a.name}
                className="flex items-center justify-between gap-3 py-[7px] border-t border-[color:var(--grid)]"
              >
                <span className="truncate">{a.name}</span>
                <span className="tabular-nums text-[color:var(--muted)] shrink-0">{a.days}d</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={`${styles.tile} p-4`} {...anim}>
        <div {...body}>
          <SampleTag />
          <p className="mt-1.5 text-[17px] font-bold leading-[1.15] tracking-[-0.01em]">
            This week: revenue by channel
          </p>
          <ul className={`${styles.mono} mt-3 space-y-2.5 text-[12px]`}>
            {CHANNELS.map((c) => (
              <li key={c.name}>
                <div className="flex justify-between gap-2 mb-1">
                  <span>{c.name}</span>
                  <span className="tabular-nums">{c.label}</span>
                </div>
                <div className="h-2 rounded-[2px] bg-[#EFE9DB]" aria-hidden="true">
                  <div
                    className={`${styles.tileBar} h-full rounded-[2px] bg-[color:var(--ink)]`}
                    style={{ width: `${Math.round((c.value / MAX) * 100)}%` }}
                    {...bar}
                  />
                </div>
              </li>
            ))}
          </ul>
          <p className={`${styles.mono} mt-3 pt-2 border-t border-[color:var(--grid)] text-[12px] flex justify-between`}>
            <span className="text-[color:var(--muted)]">Total</span>
            <span className="tabular-nums font-bold">$10,543</span>
          </p>
        </div>
      </div>

      <div className={`${styles.tile} p-4`} {...anim}>
        <div {...body}>
          <SampleTag />
          <p className="mt-1.5 text-[17px] font-bold leading-[1.15] tracking-[-0.01em]">Books: margin 41%</p>
          <p className="mt-2 text-[52px] font-extrabold leading-none tracking-[-0.04em] tabular-nums" aria-hidden="true">
            41%
          </p>
          <dl className={`${styles.mono} mt-3 text-[12px]`}>
            {BOOKS.map((b) => (
              <div
                key={b.label}
                className="flex justify-between gap-3 py-[7px] border-t border-[color:var(--grid)]"
              >
                <dt className="text-[color:var(--muted)]">{b.label}</dt>
                <dd className="tabular-nums">{b.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </>
  );
}
