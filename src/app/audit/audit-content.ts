// Server-rendered explainer copy for /audit. Kept in a plain module (no
// "use client") so page.tsx can build FAQPage JSON-LD from the same Q&As
// the page renders. Claims here must match what the audit app at
// audit.wexadvisory.com actually does (intake fields, research sources,
// report sections). Check the ai-audit repo before changing them.

// The answer-first block near the top of /audit, written to be quoted on its
// own. The first FAQ repeats it word for word so the FAQPage JSON-LD and the
// visible answer stay identical.
export const AUDIT_ANSWER =
  "An AI readiness assessment checks whether a business is ready to use AI and where it should start. This one is free and built for small businesses. You enter your website and a few details, and it emails you a PDF with five AI maturity scores compared against your industry, the workflows worth automating ranked by estimated annual savings, and a phased plan for what to do first.";

// Who / how long / cost, shown beside the answer. Same facts as the longer
// "How long it takes and what it costs" and "Who it's for" blocks lower down.
export const AUDIT_FACTS: Array<[string, string]> = [
  [
    "Who it's for",
    "Owners and operators of small and mid-sized businesses, roughly 1 to 200 people, without a dedicated IT or ops team.",
  ],
  ["How long it takes", "About two to three minutes to fill in the form. The PDF usually arrives within minutes."],
  ["What it costs", "Free. No credit card, no account and no paid tier behind it."],
];

// "What it checks": the five scores and what feeds each one. Mirrors
// ai-audit lib/scoring/score-engine.ts (weights, inputs, 0 to 100 clamp,
// percentile against the industry benchmark) and lib/research/tech-detector.ts
// (tool categories, manual-work signals). Re-check both before editing.
export const AUDIT_CHECKS = [
  {
    title: "AI Readiness",
    body: "Whether your current setup can support AI. It weighs how modern your tools look, how mature your data is, and how many business tools it can spot, like a CRM, accounting, support, marketing, analytics, scheduling or payments software.",
  },
  {
    title: "Data Visibility",
    body: "How much insight you likely have into your own numbers, from paper and spreadsheets up to CRMs and dashboards, plus whether traffic estimates for your website are available.",
  },
  {
    title: "Automation Opportunity",
    body: "How much of the work looks manual. It counts signs like spreadsheets, data entry, manual invoicing and email follow-up in your website, your job postings and the problem you describe, then weighs the departments it can see and your industry's average.",
  },
  {
    title: "Revenue Acceleration",
    body: "Room to grow revenue with AI. It starts from your industry's average and goes up when marketing and sales functions or tools show up.",
  },
  {
    title: "Overall Maturity",
    body: "A weighted blend of the four scores above, so you have one number to come back to.",
  },
];

export const AUDIT_FAQS = [
  {
    q: "What is an AI readiness assessment?",
    a: AUDIT_ANSWER,
  },
  {
    q: "What is an AI audit?",
    a: "An AI audit is a review of how a business runs that finds the tasks AI could take over and estimates what each one is worth. Mine is free. You enter your website and a few details, and you get a PDF that scores your business on AI maturity and ranks automation opportunities by estimated annual savings, with the math behind each number.",
  },
  {
    q: "What does the AI readiness assessment measure?",
    a: "Five things, each scored from 0 to 100 and compared against the average for your industry: AI Readiness, Data Visibility, Automation Opportunity, Revenue Acceleration and Overall Maturity, which blends the other four. A typical readiness assessment stops at the score. This one also ranks the specific workflows worth automating and names the tools to do it with.",
  },
  {
    q: "Is this the same as an enterprise AI readiness assessment?",
    a: "No. It is built for small and mid-sized businesses without a dedicated IT team. It works only from public information and what you tell it, so there are no logins, no data exports and no access to your systems. The tool recommendations are sized for small budgets: the audit is set up to skip enterprise platforms and point you at tools a small team can afford and run. If you need an AI governance program for a large enterprise, this is not it.",
  },
  {
    q: "Is the AI audit really free?",
    a: "Yes. No credit card, no account, no trial that turns into a bill. You give me a work email so the report has somewhere to go. If you want help acting on it later, that is a separate conversation, and there is no obligation to have it.",
  },
  {
    q: "How long does the AI audit take?",
    a: "The form takes about two to three minutes. The research and analysis run on their own after you submit, and the finished PDF is emailed to you, usually within minutes.",
  },
  {
    q: "What information do I need to provide?",
    a: "Your website URL, company name, industry, team size, the part of the job you would happily never do again, and roughly how many hours a week it takes (optional), your name and a work email. That's it. No logins, no data exports, no access to your systems.",
  },
  {
    q: "How accurate are the savings estimates?",
    a: "They are estimates, and the report shows its work so you can check them. Each one is hours per month, times a loaded hourly rate, times how much of that work can realistically be automated. The report labels which inputs are yours and which are industry estimates, and shows a conservative and a best case for each. The audit only sees what is public plus what you tell it, so the more specific your answer, and the hours you give, the closer the numbers land. Treat it as a ranked starting point, then pressure-test the top items.",
  },
  {
    q: "What happens after I get my report?",
    a: "You can run with it on your own. Every opportunity names specific tools, so a capable team can start without me. If you want the numbers checked, book a free 30-minute numbers review. We swap my estimates for your real numbers on your top workflow, and you leave with an hours estimate to build it. If it is worth building, I quote it before any work starts.",
  },
];

export const AUDIT_STEPS = [
  {
    title: "Tell me about the business",
    body: "Enter your website URL and company name, then your industry, team size and the part of the job you would happily never do again, with roughly how many hours a week it takes if you know. Add your name and a work email. About two to three minutes.",
  },
  {
    title: "The research runs",
    body: "The audit crawls several pages of your website, reads public job postings, reviews and news about the company, and pulls web traffic estimates. It looks for signals that work is being done by hand, like roles hired for repetitive tasks or no booking or CRM tool in sight.",
  },
  {
    title: "The analysis runs",
    body: "It classifies your business model and departments, benchmarks you against industry averages, and scores five dimensions of AI maturity. Then it estimates hours, loaded rates and an automation ceiling for each workflow it finds, and ranks them by annual savings.",
  },
  {
    title: "The PDF lands in your inbox",
    body: "You get the full report by email. Read it, forward it to your partner or ops lead, or book a free 30-minute numbers review to check it against your real numbers.",
  },
];

export const AUDIT_INCLUDES = [
  {
    title: "Executive summary",
    body: "Total estimated annual savings as a conservative and best case, which opportunities are quick wins, and why the timing matters for your business.",
  },
  {
    title: "AI maturity scorecard",
    body: "Five scores (AI Readiness, Data Visibility, Overall Maturity, Automation Opportunity and Revenue Acceleration) compared against industry peers.",
  },
  {
    title: "Opportunities ranked by annual savings",
    body: "For each one: the current manual process, what the automated version looks like, the savings calculation with each input labeled as yours or an estimate, complexity, timeline, estimated build hours and cost, payback period and recommended tools.",
  },
  {
    title: "Implementation plan",
    body: "A phased roadmap so you know what to do first, what to do next, and what can wait.",
  },
  {
    title: "What to do this week",
    body: "A short list of concrete next steps you can take before spending anything.",
  },
  {
    title: "Methodology and data sources",
    body: "How every number was calculated and where the inputs came from, so nothing in the report is a black box.",
  },
];
