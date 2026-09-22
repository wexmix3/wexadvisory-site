# Worksheet: SEO retarget of /audit and /ai-consulting-for-small-businesses

**Date:** 2026-09-21 · **Branch:** `seo/audit-and-consulting-retarget` (NOT merged, NOT deployed to production)
**Code commit:** `a797a26` · **Tag:** `work/seo-audit-consulting-retarget` (on the commit that adds this worksheet)

## Goal

Retarget two pages at keywords that have real volume, based on DataForSEO US data pulled
2026-09-21 and 90 days of GSC data. GSC showed 0 clicks. /audit had the most impressions
(68 at position 66), and its top query was "ai opportunity audit", which has no real volume.

- `/audit` → "ai audit" (1,300/mo, KD 19) + "ai readiness assessment" (720/mo, KD 13)
- `/ai-consulting-for-small-businesses` → "ai consultant for small business" (590/mo, KD 0), currently around position 73

## Before / after

### /audit

| Field | Before | After |
|---|---|---|
| Title | AI Opportunity Audit: Free AI Audit for Small Business \| Wex Advisory (69 chars) | Free AI Audit and AI Readiness Assessment \| Wex Advisory (56) |
| Meta description | The AI Opportunity Audit is a free report for small businesses: 5 AI maturity scores, automation opportunities ranked by annual savings, and the labor math behind each. PDF in minutes. (184) | A free AI audit and AI readiness assessment for small businesses. Five maturity scores, plus automation ideas ranked by annual savings. PDF in minutes. (151) |
| H1 | AI Opportunity Audit: see exactly where AI saves a business money. | Free AI audit: see exactly where AI saves a business money. |

### /ai-consulting-for-small-businesses

| Field | Before | After |
|---|---|---|
| Title | AI Consulting for Small Businesses \| Wex Advisory | AI Consultant for Small Business \| Wex Advisory (47) |
| Meta description | AI consulting for small businesses without the enterprise price tag. Hands-on automation and a free AI Audit: no tech team required. | An AI consultant for small business, without the enterprise price tag. Start with a free AI audit, then have the top fixes built. No tech team needed. (150) |
| H1 | AI consulting for small businesses, without the enterprise price tag | An AI consultant for small business, without the enterprise price tag |

## What changed

- **/audit** (`page.tsx`, `AuditSurface.tsx`, `AuditGuide.tsx`, `audit-content.ts`, `audit-surface.css`)
  - Title, description, OG title/description updated.
  - H1 and hero intro now say "free AI audit" and "AI readiness assessment". Top-bar module label changed to FREE AI AUDIT.
  - H2 "What is the AI Opportunity Audit?" became "What is an AI audit?".
  - New block with H2 "An AI readiness assessment, plus what to do about it". It uses only facts already on the page (AI Readiness is one of the five scores, benchmarked against industry peers). It includes an in-body link to the consulting page.
  - FAQ: Q1 is now "What is an AI audit?" and there's a new Q2, "Is this an AI readiness assessment?". The FAQPage JSON-LD is still built from the same `AUDIT_FAQS` array, so the markup and the rendered FAQ can't drift. There are now 7 Qs.
  - Service JSON-LD: name is now "Free AI Audit", alternateName is "AI Opportunity Audit", serviceType is "AI readiness assessment".
  - Close-section link anchor changed to "Hire an AI consultant for small business".
  - One CSS rule so inline links in `.diag-guide__block .sc-body` show in the accent color with an underline. Before this, they were indistinguishable from body text.
- **/ai-consulting-for-small-businesses**
  - Title, description, OG, H1 and hero copy updated. The hero is now first-person.
  - H2 "Forget the buzzwords" became "What an AI consultant for small business actually does".
  - FAQ H2 "Common questions" became "Questions about hiring an AI consultant".
  - New paragraph with an in-body link to /audit, framing it as the AI readiness assessment.
  - FAQ: Q1 was reworded, and there's a new cost Q. It uses only existing facts: the audit is free, and projects are priced per project and quoted before work starts. There are now 5 Qs. The existing FAQPage JSON-LD pattern is reused.
  - Service JSON-LD name is now "AI Consultant for Small Business", and it gains `serviceType`.
- **Solutions, integration and training pages:** one line at the end of each FAQ section, linking to /audit ("free AI audit") and to the consulting page ("AI consultant for small business"). It follows the same pattern as the cross-link on the coworking page.

## /audit-v2 findings

`src/app/audit-v2/page.tsx` is a retired preview route. It `redirect("/audit")`s (a 307 locally) and sets `robots: { index: false, follow: false }`. It isn't in `sitemap.ts`. It doesn't compete with /audit. It was left as is, not deleted.

## Verification evidence

- `npx tsc --noEmit` exited 0.
- `npm run build` passed. It compiled, type-checked and generated 19/19 static pages, and it was re-run after the CSS tweak.
- `npm run lint` / `next lint` wasn't run. ESLint isn't configured in this repo: there's no `.eslintrc`/`eslint.config`, and `next lint` launches the interactive setup prompt. The build's own type check is the gate.
- I ran `next start -p 3107` locally and parsed the HTML with a Python script:
  - /audit returned 200. Title, description (151), canonical, index/follow, H1 and all H2s were as listed above. All 3 JSON-LD blocks passed `json.loads`. The FAQPage has 7 Qs. There are 0 em dashes in the rendered HTML.
  - /ai-consulting-for-small-businesses returned 200. Title, description (150) and H1 were as listed above. All 3 JSON-LD blocks parse. The FAQPage has 5 Qs. There are 0 em dashes.
  - Solutions, integration and training each returned 200, and each has 2 links to the consulting page (the new line plus the footer).
  - /audit-v2 returned a 307 to /audit.
- Playwright screenshots (1280 wide, plus a 390 mobile check on training) confirmed the new blocks render in the existing design with no horizontal overflow at 390px. The inline link was invisible on the first pass, which is why the CSS rule was added and the page re-shot.
- Vercel preview: https://wex-advisory-rjiaqvxve-max-wexleys-projects.vercel.app (GitHub status: "Deployment has completed").
  - The preview is behind Vercel SSO deployment protection, so a plain curl gets a 302 to vercel.com/sso-api.
  - With `vercel curl` (bypass token), /audit returned 200 and /ai-consulting-for-small-businesses returned 200. The title, H1 and JSON-LD on the preview match local.
- Local dev server stopped by PID after the checks. No `/IM` kills.

## Remaining scope

1. Max reviews the copy, especially the new FAQ wording, on the preview.
2. Merge to master, which deploys to production. This needs Max's approval.
3. After deploy, request indexing for both URLs in GSC, then recheck positions in about 2-4 weeks.
4. Not done (out of scope, flagged):
   - `layout.tsx` sitewide org schema still lists the offer as "AI Opportunity Audit".
   - The coworking page card still says "Free AI Opportunity Audit".
   - The solutions, integration and training meta descriptions run 160-162 chars, over the ~155 target.
   - The solutions page has no Service JSON-LD.

## Open risks

- Renaming away from "AI Opportunity Audit" drops the exact-match phrase that brought the current 68 impressions. The Service `alternateName` keeps the entity association, but those impressions may dip before the new terms pick up.
