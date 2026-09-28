import type { Metadata } from "next";
import { FileSearch, Inbox, Clock, BarChart3, LayoutDashboard, ShieldCheck } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import AboutFounder from "@/components/AboutFounder";
import ServiceCTA from "@/components/ServiceCTA";
import { PrimaryCta } from "@/components/design-system/Cta";

const PAGE_URL = "https://www.wexadvisory.com/ai-for-law-firms";

const DESCRIPTION =
  "AI for law firms: search your own documents with cited answers, never lose an intake email, and see billing numbers without building the report by hand.";

export const metadata: Metadata = {
  title: "AI for Law Firms | Wex Advisory",
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    title: "AI for Law Firms | Wex Advisory",
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "Wex Advisory",
    type: "website",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "AI for Law Firms | Wex Advisory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI for Law Firms | Wex Advisory",
    description: DESCRIPTION,
    images: ["/api/og"],
  }
};

const SIGNS = [
  { icon: FileSearch, text: "Finding the clause you drafted last year means digging through folders and old matters" },
  { icon: Inbox, text: "A prospective client's intake email sits unanswered for days because nobody owns the inbox" },
  { icon: Clock, text: "Month-end billing and collections numbers get pieced together in a spreadsheet by hand" },
];

const BUILT = [
  {
    icon: FileSearch,
    title: "Search your own documents, with citations",
    body: "Ask a question in plain English and get an answer drawn only from your firm's documents: templates, engagement letters, policies, past work product. Every answer cites the file it came from, so a lawyer can check the source in one click.",
  },
  {
    icon: Inbox,
    title: "Intake and inbox follow-up",
    body: "Threads left unanswered for three days get flagged. A reply is drafted and waits in a queue, and nothing is sent until a person approves it. Approving it sends a normal threaded email from your own account.",
  },
  {
    icon: LayoutDashboard,
    title: "A daily priority list",
    body: "One list of what needs attention today, delivered by email each morning, built from your inbox and calendar. Every item links back to the real email or event it came from.",
  },
  {
    icon: BarChart3,
    title: "Billing and financial reporting",
    body: "A live dashboard fed from the exports your accounting or practice management system already produces, with month-over-month variance flags and a plain-English summary of what changed.",
  },
];

const PROOF = [
  {
    client: "RECO",
    text: "Priority action queue with approve-to-send Gmail replies, agents that flag threads unanswered for 3+ days, and a daily priority digest. Every finding must cite a real email thread or event, and a second model checks it before it reaches the queue.",
  },
  {
    client: "25N Coworking",
    text: "Live financial dashboard across 5 locations, fed daily from the accounting system's own GL exports, with a rules-based check that flags problem entries before the close and a month-end packet per location.",
  },
  {
    client: "Canon",
    text: "My private document search product. Each client's documents sit in their own isolated workspace, and answers are grounded in those documents with citations.",
  },
];

