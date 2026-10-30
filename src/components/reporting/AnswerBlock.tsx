import Eyebrow from "@/components/brand/Eyebrow";
import Section from "@/components/brand/Section";
import { ANSWER_BLOCK } from "./content";

// Definition + price near the top of the page: the pattern AI answer engines
// quote (see the 2026-10-13 AI Overview analysis).
export default function AnswerBlock() {
  return (
    <Section divider width="narrow" aria-label="In short">
      <Eyebrow>In short</Eyebrow>
      <p className="text-[19px] font-medium leading-relaxed text-ink sm:text-[21px]">{ANSWER_BLOCK}</p>
    </Section>
  );
}
