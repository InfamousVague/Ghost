import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Platform,
  type ViewStyle,
  type TextStyle,
  type TextInputProps,
} from "react-native";
import { Size, Shape, TextAppearance } from "../../enums";
import { getShapeRadius } from "../../helpers";
import { Colors, Typography } from "../../tokens";
import { Icon, type IconName } from "../icon/Icon";
import { Skeleton } from "../skeleton/Skeleton";
import { useLoading } from "../card/Card";

/**
 * Size to style mapping for inputs.
 */
const SIZE_MAP: Record<Size, { height: number; fontSize: number; padding: number; iconSize: Size }> = {
  [Size.TwoXSmall]: { height: 28, fontSize: 12, padding: 8, iconSize: Size.TwoXSmall },
  [Size.ExtraSmall]: { height: 32, fontSize: 13, padding: 10, iconSize: Size.ExtraSmall },
  [Size.Small]: { height: 36, fontSize: 14, padding: 12, iconSize: Size.Small },
  [Size.Medium]: { height: 40, fontSize: 14, padding: 12, iconSize: Size.Small },
  [Size.Large]: { height: 44, fontSize: 16, padding: 14, iconSize: Size.Medium },
  [Size.ExtraLarge]: { height: 48, fontSize: 16, padding: 16, iconSize: Size.Medium },
  [Size.TwoXLarge]: { height: 52, fontSize: 18, padding: 16, iconSize: Size.Large },
};

/**
 * Props for the Input component.
 */
export type InputProps = {
  /** Input value */
  value?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Leading icon name */
  leadingIcon?: IconName;
  /** Trailing icon name */
  trailingIcon?: IconName;
  /** Size variant */
  size?: Size;
  /** Border radius style */
  shape?: Shape;
  /** Whether the input has an error */
  error?: boolean;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether the component is in loading state */
  loading?: boolean;
  /** Callback when value changes */
  onChangeText?: (text: string) => void;
  /** Callback when trailing icon is pressed */
  onTrailingIconPress?: () => void;
  /** Additional container style overrides */
  style?: ViewStyle;
} & Omit<TextInputProps, "style" | "placeholderTextColor">;

/**
 * A text input component with icon support.
 *
 * @example Basic usage
 * ```tsx
 * <Input placeholder="Enter text..." />
 * ```
 *
 * @example With icons
 * ```tsx
 * <Input
 *   placeholder="Search..."
 *   leadingIcon="search"
 *   value={search}
 *   onChangeText={setSearch}
 * />
 * ```
 */
export function Input({
  value,
  placeholder,
  leadingIcon,
  trailingIcon,
  size = Size.Medium,
  shape = Shape.Rounded,
  error = false,
  disabled = false,
  loading: loadingProp = false,
  onChangeText,
  onTrailingIconPress,
  style,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const parentLoading = useLoading();
  const loading = loadingProp || parentLoading;

  const sizeStyles = SIZE_MAP[size];
  const borderRadius = parseFloat(getShapeRadius(shape)) || 8;

  // Determine border color based on state
  const borderColor = error
    ? Colors.status.danger
    : isFocused
    ? Colors.border.focus
    : Colors.border.subtle;

  const containerStyle: ViewStyle = {
    height: sizeStyles.height,
    borderRadius,
    borderWidth: 1,
    borderColor: borderColor as string,
    backgroundColor: Colors.background.surface,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: sizeStyles.padding,
    gap: 8,
    opacity: disabled ? 0.5 : 1,
    ...style,
  };

  const inputStyle: TextStyle = {
    flex: 1,
    fontSize: sizeStyles.fontSize,
    fontFamily: Typography.fontFamily.base,
    color: Colors.text.primary,
    padding: 0,
    margin: 0,
    // Web-specific styles
    ...(Platform.OS === "web" && {
      outlineStyle: "none",
    } as any),
  };

  // Loading state - show full skeleton shape
  if (loading) {
    return (
      <Skeleton
        width="100%"
        height={sizeStyles.height}
        borderRadius={borderRadius}
        style={style}
      />
    );
  }

  return (
    <View style={containerStyle}>
      {leadingIcon && (
        <Icon
          name={leadingIcon}
          size={sizeStyles.iconSize}
          appearance={TextAppearance.Muted}
        />
      )}
      <TextInput
        value={value}
        placeholder={placeholder}
        placeholderTextColor={Colors.text.muted}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        editable={!disabled}
        style={inputStyle}
        {...props}
      />
      {trailingIcon && (
        <Icon
          name={trailingIcon}
          size={sizeStyles.iconSize}
          appearance={TextAppearance.Muted}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
