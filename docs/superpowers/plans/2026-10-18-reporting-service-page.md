# Reporting Service Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship `/automated-reporting`, a service page selling "the report someone builds by hand, built once and run automatically", with a "Send me one report" lead magnet that gets its own auto-reply.

**Architecture:** One server-rendered App Router page composed of small components under `src/components/reporting/`, all copy and facts in one typed content module so the facts can be tested. The shared `ContactForm` and `/api/contact` gain an optional `source` (allowlist: `"reporting"`) that tags the subject and picks a reporting auto-reply; without it, behavior is unchanged.

**Tech Stack:** Next.js 14.2 App Router, TypeScript, Tailwind, lucide-react (installed). Tests: `node:test` run through `npx -y tsx --test` (no new dependencies); browser checks with Python Playwright (installed on this machine).

**Spec:** `docs/superpowers/specs/2026-10-18-reporting-service-page-design.md` (read it; the Facts section is the source of truth for every claim).

## Global Constraints

- Worktree: `C:\Users\maxmw\Downloads\Claude\wex-advisory\.worktrees\reporting-page`, branch `feat/reporting-page`. Never push or merge; master = production.
- node_modules: create a junction to the main checkout before building: `cmd /c mklink /J node_modules ..\..\node_modules` (from the worktree). Remove it with `cmd /c rmdir node_modules` before any `git worktree remove`.
- Copy: first person "I", no em dashes (U+2014) anywhere in new copy, never "no hourly rates", "fixed fee", "no retainer", "by night".
- Prices, verbatim: "$200/hr" new builds, "$150/hr" maintenance, retainer varies by project, written estimate before any work starts, "most reporting builds take 5 to 20 hours, so $1,000 to $4,000".
- Calls: free, 30 minutes, `https://calendly.com/maxwexley-wexadvisory/free-strategy-call`.
- Tools shown as shipped, exactly: Excel, Google Sheets, QuickBooks, Shopify, Yardi GL exports, emailed exports (Gmail), Notion. HubSpot, Salesforce, Xero, Slack only as "and similar" / "can do".
- Design: homepage system (bg `#0A1226`, gold `#C8A84B`, glass `bg-white/[0.04] border-white/10 rounded-2xl`, `Eyebrow` before every H2, `ScrollReveal`, one solid gold pill per viewport, body ≥ `text-white/70`, labels ≥ `/60`, standalone tap targets `min-h-11`).
- Never submit the live contact form or call Resend in tests; mock `fetch`.
- Commits: `git commit -m "..." -- <files>` (explicit pathspec).

## Review Focus

1. A request with an unknown `source` (e.g. `"<script>"`, `"audit"`) must behave exactly like no source: general reply, untagged subject. Test in Task 1.
2. The homepage form (no `source`) must still get the general auto-reply and subject `New inquiry from …`. Test in Task 1.
3. The illustrative example must carry no figures, so nothing reads as a client result. Test in Task 2 (no digits in illustrative examples).
4. The page must have exactly one `<form>` (lead magnet) even though a close section exists. Check in Task 5.
5. At 375px: no sideways scroll at first paint and no standalone tap target under 44px. Check in Task 5.

---

### Task 1: Contact `source` + reporting auto-reply

**Files:**
- Modify: `src/app/api/contact/route.ts`
- Modify: `src/components/ContactForm.tsx`
- Create: `tests/contact-route.test.ts`
- Modify: `package.json` (add script `"test": "npx -y tsx --test tests/*.test.ts"`)

**Interfaces:**
- Produces: `ContactForm` props `{ source?: "reporting"; messageLabel?: string; messagePlaceholder?: string }`, defaults = today's label/placeholder and no `source` key in the payload. Payload `{ name, company, email, message, source? }`.
- Route: `source` accepted only if `=== "reporting"`.

- [ ] **Step 1: Write the failing tests** in `tests/contact-route.test.ts`: mock `globalThis.fetch` to record `{to, subject, html}` and return 200; set `process.env.RESEND_API_KEY = "re_mock"`; import `POST` from `../src/app/api/contact/route.ts`; give each request a distinct `x-forwarded-for` (rate limiter).
  - `reporting source tags subject and sends reporting reply`: body with `source: "reporting"` → Max's subject starts `[Reporting] New inquiry from`; visitor html includes `screenshot or export` and `calendly.com/maxwexley-wexadvisory/free-strategy-call`, not `competitors`.
  - `no source keeps general reply`: subject starts `New inquiry from`; visitor subject `Thanks for reaching out, Wex Advisory`; html excludes `screenshot or export`.
  - `unknown source is ignored`: `source: "<script>"` → same as no source.
  - `fields are escaped`: name `Jane <b>Doe</b>` → no `<b>Doe` in any html.
  - `auto-reply failure still returns 200`; `missing fields returns 400`.
