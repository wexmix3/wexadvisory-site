import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/brand/PageHero";
import Section from "@/components/brand/Section";

export const metadata: Metadata = {
  title: "Privacy Policy | Wex Advisory",
  description: "How Wex Advisory collects, uses, and protects your information.",
  alternates: {
    canonical: "https://www.wexadvisory.com/privacy",
  },
};

export default function PrivacyPolicy() {
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
        <PageHero title="Privacy Policy" proof="Last updated: October 28, 2026" />

        <Section>
          <div className="max-w-[760px] border-b border-ink/10 text-[16px] leading-relaxed [&_section]:border-t [&_section]:border-ink/10 [&_section]:py-7">
          <section>
            <h2 className="mb-3 text-h3 text-ink">1. Information We Collect</h2>
            <p>
              When you submit an inquiry through our contact form, we collect the information you
              provide: your name, company name, email address, and message. We do not collect
              payment information directly; payments are processed by third-party payment processors.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-h3 text-ink">2. How We Use Your Information</h2>
            <p>We use the information you provide to:</p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 marker:text-muted">
              <li>Respond to your inquiry and deliver the requested report or service</li>
              <li>Communicate with you about your engagement</li>
              <li>Send follow-up communications related to your service (with your consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-h3 text-ink">3. Information Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share
              your information with service providers who help us operate our business (such as email
              delivery services), subject to confidentiality obligations.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-h3 text-ink">4. Data Retention</h2>
            <p>
              We retain your contact information for as long as necessary to fulfill the purpose for
              which it was collected, or as required by law. You may request deletion of your
              information at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-h3 text-ink">5. Cookies and Analytics</h2>
            <p>
              This site uses analytics to understand traffic patterns. We also use a visitor
              identification service (Origami) that sets a first-party cookie and records which
              pages are viewed. It may match a visit to a business or a professional contact so we
              can follow up. We do not use advertising cookies. To opt out, block cookies for this
              site or email us and we will delete any visit data tied to you.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-h3 text-ink">6. Your Rights</h2>
            <p>
              You have the right to access, correct, or delete the personal information we hold
              about you. To exercise these rights, contact us at{" "}
              <a href="mailto:max@wexadvisory.com" className="font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
                max@wexadvisory.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-h3 text-ink">7. Contact</h2>
            <p>
              Questions about this policy? Reach us at{" "}
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
