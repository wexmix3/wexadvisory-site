import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import Button from "@/components/brand/Button";
import Card from "@/components/brand/Card";
import Eyebrow from "@/components/brand/Eyebrow";
import Heading from "@/components/brand/Heading";
import PageHero from "@/components/brand/PageHero";
import RevealScope from "@/components/brand/RevealScope";
import Section from "@/components/brand/Section";

// The page the QR code on the hand-written restaurant letters opens (Upper West Side, 2026-10-21).
// The QR points here, not at Tella, so the video can be re-recorded or moved without reprinting
// letters: swap VIDEO_EMBED and nothing else changes. Indexed and in the sitemap since 2026-10-21
// (Max's call: no real downside, and search visitors are extra leads).
// 2026-10-29 brand redesign: PageHero with the video and CTAs in the same
// order as before, finds on the band, steps as a numbered hairline list, the
// form on a card. URL, form source and the ?from=site tag (read inside
// ContactForm) are unchanged.
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
      <main id="main" tabIndex={-1} className="outline-none">
        <RevealScope>
          <PageHero
            align="center"
            eyebrow="Free for restaurants · Upper West Side"
            title={
              <>
                See what your suppliers <br className="hidden sm:inline" />
                changed this month.
              </>
            }
            subhead="I read your supplier invoices line by line and send you a 2-page report on what you're paying more for, and where the same item is cheaper."
          >
            <div className="mx-auto mt-10 max-w-[920px]">
              <div
                className="relative w-full overflow-hidden rounded-[12px] border border-ink/10 bg-ink"
                style={{ aspectRatio: "16 / 9" }}
              >
                <iframe
                  src={VIDEO_EMBED}
                  title="Supplier Price Check demo"
                  className="absolute inset-0 h-full w-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>
              <p className="mt-3 font-mono text-[12.5px] text-muted">A 1.5-minute demo on a sample restaurant&apos;s invoices.</p>
            </div>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="#start" block>
                Get my free invoice check
              </Button>
              <Button href="mailto:max@wexadvisory.com?subject=Free%20invoice%20check" variant="secondary" block>
                Email max@wexadvisory.com
              </Button>
            </div>
            <p className="mt-7 font-mono text-[12.5px] leading-relaxed text-muted">Free · photos are fine · you keep the report</p>
          </PageHero>

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
                  Get your free invoice check
                </Heading>
                <p className="mt-5 text-[17px] leading-relaxed">
                  Fill this in and I&apos;ll email you right away. Reply to that email with your last 4 weeks of supplier invoices, and I&apos;ll send your report.
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">
                  Only I see your invoices. They&apos;re used for your report and nothing else. I&apos;m Max Wexley, and I live on West 94th Street.
                </p>
              </div>
              <Card padding="lg" className="min-w-0">
                <ContactForm
                  source="invoice-check"
                  companyLabel="Restaurant"
                  companyPlaceholder="Your restaurant"
                  messageLabel="Anything I should know?"
                  messagePlaceholder="Which suppliers you use, or the best time to stop by."
                  submitLabel="Get my free invoice check →"
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
