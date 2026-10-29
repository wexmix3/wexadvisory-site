import Eyebrow from "@/components/design-system/Eyebrow";

// Static before/after of one real 25N job (ref-1 anatomy, no animation).
// Coral is used for the before-state figures only, never elsewhere on the page.
// Every stat below is a sourced 25N fact; do not add one without a source.
const BEFORE_STATS = [
  { label: "Reconciled by hand", figure: "5 locations" },
  { label: "How often", figure: "Every month-end" },
];

const AFTER_STATS = [
  { label: "Refresh", figure: "Daily" },
  { label: "First delivery", figure: "9 hrs" },
  { label: "Finance reviews", figure: "Exceptions only" },
];

function Stats({
  stats,
  tone,
  cols,
}: {
  stats: { label: string; figure: string }[];
  tone: "before" | "after";
  cols: string;
}) {
  return (
    <dl className={`grid ${cols} gap-x-4 gap-y-5 border-t border-white/10 pt-5`}>
      {stats.map((s) => (
        <div key={s.label}>
          <dt className="text-white/60 text-xs font-bold tracking-[0.15em] uppercase mb-1.5">
            {s.label}
          </dt>
          <dd
            className={`font-display text-2xl leading-tight ${
              tone === "before" ? "text-[#f19a8c]" : "text-white"
            }`}
          >
            {s.figure}
          </dd>
        </div>
      ))}
    </dl>
  );
}

const BEFORE = [
  "GL export",
  "Excel, by hand",
  "Reconciled across 5 locations",
  "Packet assembled",
  "Emailed to finance",
];

const AFTER = [
  "GL export arrives by email",
  "Checked against the rules automatically",
  "Dashboard + PDF/Excel packet refreshed daily",
  "Finance reviewed the exceptions",
];

function Chain({ steps, tone }: { steps: string[]; tone: "before" | "after" }) {
  const chip =
    tone === "before"
      ? "bg-white/[0.03] border-white/10 text-white/70"
      : "bg-gold/[0.06] border-gold/30 text-white";
  return (
    <ol className="flex flex-col items-stretch">
      {steps.map((s, i) => (
        <li key={s} className="flex flex-col items-start">
          <span className={`border rounded-xl px-4 py-2.5 text-sm leading-snug ${chip}`}>{s}</span>
          {i < steps.length - 1 && (
            <span
              aria-hidden="true"
              className={`ml-6 my-1 h-4 w-px ${tone === "before" ? "bg-white/20" : "bg-gold/40"}`}
            />
          )}
        </li>
      ))}
    </ol>
  );
}

export default function BeforeAfter() {
  return (
    <section className="bg-[#0A1226] py-24 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <Eyebrow>One job, before and after</Eyebrow>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 max-w-2xl text-balance">
          Closing the books at a 5-location coworking operator
        </h2>

        <div className="grid md:grid-cols-2 gap-5">
          <div className="bg-white/[0.04] border border-white/10 rounded-2xl backdrop-blur-sm p-7 flex flex-col">
            <p className="text-white/60 text-xs font-bold tracking-[0.25em] uppercase mb-6">Before</p>
            <Chain steps={BEFORE} tone="before" />
            <div className="mt-auto pt-8">
              <Stats stats={BEFORE_STATS} tone="before" cols="grid-cols-2" />
            </div>
          </div>

          <div className="bg-white/[0.04] border border-white/10 rounded-2xl backdrop-blur-sm p-7 flex flex-col">
            <p className="text-gold text-xs font-bold tracking-[0.25em] uppercase mb-6">After</p>
            <Chain steps={AFTER} tone="after" />
            <div className="mt-auto pt-8">
              <Stats stats={AFTER_STATS} tone="after" cols="grid-cols-2 lg:grid-cols-3" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
