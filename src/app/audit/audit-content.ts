// Server-rendered explainer copy for /audit. Kept in a plain module (no
// "use client") so page.tsx can build FAQPage JSON-LD from the same Q&As
// the page renders. Claims here must match what the audit app at
// audit.wexadvisory.com actually does (intake fields, research sources,
// report sections). Check the ai-audit repo before changing them.

export const AUDIT_FAQS = [
  {
    q: "What is an AI audit?",
    a: "An AI audit is a review of how a business runs that finds the tasks AI could take over and estimates what each one is worth. Mine is free. You enter your website and a few details, and you get a PDF that scores your business on AI maturity and ranks automation opportunities by estimated annual savings, with the math behind each number.",
  },
  {
    q: "Is this an AI readiness assessment?",
    a: "Yes, and it goes one step further. AI Readiness is one of the five scores in the report, next to Data Visibility, Overall Maturity, Automation Opportunity and Revenue Acceleration, each compared against industry peers. A typical readiness assessment stops at the score. This one also ranks the specific workflows worth automating and names the tools to do it with.",
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
    a: "Your website URL, company name, industry, team size, your biggest operational challenge right now, your name and a work email. That's it. No logins, no data exports, no access to your systems.",
  },
  {
    q: "How accurate are the savings estimates?",
    a: "They are estimates, and the report shows its work so you can check them. Each one is hours per month, times a loaded hourly rate, times how much of that work can realistically be automated. The audit only sees what is public plus what you tell it, so the more specific your answer about your biggest challenge, the closer the numbers land. Treat it as a ranked starting point, then pressure-test the top items.",
  },
  {
    q: "What happens after I get my report?",
    a: "You can run with it on your own. Every opportunity names specific tools, so a capable team can start without me. If you want a second set of eyes, you can book a free 30-minute call and I will walk through the results with you. If one of the opportunities is worth building, I scope it and quote it before any work starts.",
  },
];

export const AUDIT_STEPS = [
  {
    title: "Tell me about the business",
    body: "Enter your website URL and company name, then your industry, team size and the operational problem costing you the most time. Add your name and a work email. About two to three minutes.",
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
    body: "You get the full report by email. Read it, forward it to your partner or ops lead, or book a call to go through it with me.",
  },
];

export const AUDIT_INCLUDES = [
  {
    title: "Executive summary",
    body: "Total estimated annual savings, which opportunities are quick wins, and why the timing matters for your business.",
  },
  {
    title: "AI maturity scorecard",
    body: "Five scores (AI Readiness, Data Visibility, Overall Maturity, Automation Opportunity and Revenue Acceleration) compared against industry peers.",
  },
  {
    title: "Opportunities ranked by annual savings",
    body: "For each one: the current manual process, what the automated version looks like, the savings calculation, complexity, timeline, estimated investment, payback period and recommended tools.",
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
