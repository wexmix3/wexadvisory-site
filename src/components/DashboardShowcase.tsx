import Image from "next/image";

type Showcase = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  chips: string[];
  image: string;
  imageAlt: string;
};

const SHOWCASES: Showcase[] = [
  {
    id: "reco",
    eyebrow: "E-Commerce Ops",
    title: "Wholesale + DTC command center",
    body: "Live Shopify sync, priority action queue, and automated agents replacing a spreadsheet-only workflow — built for a two-founder team with no engineering staff.",
    chips: ["Live Shopify sync", "Automated priority queue", "Daily digest agents"],
    image: "/projects/reco-dashboard-blurred.png",
    imageAlt: "Ops dashboard pulse view, figures blurred for confidentiality",
  },
  {
    id: "25n",
    eyebrow: "Coworking Finance",
    title: "Multi-location GL dashboard",
    body: "GL data across five locations, month-over-month variance flags, and run-rate projections — replacing manual Excel reconciliation for the finance team.",
    chips: ["5-location GL rollup", "Variance flagging", "Run-rate projections"],
    image: "/projects/25n-dashboard-blurred.png",
    imageAlt: "Finance dashboard income statement view, figures blurred for confidentiality",
  },
];

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
              <div className="relative aspect-[16/10] border-b border-white/10 bg-white overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.imageAlt}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
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
