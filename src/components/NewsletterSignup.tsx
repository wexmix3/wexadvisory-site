"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check } from "lucide-react";
import { buttonClass } from "@/components/brand/Button";
import { Input, Label, fieldError } from "@/components/brand/Field";
import type { SignupSource } from "@/lib/newsletter";

// Newsletter signup (2026-11-17). One email field plus a hidden honeypot.
// Posts to /api/subscribe, which only sends a confirm email: nobody is on the
// list until they click it. `compact` is the footer layout (field and button
// on one row from sm up); the default is the stacked card layout.
//
// The live region stays mounted so screen readers announce the result, and
// focus moves to the success message because the button it was on goes away.
type State = "idle" | "submitting" | "sent" | "error";

const FORM_LABEL: Record<Exclude<SignupSource, "site">, string> = {
  footer: "Newsletter signup, footer",
  blog: "Newsletter signup",
  playbooks: "Newsletter signup",
  "newsletter-page": "Newsletter signup",
  issue: "Newsletter signup",
};

export default function NewsletterSignup({
  source,
  compact = false,
  buttonLabel = "Subscribe",
}: {
  source: Exclude<SignupSource, "site">;
  compact?: boolean;
  buttonLabel?: string;
}) {
  const id = useId();
  const [state, setState] = useState<State>("idle");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [error, setError] = useState("");
  // Only a 400 is about the address itself; a 5xx or 429 is not the field's fault.
  const [fieldBad, setFieldBad] = useState(false);
  const sentRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (state === "sent") sentRef.current?.focus();
  }, [state]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("submitting");
    setError("");
    setFieldBad(false);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source, website }),
      });
      if (!res.ok) {
        setFieldBad(res.status === 400);
        const body = await res.json().catch(() => ({}));
        throw new Error(typeof body.error === "string" ? body.error : "Something went wrong. Try again.");
      }
      setState("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
      setState("error");
    }
  }

  const errorId = `${id}-error`;

  return (
    <div className="w-full">
      <div role="status" aria-live="polite">
        {state === "sent" && (
          <div className={compact ? "flex items-start gap-3" : "flex items-start gap-3 py-2"}>
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-[6px] bg-selection">
              <Check className="h-4 w-4 text-ink" strokeWidth={2} aria-hidden="true" />
            </span>
            <p ref={sentRef} tabIndex={-1} className="text-[15px] leading-relaxed text-ink outline-none">
              Almost done. Check your inbox for an email from Max and click <strong>Confirm my subscription</strong>.
            </p>
          </div>
        )}
      </div>

      {state !== "sent" && (
        <form onSubmit={submit} aria-label={FORM_LABEL[source]} className="w-full">
          <Label htmlFor={`${id}-email`} className={compact ? "sr-only" : undefined}>
            Your email
          </Label>
          <div className={compact ? "flex flex-col gap-2 sm:flex-row" : "flex flex-col gap-3 sm:flex-row"}>
            <Input
              id={`${id}-email`}
              type="email"
              required
              autoComplete="email"
              placeholder="you@yourbusiness.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={state === "error" && fieldBad ? true : undefined}
              aria-describedby={state === "error" ? errorId : undefined}
              className="sm:flex-1"
            />
            {/* Honeypot: hidden from people and screen readers; bots fill it. */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
            <button
              type="submit"
              disabled={state === "submitting"}
              className={buttonClass("primary", compact ? "sm" : "md")}
            >
              {state === "submitting" ? "Sending…" : buttonLabel}
            </button>
          </div>
          {state === "error" && (
            <p id={errorId} role="alert" className={`mt-2 ${fieldError}`}>
              {error}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
