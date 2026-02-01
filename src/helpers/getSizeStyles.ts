/**
 * Helper for mapping Size enum to dimension styles.
 *
 * @remarks
 * This module provides the getSizeStyles function which returns
 * padding and font size values appropriate for a given size variant.
 *
 * @example
 * ```tsx
 * import { Size } from 'ghost/enums';
 * import { getSizeStyles } from 'ghost/helpers';
 *
 * const styles = getSizeStyles(Size.Large);
 * // { paddingVertical: "0.75rem", paddingHorizontal: "1.25rem", fontSize: "1.125rem" }
 * ```
 */

import { Size } from "../enums";
import { Spacing, Typography } from "../tokens";

/**
 * Style values returned for each size variant.
 */
export type SizeStyles = {
  /** Vertical padding (top and bottom) */
  paddingVertical: string;
  /** Horizontal padding (left and right) */
  paddingHorizontal: string;
  /** Font size */
  fontSize: string;
};

const sizeStylesMap: Record<Size, SizeStyles> = {
  [Size.TwoXSmall]: {
    paddingVertical: Spacing.xxs,
    paddingHorizontal: Spacing.xs,
    fontSize: Typography.fontSize.xxs,
  },
  [Size.ExtraSmall]: {
    paddingVertical: Spacing.xxs,
    paddingHorizontal: Spacing.sm,
    fontSize: Typography.fontSize.xs,
  },
  [Size.Small]: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    fontSize: Typography.fontSize.sm,
  },
  [Size.Medium]: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    fontSize: Typography.fontSize.md,
  },
  [Size.Large]: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    fontSize: Typography.fontSize.lg,
  },
  [Size.ExtraLarge]: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    fontSize: Typography.fontSize.xl,
  },
  [Size.TwoXLarge]: {
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xxl,
    fontSize: Typography.fontSize.xxl,
  },
};

/**
 * Gets the dimension styles for a size variant.
 *
 * @param size - The size variant
 * @returns Object with paddingVertical, paddingHorizontal, and fontSize
 *
 * @example
 * ```tsx
 * const { paddingVertical, paddingHorizontal, fontSize } = getSizeStyles(Size.Medium);
 * ```
 */
export function getSizeStyles(size: Size): SizeStyles {
  return sizeStylesMap[size];
}
