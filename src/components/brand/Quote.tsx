// A client quote: large semibold text, mono attribution. Pass the words
// without quote marks; the component adds curly quotes. size="sm" is for
// testimonials longer than two sentences.
export default function Quote({
  children,
  cite,
  size = "md",
  className,
}: {
  children: React.ReactNode;
  cite: string;
  size?: "md" | "sm";
  className?: string;
}) {
  const type = size === "sm" ? "text-[17px] leading-relaxed sm:text-[18px]" : "text-[19px] leading-snug sm:text-[21px]";
  return (
    <figure className={className}>
      <blockquote className={`${type} font-semibold tracking-[-0.01em] text-ink`}>
        &ldquo;{children}&rdquo;
      </blockquote>
      <figcaption className="mt-3 font-mono text-[12.5px] text-muted">{cite}</figcaption>
    </figure>
  );
}
