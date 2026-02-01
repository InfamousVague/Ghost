/**
 * Spacing design tokens for padding and margins.
 *
 * @remarks
 * Spacing provides a consistent scale for padding, margins, and gaps.
 * Values are in rem units (relative to root font size) for accessibility.
 *
 * @example
 * ```tsx
 * import { Spacing } from 'ghost/tokens';
 *
 * const style = {
 *   padding: Spacing.md,  // "1rem"
 *   gap: Spacing.sm,      // "0.75rem"
 * };
 * ```
 */
export const Spacing = {
  /** No spacing (0) */
  none: "0",
  /** Extra extra small (0.25rem / 4px) */
  xxs: "0.25rem",
  /** Extra small (0.5rem / 8px) */
  xs: "0.5rem",
  /** Small (0.75rem / 12px) */
  sm: "0.75rem",
  /** Medium - base unit (1rem / 16px) */
  md: "1rem",
  /** Large (1.25rem / 20px) */
  lg: "1.25rem",
  /** Extra large (1.5rem / 24px) */
  xl: "1.5rem",
  /** Extra extra large (2rem / 32px) */
  xxl: "2rem",
} as const;

/**
 * Type representing the Spacing token structure.
 */
export type SpacingToken = typeof Spacing;
