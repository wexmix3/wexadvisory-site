import Eyebrow from "@/components/brand/Eyebrow";
import Heading from "@/components/brand/Heading";
import Section from "@/components/brand/Section";
import FaqList from "@/components/brand/FaqList";
import { FAQS } from "./faq-data";

// Homepage FAQ in the brand system (2026-10-29): heading column left, the
// accordion right. The Q&As come from faq-data.ts, the same source as the
// homepage FAQPage JSON-LD, so visible text and structured data match.
export default function FAQ() {
  return (
    <Section id="faq" divider>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div>
          <Eyebrow>FAQ</Eyebrow>
          <Heading reveal>Common questions</Heading>
          <p className="mt-6 text-[16px] leading-relaxed">
            Still have questions?{" "}
            <a href="/#contact" className="font-semibold underline underline-offset-4">
              Send me a message →
            </a>
          </p>
        </div>
        <FaqList items={FAQS} />
      </div>
    </Section>
  );
}
