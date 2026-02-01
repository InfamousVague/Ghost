/**
 * Helper for mapping Appearance enum to color sets.
 *
 * @remarks
 * This module provides the getAppearanceColor function which returns
 * a complete set of colors for a given appearance variant. It handles
 * theme-aware text colors and dynamic glow/shadow effects.
 *
 * @example
 * ```tsx
 * import { Appearance } from 'ghost/enums';
 * import { getAppearanceColor } from 'ghost/helpers';
 *
 * const colors = getAppearanceColor(Appearance.Primary);
 * // { background, backgroundHover, backgroundActive, text, border, shadow }
 * ```
 */

import { Platform } from "react-native";
import { Appearance, Theme } from "../enums";
import { Colors, Shadow, getGlowMultiplier, getCurrentTheme } from "../tokens";

/**
 * Cross-platform shadow style object.
 */
export type ShadowStyle = {
  /** iOS shadow color */
  shadowColor: string;
  /** iOS shadow offset */
  shadowOffset: { width: number; height: number };
  /** iOS shadow opacity */
  shadowOpacity: number;
  /** iOS shadow radius (blur) */
  shadowRadius: number;
  /** Android elevation */
  elevation: number;
  /** Web box-shadow (only applied on web) */
  boxShadow?: string;
};

/**
 * Color set returned for each appearance variant.
 */
export type AppearanceColorSet = {
  /** Background color */
  background: string;
  /** Background color on hover */
  backgroundHover: string;
  /** Background color when active/pressed */
  backgroundActive: string;
  /** Text color */
  text: string;
  /** Border color */
  border: string;
  /** Cross-platform shadow styles */
  shadow: ShadowStyle;
};

/**
 * Internal configuration for each appearance.
 */
type AppearanceConfig = {
  background: string;
  backgroundHover: string;
  backgroundActive: string;
  text: (theme: Theme) => string;
  border: string;
  glowColor?: string;
  glowMixOffset?: number;
  glowEnabled?: boolean;
};

const appearanceConfig: Record<Appearance, AppearanceConfig> = {
  [Appearance.Primary]: {
    background: Colors.accent.primary,
    backgroundHover: Colors.accent.primaryHover,
    backgroundActive: Colors.accent.primaryActive,
    text: () => Colors.text.primary,
    border: Colors.accent.primary,
    glowColor: Colors.accent.primary,
  },
  [Appearance.Secondary]: {
    background: Colors.accent.secondary,
    backgroundHover: Colors.surface.secondary,
    backgroundActive: Colors.surface.primary,
    text: () => Colors.accent.primary,
    border: Colors.accent.secondary,
    glowColor: Colors.accent.secondary,
    glowMixOffset: 0.15,
  },
  [Appearance.Success]: {
    background: Colors.status.success,
    backgroundHover: Colors.status.success,
    backgroundActive: Colors.status.success,
    text: () => Colors.text.primary,
    border: Colors.status.success,
    glowColor: Colors.status.success,
    glowMixOffset: 0.1,
  },
  [Appearance.Warning]: {
    background: Colors.status.warning,
    backgroundHover: Colors.status.warning,
    backgroundActive: Colors.status.warning,
    text: () => Colors.text.primary,
    border: Colors.status.warning,
    glowColor: Colors.status.warning,
    glowMixOffset: 0.1,
  },
  [Appearance.Danger]: {
    background: Colors.status.danger,
    backgroundHover: Colors.status.danger,
    backgroundActive: Colors.status.danger,
    text: () => Colors.text.primary,
    border: Colors.status.danger,
    glowColor: Colors.status.danger,
    glowMixOffset: 0.1,
  },
  [Appearance.Info]: {
    background: Colors.status.info,
    backgroundHover: Colors.status.info,
    backgroundActive: Colors.status.info,
    text: () => Colors.text.primary,
    border: Colors.status.info,
    glowColor: Colors.status.info,
    glowMixOffset: 0.1,
  },
  [Appearance.Ghost]: {
    background: "transparent",
    backgroundHover: Colors.background.overlay,
    backgroundActive: Colors.background.raised,
    text: (theme) => (theme === Theme.Light ? "#000000" : Colors.text.primary),
    border: "transparent",
    glowEnabled: false,
  },
};

