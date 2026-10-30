import Image from "next/image";
import { cx } from "./cx";

// The site's art device (Max picked "B + C" on 2026-10-30, aios
// state/worksheets/refs/wex-imagery/refs.md): a greyscale photo multiplied
// into the pale band colour, cut against a flat brand block on grid paper,
// with one solid dot on the seam and an optional big mono label. Colour lives
// inside the plate only. Archive photos are Library of Congress FSA/OWI
// (public domain); credit them near where they appear.
const TONES = {
  gold: { bg: "#C8A84B", ink: "#0F1F3D", dot: "#0F1F3D" },
  navy: { bg: "#0F1F3D", ink: "#F3E3B0", dot: "#C8A84B" },
  pale: { bg: "#F3E3B0", ink: "#0F1F3D", dot: "#C8A84B" },
} as const;

type Props = {
  src: string;
  alt: string;
  tone?: keyof typeof TONES;
  label?: string; // e.g. "01", set large in the colour block
  flip?: boolean; // colour block on the left instead of the right
  photoPos?: string; // object-position for the photo
  photoShare?: number; // photo width as a fraction, default 0.58
  dotTop?: string; // the seam dot's top offset; push it down on portraits so it clears the face
  aspect?: string; // tailwind aspect class, default aspect-[4/3]
  sizes: string;
  priority?: boolean;
  className?: string;
};

export default function CollagePlate({
  src,
  alt,
  tone = "gold",
  label,
  flip = false,
  photoPos = "50% 40%",
  photoShare = 0.58,
  dotTop = "18%",
  aspect = "aspect-[4/3]",
  sizes,
  priority,
  className,
}: Props) {
  const t = TONES[tone];
  const grid = `repeating-linear-gradient(0deg, transparent 0 23px, ${t.ink}22 23px 24px), repeating-linear-gradient(90deg, transparent 0 23px, ${t.ink}22 23px 24px)`;
  const photo = `${Math.round(photoShare * 100)}%`;
  return (
    <div className={cx("relative flex w-full overflow-hidden", aspect, flip && "flex-row-reverse", className)}>
      <div className="relative h-full shrink-0 bg-band" style={{ width: photo }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover mix-blend-multiply"
          style={{ objectPosition: photoPos, filter: "grayscale(1) contrast(1.15) brightness(1.05)" }}
        />
      </div>
      <div className="relative flex flex-1 items-end p-4" style={{ background: t.bg, backgroundImage: grid }}>
        {label && (
          <span aria-hidden="true" className="font-mono text-[44px] font-bold leading-none" style={{ color: t.ink }}>
            {label}
          </span>
        )}
        <span
          aria-hidden="true"
          className={cx(
            "absolute h-[22%] min-h-8 rounded-full",
            flip ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2"
          )}
          style={{ aspectRatio: "1", background: t.dot, top: dotTop }}
        />
      </div>
    </div>
  );
}
