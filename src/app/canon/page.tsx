import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import Eyebrow from "@/components/design-system/Eyebrow";
import { PrimaryCta, SecondaryCta } from "@/components/design-system/Cta";

// Canon (repo wexadvisory-client-brain) is invite-only: no self-serve signup,
// so this page sells a demo. No price on the page until one is set; the FAQ
// once contradicted the pricing section and that is not happening twice.
const PAGE_URL = "https://www.wexadvisory.com/canon";
const CALENDLY = "https://calendly.com/maxwexley-wexadvisory/30min";
const TITLE = "Canon: answers from your company's own documents | Wex Advisory";
const DESCRIPTION =
  "Canon answers your team's questions from your own documents, with citations. Pin the document that's the source of truth, correct an answer once and it remembers. Hosted and private to your company.";

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

const FEATURES = [
  { h: "Answers with citations", p: "Every answer comes from your documents and shows where it came from, so anyone can check it." },
  { h: "Pin the source of truth", p: "When two documents disagree, pin the one that's right. Canon answers from it first." },
  { h: "Correct it once", p: "Fix a wrong answer and Canon uses your correction the next time someone asks something similar." },
  { h: "Private to your company", p: "Each company's documents and questions are walled off from every other's. Hosted for you, nothing to install." },
];

const STEPS = [
  { n: "1", h: "Upload your documents", p: "Handbooks, SOPs, contracts, product specs. PDF, Word, text or Markdown." },
  { n: "2", h: "Your team asks in plain language", p: "\"What's our refund policy for wholesale?\" gets an answer with the page it came from." },
  { n: "3", h: "It gets better with use", p: "Pins and corrections keep answers right as your documents change." },
];

export default function CanonPage() {
  return (
    <>
      <Nav />
      <main className="bg-[#0A1226]">
        <section className="pt-32 md:pt-40 pb-14 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-6">Canon · by Wex Advisory</p>
            <h1 className="font-display text-[#f5f5f2] font-bold leading-[1.08] tracking-[-0.01em] text-[clamp(2.2rem,6vw,4rem)] mb-6 text-balance">
              Your company&apos;s answers,
              <br />
              <span className="bg-gradient-to-r from-gold to-[#e9d9a8] bg-clip-text text-transparent">from your own documents.</span>
            </h1>
            <p className="text-white/80 text-lg leading-relaxed max-w-2xl mx-auto">
              Stop answering the same questions twice. Canon answers your team from the documents you already have, and shows exactly where each answer came from.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
            <PrimaryCta href="#start">Request a demo</PrimaryCta>
            <SecondaryCta href={CALENDLY} target="_blank" rel="noopener noreferrer" className="text-base py-3.5">
              Book a 30-minute call
            </SecondaryCta>
          </div>
        </section>

        <section className="py-20 px-6 border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 text-center text-balance">What makes it different</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {FEATURES.map((f) => (
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
              <Eyebrow>See it on your documents</Eyebrow>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 text-balance">Request a Canon demo</h2>
              <p className="text-white/75 text-base leading-relaxed mb-4">
                Tell me what your team asks about most. I&apos;ll reply within 24 hours to set up a demo on documents like yours.
              </p>
              <p className="text-white/60 text-sm leading-relaxed">
                Don&apos;t send any documents yet. If you&apos;d rather talk now,{" "}
                <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
                  book a free call
                </a>
                .
              </p>
            </div>
            <div className="bg-white/[0.04] border border-white/10 rounded-2xl backdrop-blur-sm p-6 sm:p-8">
              <ContactForm
                source="canon"
                messageLabel="What does your team ask about most?"
                messagePlaceholder="Our refund rules, onboarding steps, what's in which contract."
                submitLabel="Request a demo →"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
