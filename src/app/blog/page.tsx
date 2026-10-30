import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/brand/PageHero";
import Section from "@/components/brand/Section";
import Tag from "@/components/brand/Tag";
import BlogCta from "./_components/BlogCta";
import Breadcrumb from "./_components/Breadcrumb";
import { getAllPosts, formatPostDate } from "@/lib/blog";
import { serializeJsonLd } from "@/lib/json-ld";

const PAGE_URL = "https://www.wexadvisory.com/blog";

const TITLE = "Blog | Wex Advisory";

const DESCRIPTION =
  "Practical notes on AI automation for small businesses: what to automate first, what it costs, and how the systems are built.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PAGE_URL,
    types: { "application/rss+xml": `${PAGE_URL}/rss.xml` },
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "Wex Advisory",
    type: "website",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/api/og"],
  },
};

const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.wexadvisory.com" },
    { "@type": "ListItem", position: 2, name: "Blog", item: PAGE_URL },
  ],
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  // The Blog link in Nav and Footer renders from NEXT_PUBLIC_BLOG_LIVE, which
  // next.config.mjs computes with its own copy of the draft rule. If the two
  // ever disagree, stop the build here instead of shipping a link to a 404.
  const linkIsLive = process.env.NEXT_PUBLIC_BLOG_LIVE === "1";
  if (linkIsLive !== posts.length > 0) {
    throw new Error(
      `[blog] NEXT_PUBLIC_BLOG_LIVE is "${process.env.NEXT_PUBLIC_BLOG_LIVE}" but lib/blog.ts sees ${posts.length} visible post(s). ` +
        "In dev, restart the server after adding the first post. Otherwise the draft rule in next.config.mjs and src/lib/blog.ts has drifted."
    );
  }

  if (posts.length === 0) notFound();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLdBreadcrumb) }} />
      <Nav />
      <main>
        {/* 2026-10-29 brand redesign: breadcrumb strip, PageHero, the posts as a
            hairline list (date, title, description), the brand close. */}
        <div className="bg-canvas px-4 pt-8 sm:px-8">
          <Breadcrumb className="mx-auto max-w-[1180px]" items={[{ href: "/", label: "Home" }, { label: "Blog" }]} />
        </div>
        <PageHero eyebrow="Blog" title="Notes on AI for small businesses" subhead={DESCRIPTION} />

        <Section divider aria-labelledby="all-posts">
          <h2 id="all-posts" className="sr-only">
            All posts
          </h2>
          <ul className="border-t border-ink/10">
            {posts.map((post) => (
              <li key={post.slug}>
                <article className="group relative grid gap-2 border-b border-ink/10 py-7 md:grid-cols-[11rem_minmax(0,1fr)_auto] md:gap-8">
                  <p className="font-mono text-[12.5px] text-muted md:pt-1.5">
                    <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                    {post.draft && <Tag className="ml-3 align-middle">Draft</Tag>}
                  </p>
                  <div className="min-w-0">
                    <h3 className="text-h3 text-ink">
                      {/* Stretched link: the whole row is the click target. */}
                      <a
                        href={`/blog/${post.slug}`}
                        className="underline-offset-4 after:absolute after:inset-0 group-hover:underline focus:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-ink"
                      >
                        {post.title}
                      </a>
                    </h3>
                    <p className="mt-2 max-w-[680px] text-[15.5px] leading-relaxed text-muted">{post.description}</p>
                  </div>
                  <span aria-hidden="true" className="hidden font-mono text-[15px] text-ink md:block md:pt-1">
                    →
                  </span>
                </article>
              </li>
            ))}
          </ul>
        </Section>

        <BlogCta
          heading="See where AI fits in your business"
          subheading="Free AI Audit. Quantified savings opportunities, no credit card, no signup."
        />
      </main>
      <Footer />
    </>
  );
}
