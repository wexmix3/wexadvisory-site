import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import Eyebrow from "@/components/design-system/Eyebrow";
import { PrimaryCta, SecondaryCta } from "@/components/design-system/Cta";

// Request page for Card Fee Check (built 2026-10-26, local tool). Max runs each
// request through the tool himself, so this page collects requests only: no
// public upload of statements.
// Live 2026-10-27 by Max's call, before the 5-real-statements test, so the copy
// promises what the tool does (reads, reconciles, explains), never a savings
// figure. The sample report (added 2026-10-27) is the tool's own output on
// built-in sample E3, labeled "Sample data"; no real business is in it.
const PAGE_URL = "https://www.wexadvisory.com/card-fee-check";
const SAMPLE_PDF = "/card-fee-check-sample-report.pdf";
const TITLE = "Free card processing fee check for small businesses | Wex Advisory";
const DESCRIPTION =
  "Send 1 to 3 months of card processing statements and get a plain-English report: what processing really costs you, which printed fees to question, and whether your rate is fair. Free, and I sell no processing.";

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
  { h: "What processing really costs", p: "Your effective rate, split into what the card networks charge and what your processor adds on top." },
  { h: "Fees to question", p: "Named fees printed on your statement, with the exact dollars. Facts from the page, not estimates." },
  { h: "Fair or not, and what to do", p: "Whether your rate is fair for your volume. If it isn't, a ready letter to send your processor." },
];

const STEPS = [
  { n: "1", h: "Send your statements", p: "1 to 3 recent months, one location, every page. PDFs or phone photos are fine." },
  { n: "2", h: "I check every fee line", p: "The fees have to add up to the statement's own totals. If they don't, I tell you what's missing instead of guessing." },
  { n: "3", h: "You get a short report", p: "Every number points to the page and line it came from. It's free, and you keep it either way." },
];

export default function CardFeeCheckPage() {
  return (
    <>
      <Nav />
      <main className="bg-[#0A1226]">
        <section className="pt-32 md:pt-40 pb-14 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-6">Free for storefronts · any processor</p>
            <h1 className="font-display text-[#f5f5f2] font-bold leading-[1.08] tracking-[-0.01em] text-[clamp(2.2rem,6vw,4rem)] mb-6 text-balance">
              See what you really pay
              <br />
              <span className="bg-gradient-to-r from-gold to-[#e9d9a8] bg-clip-text text-transparent">to take cards.</span>
            </h1>
            <p className="text-white/80 text-lg leading-relaxed max-w-2xl mx-auto">
              Card processing statements are built to be hard to read. I read yours line by line and tell you, in plain English, whether your rate is fair.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
            <PrimaryCta href="#start">Check my card fees</PrimaryCta>
            <SecondaryCta href="#sample" className="text-base py-3.5">
              See a sample report
            </SecondaryCta>
          </div>
          <p className="text-white/60 text-sm text-center mt-4">Free · photos are fine · I sell no processing</p>
        </section>

        <section id="sample" className="py-20 px-6 border-t border-white/5 scroll-mt-20">
          <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_1.1fr] gap-10 md:gap-14 items-center">
            <div>
              <Eyebrow>Sample report</Eyebrow>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 text-balance">What you get back</h2>
              <p className="text-white/75 text-base leading-relaxed mb-4">
                This is a real report from the check, run on 3 months of sample statements for a deli. It found about $5,500 a year above a fair price, $899 of it in two printed fees, and wrote the letter to send the processor.
              </p>
              <p className="text-white/60 text-sm leading-relaxed mb-8">
                The full report adds every statement line, what each fee is, and where it was printed. Sample data, not a real business.
              </p>
              <SecondaryCta href={SAMPLE_PDF} target="_blank" rel="noopener noreferrer" className="text-base py-3.5">
                Open the full sample (PDF, 6 pages)
              </SecondaryCta>
            </div>
            <a href={SAMPLE_PDF} target="_blank" rel="noopener noreferrer" className="block rounded-xl overflow-hidden border border-white/10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] hover:border-gold/40 transition-colors">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/card-fee-check-sample-p1.png"
                alt="Page 1 of a sample Card Fee Check report: overpaying, about $5,500 a year above a fair price"
                width={1105}
                height={1430}
                loading="lazy"
                className="w-full h-auto"
              />
            </a>
          </div>
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
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 text-balance">Get your free card fee check</h2>
              <p className="text-white/75 text-base leading-relaxed mb-4">
                Fill this in and I&apos;ll email you right away. Reply to that email with your recent statements, and I&apos;ll send your report.
              </p>
              <p className="text-white/60 text-sm leading-relaxed">
                I don&apos;t sell card processing and I&apos;m paid nothing if you switch. You can black out account and card numbers; the check doesn&apos;t need them. Only I see your statements.
              </p>
            </div>
            <div className="bg-white/[0.04] border border-white/10 rounded-2xl backdrop-blur-sm p-6 sm:p-8">
              <ContactForm
                source="card-fee-check"
                companyLabel="Business"
                companyPlaceholder="Your business"
                messageLabel="Who processes your cards?"
                messagePlaceholder="Clover, Square, Toast, your bank, or not sure."
                submitLabel="Get my free card fee check →"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
