import Image from "next/image";
import Button from "@/components/brand/Button";
import { LINKEDIN } from "@/components/brand/links";

// Imagery lab (2026-10-30, branch imagery-lab, never merged as-is): three art
// directions for the homepage problem cards and the founder block. Photos are
// Farm Security Administration / Office of War Information negatives from the
// Library of Congress (public domain, "no known restrictions"), cropped and
// greyscaled into public/lab/imagery.

export const PHOTOS = [
  { src: "/lab/imagery/reporting.webp", alt: "A bookkeeper working through a ledger", credit: "Bookkeeper, Chicago, 1941 · Russell Lee", pos: "50% 30%" },
  { src: "/lab/imagery/automation.webp", alt: "Two men going over paperwork at an office desk", credit: "Westby, Wisconsin, 1942 · Arthur Rothstein", pos: "50% 40%" },
  { src: "/lab/imagery/team.webp", alt: "An office worker adding up checks on an adding machine", credit: "Burpee seed company office, Philadelphia, 1943 · Arthur Siegel", pos: "50% 35%" },
] as const;

const SOURCE = "Library of Congress, FSA/OWI";

// A: documentary. Tall photo at the top of each card, credit line under it.
export function DocumentaryCardArt({ i }: { i: number }) {
  const p = PHOTOS[i];
  return (
    <figure className="m-0">
      <div className="relative aspect-[4/3] w-full bg-ink/5">
        <Image src={p.src} alt={p.alt} fill sizes="(min-width: 768px) 380px, 85vw" className="object-cover" style={{ objectPosition: p.pos }} />
      </div>
      <figcaption className="border-b border-ink/10 px-6 py-2 font-mono text-[11px] text-muted sm:px-8">
        {p.credit} · {SOURCE}
      </figcaption>
    </figure>
  );
}

// B: collage. Half photo multiplied into a colour block, half flat colour on
// grid paper with the card's number set large.
const BLOCKS = [
  { bg: "#C8A84B", ink: "#0F1F3D" },
  { bg: "#0F1F3D", ink: "#F3E3B0" },
  { bg: "#F3E3B0", ink: "#0F1F3D" },
];

export function CollageCardArt({ i }: { i: number }) {
  const p = PHOTOS[i];
  const b = BLOCKS[i];
  const grid = `repeating-linear-gradient(0deg, transparent 0 23px, ${b.ink}22 23px 24px), repeating-linear-gradient(90deg, transparent 0 23px, ${b.ink}22 23px 24px)`;
  const flip = i === 1;
  return (
    <div className="relative grid aspect-[4/3] w-full grid-cols-[58%_42%] overflow-hidden" style={{ direction: flip ? "rtl" : "ltr" }}>
      <div className="relative" style={{ background: "#F6EDD3" }}>
        <Image
          src={p.src}
          alt={p.alt}
          fill
          sizes="(min-width: 768px) 220px, 50vw"
          className="object-cover mix-blend-multiply"
          style={{ objectPosition: p.pos, filter: "contrast(1.15) brightness(1.05)" }}
        />
      </div>
      <div className="relative flex items-end p-4" style={{ background: b.bg, backgroundImage: grid, direction: "ltr" }}>
        <span className="font-mono text-[44px] font-bold leading-none" style={{ color: b.ink }}>
          0{i + 1}
        </span>
        <span
          aria-hidden="true"
          className="absolute h-16 w-16 rounded-full"
          style={{ top: "18%", [flip ? "right" : "left"]: "-2rem", background: i === 0 ? "#0F1F3D" : "#C8A84B", opacity: 0.92 }}
        />
      </div>
    </div>
  );
}

// C: paper and pen. A handwritten margin note with a drawn arrow down to the
// quote. No photos.
const NOTES = ["March numbers??\nstill not in", "who's calling\nthem back?", "paying for seats.\nnobody logs in"];
const ARROWS = [
  "M8 6 C 30 10, 52 22, 58 52 M50 44 L58 54 L64 42",
  "M70 4 C 46 12, 30 26, 26 54 M18 46 L26 56 L34 46",
  "M10 8 C 40 6, 60 24, 62 54 M54 46 L62 56 L69 45",
];

