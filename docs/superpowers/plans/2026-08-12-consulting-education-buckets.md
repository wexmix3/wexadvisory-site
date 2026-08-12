# Consulting + Education Homepage Buckets Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a new homepage section, "Two Ways to Work With Us," that presents Consulting (build-it-for-you) and Education (workshops/demos) as two equally-weighted service buckets, positioned between `ProofStrip` and `Flagship`.

**Architecture:** One new presentational component (`ServiceBuckets.tsx`), no new dependencies, no new routes, no backend/API work. Wired into the existing homepage (`src/app/page.tsx`) the same way every other section is: wrapped in `<ScrollReveal>`.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS. No test framework exists in this repo (confirmed: no `*.test.*` files, no test script in `package.json`) — verification is `npm run build` (type/lint check) + visual confirmation via `npm run dev`, consistent with how every other section component in this repo was shipped.

## Global Constraints

- Reuse existing visual patterns only — card style from `SupportingTier.tsx` (`bg-white/[0.04] border border-white/10 rounded-2xl p-8`), eyebrow label style from `Flagship.tsx` (`text-gold text-xs font-bold tracking-[0.3em] uppercase`), checkmark list style from `Flagship.tsx`'s `INCLUDED` list (`text-gold font-bold` ✓ + `text-white/60` text). No new visual pattern introduced.
- Both cards equal visual weight — no primary/secondary treatment.
- Shared single CTA only: `Book a Scoping Call →` → `href="#contact"`, same button classes as `Flagship.tsx`'s primary CTA (`bg-gold text-navy font-bold`).
- No separate pricing or CTA for Education.
- No nav changes, no new route — homepage-only, inserted between `ProofStrip` and `Flagship` in `src/app/page.tsx`.
- Copy is fully specified below — do not paraphrase or invent alternate wording.

---

### Task 1: Create `ServiceBuckets` component and wire into homepage

**Files:**
- Create: `src/components/ServiceBuckets.tsx`
- Modify: `src/app/page.tsx` (add import + insert `<ScrollReveal><ServiceBuckets /></ScrollReveal>` between `<ProofStrip />` and `<ScrollReveal><Flagship /></ScrollReveal>`)

**Interfaces:**
- Consumes: nothing (no props, no external state) — self-contained like `Flagship` and `SupportingTier`.
- Produces: default export `ServiceBuckets` (React component, no props), rendered once in `src/app/page.tsx`.

- [ ] **Step 1: Create the component file**

Write `src/components/ServiceBuckets.tsx` with this exact content:

```tsx
const CONSULTING_ITEMS = [
  "Automate manual, repeatable workflows",
  "Build new features into tools you already run",
  "Develop or rebuild your website",
  "Craft custom AI agents for client-facing or internal work",
  "Boost outreach — prospecting, sequencing, deliverability",
  "Analyze competitors — traffic, SEO, positioning",
];

const EDUCATION_ITEMS = [
  "Live walkthroughs of tools built for your team",
  "Hands-on AI literacy sessions for non-technical staff",
  "Scoped to your actual stack, not a generic slide deck",
];

export default function ServiceBuckets() {
  return (
    <section id="how-we-work" className="bg-navy py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">How We Work</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Two ways to work with us</h2>
        <p className="text-white/50 text-base leading-relaxed max-w-2xl mb-14">
          Some clients want it built. Some want their team to run it themselves. Most engagements end up
          using a mix of both — starting with whichever fits where you are right now.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-8">
            <p className="text-gold text-[11px] font-bold uppercase tracking-widest mb-3">Build It For You</p>
            <h3 className="text-white text-xl font-bold mb-2">Consulting &amp; Systems Work</h3>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Hands-on delivery — I build the thing, ship it, and hand over something that works.
            </p>
            <ul className="space-y-3 mb-6">
              {CONSULTING_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/60 leading-relaxed">
                  <span className="text-gold font-bold flex-shrink-0 mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <a href="#flagship" className="text-gold text-sm font-semibold hover:underline">
              See the Flagship Engagement ↓
            </a>
          </div>

          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-8">
            <p className="text-gold text-[11px] font-bold uppercase tracking-widest mb-3">Teach Your Team</p>
            <h3 className="text-white text-xl font-bold mb-2">Workshops &amp; Demos</h3>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Live sessions where I walk your team through the tools — how to use what&apos;s already built,
              or how to actually use AI day-to-day instead of it sitting unused. So the value doesn&apos;t
              stop when the engagement does.
            </p>
            <ul className="space-y-3">
              {EDUCATION_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/60 leading-relaxed">
                  <span className="text-gold font-bold flex-shrink-0 mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 text-center">
          <a
            href="#contact"
            className="inline-block py-3.5 px-10 rounded-xl bg-gold text-navy font-bold text-sm hover:bg-gold-muted transition-colors"
          >
            Book a Scoping Call →
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire the component into the homepage**

Modify `src/app/page.tsx`. Add the import near the other component imports (after `ProofStrip`, before `Flagship`):

```tsx
import ServiceBuckets from "@/components/ServiceBuckets";
```

Then update the JSX so the render order is `Hero → ProofStrip → ServiceBuckets → Flagship → ...`:

```tsx
        <Hero />
        <ProofStrip />
        <ScrollReveal><ServiceBuckets /></ScrollReveal>
        <ScrollReveal><Flagship /></ScrollReveal>
```

- [ ] **Step 3: Type-check and build**

Run: `npm run build`
Expected: build completes with no TypeScript or lint errors. If the build fails, read the error, fix the component, and re-run until it passes.

- [ ] **Step 4: Visual verification**

Run: `npm run dev`, open `http://localhost:3000` in a browser.

Confirm:
- New "Two ways to work with us" section renders directly between the proof strip and the "Custom AI Automation & Systems Work" (Flagship) section.
- Both cards (Consulting, Education) render at equal width/weight on desktop, stack vertically on mobile width (resize browser or use device toolbar).
- Clicking "See the Flagship Engagement ↓" scrolls to the `#flagship` section.
- Clicking "Book a Scoping Call →" scrolls to the `#contact` section.
- No layout shift, overlap, or broken styling compared to adjacent sections.

- [ ] **Step 5: Commit**

```bash
git add src/components/ServiceBuckets.tsx src/app/page.tsx
git commit -m "feat: add Consulting + Education service buckets to homepage

Surfaces workshops/demos as a parallel service line alongside existing
build-it-for-you consulting work, per docs/superpowers/specs/2026-08-12-consulting-education-buckets-design.md"
```

---

## Self-Review Notes

- **Spec coverage:** Placement (between ProofStrip/Flagship) ✓, two-column equal-weight cards ✓, exact copy for both cards ✓, shared single CTA to `#contact` ✓, no separate Education pricing/CTA ✓, no nav/route changes ✓, verification steps (build + dev visual check) ✓. All spec sections covered by Task 1.
- **Placeholder scan:** None — full component code included, no TBDs.
- **Type consistency:** Single component, single task — no cross-task signature risk.
