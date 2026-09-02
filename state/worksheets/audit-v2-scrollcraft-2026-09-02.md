# Worksheet — /audit-v2 ScrollCraft rebuild (Fable 5 cost/perf test)

**Date:** 2026-09-02 · **Session start:** 11:05 EDT · **Model:** Fable 5 (claude-fable-5), switched from Sonnet 5 specifically to test Nate Herk's Fable cost claims (x.com/nateherk/status/2094977775593525567)

## Goal

Rebuild the wexadvisory.com/audit lead-gen landing page with the ScrollCraft
skill as (a) a real conversion-page upgrade and (b) a live cost/quality test of
the ScrollCraft 7-part method + Fable 5. Shipped as a preview route at
`/audit-v2` (noindex); promotion to `/audit` is a separate approved step.

## What was built

- `src/app/audit-v2/` — page.tsx (metadata, noindex), AuditSurface.tsx (the
  whole surface), audit-surface.css (theme + page CSS), engine.css (untouched
  scrollcraft engine CSS copy). Engine JS served from `public/sc/scrollcraft.js`
  (untouched copy), mounted client-side.
- **Grammar:** live surface — the page IS the audit product running on a
  labelled real sample (the 25N test run, anonymized as "5-location coworking
  operator", same pattern as /work). All figures real, totals computed in page
  JS from the data rows (honesty rule).
- **5 acts:** pin boot (status log + `--sc-p` meter) → flow labor ledger
  (real hours/rates, 206 hrs/mo count) → reveal findings board (5 ranked
  opportunities, real $) → pin PEAK (5 score rings drawn from `--sc-p`,
  $216,124 counts up) → flow close with a REAL url input that carries the typed
  URL to audit.wexadvisory.com/audit?url=…&utm_source=audit-landing-v2.
- **Signature move:** the scanline — fixed read-line at 62vh; values resolve
  (blur→clear) as they cross it, stamping an append-only SPECIMEN LOG (fixed
  margin panel ≥1200px, counter chip below). Pinned acts stamp off `--sc-p`
  thresholds instead. One-way, bespoke JS, engine untouched.
- **ai-audit repo:** `app/audit/page.tsx` now reads `?url=` and prefills the
  companyUrl field, so the landing page's close input is honest end-to-end.
  Committed locally; NOT pushed (push = Vercel deploy = needs Max approval).

## Verification evidence

- Harness (`shoot.mjs`): desktop (shots/2/3/4), mobile 390×844 (mobile/2),
  reduced motion (reduced/2) — all report "no dead scroll detected" and
  "all cues clear 4.5:1". Contact sheets read by eye each round.
- Bugs caught by the sheets, fixed and re-shot: (1) `.ring` class collided
  with Tailwind's `ring` utility → blue boxes around score rings, renamed
  `.scoring`; (2) specimen log overlapped ledger right edge at 1440px →
  wraps capped at 58rem; (3) act-1 exit slide was an empty viewport → last
  boot line now holds (template's tension-pin precedent); (4) score-act entry
  showed only a label → rings block greets as zeroed dials (ground-or-greet).
- Feel check (cold): curious / uneasy / payoff / landing / calm — matches
  BRIEF curve. Deviation noted: pre-peak quiet is the peak's own zero-dial
  entry, not a separate silent act; authored silence sits between peak and ask.
- `tsc --noEmit` clean in both repos.
- NOT verified: a real phone (no video on this page so the iOS clip risk is
  minimal, but touch scroll + real-device rendering unchecked); production
  build (`next build`) not run; live deploy not done (approval-gated).

## Remaining scope / next steps

1. Max views http://localhost:4573/audit-v2 (dev server, port 4573) and
   judges vs current /audit.
2. If approved: `next build` check, push wex-advisory (Vercel auto-deploy),
   push ai-audit (prefill), verify live, then decide whether /audit-v2
   replaces /audit (swap + redirect + flip robots to index).
3. Cost read: Max runs `/cost` in-session for the Fable 5 number; compare
   against typical Sonnet builds and Nate's $11–18/site claims.

## Open risks

- Engine CSS is imported route-scoped but persists after client-side
  navigation (body bg token ≈ site navy, so visually negligible).
- `window.__auditSurfaceMounted` guard means engine won't re-mount after
  SPA navigation away/back; full page load is fine. Acceptable for a
  landing page reached by direct link; revisit if it joins main-site nav.
- Log/chip and scanline untested with screen readers beyond aria-label /
  aria-hidden markup.
