import Eyebrow from "@/components/brand/Eyebrow";
import FactList from "@/components/brand/FactList";
import Heading from "@/components/brand/Heading";
import Section from "@/components/brand/Section";
import { AUDIT_ANSWER, AUDIT_FACTS } from "./audit-content";

/* Answer-first block right under the hero (2026-11-23 readiness pass): the
   question, a two-to-three sentence answer that reads on its own when quoted,
   then who / how long / cost. Server-rendered plain text, so it is in the HTML
   without script. The answer is the first FAQ word for word. */
export default function AuditAnswer() {
  return (
    <Section divider aria-labelledby="answer-title">
      <div className="max-w-[860px]">
        <Eyebrow>The short answer</Eyebrow>
        <Heading id="answer-title">What is an AI readiness assessment?</Heading>
        <p className="mt-5 text-[17px] leading-relaxed sm:text-[18px]">{AUDIT_ANSWER}</p>
      </div>
      <FactList items={AUDIT_FACTS} columns={3} size="sm" className="mt-10" />
    </Section>
  );
}
