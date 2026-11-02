import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { PRODUCTS, ProductList } from "@/components/ProductsSection";
import { SolutionRows, SOLUTIONS } from "@/components/SolutionsSection";
import SolutionsForm from "@/components/SolutionsForm";
import Button from "@/components/brand/Button";
import Card from "@/components/brand/Card";
import CoverShelf from "@/components/brand/CoverShelf";
import CtaBand from "@/components/brand/CtaBand";
import DataTable from "@/components/brand/DataTable";
import Eyebrow from "@/components/brand/Eyebrow";
import Heading from "@/components/brand/Heading";
import PageHero from "@/components/brand/PageHero";
import RevealScope from "@/components/brand/RevealScope";
import Section from "@/components/brand/Section";
import { CALENDLY } from "@/components/brand/links";
import { inlineLink, lede } from "@/components/landing/styles";
import { serializeJsonLd } from "@/lib/json-ld";
import {
  EXTRA_HOUR_USD,
  MIN_TERM_MONTHS,
  MONTHLY_FEE_USD,
  MONTHLY_INCLUDED_HOURS,
  SETUP_FEE_USD,
  TRAINING_HOUR_USD,
  TRIAL_DAYS,
} from "@/lib/solutions";

// /solutions (2026-11-02): the site sells problems solved, not tools, and
// publishes the one plan every headline solution runs on. Replaces /products
// (301 in next.config.mjs); the covers shelf from /products lives on in
// "Start free". Pricing wording follows the canonical copy in the aios
// worksheet state/worksheets/solutions-pricing-2026-11-02.md. Never write
// "retainer", "fixed fee", "billed hourly" or "as needed".

const PAGE_URL = "https://www.wexadvisory.com/solutions";
const TITLE = "Solutions and pricing | Wex Advisory";
const DESCRIPTION = `Five problems I fix for growing businesses. Each runs free for ${TRIAL_DAYS} days on your real data, then $${SETUP_FEE_USD.toLocaleString("en-US")} setup and $${MONTHLY_FEE_USD} a month. The checks are free.`;

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
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/api/og"],
  },
};

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

const PRICING_ROWS = [
  {
    step: "Free AI Audit",
    price: "Free",
    detail: "Shows where AI would save you money, before you spend any.",
  },
  {
    step: `${TRIAL_DAYS}-day trial`,
    price: "Free",
    detail: `Runs on your real data. The price and the day-${TRIAL_DAYS} date are in writing on day one. Setup work during the trial is free.`,
  },
  {
    step: "Setup",
    price: usd(SETUP_FEE_USD),
    detail: "Only if you keep it. Half at signing, half at go-live.",
  },
  {
    step: "Monthly",
    price: usd(MONTHLY_FEE_USD),
    detail: `Founding price. Covers upkeep and up to ${MONTHLY_INCLUDED_HOURS} hours of changes a month.`,
  },
  {
    step: "Extra hours",
    price: `${usd(EXTRA_HOUR_USD)} an hour`,
    detail: `Changes beyond the ${MONTHLY_INCLUDED_HOURS} included hours.`,
  },
  {
    step: "Minimum",
    price: `${MIN_TERM_MONTHS} months`,
    detail: "Then month to month.",
  },
  {
    step: "Custom builds",
    price: "Fixed price",
    detail: "One price, quoted before work starts. Never billed hour by hour.",
  },
  {
    step: "Training",
    price: `${usd(TRAINING_HOUR_USD)} an hour`,
    detail: "Live sessions for your team, on the tools it uses.",
  },
];

// "Start free": the free entry points plus the $299 report, in shelf order.
const START_FREE = ["audit", "invoice-check", "card-fee-check", "competitor-analysis"].map(
  (id) => PRODUCTS.find((p) => p.id === id)!
);

// Structured data: a Service with the plan as an OfferCatalog. Prices are
// exactly the published ones. Deliberately no Product schema (Google flagged
// merchant-listing errors on a Product before).
const jsonLdService = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Wex Advisory solutions",
  serviceType: "AI automation for growing businesses",
  url: PAGE_URL,
  description: DESCRIPTION,
  provider: { "@id": "https://www.wexadvisory.com/#organization" },
  areaServed: [
    { "@type": "City", name: "New York" },
    { "@type": "Country", name: "United States" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Solutions plan",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Free AI Audit",
        url: "https://www.wexadvisory.com/audit",
        price: 0,
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        name: "Setup",
        description: `One-time setup, due only if you keep the solution after the free ${TRIAL_DAYS}-day trial. Half at signing, half at go-live.`,
        price: SETUP_FEE_USD,
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        name: "Monthly plan",
        description: `Founding price. Covers upkeep and up to ${MONTHLY_INCLUDED_HOURS} hours of changes a month. ${MIN_TERM_MONTHS}-month minimum, then month to month.`,
        price: MONTHLY_FEE_USD,
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: MONTHLY_FEE_USD,
          priceCurrency: "USD",
          unitText: "MONTH",
        },
      },
    ],
  },
};

