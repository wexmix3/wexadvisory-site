import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import Button from "@/components/brand/Button";
import Card from "@/components/brand/Card";
import Eyebrow from "@/components/brand/Eyebrow";
import Heading from "@/components/brand/Heading";
import PageHero from "@/components/brand/PageHero";
import ProductWindow from "@/components/brand/ProductWindow";
import RevealScope from "@/components/brand/RevealScope";
import Section from "@/components/brand/Section";

// Request page for Card Fee Check (built 2026-10-26, local tool). Max runs each
// request through the tool himself, so this page collects requests only: no
// public upload of statements.
// Live 2026-10-27 by Max's call, before the 5-real-statements test, so the copy
// promises what the tool does (reads, reconciles, explains), never a savings
// figure. The sample report (added 2026-10-27) is the tool's own output on
// built-in sample E3, labeled "Sample data"; no real business is in it.
// 2026-10-29 brand redesign: PageHero, the sample page in a ProductWindow,
// finds on the band, steps as a numbered hairline list, the form on a card.
// URL, form source, field labels and the sample links are unchanged (QR codes
// on printed letters point here).
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
      <main id="main" tabIndex={-1} className="outline-none">
        <RevealScope>
          <PageHero
            align="center"
            eyebrow="Free for storefronts · any processor"
            title={
              <>
                See what you really pay <br className="hidden sm:inline" />
                to take cards.
              </>
            }
            subhead="Card processing statements are built to be hard to read. I read yours line by line and tell you, in plain English, whether your rate is fair."
            primary={{ href: "#start", label: "Check my card fees" }}
            secondary={{ href: "#sample", label: "See a sample report" }}
            proof="Free · photos are fine · I sell no processing"
          />

          <Section id="sample" divider aria-labelledby="sample-heading">
            <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-14">
              <div className="min-w-0">
                <Eyebrow>Sample report</Eyebrow>
                <Heading id="sample-heading" size="h2-sm" reveal>
                  What you get back
                </Heading>
                <p className="mt-5 text-[17px] leading-relaxed">
                  This is a real report from the check, run on 3 months of sample statements for a deli. It found about $5,500 a year above a fair price, $899 of it in two printed fees, and wrote the letter to send the processor.
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">
                  The full report adds every statement line, what each fee is, and where it was printed. Sample data, not a real business.
                </p>
                <Button href={SAMPLE_PDF} external variant="secondary" block className="mt-8">
                  Open the full sample (PDF, 6 pages)
                </Button>
              </div>
              <ProductWindow
                title="card-fee-check-sample-report.pdf"
                label="Page 1 of the sample Card Fee Check report"
                icon="sheet"
                className="min-w-0"
              >
                <a
                  href={SAMPLE_PDF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-paper p-3 transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ink sm:p-5"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/card-fee-check-sample-p1.png"
                    alt="Page 1 of a sample Card Fee Check report: overpaying, about $5,500 a year above a fair price"
                    width={1105}
                    height={1430}
                    loading="lazy"
                    className="h-auto w-full rounded-[4px] border border-grid"
                  />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </ProductWindow>
            </div>
          </Section>

          <Section tone="band" aria-labelledby="finds-heading">
            <Heading id="finds-heading" reveal>
              What the report shows
            </Heading>
            <ul className="mt-10 grid gap-4 md:grid-cols-3">
              {FINDS.map((f) => (
                <Card as="li" key={f.h} padding="lg">
                  <h3 className="text-h3 text-ink">{f.h}</h3>
                  <p className="mt-3 text-[15.5px] leading-relaxed">{f.p}</p>
                </Card>
              ))}
            </ul>
          </Section>

          <Section aria-labelledby="how-heading">
            <Heading id="how-heading" reveal>
              How it works
            </Heading>
            <ol className="mt-10 grid border-t border-ink/10 md:grid-cols-3 md:gap-8">
              {STEPS.map((s) => (
                <li key={s.n} className="border-b border-ink/10 py-6 md:border-b-0">
                  <span className="font-mono text-[12px] text-muted">0{s.n}</span>
                  <h3 className="mt-3 text-h3 text-ink">{s.h}</h3>
                  <p className="mt-2 text-[15.5px] leading-relaxed">{s.p}</p>
                </li>
              ))}
            </ol>
          </Section>

          <Section id="start" divider aria-labelledby="start-heading">
            <div className="grid items-start gap-10 md:grid-cols-2 md:gap-14">
              <div className="min-w-0">
                <Eyebrow>Free, no call needed</Eyebrow>
                <Heading id="start-heading" size="h2-sm" reveal>
                  Get your free card fee check
                </Heading>
                <p className="mt-5 text-[17px] leading-relaxed">
                  Fill this in and I&apos;ll email you right away. Reply to that email with your recent statements, and I&apos;ll send your report.
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">
                  I don&apos;t sell card processing and I&apos;m paid nothing if you switch. You can black out account and card numbers; the check doesn&apos;t need them. Only I see your statements.
                </p>
              </div>
              <Card padding="lg" className="min-w-0">
                <ContactForm
                  source="card-fee-check"
                  companyLabel="Business"
                  companyPlaceholder="Your business"
                  messageLabel="Who processes your cards?"
                  messagePlaceholder="Clover, Square, Toast, your bank, or not sure."
                  submitLabel="Get my free card fee check →"
                />
              </Card>
            </div>
          </Section>
        </RevealScope>
      </main>
      <Footer />
    </>
  );
}
