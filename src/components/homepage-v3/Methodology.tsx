import Eyebrow from "@/components/design-system/Eyebrow";

// Process with a stated output per step (ref-3 anatomy: heading column left,
// one panel of rule-separated steps right). The "Output:" lines are the point:
// each step names what the client walks away with.
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
    <section id="how-it-works" className="bg-[#0A1226] py-24 px-6 border-t border-white/5 scroll-mt-20">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-start">
        <div>
          <Eyebrow>How it works</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 text-balance">
            From the problem to a system your team owns.
          </h2>
          <p className="text-white/70 text-base leading-relaxed max-w-md">
            I start with the problem, not the technology. Four steps, and each one ends with
            something you can hold me to.
          </p>
        </div>

        <ol className="bg-white/[0.04] border border-white/10 rounded-2xl backdrop-blur-sm px-6 sm:px-8">
          {STEPS.map((s) => (
            <li
              key={s.num}
              className="grid grid-cols-[2.75rem_1fr] sm:grid-cols-[3.5rem_1fr] py-7 border-b border-white/10 last:border-b-0"
            >
              <span className="font-display text-gold text-2xl leading-none tabular-nums pt-0.5">
                {s.num}
              </span>
              <div>
                <h3 className="text-white text-lg font-bold mb-2">{s.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-3">{s.body}</p>
                <p className="text-sm leading-relaxed">
                  <span className="text-gold font-semibold">Output:</span>{" "}
                  <span className="text-white">{s.output}</span>
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
