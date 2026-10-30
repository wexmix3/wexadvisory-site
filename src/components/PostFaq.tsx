import type { PostFaqItem } from "@/lib/blog";
import Eyebrow from "@/components/brand/Eyebrow";
import Heading from "@/components/brand/Heading";
import Section from "@/components/brand/Section";

// Props-driven FAQ for blog posts. A server component with every answer always
// visible, so the answers are in the HTML crawlers and AI engines fetch. The
// post page builds its FAQPage JSON-LD from the same array passed in here.
// 2026-10-29 brand redesign: the page's one band section, hairline Q&A rows in
// the article's 680px column. Used only by src/app/blog/[slug]/page.tsx.
export default function PostFaq({ faqs }: { faqs: PostFaqItem[] }) {
  if (faqs.length === 0) return null;

  return (
    <Section tone="band" width="narrow" aria-labelledby="post-faq-heading">
      <div className="mx-auto max-w-[680px]">
        <Eyebrow>FAQ</Eyebrow>
        <Heading id="post-faq-heading" size="h2-sm">
          Frequently asked questions
        </Heading>
        <div className="mt-10 border-t border-ink/15">
          {faqs.map((f) => (
            <div key={f.q} className="border-b border-ink/15 py-6">
              <h3 className="text-[19px] font-bold leading-snug tracking-[-0.015em] text-ink">{f.q}</h3>
              <p className="mt-2 text-[16px] leading-relaxed text-ink">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
