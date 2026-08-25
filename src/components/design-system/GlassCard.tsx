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
    <div
      className={`bg-white/[0.04] border border-white/10 rounded-2xl backdrop-blur-sm ${
        hover ? "hover:border-gold/40 transition-colors" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
