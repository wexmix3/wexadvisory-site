"use client";

import { cover } from "./covers";
import ProductCover from "./ProductCover";
import s from "./covers.module.css";

// A white plank of covers (up to five fit side by side at desktop; below
// 1000px the shelf scrolls sideways in its own box, never the page). Takes
// cover ids from covers.tsx, not cover objects, so a server page can render
// it (the motifs are functions). Each cover gets a three-line mono index:
// status, type, name. Pair it with a plain list of the same items elsewhere
// on the page: nothing should depend on hovering.
type Props = {
  ids: string[];
  label: string; // accessible name, e.g. "Products on the shelf"
  hint?: string | null;
};

export default function CoverShelf({ ids, label, hint = "Hover or tap a cover to turn it over." }: Props) {
  const covers = ids.map(cover);
  return (
    <div className={s.shelf}>
      <div className={s.scroller}>
        <ul className={s.track} aria-label={label}>
          {covers.map((c) => (
            <li key={c.id} className={s.slot}>
              <ProductCover c={c} />
              <div className={`${s.index} font-mono`}>
                <span>{c.status}</span>
                <span>{c.type}</span>
                <span className={s.indexName}>{c.name}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {hint && <p className="mt-10 text-center font-mono text-[12px] text-muted">{hint}</p>}
    </div>
  );
}
