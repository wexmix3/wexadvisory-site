// All copy and facts for /automated-reporting. Every claim here traces to the
// Facts section of docs/superpowers/specs/2026-10-18-reporting-service-page-design.md,
// and tests/reporting-content.test.ts checks it (prices, tools, banned phrases).
// Change a fact here, not in a component.

export const CALENDLY = "https://calendly.com/maxwexley-wexadvisory/30min";

export const META = {
  title: "Automated Reporting for Small Businesses | Report Automation | Wex Advisory",
  description:
    "Automated reporting for small businesses: the report your team rebuilds by hand, built once, run on its own, with an AI summary. Most builds $1,000 to $4,000.",
};

export const HERO = {
  eyebrow: "Automated reporting · for small and mid-sized businesses",
  h1: "Automated reporting",
  h1Accent: "for the report someone rebuilds by hand.",
  sub: "Owners, finance, ops and sales teams send me the report they rebuild every week or month. I build it once so it runs on its own: data pulled from your tools, a plain-English summary of what changed on top, delivered by email, PDF or Excel. $200/hr, with a written estimate before any work starts.",
  proof: "Built for a 5-location coworking operator and a wholesale + DTC brand.",
};

export const ANSWER_BLOCK =
  "Automated reporting means a report someone builds by hand every week or month is built once and then runs on its own: the data is pulled from the tools you already use, checked, summarized in plain English and delivered by email, PDF or Excel. I build these for small and mid-sized businesses at $200/hr. Most reporting builds take 5 to 20 hours, so $1,000 to $4,000, with a written estimate before any work starts.";

export type Example = {
  team: string;
  title: string;
  client: "25N Coworking" | "RECO" | null;
  illustrative: boolean;
  before: string[];
  after: string[];
  delivery: string;
  image?: "/projects/25n-dashboard-blurred.png" | "/projects/reco-dashboard-blurred.png";
};

export const EXAMPLES: readonly Example[] = [
  {
    team: "Finance",
    title: "Month-end close for a 5-location coworking operator",
    client: "25N Coworking",
    illustrative: false,
    before: ["Month-end close reconciled by hand in Excel", "Repeated for each of 5 locations"],
    after: [
      "GL export arrives by email and is checked against the rules automatically",
      "Finance dashboard refreshed daily with GL and occupancy",
      "PDF and Excel close packet built for every location",
      "A short key insight written at the top each day",
    ],
    delivery: "Dashboard, PDF and Excel packets",
    image: "/projects/25n-dashboard-blurred.png",
  },
  {
    team: "Sales",
    title: "Wholesale pipeline for a two-founder brand",
    client: "RECO",
    illustrative: false,
    before: [
      "119 wholesale accounts and 2,500+ sales leads lived in a Google Sheet",
      "No engineering staff to build anything better",
    ],
    after: [
      "One live dashboard with every account and lead",
      "Live Shopify sync",
      "5 automated agents",
      "A daily priority digest by email",
    ],
    delivery: "Live dashboard and a daily email digest",
    image: "/projects/reco-dashboard-blurred.png",
  },
  {
    team: "Accounting",
    title: "Monthly financials for the founders",
    client: "RECO",
    illustrative: false,
    before: [
      "The monthly numbers lived only in a founder's Excel file",
      "Shared by email or by opening the file",
    ],
    after: [
      "He uploads the file on the dashboard's finance tab",
      "Checked automatically: required sheets present, balance sheet balances, no missing months",
      "A preview of new and revised months, then publish",
      "Every upload kept for one-click rollback",
    ],
    delivery: "Finance tab on the live dashboard",
  },
  {
    team: "Operations",
    title: "Weekly project status for a services firm",
    client: null,
    illustrative: true,
    before: [
      "A manager copies status from the project tracker into a document",
      "Chases missing updates by email",
      "Sends the summary every Monday",
    ],
    after: [
      "Status pulled from the tracker automatically",
      "Overdue items and blockers flagged",
      "A plain-English summary written on top",
      "Delivered to the leadership inbox every Monday morning",
    ],
    delivery: "Email, with a PDF attached",
  },
];

export const AI_SUMMARY_SAMPLE = {
  business: "Sample summary for a fictional three-location clinic",
  lines: [
    "Revenue rose on last week, almost all of it at the Eastside location.",
    "No-shows jumped at Midtown midweek. Both days had a new scheduler on shift.",
    "Two invoices more than two months overdue are now the largest open items. Worth a call this week.",
  ],
};

