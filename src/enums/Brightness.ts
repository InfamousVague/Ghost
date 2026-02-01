/**
 * Glow/shadow brightness intensity levels.
 *
 * @remarks
 * Brightness controls the intensity of glow effects and shadows
 * on components. Higher brightness values create more prominent
 * glow effects around elements.
 *
 * @example
 * ```tsx
 * import { Brightness } from 'ghost/enums';
 *
 * <Button brightness={Brightness.Bright} label="Glowing" />
 * <Button brightness={Brightness.None} label="No glow" />
 * ```
 */
export enum Brightness {
  /** No glow effect */
  None = "none",

  /** Subtle glow effect */
  Soft = "soft",

  /** Standard glow effect (default) */
  Base = "base",

  /** Intense glow effect */
  Bright = "bright",
}
