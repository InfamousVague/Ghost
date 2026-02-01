/**
 * Size variants for components.
 *
 * @remarks
 * Size controls the dimensions, padding, and font size of components.
 * The size scale ranges from TwoXSmall (2xs) to TwoXLarge (2xl),
 * with Medium as the default.
 *
 * @example
 * ```tsx
 * import { Size } from 'ghost/enums';
 *
 * <Button size={Size.Small} label="Compact" />
 * <Button size={Size.Large} label="Prominent" />
 * ```
 */
export enum Size {
  /** Extra extra small (2xs) - minimal padding, smallest text */
  TwoXSmall = "2xs",

  /** Extra small (xs) - very compact */
  ExtraSmall = "xs",

  /** Small (sm) - compact but readable */
  Small = "sm",

  /** Medium (md) - default size, balanced proportions */
  Medium = "md",

  /** Large (lg) - more prominent */
  Large = "lg",

  /** Extra large (xl) - highly prominent */
  ExtraLarge = "xl",

  /** Extra extra large (2xl) - maximum prominence */
  TwoXLarge = "2xl",
}
