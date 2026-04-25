/* global React */

// Reusable illustrated SVG scene placeholders - forest/camp themed
// Palettes vary by mood

const Scene = ({ variant = "hero", children, style }) => {
  const palettes = {
    hero: { // misty dawn with mountain + tent
      sky1: "#C9D4C0", sky2: "#7E9180",
      mtn1: "#2F4034", mtn2: "#1B2620",
      tree: "#263328", tent: "#C97B4A",
      fog: "#EFE8D6", ground: "#2A3A2D"
    },
    dusk: { // warm amber sunset
      sky1: "#E5C69B", sky2: "#9F6B4B",
      mtn1: "#3F3329", mtn2: "#1E1813",
      tree: "#2A241E", tent: "#F0B97A",
      fog: "#F0D4B0", ground: "#241C17"
    },
    forest: { // deep green canopy
      sky1: "#B8C4AD", sky2: "#5F7558",
      mtn1: "#334A38", mtn2: "#1A2821",
      tree: "#1F2E23", tent: "#C97B4A",
      fog: "#DCE4D3", ground: "#263328"
    },
    lake: { // lake + mountain reflection
      sky1: "#D7DFD6", sky2: "#93A899",
      mtn1: "#3C4E42", mtn2: "#202B25",
      tree: "#2A3A2E", tent: "#E8C284",
      fog: "#E8ECE4", ground: "#4F6A5C"
    },
    meadow: { // grassy meadow
      sky1: "#E3DDC8", sky2: "#A8B491",
      mtn1: "#566A50", mtn2: "#334537",
      tree: "#3A4A36", tent: "#D4956B",
      fog: "#F0EBD7", ground: "#4E5E40"
    },
    cabin: { // log cabin in woods
      sky1: "#D8DBCB", sky2: "#8B9681",
      mtn1: "#3B4A38", mtn2: "#1F2A22",
      tree: "#2A3A2B", tent: "#8B5A3A",
      fog: "#E5E1D2", ground: "#2F3A29"
    },
    night: { // stargazing
      sky1: "#2A3349", sky2: "#0F1622",
      mtn1: "#1B2330", mtn2: "#0A0F18",
      tree: "#121A20", tent: "#E8A560",
      fog: "#3A4560", ground: "#0A0E14"
    }
  };
  const p = palettes[variant] || palettes.hero;
  return (
    <div style={{ position: "relative", overflow: "hidden", ...style }}>
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
        style={{ width: "100%", height: "100%", display: "block" }}>
        <defs>
          <linearGradient id={`sky-${variant}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={p.sky1} />
            <stop offset="100%" stopColor={p.sky2} />
          </linearGradient>
          <linearGradient id={`fog-${variant}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={p.fog} stopOpacity="0" />
            <stop offset="70%" stopColor={p.fog} stopOpacity="0.35" />
            <stop offset="100%" stopColor={p.fog} stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* sky */}
        <rect width="800" height="500" fill={`url(#sky-${variant})`} />

        {/* stars for night */}
        {variant === "night" && Array.from({ length: 60 }).map((_, i) => (
          <circle key={i}
            cx={(i * 73) % 800}
            cy={((i * 41) % 200)}
            r={(i % 3) * 0.4 + 0.5}
            fill="#F7F2E7" opacity={0.6 + (i % 3) * 0.15} />
        ))}
        {variant === "dusk" && <circle cx="600" cy="180" r="45" fill="#F0B97A" opacity="0.5" />}

        {/* Distant mountains */}
        <path d={`M 0 260 L 80 210 L 160 245 L 240 200 L 340 230 L 420 195 L 520 225 L 620 205 L 720 235 L 800 215 L 800 500 L 0 500 Z`}
          fill={p.mtn1} opacity="0.75" />

        {/* Closer mountains */}
        <path d={`M 0 320 L 100 265 L 200 300 L 310 255 L 420 290 L 530 260 L 640 295 L 760 275 L 800 290 L 800 500 L 0 500 Z`}
          fill={p.mtn2} opacity="0.9" />

        {/* Fog layer */}
        <rect y="260" width="800" height="140" fill={`url(#fog-${variant})`} />

        {/* Trees - a forest silhouette */}
        {Array.from({ length: 20 }).map((_, i) => {
          const x = 30 + i * 40 + (i % 3) * 6;
          const h = 50 + ((i * 17) % 40);
          return (
            <path key={i}
              d={`M ${x} ${380 - h} L ${x - 14} 380 L ${x + 14} 380 Z`}
              fill={p.tree} opacity={0.85 + (i % 3) * 0.05} />
          );
        })}

        {/* Ground */}
        <rect y="378" width="800" height="122" fill={p.ground} />

        {/* Focal tent */}
        {variant !== "cabin" && (
          <g transform="translate(360, 350)">
            <path d="M 0 0 L 40 -60 L 80 0 Z" fill={p.tent} />
            <path d="M 40 -60 L 40 0" stroke={p.mtn2} strokeWidth="1.5" />
            <path d="M 30 0 L 40 -25 L 50 0 Z" fill={p.mtn2} opacity="0.6" />
            {/* small glow for night */}
            {variant === "night" && <circle cx="40" cy="-15" r="20" fill="#F0B97A" opacity="0.3" />}
          </g>
        )}

        {/* Cabin */}
        {variant === "cabin" && (
          <g transform="translate(340, 310)">
            <rect x="0" y="30" width="120" height="60" fill="#5C4430" />
            <path d="M -10 30 L 60 -10 L 130 30 Z" fill="#3E2E1F" />
            <rect x="50" y="55" width="20" height="35" fill="#D4A574" />
            <rect x="15" y="45" width="22" height="18" fill="#F0D99C" opacity="0.8" />
            <rect x="85" y="45" width="22" height="18" fill="#F0D99C" opacity="0.8" />
            {/* Smoke from chimney */}
            <path d="M 90 30 Q 85 10 92 -10 Q 98 -20 90 -40"
              fill="none" stroke={p.fog} strokeWidth="3" opacity="0.5" />
          </g>
        )}

        {/* A couple tall pines foreground */}
        {[60, 720].map((x, i) => (
          <g key={i}>
            <path d={`M ${x} 280 L ${x - 30} 380 L ${x + 30} 380 Z`} fill={p.tree} />
            <path d={`M ${x} 240 L ${x - 22} 320 L ${x + 22} 320 Z`} fill={p.tree} />
            <rect x={x - 3} y="380" width="6" height="10" fill={p.mtn2} />
          </g>
        ))}
      </svg>
      {children && <div style={{ position: "absolute", inset: 0 }}>{children}</div>}
    </div>
  );
};

window.Scene = Scene;
