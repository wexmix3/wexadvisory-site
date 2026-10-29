// Option C (art-direction lab, 2026-10-29): every system Max has built, shown as
// a collectible cover. All colour on the page lives in these objects; the page
// chrome stays black and grey. Motifs are plain SVG on a 100x100 grid that fills
// the cover, so each one scales with the cover and needs no image request.
// Facts are sourced from the live site copy (ProductsSection, CaseStudies).

export type CoverData = {
  id: string;
  name: string;
  status: string;
  type: string;
  lines: string[];
  /** title size in container-width units (the cover is the container) */
  size: number;
  layout: "top" | "bottom" | "vertical";
  bg: string;
  ink: string;
  Motif: (props: { ink: string; bg: string }) => JSX.Element;
  facts: [string, string, string];
  href: string;
  linkLabel: string;
  external?: boolean;
};

const svg = {
  viewBox: "0 0 100 100",
  preserveAspectRatio: "none" as const,
  "aria-hidden": true,
  focusable: "false" as const,
};

function Rings({ ink }: { ink: string }) {
  return (
    <svg {...svg}>
      {[9, 15, 21, 27].map((r) => (
        <circle key={r} cx="76" cy="24" r={r} fill="none" stroke={ink} strokeWidth="2.4" />
      ))}
      <circle cx="76" cy="24" r="4.5" fill={ink} data-live-dot="" />
    </svg>
  );
}

function FiveBars({ ink }: { ink: string }) {
  return (
    <svg {...svg}>
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={54 + i * 8} y="62" width="5.5" height="28" fill={ink} />
      ))}
      <rect x="50" y="92" width="44" height="2" fill={ink} />
    </svg>
  );
}

function Gauge({ ink }: { ink: string }) {
  // 3/4 ring, open at the bottom left: a score that is not full yet.
  const r = 22;
  const c = 2 * Math.PI * r;
  return (
    <svg {...svg}>
      <circle
        cx="70"
        cy="32"
        r={r}
        fill="none"
        stroke={ink}
        strokeWidth="9"
        strokeDasharray={`${c * 0.75} ${c}`}
        transform="rotate(135 70 32)"
      />
      <circle cx="70" cy="32" r="4" fill={ink} />
    </svg>
  );
}

function Card({ ink, bg }: { ink: string; bg: string }) {
  return (
    <svg {...svg}>
      <g transform="rotate(-14 72 76)">
        <rect x="48" y="60" width="48" height="31" rx="3" fill={ink} />
        <rect x="48" y="66" width="48" height="6" fill={bg} />
        <rect x="53" y="80" width="12" height="4" fill={bg} />
      </g>
    </svg>
  );
}

function Receipt({ ink, bg }: { ink: string; bg: string }) {
  return (
    <svg {...svg}>
      <polygon
        points="52,0 90,0 90,50 85.25,45 80.5,50 75.75,45 71,50 66.25,45 61.5,50 56.75,45 52,50"
        fill={ink}
      />
      <rect x="58" y="12" width="26" height="3" fill={bg} />
      <rect x="58" y="20" width="18" height="3" fill={bg} />
      <rect x="58" y="28" width="22" height="3" fill={bg} />
    </svg>
  );
}

function Overlap({ ink }: { ink: string }) {
  return (
    <svg {...svg}>
      <circle cx="68" cy="36" r="21" fill="none" stroke={ink} strokeWidth="3" />
      <circle cx="68" cy="64" r="21" fill={ink} />
    </svg>
  );
}

function Lines({ ink }: { ink: string }) {
  return (
    <svg {...svg}>
      {[12, 21, 30, 39, 48].map((y) => (
        <rect
          key={y}
          x="18"
          y={y}
          width={y === 48 ? 46 : 72}
          height="3.2"
          fill={ink}
          opacity={y === 30 ? 1 : 0.3}
        />
      ))}
      <rect x="8" y="28" width="6.5" height="7.2" fill={ink} />
    </svg>
  );
}

export const COVERS: CoverData[] = [
  {
    id: "reco",
    name: "RECO Ops",
    status: "Live",
    type: "Client build · dashboard + 5 agents",
    lines: ["RECO", "OPS"],
    size: 30,
    layout: "bottom",
    bg: "#FF4F1F",
    ink: "#111111",
    Motif: Rings,
    facts: ["119 wholesale accounts", "2,500+ sales leads", "5 automated agents"],
    href: "/work",
    linkLabel: "See the work",
  },
  {
    id: "close",
    name: "Month-End Close",
    status: "Built 2026",
    type: "Client build · 5 locations",
    lines: ["MONTH", "END", "CLOSE"],
    size: 21,
    layout: "top",
    bg: "#0F5B3A",
    ink: "#F1EFE6",
    Motif: FiveBars,
    facts: ["5 locations, one close", "GL checked against rules", "PDF + Excel packet"],
    href: "/work",
    linkLabel: "See the work",
  },
  {
    id: "audit",
    name: "AI Audit",
    status: "Free",
    type: "Product",
    lines: ["AI", "AUDIT"],
    size: 29,
    layout: "bottom",
    bg: "#2B3BFF",
    ink: "#FFFFFF",
    Motif: Gauge,
    facts: ["About 2 minutes", "Scores + automation plan", "You keep the report"],
    href: "/audit",
    linkLabel: "Run the audit",
  },
  {
    id: "card-fee",
    name: "Card Fee Check",
    status: "Free",
    type: "Product",
    lines: ["CARD", "FEE", "CHECK"],
    size: 21,
    layout: "top",
    bg: "#12A39A",
    ink: "#0B1F1E",
    Motif: Card,
    facts: ["Send card statements", "See your real rate", "Fees worth questioning"],
    href: "/card-fee-check",
    linkLabel: "Check my fees",
  },
  {
    id: "invoice",
    name: "Supplier Invoice Check",
    status: "Free",
    type: "Product",
    lines: ["INVOICE", "CHECK"],
    size: 21,
    layout: "bottom",
    bg: "#FF9EC2",
    ink: "#2A0A18",
    Motif: Receipt,
    facts: ["4 weeks of invoices", "Price jumps + double bills", "2-page report"],
    href: "/invoice-check?from=site",
    linkLabel: "Get the check",
  },
  {
    id: "competitor",
    name: "Competitor Report",
    status: "$299",
    type: "Product",
    lines: ["COMPETITOR", "REPORT"],
    size: 15.5,
    layout: "vertical",
    bg: "#6A3BF0",
    ink: "#FFFFFF",
    Motif: Overlap,
    facts: ["13 pages, real traffic", "5 competitor deep dives", "Ready in about a minute"],
    href: "https://tool.wexadvisory.com",
    linkLabel: "Get the report",
    external: true,
  },
  {
    id: "canon",
    name: "Canon",
    status: "Demo",
    type: "Product",
    lines: ["CANON"],
    size: 31,
    layout: "bottom",
    bg: "#C9F24A",
    ink: "#14210A",
    Motif: Lines,
    facts: ["Your documents, answered", "Every answer cites a source", "Correct it once"],
    href: "/canon",
    linkLabel: "See Canon",
  },
];

// 4 + 3 covers, plus one open slot so both shelves hold four.
export const SHELVES: CoverData[][] = [COVERS.slice(0, 4), COVERS.slice(4)];
