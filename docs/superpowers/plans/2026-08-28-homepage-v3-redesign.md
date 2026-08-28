# Homepage v3 Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a `/homepage-v3` preview route that restyles the hero to an ambient full-bleed composition, replaces the two-track methodology section with a linear Audit → Build → Enable flow, adds a new auto-scrolling clients marquee (25N Coworking + RECO), and adds a "direct advisory" line to the close section — without touching the live `/` route until Max approves.

**Architecture:** New route `src/app/homepage-v3/page.tsx` assembles a mix of new/restyled components (`src/components/homepage-v3/`) and unchanged components reused directly from `src/components/homepage-v2/` and `src/components/FAQ.tsx`. No new dependencies, no new data fetching — all content is static JSX/CSS, matching the existing codebase's pattern (see `HowWeWork.tsx`, `CloseSection.tsx`).

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS (utility classes) + CSS Modules (for the hero's animation-heavy styling, following `HeroFlowStage.module.css`'s existing pattern). No test framework exists in this repo (confirmed: no `*.test.*`/`*.spec.*` files) — verification is `npm run lint` + `npm run build` (type-check) per task, plus manual visual check via `npm run dev`, per this repo's standing "verify by using it" convention.

**Spec:** `docs/superpowers/specs/2026-08-28-homepage-v3-redesign-design.md`

## Global Constraints

- Branch: `homepage-v3-redesign` (already created off `origin/master`) — do not touch any of the other 8 in-flight branches in this repo.
- Do not modify `src/app/page.tsx`, `src/components/homepage-v2/HeroFlowStage.tsx`, `HeroFlowStage.module.css`, `HowWeWork.tsx`, or `CloseSection.tsx` — those are the live production files. This build creates parallel `homepage-v3/` versions instead, per the spec's rollout plan (swap happens only after Max approves).
- Reuse `public/hero/braided-flow.webp` as-is — no new hero image generation.
- No reintroduction of looping/light-sweep hero motion (rejected 2026-08-27 as "reading fake") — only the existing drift/parallax behavior carries over.
- `prefers-reduced-motion` must be respected everywhere motion is added (hero drift/parallax already handles this — must not regress; marquee must also pause/stop under reduced motion).
- Brand colors used verbatim elsewhere in this codebase: `#0A1226` (section background), `#C8A84B` → `#e9d9a8` (gold gradient), `text-gold`/`text-white` Tailwind utility classes (defined in `tailwind.config`: `gold: "#C8A84B"`). Follow these exact values — don't introduce new color values.
- CaseStudies, ToolsShowcase, AuditHighlight, FAQ components are imported unchanged from their existing paths — no copy or logic changes to them.

---

## File Structure

```
src/app/homepage-v3/
  page.tsx                          — MODIFY (currently a redirect stub; becomes the real preview page)

src/components/homepage-v3/
  Hero.tsx                          — CREATE (copy of HeroFlowStage.tsx, points at new CSS module)
  Hero.module.css                   — CREATE (restyled: full-bleed ambient, no vignette-card framing)
  Methodology.tsx                   — CREATE (linear Audit → Build → Enable, replaces HowWeWork for this route)
  ClientsMarquee.tsx                — CREATE (new section)
  ClientsMarquee.module.css         — CREATE (marquee scroll animation)
  CloseSection.tsx                  — CREATE (copy of CloseSection.tsx + "direct advisory" line)
```

Each new component is self-contained (one file responsible for one section), following the existing `homepage-v2/` pattern of one component per homepage section.

---

## Task 1: Restyle the hero composition (`homepage-v3/Hero.tsx` + `Hero.module.css`)

**Files:**
- Create: `src/components/homepage-v3/Hero.tsx`
- Create: `src/components/homepage-v3/Hero.module.css`

**Interfaces:**
- Consumes: `public/hero/braided-flow.webp` (existing asset, no changes)
- Produces: default-exported `Hero` component, used by Task 6 (`homepage-v3/page.tsx`)

- [ ] **Step 1: Create `Hero.tsx` as a copy of `HeroFlowStage.tsx` with the CSS import repointed**

```tsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Hero.module.css";

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

// homepage-v3 preview variant of HeroFlowStage: same asset/drift/parallax
// logic, restyled composition only (full-bleed ambient, no vignette-card
// framing) per the 2026-08-28 spec. Once approved, this replaces
// HeroFlowStage.module.css directly rather than staying a parallel file.
export default function Hero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reducedMotion) return;
      const stage = stageRef.current;
      const bg = bgRef.current;
      if (!stage || !bg) return;
      const r = stage.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      bg.style.setProperty("--tx", `${px * -10}px`);
      bg.style.setProperty("--ty", `${py * -10}px`);
    },
    [reducedMotion]
  );

  const resetTilt = useCallback(() => {
    const bg = bgRef.current;
    if (!bg) return;
    bg.style.setProperty("--tx", "0px");
    bg.style.setProperty("--ty", "0px");
  }, []);

  return (
    <div ref={stageRef} className={styles.stage} onMouseMove={handleMove} onMouseLeave={resetTilt}>
      <div ref={bgRef} className={styles.bgParallax}>
        <div className={styles.bgDrift}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hero/braided-flow.webp" alt="" className={styles.bgImage} />
        </div>
      </div>

      <div className={styles.ambientWash} />
      <div className={styles.textScrim} />

      <div className={styles.centerText}>
        <h1>
          AI is complex.
          <br />
          <span className={styles.accent}>Working with us isn&apos;t.</span>
        </h1>
        <a href="/audit" className={styles.ctaPrimary}>
          Get your free AI Snapshot
        </a>
        <a
          href="https://calendly.com/maxwexley-wexadvisory/free-strategy-call"
          className={styles.ctaSecondary}
        >
          or book a strategy call →
        </a>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `Hero.module.css` — restyled for full-bleed ambient composition**

Base this on `homepage-v2/HeroFlowStage.module.css` with these changes: `.vignette` (radial spotlight that reads as a "framed photo") is replaced by `.ambientWash`, a much wider/subtler uniform darkening with no bright spotlight center — the image should read edge-to-edge with no visible "frame ring." `.centerVignette` is renamed `.textScrim` and widened/softened so it still gives text contrast without reading as a hard radial spotlight. All other rules (drift, parallax, headline/CTA animations, reduced-motion overrides) carry over unchanged.

```css
.stage {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  background: #0a1226;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6rem 1.5rem;
}

/* Pointer-driven parallax only — no automatic sweep/highlight loop, per
   direct feedback (2026-08-27) that a looping light-sweep overlay read as
   fake/bad on the earlier prototype. Carried over unchanged from
   HeroFlowStage. */
.bgParallax {
  position: absolute;
  inset: -3%;
  transform: translate3d(var(--tx, 0px), var(--ty, 0px), 0);
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
}

.bgDrift {
  position: absolute;
  inset: 0;
  animation: heroFlowDrift 90s ease-in-out infinite;
  transform-origin: 62% 45%;
  will-change: transform;
}

@keyframes heroFlowDrift {
  0% {
    transform: scale(1.04) translate3d(0, 0, 0);
  }
  50% {
    transform: scale(1.07) translate3d(-0.6%, 0.4%, 0);
  }
  100% {
    transform: scale(1.04) translate3d(0, 0, 0);
  }
}

.bgImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Ambient full-bleed wash — replaces HeroFlowStage's .vignette radial
   spotlight (which read as a "photo in a frame"). This is a low-opacity,
   near-uniform darken with a very gentle edge feather, so the image reads
   edge-to-edge instead of centered-in-a-frame. Matches the Lovable draft's
   ambient/low-contrast hero integration. */
.ambientWash {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(10, 18, 38, 0.35) 0%,
    rgba(10, 18, 38, 0.2) 40%,
    rgba(10, 18, 38, 0.45) 100%
  );
  pointer-events: none;
}

/* Text legibility scrim — wider and softer than HeroFlowStage's
   .centerVignette so it doesn't read as a hard radial spotlight, but still
   gives the headline/CTAs enough contrast against the image. */
.textScrim {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    70% 60% at 50% 48%,
    rgba(10, 18, 38, 0.6) 0%,
    rgba(10, 18, 38, 0.32) 60%,
    transparent 90%
  );
  pointer-events: none;
}

.centerText {
  position: relative;
  z-index: 5;
  text-align: center;
  width: min(420px, 84vw);
}

.centerText h1 {
  color: #f5f5f2;
  font-size: clamp(1.9rem, 4vw, 2.75rem);
  font-weight: 700;
  line-height: 1.18;
  margin: 0 0 1.25rem;
  letter-spacing: -0.01em;
  opacity: 0;
  animation: rise 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards;
}

