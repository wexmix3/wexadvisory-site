import Button from "@/components/brand/Button";
import Card from "@/components/brand/Card";
import Eyebrow from "@/components/brand/Eyebrow";
import Heading from "@/components/brand/Heading";
import Section from "@/components/brand/Section";
import { CALENDLY, EMAIL } from "@/components/brand/links";
import ContactForm from "@/components/ContactForm";
import FounderLetter from "@/components/brand/FounderLetter";
import PhoneReveal from "./PhoneReveal";

// Booking + "not ready?" fallback (2026-10-29 brand redesign of the
// homepage-v3 CloseSection). Owns id="contact", which the nav, footer, FAQ and
// llms.txt all link to.
// 2026-11-06 trim: one column. Max's letter carries the pitch, so the intro
// line and the checklist (both repeated it) were cut; one booking button sits
// under the letter, and the contact form folds behind a button at every width
// (a /#contact link still opens it).
export default function Close() {
  return (
    <Section id="contact" divider>
      <div className="mx-auto max-w-[640px]">
        <Eyebrow>Let&apos;s talk</Eyebrow>
        <Heading size="h2-sm" reveal>
          Book a free strategy call
        </Heading>
        {/* The letter straight under the heading; Founder's divider is for the old two-column layout. */}
        <FounderLetter id="about" className="mt-8" />
        <div className="mt-8">
          <Button href={CALENDLY} external block>
            Book a strategy call
          </Button>
          <p className="mt-3 font-mono text-[12px] text-muted">
            Free · 30 minutes · or email{" "}
            <a href={`mailto:${EMAIL}`} className="underline underline-offset-4 hover:text-ink">
              {EMAIL}
            </a>
          </p>
        </div>

        <div className="mt-8">
          <PhoneReveal label="Not ready to talk? Send a note instead" allWidths>
            <Card padding="lg">
              <p className="mb-6 text-[15.5px] leading-relaxed">
                I read every message myself and reply within 24 hours.
              </p>
              <ContactForm />
            </Card>
          </PhoneReveal>
        </div>
      </div>
    </Section>
  );
}
