import Button from "@/components/brand/Button";
import Card from "@/components/brand/Card";
import Heading from "@/components/brand/Heading";
import { CALENDLY } from "@/components/brand/links";

// Page-local close for /blog and /blog/[slug] (2026-10-29 brand redesign).
// Same copy and links as the old ServiceCTA (removed 2026-10-29), drawn in the
// brand system: one centred card, the gold Audit button
// and a quiet booking link.
export default function BlogCta({ heading, subheading }: { heading: string; subheading: string }) {
  return (
    <section aria-labelledby="blog-cta-heading" className="bg-canvas px-4 pb-16 pt-4 sm:px-8 md:pb-20">
      <Card padding="none" className="mx-auto max-w-[1180px] px-6 py-12 text-center sm:py-16">
        <Heading id="blog-cta-heading" className="mx-auto max-w-[760px]">
          {heading}
        </Heading>
        <p className="mx-auto mt-4 max-w-[560px] text-[17px] leading-relaxed text-muted">{subheading}</p>
        <div className="mt-8 flex flex-col items-center gap-3">
          <Button href="/audit" block>
            Analyze My Business →
          </Button>
        </div>
        <div className="mx-auto mt-8 max-w-[420px] border-t border-ink/10 pt-6">
          <p className="text-[14px] text-muted">Prefer to talk first?</p>
          <Button href={CALENDLY} external variant="quiet">
            Book a free 30-min strategy call →
          </Button>
        </div>
      </Card>
    </section>
  );
}
