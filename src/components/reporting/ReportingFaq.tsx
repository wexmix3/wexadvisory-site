import Eyebrow from "@/components/brand/Eyebrow";
import FaqList from "@/components/brand/FaqList";
import Heading from "@/components/brand/Heading";
import Section from "@/components/brand/Section";
import { FAQS } from "./content";

// Answers stay in the DOM (FaqList hides closed ones) and match the FAQPage
// JSON-LD built from the same FAQS in page.tsx.
export default function ReportingFaq() {
  return (
    <Section id="faq" divider width="narrow" aria-labelledby="faq-title">
      <Eyebrow>Questions</Eyebrow>
      <Heading id="faq-title" reveal>
        Automated reporting, answered
      </Heading>
      <div className="mt-8">
        <FaqList items={[...FAQS]} />
      </div>
    </Section>
  );
}
