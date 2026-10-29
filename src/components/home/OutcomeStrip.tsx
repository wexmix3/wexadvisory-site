import Eyebrow from "@/components/design-system/Eyebrow";

// Outcome cards (ref-4 anatomy: big figure, short label, one link). Replaces the
// looping two-logo ClientsMarquee on the homepage. Every figure here is a sourced
// client fact; do not add a card without one.
const OUTCOMES = [
  {
    figure: "9 hrs",
    label: "from kickoff to first working delivery at 25N Coworking",
    href: "/#case-25n",
  },
  {
    figure: "119 → 1",
    label: "wholesale accounts moved from a spreadsheet into one live dashboard at RECO",
    href: "/#case-reco",
  },
];

export default function OutcomeStrip() {
  return (
    <section className="bg-[#0A1226] py-20 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <Eyebrow>Proof, not promises</Eyebrow>
        <h2 className="sr-only">Results from client work</h2>
        <div className="grid md:grid-cols-2 gap-5 mt-8">
          {OUTCOMES.map((o) => (
            <a
              key={o.figure}
              href={o.href}
              className="group bg-white/[0.04] border border-white/10 rounded-2xl backdrop-blur-sm p-7 flex flex-col h-full hover:border-gold/40 transition-colors"
            >
              <span className="font-display text-white text-4xl md:text-[2.75rem] leading-none tabular-nums mb-4">
                {o.figure}
              </span>
              <span className="text-white/75 text-base leading-snug mb-6 text-balance">
                {o.label}
              </span>
              <span className="mt-auto text-gold text-sm font-semibold group-hover:underline underline-offset-4">
                See the work →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
