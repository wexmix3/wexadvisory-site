const STEPS = [
  {
    id: "audit",
    tag: "01. Audit",
    title: "We map what's actually costing you time",
    body: "A free, no-pitch assessment of where AI can realistically save your team hours: not a generic maturity score, a specific list of what's worth automating.",
    points: ["Free AI readiness audit", "Concrete savings estimate", "No obligation to build anything"],
  },
  {
    id: "build",
    tag: "02. Build",
    title: "We build the system, not a slide deck",
    body: "Custom-scoped automation and dashboards, delivered to production: boutique, on-call, personal. Not a handoff to an account manager.",
    points: ["Custom-scoped automation builds", "Shipped to production, not a prototype", "Ongoing support built in"],
  },
  {
    id: "enable",
    tag: "03. Enable",
    title: "We make sure your team can actually run it",
    body: "Hands-on training grounded in the tools we just built for you: a walkthrough of your own stack, not a generic slide deck.",
    points: ["Live team training on your own tools", "Walkthroughs, not documentation dumps", "Scoped to your actual stack"],
  },
];

export default function Methodology() {
  return (
    <section id="flagship" className="bg-[#0A1226] py-24 px-6 border-t border-white/5">
      <div className="max-w-3xl mx-auto">
        <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">How We Work</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-16">
          One relationship. Three steps.
        </h2>

        <div className="relative">
          <div
            className="absolute left-[15px] top-2 bottom-2 w-px bg-white/10"
            aria-hidden="true"
          />
          <div className="space-y-12">
            {STEPS.map((s) => (
              <div key={s.id} className="relative pl-12">
                <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-[#0A1226] border border-gold/40 flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-gold" />
                </div>
                <p className="text-gold text-[11px] font-bold tracking-[0.2em] uppercase mb-2">
                  {s.tag}
                </p>
                <p className="text-white text-xl font-bold mb-3">{s.title}</p>
                <p className="text-white/50 text-sm leading-relaxed mb-4 max-w-xl">{s.body}</p>
                <ul className="space-y-2">
                  {s.points.map((p) => (
                    <li key={p} className="text-white/70 text-sm flex items-start gap-2">
                      <span className="text-gold mt-0.5">&#8226;</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
