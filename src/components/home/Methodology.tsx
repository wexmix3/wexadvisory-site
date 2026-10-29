import Eyebrow from "@/components/brand/Eyebrow";
import Card from "@/components/brand/Card";
import Heading from "@/components/brand/Heading";
import Rail from "@/components/brand/Rail";
import Section from "@/components/brand/Section";

// Process with a stated output per step: four cards from lg up (a swipe row on
// phones), each ending in the thing the client walks away with (2026-10-29 brand redesign of the
// homepage-v3 Methodology; copy unchanged). 25N is past tense.
const STEPS = [
  {
    num: "01",
    title: "Audit",
    body: "The free AI Audit estimates which of your team's jobs a system could take over, and what they cost you today.",
    output: "a report with dollar figures, free.",
  },
  {
    num: "02",
    title: "Scope",
    body: "You and I pick the job worth automating first. I write down what it does, what it costs and how you'll know it worked.",
    output: "a written estimate and one success metric.",
  },
  {
    num: "03",
    title: "Build",
    body: "I build it on the tools you already use and ship it in working pieces, so you see progress early.",
    output: "a working system. First delivery at 25N came 9 hours after kickoff.",
  },
  {
    num: "04",
    title: "Hand off",
    body: "Your team learns to run it without me, and I stay on call for changes.",
    output: "a recorded one-hour walkthrough, a written guide and a quarterly refresher.",
  },
];

export default function Methodology() {
  return (
    <Section id="how-it-works" divider>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
        <div>
          <Eyebrow>How it works</Eyebrow>
          <Heading reveal>From the problem to a system your team owns.</Heading>
        </div>
        <p className="max-w-md text-[17px] leading-relaxed">
          I start with the problem, not the technology. Four steps, and each one ends with something you can hold me
          to.
        </p>
      </div>

      <Rail label="How it works, four steps" cols={4} ordered className="mt-10">
        {STEPS.map((s) => (
          <Card as="li" key={s.num} className="flex h-full flex-col">
            <span className="font-mono text-[12px] text-muted">{s.num}</span>
            <h3 className="mt-3 text-h3 text-ink">{s.title}</h3>
            <p className="mt-2 text-[15.5px] leading-relaxed">{s.body}</p>
            <p className="mt-auto border-t border-grid pt-3 text-[14.5px] leading-relaxed">
              <span className="mr-1 font-mono text-[11.5px] uppercase tracking-[0.1em] text-muted">Output:</span>
              <span className="font-semibold">{s.output}</span>
            </p>
          </Card>
        ))}
      </Rail>
    </Section>
  );
}
