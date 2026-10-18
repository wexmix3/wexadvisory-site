import Eyebrow from "@/components/design-system/Eyebrow";
import { DELIVERY, TOOLS_SHIPPED, TOOLS_SIMILAR } from "./content";

const chip = "inline-flex items-center min-h-11 border border-white/15 rounded-full px-4 text-sm text-white/85";

export default function Tools() {
  return (
    <section className="bg-[#0A1226] py-24 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
        <div>
          <Eyebrow>Where the data comes from</Eyebrow>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-balance">Tools I&apos;ve connected in client work</h2>
          <ul className="flex flex-wrap gap-2.5">
            {TOOLS_SHIPPED.map((t) => (
              <li key={t} className={chip}>
                {t}
              </li>
            ))}
          </ul>
          <p className="text-white/70 text-sm leading-relaxed mt-5">
            And similar tools: {TOOLS_SIMILAR.join(", ")}, or anything that exports a file or has an API.
          </p>
        </div>
        <div>
          <Eyebrow>Where the report lands</Eyebrow>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-balance">Where your team already looks</h2>
          <ul className="flex flex-wrap gap-2.5">
            {DELIVERY.map((d) => (
              <li key={d.label} className={chip}>
                {d.label}
                {d.status === "can-do" && <span className="ml-2 text-white/60 text-xs">(can do)</span>}
              </li>
            ))}
          </ul>
          <p className="text-white/70 text-sm leading-relaxed mt-5">
            Most readers never log in to a dashboard, so the report goes to them.
          </p>
        </div>
      </div>
    </section>
  );
}
