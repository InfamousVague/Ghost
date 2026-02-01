/**
 * Helper for mapping Brightness enum to multiplier values.
 *
 * @remarks
 * This module provides the getBrightnessMultiplier function which returns
 * a numeric multiplier for glow/shadow intensity based on the brightness level.
 *
 * @example
 * ```tsx
 * import { Brightness } from 'ghost/enums';
 * import { getBrightnessMultiplier } from 'ghost/helpers';
 *
 * const multiplier = getBrightnessMultiplier(Brightness.Bright);
 * // 1.5
 * ```
 */

import { Brightness } from "../enums";

const brightnessMultiplierMap: Record<Brightness, number> = {
  [Brightness.None]: 0,
  [Brightness.Soft]: 0.5,
  [Brightness.Base]: 1.0,
  [Brightness.Bright]: 1.5,
};

/**
 * Gets the glow multiplier for a brightness level.
 *
 * @param brightness - The brightness level
 * @returns Numeric multiplier (0 for none, up to 1.5 for bright)
 *
 * @example
 * ```tsx
 * const multiplier = getBrightnessMultiplier(Brightness.Soft);
 * // 0.8
 * ```
 */
export function getBrightnessMultiplier(brightness: Brightness): number {
  return brightnessMultiplierMap[brightness];
}
