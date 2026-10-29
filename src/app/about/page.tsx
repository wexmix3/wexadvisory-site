import type { Metadata } from "next";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Button from "@/components/brand/Button";
import Card from "@/components/brand/Card";
import Eyebrow from "@/components/brand/Eyebrow";
import Heading from "@/components/brand/Heading";
import PageHero from "@/components/brand/PageHero";
import RevealScope from "@/components/brand/RevealScope";
import Section from "@/components/brand/Section";
import { CALENDLY, EMAIL, LINKEDIN, X_PROFILE } from "@/components/brand/links";

// Added 2026-10-29 (Tenex teardown): /about was a 404 and the founder copy was
// two sentences. For a one-person firm the founder is the product, so this page
// carries the story. Every build listed is a real system; client facts match
// /work and the homepage case rows, and 25N stays in past tense (ended 10-19).
// Same day, brand redesign: PageHero with the headshot, system cards below.
const PAGE_URL = "https://www.wexadvisory.com/about";
const TITLE = "About Max Wexley | Wex Advisory";
const DESCRIPTION =
  "Max Wexley builds dashboards, reporting and AI agents for owner-led consumer brands. Finance background, New York, and every system built by the person you talk to.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "Wex Advisory",
    type: "profile",
    images: [{ url: "/api/og", width: 1200, height: 630, alt: TITLE }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url: PAGE_URL,
  name: TITLE,
  mainEntity: { "@id": "https://www.wexadvisory.com/#max-wexley" },
};

const BUILDS = [
  {
    h: "RECO's operations dashboard",
    p: "A wholesale + DTC brand run by two founders with no engineers. 119 wholesale accounts and 2,500+ sales leads moved out of a Google Sheet into one dashboard, with a Shopify sync, five automated agents and a daily digest of what needs attention. Still in daily use.",
  },
  {
    h: "A month-end close for five locations",
    p: "For 25N Coworking: a GL check, a finance dashboard and a PDF and Excel packet for every location. The first deliverable, a competitive analysis, shipped 9 hours after kickoff.",
  },
  {
    h: "Tools anyone can start with",
    p: "A free AI Audit, a $299 competitor report, a card fee check and a supplier invoice check. Each one runs on the same pipelines I build for clients.",
  },
];

const PRINCIPLES = [
  {
    h: "You talk to the person who builds it",
    p: "No account manager and no handoff to a junior team. I scope it, build it and support it.",
  },
  {
    h: "The price is written down first",
    p: "$200 an hour to build and $150 an hour for changes after launch. You get a written estimate before any work starts.",
  },
  {
    h: "It runs on your tools and your accounts",
    p: "I build on what you already use and on accounts you own, so nothing stops working if we stop working together.",
  },
  {
    h: "Your team can run it without me",
    p: "Every handoff includes a recorded walkthrough, a written guide and a quarterly refresher.",
  },
];

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <main>
        <RevealScope>
          <PageHero
            eyebrow="About"
            title={<>I&apos;m Max Wexley. I build the systems myself.</>}
            subhead={
              <>
                <p>
                  My background is in finance, and I taught myself to build software. Finance is where most of a
                  business&apos;s hand-built work piles up, so that&apos;s where I started automating.
                </p>
                <p>
                  Wex Advisory is that work, for owner-led consumer brands. A brand&apos;s numbers live in Shopify,
                  Amazon, a wholesale sheet and the books, and almost never in one place. Most brands at this size have
                  no engineers, so the joining-up is done by the founders at night. I build the dashboards, reports and
                  agents that do it for them.
                </p>
                <p>I&apos;m based in New York and studied at the University of Michigan.</p>
              </>
            }
            primary={{ href: CALENDLY, label: "Book a 30-minute call", external: true }}
            secondary={{ href: "/work", label: "See the work" }}
            media={
              <div className="relative aspect-[4/5] w-32 overflow-hidden rounded-[12px] border border-ink/10 md:w-full md:max-w-[280px]">
                <Image
                  src="/headshot.jpg"
                  alt="Max Wexley, founder of Wex Advisory"
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 128px, 280px"
                />
              </div>
            }
          />

          <Section divider>
            <Eyebrow>What I&apos;ve built</Eyebrow>
            <Heading reveal>Systems I&apos;ve built</Heading>
            <ul className="mt-10 grid gap-4 md:grid-cols-3">
              {BUILDS.map((b) => (
                <Card as="li" key={b.h} padding="lg">
                  <h3 className="text-h3 text-ink">{b.h}</h3>
                  <p className="mt-3 text-[15.5px] leading-relaxed">{b.p}</p>
                </Card>
              ))}
            </ul>
          </Section>

          <Section tone="band">
            <Eyebrow>How I work</Eyebrow>
            <Heading reveal>Four things you can hold me to</Heading>
            <ol className="mt-10 grid gap-4 sm:grid-cols-2">
              {PRINCIPLES.map((p, i) => (
                <Card as="li" key={p.h} padding="lg">
                  <span className="font-mono text-[12px] text-muted">0{i + 1}</span>
                  <h3 className="mt-3 text-h3 text-ink">{p.h}</h3>
                  <p className="mt-3 text-[15.5px] leading-relaxed">{p.p}</p>
                </Card>
              ))}
            </ol>
            <div className="mt-8 flex flex-wrap gap-x-6">
              <Button href={LINKEDIN} external variant="quiet">
                LinkedIn →
              </Button>
              <Button href={X_PROFILE} external variant="quiet">
                X →
              </Button>
              <Button href={`mailto:${EMAIL}`} variant="quiet">
                max@wexadvisory.com →
              </Button>
            </div>
          </Section>
        </RevealScope>
      </main>
      <Footer />
    </>
  );
}
