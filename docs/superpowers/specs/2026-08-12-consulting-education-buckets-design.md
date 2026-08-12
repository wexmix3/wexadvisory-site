# Homepage: "Two Ways to Work With Us" (Consulting + Education buckets)

## Problem
The homepage currently only pitches one mode of engagement — Wex Advisory building things for the client (Flagship: custom automation/systems; SupportingTier: Free Audit + Competitive Analysis). It doesn't surface that Wex Advisory also teaches/trains client teams to use AI tools themselves (workshops, demos, walkthroughs). Max wants both service buckets — Consulting and Education — visible as parallel, equally-weighted offers.

## Placement
New section on the homepage, inserted between `ProofStrip` and `Flagship`:

```
Hero → ProofStrip → [NEW: ServiceBuckets] → Flagship → SupportingTier → ...
```

Homepage-only. No nav changes, no new route.

## Component
New file: `src/components/ServiceBuckets.tsx`, wrapped in `<ScrollReveal>` in `src/app/page.tsx` like the other sections.

Visual pattern reuses the existing card style from `SupportingTier.tsx` (`bg-white/[0.04] border border-white/10 rounded-2xl p-8`) and the gold eyebrow label style from `Flagship.tsx` (`text-gold text-xs font-bold tracking-[0.3em] uppercase`) — no new visual pattern introduced.

### Layout
Two-column grid (`grid md:grid-cols-2 gap-6`), stacking on mobile. Both cards equal visual weight (same size, same styling — no "primary vs secondary" treatment, matching the "two parallel service lines" framing).

### Section eyebrow + heading
- Eyebrow: `HOW WE WORK`
- Heading: `Two ways to work with us`
- Subhead (max-w-2xl, text-white/50): `Some clients want it built. Some want their team to run it themselves. Most engagements end up using a mix of both — starting with whichever fits where you are right now.`

### Card 1 — Consulting
- Label (small, gold, uppercase): `Build It For You`
- Title: `Consulting & Systems Work`
- Body: `Hands-on delivery — I build the thing, ship it, and hand over something that works.`
- Capability list (checkmark list, same visual treatment as `Flagship`'s `INCLUDED` list, ✓ + text.white/60):
  - Automate manual, repeatable workflows
  - Build new features into tools you already run
  - Develop or rebuild your website
  - Craft custom AI agents for client-facing or internal work
  - Boost outreach — prospecting, sequencing, deliverability
  - Analyze competitors — traffic, SEO, positioning
- Footer link: `See the Flagship Engagement ↓` → anchors to `#flagship`

### Card 2 — Education
- Label (small, gold, uppercase): `Teach Your Team`
- Title: `Workshops & Demos`
- Body: `Live sessions where I walk your team through the tools — how to use what's already built, or how to actually use AI day-to-day instead of it sitting unused. So the value doesn't stop when the engagement does.`
- Supporting list (same ✓ treatment, shorter):
  - Live walkthroughs of tools built for your team
  - Hands-on AI literacy sessions for non-technical staff
  - Scoped to your actual stack, not a generic slide deck
- Footer link/CTA: none separate — see shared CTA below

### Shared CTA
Single button below both cards, centered:
`Book a Scoping Call →` → `href="#contact"` (same target/style as Flagship's primary CTA: `bg-gold text-navy font-bold`)

## Out of scope
- No separate pricing or CTA for Education (case-by-case pricing, same as everything else per existing site model)
- No nav link, no dedicated page
- No changes to Flagship or SupportingTier copy/structure

## Verification
- `npm run dev`, visually confirm section renders between ProofStrip and Flagship, responsive at mobile width
- Confirm `#contact` and `#flagship` anchors scroll correctly
- Run `/ui-ux-pro-max` pre-delivery check before calling done
