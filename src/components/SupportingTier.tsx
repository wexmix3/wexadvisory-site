const AUDIT_URL = "https://audit.wexadvisory.com/audit";
const TOOL_URL = "https://tool.wexadvisory.com";

export default function SupportingTier() {
  return (
    <section id="supporting" className="bg-[#0a1a30] py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">Not Ready For a Full Engagement?</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Start smaller — both feed into the same work</h2>
        <p className="text-white/50 text-base max-w-2xl mb-14">
          These aren&apos;t separate products competing for attention — they&apos;re the entry point. Most
          engagements start with one of these two, whichever of the{" "}
          <a href="/ai-solutions-for-small-businesses" className="text-gold hover:underline">AI solutions</a>{" "}
          fits where you are right now.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-8 flex flex-col">
            <p className="text-gold text-[11px] font-bold uppercase tracking-widest mb-3">Free · No Signup</p>
            <h3 className="text-white text-xl font-bold mb-2">AI Snapshot Audit</h3>
            <p className="text-white/50 text-sm leading-relaxed mb-6 flex-grow">
              A quick, no-cost read on where automation would save your team the most time — delivered as a
              PDF with a maturity score and specific opportunities, tailored to your business.
            </p>
            <div className="flex items-baseline justify-between pt-5 border-t border-white/[0.06]">
              <span className="text-white text-xl font-bold font-display">Free</span>
              <a href={AUDIT_URL} className="text-gold text-sm font-semibold hover:underline">Get My Snapshot →</a>
            </div>
          </div>

          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-8 flex flex-col">
            <p className="text-gold text-[11px] font-bold uppercase tracking-widest mb-3">Flat Fee · 24hr Delivery</p>
            <h3 className="text-white text-xl font-bold mb-2">Competitive Analysis</h3>
            <p className="text-white/50 text-sm leading-relaxed mb-6 flex-grow">
              Real competitor traffic, SEO, and positioning data — 5 competitor deep-dives and a ranked
              action plan, delivered as a structured PDF report.
            </p>
            <div className="flex items-baseline justify-between pt-5 border-t border-white/[0.06]">
              <span className="text-white text-xl font-bold font-display">Starting at $299</span>
              <a href="#sample-report" className="text-gold text-sm font-semibold hover:underline">See a Sample →</a>
            </div>
          </div>
        </div>
        <p className="text-white/20 text-xs mt-6">
          Ready to order? <a href={TOOL_URL} target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">Get your report →</a>
        </p>
      </div>
    </section>
  );
}
