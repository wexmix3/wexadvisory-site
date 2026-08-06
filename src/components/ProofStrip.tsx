const STATS = [
  { num: "119 + 2,500", label: "wholesale accounts & sales leads unified into one live dashboard" },
  { num: "5", label: "automated agents running daily in production, zero manual upkeep" },
  { num: "1", label: "finance close pipeline replacing a manual GL-verification process" },
  { num: "0", label: "engineers needed on the client's team to run any of it" },
];

export default function ProofStrip() {
  return (
    <section id="proof" className="bg-[#071220] border-y border-white/10 py-10 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {STATS.map((s) => (
          <div key={s.label} className="border-l-2 border-gold pl-4">
            <div className="text-white text-2xl font-bold tabular-nums">{s.num}</div>
            <div className="text-white/40 text-xs leading-tight mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
