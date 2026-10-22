import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import Eyebrow from "@/components/design-system/Eyebrow";
import { PrimaryCta, SecondaryCta } from "@/components/design-system/Cta";

// The page the QR code on the hand-written restaurant letters opens (Upper West Side, 2026-10-21).
// The QR points here, not at Tella, so the video can be re-recorded or moved without reprinting
// letters: swap VIDEO_EMBED and nothing else changes. Indexed and in the sitemap since 2026-10-21
// (Max's call: no real downside, and search visitors are extra leads).
const PAGE_URL = "https://www.wexadvisory.com/invoice-check";
const VIDEO_EMBED = "https://www.tella.tv/video/supplier-price-check-90-second-demo-hxa77atg/embed";
const TITLE = "Free supplier invoice check for restaurants | Wex Advisory";
const DESCRIPTION =
  "Send 4 weeks of supplier invoices and get a 2-page report: what went up, what it cost you, invoices billed twice, and where the same item is cheaper from a supplier you already use. Free.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "Wex Advisory",
    type: "website",
    images: [{ url: "/api/og", width: 1200, height: 630, alt: TITLE }],
  },
};

const FINDS = [
  { h: "What went up", p: "Every item whose price rose, and how much more you've paid because of it." },
  { h: "Cheaper at a supplier you already use", p: "The same item for less from someone already on your invoices, in dollars a month." },
  { h: "Billed twice and extra fees", p: "Invoices entered twice, and surcharges that crept onto your deliveries." },
];

const STEPS = [
  { n: "1", h: "Send 4 weeks of invoices", p: "Every supplier. PDFs or phone photos are fine." },
  { n: "2", h: "I check every line", p: "Each invoice has to add up. Anything that doesn't is set aside, never guessed." },
  { n: "3", h: "You get a 2-page report", p: "With what to do about each finding. It's free, and you keep it either way." },
];

export default function InvoiceCheckPage() {
  return (
    <>
      <Nav />
      <main className="bg-[#0A1226]">
        <section className="pt-32 md:pt-40 pb-14 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-6">Free for restaurants · Upper West Side</p>
            <h1 className="font-display text-[#f5f5f2] font-bold leading-[1.08] tracking-[-0.01em] text-[clamp(2.2rem,6vw,4rem)] mb-6 text-balance">
              See what your suppliers
              <br />
              <span className="bg-gradient-to-r from-gold to-[#e9d9a8] bg-clip-text text-transparent">changed this month.</span>
            </h1>
            <p className="text-white/80 text-lg leading-relaxed max-w-2xl mx-auto">
              I read your supplier invoices line by line and send you a 2-page report on what you&apos;re paying more for, and where the same item is cheaper.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mt-10">
            <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]" style={{ aspectRatio: "16 / 9" }}>
              <iframe
                src={VIDEO_EMBED}
                title="Supplier Price Check demo"
                className="absolute inset-0 h-full w-full"
                allow="autoplay; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
            <p className="text-white/55 text-sm text-center mt-3">A 1.5-minute demo on a sample restaurant&apos;s invoices.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
            <PrimaryCta href="#start">Get my free invoice check</PrimaryCta>
            <SecondaryCta href="mailto:max@wexadvisory.com?subject=Free%20invoice%20check" className="text-base py-3.5">
              Email max@wexadvisory.com
            </SecondaryCta>
          </div>
          <p className="text-white/60 text-sm text-center mt-4">Free · photos are fine · you keep the report</p>
        </section>

        <section className="py-20 px-6 border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 text-center text-balance">What the report shows</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {FINDS.map((f) => (
                <div key={f.h} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                  <h3 className="text-white font-semibold text-lg mb-2">{f.h}</h3>
                  <p className="text-white/70 text-[15px] leading-relaxed">{f.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-6 border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 text-center text-balance">How it works</h2>
            <ol className="grid md:grid-cols-3 gap-8">
              {STEPS.map((s) => (
                <li key={s.n} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/50 text-gold font-bold">{s.n}</span>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-1">{s.h}</h3>
                    <p className="text-white/70 text-[15px] leading-relaxed">{s.p}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="start" className="py-24 px-6 border-t border-white/5 scroll-mt-20">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-start">
            <div>
              <Eyebrow>Free, no call needed</Eyebrow>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 text-balance">Get your free invoice check</h2>
              <p className="text-white/75 text-base leading-relaxed mb-4">
                Fill this in and I&apos;ll email you right away. Reply to that email with your last 4 weeks of supplier invoices, and I&apos;ll send your report.
              </p>
              <p className="text-white/60 text-sm leading-relaxed">
                Only I see your invoices. They&apos;re used for your report and nothing else. I&apos;m Max Wexley, and I live on West 94th Street.
              </p>
            </div>
            <div className="bg-white/[0.04] border border-white/10 rounded-2xl backdrop-blur-sm p-6 sm:p-8">
              <ContactForm
                source="invoice-check"
                companyLabel="Restaurant"
                companyPlaceholder="Your restaurant"
                messageLabel="Anything I should know?"
                messagePlaceholder="Which suppliers you use, or the best time to stop by."
                submitLabel="Get my free invoice check →"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
