import Image from "next/image";
import Button from "@/components/brand/Button";
import Card from "@/components/brand/Card";
import Eyebrow from "@/components/brand/Eyebrow";
import { LINKEDIN, X_PROFILE } from "@/components/brand/links";

// Compact author box for blog posts. AboutFounder is a full-width section that
// reads too heavy under an article, so posts use this.
// 2026-10-29 brand redesign: a paper card in the article's 680px column.
// Used only by src/app/blog/[slug]/page.tsx.
export default function PostAuthor() {
  return (
    <section className="bg-canvas px-4 py-16 sm:px-8 md:py-20" aria-labelledby="post-author-heading">
      <Card padding="lg" className="mx-auto flex max-w-[680px] flex-col gap-6 sm:flex-row sm:items-center">
        <Image
          src="/headshot.jpg"
          alt="Max Wexley"
          width={96}
          height={96}
          className="h-24 w-24 flex-shrink-0 rounded-[12px] border border-ink/10 object-cover object-top"
        />
        <div className="min-w-0">
          <Eyebrow className="mb-2">Written by</Eyebrow>
          <h2 id="post-author-heading" className="text-h3 text-ink">
            Max Wexley
          </h2>
          <p className="mt-2 text-[15.5px] leading-relaxed">
            Founder of Wex Advisory in New York City, University of Michigan 2024, with a background
            in finance. I build AI automation, dashboards and reporting systems for small and
            mid-sized businesses, and I scope, build and support every project myself.
          </p>
          <p className="mt-2 flex flex-wrap gap-x-5">
            <Button href={LINKEDIN} external variant="quiet">
              LinkedIn
            </Button>
            <Button href={X_PROFILE} external variant="quiet">
              X
            </Button>
          </p>
        </div>
      </Card>
    </section>
  );
}
