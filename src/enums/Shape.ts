/**
 * Border radius shape variants for components.
 *
 * @remarks
 * Shape controls the corner rounding of components. Each shape maps
 * to a specific border-radius value from the Radii token system.
 *
 * @example
 * ```tsx
 * import { Shape } from 'ghost/enums';
 *
 * <Button shape={Shape.Rounded} label="Default" />
 * <Button shape={Shape.Pill} label="Tag" />
 * ```
 */
export enum Shape {
  /** Subtle rounding (4px) - slightly softened corners */
  Soft = "soft",

  /** Standard rounding (8px) - default balanced look */
  Rounded = "rounded",

  /** Fully rounded ends (9999px) - pill/capsule shape */
  Pill = "pill",

  /** Perfect circle (50%) - for icon buttons and avatars */
  Circle = "circle",
}
