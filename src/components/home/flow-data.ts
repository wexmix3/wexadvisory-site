// SAMPLE data for the homepage hero (HeroFlow), 2026-11-06. Invented, not
// RECO's numbers; both windows say "Sample data". Eight rows, each tagged with
// the tile it feeds, so every number on the dashboard is the sum of rows a
// visitor can read. Today is taken as 10/29, so "days since last order" matches
// the dates.
export const usd0 = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

export type Dest = "sales" | "calls" | "books";

export type FlowRow = {
  date: string;
  source: "Shopify" | "Amazon" | "Wholesale" | "QuickBooks";
  detail: string;
  amount: string;
  value: number;
  dest: Dest;
  days?: number; // wholesale: days since the last order
  flag?: string; // books: why it needs a look
};

export const FLOW_ROWS: FlowRow[] = [
  { date: "10/27", source: "Shopify", detail: "Order #4471, 2x Starter Kit", amount: "$118.00", value: 118, dest: "sales" },
  { date: "9/02", source: "Wholesale", detail: "Harbor Provisions", amount: "$1,860.00", value: 1860, dest: "calls", days: 57 },
  { date: "10/24", source: "Amazon", detail: "Payout 10/10-10/24", amount: "$3,412.66", value: 3412.66, dest: "sales" },
  { date: "10/21", source: "QuickBooks", detail: "Packaging, Uline", amount: "($642.10)", value: 642.1, dest: "books", flag: "uncategorized" },
  { date: "8/29", source: "Wholesale", detail: "Fern & Co. Grocers", amount: "$2,310.00", value: 2310, dest: "calls", days: 61 },
  { date: "10/28", source: "Shopify", detail: "Order #4475, Refill x3", amount: "$87.00", value: 87, dest: "sales" },
  { date: "10/25", source: "QuickBooks", detail: "Meta ads", amount: "($1,450.00)", value: 1450, dest: "books", flag: "check w/ CPA" },
  { date: "9/14", source: "Wholesale", detail: "Northside Co-op", amount: "$940.00", value: 940, dest: "calls", days: 45 },
];

export const DEST_LABEL: Record<Dest, string> = { sales: "Sales", calls: "Calls", books: "Books" };

// Dashboard figures from the first `fed` rows (all rows when fed is omitted).
export function flowTotals(fed = FLOW_ROWS.length) {
  const rows = FLOW_ROWS.slice(0, fed);
  const of = (d: Dest) => rows.filter((r) => r.dest === d);
  const channel = (s: FlowRow["source"]) => of("sales").filter((r) => r.source === s).reduce((t, r) => t + r.value, 0);
  return {
    sales: of("sales").reduce((t, r) => t + r.value, 0),
    channels: [
      { name: "Amazon", value: channel("Amazon") },
      { name: "Shopify", value: channel("Shopify") },
    ],
    calls: of("calls").sort((a, b) => (b.days ?? 0) - (a.days ?? 0)),
    books: of("books"),
    spend: of("books").reduce((t, r) => t + r.value, 0),
  };
}

export const SALES_MAX = flowTotals().channels.reduce((m, c) => Math.max(m, c.value), 1);