.accent {
  background: linear-gradient(90deg, #c8a84b, #e9d9a8);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.ctaPrimary {
  display: inline-block;
  background: linear-gradient(90deg, #c8a84b, #e9d9a8);
  color: #0a1226;
  font-weight: 700;
  font-size: 0.9rem;
  padding: 0.8rem 1.6rem;
  border-radius: 999px;
  text-decoration: none;
  margin-bottom: 0.7rem;
  box-shadow: 0 8px 24px rgba(200, 168, 75, 0.18);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  opacity: 0;
  animation: rise 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.32s forwards;
}

.ctaPrimary:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 28px rgba(200, 168, 75, 0.28);
}

.ctaSecondary {
  display: block;
  color: #c8ccd6;
  font-size: 0.8rem;
  text-decoration: underline;
  text-underline-offset: 3px;
  opacity: 0;
  animation: rise 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.44s forwards;
}

.ctaSecondary:hover {
  color: #f5f5f2;
}

@media (prefers-reduced-motion: reduce) {
  .bgDrift {
    animation: none !important;
  }
  .bgParallax {
    transition: none !important;
    transform: none !important;
  }
}
```

- [ ] **Step 3: Lint check**

Run: `npm run lint`
Expected: no errors in the two new files.

- [ ] **Step 4: Commit**

```bash
git add src/components/homepage-v3/Hero.tsx src/components/homepage-v3/Hero.module.css
git commit -m "feat(homepage-v3): restyle hero to full-bleed ambient composition"
```

---

## Task 2: Linear methodology section (`homepage-v3/Methodology.tsx`)

**Files:**
- Create: `src/components/homepage-v3/Methodology.tsx`

**Interfaces:**
- Consumes: nothing (static content)
- Produces: default-exported `Methodology` component, used by Task 6

- [ ] **Step 1: Create `Methodology.tsx`**

```tsx
const STEPS = [
  {
    id: "audit",
    tag: "01 — Audit",
    title: "We map what's actually costing you time",
    body: "A free, no-pitch assessment of where AI can realistically save your team hours — not a generic maturity score, a specific list of what's worth automating.",
    points: ["Free AI readiness audit", "Concrete savings estimate", "No obligation to build anything"],
  },
  {
    id: "build",
    tag: "02 — Build",
    title: "We build the system, not a slide deck",
    body: "Custom-scoped automation and dashboards, delivered to production — boutique, on-call, personal. Not a handoff to an account manager.",
    points: ["Custom-scoped automation builds", "Shipped to production, not a prototype", "Ongoing support built in"],
  },
  {
    id: "enable",
    tag: "03 — Enable",
    title: "We make sure your team can actually run it",
    body: "Hands-on training grounded in the tools we just built for you — a walkthrough of your own stack, not a generic slide deck.",
    points: ["Live team training on your own tools", "Walkthroughs, not documentation dumps", "Scoped to your actual stack"],
  },
];

export default function Methodology() {
  return (
    <section id="flagship" className="bg-[#0A1226] py-24 px-6 border-t border-white/5">
      <div className="max-w-3xl mx-auto">
        <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">How We Work</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-16">
          One relationship. Three steps.
        </h2>

        <div className="relative">
          <div
            className="absolute left-[15px] top-2 bottom-2 w-px bg-white/10"
            aria-hidden="true"
          />
          <div className="space-y-12">
            {STEPS.map((s) => (
              <div key={s.id} className="relative pl-12">
                <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-[#0A1226] border border-gold/40 flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-gold" />
                </div>
                <p className="text-gold text-[11px] font-bold tracking-[0.2em] uppercase mb-2">
                  {s.tag}
                </p>
                <p className="text-white text-xl font-bold mb-3">{s.title}</p>
                <p className="text-white/50 text-sm leading-relaxed mb-4 max-w-xl">{s.body}</p>
                <ul className="space-y-2">
                  {s.points.map((p) => (
                    <li key={p} className="text-white/70 text-sm flex items-start gap-2">
                      <span className="text-gold mt-0.5">&#8226;</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Lint check**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/homepage-v3/Methodology.tsx
git commit -m "feat(homepage-v3): linear Audit -> Build -> Enable methodology section"
```

---

## Task 3: Clients marquee (`homepage-v3/ClientsMarquee.tsx`)

**Files:**
- Create: `src/components/homepage-v3/ClientsMarquee.tsx`
- Create: `src/components/homepage-v3/ClientsMarquee.module.css`

**Interfaces:**
- Consumes: nothing (static content — client names match the `eyebrow` values already used in `homepage-v2/CaseStudies.tsx`: "RECO" / "25N Coworking")
- Produces: default-exported `ClientsMarquee` component, used by Task 6

- [ ] **Step 1: Create `ClientsMarquee.module.css`**

```css
.marquee {
  overflow: hidden;
  position: relative;
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%);
  mask-image: linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%);
}

.track {
  display: flex;
  width: max-content;
  animation: marqueeScroll 24s linear infinite;
}

.marquee:hover .track {
  animation-play-state: paused;
}

@keyframes marqueeScroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .track {
    animation: none;
  }
}
```

- [ ] **Step 2: Create `ClientsMarquee.tsx`**

```tsx
import styles from "./ClientsMarquee.module.css";

const CLIENTS = ["25N Coworking", "RECO"];
// Duplicated once so the loop is seamless — the track scrolls exactly
// -50% (one full copy's width), then resets invisibly.
const LOOP = [...CLIENTS, ...CLIENTS];

export default function ClientsMarquee() {
  return (
    <section className="bg-[#0A1226] py-16 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-8 text-center">
          Built by builders, trusted by operators
        </p>
        <div className={styles.marquee}>
          <div className={styles.track}>
            {LOOP.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="text-white/40 text-2xl md:text-3xl font-bold tracking-tight whitespace-nowrap px-10"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Lint check**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/homepage-v3/ClientsMarquee.tsx src/components/homepage-v3/ClientsMarquee.module.css
git commit -m "feat(homepage-v3): add auto-scrolling clients marquee (25N Coworking, RECO)"
```

---

## Task 4: Close section with direct-advisory line (`homepage-v3/CloseSection.tsx`)

**Files:**
- Create: `src/components/homepage-v3/CloseSection.tsx`

**Interfaces:**
- Consumes: `public/headshot.jpg` (existing asset, already used by `CloseSection.tsx` and `AboutFounder.tsx`)
- Produces: default-exported `CloseSection` component, used by Task 6

- [ ] **Step 1: Create `CloseSection.tsx` — copy of the existing `CloseSection.tsx` with one added line**

```tsx
import Image from "next/image";

export default function CloseSection() {
  return (
    <section id="contact" className="bg-[#0A1226] py-28 px-6 border-t border-white/5">
      <div className="max-w-2xl mx-auto text-center flex flex-col items-center">
        <div className="relative w-28 h-28 rounded-full overflow-hidden border border-gold/30 shadow-[0_0_40px_rgba(200,168,75,0.15)] mb-6">
          <Image src="/headshot.jpg" alt="Max Wexley" fill className="object-cover" sizes="112px" />
        </div>
        <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-4">
          Let&apos;s Talk
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Your business runs on more noise than it thinks.
        </h2>
        <p className="text-white/50 text-base mb-3">
          The audit is where clarity starts. No pitch deck — just a real look at what AI could
          actually do for your team.
        </p>
        <p className="text-white/40 text-sm mb-8">
          Direct advisory with Max Wexley — every audit, build, and workshop runs through him,
          not an account manager.
        </p>
        <div className="flex gap-3 flex-wrap justify-center">
          <a
            href="/audit"
            className="bg-gradient-to-r from-gold to-[#e9d9a8] text-navy font-semibold text-sm px-6 py-3 rounded-full hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(200,168,75,0.25)] transition-all"
          >
            Get your free AI Snapshot
          </a>
          <a
            href="https://calendly.com/maxwexley-wexadvisory/free-strategy-call"
            className="border border-white/20 text-white/90 font-medium text-sm px-6 py-3 rounded-full hover:border-white/40 hover:bg-white/[0.04] transition-all"
          >
            Book a strategy call
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Lint check**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/homepage-v3/CloseSection.tsx
git commit -m "feat(homepage-v3): add direct-advisory line to close section"
```

---

## Task 5: Assemble the preview page (`homepage-v3/page.tsx`)

**Files:**
- Modify: `src/app/homepage-v3/page.tsx` (currently a redirect stub — replace entirely)

**Interfaces:**
- Consumes: `Hero`, `Methodology`, `ClientsMarquee`, `CloseSection` from `homepage-v3/` (Tasks 1-4); `CaseStudies`, `ToolsShowcase`, `AuditHighlight` from `homepage-v2/`; `FAQ` from `components/FAQ`; `Nav`, `Footer`, `ScrollReveal` from `components/`
- Produces: the `/homepage-v3` route

- [ ] **Step 1: Replace `src/app/homepage-v3/page.tsx`**

```tsx
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Hero from "@/components/homepage-v3/Hero";
import Methodology from "@/components/homepage-v3/Methodology";
import ClientsMarquee from "@/components/homepage-v3/ClientsMarquee";
import CaseStudies from "@/components/homepage-v2/CaseStudies";
import ToolsShowcase from "@/components/homepage-v2/ToolsShowcase";
import AuditHighlight from "@/components/homepage-v2/AuditHighlight";
import FAQ from "@/components/FAQ";
import CloseSection from "@/components/homepage-v3/CloseSection";

// Preview route for the 2026-08-28 homepage redesign
// (docs/superpowers/specs/2026-08-28-homepage-v3-redesign-design.md).
// Order: hero hooks -> Methodology sets expectations -> ClientsMarquee
// teases proof -> CaseStudies delivers the detailed proof -> ToolsShowcase
// -> AuditHighlight asks -> FAQ handles objections -> CloseSection closes.
// Not linked from nav; review at /homepage-v3 directly. Swaps into "/"
// only after approval (see spec's Rollout section).
export default function HomepageV3Preview() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ScrollReveal>
          <Methodology />
        </ScrollReveal>
        <ScrollReveal>
          <ClientsMarquee />
        </ScrollReveal>
        <ScrollReveal>
          <CaseStudies />
        </ScrollReveal>
        <ScrollReveal>
          <ToolsShowcase />
        </ScrollReveal>
        <ScrollReveal>
          <AuditHighlight />
        </ScrollReveal>
        <ScrollReveal>
          <FAQ />
        </ScrollReveal>
        <ScrollReveal>
          <CloseSection />
        </ScrollReveal>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Lint check**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 3: Type-check / build**

Run: `npm run build`
Expected: build succeeds with no TypeScript errors, `/homepage-v3` listed in the route output.

- [ ] **Step 4: Commit**

```bash
git add src/app/homepage-v3/page.tsx
git commit -m "feat(homepage-v3): assemble preview page from new + reused sections"
```

---

## Task 6: Manual verification pass

**Files:** none (verification only)

- [ ] **Step 1: Start the dev server**

Run: `npm run dev`
Expected: server starts on `http://localhost:3000`.

- [ ] **Step 2: Open `http://localhost:3000/homepage-v3` and visually check each section**

Confirm in the browser (per CLAUDE.md's "verify by using it" standing rule — do not skip this and rely on lint/build alone):
- Hero reads as full-bleed/ambient with no visible "framed photo" ring; headline legible; hover triggers subtle parallax tilt.
- Methodology shows a single vertical Audit → Build → Enable flow (not two side-by-side cards).
- Clients marquee scrolls continuously left, loops seamlessly with no visible jump/seam, pauses on hover.
- CaseStudies, ToolsShowcase, AuditHighlight, FAQ render identically to the live `/` page (unchanged).
- CloseSection shows the founder photo, headline, new "Direct advisory with Max Wexley..." line, and both CTAs.

- [ ] **Step 3: Check mobile width**

In DevTools, set viewport to 375px wide. Confirm: hero text stays legible over the image, methodology stack doesn't overflow horizontally, marquee still scrolls, close section stays centered and readable.

- [ ] **Step 4: Check `prefers-reduced-motion`**

In DevTools, enable "Emulate CSS prefers-reduced-motion: reduce" (Rendering tab). Reload `/homepage-v3`. Confirm: hero drift/parallax stops, marquee track stops scrolling (all client names should be readable statically, not require waiting for the loop).

- [ ] **Step 5: Confirm no regression on the live `/` route**

Run: `curl -s http://localhost:3000/ | grep -o "Two ways in\|One relationship"` (or open `http://localhost:3000/` directly)
Expected: `/` still shows "Two ways in. One relationship." (the unchanged live `HowWeWork` copy) — confirms `/homepage-v3` work did not touch the production route.

- [ ] **Step 6: Write the worksheet and tag**

Per CLAUDE.md's worksheet convention, create `state/worksheets/homepage-v3-redesign-2026-08-28.md` in the **aios** repo (not wex-advisory) — goal, steps taken, verification evidence from Steps 1-5 above, remaining scope (the swap into `/` is NOT part of this plan — it happens after Max reviews and approves `/homepage-v3`), open risks (none identified; no production files were touched).

```bash
git add state/worksheets/homepage-v3-redesign-2026-08-28.md
git commit -m "log: homepage v3 redesign worksheet"
git tag work/homepage-v3-redesign
```

(Run this commit/tag in the **aios** repo, from `c:\Users\maxmw\Downloads\Claude\aios`, not in `wex-advisory`.)

- [ ] **Step 7: Report status to Max**

Summarize what was built, link the preview URL (`http://localhost:3000/homepage-v3` while dev server runs, or push the branch and note it needs a Vercel preview deploy for a shareable link), and explicitly state the swap-into-`/` step is pending his review — do not deploy or merge without his go-ahead (per CLAUDE.md's "show intent first" rule for anything touching production).
