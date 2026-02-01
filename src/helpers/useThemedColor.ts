/**
 * Theme-aware color helpers for Ghost components.
 */

import { TextAppearance } from "../enums";
import { useThemeColors, type ThemeColors } from "../context/ThemeContext";

/**
 * Hook that returns a function to get theme-aware text colors.
 */
export function useThemedTextColor() {
  const colors = useThemeColors();

  return (appearance: TextAppearance): string => {
    switch (appearance) {
      case TextAppearance.Primary:
        return colors.text.primary;
      case TextAppearance.Secondary:
        return colors.text.secondary;
      case TextAppearance.Muted:
        return colors.text.muted;
      case TextAppearance.Link:
        return colors.accent.primary;
      case TextAppearance.Inverse:
        // Inverse depends on context - use opposite of primary
        return colors.background.canvas;
      case TextAppearance.Success:
        return colors.status.success;
      case TextAppearance.Warning:
        return colors.status.warning;
      case TextAppearance.Danger:
        return colors.status.danger;
      case TextAppearance.Info:
        return colors.status.info;
      default:
        return colors.text.primary;
    }
  };
}

/**
 * Get themed text color from colors object (for use when you already have colors).
 */
export function getThemedTextColor(colors: ThemeColors, appearance: TextAppearance): string {
  switch (appearance) {
    case TextAppearance.Primary:
      return colors.text.primary;
    case TextAppearance.Secondary:
      return colors.text.secondary;
    case TextAppearance.Muted:
      return colors.text.muted;
    case TextAppearance.Link:
      return colors.accent.primary;
    case TextAppearance.Inverse:
      return colors.background.canvas;
    case TextAppearance.Success:
      return colors.status.success;
    case TextAppearance.Warning:
      return colors.status.warning;
    case TextAppearance.Danger:
      return colors.status.danger;
    case TextAppearance.Info:
      return colors.status.info;
    default:
      return colors.text.primary;
  }
}
