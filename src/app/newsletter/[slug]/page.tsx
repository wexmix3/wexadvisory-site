import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Heading from "@/components/brand/Heading";
import Tag from "@/components/brand/Tag";
import NewsletterCard from "@/components/NewsletterCard";
import Breadcrumb from "../../blog/_components/Breadcrumb";
import styles from "../../blog/[slug]/article.module.css";
import { formatPostDate } from "@/lib/blog";
import { NEWSLETTER_NAME, getAllIssues, getIssue } from "@/lib/newsletter";

// One newsletter issue, the web copy of the email (2026-11-17). noindex on
// purpose: the issue repeats the week's blog lesson, and the newsletter is
// for readers, not search. Shared links still work and end at the signup.
const SITE_URL = "https://www.wexadvisory.com";

type Props = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllIssues().map((i) => ({ slug: i.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const issue = getIssue(params.slug);
  if (!issue) return {};
  const title = `${issue.title} | ${NEWSLETTER_NAME} #${issue.number}`;
  return {
    title,
    description: issue.description,
    alternates: { canonical: `${SITE_URL}/newsletter/${issue.slug}` },
    robots: { index: false, follow: true },
    openGraph: {
      title,
      description: issue.description,
      url: `${SITE_URL}/newsletter/${issue.slug}`,
      siteName: "Wex Advisory",
      type: "article",
      images: [{ url: `/api/og?title=${encodeURIComponent(issue.title)}`, width: 1200, height: 630, alt: issue.title }],
    },
  };
}

const isExternal = (href?: string) => !!href && /^https?:\/\//.test(href) && !href.startsWith(SITE_URL);

const markdownComponents: Components = {
  h1: ({ node: _node, ...props }) => <h2 {...props} />,
  a: ({ node: _node, href, ...props }) => (
    <a href={href} {...(isExternal(href) ? { rel: "noopener" } : {})} {...props} />
  ),
  table: ({ node: _node, ...props }) => (
    <div className="my-8 overflow-x-auto rounded-[12px] border border-ink/10 bg-paper" tabIndex={0} role="region" aria-label="Table">
      <table {...props} />
    </div>
  ),
};

export default function IssuePage({ params }: Props) {
  const issue = getIssue(params.slug);
  if (!issue) notFound();

  return (
    <>
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <article className="bg-canvas px-4 pb-8 pt-8 sm:px-8">
          <div className="mx-auto max-w-[680px]">
            <Breadcrumb
              className="mb-10 md:mb-14"
              items={[{ href: "/", label: "Home" }, { href: "/newsletter", label: "Newsletter" }, { label: `#${issue.number}` }]}
            />
            <header>
              {issue.draft && <Tag className="mb-5">Draft · not visible on the live site</Tag>}
              <p className="mb-4 font-mono text-[12px] uppercase tracking-[0.14em] text-muted">
                {NEWSLETTER_NAME} · #{issue.number}
              </p>
              <Heading as="h1" size="h2">
                {issue.title}
              </Heading>
              <p className="mt-6 font-mono text-[12.5px] text-muted">
                By <span className="text-ink">Max Wexley</span>
                <span className="mx-2" aria-hidden="true">·</span>
                <time dateTime={issue.date}>{formatPostDate(issue.date)}</time>
              </p>
            </header>
            {/* Prompts are code blocks; wrap them so a reader sees the whole prompt on a phone. */}
            <div className={`prose md:prose-lg max-w-none mt-10 [&_pre]:whitespace-pre-wrap [&_pre]:break-words ${styles.article}`}>
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                {issue.body}
              </ReactMarkdown>
            </div>
          </div>
        </article>
        <NewsletterCard source="issue" />
        <div className="pb-16" />
      </main>
      <Footer />
    </>
  );
}
