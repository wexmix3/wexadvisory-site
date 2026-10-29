// A client quote: large semibold text, mono attribution. Pass the words
// without quote marks; the component adds curly quotes.
export default function Quote({
  children,
  cite,
  className,
}: {
  children: React.ReactNode;
  cite: string;
  className?: string;
}) {
  return (
    <figure className={className}>
      <blockquote className="text-[19px] font-semibold leading-snug tracking-[-0.01em] text-ink sm:text-[21px]">
        &ldquo;{children}&rdquo;
      </blockquote>
      <figcaption className="mt-3 font-mono text-[12.5px] text-muted">{cite}</figcaption>
    </figure>
  );
}
