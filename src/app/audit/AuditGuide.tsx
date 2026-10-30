import Button from "@/components/brand/Button";
import Card, { cardClass } from "@/components/brand/Card";
import Eyebrow from "@/components/brand/Eyebrow";
import FaqList from "@/components/brand/FaqList";
import Heading from "@/components/brand/Heading";
import Section from "@/components/brand/Section";
import { cx } from "@/components/brand/cx";
import { AUDIT_FAQS, AUDIT_INCLUDES, AUDIT_STEPS } from "./audit-content";

/* Server-rendered explainer under the sample report. Plain text on purpose,
   so it is in the HTML and never waits on script. 2026-10-29 brand pass:
   restyled into brand Sections (copy, links and FAQ text unchanged; the FAQ
   answers stay in the DOM and match the FAQPage JSON-LD in page.tsx). */

const LINK = "font-semibold text-ink underline underline-offset-4 hover:decoration-2";
const BODY = "text-[16.5px] leading-relaxed";

function Block({
  id,
  label,
  title,
  size = "h2",
  children,
}: {
  id: string;
  label: string;
  title: string;
  size?: "h2" | "h2-sm";
  children: React.ReactNode;
}) {
  return (
    <div aria-labelledby={id} role="group">
      <Eyebrow>{label}</Eyebrow>
      <Heading id={id} size={size} reveal>
        {title}
      </Heading>
      <div className="mt-5 space-y-4">{children}</div>
    </div>
  );
}

