import { cx } from "./cx";

// A real <table> in the sheet style: white fill, 1px grid lines, mono
// throughout, numbers right-aligned and tabular. One column can be the row
// header (rowHeader: true). The header row can be hidden visually for
// two-column key/value tables. Wider than a phone? It scrolls inside its own
// box, never the page.
export type Column = {
  key: string;
  label: string;
  align?: "left" | "right";
  rowHeader?: boolean;
  strong?: boolean; // bold cell text (the figure column)
};

type Props = {
  caption: string;
  showCaption?: boolean;
  columns: Column[];
  rows: Array<Record<string, React.ReactNode>>;
  hideHeader?: boolean;
  className?: string;
};

export default function DataTable({ caption, showCaption = false, columns, rows, hideHeader = false, className }: Props) {
  return (
    <div className={cx("overflow-x-auto rounded-[4px] border border-grid bg-white", className)}>
      <table className="w-full border-separate border-spacing-0 font-mono text-[13px]">
        <caption
          className={
            showCaption ? "border-b border-grid bg-chrome px-4 py-2 text-left text-[11px] text-muted" : "sr-only"
          }
        >
          {caption}
        </caption>
        <thead className={hideHeader ? "sr-only" : "bg-chrome text-[11px] text-muted"}>
          <tr>
            {columns.map((c) => (
              <th
                key={c.key}
                scope="col"
                className={cx(
                  "border-b border-r border-grid px-4 py-2 font-normal last:border-r-0",
                  c.align === "right" ? "text-right" : "text-left"
                )}
              >
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {columns.map((c) => {
                const cls = cx(
                  "border-r border-grid px-4 py-3.5 align-top leading-snug last:border-r-0",
                  i < rows.length - 1 && "border-b",
                  c.align === "right" ? "text-right tabular-nums" : "text-left",
                  c.strong ? "font-bold text-ink" : "font-normal"
                );
                return c.rowHeader ? (
                  <th key={c.key} scope="row" className={cls}>
                    {r[c.key]}
                  </th>
                ) : (
                  <td key={c.key} className={cls}>
                    {r[c.key]}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
