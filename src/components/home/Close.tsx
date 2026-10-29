import { Check } from "lucide-react";
import Button from "@/components/brand/Button";
import Card from "@/components/brand/Card";
import Eyebrow from "@/components/brand/Eyebrow";
import Heading from "@/components/brand/Heading";
import Section from "@/components/brand/Section";
import { CALENDLY, EMAIL } from "@/components/brand/links";
import ContactForm from "@/components/ContactForm";
import Founder from "./Founder";

// Booking + "not ready?" fallback (2026-10-29 brand redesign of the
// homepage-v3 CloseSection; copy unchanged), with the founder block under the
// booking column. Owns id="contact", which the nav, footer, FAQ and llms.txt
// all link to.
const CHECKLIST = ["Free", "Talk to the person who builds it", "Written estimate before any work starts"];

export default function Close() {
  return (
    <Section id="contact" divider>
      <div className="grid items-start gap-10 md:grid-cols-2 md:gap-14">
        <div>
          <Eyebrow>Let&apos;s talk</Eyebrow>
          <Heading size="h2-sm" reveal>
            Book a free strategy call
          </Heading>
          <p className="mt-5 text-[17px] leading-relaxed">
            No slide deck, no pitch. You leave with a short list of what&apos;s worth automating, whether or not you
            hire me.
          </p>
          <div className="mt-8">
            <Button href={CALENDLY} external block>
              Book a strategy call
            </Button>
            <p className="mt-3 font-mono text-[12px] text-muted">Free · 30 minutes · pick any open time</p>
          </div>
          <ul className="mt-7 space-y-2.5">
            {CHECKLIST.map((item) => (
              <li key={item} className="flex items-center gap-3 text-[15.5px]">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[4px] bg-selection">
                  <Check className="h-3.5 w-3.5 text-ink" strokeWidth={2.5} aria-hidden="true" />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mb-8 mt-7 text-[15.5px]">
            Prefer email?{" "}
            <a href={`mailto:${EMAIL}`} className="font-semibold underline underline-offset-4">
              {EMAIL}
            </a>
          </p>
          <Founder />
        </div>

        <Card padding="lg">
          <h3 className="text-h3 text-ink">Not ready to talk?</h3>
          <p className="mb-6 mt-2 text-[15.5px] leading-relaxed">
            Send me a note instead. I read every message myself and reply within 24 hours.
          </p>
          <ContactForm />
          <div className="mt-5 border-t border-ink/10 pt-3">
            <Button href="/audit" variant="quiet">
              Or run the free AI Audit (2 min) →
            </Button>
          </div>
        </Card>
      </div>
    </Section>
  );
}
