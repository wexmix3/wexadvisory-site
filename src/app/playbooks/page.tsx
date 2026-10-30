import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/brand/PageHero";
import Section from "@/components/brand/Section";
import Tag from "@/components/brand/Tag";
import BlogCta from "../blog/_components/BlogCta";
import Breadcrumb from "../blog/_components/Breadcrumb";
import { getPlaybooks, formatPostDate } from "@/lib/blog";

// Playbooks index (2026-10-30): the blog posts with `format: playbook` in
// their frontmatter, one a month. Each is a step-by-step guide with
// checklists and a template that ends at the free tool doing the same job.
// The articles themselves live under /blog/<slug>.
const PAGE_URL = "https://www.wexadvisory.com/playbooks";
const DESCRIPTION =
  "Step-by-step playbooks for owners: one job you can do yourself in an afternoon, with checklists and templates, ending at the free tool that does it for you. A new one every month.";

export const metadata: Metadata = {
  title: "Playbooks | Wex Advisory",
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
};

export default function PlaybooksPage() {
  const playbooks = getPlaybooks();
  if (playbooks.length === 0) notFound();

  return (
    <>
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <div className="bg-canvas px-4 pt-8 sm:px-8">
          <Breadcrumb className="mx-auto max-w-[1180px]" items={[{ href: "/", label: "Home" }, { label: "Playbooks" }]} />
        </div>
        <PageHero eyebrow="Playbooks" title="Do it yourself, step by step" subhead={DESCRIPTION} />

        <Section divider aria-labelledby="all-playbooks">
          <h2 id="all-playbooks" className="sr-only">
            All playbooks
          </h2>
          <ul className="border-t border-ink/10">
            {playbooks.map((post) => (
              <li key={post.slug}>
                <article className="group relative grid gap-2 border-b border-ink/10 py-7 md:grid-cols-[11rem_minmax(0,1fr)_auto] md:gap-8">
                  <p className="font-mono text-[12.5px] text-muted md:pt-1.5">
                    <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                    {post.draft && <Tag className="ml-3 align-middle">Draft</Tag>}
                  </p>
                  <div className="min-w-0">
                    <h3 className="text-h3 text-ink">
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
