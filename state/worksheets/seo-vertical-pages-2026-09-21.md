# Worksheet: SEO vertical pages (property management, ecommerce, employee training)

**Date:** 2026-09-21 · **Branch:** `seo/vertical-pages` (off master `ea5127a`) · **Status:** PREVIEW ONLY. NOT merged, NOT deployed to production.
**Code commit:** `a5233e7` · **Tag:** `work/seo-vertical-pages` (on the commit that adds this worksheet)

## Goal

Target three keywords from DataForSEO US data (2026-09-21):

- NEW `/ai-for-property-management` → "ai for property management" (590/mo, KD 12)
- Retarget `/ai-ops-dashboard-for-ecommerce-brands` → "ai for ecommerce" (1,900/mo, KD 26), which currently ranks around position 153. The URL is kept.
- Retarget `/ai-training-for-small-businesses` → "ai training for employees" (320/mo, KD 3). The URL is kept.

Rules followed: only facts already on the site (coworking page, /work, sibling pages), no em dashes, no AI-tell words, the sibling page structure and components, and FAQPage JSON-LD built from the same `FAQS` array the page renders.

## Before / after

| Page | Field | Before | After |
|---|---|---|---|
| /ai-for-property-management | Title | (new page) | AI for Property Management \| Wex Advisory (41) |
| | Meta | (new page) | AI for property management: a live P&L dashboard across every property, month-end packets that build themselves, and occupancy next to the numbers. (147) |
| | H1 | (new page) | AI for property management: every property's numbers, without the spreadsheet marathon |
| /ai-ops-dashboard-for-ecommerce-brands | Title | AI Ops Dashboard for Wholesale & DTC E-Commerce Brands \| Wex Advisory (69) | AI for Ecommerce: Ops Dashboard and Agents \| Wex Advisory (57) |
| | Meta | Unify wholesale accounts, Shopify orders, and sales leads into one AI-powered ops dashboard. No engineering team required. See a real build + free AI Audit. (156) | AI for ecommerce operations: one dashboard for wholesale accounts, Shopify orders and leads, plus agents that catch the follow-ups. See a real build. (149) |
| | H1 | One dashboard for wholesale accounts, DTC orders, and every lead in between no engineering team required | AI for ecommerce operations: one dashboard, no engineering team required |
| /ai-training-for-small-businesses | Title | AI Training for Small Businesses \| Wex Advisory | AI Training for Employees \| Wex Advisory (40) |
| | Meta | Live AI training and workshops for small business teams. Hands-on sessions on the tools you actually use, $200/hour, scoped to your stack. No slide decks. (154) | AI training for employees at small businesses. Live, hands-on sessions on the tools your team already uses, $200/hour, scoped to your stack. (140) |
| | H1 | AI training for small businesses, taught on the tools you actually use | AI training for employees, taught on the tools they actually use |

## What changed

- **New `/ai-for-property-management`** is a copy of the `/ai-for-coworking-spaces` structure, with sections for signs, what gets built (4 cards), a case study, how I help, FAQ, AboutFounder and ServiceCTA.
  - Proof point: 25N Coworking. It is already named on the coworking page and on /work. Every fact is reused from those pages: 5 locations in Chicago/DFW, Yardi GL exports emailed daily, the GL rules check, per-location PDF+Excel packet, daily occupancy with backfill and month-end lock, the AI summary per location, and the competitive analysis delivered in 9 hrs.
  - A FAQ answer is honest that coworking is the deepest real estate work so far.
  - H2s: "What AI for property management looks like in practice" and "Questions about AI for property management".
  - The page has 5 FAQs, a Service JSON-LD, and in-body links to /audit, /ai-consulting-for-small-businesses and /ai-for-coworking-spaces.
