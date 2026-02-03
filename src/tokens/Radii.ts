/**
 * Border radius design tokens.
 *
 * @remarks
 * Radii provides consistent border radius values for corner rounding.
 * These tokens are mapped to the Shape enum through the getShapeRadius helper.
 *
 * @example
 * ```tsx
 * import { Radii } from 'ghost/tokens';
 *
 * const style = {
 *   borderRadius: Radii.rounded, // "8px"
 * };
 * ```
 */
export const Radii = {
  /** No rounding (0) */
  none: "0",
  /** Subtle rounding (4px) */
  soft: "4px",
  /** Small rounding (6px) */
  sm: "6px",
  /** Standard rounding (8px) */
  rounded: "8px",
  /** Large rounding (12px) */
  lg: "12px",
  /** Extra large rounding (16px) */
  xl: "16px",
  /** Pill/capsule shape (9999px) */
  pill: "9999px",
  /** Perfect circle (50%) */
  circle: "50%",
} as const;

/**
 * Type representing the Radii token structure.
 */
export type RadiiToken = typeof Radii;
