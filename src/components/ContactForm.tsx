"use client";

import { useState } from "react";
import { Check } from "lucide-react";

type State = "idle" | "submitting" | "success" | "error";

// Form only (2026-10-16): the homepage CloseSection owns the #contact section,
// the heading and the booking copy, and renders this inside its "Not ready to
// talk?" glass card. Posts to /api/contact exactly as before.
export default function ContactForm() {
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
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("failed");
      setState("success");
    } catch {
      setState("error");
    }
  }

  const inputClass =
    "w-full bg-white/[0.06] border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/45 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8A84B]/40 focus:border-[#C8A84B] transition-colors";
  const labelClass = "block text-white/70 text-xs font-semibold uppercase tracking-wider mb-2";

  if (state === "success") {
    return (
      <div className="text-center py-8" role="status">
        <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-5">
          <Check className="w-6 h-6 text-gold" strokeWidth={2} />
        </div>
        <h3 className="text-white font-bold text-lg mb-2">Message sent</h3>
        <p className="text-white/70 text-sm">Thanks. I&apos;ll be in touch within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cf-name" className={labelClass}>
            Name *
          </label>
          <input
            id="cf-name"
            type="text"
            required
            autoComplete="name"
            placeholder="Jane Smith"
            className={inputClass}
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="cf-company" className={labelClass}>
            Company
          </label>
          <input
            id="cf-company"
            type="text"
            autoComplete="organization"
            placeholder="Acme Corp"
            className={inputClass}
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
          />
        </div>
      </div>
      <div>
        <label htmlFor="cf-email" className={labelClass}>
          Email *
        </label>
        <input
          id="cf-email"
          type="email"
          required
          autoComplete="email"
          placeholder="jane@acmecorp.com"
          className={inputClass}
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="cf-message" className={labelClass}>
          What&apos;s eating your team&apos;s time? *
        </label>
        <textarea
          id="cf-message"
          required
          rows={4}
          placeholder="The job someone does by hand every week, and roughly how long it takes."
          className={`${inputClass} resize-none`}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
        />
      </div>

      {state === "error" && (
        <p className="text-red-300 text-sm" role="alert">
          Something went wrong. Email me at{" "}
          <a href="mailto:max@wexadvisory.com" className="underline">
            max@wexadvisory.com
          </a>
        </p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="w-full py-3.5 rounded-full border border-gold/50 text-white font-semibold text-sm hover:bg-gold/10 hover:border-gold disabled:opacity-50 transition-colors"
      >
        {state === "submitting" ? "Sending…" : "Send message →"}
      </button>
    </form>
  );
}
