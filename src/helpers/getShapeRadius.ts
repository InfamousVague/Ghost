/**
 * Helper for mapping Shape enum to border radius values.
 *
 * @remarks
 * This module provides the getShapeRadius function which returns
 * the appropriate border-radius CSS value for a given shape variant.
 *
 * @example
 * ```tsx
 * import { Shape } from 'ghost/enums';
 * import { getShapeRadius } from 'ghost/helpers';
 *
 * const radius = getShapeRadius(Shape.Pill);
 * // "9999px"
 * ```
 */

import { Shape } from "../enums";
import { Radii } from "../tokens/Radii";

const shapeRadiusMap: Record<Shape, string> = {
  [Shape.Soft]: Radii.soft,
  [Shape.Rounded]: Radii.rounded,
  [Shape.Pill]: Radii.pill,
  [Shape.Circle]: Radii.circle,
};

/**
 * Gets the border radius value for a shape variant.
 *
 * @param shape - The shape variant
 * @returns The border-radius CSS value
 *
 * @example
 * ```tsx
 * const radius = getShapeRadius(Shape.Rounded);
 * // "8px"
 * ```
 */
export function getShapeRadius(shape: Shape): string {
  return shapeRadiusMap[shape];
}
