import Image from "next/image";

type Case = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  stats: { stat: string; label: string }[];
  image: string;
  imageAlt: string;
};

const CASES: Case[] = [
  {
    id: "reco",
    eyebrow: "E-Commerce Operations",
    title: "Wholesale + DTC command center",
    body: "119 wholesale accounts and 2,500+ sales leads were tracked in a spreadsheet with no unified view. Now: one live dashboard, live Shopify sync, and automated agents replacing manual triage for a two-founder team with no engineering staff.",
    stats: [
      { stat: "119", label: "accounts unified" },
      { stat: "Live", label: "Shopify sync" },
      { stat: "Daily", label: "priority digest" },
    ],
    image: "/projects/reco-dashboard-blurred.png",
    imageAlt: "E-commerce ops dashboard pulse view, figures blurred for confidentiality",
  },
  {
    id: "25n",
    eyebrow: "Flexible Coworking",
    title: "Multi-location finance dashboard",
    body: "Manual Excel reconciliation across five locations, no systematic view of occupancy or competitive position. Delivered: an automated GL verification pipeline, occupancy tracking with historical backfill, and a full competitive analysis in under a day.",
    stats: [
      { stat: "5", label: "locations rolled up" },
      { stat: "Daily", label: "auto refresh" },
      { stat: "9hrs", label: "to first delivery" },
    ],
    image: "/projects/25n-dashboard-blurred.png",
    imageAlt: "25N finance dashboard, figures blurred for confidentiality",
  },
];

export default function CaseStudies() {
  return (
    <section className="bg-[#0A1226] py-24 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">
          Proof, Not Promises
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Real clients, real systems
        </h2>
        <p className="text-white/50 text-base max-w-2xl mb-12">
          Figures are blurred — this is client data — but the interface is exactly what they use
          every day.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {CASES.map((c) => (
            <div
              key={c.id}
              className="bg-white/[0.04] border border-white/10 rounded-2xl overflow-hidden flex flex-col backdrop-blur-sm"
            >
              <div className="relative aspect-[16/10] border-b border-white/10 bg-white overflow-hidden">
                <Image
                  src={c.image}
                  alt={c.imageAlt}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="px-6 py-6 flex flex-col flex-grow">
                <p className="text-gold text-[11px] font-bold tracking-[0.2em] uppercase mb-1.5">
                  {c.eyebrow}
                </p>
                <p className="text-white text-lg font-bold mb-2">{c.title}</p>
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
      </div>
    </section>
  );
}
