import Image from "next/image";

export default function CloseSection() {
  return (
    <section id="contact" className="bg-[#0A1226] py-28 px-6 border-t border-white/5">
      <div className="max-w-2xl mx-auto text-center flex flex-col items-center">
        <div className="relative w-28 h-28 rounded-full overflow-hidden border border-gold/30 shadow-[0_0_40px_rgba(200,168,75,0.15)] mb-6">
          <Image src="/headshot.jpg" alt="Max Wexley" fill className="object-cover" sizes="112px" />
        </div>
        <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">
          Let&apos;s Talk
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Your business runs on more noise than it thinks.
        </h2>
        <p className="text-white/50 text-base mb-8">
          The audit is where clarity starts. No pitch deck — just a real look at what AI could
          actually do for your team.
        </p>
        <div className="flex gap-3 flex-wrap justify-center">
          <a
            href="/audit"
            className="bg-gradient-to-r from-gold to-[#e9d9a8] text-navy font-semibold text-sm px-6 py-3 rounded-full hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(200,168,75,0.25)] transition-all"
          >
            Get your free AI Snapshot
          </a>
          <a
            href="https://calendly.com/maxwexley-wexadvisory/free-strategy-call"
            className="border border-white/20 text-white/90 font-medium text-sm px-6 py-3 rounded-full hover:border-white/40 hover:bg-white/[0.04] transition-all"
          >
            Book a strategy call
          </a>
        </div>
      </div>
    </section>
  );
}
