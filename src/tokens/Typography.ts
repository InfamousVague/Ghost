/**
 * Typography design tokens for font properties.
 *
 * @remarks
 * Typography provides consistent values for font families, sizes, weights, and line heights.
 * Font sizes use rem units for accessibility and responsive scaling.
 * The default font family is Plus Jakarta Sans, a modern rounded sans-serif.
 *
 * @example
 * ```tsx
 * import { Typography } from 'ghost/tokens';
 *
 * const style = {
 *   fontFamily: Typography.fontFamily.base,    // "Plus Jakarta Sans"
 *   fontSize: Typography.fontSize.md,          // "1rem"
 *   fontWeight: Typography.fontWeight.medium,  // "500"
 *   lineHeight: Typography.lineHeight.normal,  // "1.5"
 * };
 * ```
 */
export const Typography = {
  /** Font family */
  fontFamily: {
    /** Base font - Plus Jakarta Sans (rounded sans-serif) */
    base: "Plus Jakarta Sans",
    /** Monospace font for code */
    mono: "JetBrains Mono, monospace",
  },
  /** Font size scale */
  fontSize: {
    /** Extra extra small (0.625rem / 10px) */
    xxs: "0.625rem",
    /** Extra small (0.75rem / 12px) */
    xs: "0.75rem",
    /** Small (0.875rem / 14px) */
    sm: "0.875rem",
    /** Medium - base size (1rem / 16px) */
    md: "1rem",
    /** Large (1.125rem / 18px) */
    lg: "1.125rem",
    /** Extra large (1.25rem / 20px) */
    xl: "1.25rem",
    /** Extra extra large (1.5rem / 24px) */
    xxl: "1.5rem",
  },
  /** Font weight scale */
  fontWeight: {
    /** Normal weight (400) */
    normal: "400",
    /** Medium weight (500) */
    medium: "500",
    /** Semibold weight (600) */
    semibold: "600",
    /** Bold weight (700) */
    bold: "700",
  },
  /** Line height scale */
  lineHeight: {
    /** Tight line height (1.25) */
    tight: "1.25",
    /** Normal line height (1.5) */
    normal: "1.5",
    /** Relaxed line height (1.75) */
    relaxed: "1.75",
  },
} as const;

/**
 * Type representing the Typography token structure.
 */
export type TypographyToken = typeof Typography;
