"use client";

// Shared GSAP setup for the site (promoted from the art-direction lab,
// 2026-10-29). Everything animated imports gsap, ScrollTrigger, useGSAP and
// the reduced-motion check from here, so plugins register once and every page
// moves the same way.
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
// (plays once on entry; scrubbing left headings half-revealed mid-viewport). Text stays in the DOM and readable without JS;
// under reduced motion nothing moves. Plain-text headings only: any markup
// inside a [data-words] element is flattened to its text.
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
          .map((w) => {
            const safe = w.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            return `<span aria-hidden="true" style="display:inline-block;overflow:hidden;vertical-align:top"><span class="w" style="display:inline-block">${safe}</span></span>`;
          })
          .join(" ");
        gsap.from(el.querySelectorAll(".w"), {
          yPercent: 100,
          opacity: 0,
          stagger: 0.035,
          duration: 0.55,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
    },
    { scope }
  );
  return scope;
}
