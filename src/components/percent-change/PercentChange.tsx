import React from "react";
import { View, StyleSheet, type ViewStyle } from "react-native";
import { Size, TextAppearance } from "../../enums";
import { Number, type NumberFormat } from "../number/Number";
import { Icon } from "../icon/Icon";
import { useLoading } from "../card/Card";
import { Skeleton } from "../skeleton/Skeleton";

/**
 * Props for the PercentChange component.
 */
export type PercentChangeProps = {
  /** The percent change value (e.g., 2.45 for +2.45%, -1.23 for -1.23%) */
  value: number;
  /** Number of decimal places (defaults to 2) */
  decimals?: number;
  /** Size of the component */
  size?: Size;
  /** Font weight */
  weight?: "regular" | "medium" | "semibold" | "bold";
  /** Whether to show the arrow icon (defaults to true) */
  showArrow?: boolean;
  /** Whether to show the % suffix (defaults to true) */
  showPercent?: boolean;
  /** Whether the component is in loading state */
  loading?: boolean;
  /** Additional style overrides */
  style?: ViewStyle;
};

/**
 * Icon size mapping - arrows should be slightly smaller than text
 */
const ICON_SIZE_MAP: Record<Size, Size> = {
  [Size.TwoXSmall]: Size.TwoXSmall,
  [Size.ExtraSmall]: Size.TwoXSmall,
  [Size.Small]: Size.ExtraSmall,
  [Size.Medium]: Size.Small,
  [Size.Large]: Size.Medium,
  [Size.ExtraLarge]: Size.Large,
  [Size.TwoXLarge]: Size.ExtraLarge,
};

/**
 * A component for displaying percent changes with colored arrows.
 *
 * @remarks
 * The PercentChange component automatically:
 * - Shows green color and up arrow for positive values
 * - Shows red color and down arrow for negative values
 * - Handles zero as neutral (no arrow by default)
 *
 * @example Basic usage
 * ```tsx
 * <PercentChange value={2.45} />
 * // Renders: ↑ 2.45% (in green)
 * ```
 *
 * @example Negative value
 * ```tsx
 * <PercentChange value={-1.23} />
 * // Renders: ↓ 1.23% (in red)
 * ```
 *
 * @example Without arrow
 * ```tsx
 * <PercentChange value={2.45} showArrow={false} />
 * // Renders: +2.45% (in green)
 * ```
 */
export function PercentChange({
  value,
  decimals = 2,
  size = Size.Small,
  weight = "medium",
  showArrow = true,
  showPercent = true,
  loading: loadingProp = false,
  style,
}: PercentChangeProps) {
  const parentLoading = useLoading();
  const loading = loadingProp || parentLoading;

  const isPositive = value > 0;
  const isNegative = value < 0;
  const appearance = isPositive
    ? TextAppearance.Success
    : isNegative
      ? TextAppearance.Danger
      : TextAppearance.Muted;

  const iconSize = ICON_SIZE_MAP[size];

  // Loading state
  if (loading) {
    return (
      <View style={[styles.container, style]}>
        <Skeleton width={60} height={14} borderRadius={4} />
      </View>
    );
  }

  const format: NumberFormat = {
    decimals,
    suffix: showPercent ? "%" : undefined,
  };

  return (
    <View style={[styles.container, style]}>
      {showArrow && (isPositive || isNegative) && (
        <Icon
          name={isPositive ? "arrow-up" : "arrow-down"}
          size={iconSize}
          appearance={appearance}
        />
      )}
      <Number
        value={Math.abs(value)}
        format={format}
        appearance={appearance}
        size={size}
        weight={weight}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
});
