import React from "react";
import { View, StyleSheet, type ViewStyle } from "react-native";
import { Size, TextAppearance } from "../../enums";
import { Colors } from "../../tokens";
import { Text } from "../text/Text";
import { Icon, type IconName } from "../icon/Icon";
import { Skeleton } from "../skeleton/Skeleton";
import { useLoading } from "../card/Card";

/**
 * Size configurations for the badge.
 */
const SIZE_MAP: Record<Size, { paddingH: number; paddingV: number; fontSize: Size; iconSize: number }> = {
  [Size.TwoXSmall]: { paddingH: 4, paddingV: 2, fontSize: Size.TwoXSmall, iconSize: 10 },
  [Size.ExtraSmall]: { paddingH: 6, paddingV: 2, fontSize: Size.TwoXSmall, iconSize: 10 },
  [Size.Small]: { paddingH: 8, paddingV: 3, fontSize: Size.ExtraSmall, iconSize: 12 },
  [Size.Medium]: { paddingH: 10, paddingV: 4, fontSize: Size.Small, iconSize: 14 },
  [Size.Large]: { paddingH: 12, paddingV: 5, fontSize: Size.Medium, iconSize: 16 },
  [Size.ExtraLarge]: { paddingH: 14, paddingV: 6, fontSize: Size.Large, iconSize: 18 },
  [Size.TwoXLarge]: { paddingH: 16, paddingV: 7, fontSize: Size.ExtraLarge, iconSize: 20 },
};

/**
 * Badge variants with their color configurations.
 */
const VARIANT_COLORS = {
  default: {
    background: Colors.background.overlay,
    text: Colors.text.primary,
  },
  primary: {
    background: Colors.accent.primary,
    text: "#FFFFFF",
  },
  success: {
    background: Colors.status.successSurface,
    text: Colors.status.success,
  },
  warning: {
    background: Colors.status.warningSurface,
    text: Colors.status.warning,
  },
  danger: {
    background: Colors.status.dangerSurface,
    text: Colors.status.danger,
  },
  info: {
    background: Colors.status.infoSurface,
    text: Colors.status.info,
  },
  outline: {
    background: "transparent",
    text: Colors.text.secondary,
    border: Colors.border.subtle,
  },
};

export type BadgeVariant = keyof typeof VARIANT_COLORS;

/**
 * Props for the Badge component.
 */
export type BadgeProps = {
  /** Badge text content */
  label: string;
  /** Visual variant */
  variant?: BadgeVariant;
  /** Size variant */
  size?: Size;
  /** Icon to display before the label */
  icon?: IconName;
  /** Whether to show as a dot (no text) */
  dot?: boolean;
  /** Whether the component is in loading state */
  loading?: boolean;
  /** Additional style overrides */
  style?: ViewStyle;
};

/**
 * A badge component for labels, statuses, and counts.
 *
 * @example Basic usage
 * ```tsx
 * <Badge label="New" variant="primary" />
 * ```
 *
 * @example With icon
 * ```tsx
 * <Badge label="Verified" icon="check" variant="success" />
 * ```
 *
 * @example Status dot
 * ```tsx
 * <Badge dot variant="danger" />
 * ```
 */
export function Badge({
  label,
  variant = "default",
  size = Size.Small,
  icon,
  dot = false,
  loading: loadingProp = false,
  style,
}: BadgeProps) {
  const parentLoading = useLoading();
  const loading = loadingProp || parentLoading;

  const sizeConfig = SIZE_MAP[size];
  const colors = VARIANT_COLORS[variant];

  // Loading state
  if (loading) {
    if (dot) {
      return (
        <Skeleton
          width={8}
          height={8}
          borderRadius={4}
          style={style}
        />
      );
    }
    return (
      <Skeleton
        width={sizeConfig.paddingH * 2 + (label?.length || 4) * 6}
        height={sizeConfig.paddingV * 2 + 16}
        borderRadius={sizeConfig.paddingV * 2 + 8}
        style={style}
      />
    );
  }

  // Dot variant
  if (dot) {
    return (
      <View
        style={[
          {
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: colors.text,
          },
          style,
        ]}
      />
    );
  }

  const containerStyle: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: sizeConfig.paddingH,
    paddingVertical: sizeConfig.paddingV,
    borderRadius: 100,
    backgroundColor: colors.background,
    gap: 4,
    ...((colors as any).border && {
      borderWidth: 1,
      borderColor: (colors as any).border,
    }),
    ...style,
  };

  return (
    <View style={containerStyle}>
      {icon && (
        <Icon
          name={icon}
          customSize={sizeConfig.iconSize}
          color={colors.text}
        />
      )}
      <Text
        size={sizeConfig.fontSize}
        weight="medium"
        style={{ color: colors.text }}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
