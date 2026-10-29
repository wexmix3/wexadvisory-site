import type { InputHTMLAttributes, LabelHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cx } from "./cx";

// Form fields in the system: mono uppercase label, white input with a 1px ink
// border, 6px radius, gold ring + ink border on focus. Use the components, or
// the class strings for custom markup (selects, file inputs).
export const fieldLabel = "mb-2 block font-mono text-[11.5px] uppercase tracking-[0.1em] text-muted";
export const fieldInput =
  "w-full rounded-[6px] border border-ink/20 bg-white px-3.5 py-3 text-[15px] text-ink placeholder:text-muted/80 transition-colors hover:border-ink/40 focus:border-ink focus:outline-none focus:ring-2 focus:ring-gold/60";
export const fieldError = "text-[14px] font-semibold text-[#9B2C2C]";

export function Label({ className, ...rest }: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label {...rest} className={cx(fieldLabel, className)} />;
}

export function Input({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...rest} className={cx(fieldInput, className)} />;
}

export function Textarea({ className, ...rest }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...rest} className={cx(fieldInput, "resize-y", className)} />;
}
