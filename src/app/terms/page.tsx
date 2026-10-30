import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/brand/PageHero";
import Section from "@/components/brand/Section";

export const metadata: Metadata = {
  title: "Terms of Service | Wex Advisory",
  description: "Terms and conditions for Wex Advisory services.",
  alternates: {
    canonical: "https://www.wexadvisory.com/terms",
  },
};

export default function TermsOfService() {
  // 2026-10-29 brand redesign: the site Nav and Footer, a back link, PageHero
  // with the date as its mono proof line, then the numbered sections in a
  // 760px column under the hero, split by hairlines. Wording unchanged.
  return (
    <>
      <Nav />
      <main>
        <div className="bg-canvas px-4 pt-8 sm:px-8">
          <div className="mx-auto max-w-[1180px]">
            <a
              href="/"
              className="font-mono text-[12.5px] text-muted underline-offset-4 hover:text-ink hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              ← Back to Wex Advisory
            </a>
          </div>
        </div>
        <PageHero title="Terms of Service" proof="Last updated: May 6, 2025" />

        <Section>
          <div className="max-w-[760px] border-b border-ink/10 text-[16px] leading-relaxed [&_section]:border-t [&_section]:border-ink/10 [&_section]:py-7">
          <section>
            <h2 className="mb-3 text-h3 text-ink">1. Services</h2>
            <p>
              Wex Advisory provides competitive intelligence reports and related advisory services
              to businesses. The scope, deliverables, and fees for each engagement are agreed upon
              prior to commencement of work.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-h3 text-ink">2. Payment</h2>
            <p>
              Payment is due prior to delivery of reports unless otherwise agreed in writing.
              All fees are stated in US dollars. We reserve the right to update our pricing at any
              time; pricing changes will not affect confirmed engagements.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-h3 text-ink">3. Refund Policy</h2>
            <p>
              Because each report requires significant research and analysis time, we do not offer
              refunds after delivery. If you have concerns about the deliverable, contact us within
              48 hours of receipt and we will work to address them. If you have questions about scope
              before ordering, please contact us first.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-h3 text-ink">4. Confidentiality</h2>
            <p>
              All information you provide, including your company name, competitive context, and
              business details, is kept strictly confidential. We do not share client information
              with third parties.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-h3 text-ink">5. Intellectual Property</h2>
            <p>
              Upon full payment, you receive a non-exclusive license to use the report for your
              internal business purposes. Reports may not be resold or redistributed without written
              permission.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-h3 text-ink">6. Accuracy of Information</h2>
            <p>
              Reports are based on publicly available data and third-party data sources. While we
              strive for accuracy, we do not guarantee that all data is complete or error-free.
              Reports reflect conditions at the time of research and should not be construed as
              legal, financial, or investment advice.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-h3 text-ink">7. Limitation of Liability</h2>
            <p>
              Wex Advisory&apos;s liability for any claim arising from a service engagement is limited
              to the fees paid for that engagement. We are not liable for indirect, consequential, or
              incidental damages.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-h3 text-ink">8. Governing Law</h2>
            <p>
              These terms are governed by the laws of the State of New York. Any disputes will be
              resolved in the courts of New York County.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-h3 text-ink">9. Contact</h2>
            <p>
              Questions about these terms? Reach us at{" "}
              <a href="mailto:max@wexadvisory.com" className="font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
                max@wexadvisory.com
              </a>
              .
            </p>
          </section>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
