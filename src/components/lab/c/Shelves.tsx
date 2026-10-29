import Cover from "./Cover";
import { SHELVES } from "./covers";
import s from "./labc.module.css";

const CALENDLY = "https://calendly.com/maxwexley-wexadvisory/30min";

// Two white shelves. Each shelf is its own scroll-snap row on phones, so the
// page itself never scrolls sideways. [data-slot] / [data-idx] are the hooks
// the hero entrance animates (covers slide in from the right edge).
export default function Shelves() {
  return (
    <div className={s.shelves}>
      {SHELVES.map((row, r) => (
        <div key={r} className={s.scroller}>
          <ul className={s.track} aria-label={r === 0 ? "Systems on the shelf, row 1" : "Systems on the shelf, row 2"}>
            {row.map((c) => (
              <li key={c.id} className={s.slot}>
                <div data-slot="">
                  <Cover c={c} />
                </div>
                <div className={s.index} data-idx="">
                  <span>{c.status}</span>
                  <span>{c.type}</span>
                  <span className={s.indexName}>{c.name}</span>
                </div>
              </li>
            ))}
            {r === 1 && (
              <li className={s.slot}>
                <div data-slot="">
                  <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className={s.openSlot}>
                    <span className={s.openSlotPlus} aria-hidden="true">
                      +
                    </span>
                    <span>Room for yours</span>
                    <span className="sr-only"> Book a strategy call (opens in a new tab)</span>
                  </a>
                </div>
                <div className={s.index} data-idx="">
                  <span>Open</span>
                  <span>Your build</span>
                  <span className={s.indexName}>Next on the shelf</span>
                </div>
              </li>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}
