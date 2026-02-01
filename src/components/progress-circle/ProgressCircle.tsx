import React from "react";
import {
  View,
  Platform,
  StyleSheet,
  type ViewStyle,
} from "react-native";
import Svg, { Circle, Defs, Filter, FeGaussianBlur } from "react-native-svg";
import { Size, TextAppearance, Brightness } from "../../enums";
import { Colors, Shadow } from "../../tokens";
import { getBrightnessMultiplier } from "../../helpers";
import { Text } from "../text/Text";
import { Number } from "../number/Number";
import { Skeleton } from "../skeleton/Skeleton";
import { useLoading } from "../card/Card";

/**
 * Size configurations.
 */
const SIZE_MAP: Record<Size, { diameter: number; stroke: number; fontSize: Size }> = {
  [Size.TwoXSmall]: { diameter: 32, stroke: 3, fontSize: Size.TwoXSmall },
  [Size.ExtraSmall]: { diameter: 48, stroke: 4, fontSize: Size.ExtraSmall },
  [Size.Small]: { diameter: 64, stroke: 5, fontSize: Size.Small },
  [Size.Medium]: { diameter: 80, stroke: 6, fontSize: Size.Medium },
  [Size.Large]: { diameter: 96, stroke: 7, fontSize: Size.Large },
  [Size.ExtraLarge]: { diameter: 120, stroke: 8, fontSize: Size.ExtraLarge },
  [Size.TwoXLarge]: { diameter: 144, stroke: 10, fontSize: Size.TwoXLarge },
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
 * Props for the ProgressCircle component.
 */
export type ProgressCircleProps = {
  /** Progress value */
  value?: number;
  /** Maximum value */
  max?: number;
  /** Size variant */
  size?: Size;
  /** Color appearance */
  appearance?: TextAppearance;
  /** Glow intensity */
  brightness?: Brightness;
  /** Whether to show value inside */
  showValue?: boolean;
  /** Label text below the value */
  label?: string;
  /** Whether the component is in loading state */
  loading?: boolean;
  /** Additional style overrides */
  style?: ViewStyle;
};

/**
 * A circular progress indicator with optional glow effect.
 *
 * @example Basic usage
 * ```tsx
 * <ProgressCircle value={78} max={100} showValue label="YOUR SCORE" />
 * ```
 *
 * @example With glow
 * ```tsx
 * <ProgressCircle value={78} appearance={TextAppearance.Success} brightness={Brightness.Bright} />
 * ```
 */
export function ProgressCircle({
  value = 0,
  max = 100,
  size = Size.Large,
  appearance = TextAppearance.Link,
  brightness = Brightness.None,
  showValue = true,
  label,
  loading: loadingProp = false,
  style,
}: ProgressCircleProps) {
  const parentLoading = useLoading();
  const loading = loadingProp || parentLoading;

  const config = SIZE_MAP[size];
  const progress = Math.min(Math.max((value / max) * 100, 0), 100);
  const strokeColor = APPEARANCE_COLORS[appearance];

  const radius = (config.diameter - config.stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const brightnessMultiplier = getBrightnessMultiplier(brightness);
  const hasGlow = brightnessMultiplier > 0;
  const glowOpacity = Shadow.glow.defaultOpacity * brightnessMultiplier;
  const glowBlur = Shadow.glow.blur * 0.5;

  // Loading state
  if (loading) {
    return (
      <Skeleton
        width={config.diameter}
        height={config.diameter}
        borderRadius={config.diameter / 2}
        style={style}
      />
    );
  }

  // Glow padding to prevent clipping - needs extra space for blur
  const glowPadding = glowBlur * 2;
  const glowSize = config.diameter + glowPadding * 2;
  const glowOffset = config.stroke * 0.5;

  return (
    <View style={[styles.container, { width: config.diameter, height: config.diameter }, style]}>
      {/* Glow layer - expanded size to prevent clipping */}
      {hasGlow && progress > 0 && (
        <View style={[styles.glowLayer, {
          top: glowOffset - glowPadding,
          left: -glowPadding,
          width: glowSize,
          height: glowSize,
        }]}>
          <Svg width={glowSize} height={glowSize}>
            <Defs>
              <Filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <FeGaussianBlur stdDeviation={glowBlur} result="blur" />
              </Filter>
            </Defs>
            <Circle
              cx={glowSize / 2}
              cy={glowSize / 2}
              r={radius}
              stroke={strokeColor}
              strokeWidth={config.stroke * 1.5}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform={`rotate(-90 ${glowSize / 2} ${glowSize / 2})`}
              opacity={glowOpacity}
              filter="url(#glow)"
            />
          </Svg>
        </View>
      )}

      {/* Main circle */}
      <Svg width={config.diameter} height={config.diameter}>
        {/* Background circle */}
        <Circle
          cx={config.diameter / 2}
          cy={config.diameter / 2}
          r={radius}
          stroke={Colors.background.overlay}
          strokeWidth={config.stroke}
          fill="none"
        />
        {/* Progress circle */}
        <Circle
          cx={config.diameter / 2}
          cy={config.diameter / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={config.stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${config.diameter / 2} ${config.diameter / 2})`}
        />
      </Svg>

      {showValue && (
        <View style={styles.valueContainer}>
          <Number
            value={value}
            format={{ type: "score", max }}
            appearance={appearance}
            brightness={brightness}
            size={config.fontSize}
            weight="bold"
          />
          {label && (
            <Text
              appearance={TextAppearance.Muted}
              size={Size.TwoXSmall}
              style={styles.label}
            >
              {label}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
  },
  glowLayer: {
    position: "absolute",
    overflow: "visible",
  },
  valueContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: 2,
  },
});
