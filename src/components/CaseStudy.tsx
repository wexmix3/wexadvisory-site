type CaseCard = {
  id: string;
  industry: string;
  client: string;
  body: string;
  stats: { stat: string; label: string }[];
};

const CASES: CaseCard[] = [
  {
    id: "ecommerce-recovery-tools",
    industry: "E-Commerce Operations",
    client: "Wholesale + DTC recovery-tools brand",
    body: "119 wholesale accounts and 2,500+ sales leads were tracked in a spreadsheet with no unified view. Now: one live dashboard, live Shopify sync, and 5 automated agents running daily.",
    stats: [
      { stat: "119", label: "accounts unified" },
      { stat: "5", label: "agents live" },
      { stat: "Daily", label: "priority digest" },
    ],
  },
  {
    id: "coworking-midwest",
    industry: "Flexible Coworking",
    client: "Multi-location coworking operator",
    body: "No systematic view of local competitive position. Delivered: 5 competitor profiles, a full local SEO audit, and a prioritized action plan — in 9 hours from kickoff.",
    stats: [
      { stat: "5", label: "competitors profiled" },
      { stat: "3", label: "SEO gaps found" },
      { stat: "9hrs", label: "to delivery" },
    ],
  },
];

export default function CaseStudy() {
  return (
    <section id="work" className="bg-[#071220] py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">Proof, Not Promises</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">Real engagements, real numbers</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {CASES.map((c) => (
            <div key={c.id} className="bg-white/[0.04] border border-white/10 rounded-2xl overflow-hidden flex flex-col h-full">
              <div className="border-l-4 border-gold bg-white/[0.03] px-6 py-5 min-h-[84px] flex flex-col justify-center">
                <p className="text-gold text-[11px] font-bold tracking-[0.2em] uppercase mb-1">{c.industry}</p>
                <p className="text-white text-lg font-bold">{c.client}</p>
              </div>
              <div className="px-6 py-6 flex flex-col flex-grow">
                <p className="text-white/50 text-sm leading-relaxed mb-6">{c.body}</p>
                <div className="flex gap-6 mt-auto">
                  {c.stats.map((s) => (
                    <div key={s.label}>
                      <div className="text-white text-xl font-bold tabular-nums font-display">
                        {s.stat}
                      </div>
                      <div className="text-white/40 text-[11px] mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <a href="/work" className="text-sm font-semibold text-white/60 hover:text-white transition-colors">
            See full case studies →
          </a>
        </div>
      </div>
    </section>
  );
}
