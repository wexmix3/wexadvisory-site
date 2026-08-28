# Homepage v3 Redesign

## Context

Max shared a Lovable draft (`sleek-founder-shine.lovable.app`) that predates the current live homepage. Diffing it against production surfaced a few visual/structural ideas from the draft worth pulling into a new pass: a flowing-thread hero background, a linear Audit → Build → Enable methodology (replacing the current Consulting/Education two-track split), a moving clients/social-proof section, and a bolder closing section with a founder photo.

This is a redesign of the existing production homepage (`wexadvisory.com`, repo `wexmix3/wexadvisory-site`), built and reviewed at a new preview route before being swapped into `/` — same graduation pattern used for the `homepage-v2` pilot (see `src/app/homepage-v2/page.tsx`, now a redirect to `/` after its content graduated).

## Goals

- Replace the hero's particle-globe background with a flowing-thread canvas animation.
- Collapse the Consulting/Education two-track methodology into one linear Audit → Build → Enable flow, where Enable *is* the training/education step.
- Add a new clients/social-proof section: horizontal auto-scrolling marquee featuring 25N Coworking + RECO.
- Redesign the close section: bold closing headline, founder photo, "direct advisory with Max Wexley" line, CTA.
- Keep CaseStudies, ToolsShowcase, AuditHighlight, FAQ unchanged.
- Ship as a reviewable preview route first; do not touch `/` until Max approves.

## Non-Goals

- No changes to nav, footer, audit landing page (`/audit`), or the four service SEO pages (`ai-consulting-for-small-businesses` etc.).
- No new copy for CaseStudies/ToolsShowcase/AuditHighlight/FAQ — those sections carry over as-is.
- Not replacing the particle-globe *component* elsewhere — `ParticleGlobe.tsx` stays in the codebase (unused by the new hero, but not deleted, in case other pages reference it).
- No CMS/dynamic client-logo system — 25N and RECO are hardcoded; adding more clients later is a follow-up, not part of this build.

## Page Structure

New route: `src/app/homepage-v3/page.tsx`, new component dir `src/components/homepage-v3/`.

```
Nav
  → ThreadHero          (new)
  → Methodology          (rebuilt from HowWeWork.tsx, new linear layout)
  → ClientsMarquee       (new)
  → CaseStudies          (unchanged, reused from homepage-v2)
  → ToolsShowcase        (unchanged, reused)
  → AuditHighlight       (unchanged, reused)
  → FAQ                  (unchanged, reused)
  → CloseSection         (rebuilt)
Footer
```

Rationale for marquee placement: it teases proof (logos) right after the methodology pitch, before CaseStudies delivers the detailed narrative — attention → credibility (light) → credibility (deep) → conversion.

## Components

### `ThreadHero.tsx`
- Canvas 2D, `requestAnimationFrame` loop. No new npm dependencies.
- Procedural flowing strands: layered bezier curves driven by simplex/Perlin-style noise (roll a small noise function inline — no new dependency for this alone), navy background with soft gold/white line highlights matching brand palette.
- Headline + subhead render as normal DOM text on top of the canvas, with a scrim (radial or linear gradient overlay) behind the text block for legibility — same pattern `ParticleGlobe`'s hero currently uses.
- Respects `prefers-reduced-motion`: freeze animation on a static frame if set.
- Same headline copy as current hero unless Max wants new copy — default to keeping "Automate the decade." unless told otherwise during implementation.

### `Methodology.tsx` (replaces `HowWeWork.tsx` usage on this route)
- One linear 3-step section: Audit → Build → Enable.
- Each step: eyebrow number/pill (matching Lovable draft's pill styling), short headline, 1-2 sentence description.
- Enable's description explicitly covers what used to be the separate "Education" track (team training tailored to deployed systems) — folded in as the third step's copy, not a separate bucket.
- Drop the side-by-side Consulting/Education card layout entirely for this route.

### `ClientsMarquee.tsx`
- Horizontal infinite auto-scroll (CSS animation, duplicated track for seamless loop — standard marquee technique, no new dependency).
- Eyebrow label above (e.g. "Built by builders, trusted by operators").
- Two entries: 25N Coworking, RECO. Text/logo-mark style (whatever brand marks exist for each — check `DashboardShowcase.tsx` / `CaseStudy.tsx` for any existing client name/logo treatment to reuse).
- Pauses on hover (standard marquee UX, cheap to add via `animation-play-state`).

### `CloseSection.tsx` (rebuilt for this route)
- Bold closing headline (new copy, Wex-specific — draft during implementation, e.g. riffing on "Stay ahead of the decade" territory without copying the Lovable line verbatim).
- "Get started" CTA button (routes to same destination as current CloseSection's CTA — check current component before rebuilding).
- Founder photo (circular, existing headshot asset — check `AboutFounder.tsx` for the asset path already in use) + line: "Direct advisory with Max Wexley — every audit, build, and workshop runs through him, not an account manager."

## Data Flow / State

Static content only — no new data fetching, no new API routes, no Supabase changes. All copy/config lives in the component files, consistent with how `HeroLoop.tsx` / `HowWeWork.tsx` are currently written.

## Testing / Verification

- `npm run dev`, visually check `/homepage-v3` at desktop + mobile widths.
- Verify `prefers-reduced-motion` freezes the canvas (DevTools emulation).
- Verify marquee loops seamlessly with no visible seam/jump.
- Lighthouse/perf sanity check on the canvas animation (should stay lightweight — 2D canvas, not WebGL).
- Per CLAUDE.md standing rule: open the real rendered page and click through it — don't rely on an automated check alone.
- Do not touch `/` (production homepage) until Max reviews `/homepage-v3` and approves the swap.

## Rollout

1. Build at `/homepage-v3`.
2. Max reviews locally (`npm run dev`) or via a preview deploy.
3. On approval: swap `src/app/page.tsx` to use the new components (same graduation pattern as `homepage-v2` → `/`), then turn `/homepage-v3` into a redirect to `/` (matching the existing `homepage-v2` pattern), commit, deploy.
4. Worksheet + git tag per CLAUDE.md convention (`work/homepage-v3-redesign`).
