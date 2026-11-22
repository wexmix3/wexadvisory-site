import Card from "@/components/brand/Card";
import Eyebrow from "@/components/brand/Eyebrow";
import Heading from "@/components/brand/Heading";
import NewsletterSignup from "@/components/NewsletterSignup";
import { NEWSLETTER_CADENCE, NEWSLETTER_NAME, NEWSLETTER_PITCH, type SignupSource } from "@/lib/newsletter";

// The signup card placed after blog posts, on /playbooks and under each issue.
export default function NewsletterCard({ source }: { source: Exclude<SignupSource, "site"> }) {
  return (
    <section aria-labelledby={`nl-card-${source}`} className="bg-canvas px-4 pb-4 pt-12 sm:px-8 md:pt-16">
      <Card padding="lg" className="mx-auto max-w-[680px]">
        <Eyebrow className="mb-3">Weekly email</Eyebrow>
        <Heading id={`nl-card-${source}`} size="h2-sm">
          {NEWSLETTER_NAME}
        </Heading>
        <p className="mt-3 text-[16px] leading-relaxed text-muted">{NEWSLETTER_PITCH}</p>
        <div className="mt-6">
          <NewsletterSignup source={source} />
        </div>
        <p className="mt-3 font-mono text-[12px] text-muted">
          {NEWSLETTER_CADENCE}{" "}
          <a href="/newsletter" className="text-ink underline underline-offset-4">
            See past issues
          </a>
        </p>
      </Card>
    </section>
  );
}
