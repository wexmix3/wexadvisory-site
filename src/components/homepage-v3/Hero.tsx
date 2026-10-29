"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./Hero.module.css";

const CALENDLY = "https://calendly.com/maxwexley-wexadvisory/30min";

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

// 2026-10-16 competitor-review rebuild: the copy leads (buyer, outcome, price,
// proof) and the thread-weave image sits further back behind a stronger scrim.
// The image was recompressed (704 KB -> ~129 KB at 1920x1097) and renders
// through next/image with `priority`, so it is preloaded with
// fetchpriority="high". Pointer parallax kept (one transform per mousemove);
// it is skipped under prefers-reduced-motion.
export default function Hero() {
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
      <div ref={bgRef} className={styles.bgParallax} aria-hidden="true">
        <div className={styles.bgDrift}>
          <Image
            src="/hero/thread-weave.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            quality={70}
            className={styles.bgImage}
          />
        </div>
      </div>

      <div className={styles.ambientWash} />
      <div className={styles.textScrim} />

      <div className={styles.centerText}>
        <p
          className={`${styles.step1} text-gold text-[11px] sm:text-xs font-bold tracking-[0.22em] sm:tracking-[0.3em] uppercase mb-6 text-balance`}
        >
          AI automation for consumer brands · New York
        </p>
        <h1 className={`${styles.headline} ${styles.step1}`}>
          Stop running your brand
          <br />
          <span className={styles.accent}>out of a spreadsheet.</span>
        </h1>
        <p
          className={`${styles.step2} text-white/80 text-base sm:text-lg leading-relaxed mx-auto max-w-3xl mb-9`}
        >
          I build the dashboards, reporting and AI agents that pull Shopify, Amazon, wholesale
          and your books into one place, for owner-led brands with no engineering team. $200
          an hour to build, with a written estimate before any work
          starts.
        </p>

        <div className={`${styles.step3} flex flex-col sm:flex-row items-center justify-center gap-3`}>
          <a
            href="/audit"
            className="w-full sm:w-auto inline-block bg-gradient-to-r from-gold to-[#e9d9a8] text-navy font-bold text-base px-8 py-3.5 rounded-full hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(200,168,75,0.25)] transition-all"
          >
            Get your free AI Audit
          </a>
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-block border border-white/25 text-white/85 hover:border-gold/50 hover:text-white font-semibold text-base px-8 py-3.5 rounded-full transition-colors"
          >
            Book a strategy call
          </a>
        </div>
        <p className={`${styles.step3} text-white/60 text-xs mt-4`}>
          Free · about 2 minutes · you keep the report
        </p>

        <p
          className={`${styles.step4} text-white/70 text-sm mt-10 pt-6 border-t border-white/10 max-w-xl mx-auto text-balance`}
        >
          Running today for RECO, a wholesale + DTC brand: 119 accounts, 2,500+ leads and 5
          agents in one dashboard.
        </p>
      </div>
    </div>
  );
}
