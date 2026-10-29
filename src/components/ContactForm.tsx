"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import Button from "@/components/brand/Button";
import { Input, Label, Textarea, fieldError } from "@/components/brand/Field";

type State = "idle" | "submitting" | "success" | "error";

// Site links to /invoice-check carry ?from=site; the letters' QR code opens the
// bare URL. The tag keeps web requests out of the letter test's reply count.
function fromSite(): { via?: "site" } {
  return new URLSearchParams(window.location.search).get("from") === "site" ? { via: "site" } : {};
}

// Form only (2026-10-16): the page that renders it owns the #contact section,
// the heading and the booking copy. Posts to /api/contact exactly as before;
// re-skinned onto the brand fields 2026-10-29 (markup and payload unchanged).
type Props = {
  // A source tags the inquiry and picks its auto-reply (see /api/contact).
  source?: "reporting" | "invoice-check" | "card-fee-check" | "canon";
  messageLabel?: string;
  messagePlaceholder?: string;
  companyLabel?: string;
  companyPlaceholder?: string;
  submitLabel?: string;
};

export default function ContactForm({
  source,
  messageLabel = "What's eating your team's time?",
  messagePlaceholder = "The job someone does by hand every week, and roughly how long it takes.",
  companyLabel = "Company",
  companyPlaceholder = "Acme Corp",
  submitLabel = "Send message →",
}: Props = {}) {
  const [state, setState] = useState<State>("idle");
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(source ? { ...form, source, ...fromSite() } : form),
      });
      if (!res.ok) throw new Error("failed");
      setState("success");
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="py-8 text-center" role="status">
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-[6px] bg-selection">
          <Check className="h-6 w-6 text-ink" strokeWidth={2} />
        </div>
        <h3 className="mb-2 text-[18px] font-bold text-ink">Message sent</h3>
        <p className="text-[15px] text-muted">Thanks. I&apos;ll be in touch within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="cf-name">Name *</Label>
          <Input
            id="cf-name"
            type="text"
            required
            autoComplete="name"
            placeholder="Jane Smith"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="cf-company">{companyLabel}</Label>
          <Input
            id="cf-company"
            type="text"
            autoComplete="organization"
            placeholder={companyPlaceholder}
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="cf-email">Email *</Label>
        <Input
          id="cf-email"
          type="email"
          required
          autoComplete="email"
          placeholder="jane@acmecorp.com"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="cf-message">{messageLabel} *</Label>
        <Textarea
          id="cf-message"
          required
          rows={4}
          placeholder={messagePlaceholder}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
        />
      </div>

      {state === "error" && (
        <p className={fieldError} role="alert">
          Something went wrong. Email me at{" "}
          <a href="mailto:max@wexadvisory.com" className="underline">
            max@wexadvisory.com
          </a>
        </p>
      )}

      <Button type="submit" variant="secondary" disabled={state === "submitting"} className="w-full">
        {state === "submitting" ? "Sending…" : submitLabel}
      </Button>
    </form>
  );
}
