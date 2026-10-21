// Reads a secret from the environment with a leading byte-order mark and surrounding whitespace
// removed. The production RESEND_API_KEY was saved with a U+FEFF prefix (a value piped from
// PowerShell), and fetch() rejects any header containing it, so every contact form returned 500.
export function readSecret(name: string): string | undefined {
  const value = process.env[name]?.replace(/^﻿/, "").trim();
  return value || undefined;
}
