"use client";

import { useId, useRef, useState } from "react";
import type { CSSProperties, FocusEvent, KeyboardEvent, MouseEvent } from "react";
import type { CoverData } from "./covers";
import s from "./covers.module.css";

// One collectible cover that lifts and turns over to show three facts and a
// link. Pointer: hover lifts and flips (hover-capable devices). Touch: tap
// flips, tap the back to flip it home. Keyboard: Tab lands on the front,
// Enter/Space flips, Tab again reaches the back link (which also flips it),
// Escape flips it home. The back is always in the DOM, so screen readers get
// the facts and the link without flipping. Reduced motion: an instant toggle.
export default function ProductCover({ c }: { c: CoverData }) {
  const [flipped, setFlipped] = useState(false);
  const frontRef = useRef<HTMLButtonElement>(null);
  const backId = useId();
  const { Motif } = c;

  const onBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFlipped(false);
  };
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape" && flipped) {
      setFlipped(false);
      frontRef.current?.focus();
    }
  };
  const onBackClick = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("a")) return;
    setFlipped(false);
  };

  const vars = { "--c-bg": c.bg, "--c-ink": c.ink, "--c-size": `${c.size}cqw` } as CSSProperties;

  return (
    <div className={s.card} data-flipped={flipped} style={vars} onBlur={onBlur} onKeyDown={onKeyDown}>
      <div className={s.inner}>
        <button
          ref={frontRef}
          type="button"
          className={`${s.face} ${s.front}`}
          aria-expanded={flipped}
          aria-controls={backId}
          aria-label={`${c.name}. ${c.status}. Show details`}
          onClick={() => setFlipped((f) => !f)}
        >
          <Motif ink={c.ink} bg={c.bg} />
          <span className={`${s.title} ${s[`title_${c.layout}`]}`} aria-hidden="true">
            {c.lines.map((l) => (
              <span key={l} className={s.titleLine}>
                {l}
              </span>
            ))}
          </span>
        </button>

        <div
          id={backId}
          role="group"
          aria-label={`${c.name} details`}
          className={`${s.face} ${s.back}`}
          onClick={onBackClick}
        >
          <p className={s.backTag}>
            {c.status} · {c.type}
          </p>
          <p className={s.backName}>{c.name}</p>
          <ul className={s.facts}>
            {c.facts.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <a
            href={c.href}
            className={s.backLink}
            target={c.external ? "_blank" : undefined}
            rel={c.external ? "noopener noreferrer" : undefined}
            onFocus={() => setFlipped(true)}
          >
            {c.linkLabel} <span aria-hidden="true">→</span>
            {c.external && <span className="sr-only"> (opens in a new tab)</span>}
          </a>
        </div>
      </div>
    </div>
  );
}
