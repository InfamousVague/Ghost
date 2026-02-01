/**
 * Text color appearance variants.
 *
 * @remarks
 * TextAppearance controls the color of text elements. It includes
 * standard text hierarchy colors (primary, secondary, muted) as well
 * as semantic colors for different contexts (success, warning, etc.).
 *
 * @example
 * ```tsx
 * import { TextAppearance } from 'ghost/enums';
 * import { getTextAppearanceColor } from 'ghost/helpers';
 *
 * const color = getTextAppearanceColor(TextAppearance.Muted);
 * ```
 */
export enum TextAppearance {
  /** Primary text color - highest contrast, for main content */
  Primary = "primary",

  /** Secondary text color - medium contrast, for supporting content */
  Secondary = "secondary",

  /** Muted text color - low contrast, for de-emphasized content */
  Muted = "muted",

  /** Link text color - accent color for interactive text */
  Link = "link",

  /** Inverse text color - for use on colored backgrounds */
  Inverse = "inverse",

  /** Success text color - green, for positive messages */
  Success = "success",

  /** Warning text color - yellow/amber, for caution messages */
  Warning = "warning",

  /** Danger text color - red, for error messages */
  Danger = "danger",

  /** Info text color - blue, for informational messages */
  Info = "info",
}
