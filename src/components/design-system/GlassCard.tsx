import { cardClass } from "@/components/brand/Card";

// Legacy name kept for imports; since 2026-10-29 it is the plain system card
// (1px ink/10 border, 12px radius, no glass, no shadow). New code: brand/Card.
export default function GlassCard({
  children,
  className = "",
  hover = false,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div className={`${cardClass("none")} ${hover ? "hover:border-ink transition-colors" : ""} ${className}`}>
      {children}
    </div>
  );
}
