import React from "react";
import { View, Platform, StyleSheet, type ViewStyle } from "react-native";

/**
 * Point coordinates for gradient direction.
 */
type GradientPoint = {
  x: number;
  y: number;
};

/**
 * Props for the LinearGradient component.
 */
export type LinearGradientProps = {
  /** Array of colors for the gradient */
  colors: string[];
  /** Start point of the gradient (0-1 for both x and y) */
  start?: GradientPoint;
  /** End point of the gradient (0-1 for both x and y) */
  end?: GradientPoint;
  /** Optional locations for each color (0-1) */
  locations?: number[];
  /** Style for the gradient container */
  style?: ViewStyle;
  /** Children to render inside the gradient */
  children?: React.ReactNode;
};

/**
 * Cross-platform linear gradient component.
 *
 * @remarks
 * On web, this uses CSS linear-gradient. On native platforms,
 * it provides a View that can be enhanced with expo-linear-gradient
 * or react-native-linear-gradient when those packages are available.
 *
 * @example
 * ```tsx
 * <LinearGradient
 *   colors={['#ff0000', '#0000ff']}
 *   start={{ x: 0, y: 0 }}
 *   end={{ x: 1, y: 1 }}
 *   style={{ width: 100, height: 100 }}
 * />
 * ```
 */
export function LinearGradient({
  colors,
  start = { x: 0, y: 0 },
  end = { x: 1, y: 0 },
  locations,
  style,
  children,
}: LinearGradientProps) {
  if (Platform.OS === "web") {
    const angle = calculateAngle(start, end);
    const gradientStops = createGradientStops(colors, locations);
    const backgroundImage = `linear-gradient(${angle}deg, ${gradientStops})`;

    return (
      <View
        style={[
          style,
          {
            // @ts-expect-error - backgroundImage is valid on web
            backgroundImage,
          },
        ]}
      >
        {children}
      </View>
    );
  }

  // Native fallback - renders first color as solid background
  // To get actual gradients on native, install expo-linear-gradient
  // and replace this component's native implementation
  return (
    <View style={[style, { backgroundColor: colors[0] }]}>
      {children}
    </View>
  );
}

/**
 * Calculate CSS angle from start/end points.
 */
function calculateAngle(start: GradientPoint, end: GradientPoint): number {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  // Convert to degrees, adjusting for CSS gradient direction
  const radians = Math.atan2(dy, dx);
  const degrees = (radians * 180) / Math.PI;
  // CSS gradients start from top (270°) and go clockwise
  return 90 + degrees;
}

/**
 * Create CSS gradient color stops.
 */
function createGradientStops(colors: string[], locations?: number[]): string {
  if (locations && locations.length === colors.length) {
    return colors
      .map((color, i) => `${color} ${locations[i] * 100}%`)
      .join(", ");
  }
  // Evenly distribute colors
  return colors
    .map((color, i) => {
      const percent = (i / (colors.length - 1)) * 100;
      return `${color} ${percent}%`;
    })
    .join(", ");
}
