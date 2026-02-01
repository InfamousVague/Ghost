/**
 * Runtime state management for design tokens.
 *
 * @remarks
 * This module provides functions to get and set runtime values that affect
 * how design tokens are applied. These values can be changed dynamically
 * without requiring a re-render of the entire application.
 *
 * @example
 * ```tsx
 * import { setGlowMultiplier, setCurrentTheme } from 'ghost/tokens';
 * import { Theme } from 'ghost/enums';
 *
 * // Adjust glow intensity at runtime
 * setGlowMultiplier(1.5);
 *
 * // Switch between light and dark themes
 * setCurrentTheme(Theme.Light);
 * ```
 */

import { Theme } from "../enums/Theme";

/** Current glow intensity multiplier */
let glowMultiplier = 1;

/** Current active theme */
let currentTheme: Theme = Theme.Dark;

/**
 * Sets the glow intensity multiplier.
 *
 * @param value - Multiplier value (typically 0.25 to 3)
 *
 * @example
 * ```tsx
 * setGlowMultiplier(2); // Double the glow intensity
 * ```
 */
export function setGlowMultiplier(value: number): void {
  glowMultiplier = value;
}

/**
 * Gets the current glow intensity multiplier.
 *
 * @returns The current glow multiplier value
 */
export function getGlowMultiplier(): number {
  return glowMultiplier;
}

/**
 * Sets the current color theme.
 *
 * @param theme - The theme to activate
 *
 * @example
 * ```tsx
 * setCurrentTheme(Theme.Dark);
 * ```
 */
export function setCurrentTheme(theme: Theme): void {
  currentTheme = theme;
}

/**
 * Gets the current color theme.
 *
 * @returns The currently active theme
 */
export function getCurrentTheme(): Theme {
  return currentTheme;
}
