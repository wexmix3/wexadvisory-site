"use client";

import { useEffect, useRef, useState } from "react";
import { buttonClass } from "@/components/brand/Button";
import { fieldError } from "@/components/brand/Field";

type State = "idle" | "submitting" | "done" | "error";

export default function ConfirmButton({ token, name }: { token: string; name: string }) {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");
  // The button goes away on success; move focus to the new heading so
  // keyboard and screen reader users land on the result.
  const doneRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (state === "done") doneRef.current?.focus();
  }, [state]);

  if (!token) {
    return (
      <>
        <h1 className="text-h3 text-ink">This link is missing its code</h1>
        <p className="mt-3 text-[15.5px] leading-relaxed text-muted">
          Open the link straight from the email, or <a href="/newsletter" className="text-ink underline underline-offset-4">sign up again</a>.
        </p>
      </>
    );
  }

  if (state === "done") {
    return (
      <div role="status">
        <h1 ref={doneRef} tabIndex={-1} className="text-h3 text-ink outline-none">
          You&apos;re in.
        </h1>
        <p className="mt-3 text-[15.5px] leading-relaxed text-muted">
          The next issue lands on Tuesday. Reply to any issue and it comes straight to me, Max.
        </p>
        <p className="mt-5">
          <a href="/newsletter" className="font-mono text-[13px] text-ink underline underline-offset-4">
            See past issues
          </a>
        </p>
      </div>
    );
  }

  async function confirm() {
    setState("submitting");
    setError("");
    try {
      const res = await fetch("/api/subscribe/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ t: token }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(typeof body.error === "string" ? body.error : "Something went wrong. Try again.");
      }
      setState("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
      setState("error");
    }
  }

  return (
    <>
      <h1 className="text-h3 text-ink">One click to finish</h1>
      <p className="mt-3 text-[15.5px] leading-relaxed text-muted">Confirm and you&apos;ll get {name} every Tuesday.</p>
      <button type="button" onClick={confirm} disabled={state === "submitting"} className={`mt-6 ${buttonClass("primary")}`}>
        {state === "submitting" ? "Confirming…" : "Confirm my subscription"}
      </button>
      {state === "error" && (
        <p role="alert" className={`mt-4 ${fieldError}`}>
          {error}{" "}
          <a href="/newsletter" className="underline underline-offset-4">
            Sign up again
          </a>
        </p>
      )}
    </>
  );
}
