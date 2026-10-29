import type { Metadata } from "next";

// Art-direction lab index (2026-10-29, branch art-direction-lab). Local only:
// lets Max click through the three directions before one replaces the live
// design. Never merge this route to master.
export const metadata: Metadata = {
  title: "Lab · Wex Advisory",
  robots: { index: false, follow: false },
};

const OPTIONS = [
  {
    href: "/lab/a",
    name: "A · Approve it",
    argument: "The product is the hero: an agent thread proposes actions and you approve them. Dark, quiet, product-led.",
    ref: "Reference: Polar Analytics",
  },
  {
    href: "/lab/b",
    name: "B · The sheet sorts itself",
    argument: "Your messy spreadsheet sorts itself into a dashboard as you scroll. Light, warm, literal to the headline.",
    ref: "Reference: Rows",
  },
  {
    href: "/lab/c",
    name: "C · Systems on the shelf",
    argument: "Every system I've built is a collectible cover on a shelf. Bright, tangible, shows range at a glance.",
    ref: "Reference: Shopify Editions",
  },
];

export default function LabIndex() {
  return (
    <main className="min-h-screen bg-white text-[#14171a] px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Pick a direction</h1>
        <p className="text-[#5d6b7a] mb-10 max-w-2xl">
          Same copy on all three. Judge the device and the feel, not the wording. Scroll each one all the way
          down and hover the cards. The live site is at <a className="underline" href="/">/</a> for comparison.
        </p>
        <div className="grid md:grid-cols-3 gap-5">
          {OPTIONS.map((o) => (
            <a
              key={o.href}
              href={o.href}
              className="block border border-[#e3e8ef] rounded-xl p-6 hover:border-[#C8A84B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C8A84B]"
            >
              <h2 className="text-lg font-bold mb-2">{o.name}</h2>
              <p className="text-[#5d6b7a] text-sm mb-4">{o.argument}</p>
              <p className="text-xs text-[#8a96a3]">{o.ref}</p>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
