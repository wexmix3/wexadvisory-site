import Image from "next/image";

// A client quote: large semibold text, mono attribution. Pass the words
// without quote marks; the component adds curly quotes. size="sm" is for
// testimonials longer than two sentences. avatar puts a small round photo of
// the person beside the attribution (only with their OK).
export default function Quote({
  children,
  cite,
  size = "md",
  avatar,
  className,
}: {
  children: React.ReactNode;
  cite: string;
  size?: "md" | "sm";
  avatar?: { src: string; alt: string };
  className?: string;
}) {
  const type = size === "sm" ? "text-[17px] leading-relaxed sm:text-[18px]" : "text-[19px] leading-snug sm:text-[21px]";
  return (
    <figure className={className}>
      <blockquote className={`${type} font-semibold tracking-[-0.01em] text-ink`}>
        &ldquo;{children}&rdquo;
      </blockquote>
      <figcaption className="mt-3 flex items-center gap-3 font-mono text-[12.5px] text-muted">
        {avatar && (
          <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-ink/10">
            <Image src={avatar.src} alt={avatar.alt} fill sizes="44px" className="object-cover" />
          </span>
        )}
        {cite}
      </figcaption>
    </figure>
  );
}
