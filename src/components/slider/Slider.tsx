import React, { useCallback } from "react";
import {
  View,
  Platform,
  StyleSheet,
  type ViewStyle,
} from "react-native";
import { Size, TextAppearance, Brightness } from "../../enums";
import { Colors, Shadow } from "../../tokens";
import { getBrightnessMultiplier } from "../../helpers";
import { Skeleton } from "../skeleton/Skeleton";
import { useLoading } from "../card/Card";

/**
 * Size to track height mapping.
 */
const SIZE_MAP: Record<Size, { trackHeight: number; thumbSize: number }> = {
  [Size.TwoXSmall]: { trackHeight: 2, thumbSize: 10 },
  [Size.ExtraSmall]: { trackHeight: 3, thumbSize: 12 },
  [Size.Small]: { trackHeight: 4, thumbSize: 14 },
  [Size.Medium]: { trackHeight: 5, thumbSize: 16 },
  [Size.Large]: { trackHeight: 6, thumbSize: 18 },
  [Size.ExtraLarge]: { trackHeight: 8, thumbSize: 22 },
  [Size.TwoXLarge]: { trackHeight: 10, thumbSize: 26 },
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
 * Props for the Slider component.
 */
export type SliderProps = {
  /** Current value */
  value?: number;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Size variant */
  size?: Size;
  /** Color appearance */
  appearance?: TextAppearance;
  /** Glow intensity */
  brightness?: Brightness;
  /** Whether the slider is disabled */
  disabled?: boolean;
  /** Whether the component is in loading state */
  loading?: boolean;
  /** Callback when value changes */
  onChange?: (value: number) => void;
  /** Additional style overrides */
  style?: ViewStyle;
};

/**
 * A range slider component with optional glow effect.
 *
 * @example Basic usage
 * ```tsx
 * <Slider value={50} onChange={setValue} />
 * ```
 *
 * @example With custom range
 * ```tsx
 * <Slider value={size} min={100} max={400} step={10} onChange={setSize} />
 * ```
 */
export function Slider({
  value = 50,
  min = 0,
  max = 100,
  step = 1,
  size = Size.Medium,
  appearance = TextAppearance.Primary,
  brightness = Brightness.None,
  disabled = false,
  loading: loadingProp = false,
  onChange,
  style,
}: SliderProps) {
  const parentLoading = useLoading();
  const loading = loadingProp || parentLoading;

  const { trackHeight, thumbSize } = SIZE_MAP[size];
  const progress = ((value - min) / (max - min)) * 100;
  const fillColor = APPEARANCE_COLORS[appearance];

  const brightnessMultiplier = getBrightnessMultiplier(brightness);
  const hasGlow = brightnessMultiplier > 0;

  // Loading state
  if (loading) {
    return (
      <Skeleton
        width="100%"
        height={thumbSize}
        borderRadius={trackHeight / 2}
        style={style}
      />
    );
  }

  // Handle native input change (web only)
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      const newValue = parseFloat(e.target.value);
      onChange?.(newValue);
    },
    [disabled, onChange]
  );

  const containerStyle: ViewStyle = {
    height: thumbSize,
    justifyContent: "center",
    opacity: disabled ? 0.5 : 1,
    ...style,
  };

  const trackStyle: ViewStyle = {
    height: trackHeight,
    borderRadius: trackHeight / 2,
    backgroundColor: Colors.background.overlay,
    overflow: "visible",
  };

  const fillStyle: ViewStyle = {
    position: "absolute",
    height: trackHeight,
    width: `${progress}%`,
    backgroundColor: fillColor,
    borderRadius: trackHeight / 2,
  };

  // Glow styles
  const glowOpacity = Shadow.glow.defaultOpacity * brightnessMultiplier;
  const glowBlur = Shadow.glow.blur * 0.5;

  const glowStyle: ViewStyle = {
    position: "absolute",
    top: trackHeight * 0.5,
    left: 0,
    height: trackHeight,
    width: `${progress}%`,
    backgroundColor: fillColor,
    borderRadius: trackHeight / 2,
    opacity: glowOpacity,
  };

  const webGlowStyle = Platform.OS === "web" ? {
    filter: `blur(${glowBlur}px)`,
  } : {};

  // Web uses native input[type="range"] for best UX
  if (Platform.OS === "web") {
    return (
      <View style={containerStyle}>
        <View style={styles.trackWrapper}>
          {/* Glow layer */}
          {hasGlow && progress > 0 && (
            <View style={[glowStyle, webGlowStyle as ViewStyle]} />
          )}
          {/* Track background */}
          <View style={trackStyle}>
            <View style={fillStyle} />
          </View>
          {/* Native range input overlay */}
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleChange}
            disabled={disabled}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: 0,
              cursor: disabled ? "not-allowed" : "pointer",
              margin: 0,
              padding: 0,
            }}
          />
          {/* Custom thumb */}
          <div
            style={{
              position: "absolute",
              left: `${progress}%`,
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: thumbSize,
              height: thumbSize,
              borderRadius: "50%",
              backgroundColor: fillColor,
              boxShadow: hasGlow
                ? `0 0 ${glowBlur * 2}px ${fillColor}${Math.round(glowOpacity * 255).toString(16).padStart(2, '0')}`
                : `0 2px 4px rgba(0, 0, 0, 0.3)`,
              pointerEvents: "none",
              border: `2px solid ${Colors.background.canvas}`,
            }}
          />
        </View>
      </View>
    );
  }

  // Native platforms would use a native slider implementation
  // For now, just render the visual track
  return (
    <View style={containerStyle}>
      <View style={styles.trackWrapper}>
        {hasGlow && progress > 0 && (
          <View style={glowStyle} />
        )}
        <View style={trackStyle}>
          <View style={fillStyle} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  trackWrapper: {
    position: "relative",
    flex: 1,
    justifyContent: "center",
  },
});
