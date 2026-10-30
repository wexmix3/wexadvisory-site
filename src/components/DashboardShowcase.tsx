import Image from "next/image";
import Card from "@/components/brand/Card";
import Eyebrow from "@/components/brand/Eyebrow";
import Heading from "@/components/brand/Heading";
import Section from "@/components/brand/Section";
import Tag from "@/components/brand/Tag";

// Used only by /work. 2026-10-29 brand pass: the page's one band section;
// blurred client screenshots in system cards. Copy unchanged.

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
    body: "Live Shopify sync, priority action queue, and automated agents replacing a spreadsheet-only workflow, built for a two-founder team with no engineering staff.",
    chips: ["Live Shopify sync", "Automated priority queue", "Daily digest agents"],
    image: "/projects/reco-dashboard-blurred.png",
    imageAlt: "Ops dashboard pulse view, figures blurred for confidentiality",
  },
  {
    id: "25n",
    eyebrow: "Coworking Finance",
    title: "Multi-location GL dashboard",
    body: "GL data across five locations, month-over-month variance flags, and run-rate projections, replacing manual Excel reconciliation for the finance team.",
    chips: ["5-location GL rollup", "Variance flagging", "Run-rate projections"],
    image: "/projects/25n-dashboard-blurred.png",
    imageAlt: "Finance dashboard income statement view, figures blurred for confidentiality",
  },
];

export default function DashboardShowcase() {
  return (
    <Section tone="band" aria-labelledby="inside-the-build">
      <Eyebrow>Inside the Build</Eyebrow>
      <Heading id="inside-the-build" reveal>
        What I actually ship
      </Heading>
      <p className="mt-4 max-w-2xl text-[17px] leading-relaxed">
        Real tools built for clients. Figures are blurred (this is client data), but the interface is exactly what
        they used.
      </p>

      <ul className="mt-10 grid gap-4 md:grid-cols-2">
        {SHOWCASES.map((s) => (
          <Card as="li" key={s.id} padding="none" className="flex flex-col overflow-hidden">
            <div className="relative aspect-[16/10] overflow-hidden border-b border-ink/10 bg-white">
              <Image
                src={s.image}
                alt={s.imageAlt}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-grow flex-col p-6">
              <Eyebrow className="mb-2">{s.eyebrow}</Eyebrow>
              <h3 className="text-h3 text-ink">{s.title}</h3>
              <p className="mb-5 mt-3 text-[15.5px] leading-relaxed">{s.body}</p>
              <div className="mt-auto flex flex-wrap gap-2">
                {s.chips.map((c) => (
                  <Tag key={c}>{c}</Tag>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </ul>
    </Section>
  );
}
