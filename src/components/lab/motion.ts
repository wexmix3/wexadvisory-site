"use client";

// Shared GSAP setup for the art-direction lab (2026-10-29). Every lab option
// imports gsap, ScrollTrigger and the word-reveal hook from here, so the three
// options animate the same way and differ only in design.
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Splits every element matching [data-words] inside the returned ref into one
// span per word, then reveals the words as the heading scrolls into view
// (scrubbed to the scrollbar). Text stays in the DOM and readable without JS;
// under reduced motion nothing moves.
export function useWordReveal<T extends HTMLElement>() {
  const scope = useRef<T>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const els = scope.current?.querySelectorAll<HTMLElement>("[data-words]") ?? [];
      els.forEach((el) => {
        if (el.dataset.split) return;
        el.dataset.split = "1";
        const words = (el.textContent ?? "").split(/\s+/).filter(Boolean);
        el.setAttribute("aria-label", words.join(" "));
        el.innerHTML = words
          .map((w) => `<span aria-hidden="true" style="display:inline-block;overflow:hidden;vertical-align:top"><span class="w" style="display:inline-block">${w}</span></span>`)
          .join(" ");
        gsap.from(el.querySelectorAll(".w"), {
          yPercent: 100,
          opacity: 0,
          stagger: 0.04,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 90%", end: "top 55%", scrub: 0.6 },
        });
      });
    },
    { scope }
  );
  return scope;
}
