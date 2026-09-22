import { AUDIT_FAQS, AUDIT_INCLUDES, AUDIT_STEPS } from "./audit-content";

/* Server-rendered explainer under the scroll demo. Plain text on purpose:
   no data-sc-* hooks, so it is visible in the HTML and never waits on the
   scroll engine. Styling reuses the diagnostic surface's own tokens. */

export default function AuditGuide() {
  return (
    <div className="diag-guide">
      <section className="diag-guide__block" aria-labelledby="guide-what">
        <p className="sc-label">The short version</p>
        <h2 id="guide-what">What is an AI audit?</h2>
        <p className="sc-body">
          The Wex Advisory AI audit is a free report that shows a small business where AI can save
          it time and money, ranked by estimated annual savings. You give it your website and a few
          details. It researches your business, scores you on five dimensions of AI maturity, and
          emails you a PDF with the specific workflows worth automating, the tools to do it with,
          and the labor math behind every number.
        </p>
        <p className="sc-body">
          I built it because most small businesses know they should be using AI and have no idea
          where to start. What helps is a short, ranked list of the things costing you the most
          hours, with a dollar figure next to each.
        </p>
      </section>

      <section className="diag-guide__block" aria-labelledby="guide-ready">
        <p className="sc-label">Readiness</p>
        <h2 id="guide-ready">An AI readiness assessment, plus what to do about it</h2>
        <p className="sc-body">
          An AI readiness assessment answers a simple question: is this business ready to use AI,
          and where should it start? The audit answers both. AI Readiness is one of the five scores
          in the report, benchmarked against businesses in your industry.
        </p>
        <p className="sc-body">
          A score on its own doesn&rsquo;t tell you what to do on Monday. So the report ties it to
          the specific workflows worth automating, what each one is worth a year, and the order to
          do them in. If you would rather have someone build the top items for you, that is the work
          I do as an{" "}
          <a href="/ai-consulting-for-small-businesses">AI consultant for small business</a>.
        </p>
      </section>

      <section className="diag-guide__block" aria-labelledby="guide-get">
        <p className="sc-label">What you get</p>
        <h2 id="guide-get">What&rsquo;s in the report</h2>
        <p className="sc-body">
          The same structure as the sample above, built on your business instead of someone
          else&rsquo;s.
        </p>
        <dl className="diag-guide__grid">
          {AUDIT_INCLUDES.map((item) => (
            <div key={item.title}>
              <dt>{item.title}</dt>
              <dd>{item.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="diag-guide__block" aria-labelledby="guide-how">
        <p className="sc-label">How it works</p>
        <h2 id="guide-how">Four steps, most of them automatic</h2>
        <ol className="diag-guide__steps">
          {AUDIT_STEPS.map((s, i) => (
            <li key={s.title}>
              <span className="diag-guide__n" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="diag-guide__block" aria-labelledby="guide-time">
        <p className="sc-label">Time and cost</p>
        <h2 id="guide-time">How long it takes and what it costs</h2>
        <p className="sc-body">
          It costs nothing. There is no credit card, no account to create and no paid tier hiding
          behind the free one. Filling in the form takes about two to three minutes. The research
          and analysis run on their own after that, and the PDF usually arrives within minutes.
        </p>
      </section>

      <section className="diag-guide__block" aria-labelledby="guide-who">
        <p className="sc-label">Who it&rsquo;s for</p>
        <h2 id="guide-who">A free AI audit for small businesses</h2>
        <p className="sc-body">
          It is built for owners and operators of small and mid-sized businesses, roughly 1 to 200
          people, without a dedicated IT or ops team. Service firms, coworking operators, retailers
          and e-commerce brands all fit. The tasks that eat the most time (follow-ups, intake,
          scheduling, reporting, billing) look similar across industries, and the report is written
          in plain language for the person running the business.
        </p>
        <p className="sc-body">
          The tool recommendations are sized for small budgets. The audit is set up to skip
          enterprise platforms you would never buy and point you at tools a small team can
          actually afford and run.
        </p>
        <p className="sc-body">
          It is probably not for you if you are a large enterprise looking for an AI governance
          program. I&rsquo;ll say that upfront.
        </p>
      </section>

      <section className="diag-guide__block" aria-labelledby="guide-sample">
        <p className="sc-label">Sample output</p>
        <h2 id="guide-sample">About the sample on this page</h2>
        <p className="sc-body">
          Everything you scrolled through above is real output from the production audit, run on
          a 5-location coworking operator with 11 to 50 staff. The name is removed. It found five
          workflows run by hand, from room and desk booking to membership renewal billing, adding
          up to 206 staff-hours a month. Ranked by annual savings, those five came to $216,124 a
          year in estimated savings, with $130,944 of it in quick wins that pay back inside six
          months. It also flagged three gaps: no CRM or member-management platform, no booking
          automation, and no onboarding workflow across any location.
        </p>
        <p className="sc-body">
          Your report will look different, because it is built from your website, your job
          postings and the problem you tell it about.
        </p>
      </section>

      <section className="diag-guide__block" aria-labelledby="guide-faq">
        <p className="sc-label">FAQ</p>
        <h2 id="guide-faq">Common questions about the AI audit</h2>
        <div className="diag-guide__faq">
          {AUDIT_FAQS.map((f) => (
            <div key={f.q}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="diag-guide__block diag-guide__close">
        <h2>Run it on your business</h2>
        <p className="sc-body">
          Free, about three minutes of your time, and the PDF is yours to keep.
        </p>
        <p className="diag-guide__links">
          <a className="diag-guide__cta" href="#run">
            Start my free AI audit
          </a>
          <a href="/work">See client work</a>
          <a href="/ai-for-coworking-spaces">AI for coworking spaces</a>
          <a href="/ai-consulting-for-small-businesses">Hire an AI consultant for small business</a>
        </p>
      </section>
    </div>
  );
}
