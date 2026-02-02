/**
 * Color intensity levels for semantic colors.
 *
 * @remarks
 * Intensity controls the saturation and brightness of status colors
 * (Success, Danger, etc.). Use `Dim` for subtler indicators that don't
 * draw excessive attention, like trade direction badges.
 *
 * @example
 * ```tsx
 * import { Intensity } from 'ghost/enums';
 *
 * <Tag direction="up" intensity={Intensity.Dim} />
 * <Button appearance={Appearance.Success} intensity={Intensity.Vivid} />
 * ```
 */
export enum Intensity {
  /** Softer, subdued colors - ideal for background indicators */
  Dim = "dim",

  /** Standard color intensity (default) */
  Normal = "normal",

  /** More saturated, vibrant colors - for emphasis */
  Vivid = "vivid",
}
