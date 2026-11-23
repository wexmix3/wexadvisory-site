import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Card from "@/components/brand/Card";
import Eyebrow from "@/components/brand/Eyebrow";
import Heading from "@/components/brand/Heading";
import PageHero from "@/components/brand/PageHero";
import Section from "@/components/brand/Section";
import Tag from "@/components/brand/Tag";
import NewsletterSignup from "@/components/NewsletterSignup";
import Breadcrumb from "../blog/_components/Breadcrumb";
import { formatPostDate } from "@/lib/blog";
import { NEWSLETTER_CADENCE, NEWSLETTER_NAME, NEWSLETTER_PITCH, getAllIssues } from "@/lib/newsletter";

// Newsletter home (2026-11-17): what each issue holds, the signup, and the
// archive. This page is indexable; the issue pages under it are not.
const PAGE_URL = "https://www.wexadvisory.com/newsletter";
const DESCRIPTION = `${NEWSLETTER_NAME}, the weekly email from Wex Advisory. ${NEWSLETTER_PITCH}`;

export const metadata: Metadata = {
  title: `${NEWSLETTER_NAME}: weekly AI email for small business owners | Wex Advisory`,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
};

const SECTIONS: { title: string; body: string }[] = [
  {
    title: "The big one",
    body: "The week's biggest AI change for small businesses, pieced together from several sources, with a diagram and what to do about it this week.",
  },
  {
    title: "Quick hits",
    body: "The rest of the week's AI news that touches a business like yours, each with one line on what it means for you. Every item links to the original.",
  },
  {
    title: "1 free tool",
    body: "A public GitHub project worth knowing: what it does, who it's for, how hard it is to set up, and whether we've run it ourselves.",
  },
  {
    title: "1 prompt to copy",
    body: "A prompt for a real business task, tested before it goes out, with the output it actually gave.",
  },
];

export default function NewsletterPage() {
  const issues = getAllIssues();

  return (
    <>
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <div className="bg-canvas px-4 pt-8 sm:px-8">
          <Breadcrumb className="mx-auto max-w-[1180px]" items={[{ href: "/", label: "Home" }, { label: "Newsletter" }]} />
        </div>
        <PageHero eyebrow="Weekly email" title={NEWSLETTER_NAME} subhead={NEWSLETTER_PITCH} />

        <Section aria-labelledby="nl-signup">
          <Card padding="lg" className="mx-auto max-w-[680px]">
            <Heading id="nl-signup" size="h2-sm">
              Get it every Tuesday
            </Heading>
            <div className="mt-6">
              <NewsletterSignup source="newsletter-page" />
            </div>
            <p className="mt-3 font-mono text-[12px] text-muted">{NEWSLETTER_CADENCE}</p>
          </Card>
        </Section>

        <Section divider aria-labelledby="nl-inside">
          <Eyebrow>Inside each issue</Eyebrow>
          <Heading id="nl-inside" size="h2-sm">
            Useful, about 5 minutes
          </Heading>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {SECTIONS.map((s) => (
              <li key={s.title}>
                <Card className="h-full">
                  <h3 className="text-h3 text-ink">{s.title}</h3>
                  <p className="mt-2 text-[15.5px] leading-relaxed text-muted">{s.body}</p>
                </Card>
              </li>
            ))}
          </ul>
        </Section>

        {issues.length > 0 && (
          <Section divider aria-labelledby="nl-archive">
            <Eyebrow>Archive</Eyebrow>
            <Heading id="nl-archive" size="h2-sm">
              Past issues
            </Heading>
            <ul className="mt-8 border-t border-ink/10">
              {issues.map((issue) => (
                <li key={issue.slug}>
                  <article className="group relative grid gap-2 border-b border-ink/10 py-6 md:grid-cols-[11rem_minmax(0,1fr)_auto] md:gap-8">
                    <p className="font-mono text-[12.5px] text-muted md:pt-1.5">
                      #{issue.number} · <time dateTime={issue.date}>{formatPostDate(issue.date)}</time>
                      {issue.draft && <Tag className="ml-3 align-middle">Draft</Tag>}
                    </p>
                    <div className="min-w-0">
                      <h3 className="text-h3 text-ink">
                        <a
                          href={`/newsletter/${issue.slug}`}
                          className="underline-offset-4 after:absolute after:inset-0 group-hover:underline focus:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-ink"
                        >
                          {issue.title}
                        </a>
                      </h3>
                      <p className="mt-2 max-w-[680px] text-[15.5px] leading-relaxed text-muted">{issue.description}</p>
                    </div>
                    <span aria-hidden="true" className="hidden font-mono text-[15px] text-ink md:block md:pt-1">
                      →
                    </span>
                  </article>
                </li>
              ))}
            </ul>
          </Section>
        )}
      </main>
      <Footer />
    </>
  );
}
