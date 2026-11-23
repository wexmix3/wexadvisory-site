// The issue checker (scripts/check-newsletter-issue.mjs), offline. A good
// issue passes; each rule of the 2026-11-22 standard fails on its own.
// Run: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const filler = (n: number) => Array.from({ length: n }, (_, i) => `Owners can read this sentence number ${i} about a real change.`).join(" ");

const GOOD = `---
number: 9
title: "A good issue"
description: "One line."
date: 2026-11-24
draft: true
---
**Happy Tuesday.** ${filler(20)}

In this issue:
- One
- Two
- **Plus:** three

## The big one

_A dek line._

### Who answers the phone now?
<!-- published: 2026-11-16 -->
${filler(30)} [one](https://blog.google/a) [two](https://www.microsoft.com/b) [three](https://www.reuters.com/c).

![A diagram of the flow](https://www.wexadvisory.com/og.png)

> **What to do this week**
> - Check your hours.

<!-- share -->

## Quick hits

<!-- published: 2026-11-17 -->
**Tool one.** ${filler(6)} [src](https://stripe.com/x). **For you:** do a thing.

<!-- published: 2026-11-18 -->
**Tool two.** ${filler(6)} [src](https://squareup.com/y). **For you:** do a thing.

<!-- published: 2026-11-19 -->
**Tool three.** ${filler(6)} [src](https://www.shopify.com/z). **For you:** do a thing.

## Repo of the week: Thing

**Setup:** easy. **Cost:** free. We read the docs, haven't run it. [a/b](https://github.com/a/b)

## Prompt of the week: a task

\`\`\`
Do the task with [placeholder].
\`\`\`

> Real output line.

## From Wex Advisory

${filler(8)}
`;

function check(md: string) {
  const file = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "nl-")), "issue.md");
  fs.writeFileSync(file, md);
  const r = spawnSync(process.execPath, ["scripts/check-newsletter-issue.mjs", file, "--offline"], { encoding: "utf8" });
  return { status: r.status, out: `${r.stdout}${r.stderr}` };
}

test("a well-formed issue passes the checker", () => {
  const r = check(GOOD);
  assert.equal(r.status, 0, r.out);
});

const breaks: [string, (md: string) => string, RegExp][] = [
  ["opener without an In this issue list", (m) => m.replace(/- One\n- Two\n/, ""), /In this issue/],
  ["big one with fewer than 3 source sites", (m) => m.replace("[three](https://www.reuters.com/c)", "three"), /at least 3/],
  ["big one without an image", (m) => m.replace(/!\[A diagram[^\n]+\n/, ""), /image with alt text/],
  ["big one without a What to do callout", (m) => m.replace("> **What to do this week**", "> Nothing"), /What to do/],
  ["big one without share", (m) => m.replace("<!-- share -->", ""), /share/],
  ["a quick hit without For you", (m) => m.replace("**Tool two.**", "**Tool two.** x").replace(/(Tool two[^\n]+)\*\*For you:\*\* do a thing\./, "$1"), /For you/],
  ["a stale quick hit", (m) => m.replace("published: 2026-11-17", "published: 2026-11-01"), /limit is 10/],
  ["repo without Setup/Cost facts", (m) => m.replace("**Setup:** easy. **Cost:** free. ", ""), /Setup:/],
  ["a missing local image", (m) => m.replace("https://www.wexadvisory.com/og.png", "/newsletter/0/missing.png"), /not in public/],
  ["an em dash", (m) => m.replace("A dek line.", "A dek — line."), /em or en dash/],
  ["too short", (m) => m.replace(/Owners can read this sentence number \d+ about a real change\. /g, ""), /reading words/],
];

for (const [name, mutate, expected] of breaks) {
  test(`checker fails on ${name}`, () => {
    const r = check(mutate(GOOD));
    assert.equal(r.status, 1, `expected a failure for ${name}\n${r.out}`);
    assert.match(r.out, expected);
  });
}