const FAQS = [
  {
    q: "What can AI actually do for a small law firm?",
    a: "The biggest wins are usually not legal research. They're the hours lost to finding documents the firm already has, following up on intake, and building billing reports. AI can answer questions from your own files with citations, make sure no prospective client waits days for a reply, and turn accounting exports into a dashboard you read in a minute.",
  },
  {
    q: "Have you built this for a law firm?",
    a: "Not yet. Every system on this page runs in production today for clients in other industries: the inbox queue and daily digest for RECO, the financial dashboard for 25N Coworking, and document search in Canon, my own product. A law firm build uses the same pieces, pointed at your documents and your inbox.",
  },
  {
    q: "What about client confidentiality?",
    a: "Your documents sit in a workspace of their own, and access is limited to named logins. Nothing is sent to a client or opposing counsel without a person approving it. The ABA's Formal Opinion 512 (2024) asks lawyers who use generative AI to understand the tool, protect client confidences and review its output. The builds are designed around that: answers cite their source, and a person approves anything that leaves the firm.",
  },
  {
    q: "Will AI give legal advice or replace our associates?",
    a: "No. These systems find, draft and organize. A lawyer reviews and decides. The point is to give your team back the hours spent searching folders and chasing emails.",
  },
  {
    q: "Where should a law firm start with AI?",
    a: "Start with the free AI audit. It scores your firm on five areas and ranks automation ideas by estimated annual savings, so you know where the biggest opportunity is before you spend anything.",
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

const jsonLdService = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI for Law Firms",
  serviceType: "AI automation for small and mid-size law firms",
  url: PAGE_URL,
  description:
    "Private document search with citations, intake and inbox follow-up with human approval, a daily priority digest, and billing dashboards for law firms.",
  audience: { "@type": "BusinessAudience", audienceType: "Law firms and legal practices" },
  provider: { "@id": "https://www.wexadvisory.com/#organization" },
  areaServed: [
    { "@type": "City", name: "New York" },
    { "@type": "Country", name: "United States" },
  ],
};

export default function AIForLawFirmsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      <Nav />
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-navy py-24 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">AI for Law Firms</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              AI for law firms:{" "}
              <span className="text-gold">less time searching, chasing and reconciling</span>
            </h1>
            <p className="text-white/65 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              I build AI systems for small firms that sit on top of the tools you already use. Ask your
              own documents a question and get a cited answer, never lose an intake email, and see the
              billing numbers without building the report.
            </p>
            <PrimaryCta href="/audit">Get My Free AI Audit →</PrimaryCta>
          </div>
        </section>

        {/* Signs */}
        <ScrollReveal variant="up">
        <section className="bg-[#0a1a30] py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">Sound Familiar?</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">
              Where small firms lose the most time
            </h2>
            <div className="space-y-5">
              {SIGNS.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-gold" strokeWidth={1.5} />
                  </div>
                  <p className="text-white/70 text-base leading-relaxed pt-2">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        </ScrollReveal>

        {/* What gets built */}
        <ScrollReveal variant="left">
        <section className="bg-navy py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">What Gets Built</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              What AI for law firms looks like in practice
            </h2>
            <p className="text-white/65 text-base leading-relaxed mb-10">
              None of this replaces your practice management software or your lawyers&apos; judgment. It
              takes over the searching, the follow-up and the report building, and it shows its sources
              so the work can be checked.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {BUILT.map(({ icon: Icon, title, body }) => (
                <div key={title} className="bg-white/[0.04] rounded-2xl p-8">
                  <div className="text-gold mb-5">
                    <Icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-3">{title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        </ScrollReveal>

        {/* Proof */}
        <ScrollReveal variant="up-lg">
        <section className="bg-[#0a1a30] py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">Already Running</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              The same systems, live today
            </h2>
            <p className="text-white/65 text-base leading-relaxed mb-10">
              I haven&apos;t done a law firm engagement yet. Each piece above runs in production for a
              client in another industry, and a firm build starts from these.
            </p>
            <div className="space-y-4">
              {PROOF.map((p) => (
                <div key={p.client} className="border border-white/10 rounded-xl px-6 py-5">
                  <p className="text-gold text-xs font-bold tracking-widest uppercase mb-2">{p.client}</p>
                  <p className="text-white/60 text-sm leading-relaxed">{p.text}</p>
                </div>
              ))}
            </div>
            <p className="text-white/40 text-sm mt-8">
              <a href="/work" className="text-gold hover:underline">
                Read the full RECO and 25N case studies →
              </a>
            </p>
          </div>
        </section>
        </ScrollReveal>

        {/* How I help */}
        <ScrollReveal variant="right">
        <section className="bg-navy py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">How I Help</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">
              Start with a free audit, then a scoped build
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/[0.04] rounded-2xl p-8">
                <div className="text-gold mb-5">
                  <BarChart3 className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Free AI Audit</h3>
                <p className="text-white/40 text-xs mb-4">Free · Delivered in minutes</p>
                <p className="text-white/60 text-sm leading-relaxed mb-5">
                  For when you know admin work eats your team&apos;s week but don&apos;t yet know what to
                  automate first.
                </p>
                <a href="/audit" className="text-gold text-sm font-semibold hover:underline">
                  Get your free AI audit →
                </a>
              </div>
              <div className="bg-white/[0.04] rounded-2xl p-8">
                <div className="text-gold mb-5">
                  <ShieldCheck className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Scoped Firm Build</h3>
                <p className="text-white/40 text-xs mb-4">Scoped to your firm · Priced per project</p>
                <p className="text-white/60 text-sm leading-relaxed mb-5">
                  For when one job, like document search or intake follow-up, is clearly costing hours
                  every week.
                </p>
                <a href="/work" className="text-gold text-sm font-semibold hover:underline">
                  See client work →
                </a>
              </div>
            </div>
            <p className="text-white/40 text-sm mt-8 leading-relaxed">
              Want to talk it through first? See how I work as an{" "}
              <a href="/ai-consulting-for-small-businesses" className="text-gold hover:underline">
                AI consultant for small business
              </a>
              , or read about{" "}
              <a href="/ai-training-for-small-businesses" className="text-gold hover:underline">
                AI training for employees
              </a>
              .
            </p>
          </div>
        </section>
        </ScrollReveal>

        {/* FAQ */}
        <ScrollReveal variant="fade">
        <section className="bg-[#0a1a30] py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">Questions about AI for law firms</h2>
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
        </ScrollReveal>

        <AboutFounder />
        <ServiceCTA
          heading="See where your firm is losing hours"
          subheading="Free AI Audit. Quantified savings opportunities, no credit card, no signup."
        />
      </main>
      <Footer />
    </>
  );
}
