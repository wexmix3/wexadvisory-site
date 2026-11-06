"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/components/brand/motion";

// Eases a number from wherever it is now to `target` (2026-11-06 hero options).
// Under reduced motion it jumps straight to the target.
export function useCountUp(target: number, duration = 650) {
  const [shown, setShown] = useState(target);
  const from = useRef(target);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setShown(target);
      from.current = target;
      return;
    }
    const start = performance.now();
    const begin = from.current;
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = begin + (target - begin) * eased;
      setShown(v);
      from.current = v;
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return shown;
}
