import React from "react";
import {
  View,
  Text as RNText,
  Pressable,
  StyleSheet,
  type ViewStyle,
} from "react-native";
import { Size, TextAppearance } from "../../enums";
import { Typography } from "../../tokens";
import { useThemeColors } from "../../context/ThemeContext";
import { Icon, type IconName } from "../icon/Icon";

/**
 * Props for the FilterChip component.
 */
export type FilterChipProps = {
  /** Label text */
  label: string;
  /** Whether the chip is selected/active */
  selected?: boolean;
  /** Called when chip is pressed */
  onPress?: () => void;
  /** Called when remove button is pressed (shows X when provided) */
  onRemove?: () => void;
  /** Optional icon */
  icon?: IconName;
  /** Size variant */
  size?: Size;
  /** Whether the chip is disabled */
  disabled?: boolean;
  /** Additional style */
  style?: ViewStyle;
};

/**
 * Size configuration mapping.
 */
const SIZE_MAP: Record<Size, { height: number; fontSize: number; padding: number; iconSize: number }> = {
  [Size.TwoXSmall]: { height: 24, fontSize: 10, padding: 8, iconSize: 10 },
  [Size.ExtraSmall]: { height: 28, fontSize: 11, padding: 10, iconSize: 12 },
  [Size.Small]: { height: 32, fontSize: 12, padding: 12, iconSize: 14 },
  [Size.Medium]: { height: 36, fontSize: 13, padding: 14, iconSize: 14 },
  [Size.Large]: { height: 40, fontSize: 14, padding: 16, iconSize: 16 },
  [Size.ExtraLarge]: { height: 44, fontSize: 15, padding: 18, iconSize: 16 },
  [Size.TwoXLarge]: { height: 48, fontSize: 16, padding: 20, iconSize: 18 },
};

/**
 * A filter chip component for displaying filter options.
 */
export function FilterChip({
  label,
  selected = false,
  onPress,
  onRemove,
  icon,
  size = Size.Small,
  disabled = false,
  style,
}: FilterChipProps) {
  const themeColors = useThemeColors();
  const sizeConfig = SIZE_MAP[size];

  const containerStyle: ViewStyle = {
    height: sizeConfig.height,
    paddingHorizontal: sizeConfig.padding,
    backgroundColor: selected
      ? themeColors.accent.secondary
      : themeColors.background.raised,
    borderWidth: 1,
    borderColor: selected
      ? themeColors.accent.primary
      : themeColors.border.subtle,
    borderRadius: sizeConfig.height / 2,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    opacity: disabled ? 0.5 : 1,
  };

  const textColor = selected
    ? themeColors.accent.primary
    : themeColors.text.secondary;

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      style={({ pressed }) => [
        containerStyle,
        pressed && !disabled && { opacity: 0.8 },
        style,
      ]}
    >
      {icon && (
        <Icon
          name={icon}
          size={Size.ExtraSmall}
          appearance={selected ? TextAppearance.Link : TextAppearance.Muted}
        />
      )}
      <RNText
        style={[
          styles.label,
          {
            fontSize: sizeConfig.fontSize,
            color: textColor,
          },
        ]}
        numberOfLines={1}
      >
        {label}
      </RNText>
      {onRemove && (
        <Pressable
          onPress={disabled ? undefined : onRemove}
          hitSlop={8}
          style={styles.removeButton}
        >
          <Icon
            name="close"
            size={Size.TwoXSmall}
            appearance={selected ? TextAppearance.Link : TextAppearance.Muted}
          />
        </Pressable>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  label: {
    fontFamily: Typography.fontFamily.base,
    fontWeight: "500",
  },
  removeButton: {
    marginLeft: 2,
  },
});
