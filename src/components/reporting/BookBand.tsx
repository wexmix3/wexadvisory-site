import Button from "@/components/brand/Button";
import Card from "@/components/brand/Card";
import Heading from "@/components/brand/Heading";
import { CALENDLY } from "./content";

// Booking only: the page's one form lives in SendAReport. The CtaBand card,
// page-local because it carries a line of body copy and a note under the CTA.
export default function BookBand() {
  return (
    <section aria-labelledby="book-title" className="scroll-mt-20 bg-canvas px-4 pb-16 pt-4 sm:px-8 md:pb-20">
      <Card padding="none" className="mx-auto max-w-[1180px] px-6 py-12 text-center sm:py-16">
        <Heading id="book-title" reveal className="mx-auto max-w-[760px]">
          Rather walk me through it?
        </Heading>
        <p className="mx-auto mt-4 max-w-[560px] text-[17px] leading-relaxed">
          Bring the report to a call and I&apos;ll tell you what I&apos;d automate first, whether or not you hire me.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3">
          <Button href={CALENDLY} external block>
            Book a 30-minute call
          </Button>
          <p className="font-mono text-[12px] text-muted">Free · 30 minutes · pick any open time</p>
          <Button href="/audit" variant="quiet">
            Or run the free AI Audit (2 min) →
          </Button>
        </div>
      </Card>
    </section>
  );
}
