import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Eyebrow from "@/components/brand/Eyebrow";
import Heading from "@/components/brand/Heading";
import PageHero from "@/components/brand/PageHero";
import RevealScope from "@/components/brand/RevealScope";
import Section from "@/components/brand/Section";
import LandingClose from "@/components/landing/LandingClose";
import LandingFaq from "@/components/landing/LandingFaq";
import StepList from "@/components/landing/StepList";
import TopicRail from "@/components/landing/TopicRail";
import { inlineLink, lede } from "@/components/landing/styles";
import { CALENDLY } from "@/components/brand/links";
import { TEAM_SESSION_HOURS, TEAM_SESSION_USD, TRAINING_HOUR_USD } from "@/lib/solutions";

// 2026-10-29 brand redesign (Phase 2): restyled onto src/components/brand.
// 2026-11-04 (X bookmark B-200): the half-day team session became the default
// way to buy training, and it ends with each person naming what they'd hand to
// AI. That list comes back as a one-page plan, which does the audit's job, so
// the page now books a session instead of pointing everyone at the audit.

const PAGE_URL = "https://www.wexadvisory.com/ai-training-for-small-businesses";
const SESSION = `$${TEAM_SESSION_USD}`;
const HOURLY = `$${TRAINING_HOUR_USD}/hour`;
const DESCRIPTION = `AI training for small business teams: a half-day hands-on session for ${SESSION} that ends with a one-page plan of what to automate first.`;

export const metadata: Metadata = {
  title: "AI Training for Employees | Wex Advisory",
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    title: "AI Training for Employees | Wex Advisory",
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "Wex Advisory",
    type: "website",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "AI Training for Employees | Wex Advisory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Training for Employees | Wex Advisory",
    description: DESCRIPTION,
    images: ["/api/og"],
  }
};

const CATEGORIES: { title: string; desc: string }[] = [
  {
    title: "Tool Walkthroughs",
    desc: "Live sessions on the exact tools and systems already built for your team: how to use them, troubleshoot them, and get the most out of what's already running.",
  },
  {
    title: "AI Literacy Basics",
    desc: "Hands-on sessions for non-technical staff: how to actually use AI day-to-day, not a lecture on what AI is.",
  },
];

const FAQS = [
  {
    q: "What does AI training for employees cover?",
    a: "It depends on what your team runs. Sessions are either a live walkthrough of tools already built for your team, or a hands-on AI literacy session that teaches non-technical staff how to use AI day to day. Every session is built around your actual stack, not a generic curriculum.",
  },
  {
    q: "Do our employees need a technical background?",
    a: "No. The AI literacy sessions are built for non-technical staff. They work through real tasks on the tools they already use, not a lecture on what AI is.",
  },
  {
    q: "How much does AI training for employees cost?",
    a: `Most teams book a half-day session: ${SESSION} for ${TEAM_SESSION_HOURS} hours. Shorter or longer sessions are ${HOURLY}. There's no per-seat fee.`,
  },
  {
    q: "What do employees keep after the session?",
    a: "Docs and a recording of the session, plus a one-page plan. Before the session ends, each person names the tasks they'd hand to AI tomorrow. You get that list back as a plan: what to automate first, what it would cost, and what your team can do on its own.",
  },
  {
    q: "Do we have to buy anything after the training?",
    a: "No. The plan is yours to use however you like. If you want something on it built, it starts like every other solution: free for 30 days on your real data, with the price in writing on day one.",
  },
  {
    q: "How is training different from consulting?",
    a: "Consulting is me building the thing and handing it over: an automation, a system, a website. Training is teaching your team to run the tools themselves. Most clients end up using a mix of both.",
  },
];

const jsonLdService = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI Training for Employees",
  alternateName: "AI Training for Small Businesses",
  serviceType: "AI training for employees",
  url: PAGE_URL,
  description: DESCRIPTION,
  // Reference the sitewide ProfessionalService (layout.tsx) instead of
  // re-declaring it, so the org and founder appear once per page.
  provider: { "@id": "https://www.wexadvisory.com/#organization" },
  areaServed: [
    { "@type": "City", name: "New York" },
    { "@type": "Country", name: "United States" },
  ],
};

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function AITrainingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <RevealScope>
          <PageHero
            eyebrow="AI Training"
            title="AI training for employees, taught on the tools they actually use"
            subhead={
              <p>
                Most AI training for employees is a generic webinar that doesn&apos;t map to how your team works. I run
                live, hands-on sessions scoped to your real stack, so your team walks out able to use it, not just
                having watched a demo.
              </p>
            }
            primary={{ href: CALENDLY, label: "Book a team session →", external: true }}
            secondary={{ href: "/audit", label: "Get My Free AI Audit" }}
          />

          {/* Categories */}
          <Section divider>
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
              <div>
                <Eyebrow>What I Teach</Eyebrow>
                <Heading reveal>Two formats of AI training for employees</Heading>
              </div>
              <p className={`max-w-md ${lede}`}>
                No generic curriculum. Every session is built around what your team actually runs, and it works for
                staff who have never used AI at work before.
              </p>
            </div>
            <TopicRail
              label="Two formats of AI training"
              items={CATEGORIES.map((c) => ({ title: c.title, body: c.desc }))}
            />
          </Section>

          {/* Process */}
          <Section tone="band">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
              <div>
                <Eyebrow>How It Works</Eyebrow>
                <Heading reveal>How AI training for employees works</Heading>
              </div>
              <StepList
                steps={[
                  {
                    title: "Book a half-day",
                    body: `${SESSION} for ${TEAM_SESSION_HOURS} hours, built around your team and your stack. No generic curriculum, no per-seat fees.`,
                  },
                  {
                    title: "Live, hands-on workshop",
                    body: "In-person or virtual, working through real tasks on the actual tools you use, not a slide deck.",
                  },
                  {
                    title: "Everyone names what they'd hand to AI",
                    body: "Before the session ends, each person lists the tasks they'd stop doing by hand tomorrow if they could.",
                  },
                  {
                    title: "Your plan + recording",
                    body: "That list comes back as a one-page plan: what to automate first, what it would cost, and what your team can do on its own. Plus the recording and docs.",
                  },
                ]}
              />
            </div>
          </Section>

          <LandingFaq
            title="Questions about AI training for employees"
            items={FAQS}
            note={
              <>
                Rather have the tools built for you? Start with a{" "}
                <a href="/audit" className={inlineLink}>
                  free AI audit
                </a>
                , or see how I work as an{" "}
                <a href="/ai-consulting-for-small-businesses" className={inlineLink}>
                  AI consultant for small business
                </a>
                .
              </>
            }
          />

          <LandingClose
            heading="Ready to get your team trained on AI?"
            subheading={`A half-day session is ${SESSION}, scoped to your actual stack, and ends with a plan of what to automate first.`}
          />
        </RevealScope>
      </main>
      <Footer />
    </>
  );
}
