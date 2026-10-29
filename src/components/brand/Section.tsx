import { cx } from "./cx";

// A page section with the system's vertical rhythm (py-16 / md:py-20), side
// gutters and a 1180px container (860px when width="narrow"). tone="band" is
// the pale-gold band: at most one per page. divider adds a hairline on top.
type Props = {
  id?: string;
  tone?: "canvas" | "band";
  width?: "default" | "narrow";
  divider?: boolean;
  className?: string;
  innerClassName?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  children: React.ReactNode;
};

export default function Section({
  id,
  tone = "canvas",
  width = "default",
  divider = false,
  className,
  innerClassName,
  children,
  ...aria
}: Props) {
  return (
    <section
      id={id}
      {...aria}
      className={cx(
        "px-4 sm:px-8 py-16 md:py-20 scroll-mt-20",
        tone === "band" ? "bg-band" : "bg-canvas",
        divider && "border-t border-grid",
        className
      )}
    >
      <div className={cx("mx-auto", width === "narrow" ? "max-w-[860px]" : "max-w-[1180px]", innerClassName)}>
        {children}
      </div>
    </section>
  );
}
