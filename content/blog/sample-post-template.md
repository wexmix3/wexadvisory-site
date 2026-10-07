---
title: "Sample post template: how a post on this blog is put together"
description: "A template post that shows every building block a Wex Advisory blog post can use. Copy this file, rename it, and replace the text."
date: 2026-10-07
updated: 2026-10-07
answer: "This is a template, and it stays a draft. A real post puts a direct answer here, in 40 to 60 words, written so it still makes sense when quoted alone. State the answer first. Add the one condition that changes it. Leave the detail for the body below."
faqs:
  - q: "How long should the answer block be?"
    a: "Aim for 40 to 60 words. It should answer the question in the post title in full sentences, with no reference to the rest of the page."
  - q: "What is the difference between date and updated?"
    a: "The date field is the day the post was first published. The updated field is the day the content last changed in a meaningful way. Change updated only when the content changes."
  - q: "How do I publish a post?"
    a: "Set draft to false in the frontmatter and deploy. Drafts show in local development and on preview deployments. They never show on the live site."
sources:
  - title: "Google Search Central: Creating helpful, reliable, people-first content"
    url: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content"
  - title: "Schema.org: BlogPosting"
    url: "https://schema.org/BlogPosting"
  - title: "GitHub Flavored Markdown Spec"
    url: "https://github.github.com/gfm/"
draft: true
---

This file is a template. Nothing in it is advice, and none of it is a real claim. It exists to show each element a post can use and how that element looks on the page.

To start a new post, copy this file to `content/blog/your-post-slug.md`. The filename becomes the address of the post.

## Open with the question the reader asked

The first paragraph under a heading should answer that heading. Keep sentences short. Put the main point first and the supporting detail after it.

A section can link to another page on this site, such as the [free AI audit](/audit). It can also link out to a reference, such as the [GitHub Flavored Markdown spec](https://github.github.com/gfm/).

### Use a third-level heading for a sub-point

A sub-point sits under its parent section. Use it when a section covers two or three separate ideas.

## Lists

Use a bulleted list for items with no order:

- One idea per bullet
- Keep each bullet to a line or two
- Use **bold** for the one term that matters

Use a numbered list for steps:

1. Write the question as the title.
2. Write the answer block.
3. Write the body, then the FAQs and sources.

## Tables

A table works when the reader needs to compare things side by side. On a phone, a wide table scrolls inside its own frame.

| Frontmatter field | What it holds | Required |
| --- | --- | --- |
| `title` | The headline and page title | Yes |
| `description` | One or two sentences for search results | Yes |
| `answer` | The direct answer shown under the headline | Yes |
| `faqs` | Questions and answers shown below the article | Yes, can be empty |
| `sources` | Numbered references at the end | Yes, can be empty |

## Quotes

Use a blockquote for a quoted passage or a point that needs to stand apart:

> This is a placeholder quote. Replace it with a real quotation and name where it came from in the sentence before it.

## Before you publish

Check every number against its source. List each source in the frontmatter so it appears in the numbered list at the end. Then set `draft: false`.
