import Eyebrow from "@/components/brand/Eyebrow";
import Heading from "@/components/brand/Heading";
import Section from "@/components/brand/Section";
import { DELIVERY, TOOLS_SHIPPED, TOOLS_SIMILAR } from "./content";

const chip =
  "inline-flex min-h-10 items-center rounded-[6px] border border-ink/15 bg-paper px-3.5 font-mono text-[13px] text-ink";

export default function Tools() {
  return (
    <Section divider>
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <Eyebrow>Where the data comes from</Eyebrow>
          <Heading size="h2-sm" reveal>
            Tools I&apos;ve connected in client work
          </Heading>
          <ul className="mt-6 flex flex-wrap gap-2">
            {TOOLS_SHIPPED.map((t) => (
              <li key={t} className={chip}>
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[15.5px] leading-relaxed">
            And similar tools: {TOOLS_SIMILAR.join(", ")}, or anything that exports a file or has an API.
          </p>
        </div>
        <div>
          <Eyebrow>Where the report lands</Eyebrow>
          <Heading size="h2-sm" reveal>
            Where your team already looks
          </Heading>
          <ul className="mt-6 flex flex-wrap gap-2">
            {DELIVERY.map((d) => (
              <li key={d.label} className={chip}>
                {d.label}
                {d.status === "can-do" && <span className="ml-2 text-[12px] text-muted">(can do)</span>}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[15.5px] leading-relaxed">
            Most readers never log in to a dashboard, so the report goes to them.
          </p>
        </div>
      </div>
    </Section>
  );
}
