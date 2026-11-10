import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CtaBand from "@/components/brand/CtaBand";
import DataTable from "@/components/brand/DataTable";
import Eyebrow from "@/components/brand/Eyebrow";
import Heading from "@/components/brand/Heading";
import PageHero from "@/components/brand/PageHero";
import RevealScope from "@/components/brand/RevealScope";
import Section from "@/components/brand/Section";
import StatSheet from "@/components/brand/StatSheet";
import INDEX from "@/lib/manual-work-index-2026.json";

// 2026-11-09 (X bookmark B-247): a standalone page of original numbers that
// journalists and AI answers can cite by name. Data is aggregate only
// (src/lib/manual-work-index-2026.json, built from the outreach tool's
// enrichment output); no business is named. Slug has no year so it can be
// refreshed each year without a redirect.
const PAGE_URL = "https://www.wexadvisory.com/research/manual-work-index";
const TITLE = "Manual Work Index 2026: What Small Businesses Still Do by Hand";
const DESCRIPTION = `The Wex Advisory Manual Work Index 2026 read ${INDEX.businesses} small-business websites. ${INDEX.tasks[0].pct}% most likely still do ${INDEX.tasks[0].task.toLowerCase()} by hand.`;

export const metadata: Metadata = {
  title: `${TITLE} | Wex Advisory`,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: PAGE_URL, siteName: "Wex Advisory", type: "article" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: INDEX.title,
  description: DESCRIPTION,
  url: PAGE_URL,
  creator: { "@type": "Organization", name: "Wex Advisory", url: "https://www.wexadvisory.com" },
  dateModified: INDEX.asOf,
  temporalCoverage: "2026-05/2026-11",
  measurementTechnique: INDEX.method,
  variableMeasured: "Share of small businesses whose website suggests a task is still done by hand",
};

const [first, second, third] = INDEX.tasks;

export default function ManualWorkIndexPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <RevealScope>
          <PageHero
            eyebrow="Research"
            title="What small businesses still do by hand"
            subhead={
              <p>
                The Wex Advisory Manual Work Index 2026 read {INDEX.businesses} small-business websites across{" "}
                {INDEX.industriesAtLeast30} industries. {first.pct}% most likely still handle{" "}
                {first.task.toLowerCase()} by hand. As of November 2026.
              </p>
            }
          />

          <Section>
            <StatSheet
              label="Manual Work Index 2026 headline numbers"
              items={[first, second, third].map((t) => ({
                value: `${t.pct}%`,
                label: `${t.task}`,
              }))}
            />
            <p className="mt-6 max-w-[760px] text-[16px] leading-relaxed">
              Read each number as: of {INDEX.businesses} small businesses, this share has a website that suggests the
              task is still done by hand. A business can count toward more than one task.
            </p>
          </Section>

          <Section divider>
            <Eyebrow>All Task Types</Eyebrow>
            <Heading reveal>Which tasks do small businesses most often still do by hand?</Heading>
            <DataTable
              className="mt-8"
              caption={`Manual Work Index 2026: share of ${INDEX.businesses} small businesses, by task type`}
              columns={[
                { key: "task", label: "Task type", rowHeader: true },
                { key: "pct", label: "Share of businesses", strong: true },
                { key: "count", label: "Businesses" },
              ]}
              rows={INDEX.tasks.map((t) => ({ task: t.task, pct: `${t.pct}%`, count: t.count }))}
            />
          </Section>

          <Section tone="band">
            <Eyebrow>By Industry</Eyebrow>
            <Heading reveal>What does each industry most often still do by hand?</Heading>
            <p className="mt-6 max-w-[760px] text-[16px] leading-relaxed">
              Industries with at least 30 businesses in the sample. Top two task types for each.
            </p>
            <DataTable
              className="mt-8"
              caption="Manual Work Index 2026: top manual tasks by industry"
              columns={[
                { key: "industry", label: "Industry (businesses)", rowHeader: true },
                { key: "top", label: "Most common", strong: true },
                { key: "next", label: "Second" },
              ]}
              rows={INDEX.industries.map((i) => ({
                industry: `${i.industry} (${i.n})`,
                top: `${i.top[0].task} (${i.top[0].pct}%)`,
                next: i.top[1] ? `${i.top[1].task} (${i.top[1].pct}%)` : "",
              }))}
            />
          </Section>

          <Section divider width="narrow">
            <Eyebrow>Method</Eyebrow>
            <Heading reveal>How was the index built?</Heading>
            <p className="mt-6 text-[16px] leading-relaxed">{INDEX.method}</p>
            <h3 className="mt-8 text-h3 text-ink">What it does not show</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-[16px] leading-relaxed">
              <li>
                It is a read of public websites, not a survey. A business may already automate a task its website
                doesn&apos;t mention.
              </li>
              <li>
                The model tends to reuse phrasing within an industry, so very high shares (above 90%) partly reflect
                how it describes that industry.
              </li>
              <li>
                The sample is the businesses Wex Advisory researched for outreach, mostly in the US, not a random
                sample of all small businesses.
              </li>
              <li>It does not measure hours spent or cost.</li>
            </ul>
            <p className="mt-6 text-[16px] leading-relaxed">
              Quoting it: &ldquo;The Wex Advisory Manual Work Index 2026 found that {first.pct}% of{" "}
              {INDEX.businesses} small businesses most likely still handle {first.task.toLowerCase()} by hand.&rdquo;
              Link to this page as the source.
            </p>
          </Section>

          <CtaBand
            title="Want to know what your business still does by hand?"
            primary={{ href: "/audit", label: "Get your free AI Audit →" }}
            secondary={null}
          />
        </RevealScope>
      </main>
      <Footer />
    </>
  );
}
