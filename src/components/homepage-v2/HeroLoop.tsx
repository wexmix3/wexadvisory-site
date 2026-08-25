"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  { key: "audit", index: "01", label: "Audit", angle: 0 },
  { key: "build", index: "02", label: "Build", angle: 90 },
  { key: "ship", index: "03", label: "Ship", angle: 180 },
  { key: "learn", index: "04", label: "Learn", angle: 270 },
] as const;

// Marker + stem + label geometry per node, precomputed for the 4 cardinal angles
// used above (0/90/180/270) rather than a general trig helper — this dial only
// ever shows these four positions.
const NODE_GEOMETRY: Record<
  (typeof NODES)[number]["key"],
  { stem: [number, number, number, number]; marker: [number, number]; labelX: number; labelY: number; indexX: number; indexY: number; anchor: "start" | "middle" | "end" }
> = {
  audit: { stem: [150, 50, 150, 18], marker: [150, 50], labelX: 150, labelY: 10, indexX: 150, indexY: 34, anchor: "middle" },
  build: { stem: [250, 150, 282, 150], marker: [250, 150], labelX: 290, labelY: 153, indexX: 266, indexY: 140, anchor: "start" },
  ship: { stem: [150, 250, 150, 282], marker: [150, 250], labelX: 150, labelY: 298, indexX: 150, indexY: 270, anchor: "middle" },
  learn: { stem: [50, 150, 18, 150], marker: [50, 150], labelX: 10, labelY: 153, indexX: 34, indexY: 140, anchor: "end" },
};

export default function HeroLoop() {
  const stageRef = useRef<HTMLDivElement>(null);
  const loopRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const ticks = useMemo(() => {
    const items: { x1: number; y1: number; x2: number; y2: number; major: boolean }[] = [];
    for (let i = 0; i < 48; i++) {
      const angle = (i / 48) * 360;
      const major = i % 12 === 0;
      const r1 = major ? 138 : 142;
      const r2 = 148;
      const rad = ((angle - 90) * Math.PI) / 180;
      // Rounded to 4 decimals: Math.sin/cos can differ in their last bit between
      // Node's server-side engine and the browser's, which is enough to fail
      // React's SSR hydration string comparison on these coordinates.
      const round = (n: number) => Math.round(n * 10000) / 10000;
      items.push({
        x1: round(150 + r1 * Math.cos(rad)),
        y1: round(150 + r1 * Math.sin(rad)),
        x2: round(150 + r2 * Math.cos(rad)),
        y2: round(150 + r2 * Math.sin(rad)),
        major,
      });
    }
    return items;
  }, []);

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reducedMotion) return;
      const stage = stageRef.current;
      const loop = loopRef.current;
      if (!stage || !loop) return;
      const r = stage.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      const rx = ((y - 50) / 50) * -5;
      const ry = ((x - 50) / 50) * 5;
      loop.style.setProperty("--rx", `${rx}deg`);
      loop.style.setProperty("--ry", `${ry}deg`);
    },
    [reducedMotion]
  );

  const resetTilt = useCallback(() => {
    const loop = loopRef.current;
    if (!loop) return;
    loop.style.setProperty("--rx", "0deg");
    loop.style.setProperty("--ry", "0deg");
  }, []);

  return (
    <div ref={stageRef} className={styles.stage} onMouseMove={handleMove} onMouseLeave={resetTilt}>
      <div ref={loopRef} className={styles.loopTilt}>
        <svg className={styles.loopSvg} viewBox="-40 -40 380 380">
          <defs>
            <radialGradient id="hlDialGrad">
              <stop offset="0%" stopColor="#f0d9a8" />
              <stop offset="100%" stopColor="#c8a84b" stopOpacity=".15" />
            </radialGradient>
          </defs>

          <g className={styles.outerSpin} style={{ transformOrigin: "150px 150px" }}>
            <circle className={styles.dialRing} cx="150" cy="150" r="148" />
            {ticks.map((t, i) => (
              <line
                key={i}
                className={t.major ? styles.tickMajor : styles.tick}
                x1={t.x1}
                y1={t.y1}
                x2={t.x2}
                y2={t.y2}
              />
            ))}
          </g>

          <circle className={styles.track} cx="150" cy="150" r="100" />
          <path className={styles.tail} d="M150,50 A100,100 0 1,1 149.9,50" />
          <path className={styles.chase} d="M150,50 A100,100 0 1,1 149.9,50" />

          <circle className={styles.coreOuter} cx="150" cy="150" r="34" style={{ transformOrigin: "150px 150px" }} />
          <polygon
            className={styles.core}
            points="150,128 168,140 168,160 150,172 132,160 132,140"
          />

          {NODES.map((n) => {
            const g = NODE_GEOMETRY[n.key];
            return (
              <g key={n.key}>
                <line className={styles.stem} x1={g.stem[0]} y1={g.stem[1]} x2={g.stem[2]} y2={g.stem[3]} />
                <rect
                  className={styles.marker}
                  x={g.marker[0] - 5}
                  y={g.marker[1] - 5}
                  width="10"
                  height="10"
                  transform={`rotate(45 ${g.marker[0]} ${g.marker[1]})`}
                />
                <text className={styles.nodeLabel} x={g.labelX} y={g.labelY} textAnchor={g.anchor}>
                  {n.label}
                </text>
                <text className={styles.nodeIndex} x={g.indexX} y={g.indexY} textAnchor="middle">
                  {n.index}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

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

      <div className={styles.vignette} />
    </div>
  );
}
