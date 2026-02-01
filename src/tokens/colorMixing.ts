/**
 * Color mixing utilities for the Ghost design system.
 *
 * @remarks
 * This module provides functions to mix colors together, allowing the primary
 * accent color to influence the entire color palette. By changing the primary
 * color, the hue of backgrounds, surfaces, and borders will shift accordingly.
 *
 * @example
 * ```tsx
 * import { mixColors, setPrimaryHue } from 'ghost/tokens';
 *
 * // Mix 10% of primary into a gray
 * const tintedGray = mixColors('#1a1a1a', primaryColor, 0.1);
 *
 * // Change the primary hue globally
 * setPrimaryHue('#A89AFF');
 * ```
 */

/**
 * Parse a hex color to RGB values.
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    return { r: 0, g: 0, b: 0 };
  }
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}

/**
 * Convert RGB values to hex string.
 */
function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const hex = Math.round(Math.max(0, Math.min(255, n))).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Mix two colors together.
 *
 * @param baseColor - The base color (hex)
 * @param mixColor - The color to mix in (hex)
 * @param amount - Amount of mixColor to add (0-1)
 * @returns The mixed color as hex
 *
 * @example
 * ```tsx
 * const tinted = mixColors('#1a1a1a', '#A89AFF', 0.1);
 * ```
 */
export function mixColors(baseColor: string, mixColor: string, amount: number): string {
  const base = hexToRgb(baseColor);
  const mix = hexToRgb(mixColor);

  const r = base.r + (mix.r - base.r) * amount;
  const g = base.g + (mix.g - base.g) * amount;
  const b = base.b + (mix.b - base.b) * amount;

  return rgbToHex(r, g, b);
}

/**
 * Lighten a color by mixing with white.
 */
export function lighten(color: string, amount: number): string {
  return mixColors(color, "#FFFFFF", amount);
}

/**
 * Darken a color by mixing with black.
 */
export function darken(color: string, amount: number): string {
  return mixColors(color, "#000000", amount);
}

/**
 * Create an RGBA string from hex and alpha.
 */
export function withAlpha(hex: string, alpha: number): string {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// ============================================================================
// Primary Color Configuration
// ============================================================================

/** The primary accent color that influences the entire palette */
let primaryColor = "#A89AFF";

/** Base neutral colors (pure grays) */
const BASE_NEUTRALS = {
  gray950: "#050506",
  gray900: "#0A0A0C",
  gray850: "#0F0F12",
  gray800: "#141418",
  gray750: "#19191E",
  gray700: "#1E1E24",
  gray650: "#24242C",
  gray600: "#2A2A34",
  gray500: "#3A3A48",
  gray400: "#5A5A6E",
  gray300: "#8A8AA0",
  gray200: "#B0B0C0",
  gray100: "#D0D0DC",
  gray50: "#F0F0F8",
};

/**
 * Set the primary accent color.
 * This will affect all derived colors in the palette.
 *
 * @param color - Hex color string
 */
export function setPrimaryColor(color: string): void {
  primaryColor = color;
}

/**
 * Get the current primary accent color.
 */
export function getPrimaryColor(): string {
  return primaryColor;
}

/**
 * Mix amounts for different color categories.
 * Higher values = more primary color influence.
 */
const MIX_AMOUNTS = {
  background: 0.03,    // Very subtle tint
  surface: 0.05,       // Slightly more visible
  border: 0.08,        // Noticeable but subtle
  overlay: 0.06,       // Medium tint
  text: 0.02,          // Minimal tint for readability
};

/**
 * Generate a color palette with primary color mixed in.
 */
export function generatePalette() {
  const p = primaryColor;

  return {
    background: {
      canvas: mixColors(BASE_NEUTRALS.gray950, p, MIX_AMOUNTS.background),
      surface: mixColors(BASE_NEUTRALS.gray900, p, MIX_AMOUNTS.background),
      raised: mixColors(BASE_NEUTRALS.gray800, p, MIX_AMOUNTS.surface),
      overlay: mixColors(BASE_NEUTRALS.gray700, p, MIX_AMOUNTS.overlay),
      subtle: mixColors(BASE_NEUTRALS.gray950, p, MIX_AMOUNTS.background),
      base: mixColors(BASE_NEUTRALS.gray900, p, MIX_AMOUNTS.background),
    },
    surface: {
      primary: mixColors(BASE_NEUTRALS.gray850, p, MIX_AMOUNTS.surface),
      secondary: mixColors(BASE_NEUTRALS.gray800, p, MIX_AMOUNTS.surface),
      tertiary: mixColors(BASE_NEUTRALS.gray750, p, MIX_AMOUNTS.surface),
    },
    border: {
      subtle: mixColors(BASE_NEUTRALS.gray700, p, MIX_AMOUNTS.border),
      strong: mixColors(BASE_NEUTRALS.gray600, p, MIX_AMOUNTS.border),
      focus: lighten(p, 0.2),
    },
    text: {
      primary: mixColors(BASE_NEUTRALS.gray50, p, MIX_AMOUNTS.text),
      secondary: mixColors(BASE_NEUTRALS.gray200, p, MIX_AMOUNTS.text),
      muted: mixColors(BASE_NEUTRALS.gray400, p, MIX_AMOUNTS.text * 2),
      link: p,
      inverse: mixColors(BASE_NEUTRALS.gray900, p, MIX_AMOUNTS.background),
    },
    accent: {
      primary: p,
      primaryHover: lighten(p, 0.1),
      primaryActive: darken(p, 0.1),
      secondary: darken(p, 0.8),
      highlight: lighten(p, 0.15),
    },
  };
}

// Export pre-computed values for static usage
export const DerivedColors = generatePalette();
