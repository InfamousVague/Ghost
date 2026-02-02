/**
 * Color design tokens for the Ghost design system.
 *
 * @remarks
 * Colors provides a comprehensive palette organized by semantic categories:
 * - `background`: Page and container backgrounds
 * - `surface`: Interactive surface colors
 * - `text`: Typography colors
 * - `border`: Border and divider colors
 * - `accent`: Brand and interactive accent colors
 * - `status`: Semantic status colors (success, warning, etc.)
 * - `utility`: Utility colors for charts and shadows
 *
 * @example
 * ```tsx
 * import { Colors } from 'ghost/tokens';
 *
 * const style = {
 *   backgroundColor: Colors.background.surface,
 *   color: Colors.text.primary,
 *   borderColor: Colors.border.subtle,
 * };
 * ```
 */
export const Colors = {
  /** Background colors for page and container levels */
  background: {
    /** Deepest background, typically page canvas */
    canvas: "#050608",
    /** Standard surface background */
    surface: "#0B0E15",
    /** Elevated/raised element background */
    raised: "#131824",
    /** Modal/overlay background */
    overlay: "#1B2233",
    /** Subtle background variation */
    subtle: "#080A11",
  },
  /** Interactive surface colors */
  surface: {
    /** Primary interactive surface */
    primary: "#0F1623",
    /** Secondary interactive surface */
    secondary: "#101828",
    /** Tertiary interactive surface */
    tertiary: "#1A2133",
  },
  /** Typography colors */
  text: {
    /** Primary text - highest contrast */
    primary: "#F4F6FF",
    /** Secondary text - medium contrast */
    secondary: "#C5CADB",
    /** Muted text - low contrast */
    muted: "#9096AB",
    /** Link/interactive text */
    link: "#5A9BFF",
    /** Inverse text for colored backgrounds */
    inverse: "#0B0E15",
  },
  /** Border and divider colors */
  border: {
    /** Subtle border - low contrast */
    subtle: "#1F2433",
    /** Strong border - higher contrast */
    strong: "#2A3142",
    /** Focus ring color */
    focus: "#3D8BFF",
  },
  /** Brand and interactive accent colors */
  accent: {
    /** Primary accent color - pastel purple */
    primary: "#A78BFA",
    /** Primary accent hover state */
    primaryHover: "#B794F6",
    /** Primary accent active/pressed state */
    primaryActive: "#9775FA",
    /** Secondary accent color */
    secondary: "#1A1625",
    /** Highlight accent color */
    highlight: "#C4B5FD",
  },
  /** Semantic status colors */
  status: {
    /** Success/positive color */
    success: "#2FD575",
    /** Success surface/background */
    successSurface: "#102820",
    /** Success dim - softer green for subtle indicators */
    successDim: "#4CAF82",
    /** Success dim surface - muted green background */
    successDimSurface: "#0D201A",
    /** Warning/caution color */
    warning: "#F6C94C",
    /** Warning surface/background */
    warningSurface: "#2A210F",
    /** Danger/error color */
    danger: "#FF5C7A",
    /** Danger surface/background */
    dangerSurface: "#2C151D",
    /** Danger dim - softer red for subtle indicators */
    dangerDim: "#E57A8C",
    /** Danger dim surface - muted red background */
    dangerDimSurface: "#231519",
    /** Info/informational color */
    info: "#4CC3FF",
    /** Info surface/background */
    infoSurface: "#102431",
  },
  /** Utility colors for specific use cases */
  utility: {
    /** Positive chart color */
    chartPositive: "#3BD184",
    /** Negative chart color */
    chartNegative: "#5F7BFF",
    /** Neutral chart color */
    chartNeutral: "#2F3B52",
    /** Soft shadow color */
    shadowSoft: "rgba(6, 9, 14, 0.45)",
    /** Strong shadow color */
    shadowStrong: "rgba(0, 0, 0, 0.65)",
  },
} as const;

/**
 * Type representing the Colors token structure.
 */
export type ColorToken = typeof Colors;
