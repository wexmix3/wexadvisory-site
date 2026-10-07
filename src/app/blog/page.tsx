import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ServiceCTA from "@/components/ServiceCTA";
import { getAllPosts, formatPostDate } from "@/lib/blog";

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />
      <Nav />
      <main className="pt-20">
        <section className="bg-navy py-20 md:py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <nav aria-label="Breadcrumb" className="text-white/40 text-sm mb-8">
              <a href="/" className="hover:text-white transition-colors">Home</a>
              <span className="mx-2" aria-hidden="true">/</span>
              <span className="text-white/60" aria-current="page">Blog</span>
            </nav>
            <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">Blog</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Notes on AI for small businesses
            </h1>
            <p className="text-white/65 text-lg leading-relaxed max-w-xl">{DESCRIPTION}</p>
          </div>
        </section>

        <section className="bg-[#0a1a30] py-20 px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="sr-only">All posts</h2>
            <ul className="space-y-5">
              {posts.map((post) => (
                <li key={post.slug}>
                  <article className="relative bg-white/[0.04] hover:bg-white/[0.06] border border-white/[0.06] hover:border-gold/40 rounded-2xl p-7 md:p-8 transition-colors">
                    <p className="text-white/40 text-xs tracking-wide mb-3">
                      <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                      {post.draft && (
                        <span className="ml-3 text-gold font-bold tracking-[0.2em] uppercase">Draft</span>
                      )}
                    </p>
                    <h3 className="text-white font-bold text-xl md:text-2xl leading-snug mb-3">
                      {/* Stretched link: the whole card is the click target. */}
                      <a
                        href={`/blog/${post.slug}`}
                        className="after:absolute after:inset-0 after:rounded-2xl focus:outline-none focus-visible:after:ring-2 focus-visible:after:ring-gold"
                      >
                        {post.title}
                      </a>
                    </h3>
                    <p className="text-white/60 text-base leading-relaxed">{post.description}</p>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <ServiceCTA
          heading="See where AI fits in your business"
          subheading="Free AI Audit. Quantified savings opportunities, no credit card, no signup."
        />
      </main>
      <Footer />
    </>
  );
}
