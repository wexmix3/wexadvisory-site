import Card from "@/components/brand/Card";
import Eyebrow from "@/components/brand/Eyebrow";
import Heading from "@/components/brand/Heading";
import Section from "@/components/brand/Section";
import { STEPS } from "./content";

// Same anatomy as the homepage Methodology section.
export default function Process() {
  return (
    <Section id="how-it-works" aria-labelledby="process-title">
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <div>
          <Eyebrow>How it works</Eyebrow>
          <Heading id="process-title" size="h2-sm" reveal>
            From one report on your desk to one that runs itself.
          </Heading>
          <p className="mt-5 max-w-md text-[16.5px] leading-relaxed">Each step ends with something you can hold me to.</p>
        </div>
        <Card padding="none" className="px-6 sm:px-8">
          <ol>
            {STEPS.map((s, i) => (
              <li
                key={s.title}
                className="grid grid-cols-[2.5rem_minmax(0,1fr)] border-b border-ink/10 py-7 last:border-b-0 sm:grid-cols-[3rem_minmax(0,1fr)]"
              >
                <span className="pt-1 font-mono text-[13px] tabular-nums text-muted" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-h3 text-ink">{s.title}</h3>
                  <p className="mt-2 text-[15.5px] leading-relaxed">{s.body}</p>
                  <p className="mt-3 text-[15px] leading-relaxed">
                    <span className="font-mono text-[12px] uppercase tracking-[0.1em] text-muted">Output:</span>{" "}
                    <span className="font-semibold text-ink">{s.output}</span>
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Card>
      </div>
    </Section>
  );
}
