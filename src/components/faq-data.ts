// Homepage FAQ content. Lives outside FAQ.tsx ("use client") so the server-
// rendered homepage can build FAQPage JSON-LD from the exact Q&As the FAQ
// section renders (structured data must match visible content).
export const FAQS = [
  // Workflow Automation
  {
    q: "What kinds of tasks can you automate?",
    a: "Common examples: customer follow-up sequences, lead intake and CRM updates, invoice reminders, appointment scheduling, weekly reporting, and social media content workflows. If something is repetitive and rule-based, it's usually automatable.",
  },
  {
    q: "Do I need any technical knowledge to use what you build?",
    a: "No. Everything I deliver is built for normal people to run day-to-day. I write plain-language documentation and do a live walkthrough with you before handoff. You won't need a developer.",
  },
  {
    q: "How does pricing work for automation projects?",
    a: "New builds are $200 an hour. Maintenance after launch is $150 an hour. Before any work starts, I scope the project and send a written estimate, so you know the expected cost up front. Retainers vary by project and are quoted in that estimate. If the estimate doesn't make sense for your budget, you're under no obligation.",
  },
  {
    q: "How long does a typical automation project take?",
    a: "It varies by scope. Simple automations (a single workflow or integration) typically take 1–2 weeks from kickoff to handoff. More complex projects with multiple systems can take 3–4 weeks. I include a timeline in the written estimate.",
  },
  // General
  {
    q: "Is my information kept confidential?",
    a: "Yes. Your company name, industry, and any details you share are used solely to produce your deliverable. I don't share client information with third parties.",
  },
];
