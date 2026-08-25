"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./HeroLoop.module.css";

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

const NODES = [
  {
    key: "audit",
    cx: 150,
    cy: 40,
    delay: 0,
    label: "Audit",
    labelX: 150,
    labelY: -4,
    anchor: "middle" as const,
    icon: <><circle cx="4" cy="4" r="4" /><line x1="7.5" y1="7.5" x2="11" y2="11" /></>,
  },
  {
    key: "build",
    cx: 260,
    cy: 150,
    delay: 1.25,
    label: "Build",
    labelX: 292,
    labelY: 154,
    anchor: "start" as const,
    icon: <path d="M2,10 L6,6 M6,6 A2.2,2.2 0 1,0 9,3 A2.2,2.2 0 0,0 6,6" />,
  },
  {
    key: "ship",
    cx: 150,
    cy: 260,
    delay: 2.5,
    label: "Ship",
    labelX: 150,
    labelY: 298,
    anchor: "middle" as const,
    icon: <><line x1="2" y1="8" x2="10" y2="2" /><polyline points="5,2 10,2 10,7" /></>,
  },
  {
    key: "learn",
    cx: 40,
    cy: 150,
    delay: 3.75,
    label: "Learn",
    labelX: 8,
    labelY: 154,
    anchor: "end" as const,
    icon: <path d="M5,0 L6,4 L10,5 L6,6 L5,10 L4,6 L0,5 L4,4 Z" />,
  },
];

export default function HeroLoop() {
  const stageRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reducedMotion) return;
      const stage = stageRef.current;
      if (!stage) return;
      const r = stage.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      stage.style.setProperty("--lx", `${x}%`);
      stage.style.setProperty("--ly", `${y}%`);
      const rx = ((y - 50) / 50) * -6;
      const ry = ((x - 50) / 50) * 6;
      stage.style.setProperty("--rx", `${rx}deg`);
      stage.style.setProperty("--ry", `${ry}deg`);
    },
    [reducedMotion]
  );

  const resetTilt = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;
    stage.style.setProperty("--rx", "0deg");
    stage.style.setProperty("--ry", "0deg");
  }, []);

  return (
    <div
      ref={stageRef}
      className={styles.stage}
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
    >
      <div className={styles.grain} />
      <div className={styles.ambientLight} />

      <div className={styles.headline}>
        <h1>
          AI is complex. <span className={styles.accent}>Working with us isn&apos;t.</span>
        </h1>
        <p>
          Wex Advisory audits, builds, and ships the AI your business actually needs — then
          stays on call to keep it running.
        </p>
        <div className={styles.ctaRow}>
          <a href="/audit" className={styles.ctaPrimary}>
            Get your free AI Snapshot
          </a>
          <a
            href="https://calendly.com/maxwexley-wexadvisory/free-strategy-call"
            className={styles.ctaSecondary}
          >
            Book a strategy call
          </a>
        </div>
      </div>

      <div className={styles.loopTilt}>
        <svg className={styles.loopSvg} viewBox="-30 -30 360 360">
          <defs>
            <radialGradient id="hlCoreGrad">
              <stop offset="0%" stopColor="#e9d9a8" />
              <stop offset="100%" stopColor="#c8a84b" stopOpacity=".22" />
            </radialGradient>
          </defs>

          <g style={{ transformOrigin: "150px 150px", animation: "spinRing 26s linear infinite" }}>
            <circle className={styles.satellite} cx="150" cy="8" r="1.6" />
          </g>
          <g
            style={{
              transformOrigin: "150px 150px",
              animation: "spinRing 34s linear infinite reverse",
            }}
          >
            <circle className={styles.satellite} cx="150" cy="292" r="1.3" />
          </g>

          <circle className={styles.loopTrack} cx="150" cy="150" r="110" />
          <path className={styles.loopTail2} d="M150,40 A110,110 0 1,1 149.9,40" />
          <path className={styles.loopTail1} d="M150,40 A110,110 0 1,1 149.9,40" />
          <path className={styles.loopChase} d="M150,40 A110,110 0 1,1 149.9,40" />

          <circle className={styles.loopCore} cx="150" cy="150" r="24" />

          {NODES.map((n) => (
            <g key={n.key}>
              <g transform={`translate(${n.cx},${n.cy})`}>
                <circle
                  className={styles.nodeBurst}
                  r="17"
                  style={{ animationDelay: `${n.delay}s` }}
                />
                <circle className={styles.nodeRing} r="24" />
                <circle className={styles.nodeGlass} r="17" />
                <circle
                  className={styles.nodeGlowFill}
                  r="17"
                  style={{ animationDelay: `${n.delay}s` }}
                />
                <g className={styles.nodeIcon} transform="translate(-5,-5)">
                  {n.icon}
                </g>
              </g>
              <text
                className={styles.nodeLabel}
                x={n.labelX}
                y={n.labelY}
                textAnchor={n.anchor}
              >
                {n.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <div className={styles.vignette} />
    </div>
  );
}
