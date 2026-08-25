const BUCKETS = [
  {
    id: "consulting",
    tag: "Consulting",
    title: "We build it with you",
    body: "Hands-on AI automation work, scoped to what your team actually needs — starting with a free audit, then a roadmap, then real systems in production. Boutique, on-call, personal.",
    points: ["Free AI readiness audit", "Custom-scoped automation builds", "Ongoing support, not a handoff"],
  },
  {
    id: "education",
    tag: "Education",
    title: "We teach your team to use it",
    body: "Live workshops and walkthroughs for non-technical staff — grounded in the tools already built for your business, not a generic slide deck.",
    points: ["Hands-on team training", "Walkthroughs of your own tools", "Scoped to your actual stack"],
  },
];

export default function HowWeWork() {
  return (
    <section className="bg-[#071220] py-24 px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">
          How We Work
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
          Two ways in. One relationship.
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {BUCKETS.map((b) => (
            <div
              key={b.id}
              className="bg-white/[0.04] border border-white/10 rounded-2xl p-8 backdrop-blur-sm"
            >
              <p className="text-gold text-[11px] font-bold tracking-[0.2em] uppercase mb-2">
                {b.tag}
              </p>
              <p className="text-white text-xl font-bold mb-3">{b.title}</p>
              <p className="text-white/50 text-sm leading-relaxed mb-6">{b.body}</p>
              <ul className="space-y-2">
                {b.points.map((p) => (
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
    </section>
  );
}
