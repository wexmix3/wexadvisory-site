type Tool = {
  id: string;
  tag: "Agent" | "Dashboard" | "Automation" | "Product";
  title: string;
  body: string;
};

const TOOLS: Tool[] = [
  {
    id: "shopify-agent",
    tag: "Agent",
    title: "Shopify Sync Agent",
    body: "Daily automated sync between Shopify Admin API and a live ops dashboard — inventory and DTC orders, no manual export/import.",
  },
  {
    id: "occupancy-dashboard",
    tag: "Dashboard",
    title: "Occupancy Dashboard",
    body: "Daily-refreshing occupancy tracking with historical backfill for a multi-location coworking operator — replaced a manual monthly Excel process.",
  },
  {
    id: "blog-agent",
    tag: "Agent",
    title: "SEO / AEO Blog Agent",
    body: "Research-to-publish content pipeline: discovers a topic, drafts the post, runs it through a quality gate, and queues it for one-click approval.",
  },
  {
    id: "outreach",
    tag: "Automation",
    title: "Cold Outreach Automation",
    body: "Prospect discovery, enrichment, and multi-step email sequencing with reply tracking and deliverability monitoring built in.",
  },
  {
    id: "reco-ops",
    tag: "Dashboard",
    title: "RECO Ops Dashboard",
    body: "Pulse command center for a two-founder e-commerce team — cross-agent Priority Action Queue, wholesale account health, and a full CRM/Operations/Finance/Outreach workspace replacing spreadsheet-only triage.",
  },
  {
    id: "client-brain",
    tag: "Product",
    title: "Client Brain",
    body: "A hosted knowledge base clients query in plain language — grounded answers with citations, and a correction loop that gets smarter over time.",
  },
];

// One accent per category so the grid reads at a glance, not just on close reading.
const TAG_STYLES: Record<Tool["tag"], string> = {
  Agent: "text-gold/80 border-gold/30",
  Dashboard: "text-[#8fb4ff]/90 border-[#8fb4ff]/35",
  Automation: "text-[#7fd9b6]/90 border-[#7fd9b6]/35",
  Product: "text-[#c9a8f0]/90 border-[#c9a8f0]/35",
};

export default function ToolsShowcase() {
  return (
    <section className="bg-[#0A1226] py-24 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">
          What We&apos;ve Built
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Not a slide deck. Shipped systems.
        </h2>
        <p className="text-white/50 text-base max-w-2xl mb-12">
          A sample of the agents, dashboards, and products already running for real businesses.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TOOLS.map((t) => (
            <div
              key={t.id}
              className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:border-gold/40 transition-colors"
            >
              <span
                className={`inline-block text-[10px] font-bold tracking-[0.15em] uppercase border rounded-full px-2.5 py-1 mb-4 ${TAG_STYLES[t.tag]}`}
              >
                {t.tag}
              </span>
              <p className="text-white text-base font-bold mb-2">{t.title}</p>
              <p className="text-white/50 text-sm leading-relaxed">{t.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
