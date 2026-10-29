import Image from "next/image";
import Button from "@/components/brand/Button";
import { LINKEDIN, X_PROFILE } from "@/components/brand/links";

// Short founder block for the homepage: headshot, who, links. Rendered inside
// the Close section under the booking CTA (the person you would book with).
// The full story lives on /about. Deliberately separate from AboutFounder.tsx
// (used on the landing pages). id="about" is a legacy anchor.
export default function Founder() {
  return (
    <div id="about" className="scroll-mt-24 border-t border-ink/10 pt-7">
      <div className="flex items-start gap-5">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[12px] border border-ink/10">
          <Image src="/headshot.jpg" alt="Max Wexley" fill className="object-cover" sizes="80px" />
        </div>
        <div className="min-w-0">
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">Who you work with</p>
          <h3 className="mt-1 text-h3 text-ink">Max Wexley</h3>
          <p className="mt-2 text-[15.5px] leading-relaxed">
            I&apos;m based in New York, and my background is in finance. I scope, build and support every project
            myself, so you always talk to the person who built your system.
          </p>
          <div className="mt-1 flex flex-wrap gap-x-5">
            <Button href="/about" variant="quiet">
              How I work →
            </Button>
            <Button href={LINKEDIN} external variant="quiet">
              LinkedIn →
            </Button>
            <Button href={X_PROFILE} external variant="quiet">
              X →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
