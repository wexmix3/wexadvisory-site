import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PostFaq from "@/components/PostFaq";
import PostAuthor from "@/components/PostAuthor";
import Card from "@/components/brand/Card";
import Eyebrow from "@/components/brand/Eyebrow";
import Heading from "@/components/brand/Heading";
import Section from "@/components/brand/Section";
import Tag from "@/components/brand/Tag";
import BlogCta from "../_components/BlogCta";
import Breadcrumb from "../_components/Breadcrumb";
import styles from "./article.module.css";
import { getAllPosts, getPost, formatPostDate } from "@/lib/blog";
import { serializeJsonLd } from "@/lib/json-ld";

const SITE_URL = "https://www.wexadvisory.com";

type Props = { params: { slug: string } };

// Every post is built ahead of time. An unknown slug is a 404, never a
// request-time render.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

const ogImage = (title: string) => `/api/og?title=${encodeURIComponent(title)}`;

export function generateMetadata({ params }: Props): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};

  const pageUrl = `${SITE_URL}/blog/${post.slug}`;
  const title = `${post.title} | Wex Advisory`;

  return {
    title,
    description: post.description,
    alternates: { canonical: pageUrl },
    // A draft is only ever built outside production. Keep it out of indexes
    // even if a preview URL leaks.
    robots: post.draft ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description: post.description,
      url: pageUrl,
      siteName: "Wex Advisory",
      type: "article",
      publishedTime: `${post.date}T12:00:00Z`,
      modifiedTime: `${post.updated}T12:00:00Z`,
      authors: ["Max Wexley"],
      images: [
        {
          url: ogImage(post.title),
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.description,
      images: [ogImage(post.title)],
    },
  };
}

const isExternal = (href?: string) => !!href && /^https?:\/\//.test(href) && !href.startsWith(SITE_URL);

// Markdown element overrides. The page already has its H1, so a stray "# "
// in a post becomes an H2. Tables get a scroll wrapper so a wide GFM table
// scrolls inside itself on a phone and the page never scrolls sideways.
const markdownComponents: Components = {
  h1: ({ node: _node, ...props }) => <h2 {...props} />,
  a: ({ node: _node, href, ...props }) => (
    <a href={href} {...(isExternal(href) ? { rel: "noopener" } : {})} {...props} />
  ),
  table: ({ node: _node, ...props }) => (
    <div
      className="my-8 overflow-x-auto rounded-[12px] border border-ink/10 bg-paper [scrollbar-width:thin] [scrollbar-color:rgb(15_31_61/0.25)_transparent] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      tabIndex={0}
      role="region"
      aria-label="Table"
    >
      <table {...props} />
    </div>
  ),
};

export default function BlogPostPage({ params }: Props) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const pageUrl = `${SITE_URL}/blog/${post.slug}`;

  const jsonLdPosting = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: `${post.date}T12:00:00Z`,
    dateModified: `${post.updated}T12:00:00Z`,
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    image: `${SITE_URL}${ogImage(post.title)}`,
    author: { "@type": "Person", "@id": `${SITE_URL}/#max-wexley`, name: "Max Wexley", url: SITE_URL },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  // Built from the same array PostFaq renders, so markup and page cannot disagree.
  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: pageUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLdPosting) }} />
      {post.faqs.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLdFaq) }} />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLdBreadcrumb) }} />
      <Nav />
      <main>
        {/* 2026-10-29 brand redesign: a 680px reading column on the canvas,
            the short answer on a card, the article body on light prose
            (article.module.css), sources as a hairline list, then the author
            box, FAQ and the brand close. */}
        <article>
          <div className="bg-canvas px-4 pb-16 pt-8 sm:px-8 md:pb-20">
            <div className="mx-auto max-w-[680px]">
              <Breadcrumb
                className="mb-10 md:mb-14"
                items={[{ href: "/", label: "Home" }, { href: "/blog", label: "Blog" }, { label: post.title }]}
              />

              <header>
                {post.draft && <Tag className="mb-5">Draft · not visible on the live site</Tag>}
                {/* Post titles are long questions: the h2 step of the scale keeps them to 2-3 lines in the reading column. */}
                <Heading as="h1" size="h2">
                  {post.title}
                </Heading>
                <p className="mt-6 font-mono text-[12.5px] leading-relaxed text-muted">
                  By <span className="text-ink">Max Wexley</span>
                  <span className="mx-2" aria-hidden="true">·</span>
                  Published <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                  <span className="mx-2" aria-hidden="true">·</span>
                  Last updated <time dateTime={post.updated}>{formatPostDate(post.updated)}</time>
                </p>
              </header>

              {/* The direct answer. Plain server-rendered text, first thing after the H1. */}
              <Card padding="lg" className="mt-10">
                <Eyebrow className="mb-3">Short answer</Eyebrow>
                <p className="text-[18px] font-medium leading-relaxed text-ink">{post.answer}</p>
              </Card>

              <div className={`prose md:prose-lg max-w-none mt-12 ${styles.article}`}>
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                  {post.body}
                </ReactMarkdown>
              </div>
            </div>
          </div>

          <PostFaq faqs={post.faqs} />

          {post.sources.length > 0 && (
            <Section divider width="narrow" aria-labelledby="post-sources-heading">
              <div className="mx-auto max-w-[680px]">
              <Eyebrow>Sources</Eyebrow>
              <Heading id="post-sources-heading" size="h2-sm">
                Where this comes from
              </Heading>
              <ol className="mt-8 border-t border-ink/10">
                {post.sources.map((s, i) => (
                  <li key={s.url} className="flex gap-4 border-b border-ink/10 py-4">
                    <span className="w-6 shrink-0 font-mono text-[12.5px] leading-[1.7] text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <a
                      href={s.url}
                      rel="noopener"
                      className="min-w-0 break-words text-[15.5px] font-semibold leading-relaxed text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
              </div>
            </Section>
          )}
        </article>

        <PostAuthor />
        <BlogCta
          heading="See where AI fits in your business"
          subheading="Free AI Audit. Quantified savings opportunities, no credit card, no signup."
        />
      </main>
      <Footer />
    </>
  );
}
