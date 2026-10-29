"use client";

import { useWordReveal } from "./motion";

// Turns on the word reveal for every <Heading reveal> inside it. Wrap a page's
// content once (it renders display: contents, so it adds no box to the layout).
export default function RevealScope({ children }: { children: React.ReactNode }) {
  const scope = useWordReveal<HTMLDivElement>();
  return (
    <div ref={scope} className="contents">
      {children}
    </div>
  );
}