// Own H2 for the "automated financial reporting" phrase (140 searches/mo).
// Facts from the 25N and RECO case studies on /work and the spec.
export const FINANCIAL = {
  h2: "Automated financial reporting",
  body: [
    "Finance is where most hand-built reports live: the month-end close, budget against actual, the packet that goes to the owner or the board. Automated financial reporting takes the exports your accounting system already produces and turns them into those reports on a schedule, checked before anyone reads them.",
    "At 25N Coworking, a GL dashboard put every location's P&L in one place, with revenue and NOI against budget, month-over-month variance flags, a six-month trend and a plain-English summary for each location whenever new data landed. A GL check flagged entries that broke per-account rules before the close, and a month-end packet (income statement against budget, balance sheet, cash flow, AR and AP aging) was generated for every location as PDF and Excel.",
    "At RECO, the founders' own monthly Excel model feeds the dashboard's finance tab, and a month is published only when its balance sheet balances.",
  ],
};

export const STEPS: readonly { title: string; body: string; output: string }[] = [
  {
    title: "Send me the report",
    body: "A screenshot or a description is enough: what it shows, who reads it, where the data comes from.",
    output: "What I'd automate, and a written estimate.",
  },
  {
    title: "Connect the sources",
    body: "I connect the tools and files the report draws on, so nobody copies data by hand.",
    output: "Data pulled automatically and checked before it's used.",
  },
  {
    title: "Build the report and summary",
    body: "The report builds itself on your schedule, with a plain-English summary of what changed and why at the top.",
    output: "The first automated report, delivered where you already read it.",
  },
  {
    title: "Hand off",
    body: "Your team learns to run it without me, and I stay on call for changes.",
    output: "A recorded one-hour walkthrough, a written guide and a quarterly refresher.",
  },
];

export const TOOLS_SHIPPED: readonly string[] = [
  "Excel",
  "Google Sheets",
  "QuickBooks",
  "Shopify",
  "Yardi GL exports",
  "Emailed exports (Gmail)",
  "Notion",
];

export const TOOLS_SIMILAR: readonly string[] = ["HubSpot", "Salesforce", "Xero", "Slack"];

export const DELIVERY: readonly { label: string; status: "shipped" | "can-do" }[] = [
  { label: "Email", status: "shipped" },
  { label: "PDF", status: "shipped" },
  { label: "Excel", status: "shipped" },
  { label: "Live dashboard", status: "shipped" },
  { label: "Slack", status: "can-do" },
];

export const PRICING = {
  build: "$200/hr",
  maintenance: "$150/hr",
  typical: "5 to 20 hours, so $1,000 to $4,000",
  retainer: "Retainer varies by project and is quoted up front.",
  estimate: "Written estimate before any work starts.",
} as const;

export const SEND_A_REPORT = {
  heading: "Send me one report",
  body: "Tell me about one report your team builds by hand. I read every one myself and reply within 24 hours with how I'd automate it. A description is enough; leave out any sensitive numbers.",
  messageLabel: "Which report do you build by hand?",
  messagePlaceholder: "What it shows, who reads it, where the data comes from. No sensitive numbers needed.",
};

export const FAQS: readonly { q: string; a: string }[] = [
  {
    q: "Which tools can you pull data from?",
    a: "In client work I've connected Excel, Google Sheets, QuickBooks, Shopify, Yardi GL exports, emailed exports and Notion. Anything that exports a file or has an API, like HubSpot, Salesforce or Xero, can usually be connected too.",
  },
  {
    q: "How much does automated reporting cost?",
    a: "$200/hr to build, and most reporting builds land between $1,000 and $4,000. Maintenance after launch is $150/hr, and a retainer varies by project. You get a written estimate before any work starts.",
  },
  {
    q: "How long does it take?",
    a: "Most reporting builds take 5 to 20 hours of work. At 25N Coworking the first working delivery came 9 hours after kickoff.",
  },
  {
    q: "What if our data is messy?",
    a: "That's normal. The data is checked before anything is built on it, and the report flags problems instead of hiding them. RECO's finance tab, for example, won't publish a month unless the balance sheet balances.",
  },
  {
    q: "Does my team have to change how it works?",
    a: "No. The report arrives where people already look, by email, PDF or Excel, so readers don't need a new login. The person who used to build it gets that time back.",
  },
  {
    q: "Who maintains it after launch?",
    a: "I do, at $150/hr when something needs changing. Every build also comes with a recorded walkthrough and a written guide so your team can run it.",
  },
];
