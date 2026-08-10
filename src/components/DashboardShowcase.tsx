type Showcase = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  chips: string[];
  accent: string;
};

const SHOWCASES: Showcase[] = [
  {
    id: "reco",
    eyebrow: "E-Commerce Ops",
    title: "Wholesale + DTC command center",
    body: "Live Shopify sync, priority action queue, and automated agents replacing a spreadsheet-only workflow — built for a two-founder team with no engineering staff.",
    chips: ["Live Shopify sync", "Automated priority queue", "Daily digest agents"],
    accent: "#3ddc84",
  },
  {
    id: "25n",
    eyebrow: "Coworking Finance",
    title: "Multi-location GL dashboard",
    body: "GL data across five locations, month-over-month variance flags, and run-rate projections — replacing manual Excel reconciliation for the finance team.",
    chips: ["5-location GL rollup", "Variance flagging", "Run-rate projections"],
    accent: "#C8A84B",
  },
];

function BlurredBar({ width, accent }: { width: string; accent?: string }) {
  return (
    <div
      className="h-3 rounded-full"
      style={{
        width,
        background: accent
          ? `linear-gradient(90deg, ${accent}55, ${accent}22)`
          : "rgba(255,255,255,0.12)",
        filter: "blur(3px)",
      }}
    />
  );
}

function MockDashboard({ accent }: { accent: string }) {
  return (
    <div className="rounded-xl bg-[#0a1730] border border-white/10 p-5 h-full flex flex-col gap-4">
      {/* fake top bar */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
        </div>
        <div className="h-2 w-20 rounded-full bg-white/10" />
      </div>

      {/* fake stat tiles with blurred numbers */}
      <div className="grid grid-cols-3 gap-2.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-lg bg-white/[0.03] border border-white/10 p-3 flex flex-col gap-2">
            <div className="h-1.5 w-10 rounded-full bg-white/10" />
            <BlurredBar width="70%" accent={accent} />
          </div>
        ))}
      </div>

      {/* fake chart */}
      <div className="rounded-lg bg-white/[0.03] border border-white/10 p-3 flex-1 flex items-end gap-1.5">
        {[40, 65, 50, 80, 60, 90, 70].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm"
            style={{ height: `${h}%`, background: `${accent}40` }}
          />
        ))}
      </div>

      {/* fake table rows with blurred cells */}
      <div className="flex flex-col gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center justify-between gap-3">
            <div className="h-1.5 w-24 rounded-full bg-white/10" />
            <BlurredBar width="18%" accent={accent} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DashboardShowcase() {
  return (
    <section className="bg-navy py-24 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">
          Inside the Build
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          What we actually ship
        </h2>
        <p className="text-white/50 text-base max-w-2xl mb-12">
          Real tools, live in production for clients today. Figures are blurred — this is client
          data — but the interface is exactly what they use every day.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {SHOWCASES.map((s) => (
            <div
              key={s.id}
              className="bg-white/[0.04] border border-white/10 rounded-2xl overflow-hidden flex flex-col"
            >
              <div className="p-4 pb-0">
                <MockDashboard accent={s.accent} />
              </div>
              <div className="px-6 py-6 flex flex-col flex-grow">
                <p className="text-gold text-[11px] font-bold tracking-[0.2em] uppercase mb-1.5">
                  {s.eyebrow}
                </p>
                <p className="text-white text-lg font-bold mb-2">{s.title}</p>
                <p className="text-white/50 text-sm leading-relaxed mb-4">{s.body}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {s.chips.map((c) => (
                    <span
                      key={c}
                      className="text-[11px] text-white/60 border border-white/10 rounded-full px-2.5 py-1"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
