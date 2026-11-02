// The /solutions topics and the plan's prices, shared by the page, the topic
// select on its form and /api/contact (which whitelists these ids; anything
// else is ignored). Added 2026-11-02 with the solutions + pricing change.
//
// Prices: source of truth is the canonical pricing copy in the aios worksheet
// state/worksheets/solutions-pricing-2026-11-02.md and ai-audit
// lib/proposal/terms.ts. Change them there and here together. Never write
// "retainer", "fixed fee", "billed hourly" or "as needed" in copy.
export const SETUP_FEE_USD = 1000;
export const MONTHLY_FEE_USD = 300;
export const MONTHLY_INCLUDED_HOURS = 2;
export const EXTRA_HOUR_USD = 150;
export const TRAINING_HOUR_USD = 200;
export const TRIAL_DAYS = 30;
export const MIN_TERM_MONTHS = 3;

// One line for the four plan solutions; the free check says "Free".
export const PLAN_PRICE_LINE = `Free ${TRIAL_DAYS} days, then $${SETUP_FEE_USD.toLocaleString("en-US")} setup + $${MONTHLY_FEE_USD}/mo`;

export const SOLUTION_TOPICS = [
  { id: "daily-priorities", label: "Your day's priorities" },
  { id: "numbers", label: "All your numbers in one place" },
  { id: "close-the-month", label: "Close the month" },
  { id: "found", label: "Get found on Google and in AI answers" },
  { id: "lost-money", label: "Find the money you're losing" },
  { id: "team-answers", label: "Team answers" },
  { id: "something-else", label: "Something else" },
] as const;

export type SolutionTopic = (typeof SOLUTION_TOPICS)[number]["id"];

export function topicLabel(id: unknown): string | null {
  return SOLUTION_TOPICS.find((t) => t.id === id)?.label ?? null;
}