- [ ] **Step 2: Run** `npm test` → reporting/unknown-source tests FAIL (others may pass).
- [ ] **Step 3: Implement** in `route.ts`: read `body.source`, `const isReporting = body.source === "reporting"`; subject prefix `[Reporting] ` when true; reporting auto-reply html: thanks, I read every one myself and will reply within 24 hours with how I'd automate it; if you can, reply with a screenshot or export of the report with sensitive numbers removed, and tell me where its data comes from; 30-minute call link. Keep the existing general reply byte-for-byte for non-reporting. In `ContactForm.tsx`: add the props; include `source` in the JSON only when set.
- [ ] **Step 4: Run** `npm test` → all PASS; `npx tsc --noEmit` → 0 errors.
- [ ] **Step 5: Commit** `git commit -m "Contact: optional reporting source + reporting auto-reply" -- src/app/api/contact/route.ts src/components/ContactForm.tsx tests/contact-route.test.ts package.json`

### Task 2: Reporting content module

**Files:**
- Create: `src/components/reporting/content.ts`
- Create: `tests/reporting-content.test.ts`

**Interfaces:**
- Produces (all exported consts, typed):
  - `TOOLS_SHIPPED: readonly string[]` exactly the 7 tools in Global Constraints; `TOOLS_SIMILAR: readonly string[]` = HubSpot, Salesforce, Xero, Slack.
  - `DELIVERY: readonly { label: string; status: "shipped" | "can-do" }[]` (Email, PDF, Excel, live dashboard shipped; Slack can-do).
  - `EXAMPLES: readonly Example[]`, `type Example = { team: string; title: string; client: "25N Coworking" | "RECO" | null; illustrative: boolean; before: string[]; after: string[]; delivery: string; image?: "/projects/25n-dashboard-blurred.png" | "/projects/reco-dashboard-blurred.png" }`. Four entries in spec order: Finance (25N), Sales (RECO), Accounting (RECO, Before = "the numbers lived only in a founder's Excel file, shared by email or by opening the file"), and one illustrative ops or legal example (`client: null`, `illustrative: true`).
  - `AI_SUMMARY_SAMPLE: { business: string; lines: string[] }` (fictional, labeled sample).
  - `STEPS: readonly { title: string; body: string; output: string }[]` (4 steps per spec section 5).
  - `PRICING: { build: "$200/hr"; maintenance: "$150/hr"; typical: "5 to 20 hours, so $1,000 to $4,000"; retainer: string; estimate: string }`.
  - `FAQS: readonly { q: string; a: string }[]` (4-6, per spec section 9).
  - `ANSWER_BLOCK: string` (spec section 2; must contain "automated reporting" and "$1,000 to $4,000").

- [ ] **Step 1: Write the failing tests** in `tests/reporting-content.test.ts` over every string in the module (flatten exports):
  - `no banned phrases`: none of `no hourly rates`, `fixed fee`, `fixed-fee`, `no retainer`, `by night` (case-insensitive).
  - `no em dashes`: no `\u2014`.
  - `prices are exact`: `PRICING.build === "$200/hr"`, `PRICING.maintenance === "$150/hr"`, `ANSWER_BLOCK` includes `$1,000 to $4,000`; every `$` amount in the module is one of `$200`, `$150`, `$1,000`, `$4,000`.
  - `tools`: `TOOLS_SHIPPED` deep-equals the 7; none of `TOOLS_SIMILAR` appears in `TOOLS_SHIPPED`; Slack's `DELIVERY` status is `"can-do"`.
  - `examples`: length 4; exactly one `illustrative`; illustrative example has `client === null` and no digits in any of its strings; RECO accounting example text excludes `QuickBooks`.
  - `answer block targets the phrase`: includes `automated reporting`.
- [ ] **Step 2: Run** `npm test` → FAIL (module missing).
- [ ] **Step 3: Write `content.ts`** with copy drawn only from the spec's Facts section; client numbers allowed: 5 locations, 9 hours, 119 accounts, 2,500+ leads, 5 agents, 1 to 3 full-time staff.
- [ ] **Step 4: Run** `npm test` → PASS.
- [ ] **Step 5: Commit** `-- src/components/reporting/content.ts tests/reporting-content.test.ts`

### Task 3: Page and section components

**Files:**
- Create: `src/app/automated-reporting/page.tsx`
- Create in `src/components/reporting/`: `ReportingHero.tsx`, `AnswerBlock.tsx`, `Examples.tsx`, `AiSummary.tsx`, `Process.tsx`, `Tools.tsx`, `ReportingPricing.tsx`, `SendAReport.tsx`, `ReportingFaq.tsx`, `BookBand.tsx`

**Interfaces:**
- Consumes: Task 2 exports; `ContactForm` props from Task 1; `Nav`, `Footer`, `ScrollReveal`, `Eyebrow`, `GlassCard`, `PrimaryCta`, `SecondaryCta` (existing).
- Produces: route `/automated-reporting`; section ids `examples`, `how-it-works`, `pricing`, `send-a-report`, `faq`.