export function PenCardArt({ i, hand }: { i: number; hand: string }) {
  return (
    <div className="relative -mb-1 flex h-[92px] items-start justify-between" aria-hidden="true">
      <p className={`${hand} whitespace-pre-line text-[24px] leading-[1.05] text-[#B23A2E] -rotate-2`}>{NOTES[i]}</p>
      <svg width="80" height="64" viewBox="0 0 80 64" className="mr-4 mt-6 shrink-0" fill="none">
        <path d={ARROWS[i]} stroke="#B23A2E" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

// Founder blocks for each direction (replace Founder.tsx in the lab only).
export function DocumentaryFounder() {
  return (
    <div className="border-t border-ink/10 pt-7">
      <figure className="m-0 grid grid-cols-[132px_minmax(0,1fr)] items-start gap-5">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[8px] bg-ink/5">
          <Image src="/headshot.jpg" alt="Max Wexley" fill sizes="132px" className="object-cover grayscale" />
        </div>
        <div>
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">Who you work with</p>
          <h3 className="mt-1 text-h3 text-ink">Max Wexley</h3>
          <p className="mt-2 text-[15.5px] leading-relaxed">
            New York, finance background. I scope, build and support every project myself.
          </p>
          <Button href="/about" variant="quiet">
            How I work →
          </Button>
        </div>
      </figure>
    </div>
  );
}

export function CollageFounder() {
  const grid =
    "repeating-linear-gradient(0deg, transparent 0 23px, #0F1F3D22 23px 24px), repeating-linear-gradient(90deg, transparent 0 23px, #0F1F3D22 23px 24px)";
  return (
    <div className="border-t border-ink/10 pt-7">
      <div className="grid grid-cols-[160px_minmax(0,1fr)] items-start gap-5">
        <div className="relative grid aspect-square grid-cols-2 overflow-hidden rounded-[4px]">
          <div className="relative col-span-2 row-start-1" style={{ background: "#C8A84B", backgroundImage: grid }} />
          <div className="absolute inset-y-0 right-0 w-[72%]" style={{ background: "#F6EDD3" }}>
            <Image src="/headshot.jpg" alt="Max Wexley" fill sizes="120px" className="object-cover grayscale mix-blend-multiply" />
          </div>
          <span aria-hidden="true" className="absolute left-3 top-3 h-10 w-10 rounded-full bg-ink" />
        </div>
        <div>
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">Who you work with</p>
          <h3 className="mt-1 text-h3 text-ink">Max Wexley</h3>
          <p className="mt-2 text-[15.5px] leading-relaxed">
            New York, finance background. I scope, build and support every project myself.
          </p>
          <Button href="/about" variant="quiet">
            How I work →
          </Button>
        </div>
      </div>
    </div>
  );
}

export function LetterFounder({ hand }: { hand: string }) {
  return (
    <div className="border-t border-ink/10 pt-8">
      <div className="relative -rotate-[0.8deg] rounded-[2px] border border-ink/10 bg-white px-7 py-7 shadow-[0_18px_40px_-18px_rgba(15,31,61,0.35)] sm:px-9">
        <p className="text-[16px] leading-relaxed text-ink">Hey there,</p>
        <p className="mt-3 text-[15.5px] leading-relaxed">
          If your business runs on a spreadsheet, a few inboxes and someone&apos;s memory, you&apos;re who I build for.
        </p>
        <p className="mt-3 text-[15.5px] leading-relaxed">
          I scope, build and support every project myself. You talk to the person who writes the code, and you get a
          written estimate before any work starts.
        </p>
        <p className="mt-3 text-[15.5px] leading-relaxed">
          Book 30 minutes. You&apos;ll leave with a short list of what&apos;s worth automating, whether or not you hire
          me.
        </p>
        <div className="mt-5 flex items-end gap-4">
          <span className={`${hand} text-[40px] leading-none text-ink`}>Max</span>
          <div className="relative mb-1 h-10 w-10 overflow-hidden rounded-full border border-ink/10">
            <Image src="/headshot.jpg" alt="Max Wexley" fill sizes="40px" className="object-cover" />
          </div>
          <p className="mb-1 font-mono text-[12px] text-muted">
            Max Wexley ·{" "}
            <a href={LINKEDIN} className="underline underline-offset-4" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
