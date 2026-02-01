import { Pressable, Text, View, StyleSheet, type ViewStyle, type TextStyle } from "react-native";
import { Appearance, Brightness, Shape, Size } from "../../enums";
import {
  getAppearanceColor,
  getBrightnessMultiplier,
  getShapeRadius,
  getSizeStyles,
} from "../../helpers";
import { Typography, Colors } from "../../tokens";
import { Skeleton } from "../skeleton/Skeleton";

/**
 * Props for the Button component.
 */
export type ButtonProps = {
  /** The text label displayed inside the button */
  label: string;
  /** Visual appearance/color scheme of the button */
  appearance?: Appearance;
  /** Size variant affecting padding and font size */
  size?: Size;
  /** Border radius style */
  shape?: Shape;
  /** Glow/shadow intensity */
  brightness?: Brightness;
  /** Callback fired when the button is pressed */
  onPress?: () => void;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Whether the button is in loading state */
  loading?: boolean;
};

/**
 * A customizable button component built with React Native primitives.
 *
 * @remarks
 * The Button component supports multiple appearances, sizes, and shapes
 * through the Ghost design token system. It uses Pressable for cross-platform
 * touch handling and works on both web (via react-native-web) and native platforms.
 *
 * @example Basic usage
 * ```tsx
 * <Button label="Click me" onPress={() => console.log('Pressed!')} />
 * ```
 *
 * @example With appearance and size
 * ```tsx
 * <Button
 *   label="Submit"
 *   appearance={Appearance.Success}
 *   size={Size.Large}
 *   shape={Shape.Pill}
 * />
 * ```
 */
export function Button({
  label,
  appearance = Appearance.Primary,
  size = Size.Medium,
  shape = Shape.Rounded,
  brightness = Brightness.Base,
  onPress,
  disabled = false,
  loading = false,
}: ButtonProps) {
  const brightnessMultiplier = getBrightnessMultiplier(brightness);
  const appearanceColors = getAppearanceColor(appearance, brightnessMultiplier);
  const sizeStyles = getSizeStyles(size);
  const borderRadius = getShapeRadius(shape);

  const fontSize = parseFloat(sizeStyles.fontSize) * 16;
  const paddingVertical = parseFloat(sizeStyles.paddingVertical) * 16;
  const paddingHorizontal = parseFloat(sizeStyles.paddingHorizontal) * 16;
  const parsedBorderRadius = parseFloat(borderRadius) || 9999;

  const containerStyle: ViewStyle = {
    paddingVertical,
    paddingHorizontal,
    borderRadius: parsedBorderRadius,
    borderWidth: 1,
    borderColor: loading ? Colors.border.subtle : appearanceColors.border,
    backgroundColor: loading ? Colors.background.raised : appearanceColors.background,
    opacity: disabled ? 0.5 : 1,
    alignItems: "center",
    justifyContent: "center",
    // Spread cross-platform shadow styles (not for loading state)
    ...(loading ? {} : appearanceColors.shadow),
  };

  const textStyle: TextStyle = {
    fontSize,
    fontWeight: Typography.fontWeight.medium as TextStyle["fontWeight"],
    lineHeight: fontSize * 1.5,
    color: appearanceColors.text,
  };

  // Loading state - show full skeleton shape
  if (loading) {
    // Calculate the full button dimensions
    const buttonHeight = paddingVertical * 2 + fontSize * 1.5;
    const buttonWidth = paddingHorizontal * 2 + (label?.length || 8) * fontSize * 0.6;

    return (
      <Skeleton
        width={buttonWidth}
        height={buttonHeight}
        borderRadius={parsedBorderRadius}
      />
    );
  }

  return (
    <Pressable
      style={containerStyle}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
    >
      <Text style={textStyle}>{label}</Text>
    </Pressable>
  );
}
