/**
 * Visual appearance variants for interactive components.
 *
 * @remarks
 * Appearance controls the color scheme and visual treatment of components
 * like buttons, badges, and alerts. Each appearance maps to a specific
 * set of colors from the design token system.
 *
 * @example
 * ```tsx
 * import { Appearance } from 'ghost/enums';
 *
 * <Button appearance={Appearance.Primary} label="Submit" />
 * <Button appearance={Appearance.Danger} label="Delete" />
 * ```
 */
export enum Appearance {
  /** Primary brand color, used for main actions */
  Primary = "primary",

  /** Secondary/subtle style, used for alternative actions */
  Secondary = "secondary",

  /** Green/positive, used for success states and confirmations */
  Success = "success",

  /** Yellow/amber, used for warnings and caution states */
  Warning = "warning",

  /** Red/destructive, used for errors and dangerous actions */
  Danger = "danger",

  /** Blue/informational, used for information and tips */
  Info = "info",

  /** Transparent background, used for subtle/text-like buttons */
  Ghost = "ghost",

  /** Neutral gray, used for non-primary actions */
  Neutral = "neutral",
}
