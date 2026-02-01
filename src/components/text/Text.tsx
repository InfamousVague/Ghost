import React from "react";
import {
  Text as RNText,
  View,
  Platform,
  StyleSheet,
  type TextStyle,
  type ViewStyle,
  type TextProps as RNTextProps,
} from "react-native";
import { TextAppearance, Brightness, Size } from "../../enums";
import { getBrightnessMultiplier } from "../../helpers";
import { useThemeColors } from "../../context/ThemeContext";
import { getThemedTextColor } from "../../helpers/useThemedColor";
import { Colors, Typography, Shadow, getGlowMultiplier } from "../../tokens";
import { useLoading } from "../card/Card";


/**
 * Props for the Text component.
 */
export type TextProps = {
  /** Text content */
  children: React.ReactNode;
  /** Text color appearance */
  appearance?: TextAppearance;
  /** Text size */
  size?: Size;
  /** Glow intensity */
  brightness?: Brightness;
  /** Font weight */
  weight?: "regular" | "medium" | "semibold" | "bold";
  /** Whether the component is in loading state */
  loading?: boolean;
  /** Width for skeleton when loading */
  skeletonWidth?: number | string;
  /** Number of skeleton lines when loading */
  skeletonLines?: number;
  /** Additional style overrides */
  style?: TextStyle;
} & Omit<RNTextProps, "style">;

/**
 * Size to font size mapping.
 */
const SIZE_MAP: Record<Size, number> = {
  [Size.TwoXSmall]: 10,
  [Size.ExtraSmall]: 12,
  [Size.Small]: 14,
  [Size.Medium]: 16,
  [Size.Large]: 18,
  [Size.ExtraLarge]: 20,
  [Size.TwoXLarge]: 24,
};

/**
 * Weight mapping.
 */
const WEIGHT_MAP: Record<string, TextStyle["fontWeight"]> = {
  regular: Typography.fontWeight.normal as TextStyle["fontWeight"],
  medium: Typography.fontWeight.medium as TextStyle["fontWeight"],
  semibold: Typography.fontWeight.semibold as TextStyle["fontWeight"],
  bold: Typography.fontWeight.bold as TextStyle["fontWeight"],
};

/**
 * Glow color mapping for text appearances.
 */
const GLOW_COLORS: Partial<Record<TextAppearance, string>> = {
  [TextAppearance.Link]: "#5A9BFF",
  [TextAppearance.Success]: "#34C759",
  [TextAppearance.Warning]: "#FF9F0A",
  [TextAppearance.Danger]: "#FF453A",
  [TextAppearance.Info]: "#5AC8FA",
};

/**
 * A text component with support for appearance, size, and glow effects.
 *
 * @remarks
 * Glows do not affect the physical space the component occupies,
 * making it safe to use in layouts where consistent sizing is important.
 *
 * @example Basic usage
 * ```tsx
 * <Text appearance={TextAppearance.Primary} size={Size.Medium}>
 *   Hello World
 * </Text>
 * ```
 *
 * @example With glow
 * ```tsx
 * <Text
 *   appearance={TextAppearance.Link}
 *   size={Size.Large}
 *   brightness={Brightness.Bright}
 * >
 *   Glowing Link
 * </Text>
 * ```
 */
export function Text({
  children,
  appearance = TextAppearance.Primary,
  size = Size.Medium,
  brightness = Brightness.None,
  weight = "regular",
  loading: loadingProp = false,
  skeletonWidth,
  skeletonLines = 1,
  style,
  ...props
}: TextProps) {
  const parentLoading = useLoading();
  const loading = loadingProp || parentLoading;
  const themeColors = useThemeColors();

  const color = getThemedTextColor(themeColors, appearance);
  const fontSize = SIZE_MAP[size];
  const fontWeight = WEIGHT_MAP[weight];
  const lineHeight = fontSize * 1.5;

  // Calculate glow
  const brightnessMultiplier = getBrightnessMultiplier(brightness);
  const glowColor = GLOW_COLORS[appearance];
  const hasGlow = glowColor && brightnessMultiplier > 0;

  const textStyle: TextStyle = {
    color,
    fontSize,
    fontWeight,
    lineHeight,
    fontFamily: Typography.fontFamily.base,
    ...style,
  };

  // Loading state - show skeleton
  if (loading) {
    const estimatedWidth = skeletonWidth ?? "100%";
    return (
      <View style={[styles.skeletonContainer, { gap: 8 }]}>
        {Array.from({ length: skeletonLines }).map((_, index) => {
          const isLastLine = index === skeletonLines - 1 && skeletonLines > 1;
          const lineWidth = isLastLine
            ? (typeof estimatedWidth === "number" ? estimatedWidth * 0.6 : "60%")
            : estimatedWidth;
          return (
            <View
              key={index}
              style={[styles.skeletonLine, { height: lineHeight }]}
            >
              <View
                style={[
                  styles.skeleton,
                  {
                    width: lineWidth as ViewStyle["width"],
                    height: fontSize * 0.75,
                    borderRadius: 4,
                  },
                ]}
              />
            </View>
          );
        })}
      </View>
    );
  }

  // Add text shadow for glow effect on web (positioned below like button shadows)
  if (hasGlow && Platform.OS === "web") {
    const runtimeMultiplier = Math.min(
      Math.max(getGlowMultiplier(), Shadow.glow.minMultiplier),
      Shadow.glow.maxMultiplier
    );
    const opacity = Math.min(
      Shadow.glow.defaultOpacity * brightnessMultiplier * runtimeMultiplier,
      1
    );
    const blur = Shadow.glow.blur * runtimeMultiplier * 0.75;
    const yOffset = Shadow.glow.y * runtimeMultiplier;

    // @ts-expect-error - textShadow is valid on web
    textStyle.textShadow = `0 ${yOffset}px ${blur}px rgba(${hexToRgb(glowColor)}, ${opacity})`;
  }

  // For native with glow, use shadow properties (positioned below like buttons)
  if (hasGlow && Platform.OS !== "web") {
    const runtimeMultiplier = Math.min(
      Math.max(getGlowMultiplier(), Shadow.glow.minMultiplier),
      Shadow.glow.maxMultiplier
    );
    const opacity = Math.min(
      Shadow.glow.defaultOpacity * brightnessMultiplier * runtimeMultiplier,
      1
    );
    const blur = Shadow.glow.blur * runtimeMultiplier * 0.75;
    const yOffset = Shadow.glow.y * runtimeMultiplier;

    // Note: Text shadows on native are limited, using container shadow as fallback
    return (
      <View style={styles.wrapper}>
        <View
          style={[
            styles.glowLayer,
            {
              shadowColor: glowColor,
              shadowOffset: { width: 0, height: yOffset },
              shadowOpacity: opacity,
              shadowRadius: blur,
            },
          ]}
        >
          <RNText style={[textStyle, { opacity: 0 }]} {...props}>
            {children}
          </RNText>
        </View>
        <RNText style={textStyle} {...props}>
          {children}
        </RNText>
      </View>
    );
  }

  return (
    <RNText style={textStyle} {...props}>
      {children}
    </RNText>
  );
}

/**
 * Convert hex color to RGB string.
 */
function hexToRgb(hex: string): string {
  const normalized = hex.replace("#", "");
  const bigint = parseInt(normalized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r}, ${g}, ${b}`;
}

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
  },
  glowLayer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  skeletonContainer: {
    flexDirection: "column",
  },
  skeletonLine: {
    justifyContent: "center",
  },
  skeleton: {
    backgroundColor: Colors.background.raised,
  },
});