/**
 * Empty shadow for when glow is disabled.
 */
const noShadow: ShadowStyle = {
  shadowColor: "transparent",
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0,
  shadowRadius: 0,
  elevation: 0,
};

/**
 * Creates cross-platform shadow styles.
 */
function createShadow(
  color: string,
  baseMix: number,
  brightnessMultiplier: number
): ShadowStyle {
  if (brightnessMultiplier <= 0) {
    return noShadow;
  }

  const runtimeMultiplier = clamp(
    getGlowMultiplier(),
    Shadow.glow.minMultiplier,
    Shadow.glow.maxMultiplier
  );
  const mix = clamp(baseMix * brightnessMultiplier * runtimeMultiplier, 0, 1);
  const opacity = clamp(
    Shadow.glow.defaultOpacity * brightnessMultiplier * runtimeMultiplier,
    0,
    1
  );
  const blur = Shadow.glow.blur * runtimeMultiplier;
  const y = Shadow.glow.y * runtimeMultiplier;

  // Get the mixed color for the shadow
  const shadowColor = mixColor(color, mix);
  const rgbaString = `rgba(${shadowColor.r}, ${shadowColor.g}, ${shadowColor.b}, ${opacity})`;

  // Create cross-platform shadow
  const shadow: ShadowStyle = {
    // iOS shadow properties
    shadowColor: `rgb(${shadowColor.r}, ${shadowColor.g}, ${shadowColor.b})`,
    shadowOffset: { width: 0, height: y },
    shadowOpacity: opacity,
    shadowRadius: blur,
    // Android elevation (approximate)
    elevation: Math.round(blur / 2),
  };

  // Add boxShadow for web
  if (Platform.OS === "web") {
    shadow.boxShadow = `0 ${y}px ${blur}px ${Shadow.glow.spread}px ${rgbaString}`;
  }

  return shadow;
}

/**
 * Mixes a hex color towards black and returns RGB components.
 */
function mixColor(
  color: string,
  mixStrength: number
): { r: number; g: number; b: number } {
  const normalized = color.replace("#", "");
  const bigint = parseInt(normalized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return {
    r: Math.round(r * mixStrength),
    g: Math.round(g * mixStrength),
    b: Math.round(b * mixStrength),
  };
}

/**
 * Clamps a value between min and max.
 */
function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Gets the complete color set for an appearance variant.
 *
 * @param appearance - The appearance variant
 * @param brightnessMultiplier - Optional multiplier for glow intensity (default: 1)
 * @returns Complete color set with background, text, border, and shadow
 *
 * @example
 * ```tsx
 * const colors = getAppearanceColor(Appearance.Success, 1.5);
 * const style = {
 *   backgroundColor: colors.background,
 *   color: colors.text,
 *   ...colors.shadow, // Spread shadow styles
 * };
 * ```
 */
export function getAppearanceColor(
  appearance: Appearance,
  brightnessMultiplier = 1
): AppearanceColorSet {
  const config = appearanceConfig[appearance];
  const theme = getCurrentTheme();
  const text = config.text(theme);
  const baseMix = Shadow.glow.defaultMix + (config.glowMixOffset ?? 0);
  const glowColor = config.glowColor ?? config.border;
  const glowEnabled = config.glowEnabled !== false;
  const shadow = glowEnabled
    ? createShadow(glowColor, baseMix, brightnessMultiplier)
    : noShadow;

  return {
    background: config.background,
    backgroundHover: config.backgroundHover,
    backgroundActive: config.backgroundActive,
    text,
    border: config.border,
    shadow,
  };
}
