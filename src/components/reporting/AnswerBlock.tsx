import Eyebrow from "@/components/design-system/Eyebrow";
import { ANSWER_BLOCK } from "./content";

// Definition + price near the top of the page: the pattern AI answer engines
// quote (see the 2026-10-13 AI Overview analysis).
export default function AnswerBlock() {
  return (
    <section className="bg-[#0A1226] py-20 px-6 border-t border-white/5">
      <div className="max-w-3xl mx-auto">
        <Eyebrow>In short</Eyebrow>
        <p className="text-white/85 text-lg md:text-xl leading-relaxed">{ANSWER_BLOCK}</p>
      </div>
    </section>
  );
}
