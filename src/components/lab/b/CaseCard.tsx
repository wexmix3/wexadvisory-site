import Image from "next/image";
import styles from "./labb.module.css";

// Hover/focus swap: the blurred RECO screenshot crossfades to a mini sheet of
// the three sourced numbers. The card is a real link (to the live case on the
// homepage) so keyboard users reach the same swap with Tab.
const FIGURES = [
  { label: "Wholesale accounts", value: "119" },
  { label: "Sales leads", value: "2,500+" },
  { label: "Automated agents", value: "5" },
];

export default function CaseCard() {
  return (
    <a
      href="/#case-reco"
      className={`${styles.swap} ${styles.focus} group relative block aspect-[1280/760] rounded-[12px] border border-[color:var(--line)] bg-white overflow-hidden`}
    >
      <span className="sr-only">See the RECO case study. </span>
      <span className={`${styles.shot} absolute inset-0`}>
        <Image
          src="/projects/reco-dashboard-blurred.png"
          alt="RECO operations dashboard, figures blurred for confidentiality"
          fill
          sizes="(max-width: 768px) 100vw, 560px"
          className="object-cover object-top"
        />
      </span>

      <span className={`${styles.mini} ${styles.mono} absolute inset-0 flex items-center justify-center bg-white p-5`}>
        <span className="block w-full max-w-[380px] text-[13px]">
          <span className="flex items-center border border-[color:var(--grid)] rounded-t-[4px] bg-[color:var(--head)] text-[11px] text-[color:var(--muted)]">
            <span className="w-8 shrink-0 text-center border-r border-[color:var(--grid)] py-1" />
            <span className="flex-1 text-center border-r border-[color:var(--grid)] py-1">A</span>
            <span className="w-28 shrink-0 text-center py-1">B</span>
          </span>
          {FIGURES.map((f, i) => (
            <span
              key={f.label}
              className="flex items-stretch border-x border-b border-[color:var(--grid)] last:rounded-b-[4px]"
            >
              <span className="w-8 shrink-0 flex items-center justify-center border-r border-[color:var(--grid)] bg-[color:var(--head)] text-[11px] text-[color:var(--muted)]">
                {i + 1}
              </span>
              <span className="flex-1 px-3 py-3 border-r border-[color:var(--grid)]">{f.label}</span>
              <span
                className={`w-28 shrink-0 px-3 py-3 text-right font-bold tabular-nums text-[18px] ${
                  i === 0 ? "bg-[#F3E3B0] outline outline-2 -outline-offset-2 outline-[#C8A84B]" : ""
                }`}
              >
                {f.value}
              </span>
            </span>
          ))}
        </span>
      </span>
    </a>
  );
}
