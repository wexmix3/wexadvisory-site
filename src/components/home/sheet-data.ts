// SAMPLE data for the homepage hero sheet (SheetHero). Invented, not RECO's
// numbers; the sheet chrome and every tile say "Sample data". Today is taken as 10/29, so
// the wholesale "days since last order" figures match the dates below.

export type Source = "Wholesale" | "Shopify" | "Amazon" | "QuickBooks";

export type SheetRow = {
  date: string;
  source: Source;
  ref: string;
  detail: string;
  amount: string;
  note: string;
};

// Messy order, mixed date and money formats, as people actually keep them.
export const ROWS: SheetRow[] = [
  { date: "2026-10-27", source: "Shopify", ref: "#4471", detail: "2x Starter Kit", amount: "$118.00", note: "paid" },
  { date: "9/2", source: "Wholesale", ref: "ACCT-019", detail: "Harbor Provisions", amount: "1860", note: "no reorder 57d" },
  { date: "Oct 24", source: "Amazon", ref: "Payout", detail: "Settlement 10/10-10/24", amount: "$3,412.66", note: "deposited" },
  { date: "10/21", source: "QuickBooks", ref: "Exp", detail: "Packaging, Uline", amount: "($642.10)", note: "uncategorized" },
  { date: "2026-10-28", source: "Shopify", ref: "#4475", detail: "Refill x3", amount: "$87.00", note: "refund?" },
  { date: "8/29", source: "Wholesale", ref: "ACCT-044", detail: "Fern & Co. Grocers", amount: "$2,310", note: "call??" },
  { date: "10/26", source: "Shopify", ref: "#4472", detail: "Gift Set", amount: "$64.00", note: "paid" },
  { date: "10/18", source: "QuickBooks", ref: "Exp", detail: "3PL storage Oct", amount: "(1,180.00)", note: "" },
  { date: "Sep 14", source: "Wholesale", ref: "ACCT-007", detail: "Northside Co-op", amount: "$940.00", note: "no reorder 45d" },
  { date: "10/10", source: "Amazon", ref: "Payout", detail: "Settlement 9/26-10/10", amount: "2,987.40", note: "" },
  { date: "9/20", source: "Wholesale", ref: "ACCT-031", detail: "Pine St. Pantry", amount: "$1,125.00", note: "last order 39d" },
  { date: "10/25", source: "QuickBooks", ref: "Exp", detail: "Meta ads", amount: "($1,450.00)", note: "check w/ CPA" },
];

// Grouping order the sheet sorts into. Wholesale feeds tile 1, Shopify +
// Amazon feed tile 2, QuickBooks feeds tile 3, so each tile's rows are
// contiguous after the sort.
const GROUP_ORDER: Source[] = ["Wholesale", "Shopify", "Amazon", "QuickBooks"];

// sortedIndex[i] = where messy row i lands after the sort (stable).
export const SORTED_INDEX: number[] = (() => {
  const order = ROWS.map((r, i) => ({ i, g: GROUP_ORDER.indexOf(r.source) })).sort(
    (a, b) => a.g - b.g || a.i - b.i
  );
  const out = new Array<number>(ROWS.length);
  order.forEach((o, pos) => {
    out[o.i] = pos;
  });
  return out;
})();

// Which sorted rows each tile grows out of: [first sorted index, row count].
export const TILE_GROUPS: [number, number][] = [
  [0, 4],
  [4, 5],
  [9, 3],
];

// Small x offsets so the sheet starts visibly scattered; they settle to 0 as
// the rows sort.
export const JITTER = [-10, 14, -4, 9, -14, 6, 12, -8, 3, -12, 8, -5];

export const WHOLESALE_CALLS = [
  { name: "Fern & Co. Grocers", days: 61 },
  { name: "Harbor Provisions", days: 57 },
  { name: "Northside Co-op", days: 45 },
  { name: "Pine St. Pantry", days: 39 },
];

export const CHANNELS = [
  { name: "Shopify", value: 4820, label: "$4,820" },
  { name: "Amazon", value: 3413, label: "$3,413" },
  { name: "Wholesale", value: 2310, label: "$2,310" },
];

export const BOOKS = [
  { label: "Revenue", value: "$10,543" },
  { label: "Cost of goods", value: "$6,220" },
  { label: "Gross profit", value: "$4,323" },
];
