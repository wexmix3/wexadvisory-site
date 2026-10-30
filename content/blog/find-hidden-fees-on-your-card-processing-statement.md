---
title: "Find the Hidden Fees on Your Card Processing Statement: a 30-Minute Playbook"
description: "A step-by-step playbook for small business owners: work out what card processing really costs you, spot the printed fees worth questioning, and know what to ask your processor."
date: 2026-10-30
updated: 2026-10-30
answer: "Pull three months of statements, add up every fee (including the ones taken out of your daily deposits), and divide by your gross card sales. That is your real rate. Then list the named fees printed on the statement, compare your rate with a published flat price, and ask your processor in writing for what the numbers support."
faqs:
  - q: "What is an effective rate on a card processing statement?"
    a: "It is everything you paid to accept cards in a month divided by your gross card sales for that month. It is the one number that lets you compare any pricing model with any other, because it counts every fee, not just the advertised rate."
  - q: "Why use three months of statements instead of one?"
    a: "Some fees post once a year or are billed a month late, so a single month can make your rate look better or worse than it is. Three months smooths that out."
  - q: "What is a PCI non-compliance fee?"
    a: "A monthly charge some processors add when you have not filed the yearly PCI self-assessment questionnaire. Filing the questionnaire usually stops the fee, so it is worth asking your processor which form applies to you."
  - q: "Should I switch processors if my rate looks high?"
    a: "Not first. Ask your current processor, in writing, to remove the fees you can question and to match a fair price. Many owners get a better deal without moving, and switching can carry contract and equipment costs."
sources:
  - title: "Understanding Our Fees | Square Payments"
    url: "https://squareup.com/us/en/payments/our-fees"
  - title: "Document Library"
    url: "https://www.pcisecuritystandards.org/document_library/"
draft: true
---

**[MAX: delete every bracketed note before publishing. Run `npm run check:sources -- content/blog/find-hidden-fees-on-your-card-processing-statement.md` and fix every ERROR. Rates on cited pages change; re-check them on the day you publish.]**

Card processing statements are hard to read on purpose. This playbook takes about 30 minutes with three statements in front of you. You finish with one number (what processing really costs you), a short list of fees to question, and the exact ask to send your processor.

**[MAX: one or two sentences, first-hand: why you built Card Fee Check and what you learned building it. Do not claim results from real statements; it has only been run on samples so far.]**

## Step 1: Gather three months of statements

You need every page of the last three monthly statements for one location. Phone photos are fine as long as every line is readable. One month is not enough: some fees post once a year, and some are billed a month late.

- [ ] Three consecutive months, same location
- [ ] Every page, including the "Important Information" or message box page
- [ ] If you take Amex directly with Amex, note it: those sales show on the statement, but their fees do not

## Step 2: Find the two numbers that matter

Every statement has a gross card sales figure and a total fees figure. The catch is that many processors take part of the fees out of your deposits each day, so the fee section at the end of the month only shows what was left over.

- [ ] Gross card sales for the month (before refunds)
- [ ] Total fees for the month, including fees deducted from daily deposits
- [ ] If the daily summary has a fees or discount column, add it to the month-end fees

**[MAX: one sentence from building the checker: it refuses to give a verdict unless the fee lines add up to the statement's own total within $1. That rule exists because the totals on a statement are easy to misread.]**

## Step 3: Work out your real rate

Divide total fees by gross card sales for each month, then for all three months together. Copy this table into a spreadsheet:

| Month | Gross card sales | Total fees (month-end + daily) | Effective rate (fees / sales) |
|---|---|---|---|
| Month 1 | | | |
| Month 2 | | | |
| Month 3 | | | |
| All three | (sum) | (sum) | (sum of fees / sum of sales) |

If you take cards in person and your rate comes out very low, check again before celebrating. A low number usually means fees are being taken somewhere you have not counted yet.

- [ ] Effective rate for each month
- [ ] Effective rate for all three months combined
- [ ] Any month that looks very different from the others, and why

## Step 4: Work out how you are priced

There are three common models, and you can usually tell which one you are on from the fee section.

- **Flat rate:** one percentage plus a few cents on every sale. Common with Square, Stripe, Clover and Toast.
- **Tiered:** sales sorted into buckets with labels like Qualified, Mid-Qualified and Non-Qualified, each at a different rate.
- **Interchange-plus:** the card networks' charges printed line by line, then the processor's own markup listed separately.

Tiered pricing is the hardest to check, because the processor decides which bucket each sale lands in. If you are on tiered pricing, asking to move to interchange-plus is often the single most useful request.

- [ ] Which model your statement uses
- [ ] On interchange-plus: the processor's markup lines, listed separately from the network charges

## Step 5: List the fees worth questioning

Some fees are part of accepting cards. Others are worth a direct question. Look for these by name:

- **PCI non-compliance fee:** charged when the yearly PCI self-assessment questionnaire has not been filed. The forms are published in the [PCI Security Standards Council's document library](https://www.pcisecuritystandards.org/document_library/); your processor can tell you which one applies to you. Filing it usually stops the fee.
- **"Regulatory" or "compliance" fees** that are not a named card-network charge
- **Annual fees** and **monthly minimums** you did not agree to
- **Risk or protection fees** you can opt out of
- **Gateway fees** on an account that only takes cards in person

| Fee name (exactly as printed) | Amount per month | Months seen | Question to ask |
|---|---|---|---|
| | | | |

- [ ] Every fee from the list above, with its exact printed name and amount
- [ ] Any rate-increase notice in the message box

## Step 6: Compare with a published price

You need a reference point. The simplest one is a published flat rate. [Square publishes its rates](https://squareup.com/us/en/payments/our-fees): on its free plan, in-person payments are 2.6% + 15¢ and keyed-in payments are 3.5% + 15¢. If your in-person rate is well above that, your price is worth a conversation.

**[MAX: confirm the Square figures above against the live page on publish day; check:sources will flag them if they changed.]**

This is a sanity check, not a verdict. A business with a high share of rewards cards or keyed-in sales pays more under any processor.

- [ ] Your combined effective rate next to the published flat rate
- [ ] Rough share of your sales that are keyed in or online

## Step 7: Ask your processor, in writing

Ask only for what your numbers support, and keep it short:

```text
Hi [processor],

I reviewed my statements for [months]. My effective rate is [X]% on
[$Y] in monthly card sales. Please:

1. Remove these fees: [fee name, amount].
2. [If tiered] Move my account to interchange-plus pricing.
3. Confirm my current processing rates in writing.

Thanks,
[Name, business, merchant ID]
```

- [ ] Email sent, with the date
- [ ] Reply received, and what changed on the next statement

## Or let the free tool do it

[Card Fee Check](/card-fee-check) does steps 2 to 7 for you: send 1 to 3 months of statements and get a plain-English report with your real rate, the fees to question with exact dollars, whether your price is fair, and a ready letter to your processor. It is free, and I sell no processing.

**[MAX: link the sample report if you want: /card-fee-check#sample]**
