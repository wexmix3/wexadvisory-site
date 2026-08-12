# New page: /ai-training-for-small-businesses

## Problem
The homepage now surfaces Education/workshops as a service bucket (`ServiceBuckets.tsx`, shipped 2026-08-12) and the site-wide JSON-LD gained a Service entry + FAQ entries for it. But there's still no dedicated, indexable URL for AI training/workshop-related search queries — unlike Consulting, which has 3 dedicated SEO landing pages (`/ai-consulting-for-small-businesses`, `/ai-integration-for-small-businesses`, `/ai-solutions-for-small-businesses`). This closes that gap with a 4th page following the same template.

## URL / Metadata
- Route: `src/app/ai-training-for-small-businesses/page.tsx`
- Canonical: `https://www.wexadvisory.com/ai-training-for-small-businesses`
- Title: `AI Training for Small Businesses | Wex Advisory`
- Description: `Live AI training and workshops for small business teams — hands-on sessions on the tools you actually use, $200/hour, scoped to your stack. No generic slide decks.`
- Same `Metadata` object shape as the 3 existing pages (canonical, robots index/follow, openGraph mirroring title/description).
- Not added to `Nav.tsx` — none of the 3 existing SEO landing pages are in nav either; these are SEO-only entry points, not primary navigation. Out of scope for this task.

## Page structure
Follows `src/app/ai-solutions-for-small-businesses/page.tsx`'s structure most closely (leanest of the 3 existing pages: Hero → Categories → Process → FAQ → ServiceCTA), adapted to a 2-item category grid and pricing folded into the Process section per this task's scope decisions.

### 1. Hero (`bg-navy py-24 px-6`)
- Eyebrow: `AI Training`
- H1: `AI training for small businesses — taught on the tools you actually use`
- Subhead: `Most AI training is a generic webinar that doesn't map to how your team actually works. I run live, hands-on sessions scoped to your real stack — so your team walks out able to use it, not just having watched a demo.`
- CTA: `Get My Free AI Snapshot →` → `https://audit.wexadvisory.com/audit` (same styling/target as the hero CTA on all 3 existing pages — keeps the top-of-funnel entry point consistent)

### 2. Categories (`bg-[#0a1a30] py-24 px-6`, 2-column grid, icon-card style matching `ai-solutions-for-small-businesses`'s `CATEGORIES` pattern)
- Eyebrow: `What I Teach`
- H2: `Two formats, scoped to your team`
- Subhead: `No generic curriculum — every session is built around what your team actually runs.`
- Card 1 — icon: `MonitorPlay` (lucide-react), title: `Tool Walkthroughs`, desc: `Live sessions on the exact tools and systems already built for your team — how to use them, troubleshoot them, and get the most out of what's already running.`
- Card 2 — icon: `GraduationCap` (lucide-react), title: `AI Literacy Basics`, desc: `Hands-on sessions for non-technical staff — how to actually use AI day-to-day, not a lecture on what AI is.`

### 3. Process (`bg-navy py-24 px-6 border-y border-white/10`, 3-step numbered list matching `ai-solutions-for-small-businesses`'s Process section)
- Eyebrow: `How It Works`
- H2: `Scoped, hands-on, and yours to keep`
- Step 01 — `Scope the session`: `$200/hour, built around your team and your stack — no generic curriculum, no per-seat fees.`
- Step 02 — `Live, hands-on workshop`: `In-person or virtual, working through real tasks on the actual tools you use — not a slide deck.`
- Step 03 — `Docs + recording handoff`: `Walk away with something to reference later, so the value doesn't evaporate when the session ends.`

### 4. FAQ (`bg-[#0a1a30] py-24 px-6`, matching existing FAQ section styling)
- Eyebrow: `FAQ`
- H2: `Common questions`
- Q1: `Does Wex Advisory offer AI training for my team, or only build things for me?`
  A1: `Both. Wex Advisory works two ways: hands-on consulting where the automation or system gets built and handed over, and live workshops or demos where your team learns to run the tools themselves — walkthroughs of what's already built, or general AI literacy sessions for non-technical staff. Most clients end up using a mix of both.`
- Q2: `What does an AI workshop or demo for a small business team cover?`
  A2: `Sessions are scoped to your actual stack, not a generic slide deck — either a live walkthrough of tools already built for your team, or a hands-on AI literacy session teaching non-technical staff how to use AI day-to-day so the value doesn't stop when the engagement does.`
- Q3: `How much does AI training cost?`
  A3: `$200/hour, scoped to your team size and what you actually run. There's no package pricing or per-seat fee — a half-day session covering multiple tools is priced the same way as a shorter one.`
- Q4: `How is this different from consulting?`
  A4: `Consulting is me building the thing and handing it over — an automation, a system, a website. Training is walking your team through tools that already exist so they can run them without me. Most engagements end up using a mix of both, which is why they're presented as two options on the homepage rather than one bundled service.`

### 5. ServiceCTA (reused component, `src/components/ServiceCTA.tsx` — no changes to the component itself)
- `heading`: `Ready to get your team trained on AI?`
- `subheading`: `$200/hour, scoped to your actual stack — no signup needed to start.`
- (Component's own CTAs are fixed: primary "Analyze My Business" → audit tool, secondary "Book a free 30-min strategy call" → Calendly. Same as all 3 existing pages.)

## Structured data
Two page-scoped `<script type="application/ld+json">` tags, rendered at the top of the page component (matching `ai-consulting-for-small-businesses/page.tsx`'s pattern exactly — `jsonLdService` then `jsonLdFaq`, both declared as consts above the component and serialized via `dangerouslySetInnerHTML`):

```ts
const jsonLdService = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI Training for Small Businesses",
  description:
    "Live AI workshops and training sessions for small business teams — hands-on sessions on the tools they actually use, $200/hour, scoped to their real stack.",
  provider: {
    "@type": "ProfessionalService",
    name: "Wex Advisory",
    founder: { "@type": "Person", name: "Max Wexley" },
  },
  areaServed: "US",
};

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};
```

(`FAQS` is the array of the 4 Q/A pairs above, declared the same way `ai-consulting-for-small-businesses/page.tsx` and `ai-solutions-for-small-businesses/page.tsx` declare theirs.)

This is in addition to the site-wide `jsonLdServices`/`jsonLdFaq` entries in `layout.tsx` (already shipped, commit d11ead4) — page-scoped schema for a dedicated URL is the established pattern for the other 3 pages, so this page follows it rather than relying solely on the site-wide schema.

## Out of scope
- No nav link (see URL/Metadata section above)
- No changes to `ServiceCTA.tsx`, `Nav.tsx`, `Footer.tsx`, or any other shared component
- No changes to the homepage `ServiceBuckets.tsx` or `layout.tsx` (already shipped separately)
- No new icons beyond `MonitorPlay` and `GraduationCap` from the already-installed `lucide-react` package (confirms: `ai-solutions-for-small-businesses/page.tsx` already imports from `lucide-react`, no new dependency)

## Verification
- `npm run build` — confirm the new route compiles and appears in the static route list (matching the other 3 SEO pages, all `○ (Static)`)
- `npm run dev`, visually confirm the page renders correctly at desktop + mobile widths, matches the visual pattern of the other 3 pages
- Confirm canonical URL, title, and OG tags render correctly (view source or dev tools)
- Confirm both JSON-LD blocks are valid JSON and present in the page source
