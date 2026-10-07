import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PostFaq from "@/components/PostFaq";
import PostAuthor from "@/components/PostAuthor";
import ServiceCTA from "@/components/ServiceCTA";
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
    <div className="my-8 overflow-x-auto rounded-xl border border-white/10" tabIndex={0} role="region" aria-label="Table">
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
      <main className="pt-20">
        <article>
          <div className="bg-navy pt-12 md:pt-16 pb-20 px-6">
            <div className="max-w-[37rem] mx-auto">
              <nav aria-label="Breadcrumb" className="text-white/40 text-sm mb-8">
                <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <li>
                    <a href="/" className="hover:text-white transition-colors">Home</a>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li>
                    <a href="/blog" className="hover:text-white transition-colors">Blog</a>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li className="text-white/60" aria-current="page">{post.title}</li>
                </ol>
              </nav>

              <header>
                {post.draft && (
                  <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">
                    Draft · not visible on the live site
                  </p>
                )}
                <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 text-balance">{post.title}</h1>
                <p className="text-white/50 text-sm leading-relaxed">
                  By <span className="text-white/80 font-semibold">Max Wexley</span>
                  <span className="mx-2" aria-hidden="true">·</span>
                  Published <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                  <span className="mx-2" aria-hidden="true">·</span>
                  Last updated <time dateTime={post.updated}>{formatPostDate(post.updated)}</time>
                </p>
              </header>

              {/* The direct answer. Plain server-rendered text, first thing after the H1. */}
              <div className="mt-10 border-l-2 border-gold bg-white/[0.04] rounded-r-xl px-6 py-5">
                <p className="text-gold text-xs font-bold tracking-[0.25em] uppercase mb-2">Short answer</p>
                <p className="text-white/90 text-lg leading-relaxed">{post.answer}</p>
              </div>

              <div className="prose prose-invert md:prose-lg max-w-none mt-12">
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                  {post.body}
                </ReactMarkdown>
              </div>
            </div>
          </div>

          <PostFaq faqs={post.faqs} />

          {post.sources.length > 0 && (
            <section className="bg-navy py-20 px-6" aria-labelledby="post-sources-heading">
              <div className="max-w-[37rem] mx-auto">
                <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">Sources</p>
                <h2 id="post-sources-heading" className="text-2xl md:text-3xl font-bold text-white mb-8">
                  Where this comes from
                </h2>
                <ol className="list-decimal pl-5 space-y-3 text-white/65 text-base leading-relaxed marker:text-gold marker:font-semibold">
                  {post.sources.map((s) => (
                    <li key={s.url} className="pl-1">
                      <a
                        href={s.url}
                        rel="noopener"
                        className="text-gold underline underline-offset-4 decoration-gold/40 hover:decoration-gold break-words"
                      >
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </section>
          )}
        </article>

        <PostAuthor />
        <ServiceCTA
          heading="See where AI fits in your business"
          subheading="Free AI Audit. Quantified savings opportunities, no credit card, no signup."
        />
      </main>
      <Footer />
    </>
  );
}
