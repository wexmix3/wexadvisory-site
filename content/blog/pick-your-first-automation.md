---
title: "Pick Your First Automation: A 7-Step Playbook for Small Business Owners"
description: "A step-by-step playbook for choosing the first job to automate in a small business, testing it on messy inputs, and checking the real output after launch."
date: 2026-11-03
updated: 2026-11-03
answer: "Automate one job first: something that repeats every week, follows the same steps most of the time, and ends in a result a person can check before it reaches a customer. Keep payments, promises and complaints with a person. Time the job by hand first, test it on messy inputs, and check the real output after launch."
faqs:
  - q: "Should my first automation use AI or a plain rule?"
    a: "Use whatever does the job with the least new setup. If a rule inside an app you already use can handle it, start there, and save AI for jobs where the input varies, like drafting replies, with a person reading the output."
  - q: "Do I need to hire someone to build my first automation?"
    a: "Not if the job stays inside one app you already pay for. Bring in help when the job crosses several systems or needs custom logic."
  - q: "How long should I wait before judging whether it worked?"
    a: "Give it a month of running, then compare against the baseline you timed by hand. Count the time you spend checking and fixing, not only the time it saves."
  - q: "What should I never automate first?"
    a: "Anything involving payments, promises to customers, complaints or hiring. Also skip anything that would reach a customer before a person has read it."
sources:
  - title: "Small business automation: what to automate first (and how)"
    url: "https://capsulecrm.com/blog/small-business-automation"
  - title: "AI for Small Business: 10 Jobs to Start With — CodeLeap"
    url: "https://codeleap.co.uk/insights/ai-for-small-business"
  - title: "Best AI Automation Agencies for Small Business (2026) | DappaSol"
    url: "https://dappasol.com/guides/best-ai-automation-agencies-for-small-business"
  - title: "AI Consulting for Small Businesses: What You Actually Need (and What You're Being Oversold) | Aiken House Blog"
    url: "https://www.aikenhouse.com/post/ai-consulting-for-small-businesses"
format: playbook
draft: false
---

This playbook is for the owner of a small business who knows some of the week should run on its own but hasn't picked where to start. Have last week's calendar and the list of apps you pay for open next to this page. By the end you will have one job chosen, a written definition of what working looks like, and a way to check it once it's live.

## Step 1: List every task you repeat for one week

Before you look at a single tool, keep a running list for one normal working week. Every time you copy something from one app into another, send an email you have sent before, or chase someone for the same thing, add a row.