export default function SolutionsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLdService) }} />
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <RevealScope>
          <PageHero
            eyebrow="Solutions"
            title="Pick the problem. I build the fix and keep it running."
            subhead={`Every solution runs free for ${TRIAL_DAYS} days on your real data. Keep it and it's ${usd(SETUP_FEE_USD)} setup and ${usd(MONTHLY_FEE_USD)} a month, with upkeep and up to ${MONTHLY_INCLUDED_HOURS} hours of changes included.`}
            primary={{ href: "/audit", label: "Get the free AI audit" }}
            secondary={{ href: CALENDLY, label: "Book a 30-minute call", external: true }}
          >
            <nav aria-label="The five solutions" className="mt-12 max-w-[860px]">
              <ol className="grid border-t border-ink/10 sm:grid-cols-2">
                {SOLUTIONS.map((s) => (
                  <li key={s.id} className="border-b border-ink/10">
                    <a
                      href={`#${s.id}`}
                      className="flex min-h-11 items-baseline gap-3 py-2.5 text-[15px] font-semibold text-ink underline-offset-4 hover:underline"
                    >
                      <span className="font-mono text-[12px] font-normal text-muted">{s.num}</span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </PageHero>

          <Section id="solutions" divider aria-labelledby="solutions-title">
            <Eyebrow>Five solutions</Eyebrow>
            <Heading id="solutions-title" reveal className="max-w-[760px]">
              Five problems, one plan.
            </Heading>
            <p className={`mt-4 max-w-[680px] ${lede}`}>
              The first four run on the plan below. The fifth is a free check.
            </p>
            <SolutionRows />

            <div className="mt-12 grid gap-4 md:grid-cols-2">
              <Card padding="lg" className="flex flex-col">
                <Eyebrow>Something else?</Eyebrow>
                <h3 className="text-h3 text-ink">Tell me the problem.</h3>
                <p className="mb-6 mt-3 text-[16px] leading-relaxed">
                  One fixed price, quoted before work starts. Never billed hour by hour.
                </p>
                <div className="mt-auto">
                  <Button
                    href="/solutions?topic=something-else#start"
                    data-topic="something-else"
                    variant="secondary"
                    size="sm"
                  >
                    Describe the problem →
                  </Button>
                </div>
              </Card>
              <Card padding="lg" className="flex flex-col">
                <Eyebrow>Add-on</Eyebrow>
                <h3 className="text-h3 text-ink">Team answers</h3>
                <p className="mt-3 text-[16px] leading-relaxed">
                  Your team asks a question in plain language and gets the answer from your own documents, with the
                  page it came from. Same plan price as the solutions above.
                </p>
                <p className="mb-6 mt-3 font-mono text-[12.5px] leading-relaxed text-muted">
                  What&apos;s inside: Canon · your handbooks, SOPs and contracts
                </p>
                <div className="mt-auto">
                  <Button href="/canon" variant="secondary" size="sm">
                    See how it works →
                  </Button>
                </div>
              </Card>
            </div>
          </Section>

          <Section id="pricing" tone="band" aria-labelledby="pricing-title">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start lg:gap-16">
              <div>
                <Eyebrow>Pricing</Eyebrow>
                <Heading id="pricing-title" reveal>
                  How pricing works
                </Heading>
                <p className={`mt-6 ${lede}`}>
                  One plan for every solution above. You see it working on your own data before you pay anything, and
                  the price is in writing on day one.
                </p>
              </div>
              <DataTable
                caption="How pricing works"
                columns={[
                  { key: "step", label: "Step", rowHeader: true },
                  { key: "price", label: "Price", align: "right", strong: true },
                  { key: "detail", label: "Details" },
                ]}
                rows={PRICING_ROWS.map((r) => ({
                  ...r,
                  // Keep "$150 an hour" on one line from sm up; phones wrap to fit.
                  price: <span className="sm:whitespace-nowrap">{r.price}</span>,
                }))}
              />
            </div>
          </Section>

          <Section id="start-free" divider aria-labelledby="start-free-title">
            <Eyebrow>Start free</Eyebrow>
            <Heading id="start-free-title" reveal className="max-w-[760px]">
              Not ready for a trial? Start with a free check.
            </Heading>
            <p className={`mb-12 mt-4 max-w-[680px] ${lede}`}>
              Three are free. The competitor report is $299 and ready in about a minute.
            </p>
            <CoverShelf ids={["audit", "invoice", "card-fee", "competitor"]} label="Ways to start" />
            <div className="mt-12">
              <ProductList items={START_FREE} headingLevel="h3" />
            </div>
          </Section>

          <Section id="start" divider>
            <div className="grid items-start gap-10 md:grid-cols-2 md:gap-14">
              <div>
                <Eyebrow>Start here</Eyebrow>
                <Heading size="h2-sm" reveal>
                  Tell me which problem costs you most
                </Heading>
                <p className={`mt-5 ${lede}`}>
                  I read every message myself and reply within 24 hours with whether a free trial makes sense and what
                  it would run on.
                </p>
                <p className="mt-4 text-[15.5px] leading-relaxed text-muted">
                  Rather talk it through?{" "}
                  <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className={inlineLink}>
                    Book a 30-minute call
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                  .
                </p>
              </div>
              <Card padding="lg">
                <SolutionsForm />
              </Card>
            </div>
          </Section>

          <CtaBand
            title="Not sure which one fits? The free AI Audit will tell you."
            primary={{ href: "/audit", label: "Get the free AI audit" }}
            secondary={{ href: CALENDLY, label: "Or book a 30-minute call →", external: true }}
          />
        </RevealScope>
      </main>
      <Footer />
    </>
  );
}
