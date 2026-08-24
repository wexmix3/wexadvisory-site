# Fingerprints

Every site you build with **scrollcraft** gets one row here, appended after it
ships. The registry exists so your next build can prove it is a different page
rather than a re-skin of one you already made.

This file is **yours**. It starts empty on purpose: the gate is about not
repeating *yourself*, so it has nothing to say until you have built something.

The rules and the gate live in the skill's
`references/uniqueness.md`. Short version:

**A new build must differ from EVERY row below on at least 4 of the 6
dimensions.** Four against each row individually, not four on average across the
table. If a planned build fails, change the plan. Never edit a row to make room
for it.

The six dimensions are: **grammar**, **nav treatment**, **hero device**,
**act-sequence shape**, **close pattern**, **signature move**.

Dimension 6 is free, because a signature move is unique by definition. So the
gate really asks for three more out of the remaining five, and a build that
changes only grammar and world will fail it.

---

## The registry

| Build | Grammar | Nav treatment | Hero device | Act-sequence shape | Close pattern | Signature move | World | Port |
|---|---|---|---|---|---|---|---|---|
| wex-advisory-homepage | Chaptered editorial | Folio in margin (chapter number + title, no fixed bar) | Type-on-living-ground title page (particle-field canvas as ground, no inserted media) | 7 chapters, 15.8–16.0vh, flow > flow > pin > pin > flow > pan > pin | Colophon: quiet running-text close, CTA as inline underlined link, no magnet | The self-filling scorecard: 4 SVG rings, 3 fill via CSS `calc()` off `--sc-p`, 4th stays dashed/locked as the CTA | Low-key cinematic (deep navy/gold, no photoreal generation — canvas + type only) | Static pilot build outside the Next.js app, not yet merged |

*(First build — gate passes trivially. The next Wex Advisory scrollcraft build should avoid: chaptered editorial as the default reach, a folio-only nav, and a scorecard/ring-based signature move.)*

---

## What is taken

Add a bullet here whenever a build claims something a later build should avoid
reusing: a grammar, a nav treatment, a close pattern, a signature move, an
act-count-and-length band. The shared columns are what the next build inherits
as a constraint, so writing them down is the whole point.

- Chaptered editorial grammar — taken by `wex-advisory-homepage`.
- Folio-in-margin nav (chapter number + title, no fixed bar) — taken by `wex-advisory-homepage`.
- The self-filling scorecard / score-ring signature move — taken by `wex-advisory-homepage`.
- Low-key cinematic navy/gold world — taken by `wex-advisory-homepage`.

---

## Appending a row

After shipping, add one line to the table and one bullet to **What is taken** if
the build claimed something new. Fill every column. Say what the build shares
with existing rows.

Rows are append-only. A build that has been superseded stays in the table,
because the space it occupies is still occupied.

---

## Worked example

The skill's author kept a registry of twelve builds across eight page grammars.
If you want to see what a filled-in table looks like, and which shapes tend to
collide, read `EXAMPLES.md` in the scrollcraft repository. Treat it as
illustration only: those rows are somebody else's builds and they do **not**
constrain yours.
