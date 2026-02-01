/**
 * Color theme modes for the application.
 *
 * @remarks
 * Theme controls whether the application uses light or dark color schemes.
 * Components can adapt their colors based on the active theme.
 *
 * @example
 * ```tsx
 * import { Theme } from 'ghost/enums';
 * import { setCurrentTheme } from 'ghost/tokens';
 *
 * // Set the application theme
 * setCurrentTheme(Theme.Dark);
 * ```
 */
export enum Theme {
  /** Light color scheme with light backgrounds and dark text */
  Light = "light",

  /** Dark color scheme with dark backgrounds and light text */
  Dark = "dark",
}