export default function AuditGuide() {
  return (
    <div id="guide">
      <Section divider>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Block id="guide-what" label="The short version" title="What is an AI audit?" size="h2-sm">
            <p className={BODY}>
              The Wex Advisory AI audit is a free report that shows a small business where AI can save it time and
              money, ranked by estimated annual savings. You give it your website and a few details. It researches your
              business, scores you on five dimensions of AI maturity, and emails you a PDF with the specific workflows
              worth automating, the tools to do it with, and the labor math behind every number.
            </p>
            <p className={BODY}>
              I built it because most small businesses know they should be using AI and have no idea where to start.
              What helps is a short, ranked list of the things costing you the most hours, with a dollar figure next to
              each.
            </p>
          </Block>
          <Block
            id="guide-ready"
            label="Readiness"
            title="An AI readiness assessment, plus what to do about it"
            size="h2-sm"
          >
            <p className={BODY}>
              An AI readiness assessment answers a simple question: is this business ready to use AI, and where should
              it start? The audit answers both. AI Readiness is one of the five scores in the report, benchmarked
              against businesses in your industry.
            </p>
            <p className={BODY}>
              A score on its own doesn&rsquo;t tell you what to do on Monday. So the report ties it to the specific
              workflows worth automating, what each one is worth a year, and the order to do them in. If you would
              rather have someone build the top items for you, that is the work I do as an{" "}
              <a className={LINK} href="/ai-consulting-for-small-businesses">
                AI consultant for small business
              </a>
              .
            </p>
          </Block>
        </div>
      </Section>

      <Section divider aria-labelledby="guide-get">
        <Eyebrow>What you get</Eyebrow>
        <Heading id="guide-get" reveal>
          What&rsquo;s in the report
        </Heading>
        <p className="mt-4 max-w-2xl text-[17px] leading-relaxed">
          The same structure as the sample above, built on your business instead of someone else&rsquo;s.
        </p>
        <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AUDIT_INCLUDES.map((item) => (
            <div key={item.title} className={cardClass("lg")}>
              <dt className="text-h3 text-ink">{item.title}</dt>
              <dd className="mt-3 text-[15.5px] leading-relaxed">{item.body}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section divider aria-labelledby="guide-how">
        <Eyebrow>How it works</Eyebrow>
        <Heading id="guide-how" reveal>
          Four steps, most of them automatic
        </Heading>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {AUDIT_STEPS.map((s, i) => (
            <Card as="li" key={s.title} padding="lg">
              <span className="font-mono text-[12px] text-muted" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-h3 text-ink">{s.title}</h3>
              <p className="mt-3 text-[15.5px] leading-relaxed">{s.body}</p>
            </Card>
          ))}
        </ol>
      </Section>

      <Section divider>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <Block id="guide-time" label="Time and cost" title="How long it takes and what it costs" size="h2-sm">
            <p className={BODY}>
              It costs nothing. There is no credit card, no account to create and no paid tier hiding behind the free
              one. Filling in the form takes about two to three minutes. The research and analysis run on their own
              after that, and the PDF usually arrives within minutes.
            </p>
          </Block>
          <Block id="guide-who" label="Who it’s for" title="A free AI audit for small businesses" size="h2-sm">
            <p className={BODY}>
              It is built for owners and operators of small and mid-sized businesses, roughly 1 to 200 people, without
              a dedicated IT or ops team. Service firms, property managers, law firms, retailers and e-commerce brands
              all fit. The tasks that eat the most time (follow-ups, intake, scheduling, reporting, billing) look
              similar across industries, and the report is written in plain language for the person running the
              business.
            </p>
            <p className={BODY}>
              The tool recommendations are sized for small budgets. The audit is set up to skip enterprise platforms
              you would never buy and point you at tools a small team can actually afford and run.
            </p>
            <p className={BODY}>
              It is probably not for you if you are a large enterprise looking for an AI governance program. I&rsquo;ll
              say that upfront.
            </p>
          </Block>
        </div>
      </Section>

      <Section divider width="narrow">
        <Block id="guide-sample" label="Sample output" title="About the sample on this page">
          <p className={BODY}>
            Everything you scrolled through above is real output from the production audit, run on a multi-site
            service business with 11 to 50 staff. The company name, industry and identifying details are changed to
            protect the client, and the workflows are described in general terms. The hours, rates, scores and savings
            are the report&rsquo;s own numbers. It found five workflows run by hand, from scheduling and booking to
            recurring billing and renewals, adding up to 206 staff-hours a month. Ranked by annual savings, those five
            came to $216,124 a year in estimated savings, with $130,944 of it in quick wins that pay back inside six
            months. It also flagged three gaps: no CRM, no booking automation, and no onboarding workflow at any site.
          </p>
          <p className={BODY}>
            Your report will look different, because it is built from your website, your job postings and the problem
            you tell it about.
          </p>
        </Block>
      </Section>

      <Section divider width="narrow" aria-labelledby="guide-faq">
        <Eyebrow>FAQ</Eyebrow>
        <Heading id="guide-faq" reveal>
          Common questions about the AI audit
        </Heading>
        <div className="mt-8">
          <FaqList items={AUDIT_FAQS} defaultOpen={0} />
        </div>
      </Section>

      <section aria-labelledby="guide-close" className="scroll-mt-20 bg-canvas px-4 pb-16 pt-4 sm:px-8 md:pb-20">
        <div className={cx(cardClass("none"), "mx-auto max-w-[1180px] px-6 py-12 text-center sm:py-16")}>
          <Heading id="guide-close" reveal className="mx-auto max-w-[760px]">
            Run it on your business
          </Heading>
          <p className="mx-auto mt-4 max-w-[560px] text-[17px] leading-relaxed">
            Free, about three minutes of your time, and the PDF is yours to keep.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <Button href="#run" block>
              Start my free AI audit
            </Button>
            <Button href="https://calendly.com/maxwexley-wexadvisory/30min" external variant="quiet">
              Prefer to talk? Book a call &rarr;
            </Button>
          </div>
          <ul className="mx-auto mt-8 flex max-w-[860px] flex-wrap justify-center gap-x-6 gap-y-1 border-t border-ink/10 pt-6">
            {[
              ["/work", "See client work"],
              ["/ai-for-property-management", "AI for property management"],
              ["/ai-automation-for-law-firms", "AI for law firms"],
              ["/ai-ops-dashboard-for-ecommerce-brands", "AI for ecommerce operations"],
              ["/ai-training-for-small-businesses", "AI training for employees"],
              ["/ai-consulting-for-small-businesses", "Hire an AI consultant for small business"],
            ].map(([href, label]) => (
              <li key={href}>
                <Button href={href} variant="quiet">
                  {label}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
