import Image from "next/image";
import Eyebrow from "@/components/design-system/Eyebrow";
import { EXAMPLES, type Example } from "./content";

function Steps({ label, items, tone }: { label: string; items: string[]; tone: "before" | "after" }) {
  return (
    <div>
      <p className={`text-xs font-bold tracking-[0.2em] uppercase mb-3 ${tone === "after" ? "text-gold" : "text-white/60"}`}>
        {label}
      </p>
      <ul className="space-y-2">
        {items.map((i) => (
          <li
            key={i}
            className={`text-sm leading-relaxed pl-4 border-l ${tone === "after" ? "border-gold/50 text-white/85" : "border-white/15 text-white/70"}`}
          >
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Card({ e }: { e: Example }) {
  return (
    <article className="bg-white/[0.04] border border-white/10 rounded-2xl backdrop-blur-sm overflow-hidden flex flex-col">
      {e.image && (
        <div className="relative aspect-[16/10] border-b border-white/10">
          <Image
            src={e.image}
            alt={`${e.client} reporting system, figures blurred`}
            fill
            sizes="(min-width: 768px) 480px, 100vw"
            className="object-cover object-top"
          />
        </div>
      )}
      <div className="p-7 flex flex-col gap-5 flex-1">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-gold text-xs font-bold tracking-[0.2em] uppercase">{e.team}</span>
            {e.client && <span className="text-white/60 text-xs">· {e.client}</span>}
            {e.illustrative && (
              <span className="text-[0.625rem] font-bold tracking-[0.15em] uppercase text-white/70 border border-white/25 rounded-full px-2.5 py-1">
                Example
              </span>
            )}
          </div>
          <h3 className="text-white text-xl font-bold leading-snug">{e.title}</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          <Steps label="Before" items={e.before} tone="before" />
          <Steps label="After" items={e.after} tone="after" />
        </div>
        <p className="mt-auto pt-4 border-t border-white/10 text-sm text-white/70">
          <span className="text-white font-semibold">Delivered as:</span> {e.delivery}
        </p>
      </div>
    </article>
  );
}

export default function Examples() {
  return (
    <section id="examples" className="bg-[#0A1226] py-24 px-6 border-t border-white/5 scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <Eyebrow>What it looks like</Eyebrow>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 max-w-2xl text-balance">
          Different teams, the same job: data in, a report out, nobody rebuilding it by hand.
        </h2>
        <p className="text-white/70 text-base leading-relaxed max-w-2xl mb-12">
          Three of these were built for clients, with figures blurred because it is their data. The last is an example of the same pattern for another team.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {EXAMPLES.map((e) => (
            <Card key={e.title} e={e} />
          ))}
        </div>
      </div>
    </section>
  );
}
