import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Caveat } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RevealScope from "@/components/brand/RevealScope";
import HomeHero from "@/components/home/HomeHero";
import ProblemPicker from "@/components/home/ProblemPicker";
import Cases from "@/components/home/Cases";
import Methodology from "@/components/home/Methodology";
import Close from "@/components/home/Close";
import {
  CollageCardArt,
  CollageFounder,
  DocumentaryCardArt,
  DocumentaryFounder,
  LetterFounder,
  PenCardArt,
} from "@/components/lab/ImageryArt";

// Imagery lab (2026-10-30): the homepage with one of three art directions so
// Max can compare them on the real site. Branch-only: never merge this route.
const hand = Caveat({ subsets: ["latin"], display: "swap" });

const VARIANTS = {
  a: "A · Documentary",
  b: "B · Collage",
  c: "C · Paper and pen",
} as const;
type V = keyof typeof VARIANTS;

export const metadata: Metadata = { title: "Imagery lab | Wex Advisory", robots: { index: false, follow: false } };

export function generateStaticParams() {
  return Object.keys(VARIANTS).map((v) => ({ v }));
}

export default function ImageryLab({ params }: { params: { v: string } }) {
  const v = params.v as V;
  if (!(v in VARIANTS)) notFound();

  const art =
    v === "a"
      ? { node: (i: number) => <DocumentaryCardArt i={i} />, bleed: true }
      : v === "b"
        ? { node: (i: number) => <CollageCardArt i={i} />, bleed: true }
        : { node: (i: number) => <PenCardArt i={i} hand={hand.className} /> };
  const founder =
    v === "a" ? <DocumentaryFounder /> : v === "b" ? <CollageFounder /> : <LetterFounder hand={hand.className} />;

  return (
    <>
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <RevealScope>
          <HomeHero />
          <ProblemPicker art={art} />
          <Cases />
          <Methodology />
          <Close founder={founder} />
        </RevealScope>
      </main>
      <Footer />
      <nav
        aria-label="Imagery options"
        data-lab-bar
        className="fixed inset-x-0 bottom-0 z-50 flex flex-wrap items-center justify-center gap-2 border-t border-ink/20 bg-ink px-3 py-2 font-mono text-[12px] text-canvas"
      >
        <span className="mr-2 opacity-70">Imagery lab:</span>
        {(Object.keys(VARIANTS) as V[]).map((k) => (
          <a
            key={k}
            href={`/lab/imagery/${k}#services`}
            className={k === v ? "rounded bg-gold px-2 py-1 text-ink" : "rounded px-2 py-1 underline underline-offset-4"}
          >
            {VARIANTS[k]}
          </a>
        ))}
      </nav>
    </>
  );
}
