# Homepage v3 Redesign

## Context

Max shared a Lovable draft (`sleek-founder-shine.lovable.app`) that predates the current live homepage. Diffing it against production surfaced a few visual/structural ideas worth pulling into a new pass: an ambient full-bleed hero mood, a linear Audit → Build → Enable methodology (replacing the current Consulting/Education two-track split), a moving clients/social-proof section, and a bolder closing section with a founder photo.

**Correction found during spec review (2026-08-28):** the initial draft of this spec assumed the live hero was still the WebGL particle-globe (per stale `context/wex-advisory.md`). It is not. As of 2026-08-27 (commits `8fece9d`/squashed to master, `37ed874`), the hero is `HeroFlowStage` — a static AI-generated braided-flow image (`public/hero/braided-flow.webp`) with 90s ambient drift + mouse-parallax tilt, framed in a vignetted "card" container. `ParticleGlobe.tsx` and the old `Hero.tsx`/`HeroLoop.tsx` are already deleted from the codebase (confirmed no longer imported anywhere). An earlier looping light-sweep version of this hero was tried and rejected by Max as "reading fake" — do not reintroduce heavy looping motion.

Max confirmed after seeing this: keep `HeroFlowStage`'s existing asset and drift/parallax behavior, but restyle its **composition** to match the Lovable draft's mood — full-bleed, ambient, low-contrast, text sitting directly on the image with no vignette-card framing. This is a CSS/layout change to `HeroFlowStage`, not a new hero component.

This is a redesign of the existing production homepage (`wexadvisory.com`, repo `wexmix3/wexadvisory-site`), built and reviewed at a new preview route before being swapped into `/` — same graduation pattern used for the `homepage-v2` pilot (see `src/app/homepage-v2/page.tsx`, now a redirect to `/` after its content graduated). Branched from `origin/master` (not from any of the several other in-flight redesign branches in this repo — see Context note on branch state below).

**Branch state note:** at spec time, the repo had 8+ unmerged branches beyond master (legal-pages/audit/service/work-page glass redesigns, nav icon, accent-discipline, design-audit-fixes, scrollcraft pilot). This work branches (`homepage-v3-redesign`) cleanly off `origin/master`, which already includes `HeroFlowStage` and the nav icon swap. It does not depend on or touch any of those other branches.

## Goals

- Restyle `HeroFlowStage`'s composition to be full-bleed/ambient (Lovable-style integration) instead of the current vignette-card framing — same image asset, same drift/parallax behavior, no new looping motion.
- Collapse the Consulting/Education two-track methodology into one linear Audit → Build → Enable flow, where Enable *is* the training/education step.
- Add a new clients/social-proof section: horizontal auto-scrolling marquee featuring 25N Coworking + RECO.
- Redesign the close section: bold closing headline, founder photo, "direct advisory with Max Wexley" line, CTA.
- Keep CaseStudies, ToolsShowcase, AuditHighlight, FAQ unchanged.
- Ship as a reviewable preview route first; do not touch `/` until Max approves.

## Non-Goals

- No changes to nav, footer, audit landing page (`/audit`), or the four service SEO pages (`ai-consulting-for-small-businesses` etc.).
- No new copy for CaseStudies/ToolsShowcase/AuditHighlight/FAQ — those sections carry over as-is.
- No new hero image/asset generation — reuse `public/hero/braided-flow.webp` as-is; this is a composition/CSS change only.
- No reintroduction of looping/light-sweep motion on the hero — already tried and rejected.
- No CMS/dynamic client-logo system — 25N and RECO are hardcoded; adding more clients later is a follow-up, not part of this build.
- No work on any of the other 8 in-flight branches in this repo — this build is scoped to `homepage-v3-redesign` off master only.

## Page Structure

New route: `src/app/homepage-v3/page.tsx`, new component dir `src/components/homepage-v3/`.

```
Nav
  → HeroFlowStage        (restyled — full-bleed ambient composition, same asset)
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

### `HeroFlowStage.tsx` + `HeroFlowStage.module.css` (restyled, not rebuilt)
- Same `braided-flow.webp` asset, same drift (`bgDrift`) + pointer-parallax (`bgParallax`, `handleMove`/`resetTilt`) logic — none of that JS changes.
- CSS changes only: remove the vignette-card framing (`.vignette`, `.centerVignette` containment that currently reads as a "photo in a frame"), extend the image full-bleed edge-to-edge behind the whole hero section, let the gradient scrim (not a hard vignette edge) do the legibility work behind the text block — matching the Lovable draft's ambient/low-contrast integration.
- Keep `prefers-reduced-motion` handling as-is (already implemented via `useReducedMotion`).
- Headline copy unchanged unless Max wants new copy during implementation.

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
- Verify `prefers-reduced-motion` still freezes the hero's drift/parallax (no regression from the CSS restyle).
- Verify marquee loops seamlessly with no visible seam/jump.
- Confirm the restyled hero reads as ambient/full-bleed, not as a regression to a flat/boring background — this is a subjective call Max makes visually, not an automated check.
- Per CLAUDE.md standing rule: open the real rendered page and click through it — don't rely on an automated check alone.
- Do not touch `/` (production homepage) until Max reviews `/homepage-v3` and approves the swap.

## Rollout

1. Build at `/homepage-v3`.
2. Max reviews locally (`npm run dev`) or via a preview deploy.
3. On approval: swap `src/app/page.tsx` to use the new components (same graduation pattern as `homepage-v2` → `/`), then turn `/homepage-v3` into a redirect to `/` (matching the existing `homepage-v2` pattern), commit, deploy.
4. Worksheet + git tag per CLAUDE.md convention (`work/homepage-v3-redesign`).