[A CRM company's guide to small-business automation](https://capsulecrm.com/blog/small-business-automation) estimates the average owner spends about 36% of the workweek on admin like invoicing, data entry and chasing payments. That number is an average. Your list shows where your own share goes, and that's the version that helps you pick.

You're done when the list includes the boring tasks you stopped noticing. Those are usually the best candidates.

| Task | Times per week | Minutes each time | Apps it touches | Who checks the result |
|---|---|---|---|---|
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |

- [ ] I kept the list for a full working week
- [ ] Every row has the apps it touches filled in
- [ ] Every row has a rough time per task

## Step 2: Cross off the jobs that should stay with a person

Go down the list and mark each row keep or automate. A good first job repeats, follows the same steps most of the time, and ends in something a person can look at before it matters. [A UK firm's list of jobs to hand to AI first](https://codeleap.co.uk/insights/ai-for-small-business) keeps payments, promises, complaints and hiring decisions with a person. I agree, and for a first automation I'd add one more rule: nothing goes to a customer without someone reading it first.

Why so strict? Your first automation is where you learn how these things break. You want that lesson on a job where a mistake is cheap and easy to see.

You're done when every row has a mark and every automate row ends in an output you could inspect.

- [ ] Every row is marked keep or automate
- [ ] Anything touching money, promises or complaints is marked keep
- [ ] Each automate row ends in something a person can check

## Step 3: Check what the tools you already pay for can do

For each automate row, look at the apps column. [A consulting firm's guide to what small businesses actually need from AI help](https://www.aikenhouse.com/post/ai-consulting-for-small-businesses) asks two questions I'd put to every owner: have you tried the AI features already built into your CRM, email and accounting software, and does the task cross more than one system? If it stays inside one app, switch on what's there first. If it crosses several, that's where a custom build starts to pay.

The same goes for anything new you add. [An automation agency's ranking of shops, which puts itself first](https://dappasol.com/guides/best-ai-automation-agencies-for-small-business) argues that automation wired into the email, spreadsheets and CRM you already run beats another dashboard your team has to remember to open.

Test free before you pay. When I needed owner email addresses for my own outreach, I ran a free tier against the gaps my main lookup tool left. It found work emails for 5 of the 8 owners the first tool missed. Between that and a second free search tool, I got to 30 named decision makers out of 50 prospects without turning on a paid plan. I'm holding off on paid tiers until reply data comes in.

You're done when each automate row says built-in, free tool or custom build.

- [ ] I wrote down which apps each automate job touches
- [ ] I checked the built-in automation and AI settings in those apps
- [ ] I tried a free tier before paying for anything new

## Step 4: Pick one job and write down what working looks like

From the rows left, pick the one that eats the most time and that you'd notice within a day if it broke. One job. If you pick two, you won't know which one caused a problem.

Then time it by hand. [The same UK firm](https://codeleap.co.uk/insights/ai-for-small-business) says to clock the job for a week before you automate it and compare after a month, because without a starting number you can't tell whether it worked. Fill in this card and keep it somewhere you'll see it:

```text
Job: [name of the job]
Starts when: [the trigger, such as a form being submitted]
Produces: [what it outputs]
Checked by: [person] before [what happens next]
Baseline: [minutes per week by hand]
Working means: [what you will see when it runs right]
Stays with a person: [the parts you will not hand over]
```

You're done when every line is filled in and you could hand the card to someone else.

- [ ] I picked one job, not a bundle
- [ ] I timed the job by hand and wrote down the baseline
- [ ] Every line of the card is filled in

## Step 5: Test it on messy inputs before it goes live

Run the automation on last week's real examples, then on the ugly ones: a blank field, a duplicate, a name in the wrong box. Compare each output with what you would have done by hand.

I take this step seriously because of what it turns up. Before I let a card fee checker I built near a real statement, I had its plan attacked on purpose, then built it, ran 3 rounds of testing on sample statements and had the code reviewed by a fresh pair of eyes. The review alone flagged 6 serious bugs, and the test rounds found more. One left fees collected daily out of the cost. One counted unknown fees as overpayment. One let the generated letter ask for a markup the numbers didn't support. All 157 automated tests pass now, and it still doesn't go in front of an owner until I've checked real statements from several processors by hand.

Your first automation won't need that much machinery. It does need someone trying to break it before a customer does.

You're done when you've seen it handle bad input without a wrong answer reaching anyone.

- [ ] I ran it on real examples from last week
- [ ] I fed it blank, duplicate and badly formatted inputs
- [ ] A person reviewed every output during testing

## Step 6: Put a check on the real output after launch

An automation can look switched on while the result is missing or wrong. I've had this happen in my own systems more than once.

For about seven weeks, every proposal my system was meant to draft after an audit sat stuck as pending. The first cause was one step in the code that never waited for the proposal to finish. Once I fixed that, three more bugs showed up behind it: a stray newline at the end of two settings, which broke the AI model call and the email connection, and a draft that arrived with no formatting.

Separately, a quality score on my audit PDFs sat at 62 from September 3 until October 19. The visual check rendered placeholder boxes instead of text because no font was registered in production. Once I registered it, a live audit scored 78 with real text.

And 542 of my cold emails carried a booking link that went nowhere, because the meeting type it pointed to had been switched off in my scheduling tool. I swapped the link in the setting that fills the email body, redeployed, and confirmed zero dead links on the live pages. The email body has no preview, so I booked a check on the next real send to confirm the new link is in it.

So pick one place where you can see the actual output and look at it on a schedule. A green status light doesn't count. Look again any time you change a link, a setting or a connected app.

You're done when you've looked at the real output once and the next check is on your calendar.

- [ ] I know where to see the real output, not just a success status
- [ ] A recurring reminder is set to check it
- [ ] I check again after changing any link, setting or connected app

## Step 7: Compare with your baseline after a month

Time the job the same way you did in Step 4. Count the minutes you now spend on it, including the minutes spent checking and fixing. If the total is lower and the output holds up, keep it and go back to your Step 2 list for the next job. If checking eats the savings, fix it or switch it off. A broken automation you forgot about is worse than none.

You're done when you have two numbers side by side and a decision written next to them.

- [ ] I timed the job the same way as the baseline
- [ ] I counted the time spent checking and fixing
- [ ] I wrote down keep, fix or switch off, and picked the next job

## Get a ranked starting list

If you'd rather not build the Step 1 list from a blank page, run the [free AI audit](/audit). You enter your website and a few details, and a PDF lands in your inbox, usually within minutes. It scores how ready your business is for AI and ranks automation ideas by what they would save. It's free. Take the top idea and run it through Steps 2 to 7.
