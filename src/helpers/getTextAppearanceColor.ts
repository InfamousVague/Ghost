/**
 * Helper for mapping TextAppearance enum to text colors.
 *
 * @remarks
 * This module provides the getTextAppearanceColor function which returns
 * the appropriate text color for a given text appearance variant.
 *
 * @example
 * ```tsx
 * import { TextAppearance } from 'ghost/enums';
 * import { getTextAppearanceColor } from 'ghost/helpers';
 *
 * const color = getTextAppearanceColor(TextAppearance.Muted);
 * // "#9096AB"
 * ```
 */

import { TextAppearance } from "../enums";
import { Colors } from "../tokens/Colors";

const textAppearanceColorMap: Record<TextAppearance, string> = {
  [TextAppearance.Primary]: Colors.text.primary,
  [TextAppearance.Secondary]: Colors.text.secondary,
  [TextAppearance.Muted]: Colors.text.muted,
  [TextAppearance.Link]: Colors.text.link,
  [TextAppearance.Inverse]: Colors.text.inverse,
  [TextAppearance.Success]: Colors.status.success,
  [TextAppearance.Warning]: Colors.status.warning,
  [TextAppearance.Danger]: Colors.status.danger,
  [TextAppearance.Info]: Colors.status.info,
};

/**
 * Gets the text color for a text appearance variant.
 *
 * @param appearance - The text appearance variant
 * @returns The hex color value
 *
 * @example
 * ```tsx
 * const color = getTextAppearanceColor(TextAppearance.Link);
 * // "#5A9BFF"
 * ```
 */
export function getTextAppearanceColor(appearance: TextAppearance): string {
  return textAppearanceColorMap[appearance];
}
