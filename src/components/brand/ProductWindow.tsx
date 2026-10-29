import { cx } from "./cx";
import Tag from "./Tag";
import s from "./brand.module.css";

// The white app window that frames every product demo (agent thread, sheet,
// dashboard). Chrome bar with an icon, a title and a tag that defaults to
// "Sample data": anything invented must keep that tag, and real client numbers
// never go inside a sample window. It is the only element allowed a shadow
// (shadow={false} when the window sits inside an animated stage).
type Props = {
  title: React.ReactNode;
  label: string; // accessible name of the region, e.g. "Example: ... with sample data"
  icon?: "dots" | "sheet" | "none";
  tag?: string | null;
  shadow?: boolean;
  className?: string;
  children: React.ReactNode;
};

function SheetIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className="shrink-0">
      <rect x="0.5" y="0.5" width="15" height="15" rx="3" fill="none" stroke="#0F1F3D" />
      <path d="M0.5 5.5h15M0.5 10.5h15M5.5 5.5v10" stroke="#0F1F3D" />
    </svg>
  );
}

export default function ProductWindow({
  title,
  label,
  icon = "dots",
  tag = "Sample data",
  shadow = true,
  className,
  children,
}: Props) {
  return (
    <div role="region" aria-label={label} className={cx(s.window, shadow && s.windowShadow, "text-ink", className)}>
      <div className="flex h-11 items-center gap-3 border-b border-grid bg-chrome px-4">
        {icon === "dots" && (
          <span aria-hidden="true" className="flex shrink-0 gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full border border-ink/15" />
            <span className="h-2.5 w-2.5 rounded-full border border-ink/15" />
            <span className="h-2.5 w-2.5 rounded-full border border-ink/15" />
          </span>
        )}
        {icon === "sheet" && <SheetIcon />}
        <div className="min-w-0 flex-1 truncate text-[14px] font-semibold">{title}</div>
        {tag && <Tag>{tag}</Tag>}
      </div>
      {children}
    </div>
  );
}
