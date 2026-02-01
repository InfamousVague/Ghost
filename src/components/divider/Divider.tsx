import React from "react";
import { View, StyleSheet, type ViewStyle } from "react-native";
import { Size, TextAppearance } from "../../enums";
import { Colors } from "../../tokens";
import { Text } from "../text/Text";
import { Skeleton } from "../skeleton/Skeleton";
import { useLoading } from "../card/Card";

/**
 * Size to thickness mapping.
 */
const SIZE_MAP: Record<Size, number> = {
  [Size.TwoXSmall]: 0.5,
  [Size.ExtraSmall]: 0.5,
  [Size.Small]: 1,
  [Size.Medium]: 1,
  [Size.Large]: 1.5,
  [Size.ExtraLarge]: 2,
  [Size.TwoXLarge]: 2,
};

/**
 * Props for the Divider component.
 */
export type DividerProps = {
  /** Orientation of the divider */
  orientation?: "horizontal" | "vertical";
  /** Size/thickness variant */
  size?: Size;
  /** Optional label text */
  label?: string;
  /** Divider color */
  color?: string;
  /** Whether the component is in loading state */
  loading?: boolean;
  /** Spacing around the divider */
  spacing?: number;
  /** Additional style overrides */
  style?: ViewStyle;
};

/**
 * A divider component for separating content.
 *
 * @example Basic horizontal divider
 * ```tsx
 * <Divider />
 * ```
 *
 * @example With label
 * ```tsx
 * <Divider label="OR" />
 * ```
 *
 * @example Vertical divider
 * ```tsx
 * <View style={{ flexDirection: 'row' }}>
 *   <Text>Left</Text>
 *   <Divider orientation="vertical" />
 *   <Text>Right</Text>
 * </View>
 * ```
 */
export function Divider({
  orientation = "horizontal",
  size = Size.Small,
  label,
  color = Colors.border.subtle,
  loading: loadingProp = false,
  spacing = 0,
  style,
}: DividerProps) {
  const parentLoading = useLoading();
  const loading = loadingProp || parentLoading;

  const thickness = SIZE_MAP[size];
  const isHorizontal = orientation === "horizontal";

  // Loading state
  if (loading) {
    const marginStyle = isHorizontal
      ? { marginVertical: spacing }
      : { marginHorizontal: spacing };
    return (
      <Skeleton
        width={isHorizontal ? "100%" as any : thickness}
        height={isHorizontal ? thickness : 40}
        borderRadius={thickness / 2}
        style={{ ...marginStyle, ...style } as ViewStyle}
      />
    );
  }

  // Simple divider without label
  if (!label) {
    return (
      <View
        style={[
          {
            backgroundColor: color,
            ...(isHorizontal
              ? { height: thickness, width: "100%", marginVertical: spacing }
              : { width: thickness, height: "100%", marginHorizontal: spacing }),
          },
          style,
        ]}
      />
    );
  }

  // Divider with label (horizontal only)
  return (
    <View
      style={[
        styles.labelContainer,
        { marginVertical: spacing },
        style,
      ]}
    >
      <View
        style={[
          styles.line,
          { height: thickness, backgroundColor: color },
        ]}
      />
      <Text
        size={Size.ExtraSmall}
        appearance={TextAppearance.Muted}
        style={styles.label}
      >
        {label}
      </Text>
      <View
        style={[
          styles.line,
          { height: thickness, backgroundColor: color },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  line: {
    flex: 1,
  },
  label: {
    paddingHorizontal: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
