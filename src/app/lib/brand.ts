/**
 * TDR — Tri Dharma Recovery
 * Brand asset registry. Single source of truth for the visual identity used
 * across the marketing site. Import from this file when you need a token,
 * never hard-code a hex value.
 */

export const brand = {
  name: "Tri Dharma Recovery",
  shortName: "TDR",
  tagline: {
    id: "Ekonomi Sirkular dari Bali untuk Dunia",
    en: "Circular Economy from Bali to the World",
  },
  origin: "Bali, Indonesia",
  founded: 2023,
} as const;

/**
 * Primary palette — emerald → cyan gradient. Inspired by Balinese rice
 * terraces (emerald) meeting the ocean (cyan).
 */
export const palette = {
  emerald: {
    50: "#ECFDF5",
    100: "#D1FAE5",
    300: "#6EE7B7",
    400: "#34D399",
    500: "#10B981", // primary brand
    600: "#059669",
    700: "#047857",
  },
  cyan: {
    300: "#67E8F9",
    400: "#22D3EE",
    500: "#0EA5E9", // primary accent
    600: "#0284C7",
  },
  accent: {
    amber: "#F59E0B", // Parahyangan (spiritual offerings)
    rose: "#F43F5E",  // alerts / destructive
  },
  neutral: {
    background: "#000000",
    surface: "#0a0a0a",
    border: "rgba(255, 255, 255, 0.14)",
    text: "#FAFAFA",
    muted: "#A1A1AA",
  },
} as const;

/**
 * Signature gradient used on hero headings, buttons, icon backgrounds.
 * `linear-gradient(135deg, #10B981 → #0EA5E9)`
 */
export const gradients = {
  primary: "linear-gradient(135deg, #10B981 0%, #0EA5E9 100%)",
  primarySoft: "linear-gradient(135deg, color-mix(in oklab, #10B981 15%, transparent), color-mix(in oklab, #0EA5E9 15%, transparent))",
  hero: "radial-gradient(circle at 30% 20%, #10B981 0%, transparent 50%), radial-gradient(circle at 70% 80%, #0EA5E9 0%, transparent 50%)",
  text: "linear-gradient(to right, #10B981, #0EA5E9)",
} as const;

/**
 * Typography — system font stack, no web font fetch for speed.
 * Display weights live at 700, body copy at 400, UI labels at 500–600.
 */
export const typography = {
  fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  scale: {
    display: "clamp(2rem, 4.5vw, 3.5rem)", // hero h1
    h2: "clamp(1.75rem, 3.5vw, 2.5rem)",
    h3: "1.35rem",
    body: "1rem",
    small: "0.88rem",
    micro: "0.7rem",
  },
  weight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  letterSpacing: {
    tight: "-0.03em",
    snug: "-0.02em",
    normal: "0",
    wide: "0.08em",
    widest: "0.3em",
  },
} as const;

/**
 * Logo — a hexagon (stability + Balinese "Tri Hita Karana" geometry)
 * encloses three rotating recycle arrows (Tri Dharma) around a central leaf.
 * Stroke gradient: emerald → cyan. SVG source lives in
 * `src/app/components/Logo.tsx`.
 */
export const logo = {
  source: "src/app/components/Logo.tsx",
  motif: "Hexagon frame · Three recycle arrows · Central leaf",
  symbolism: {
    hexagon: "Stability, harmony, Tri Hita Karana geometry",
    threeArrows: "Tri Dharma — Parahyangan, Pawongan, Palemahan",
    leaf: "Living impact, regeneration",
  },
  minSizePx: 24,
  clearSpacePx: 8,
} as const;

/**
 * Motion language. Easing curves used across the site.
 * - emphasized: most page-level reveals (FadeIn).
 * - spring: micro-interactions, hover lifts.
 */
export const motion = {
  easing: {
    emphasized: [0.22, 1, 0.36, 1],
    standard: [0.4, 0, 0.2, 1],
    decelerate: [0, 0, 0.2, 1],
  },
  duration: {
    micro: 0.2,
    standard: 0.6,
    page: 0.8,
    opening: 2.4, // OpeningAnimation total
  },
} as const;

/**
 * Spacing / radius / elevation tokens. Match Tailwind defaults except
 * for `radius.card` which is 1rem (rounded-2xl) on every grid card.
 */
export const tokens = {
  radius: {
    pill: "9999px",
    card: "1rem",
    surface: "1.5rem",
    hero: "2rem",
  },
  shadow: {
    glow: "0 10px 40px -10px rgba(16, 185, 129, 0.4)",
    card: "0 4px 24px -8px rgba(0, 0, 0, 0.3)",
  },
} as const;

/**
 * External / 3rd-party assets. Photography is sourced through Unsplash
 * via the make:unsplash plugin; icons come from lucide-react.
 */
export const assets = {
  iconLibrary: "lucide-react",
  photoSource: "Unsplash (via make:unsplash)",
  chartLibrary: "recharts",
  motionLibrary: "motion/react",
} as const;
