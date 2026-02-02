import React from "react";
import {
  View,
  Platform,
  StyleSheet,
  type ViewStyle,
} from "react-native";
import { Size, TextAppearance, Brightness } from "../../enums";
import { Colors, Shadow } from "../../tokens";
import { getBrightnessMultiplier } from "../../helpers";
import { useThemeColors } from "../../context/ThemeContext";
import { Skeleton } from "../skeleton/Skeleton";
import { useLoading } from "../card/Card";

/**
 * Size to height mapping.
 */
const SIZE_MAP: Record<Size, number> = {
  [Size.TwoXSmall]: 2,
  [Size.ExtraSmall]: 4,
  [Size.Small]: 6,
  [Size.Medium]: 8,
  [Size.Large]: 10,
  [Size.ExtraLarge]: 12,
  [Size.TwoXLarge]: 16,
};

/**
 * Appearance to color mapping.
 */
const APPEARANCE_COLORS: Record<TextAppearance, string> = {
  [TextAppearance.Primary]: Colors.accent.primary,
  [TextAppearance.Secondary]: Colors.text.secondary,
  [TextAppearance.Muted]: Colors.text.muted,
  [TextAppearance.Link]: Colors.text.link,
  [TextAppearance.Inverse]: Colors.text.inverse,
  [TextAppearance.Success]: Colors.status.success,
  [TextAppearance.Warning]: Colors.status.warning,
  [TextAppearance.Danger]: Colors.status.danger,
  [TextAppearance.Info]: Colors.status.info,
};

/**
 * Props for the ProgressBar component.
 */
export type ProgressBarProps = {
  /** Progress value (0-100) */
  value?: number;
  /** Maximum value */
  max?: number;
  /** Size variant */
  size?: Size;
  /** Color appearance */
  appearance?: TextAppearance;
  /** Custom color (overrides appearance) */
  color?: string;
  /** Glow intensity */
  brightness?: Brightness;
  /** Whether to show as indeterminate */
  indeterminate?: boolean;
  /** Whether the component is in loading state */
  loading?: boolean;
  /** Additional style overrides */
  style?: ViewStyle;
};

/**
 * A progress bar component with optional glow effect.
 *
 * @example Basic usage
 * ```tsx
 * <ProgressBar value={65} />
 * ```
 *
 * @example With glow
 * ```tsx
 * <ProgressBar value={65} appearance={TextAppearance.Success} brightness={Brightness.Bright} />
 * ```
 */
export function ProgressBar({
  value = 0,
  max = 100,
  size = Size.Medium,
  appearance = TextAppearance.Primary,
  color,
  brightness = Brightness.None,
  indeterminate = false,
  loading: loadingProp = false,
  style,
}: ProgressBarProps) {
  const parentLoading = useLoading();
  const loading = loadingProp || parentLoading;
  const themeColors = useThemeColors();

  const height = SIZE_MAP[size];
  const progress = Math.min(Math.max((value / max) * 100, 0), 100);
  // Use custom color if provided, otherwise use appearance color
  const fillColor = color ?? APPEARANCE_COLORS[appearance];

  const brightnessMultiplier = getBrightnessMultiplier(brightness);
  const hasGlow = brightnessMultiplier > 0;

  // Loading state
  if (loading) {
    return (
      <Skeleton
        width="100%"
        height={height}
        borderRadius={height / 2}
        style={style}
      />
    );
  }

  const containerStyle: ViewStyle = {
    height,
    borderRadius: height / 2,
    backgroundColor: themeColors.background.overlay,
    overflow: "visible", // Allow glow to show
    ...style,
  };

  const fillStyle: ViewStyle = {
    height: "100%",
    width: `${progress}%`,
    backgroundColor: fillColor,
    borderRadius: height / 2,
  };

  // Glow styles
  const glowOpacity = Shadow.glow.defaultOpacity * brightnessMultiplier;
  const glowBlur = Shadow.glow.blur * 0.6;
  const glowY = height * 0.5;

  const glowStyle: ViewStyle = {
    position: "absolute",
    top: glowY,
    left: 0,
    height: "100%",
    width: `${progress}%`,
    backgroundColor: fillColor,
    borderRadius: height / 2,
    opacity: glowOpacity,
    // Native shadow
    ...(Platform.OS !== "web" && {
      shadowColor: fillColor,
      shadowOffset: { width: 0, height: glowY },
      shadowOpacity: glowOpacity,
      shadowRadius: glowBlur,
    }),
  };

  // Web-specific blur filter
  const webGlowStyle = Platform.OS === "web" ? {
    filter: `blur(${glowBlur}px)`,
  } : {};

  return (
    <View style={styles.wrapper}>
      {/* Glow layer */}
      {hasGlow && progress > 0 && (
        <View style={[glowStyle, webGlowStyle as ViewStyle]} />
      )}
      {/* Main bar */}
      <View style={containerStyle}>
        <View style={fillStyle} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
  },
});
