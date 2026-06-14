import { motion } from "motion/react";

/**
 * TDR mark — three interlocking petals (Tri Dharma) rotating around a
 * central seed, framed by a soft ring. Distinctive, geometric, balanced.
 */
export function Logo({
  className = "",
  animated = false,
  size = 38,
  onClick,
}: {
  className?: string;
  animated?: boolean;
  size?: number;
  onClick?: () => void;
}) {
  const Wrapper: any = onClick ? "button" : "div";
  return (
    <Wrapper
      onClick={onClick}
      className={`flex items-center gap-2.5 ${onClick ? "cursor-pointer group" : ""} ${className}`}
      aria-label={onClick ? "Replay opening animation" : undefined}
    >
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={animated ? { rotate: -120, opacity: 0, scale: 0.5 } : false}
        animate={animated ? { rotate: 0, opacity: 1, scale: 1 } : undefined}
        whileHover={onClick ? { rotate: 120 } : undefined}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <defs>
          <linearGradient id="tdrPetalA" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
            <stop stopColor="#10B981" />
            <stop offset="1" stopColor="#34D399" />
          </linearGradient>
          <linearGradient id="tdrPetalB" x1="44" y1="0" x2="0" y2="44" gradientUnits="userSpaceOnUse">
            <stop stopColor="#14B8A6" />
            <stop offset="1" stopColor="#22D3EE" />
          </linearGradient>
          <linearGradient id="tdrPetalC" x1="22" y1="44" x2="22" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0EA5E9" />
            <stop offset="1" stopColor="#10B981" />
          </linearGradient>
          <linearGradient id="tdrRing" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
            <stop stopColor="#10B981" stopOpacity="0.8" />
            <stop offset="1" stopColor="#0EA5E9" stopOpacity="0.8" />
          </linearGradient>
          <radialGradient id="tdrSeed" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#A7F3D0" />
          </radialGradient>
        </defs>

        {/* Outer ring with broken arcs (3 gaps for petals to peek through) */}
        <g stroke="url(#tdrRing)" strokeWidth="1.5" strokeLinecap="round" fill="none">
          <path d="M 22 4 A 18 18 0 0 1 37.59 13" />
          <path d="M 37.59 31 A 18 18 0 0 1 22 40" />
          <path d="M 6.41 31 A 18 18 0 0 1 6.41 13" />
        </g>

        {/* Three petals rotated 120° — each its own gradient */}
        <g transform="translate(22 22)">
          {[
            { rot: 0, fill: "url(#tdrPetalA)" },
            { rot: 120, fill: "url(#tdrPetalB)" },
            { rot: 240, fill: "url(#tdrPetalC)" },
          ].map((p, i) => (
            <g key={i} transform={`rotate(${p.rot})`}>
              <path
                d="M 0 0 C -6 -4 -6 -12 0 -16 C 6 -12 6 -4 0 0 Z"
                fill={p.fill}
              />
              <path
                d="M 0 -2 L 0 -14"
                stroke="rgba(255,255,255,0.45)"
                strokeWidth="0.8"
                strokeLinecap="round"
              />
            </g>
          ))}
        </g>

        {/* Central seed */}
        <circle cx="22" cy="22" r="3.2" fill="url(#tdrSeed)" />
        <circle cx="22" cy="22" r="1.4" fill="#10B981" />
      </motion.svg>
      <div className="flex flex-col leading-tight items-start">
        <span style={{ fontWeight: 700, letterSpacing: "-0.02em" }}>TDR</span>
        <span style={{ fontSize: "0.625rem", color: "var(--muted-foreground)" }}>Tri Dharma Recovery</span>
      </div>
    </Wrapper>
  );
}
