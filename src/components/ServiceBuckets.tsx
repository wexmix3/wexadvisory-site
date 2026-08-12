const CONSULTING_ITEMS = [
  "Automate manual, repeatable workflows",
  "Build new features into tools you already run",
  "Develop or rebuild your website",
  "Craft custom AI agents for client-facing or internal work",
  "Boost outreach — prospecting, sequencing, deliverability",
  "Analyze competitors — traffic, SEO, positioning",
];

const EDUCATION_ITEMS = [
  "Live walkthroughs of tools built for your team",
  "Hands-on AI literacy sessions for non-technical staff",
  "Scoped to your actual stack, not a generic slide deck",
];

export default function ServiceBuckets() {
  return (
    <section id="how-we-work" className="bg-navy py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">How We Work</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Two ways to work with us</h2>
        <p className="text-white/50 text-base leading-relaxed max-w-2xl mb-14">
          Some clients want it built. Some want their team to run it themselves. Most engagements end up
          using a mix of both — starting with whichever fits where you are right now.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-8">
            <p className="text-gold text-[11px] font-bold uppercase tracking-widest mb-3">Build It For You</p>
            <h3 className="text-white text-xl font-bold mb-2">Consulting &amp; Systems Work</h3>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Hands-on delivery — I build the thing, ship it, and hand over something that works.
            </p>
            <ul className="space-y-3 mb-6">
              {CONSULTING_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/60 leading-relaxed">
                  <span className="text-gold font-bold flex-shrink-0 mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <a href="#flagship" className="text-gold text-sm font-semibold hover:underline">
              See the Flagship Engagement ↓
            </a>
          </div>

          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-8">
            <p className="text-gold text-[11px] font-bold uppercase tracking-widest mb-3">Teach Your Team</p>
            <h3 className="text-white text-xl font-bold mb-2">Workshops &amp; Demos</h3>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Live sessions where I walk your team through the tools — how to use what&apos;s already built,
              or how to actually use AI day-to-day instead of it sitting unused. So the value doesn&apos;t
              stop when the engagement does.
            </p>
            <ul className="space-y-3">
              {EDUCATION_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/60 leading-relaxed">
                  <span className="text-gold font-bold flex-shrink-0 mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 text-center">
          <a
            href="#contact"
            className="inline-block py-3.5 px-10 rounded-xl bg-gold text-navy font-bold text-sm hover:bg-gold-muted transition-colors"
          >
            Book a Scoping Call →
          </a>
        </div>
      </div>
    </section>
  );
}
