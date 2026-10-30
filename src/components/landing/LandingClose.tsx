import Button from "@/components/brand/Button";
import Card from "@/components/brand/Card";
import Heading from "@/components/brand/Heading";
import { CALENDLY } from "@/components/brand/links";

// The closing card for the landing pages. Same copy, links and targets as
// the old ServiceCTA (removed 2026-10-29): the audit CTA, then the "Prefer to talk first?" booking link.
export default function LandingClose({ heading, subheading }: { heading: string; subheading: string }) {
  return (
    <section className="scroll-mt-20 bg-canvas px-4 pb-16 pt-4 sm:px-8 md:pb-20">
      <Card padding="none" className="mx-auto max-w-[1180px] px-6 py-12 text-center sm:py-16">
        <Heading reveal className="mx-auto max-w-[760px]">
          {heading}
        </Heading>
        <p className="mx-auto mt-4 max-w-[560px] text-[17px] leading-relaxed">{subheading}</p>
        <div className="mt-8 flex flex-col items-center">
          <Button href="/audit" block>
            Analyze My Business →
          </Button>
        </div>
        <div className="mx-auto mt-8 max-w-[420px] border-t border-grid pt-6">
          <p className="text-[15px] text-muted">Prefer to talk first?</p>
          <Button href={CALENDLY} external variant="quiet" className="mt-1">
            Book a free 30-min strategy call →
          </Button>
        </div>
      </Card>
    </section>
  );
}
