import Eyebrow from "@/components/design-system/Eyebrow";

// Services written as the buyer's pain (33labs "pick the one you need" cards).
// id="services" is the Nav "Services" target.
// Reporting links to the ecommerce ops-dashboard page because it is the only
// existing page about dashboards; swap it for a reporting service page once
// one exists.
const PROBLEMS = [
  {
    tag: "Reporting",
    pain: "Nobody trusts the numbers until Friday.",
    fix: "Finance and ops dashboards that update themselves.",
    href: "/ai-ops-dashboard-for-ecommerce-brands",
  },
  {
    tag: "Automation",
    pain: "Someone copies this between tools every day.",
    fix: "Workflows and agents that take the busywork off your team.",
    href: "/ai-integration-for-small-businesses",
  },
  {
    tag: "Team",
    pain: "We bought the AI seats. Nothing changed.",
    fix: "Training and assistants your team actually uses.",
    href: "/ai-training-for-small-businesses",
  },
];

const INDUSTRIES = [
  { label: "Coworking", href: "/ai-for-coworking-spaces" },
  { label: "Property management", href: "/ai-for-property-management" },
  { label: "Law firms", href: "/ai-automation-for-law-firms" },
  { label: "Ecommerce", href: "/ai-ops-dashboard-for-ecommerce-brands" },
];

export default function ProblemPicker() {
  return (
    <section id="services" className="bg-[#0A1226] py-24 px-6 border-t border-white/5 scroll-mt-20">
      {/* Legacy anchor: keeps old /#flagship links (bookmarks, external) landing here. */}
      <span id="flagship" className="block relative -top-20" aria-hidden="true" />
      <div className="max-w-5xl mx-auto">
        <Eyebrow>Pick the problem</Eyebrow>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 max-w-2xl text-balance">
          Three kinds of work. Start with whichever costs you most.
        </h2>

        <div className="grid md:grid-cols-3 gap-5 auto-rows-fr">
          {PROBLEMS.map((p) => (
            <a
              key={p.tag}
              href={p.href}
              className="group bg-white/[0.04] border border-white/10 rounded-2xl backdrop-blur-sm p-7 flex flex-col h-full hover:border-gold/40 transition-colors"
            >
              <span className="text-gold text-[11px] font-bold tracking-[0.2em] uppercase mb-5">
                {p.tag}
              </span>
              <span className="font-display text-white text-2xl leading-snug mb-4 text-balance">
                &ldquo;{p.pain}&rdquo;
              </span>
              <span className="text-white/70 text-base leading-relaxed mb-6">{p.fix}</span>
              <span className="mt-auto text-gold text-sm font-semibold group-hover:underline underline-offset-4">
                How I fix it →
              </span>
            </a>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 border-t border-white/10 pt-6">
          <p className="text-white/60 text-xs font-bold tracking-[0.2em] uppercase shrink-0">
            Built for your industry
          </p>
          <ul className="flex flex-wrap gap-2">
            {INDUSTRIES.map((i) => (
              <li key={i.href}>
                <a
                  href={i.href}
                  className="inline-flex items-center min-h-11 border border-white/15 rounded-full px-4 py-2.5 text-sm text-white/75 hover:text-white hover:border-gold/50 transition-colors"
                >
                  {i.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
