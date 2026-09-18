<!--
DRAFT. NOT PUBLISHED. Needs client sign-off before any of this goes on the site.
Heads-up: this repo (wexmix3/wexadvisory-site) is PUBLIC on GitHub, so anything
committed here is readable by anyone once pushed. Keep personal names, pricing
and unconfirmed figures out of this file.
Sources: aios/context/reco-dashboard.md, aios/context/wex-advisory.md, and the
already-published /work and /ai-ops-dashboard-for-ecommerce-brands pages.
Every [NEEDS CLIENT NUMBER: ...] must be filled with a figure the client
confirms, or the sentence cut.
Before publishing, confirm with the client: whether to name the company, the engagement status (context notes describe this as a pre-sale build, so check how the founders want it framed), and every bracketed number above.
-->

# Case study draft: wholesale + DTC recovery-tools brand (RECO)

**Industry:** E-commerce (wholesale and Shopify DTC) · **Team:** two founders, no engineering staff · **Engagement:** ops dashboard and automated agents, in daily use by the founders

## Problem

RECO sells recovery equipment (massage guns, cupping, compression sleeves, saunas, cold plunges) to gyms, schools, teams and retailers, and direct to consumers through Shopify. The whole wholesale operation ran out of one Google Sheet: 119 wholesale accounts, 2,509 sales leads across 7 segments, and 151 events.

Nothing told the founders which accounts were going quiet, which orders needed attention, or which emails had gone unanswered. Follow-ups from meetings lived in notes and got lost. With no engineers, building a system themselves wasn't an option.

## Approach

I built one dashboard around their real data and then added agents that do the watching for them.

- **One view of the business.** Wholesale accounts, leads, inventory and events loaded from the sheet (which stays read-only), plus a daily Shopify sync for inventory and DTC orders. Every account and lead can be edited, snoozed or flagged, with a full audit trail.
- **A Priority Action Queue.** One list of what needs attention today, fed by several agents. Each item can be marked done, denied, snoozed or approved. Approving a drafted email reply sends it as a real threaded Gmail reply; approving a scheduling item creates or edits the real calendar event.
- **Agents that watch what the founders don't have time to.** A daily digest flags inbox threads left unanswered for 3+ days and calendar gaps. A meeting-notes agent turns notes into action items. An outreach agent finds listicle and blogger opportunities and drafts pitches for approval. A blog agent drafts posts for RECO's Shopify blog and publishes on approval.
- **Quality gates on everything AI writes.** Every finding has to cite a real email thread or event, and a second model checks tone and accuracy before anything reaches the queue.
- **Finance and CRM links.** QuickBooks P&L, cash flow, balance sheet and aging on a Finance tab, and a two-way sync between the accounts list and Notion.

## Results

- 119 wholesale accounts and 2,500+ sales leads moved from a spreadsheet into one live dashboard.
- Multiple automated agents live in production, feeding one daily priority queue, with a daily digest by email.
- The first agent-drafted blog post is live on RECO's own store blog.
- AI running costs sit well under the $100 cost ceiling set for the project.
- The founders save roughly [NEEDS CLIENT NUMBER: hours per week saved on triage, follow-ups and reporting].
- [NEEDS CLIENT NUMBER: follow-ups caught or replies sent through the queue in a given period, e.g. last 30 days]
- [NEEDS CLIENT NUMBER: any revenue or reorder outcome the founders attribute to the dashboard, only if they will stand behind it]

> "We were operating out of a Google Sheet, but now we have systems and tools in place to ensure we are organized, efficient, and making the right decisions every day."
> Co-Founder, RECO (already published anonymously on /work; confirm they're fine with it attributed by name)

