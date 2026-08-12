# AI Training Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a 4th dedicated SEO landing page, `/ai-training-for-small-businesses`, giving the Education/training service bucket its own indexable URL with page-scoped structured data, following the exact template of the 3 existing SEO pages.

**Architecture:** One new page file (`src/app/ai-training-for-small-businesses/page.tsx`), no new components, no new dependencies (icons come from the already-installed `lucide-react` package). One addition to `src/app/sitemap.ts` — required for the page to be discoverable by search engines, matching how all 3 existing SEO pages are registered there (this was a gap in the spec, caught during planning: the spec fully specified the page's own content/schema but didn't mention sitemap registration, which the existing pattern makes mandatory for the page to actually work as an SEO landing page).

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, `lucide-react` (already a dependency — confirmed via `ai-solutions-for-small-businesses/page.tsx`'s existing import). No test framework in this repo — verification is `npm run build` + visual check via `npm run dev`, same as the prior `ServiceBuckets` task.

## Global Constraints

- Follow `src/app/ai-solutions-for-small-businesses/page.tsx`'s structure and Tailwind class patterns exactly (Hero → Categories → Process → FAQ → ServiceCTA), adapted per the spec's copy and section order.
- Page-scoped JSON-LD (`jsonLdService` + `jsonLdFaq`) rendered via two `<script type="application/ld+json">` tags at the top of the returned JSX, matching `ai-consulting-for-small-businesses/page.tsx`'s exact pattern (consts declared above the component, serialized via `dangerouslySetInnerHTML`).
- Copy is fully specified in the spec (`docs/superpowers/specs/2026-08-12-ai-training-landing-page-design.md`) and below — do not paraphrase or invent alternate wording.
- No nav link, no changes to `ServiceCTA.tsx`, `Nav.tsx`, `Footer.tsx`, `layout.tsx`, or `ServiceBuckets.tsx`.
- `ServiceCTA` component is reused as-is with only its two props (`heading`, `subheading`) customized — do not modify the component file.
- New sitemap entry uses `priority: 0.7` and `changeFrequency: "monthly"`, matching the existing `/ai-solutions-for-small-businesses` and `/ai-integration-for-small-businesses` entries (this page is a peer of those two, not the primary `/ai-consulting-for-small-businesses` page which has `priority: 0.8`).

---

### Task 1: Create the AI Training landing page and register it in the sitemap

**Files:**
- Create: `src/app/ai-training-for-small-businesses/page.tsx`
- Modify: `src/app/sitemap.ts` (add one entry)

**Interfaces:**
- Consumes: `Nav` (`@/components/Nav`, no props), `Footer` (`@/components/Footer`, no props), `ServiceCTA` (`@/components/ServiceCTA`, props `{ heading: string; subheading: string }`) — all existing, unchanged components.
- Produces: default export `AITrainingPage` (React component, no props), a new static route at `/ai-training-for-small-businesses`, and one new object literal in the array returned by `sitemap()` in `src/app/sitemap.ts`.

- [ ] **Step 1: Create the page file**

Write `src/app/ai-training-for-small-businesses/page.tsx` with this exact content:

```tsx
import type { Metadata } from "next";
import { MonitorPlay, GraduationCap, type LucideIcon } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ServiceCTA from "@/components/ServiceCTA";

const PAGE_URL = "https://www.wexadvisory.com/ai-training-for-small-businesses";

export const metadata: Metadata = {
  title: "AI Training for Small Businesses | Wex Advisory",
  description:
    "Live AI training and workshops for small business teams — hands-on sessions on the tools you actually use, $200/hour, scoped to your stack. No generic slide decks.",
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    title: "AI Training for Small Businesses | Wex Advisory",
    description:
      "Live AI training and workshops for small business teams — hands-on sessions on the tools you actually use, $200/hour, scoped to your stack. No generic slide decks.",
    url: PAGE_URL,
    siteName: "Wex Advisory",
    type: "website",
  },
};

const CATEGORIES: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: MonitorPlay,
    title: "Tool Walkthroughs",
    desc: "Live sessions on the exact tools and systems already built for your team — how to use them, troubleshoot them, and get the most out of what's already running.",
  },
  {
    icon: GraduationCap,
    title: "AI Literacy Basics",
    desc: "Hands-on sessions for non-technical staff — how to actually use AI day-to-day, not a lecture on what AI is.",
  },
];

const FAQS = [
  {
    q: "Does Wex Advisory offer AI training for my team, or only build things for me?",
    a: "Both. Wex Advisory works two ways: hands-on consulting where the automation or system gets built and handed over, and live workshops or demos where your team learns to run the tools themselves — walkthroughs of what's already built, or general AI literacy sessions for non-technical staff. Most clients end up using a mix of both.",
  },
  {
    q: "What does an AI workshop or demo for a small business team cover?",
    a: "Sessions are scoped to your actual stack, not a generic slide deck — either a live walkthrough of tools already built for your team, or a hands-on AI literacy session teaching non-technical staff how to use AI day-to-day so the value doesn't stop when the engagement does.",
  },
  {
    q: "How much does AI training cost?",
    a: "$200/hour, scoped to your team size and what you actually run. There's no package pricing or per-seat fee — a half-day session covering multiple tools is priced the same way as a shorter one.",
  },
  {
    q: "How is this different from consulting?",
    a: "Consulting is me building the thing and handing it over — an automation, a system, a website. Training is walking your team through tools that already exist so they can run them without me. Most engagements end up using a mix of both, which is why they're presented as two options on the homepage rather than one bundled service.",
  },
];

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

export default function AITrainingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      <Nav />
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-navy py-24 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">AI Training</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              AI training for small businesses —{" "}
              <span className="text-gold">taught on the tools you actually use</span>
            </h1>
            <p className="text-white/65 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              Most AI training is a generic webinar that doesn&apos;t map to how your team actually works. I
              run live, hands-on sessions scoped to your real stack — so your team walks out able to use it,
              not just having watched a demo.
            </p>
            <a
              href="https://audit.wexadvisory.com/audit"
              className="inline-block bg-gold hover:bg-gold-muted text-navy font-bold text-base px-10 py-4 rounded-xl
                transition-all duration-150 hover:scale-[1.02] hover:shadow-lg hover:shadow-gold/20 active:scale-[0.99]"
            >
              Get My Free AI Snapshot →
            </a>
          </div>
        </section>

        {/* Categories */}
        <section className="bg-[#0a1a30] py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">What I Teach</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Two formats, scoped to your team</h2>
            <p className="text-white/50 text-base max-w-2xl mb-14">
              No generic curriculum — every session is built around what your team actually runs.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {CATEGORIES.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-white/[0.04] rounded-2xl p-8 hover:bg-white/[0.07] transition-colors">
                  <div className="text-gold mb-5">
                    <Icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-3">{title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="bg-navy py-24 px-6 border-y border-white/10">
          <div className="max-w-2xl mx-auto">
            <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">How It Works</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">
              Scoped, hands-on, and yours to keep
            </h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-10 h-10 rounded-xl border border-gold/30 bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-gold font-bold text-sm">01</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1.5">Scope the session</h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    $200/hour, built around your team and your stack — no generic curriculum, no per-seat fees.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-10 h-10 rounded-xl border border-gold/30 bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-gold font-bold text-sm">02</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1.5">Live, hands-on workshop</h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    In-person or virtual, working through real tasks on the actual tools you use — not a slide deck.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-10 h-10 rounded-xl border border-gold/30 bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-gold font-bold text-sm">03</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1.5">Docs + recording handoff</h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    Walk away with something to reference later, so the value doesn&apos;t evaporate when the session ends.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-[#0a1a30] py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">Common questions</h2>
            <div className="space-y-6">
              {FAQS.map((f) => (
                <div key={f.q} className="border-t border-white/[0.08] pt-6 first:border-t-0 first:pt-0">
                  <h3 className="text-white font-semibold text-base mb-2">{f.q}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ServiceCTA
          heading="Ready to get your team trained on AI?"
          subheading="$200/hour, scoped to your actual stack — no signup needed to start."
        />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Register the page in the sitemap**

Modify `src/app/sitemap.ts`. Insert a new entry immediately after the `/ai-integration-for-small-businesses` entry (so all 3 `/ai-*-for-small-businesses` SEO pages stay grouped together in the file):

```ts
    {
      url: "https://www.wexadvisory.com/ai-integration-for-small-businesses",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://www.wexadvisory.com/ai-training-for-small-businesses",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
```

- [ ] **Step 3: Type-check and build**

Run: `npm run build`
Expected: build completes with no TypeScript or lint errors, and the route list in the build output includes a new line for `○ /ai-training-for-small-businesses` (static). If the build fails, read the error, fix the page, and re-run until it passes.

- [ ] **Step 4: Visual verification**

Run: `npm run dev`, open `http://localhost:3000/ai-training-for-small-businesses` in a browser.

Confirm:
- Page renders all 5 sections in order: Hero, Categories (2 cards), Process (3 numbered steps), FAQ (4 questions), ServiceCTA (gold background).
- Visual style matches the existing `/ai-solutions-for-small-businesses` page (same navy/dark-navy alternating backgrounds, same card and typography treatment).
- Responsive at mobile width: Categories grid stacks to 1 column, Process steps remain readable.
- Hero CTA ("Get My Free AI Snapshot →") and ServiceCTA's two CTAs are present and point to the audit tool / Calendly respectively (visually confirm href via browser dev tools or hover state — no click-through required).
- View page source (or dev tools Elements panel): confirm two `<script type="application/ld+json">` tags are present with valid JSON (`jsonLdService` and `jsonLdFaq`).
- Confirm `<title>` renders as "AI Training for Small Businesses | Wex Advisory".

- [ ] **Step 5: Commit**

```bash
git add src/app/ai-training-for-small-businesses/page.tsx src/app/sitemap.ts
git commit -m "feat: add /ai-training-for-small-businesses SEO landing page

Gives the Education/training service bucket its own indexable URL,
following the same template as the 3 existing AI consulting/solutions/
integration landing pages, per
docs/superpowers/specs/2026-08-12-ai-training-landing-page-design.md"
```

---

## Self-Review Notes

- **Spec coverage:** URL/metadata ✓, all 5 page sections with exact copy ✓, 2 categories ✓, 3-step process with $200/hour pricing ✓, 4 FAQ entries ✓, ServiceCTA reuse with custom heading/subheading ✓, page-scoped JSON-LD (Service + FAQPage) ✓, no nav link ✓, verification steps ✓. Sitemap registration was not in the spec but is added here as a necessary consequence of "follows the same template as the 3 existing pages" (all 3 are in `sitemap.ts`) — flagged explicitly in the plan's Architecture section rather than silently added.
- **Placeholder scan:** None — full page code included, no TBDs.
- **Type consistency:** Single component, single task — `CATEGORIES` typed as `{ icon: LucideIcon; title: string; desc: string }[]` matching the exact pattern used in `ai-solutions-for-small-businesses/page.tsx`; `FAQS` matching the untyped-array pattern used in both existing FAQ-bearing pages (TypeScript infers `{ q: string; a: string }[]`, consistent with existing code, not a new pattern).