- [ ] **Step 1: page.tsx metadata** copying the pattern of `src/app/ai-ops-dashboard-for-ecommerce-brands/page.tsx`: `PAGE_URL = "https://www.wexadvisory.com/automated-reporting"`, title `Automated Reporting for Small Businesses | Report Automation | Wex Advisory`, a 140-160 char description containing "automated reporting" and "$1,000 to $4,000", canonical, OG/Twitter via `/api/og`, robots index. JSON-LD: one `Service` (provider = the site's ProfessionalService name, areaServed US, offers price range 1000-4000 USD) and one `FAQPage` built from `FAQS`.
- [ ] **Step 2: Sections in spec order** (hero → answer block → examples → AI summary → process → tools → pricing → send-a-report → FAQ → book band), each below the hero wrapped in `ScrollReveal`. Hero: one H1 containing "automated reporting" (case-insensitive) or the first sentence does; primary pill "Book a 30-minute call" (Calendly, `target="_blank"`), secondary outline "Send me one report" → `#send-a-report`. Examples use `next/image` with explicit sizes for the two screenshots; illustrative card shows a visible "Example" badge. `SendAReport` renders `<ContactForm source="reporting" messageLabel="Which report do you build by hand?" messagePlaceholder="What it shows, who reads it, where the data comes from. No sensitive numbers needed." />`. `BookBand` is a booking-only band (no form) so the page has one form. `ReportingPricing` ends with a link "Compare with typical market rates →" to `/ai-consulting-for-small-businesses`. The hero carries the proof line "Running today at a 5-location coworking operator and a wholesale + DTC brand."
- [ ] **Step 3: Verify** `npx tsc --noEmit` → 0; `npx next build` → passes and lists `○ /automated-reporting`.
- [ ] **Step 4: Commit** `-- src/app/automated-reporting src/components/reporting`

### Task 4: Site wiring

**Files:**
- Modify: `src/lib/site-pages.ts` (new entry after `/ai-consulting-for-small-businesses`: `path: "/automated-reporting"`, `lastModified: "2026-10-18"`, `changeFrequency: "monthly"`, `priority: 0.8`, `llms: { section: "Services", title: "Automated Reporting", description: "Reports built by hand every week or month, automated: data pulled from the tools you use, an AI summary on top, delivered by email, PDF or Excel. Most builds $1,000 to $4,000." }`)
- Modify: `src/components/home/ProblemPicker.tsx` (Reporting card `href: "/automated-reporting"`)
- Modify: `src/components/Footer.tsx` (add `Automated Reporting` link after `AI Consulting`, same classes)
- Modify: `src/app/ai-consulting-for-small-businesses/page.tsx` and `src/app/work/page.tsx` (one natural in-text link each where reporting is mentioned)
- Test: extend `tests/reporting-content.test.ts` with `site wiring`: `SITE_PAGES` has exactly one `/automated-reporting` entry with section `"Services"`.

- [ ] **Step 1: Write the failing `site wiring` test**; run `npm test` → FAIL.
- [ ] **Step 2: Make the edits above**; run `npm test` → PASS; `npx tsc --noEmit` → 0.
- [ ] **Step 3: Commit** `-- src/lib/site-pages.ts src/components/home/ProblemPicker.tsx src/components/Footer.tsx src/app/ai-consulting-for-small-businesses/page.tsx src/app/work/page.tsx tests/reporting-content.test.ts`

### Task 5: Verify end to end (fresh context)

- [ ] **Step 1: Build and serve** `npx next build` then `npx next start -p 3447` (record PID; stop by PID at the end).
- [ ] **Step 2: Curl checks**: `/automated-reporting` 200; `/sitemap.xml` and `/llms.txt` contain `/automated-reporting`; homepage HTML has `href="/automated-reporting"`; page HTML contains one `application/ld+json` `Service` and one `FAQPage`, both `JSON.parse` cleanly; banned phrases count 0.
- [ ] **Step 3: Browser checks (Python Playwright)** at 1440x900 and 375x812: exactly 1 `form`; scrollWidth == viewport at first paint and after scroll; 0 standalone `a,button` under 44px at 375 (in-sentence links exempt); 1 solid gold pill in the hero viewport; all `.reveal` visible after scroll; 0 console errors besides `/_vercel/insights` (local-only). Intercept `POST /api/contact` with `route.fulfill` and assert the body has `source: "reporting"`; success and error states render.
- [ ] **Step 4: Fresh-context reviewer** on `git diff master...feat/reporting-page`; fix findings; re-run Tasks 1-2 tests.
- [ ] **Step 5: Reference comparison** of `/automated-reporting` sections against the matching live homepage sections (consistency of tokens, spacing, components); render the side-by-side to `aios/output/ui-compare-reporting-page.html`.
- [ ] **Step 6: Hand to Max** at `http://127.0.0.1:3447/automated-reporting`; deploy (merge to master) only on his explicit go.
