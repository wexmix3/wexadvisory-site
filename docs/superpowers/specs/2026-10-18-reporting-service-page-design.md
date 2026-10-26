# Reporting service page: design

Date: 2026-10-18. Status: draft for Max's approval (builder check done, Max's answers folded in). Nothing gets built until he approves this document.

## Intent and the why

wexadvisory.com has no page for reporting work. The homepage "Reporting" problem card ("Nobody trusts the numbers until Friday.") currently links to `/ai-ops-dashboard-for-ecommerce-brands`, which is about ecommerce, so a visitor with a reporting problem lands somewhere that isn't about them. Reporting is also the work Max has the most proof for (25N's month-end close, RECO's finance tab and daily digest) and fits his finance background.

The page sells one job: **take a report someone builds by hand every week or month and make it run itself.** The system pulls the data from the tools the business already uses, does the analysis, writes a plain-English summary of what changed and why, and delivers the result where people already look.

## Who it's for (Max's answer)

Anyone who pulls data together and reports it up to an executive or team lead: owners, finance, ops, sales, legal, accounting. Not only finance, and not only the CFO. The copy must not assume a job title. It speaks to "the person who builds the report" and "the person who reads it".

## Goals

1. A visitor with a recurring manual report recognizes their problem in the first screen, whatever their department.
2. They see real proof that Max has done this, across more than one team.
3. They know the price before talking to anyone.
4. They have a low-commitment next step (send one report) and a high-commitment one (book a 30-minute call).
5. The page can rank and be quoted by AI answer engines for "automated reporting" / "report automation" / "automate reports".

## Non-goals

- No clickable demo dashboard in v1 (Max: screenshots for now; revisit if the page gets traffic).
- Not a software product page. Max builds systems; he is not selling a reporting tool. Avoid "ai report generator" positioning even though it has the most searches (390/mo), because those searchers want self-serve software.
- No new design language. It uses the homepage system shipped 2026-10-18.

## Anti-goals (a technically working page that would still be a failure)

- Any invented number: client outcomes, hours saved, or prices beyond the facts below.
- Implying a tool integration is done when it hasn't been (e.g. HubSpot, Slack).
- Reading as finance-only, or as a 25N page. 25N is one example among several, not the flagship (Max: "No" to 25N as flagship).
- Exposing client data: screenshots stay blurred, as on the homepage.
- Contradicting published pricing anywhere (the old "No hourly rates" FAQ bug).

## Facts the page may use (source of truth)

