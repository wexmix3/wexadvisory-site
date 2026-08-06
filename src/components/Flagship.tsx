const INCLUDED = [
  "Full operational audit — where your team is losing hours to manual, repeatable work",
  "A unified system pulling whatever your business runs on (accounts, leads, inventory, financials, customer data) into one live view",
  "Automated agents for the specific gaps found — client-facing or internal: follow-up detection, reporting, reconciliation, reminders",
  "Full audit trail and write layer — every automated action is logged and reversible",
  "Handoff docs and a live walkthrough — nobody on your team needs to be technical to run it",
];

const AUDIT_URL = "https://audit.wexadvisory.com/audit";

export default function Flagship() {
  return (
    <section id="flagship" className="bg-navy py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">The Flagship Engagement</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Custom AI Automation &amp; Systems Work</h2>
        <p className="text-white/50 text-base leading-relaxed max-w-2xl mb-14">
          Scoped to what your team actually needs — client-facing tools, internal systems, financial
          workflows, or anything eating hours right now. This spans everything from{" "}
          <a href="/ai-consulting-for-small-businesses" className="text-gold hover:underline">AI consulting</a>{" "}
          to <a href="/ai-integration-for-small-businesses" className="text-gold hover:underline">integrating AI into tools you already use</a>{" "}
          — built from real, delivered work, not a template: the same caliber of build currently running a
          live ops dashboard for an e-commerce operator and a financial close pipeline for a coworking
          client. Proof of range, not the limit of it.
        </p>

        <div className="grid md:grid-cols-[1.3fr_1fr] gap-10">
          <div className="bg-white/[0.04] rounded-2xl p-8">
            <h3 className="text-white text-xl font-bold mb-5">What&apos;s included</h3>
            <ul className="space-y-4">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/60 leading-relaxed">
                  <span className="text-gold font-bold flex-shrink-0 mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#071220] border border-white/10 rounded-2xl p-8 self-start">
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">Pricing</p>
            <p className="text-white text-3xl font-bold mb-3 font-display">
              Scoped to the Work
            </p>
            <p className="text-white/40 text-sm leading-relaxed mb-7">
              No two engagements are priced the same — a quick fix isn&apos;t a system rebuild. We figure out
              scope together on a call, then I give you a real number before anything starts. No package,
              no menu, no guessing.
            </p>
            <a
              href="#contact"
              className="block text-center py-3.5 rounded-xl bg-gold text-navy font-bold text-sm hover:bg-gold-muted transition-colors mb-3"
            >
              Book a Scoping Call →
            </a>
            <a
              href={AUDIT_URL}
              className="block text-center py-3.5 rounded-xl border border-white/20 text-white/60 font-semibold text-sm hover:border-gold/40 hover:text-gold transition-colors"
            >
              Start with the Free Audit
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
