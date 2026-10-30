import Eyebrow from "@/components/brand/Eyebrow";
import Heading from "@/components/brand/Heading";
import ProductWindow from "@/components/brand/ProductWindow";
import Section from "@/components/brand/Section";
import { AI_SUMMARY_SAMPLE } from "./content";

// The page's one band section. The summary is invented sample copy, so it sits
// in a ProductWindow tagged "Sample".
export default function AiSummary() {
  return (
    <Section tone="band" aria-labelledby="ai-summary-title">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <Eyebrow>The AI part</Eyebrow>
          <Heading id="ai-summary-title" size="h2-sm" reveal>
            A plain-English summary of what changed, at the top of every report.
          </Heading>
          <p className="mt-5 text-[16.5px] leading-relaxed">
            Numbers tell you what happened. The summary tells the reader where to look: what moved, the likely reason,
            and what is worth acting on this week. It is written from the same data as the report. 25N&apos;s finance
            dashboard opened with one every day.
          </p>
        </div>
        <ProductWindow title="What changed this week" label="Sample AI summary for a fictional business" tag="Sample">
          <figure className="m-0 p-6">
            <ul className="space-y-4">
              {AI_SUMMARY_SAMPLE.lines.map((l) => (
                <li key={l} className="border-l-2 border-ink pl-4 text-[15px] leading-relaxed">
                  {l}
                </li>
              ))}
            </ul>
            <figcaption className="mt-5 font-mono text-[12px] text-muted">{AI_SUMMARY_SAMPLE.business}</figcaption>
          </figure>
        </ProductWindow>
      </div>
    </Section>
  );
}
