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
import { Icon, type IconName } from "../icon/Icon";

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
  /** Icon to display on the left side of the label */
  iconLeft?: IconName;
  /** Icon to display on the right side of the label */
  iconRight?: IconName;
  /**
   * Background opacity (0-1). When set, creates a semi-transparent background
   * and uses the appearance's base color for text/icons instead of the default text color.
   * Useful for soft-colored buttons like trade indicators.
   */
  backgroundOpacity?: number;
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
/**
 * Converts a hex color to rgba with the specified opacity.
 */
function hexToRgba(hex: string, opacity: number): string {
  const normalized = hex.replace("#", "");
  const bigint = parseInt(normalized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export function Button({
  label,
  appearance = Appearance.Primary,
  size = Size.Medium,
  shape = Shape.Rounded,
  brightness = Brightness.Base,
  onPress,
  disabled = false,
  loading = false,
  iconLeft,
  iconRight,
  backgroundOpacity,
}: ButtonProps) {
  const brightnessMultiplier = getBrightnessMultiplier(brightness);
  const appearanceColors = getAppearanceColor(appearance, brightnessMultiplier);
  const sizeStyles = getSizeStyles(size);
  const borderRadius = getShapeRadius(shape);

  const fontSize = parseFloat(sizeStyles.fontSize) * 16;
  const paddingVertical = parseFloat(sizeStyles.paddingVertical) * 16;
  const paddingHorizontal = parseFloat(sizeStyles.paddingHorizontal) * 16;
  const parsedBorderRadius = parseFloat(borderRadius) || 9999;

  // When backgroundOpacity is set, use semi-transparent background with colored text
  const useTransparentStyle = backgroundOpacity !== undefined && backgroundOpacity < 1;
  const effectiveBackground = useTransparentStyle
    ? hexToRgba(appearanceColors.background, backgroundOpacity)
    : appearanceColors.background;
  const effectiveTextColor = useTransparentStyle
    ? appearanceColors.background // Use the appearance color as text color
    : appearanceColors.text;
  const effectiveBorderColor = useTransparentStyle
    ? "transparent"
    : appearanceColors.border;

  const hasIcon = iconLeft || iconRight;
  const containerStyle: ViewStyle = {
    flexDirection: hasIcon ? "row" : undefined,
    gap: hasIcon ? 6 : undefined,
    paddingVertical,
    paddingHorizontal,
    borderRadius: parsedBorderRadius,
    borderWidth: 1,
    borderColor: loading ? Colors.border.subtle : effectiveBorderColor,
    backgroundColor: loading ? Colors.background.raised : effectiveBackground,
    opacity: disabled ? 0.5 : 1,
    alignItems: "center",
    justifyContent: "center",
    // Spread cross-platform shadow styles (not for loading state, and disable for transparent style)
    ...(loading || useTransparentStyle ? {} : appearanceColors.shadow),
  };

  // Icon size based on button size
  const iconSize = size === Size.Large || size === Size.ExtraLarge
    ? Size.Small
    : size === Size.Medium
    ? Size.ExtraSmall
    : Size.TwoXSmall;

  const textStyle: TextStyle = {
    fontSize,
    fontWeight: Typography.fontWeight.medium as TextStyle["fontWeight"],
    lineHeight: fontSize * 1.5,
    color: effectiveTextColor,
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
      {iconLeft && <Icon name={iconLeft} size={iconSize} color={effectiveTextColor} />}
      <Text style={textStyle}>{label}</Text>
      {iconRight && <Icon name={iconRight} size={iconSize} color={effectiveTextColor} />}
    </Pressable>
  );
}
