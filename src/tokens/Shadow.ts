/**
 * Shadow and glow effect design tokens.
 *
 * @remarks
 * Shadow provides configuration values for generating glow effects
 * on components. These values are used by the getAppearanceColor helper
 * to create dynamic shadow/glow styles based on appearance and brightness.
 *
 * @example
 * ```tsx
 * import { Shadow } from 'ghost/tokens';
 *
 * // Shadow values are typically used internally by helpers
 * const blur = Shadow.glow.blur; // 18
 * ```
 */
export const Shadow = {
  /** Glow effect configuration */
  glow: {
    /** Blur radius in pixels */
    blur: 18,
    /** Spread radius in pixels */
    spread: 0,
    /** Vertical offset in pixels */
    y: 8,
    /** Default opacity (0-1) */
    defaultOpacity: 0.45,
    /** Default color mix strength (0-1) */
    defaultMix: 0.42,
    /** Minimum brightness multiplier */
    minMultiplier: 0.25,
    /** Maximum brightness multiplier */
    maxMultiplier: 2.0,
  },
} as const;

/**
 * Type representing the Shadow token structure.
 */
export type ShadowToken = typeof Shadow;