- **Ecommerce page**
  - Title, meta, OG, eyebrow, H1 and hero copy (now first person) updated. Signs H2 is now "Signs your ecommerce ops need more than a spreadsheet".
  - NEW section with H2 "What AI for ecommerce looks like in practice": 2 paragraphs plus 4 cards (ops dashboard, approve-to-send priority queue, agents, QuickBooks finance). All facts come from the RECO case study on /work.
  - FAQ H2 is now "Questions about AI for ecommerce". The FAQ was rewritten to 5 Qs: 3 kept and tightened, 2 new ones (the storefront chatbot question, and approve-before-send, which comes from /work).
  - The "Do you only work with e-commerce brands?" Q was dropped.
  - New cross-link line to /audit and the consulting page. The Service JSON-LD name is now "AI for Ecommerce Operations", with the old name kept as alternateName.
  - Section backgrounds were re-alternated for the new section.
  - The client is still unnamed on this page, as before. /work names RECO.
- **Training page**
  - Title, meta, OG, H1 and hero updated. H2s: "Two formats of AI training for employees" and "How AI training for employees works". The FAQ H2 is now "Questions about AI training for employees".
  - The FAQ was rewritten to 5 Qs using only existing facts: $200/hour, no per-seat fee, non-technical staff, docs and recording handoff, consulting vs training.
  - Service JSON-LD name is now "AI Training for Employees", with alternateName "AI Training for Small Businesses".
  - The existing links to /audit and the consulting page are kept.
- **Listings:** `sitemap.ts` has the new URL (priority 0.7). The Footer has "AI for Property Management" next to "AI for Coworking". The /audit close-section link list (`AuditGuide.tsx`) has "AI for property management".

## Verification evidence

- `npx tsc --noEmit` exited 0. `npm run build` passed with 20/20 static pages, including `/ai-for-property-management`.
- Ran `next start -p 3108` locally and parsed each page with a Python script:
  - All 3 returned 200 with the titles, metas and H1s in the table above. Canonicals are correct.
  - 3 JSON-LD blocks per page, all passing `json.loads`. Each FAQPage has 5 Qs.
  - 0 em dashes and 0 en dashes in the rendered HTML.
  - Each page has 5-6 `/audit` links and 2 consulting-page links.
  - The sitemap includes the new URL, and /audit links to it.
- Grep over the 3 page files for unlock / leverage / seamless / delve / fast-paced / em dash: no hits.
- Playwright screenshots at 1280 and 390 for all 3 pages. `scrollWidth == clientWidth` at both widths, so there's no horizontal scroll. Visual check: the new page and the new ecommerce section render in the sibling design system.
- The local server was stopped by PID (6392, confirmed as `next start -p 3108` via Get-CimInstance). No `/IM` kill.
- Vercel preview (SSO-protected): https://wex-advisory-eex9j4erf-max-wexleys-projects.vercel.app (branch alias https://wex-advisory-git-seo-vertical-pages-max-wexleys-projects.vercel.app). `vercel inspect` shows target preview, status Ready.
  - `vercel curl` returned 200 for all 3 pages. Title, meta and H1 match local, JSON-LD parses, and the sitemap contains the new URL.
  - Note for Git Bash: set `MSYS_NO_PATHCONV=1`, or `vercel curl /path` gets rewritten to `/C:/Program Files/Git/path`.

## Remaining scope

1. Max reviews the copy on the preview, especially the FAQ wording and the property page's framing of 25N as real estate work.
2. Merge to master, which deploys to production. This needs Max's approval.
3. After deploy, request indexing in the GSC UI for all three URLs. The GSC MCP `submit_url_for_indexing` fails with "Indexing API not enabled", so the manual Request Indexing button is the path. Recheck positions in 2-4 weeks.
4. Not done, flagged:
   - The ecommerce and training pages are still not in the Footer. The footer only lists consulting, solutions, integration and the industry pages. Only the new page was added.
   - `layout.tsx` OfferCatalog still calls training "AI Workshops & Team Training".

## Open risks

- Changing the ecommerce H1/title away from "AI ops dashboard" may cost the small amount of long-tail traffic for that phrase. The URL and the Service alternateName keep the association.
- "ai for ecommerce" (KD 26) is broader intent than this operations-focused page. It may land on related queries before the head term.
- The property management proof point is a coworking operator. Searchers wanting residential PM tooling (tenant screening, maintenance requests) aren't served by this page.
