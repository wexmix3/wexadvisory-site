import Card from "@/components/brand/Card";
import Eyebrow from "@/components/brand/Eyebrow";
import Heading from "@/components/brand/Heading";
import Section from "@/components/brand/Section";
import ContactForm from "@/components/ContactForm";
import { SEND_A_REPORT } from "./content";

// The page's only form. source="reporting" tags the inquiry for Max and sends
// the reporting auto-reply (see /api/contact).
export default function SendAReport() {
  return (
    <Section id="send-a-report" divider aria-labelledby="send-title">
      <div className="grid items-start gap-10 md:grid-cols-2 md:gap-12">
        <div>
          <Eyebrow>Free, no call needed</Eyebrow>
          <Heading id="send-title" size="h2-sm" reveal>
            {SEND_A_REPORT.heading}
          </Heading>
          <p className="mt-5 text-[16.5px] leading-relaxed">{SEND_A_REPORT.body}</p>
        </div>
        <Card padding="lg">
          <ContactForm
            source="reporting"
            messageLabel={SEND_A_REPORT.messageLabel}
            messagePlaceholder={SEND_A_REPORT.messagePlaceholder}
          />
        </Card>
      </div>
    </Section>
  );
}