- Pricing: $200/hr new builds; $150/hr maintenance after launch; retainer varies by project; written estimate before any work starts. **Most reporting builds take 5 to 20 hours, so $1,000 to $4,000** (Max, 2026-10-18).
- Calls: free, 30 minutes, Calendly `https://calendly.com/maxwexley-wexadvisory/free-strategy-call`.
- Proof line: the systems Max runs for clients offset the work of 1 to 3 full-time staff (per client).
- Handoff with every build: recorded one-hour walkthrough, written guide, quarterly refresher.
- 25N Coworking (named client): 5-location coworking operator, Chicago + Dallas-Fort Worth. Month-end close was manual Excel reconciliation across five locations. Built: GL export arrives by email and is checked against rules automatically; live finance dashboard with daily GL + occupancy refresh; PDF + Excel close packet per location; dashboard carries a "Today's key insight" line. First delivery 9 hours after kickoff.
- RECO (named client, wholesale + DTC brand, two founders, no engineering staff): 119 wholesale accounts and 2,500+ sales leads lived in a Google Sheet. Built one live dashboard, live Shopify sync, 5 automated agents, a daily priority digest by email. RECO's finance tab is fed by a founder's monthly Excel financial model: he uploads the file on the tab, it is checked automatically before anything goes live (required sheets present, balance sheet balances, no missing months), a preview of new and revised months is shown, then he publishes; every upload is kept for one-click rollback and Max is emailed on each upload. (A QuickBooks sync was built and ran live from 2026-08-30, then was switched off at the founders' request because their books in QuickBooks were inaccurate.) Quote (attribute "Co-Founder, RECO" until Max supplies the name): "We were operating out of a Google Sheet, but now we have systems and tools in place to ensure we are organized, efficient, and making the right decisions every day."
- Tools actually connected in client work (may be named as done): Excel, Google Sheets, QuickBooks, Shopify, Yardi GL exports, emailed exports (Gmail), Notion. Anything else (HubSpot, Salesforce, Xero, Slack) only as "and similar" / "can connect", never as shipped.

## Decisions Max made

| Topic | Decision |
|---|---|
| Buyer | Anyone who reports data up to an exec or team lead, any department |
| Scope | Any "take data, derive analysis, report to a lead" work, not just finance |
| 25N as flagship | No |
| Examples | 3-4 short before/after examples across teams |
| Price range | Yes: 5-20 hours, $1,000-$4,000 |
| Lead magnet | Yes: "Send me one report you build by hand, I'll reply with how I'd automate it" |
| AI summaries | Yes: highlight the plain-English "what changed and why" summary |
| Tools named | Yes, with the done/not-done rule above |
| Delivery | Yes: reports land in email, PDF, Excel (Slack as "can do") |
| Live demo | No, screenshots for v1 |
| URL | `/automated-reporting` (Max, after the volume check below) |
| RECO accounting Before | Before the finance tab, the monthly numbers lived only in a founder's Excel file, shared by email or by opening the file (Max) |
| Report-form auto-reply | Yes: messages from "Send me one report" get their own auto-reply and a tagged subject in Max's inbox (Max) |

## Keyword data (DataForSEO Google Ads, US, 2026-10-18, run cost $0.09)

| Monthly searches | Competition | Phrase |
|---|---|---|
| 390 | medium | ai report generator (software intent, not targeted) |
| 320 | low | automated reporting |
| 320 | low | report automation |
| 320 | low | automate reports |
| 140 | low | automated financial reporting |
| 140 | medium | ai reporting tool |
| 90 | low | small business reporting |
| 90 | low | dashboard for small business |
| 70 | low | automated reporting software |
| 50 | low | automate excel reports |
| 0 | - | automated reporting for small business |

**Decided (Max, 2026-10-18):** URL `/automated-reporting`, title "Automated Reporting for Small Businesses | Report Automation | Wex Advisory", H1 built around "automated reporting". The exact planned phrase has zero searches; the three 320/mo low-competition phrases are near-synonyms one page can serve. "Automated financial reporting" (140) gets its own H2 section. The URL breaks the `-for-small-businesses` naming pattern of the other service pages; that pattern has no SEO value on its own.

## Page structure (Claude's call, in the homepage design system)

Same building blocks and tokens as the 2026-10-18 homepage (dark navy `#0A1226`, gold `#C8A84B`, glass panels, eyebrow before every heading, ScrollReveal, one solid gold button per screen, first-person "I", no em dashes). Reuse the homepage patterns rather than new ones: `src/components/home/*` (OutcomeStrip, BeforeAfter, ProblemPicker, Pricing, Founder) and `src/components/homepage-v3/*` (Methodology, CloseSection).

1. **Hero.** Eyebrow "Automated reporting · for small and mid-sized businesses". H1 along the lines of "The report someone builds by hand every week, built once and run automatically." (final wording is the builder's, must contain "automated reporting" or "report automation" in the H1 or the first sentence). Subhead names the buyer broadly (owners, finance, ops, sales) and states $200/hr with a written estimate. Primary CTA "Book a 30-minute call"; secondary "Send me one report" (anchors to the lead-magnet form). Proof line: "Running today at a 5-location coworking operator and a wholesale + DTC brand."
2. **Answer block** (for AI answer engines and the 140/mo finance phrase): two or three plain sentences defining automated reporting and what it costs here ($1,000-$4,000 for most builds, 5-20 hours at $200/hr), directly under the hero. Mirrors the TL;DR pattern that got First Movers cited in the AI Overview.
3. **"What it looks like" examples**: 4 before/after cards, each with team label, Before (the manual steps), After (what runs automatically), and the delivery format.
   - Finance: 25N month-end close (real, named).
   - Sales: RECO wholesale pipeline and daily priority digest (real, named).
   - Accounting: RECO's monthly financial model. Before: the numbers lived only in a founder's Excel file, shared by email or by opening the file. After: he uploads the file on the dashboard's finance tab, it is checked automatically (balance sheet balances, no missing months) and previewed before it publishes, every upload kept for rollback (real, named; do not mention QuickBooks in this example).
   - Ops or legal: one illustrative example, visibly labeled "Example" (e.g. a weekly matter-status or project-status report compiled from a tracker and email). Builder may pick ops or legal; it must carry no invented figures.
   Use the two existing blurred screenshots (`public/projects/25n-dashboard-blurred.png`, `reco-dashboard-blurred.png`) on the real examples.
4. **The AI summary**: one section showing what the plain-English summary on top of a report looks like. Use a clearly labeled sample (fictional business, no client data), modeled on 25N's "Today's key insight" line. Static HTML, not an image.
5. **How it works** with Output lines (same component pattern as homepage Methodology): Send me the report (output: what I'd automate and an estimate) → Connect the sources (output: data pulled automatically) → Build the report and summary (output: the first automated report, delivered where you read it) → Hand off (output: recorded walkthrough, written guide, quarterly refresher).
6. **Tools I connect**: chips for the done list; a muted line "and similar tools: HubSpot, Salesforce, Xero, Slack, or anything that exports a file or has an API". Delivery formats listed: email, PDF, Excel, live dashboard, Slack (can do).
7. **Pricing**: $200/hr build, "most reporting builds: 5 to 20 hours, $1,000 to $4,000", $150/hr maintenance, retainer varies, written estimate first. Link to the consulting page for market ranges.
8. **Lead magnet: "Send me one report"** (id `send-a-report`): short copy (what to send, what you get back, "I read every one myself, reply within 24 hours"), then the existing `ContactForm` with reporting-specific label and placeholder for the message field and `source="reporting"`. Note in copy that a description is fine, and to not paste sensitive data. No file upload in v1 (the form has none; adding uploads means storage and a security review).
9. **FAQ** (4-6 Qs, FAQPage JSON-LD): what tools, how long, cost, do I need to change how my team works, what if the data is messy, who maintains it. Answers must match the Facts section word for word on prices.
10. **Close**: reuse the homepage `CloseSection` (booking card + contact form) or a lighter booking-only band if the form already appeared in section 8 (builder's call; never two contact forms on one page).

## Site wiring

- Homepage `src/components/home/ProblemPicker.tsx`: Reporting card href → the new URL.
- `src/components/Footer.tsx`: add the page to the link list.
- `src/lib/site-pages.ts`: add the entry so the sitemap and llms.txt pick it up (check how other pages register).
- `src/app/llms.txt/route.ts`: confirm the page appears with a one-line description.
- Link to the page from `/ai-consulting-for-small-businesses` and `/work` where reporting is mentioned (one natural link each).
- Metadata: canonical `https://www.wexadvisory.com/<url>`, OG/Twitter via `/api/og` like other service pages, `Service` + `FAQPage` JSON-LD, one H1.

## Constraints

- Next.js 14 App Router; page at `src/app/<url>/page.tsx`, server component, all copy server-rendered.
- `ContactForm` gets optional props for the message label/placeholder and a `source` string (defaults keep the homepage form exactly as it is today). The payload becomes `{name, company, email, message, source?}`.
- `/api/contact` (shared with the homepage; fixed and redeployed 2026-10-18 as master 0cbc740) accepts an optional `source` from a fixed allowlist (`"reporting"`; anything else is ignored). For `reporting`: subject tagged `[Reporting] New inquiry from …`, and a reporting auto-reply: thanks, I'll reply within 24 hours with how I'd automate it; if you can, reply with a screenshot or export of the report with sensitive numbers removed, and where its data comes from; 30-minute call link. Without `source`, behavior is exactly today's. Test with sending mocked (no real email), as done for the 0cbc740 fix; Max may send one real test himself.
- Body text ≥ white/70, labels ≥ white/60; standalone tap targets ≥ 44px; no horizontal scroll at 375px (the `main { overflow-x: clip }` rule already covers reveals).
- Word count: aim for 1,500-2,500 words of real content; the pages Google cited for the consulting query ran 2,800+, but padding is an anti-goal.

## Verification (before Max reviews on localhost)

- tsc 0 errors, `next build` passes.
- Fresh-context reviewer on the diff; fresh-context verifier: page renders all sections, links 200, anchors exist, form POST intercepted (never sent), JSON-LD parses, banned strings 0 ("no hourly rates", "fixed fee", "no retainer", "by night"), no invented numbers (every figure on the page traceable to the Facts section), 375px no sideways scroll, tap targets.
- Reference comparison against the live homepage sections it reuses (consistency, not a new reference).
- Max clicks through on localhost; deploy only on his go.

## Left to the builder

Exact headline and section copy (within the facts and rules above), which of ops/legal to use for the illustrative example, icon choice (lucide-react, already installed, used sparingly), whether the close is a full CloseSection or a booking band, and component reuse versus small new components under `src/components/reporting/`.

## Open questions

None. All builder-check questions were answered by Max on 2026-10-18.
