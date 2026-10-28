type Tool = {
  id: string;
  tag: "Agent" | "Dashboard" | "Automation" | "Product";
  title: string;
  body: string;
};

// Split 2026-10-16: client systems are kept apart from the tools I run my own
// business on, so nothing internal reads as client proof. Copy kept short and
// parallel in length so each grid reads as uniform at a glance.
const CLIENT_SYSTEMS: Tool[] = [
  {
    id: "shopify-agent",
    tag: "Agent",
    title: "Shopify Sync Agent",
    body: "Daily automated sync between commerce APIs and a live ops dashboard: inventory and orders, no manual export.",
  },
  {
    id: "occupancy-dashboard",
    tag: "Dashboard",
    title: "Occupancy Dashboard",
    body: "Daily-refreshing occupancy tracking with historical backfill, replacing a manual monthly spreadsheet process.",
  },
  {
    id: "ops-dashboard",
    tag: "Dashboard",
    title: "Ops Dashboard",
    body: "Command center for a small operations team: cross-agent priority queue and account health, one workspace.",
  },
];

const OWN_TOOLS: Tool[] = [
  {
    id: "blog-agent",
    tag: "Agent",
    title: "SEO / AEO Blog Agent",
    body: "Research-to-publish pipeline: finds a topic, drafts the post, runs a quality gate, queues it for my approval.",
  },
  {
    id: "outreach",
    tag: "Automation",
    title: "Cold Outreach Automation",
    body: "Prospect discovery, enrichment and multi-step sequencing with reply tracking and deliverability checks.",
  },
  {
    id: "client-brain",
    tag: "Product",
    title: "Canon",
    body: "A hosted knowledge base queried in plain language: grounded answers with citations, corrections it remembers.",
  },
];

// One accent per category so the grid reads at a glance, not just on close reading.
const TAG_STYLES: Record<Tool["tag"], string> = {
  Agent: "text-gold/90 border-gold/35",
  Dashboard: "text-[#8fb4ff] border-[#8fb4ff]/35",
  Automation: "text-[#7fd9b6] border-[#7fd9b6]/35",
  Product: "text-[#c9a8f0] border-[#c9a8f0]/35",
};

function Grid({ tools }: { tools: Tool[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
      {tools.map((t) => (
        <div
          key={t.id}
          className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 backdrop-blur-sm flex flex-col h-full"
        >
          <span
            className={`inline-block self-start text-[10px] font-bold tracking-[0.15em] uppercase border rounded-full px-2.5 py-1 mb-4 ${TAG_STYLES[t.tag]}`}
          >
            {t.tag}
          </span>
          <p className="text-white text-base font-bold mb-2">{t.title}</p>
          <p className="text-white/70 text-sm leading-relaxed">{t.body}</p>
        </div>
      ))}
    </div>
  );
}

export default function ToolsShowcase() {
  return (
    <section className="bg-[#0A1226] py-24 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">
          What I&apos;ve built
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-balance">
          Shipped systems, not slide decks
        </h2>
        <p className="text-white/70 text-base max-w-2xl mb-10">
          The systems I built for clients.
        </p>

        <Grid tools={CLIENT_SYSTEMS} />

        <h3 className="text-white/60 text-xs font-bold tracking-[0.2em] uppercase mt-14 mb-5">
          Tools I run Wex Advisory on
        </h3>
        <Grid tools={OWN_TOOLS} />
      </div>
    </section>
  );
}
