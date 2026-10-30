import Image from "next/image";
import { cardClass } from "@/components/brand/Card";
import Eyebrow from "@/components/brand/Eyebrow";
import Heading from "@/components/brand/Heading";
import Section from "@/components/brand/Section";
import Tag from "@/components/brand/Tag";
import { cx } from "@/components/brand/cx";
import { EXAMPLES, type Example } from "./content";

function Steps({ label, items, tone }: { label: string; items: string[]; tone: "before" | "after" }) {
  return (
    <div>
      <p className="mb-3 font-mono text-[12px] uppercase tracking-[0.12em] text-muted">{label}</p>
      <ul className="space-y-2">
        {items.map((i) => (
          <li
            key={i}
            className={cx(
              "border-l-2 pl-3.5 text-[15px] leading-relaxed",
              tone === "after" ? "border-ink text-ink" : "border-grid text-ink/80"
            )}
          >
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ExampleCard({ e }: { e: Example }) {
  return (
    <li className={cx(cardClass("none"), "flex flex-col overflow-hidden")}>
      <article className="flex flex-1 flex-col">
        {e.image && (
          <div className="relative aspect-[16/10] border-b border-ink/10 bg-white">
            <Image
              src={e.image}
              alt={`${e.client} reporting system, figures blurred`}
              fill
              sizes="(min-width: 768px) 560px, 100vw"
              className="object-cover object-top"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col gap-6 p-6 sm:p-7">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">
                {e.team}
                {e.client && <> · {e.client}</>}
              </span>
              {e.illustrative && <Tag>Example</Tag>}
            </div>
            <h3 className="text-h3 text-ink">{e.title}</h3>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <Steps label="Before" items={e.before} tone="before" />
            <Steps label="After" items={e.after} tone="after" />
          </div>
          <p className="mt-auto border-t border-ink/10 pt-4 text-[15px]">
            <span className="font-semibold text-ink">Delivered as:</span> {e.delivery}
          </p>
        </div>
      </article>
    </li>
  );
}

export default function Examples() {
  return (
    <Section id="examples" divider aria-labelledby="examples-title">
      <Eyebrow>What it looks like</Eyebrow>
      <Heading id="examples-title" reveal className="max-w-[860px]">
        Different teams, the same job: data in, a report out, nobody rebuilding it by hand.
      </Heading>
      <p className="mt-4 max-w-2xl text-[17px] leading-relaxed">
        Three of these were built for clients, with figures blurred because it is their data. The last is an example
        of the same pattern for another team.
      </p>
      <ul className="mt-10 grid gap-4 md:grid-cols-2">
        {EXAMPLES.map((e) => (
          <ExampleCard key={e.title} e={e} />
        ))}
      </ul>
    </Section>
  );
}
