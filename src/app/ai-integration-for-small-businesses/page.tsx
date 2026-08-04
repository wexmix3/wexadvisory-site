import type { Metadata } from "next";
import { Sheet, Mail, Calendar, Receipt, type LucideIcon } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ServiceCTA from "@/components/ServiceCTA";

const PAGE_URL = "https://www.wexadvisory.com/ai-integration-for-small-businesses";

export const metadata: Metadata = {
  title: "AI Integration for Small Businesses | Wex Advisory",
  description:
    "AI integration for small businesses that plugs into the tools you already run — CRM, spreadsheets, scheduling, invoicing — no rip-and-replace, no dev team needed.",
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    title: "AI Integration for Small Businesses | Wex Advisory",
    description:
      "AI integration for small businesses that plugs into the tools you already run — CRM, spreadsheets, scheduling, invoicing — no rip-and-replace, no dev team needed.",
    url: PAGE_URL,
    siteName: "Wex Advisory",
    type: "website",
  },
};

const INTEGRATIONS: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Sheet, title: "Spreadsheets & CRM", desc: "New leads logged and routed without anyone re-typing them." },
  { icon: Mail, title: "Email & Follow-Up", desc: "Personalized sequences that go out on schedule, not when someone remembers." },
  { icon: Calendar, title: "Scheduling", desc: "Appointment flows that skip the back-and-forth entirely." },
  { icon: Receipt, title: "Invoicing", desc: "Payment reminders sent automatically, every time, on time." },
];

const FAQS = [
  {
    q: "Do I have to replace my existing software to use AI with it?",
    a: "No — that's the whole premise. I build the automation to plug into the CRM, spreadsheet, or scheduling tool you already use. Rip-and-replace projects are expensive and risky for a small team; integration isn't.",
  },
  {
    q: "What if my systems don't have an official integration or API?",
    a: "Most small business stacks (spreadsheets, common CRMs, email, calendars) have enough of a connection point to work with. If something genuinely can't be integrated, I'll tell you upfront rather than force a fragile workaround.",
  },
  {
    q: "Who maintains the integration after it's built?",
    a: "You do, with plain-language documentation and a live walkthrough — or I can maintain it under the optional $300/month subscription if you'd rather not think about it again.",
  },
  {
    q: "How long does an integration project take?",
    a: "A single-workflow integration (e.g. lead intake → CRM) usually takes 1–2 weeks from kickoff to handoff. Multi-system projects run 3–4 weeks. You get a timeline before any work starts.",
  },
];

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function AIIntegrationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      <Nav />
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-navy py-24 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">AI Integration</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              AI integration for small businesses —{" "}
              <span className="text-gold">without ripping out what already works</span>
            </h1>
            <p className="text-white/65 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              You don&apos;t need new software. You need the tools you already run — your CRM, your
              spreadsheets, your inbox — to stop needing a human in the loop for repetitive steps.
            </p>
            <a
              href="https://audit.wexadvisory.com/audit"
              className="inline-block bg-gold hover:bg-gold-muted text-navy font-bold text-base px-10 py-4 rounded-xl
                transition-all duration-150 hover:scale-[1.02] hover:shadow-lg hover:shadow-gold/20 active:scale-[0.99]"
            >
              See What Can Be Automated →
            </a>
          </div>
        </section>

        {/* Where it plugs in */}
        <section className="bg-[#0a1a30] py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">Where It Plugs In</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-14">
              Tools you already run, working on their own
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {INTEGRATIONS.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4 bg-white/[0.04] rounded-2xl p-7">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0 text-gold">
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-base mb-1.5">{title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Integration vs replacement */}
        <section className="bg-navy py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">Integration, Not Replacement</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              A rip-and-replace project is the wrong bet for a small team
            </h2>
            <p className="text-white/65 text-base leading-relaxed mb-4">
              Swapping your CRM or your entire back-office stack for something &ldquo;AI-native&rdquo; is
              expensive, disruptive, and usually unnecessary. The team already knows how to use what you
              have — the fix is making the repetitive parts of it automatic, not starting over.
            </p>
            <p className="text-white/65 text-base leading-relaxed">
              Everything I build is designed to sit alongside your existing tools, not replace them — and to
              be maintainable by your team without a developer on staff.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-[#0a1a30] py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">Common questions</h2>
            <div className="space-y-6">
              {FAQS.map((f) => (
                <div key={f.q} className="border-t border-white/[0.08] pt-6 first:border-t-0 first:pt-0">
                  <h3 className="text-white font-semibold text-base mb-2">{f.q}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ServiceCTA
          heading="See what's ready to run on its own"
          subheading="Free AI Snapshot audit — specific automation opportunities, no credit card, no signup."
        />
      </main>
      <Footer />
    </>
  );
}
