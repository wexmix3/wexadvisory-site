# Wex Advisory homepage — BRIEF

## Interview (Step 0, verbatim)

1. **Vibe:** "Sleek, aesthetic, easy to understand."
2. **Journey:** "The visitor should see what we do, who we have done it for, and how to contact me."
3. **Energy curve:** "It should feel calm at first to build trust, more intense in the middle, and easy at the end again."
4. **Feeling + peak:** "They should feel excited by the work I have done, imagining me doing the same for their business. They will be thinking of all the issues AI can help them with. The ONE moment they should remember is the results of their AI Audit."
5. **Signature seed:** "Wow the audience with a demo that shows the products/features/services that can be done for them."
6. **Range:** "Premium minimal."
7. **Structure:** "Distinct scenes / chapters."
8. **Assets:** "I have a photo of myself and the particle globe hero. I am willing to add more." (Photo not yet supplied to this build — placeholder held for chapter 6.)

## Step 1 follow-up

- What must the visitor believe by the end: **"This person already sees the AI opportunity in my business."**
- The one action, one label, everywhere: **"Get my free AI Audit"**
- Art direction: **Low-key cinematic** (dark, controlled, one light source, deep charcoal + warm amber/gold grade) — matches the existing navy/gold brand and the particle-globe hero.

## Grammar: Chaptered editorial

Chosen because the interview explicitly asked for distinct scenes/chapters (Q7), not one continuous world. The other seven:
- Filmic one-shot — the house default this skill exists to avoid reaching for by habit; also implies one continuous camera move, which contradicts "distinct scenes."
- Live surface — right grammar for the AI Audit *product itself*, wrong for a homepage that also needs a hero, trust section and contact; would ban all marketing chrome.
- Continuous world — explicitly the opposite of what was asked (Q7).
- Typographic poster — no room for the case-study substance or the range of services.
- Gallery/catalog — right for "who we've done it for" alone, wrong for a page that also has to carry a persuasion arc (calm → intense → easy).
- Split stage — tempting for "before/after AI," but forces a symmetric two-column hero, which conflicts with keeping the particle-globe hero as a singular opening moment.
- Rhythmic cutlist — wrong energy; the brief wants calm-open and a held peak, not a pulse of hard cuts.

**Adaptation:** chaptered editorial's hero convention is a pure typographic title page ("no media above the fold"). Max explicitly wants the particle-globe hero kept. Resolution: the globe is treated as the chapter's *ground* (a living paper texture, not an inserted photograph/video) — type sits directly on it, nothing floats above it as a card or scrim-protected image. This satisfies "type on the ground" while honoring the existing asset.

## Journey (Step 1 beats)

1. Recognition — the visitor lands, sees the studio is real and current
2. Tension — the cost of not knowing where AI already applies, named plainly
3. Turn — the AI Audit scorecard demo (PEAK)
4. Substance — the 25N case study, museum-label facts
5. Range — the three ways to work together
6. Commitment — one CTA, contact

## Feeling curve

```
0  Calm         title page, globe drifting slowly behind quiet type, one line, one link
1  Recognition  flow section, plain copy naming what's already true of their business
2  Tension      pin act, three short lines building, the specific everyday cost of not knowing
3  Awe (PEAK)   the scorecard rings fill themselves as you scroll — signature move
4  Confidence   25N proof, real facts set as museum labels, no persuasion language
5  Clarity      pan rail, the three ways to engage, easy to parse
6  Resolve      quiet colophon close, one CTA, calm again
```

## The peak

**Sentence:** "You watch your own business's AI scorecard fill in front of you — category by category, drawing itself as you scroll — and the last ring stays open, waiting on the real one."

Lives in Chapter 3. Gets: the asset budget (this is the only bespoke-built device on the page), the silence in front of it (Chapter 2 ends on a held, quiet line rather than a loud one), and the largest span on the page.

**Authored silence:** the transition from Chapter 2 to Chapter 3 is a deliberate one-line hold with no new content for roughly 15% of Chapter 2's span, so Chapter 3's first ring feels like an answer rather than another line in a list.

## Tell-someone sentence

"It's the site where you watch your own business's AI scorecard fill in front of you, and then find out the real one takes three minutes."

## Signature move

**The self-filling scorecard.** Four score rings (SVG `stroke-dashoffset` driven off `--sc-p`), labelled with the real categories the AI Audit tool actually evaluates (Automation Opportunity, Data Readiness, Workflow Friction, Competitive Exposure). The first three fill to a demonstration state as the reader scrolls — not fabricated numbers, just the mechanic proving itself. The fourth ring stays visibly unfilled/dashed, labelled "Yours — unlocked in 3 minutes," and is the CTA. No invented statistics anywhere in the act; the only real number on the page (pricing) is in Chapter 5.

## Assets

- Particle-globe hero: reused as Chapter 0's living ground (pilot build approximates the production react-three-fiber/GLSL component with a lightweight canvas particle field, since this is a standalone static build outside the Next.js app — noted in the build report as a stand-in, not a claim of pixel parity).
- Max's photo: not supplied to this build. Chapter 6 is typeset to hold it (a masked portrait slot) but ships without it; drop-in when provided.
- No KIE_AI_API_KEY configured — no photoreal generation for this pilot. No `scrub` video acts used as a result; the grammar (chaptered editorial) already leans away from scrub, so this is not a compromise.
- 25N case study: no photography available; carried as typographic museum-label facts only, consistent with the grammar.

## Fingerprint gate

Registry (`scrollcraft/FINGERPRINTS.md`) is empty — first build for this workspace. Gate passes trivially. This build's row will be appended after Step 5.
