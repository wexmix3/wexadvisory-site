"use client";

import type { ReactNode } from "react";
import { useWordReveal } from "@/components/lab/motion";

// Wraps static server-rendered content so every [data-words] heading inside
// gets the shared scroll word reveal. Keep children stateless: the hook
// rewrites the heading markup once.
export default function Reveal({ children }: { children: ReactNode }) {
  const scope = useWordReveal<HTMLDivElement>();
  return <div ref={scope}>{children}</div>;
}
