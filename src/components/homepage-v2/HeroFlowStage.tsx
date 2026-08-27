"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./HeroFlowStage.module.css";

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

// Replaces the vector compass-dial hero (HeroLoop) with the AI-generated
// braided-flow image (Meta Model API / muse-image-1.0) — Max's explicit call
// after seeing the dial doesn't share a visual language with a photoreal
// image (2026-08-27). Copy/CTAs/hrefs are carried over unchanged from
// HeroLoop; only the visual centerpiece and its container change.
export default function HeroFlowStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reducedMotion) return;
      const stage = stageRef.current;
      const bg = bgRef.current;
      if (!stage || !bg) return;
      const r = stage.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      bg.style.setProperty("--tx", `${px * -10}px`);
      bg.style.setProperty("--ty", `${py * -10}px`);
    },
    [reducedMotion]
  );

  const resetTilt = useCallback(() => {
    const bg = bgRef.current;
    if (!bg) return;
    bg.style.setProperty("--tx", "0px");
    bg.style.setProperty("--ty", "0px");
  }, []);

  return (
    <div ref={stageRef} className={styles.stage} onMouseMove={handleMove} onMouseLeave={resetTilt}>
      <div ref={bgRef} className={styles.bgParallax}>
        <div className={styles.bgDrift}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hero/braided-flow.webp" alt="" className={styles.bgImage} />
        </div>
      </div>

      <div className={styles.vignette} />
      <div className={styles.centerVignette} />

      <div className={styles.centerText}>
        <h1>
          AI is complex.
          <br />
          <span className={styles.accent}>Working with us isn&apos;t.</span>
        </h1>
        <a href="/audit" className={styles.ctaPrimary}>
          Get your free AI Snapshot
        </a>
        <a
          href="https://calendly.com/maxwexley-wexadvisory/free-strategy-call"
          className={styles.ctaSecondary}
        >
          or book a strategy call →
        </a>
      </div>
    </div>
  );
}
