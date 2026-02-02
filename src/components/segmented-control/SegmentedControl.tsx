import React from "react";
import { View, Pressable, StyleSheet, type ViewStyle } from "react-native";
import { Size, TextAppearance } from "../../enums";
import { Text } from "../text/Text";
import { Icon, type IconName } from "../icon/Icon";
import { Skeleton } from "../skeleton/Skeleton";
import { useLoading } from "../card/Card";
import { useThemeColors } from "../../context/ThemeContext";

/**
 * A single segment option.
 */
export type SegmentOption<T extends string = string> = {
  /** Unique value for this segment */
  value: T;
  /** Display label */
  label: string;
  /** Optional icon to show before label */
  icon?: IconName;
};

/**
 * Props for the SegmentedControl component.
 */
export type SegmentedControlProps<T extends string = string> = {
  /** Available options */
  options: SegmentOption<T>[];
  /** Currently selected value */
  value: T;
  /** Callback when selection changes */
  onChange: (value: T) => void;
  /** Size variant */
  size?: Size;
  /** Whether the control is disabled */
  disabled?: boolean;
  /** Whether the component is in loading state */
  loading?: boolean;
  /** Additional style overrides */
  style?: ViewStyle;
};

/**
 * Size to style mapping.
 */
/**
 * Size to style mapping.
 * Heights are designed to match Select and FilterChip components:
 * TwoXSmall: 24px, ExtraSmall: 28px, Small: 32px, Medium: 36px, Large: 40px, etc.
 */
const SIZE_MAP: Record<Size, {
  height: number;
  padding: number;
  paddingHorizontal: number;
  gap: number;
  fontSize: Size;
  iconSize: Size;
  borderRadius: number;
  innerRadius: number;
}> = {
  [Size.TwoXSmall]: { height: 24, padding: 2, paddingHorizontal: 6, gap: 4, fontSize: Size.TwoXSmall, iconSize: Size.TwoXSmall, borderRadius: 6, innerRadius: 4 },
  [Size.ExtraSmall]: { height: 28, padding: 2, paddingHorizontal: 8, gap: 4, fontSize: Size.TwoXSmall, iconSize: Size.ExtraSmall, borderRadius: 8, innerRadius: 5 },
  [Size.Small]: { height: 32, padding: 3, paddingHorizontal: 10, gap: 6, fontSize: Size.ExtraSmall, iconSize: Size.ExtraSmall, borderRadius: 8, innerRadius: 5 },
  [Size.Medium]: { height: 36, padding: 3, paddingHorizontal: 12, gap: 6, fontSize: Size.ExtraSmall, iconSize: Size.Small, borderRadius: 10, innerRadius: 6 },
  [Size.Large]: { height: 40, padding: 4, paddingHorizontal: 14, gap: 8, fontSize: Size.Small, iconSize: Size.Small, borderRadius: 12, innerRadius: 8 },
  [Size.ExtraLarge]: { height: 44, padding: 4, paddingHorizontal: 16, gap: 8, fontSize: Size.Medium, iconSize: Size.Medium, borderRadius: 14, innerRadius: 10 },
  [Size.TwoXLarge]: { height: 48, padding: 5, paddingHorizontal: 20, gap: 10, fontSize: Size.Large, iconSize: Size.Medium, borderRadius: 16, innerRadius: 12 },
};

/**
 * A segmented control for switching between mutually exclusive options.
 *
 * @remarks
 * SegmentedControl provides a horizontal set of segments, each of which
 * functions as a mutually exclusive button. It's commonly used for switching
 * between different views or filtering content.
 *
 * @example Basic usage
 * ```tsx
 * const [view, setView] = useState<'list' | 'grid'>('list');
 *
 * <SegmentedControl
 *   options={[
 *     { value: 'list', label: 'List', icon: 'list' },
 *     { value: 'grid', label: 'Grid', icon: 'grid' },
 *   ]}
 *   value={view}
 *   onChange={setView}
 * />
 * ```
 *
 * @example Without icons
 * ```tsx
 * <SegmentedControl
 *   options={[
 *     { value: 'day', label: 'Day' },
 *     { value: 'week', label: 'Week' },
 *     { value: 'month', label: 'Month' },
 *   ]}
 *   value={period}
 *   onChange={setPeriod}
 * />
 * ```
 */
export function SegmentedControl<T extends string = string>({
  options,
  value,
  onChange,
  size = Size.Medium,
  disabled = false,
  loading: loadingProp = false,
  style,
}: SegmentedControlProps<T>) {
  const parentLoading = useLoading();
  const loading = loadingProp || parentLoading;
  const themeColors = useThemeColors();

  const sizeStyles = SIZE_MAP[size];

  // Loading state
  if (loading) {
    const skeletonWidth = options.length * 80;
    return (
      <Skeleton
        width={skeletonWidth}
        height={sizeStyles.padding * 2 + 32}
        borderRadius={sizeStyles.borderRadius}
        style={style}
      />
    );
  }

  const containerStyle: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    height: sizeStyles.height,
    backgroundColor: themeColors.background.surface,
    borderRadius: sizeStyles.borderRadius,
    padding: sizeStyles.padding,
    gap: sizeStyles.padding,
    borderWidth: 1,
    borderColor: themeColors.border.subtle,
    opacity: disabled ? 0.5 : 1,
    ...style,
  };

  return (
    <View style={containerStyle}>
      {options.map((option) => {
        const isSelected = option.value === value;

        return (
          <Pressable
            key={option.value}
            onPress={() => !disabled && onChange(option.value)}
            style={[
              styles.segment,
              {
                flex: 1,
                height: sizeStyles.height - (sizeStyles.padding * 2),
                backgroundColor: isSelected ? themeColors.background.raised : "transparent",
                paddingHorizontal: sizeStyles.paddingHorizontal,
                borderRadius: sizeStyles.innerRadius,
                gap: sizeStyles.gap,
              },
            ]}
            disabled={disabled}
          >
            {option.icon && (
              <Icon
                name={option.icon}
                size={sizeStyles.iconSize}
                appearance={isSelected ? TextAppearance.Secondary : TextAppearance.Muted}
              />
            )}
            <Text
              size={sizeStyles.fontSize}
              weight={isSelected ? "semibold" : "regular"}
              appearance={isSelected ? TextAppearance.Secondary : TextAppearance.Muted}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  segment: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
