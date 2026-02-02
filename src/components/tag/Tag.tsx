import React from "react";
import { View, StyleSheet, type ViewStyle } from "react-native";
import { Intensity, Size } from "../../enums";
import { Colors } from "../../tokens";
import { Text } from "../text/Text";
import { Icon, type IconName } from "../icon/Icon";
import { Skeleton } from "../skeleton/Skeleton";
import { useLoading } from "../card/Card";

/**
 * Tag direction variants.
 */
export type TagDirection = "up" | "down" | "neutral";

/**
 * Size configurations for the tag.
 * Matches the original trade badge styling.
 */
const SIZE_MAP: Record<
  Size,
  { paddingH: number; paddingV: number; fontSize: Size; iconSize: number; gap: number; borderRadius: number }
> = {
  [Size.TwoXSmall]: { paddingH: 8, paddingV: 3, fontSize: Size.TwoXSmall, iconSize: 10, gap: 4, borderRadius: 4 },
  [Size.ExtraSmall]: { paddingH: 8, paddingV: 3, fontSize: Size.TwoXSmall, iconSize: 10, gap: 4, borderRadius: 4 },
  [Size.Small]: { paddingH: 10, paddingV: 4, fontSize: Size.ExtraSmall, iconSize: 12, gap: 4, borderRadius: 4 },
  [Size.Medium]: { paddingH: 12, paddingV: 5, fontSize: Size.Small, iconSize: 14, gap: 4, borderRadius: 6 },
  [Size.Large]: { paddingH: 14, paddingV: 6, fontSize: Size.Medium, iconSize: 16, gap: 4, borderRadius: 6 },
  [Size.ExtraLarge]: { paddingH: 16, paddingV: 7, fontSize: Size.Large, iconSize: 18, gap: 5, borderRadius: 8 },
  [Size.TwoXLarge]: { paddingH: 18, paddingV: 8, fontSize: Size.ExtraLarge, iconSize: 20, gap: 5, borderRadius: 8 },
};

/**
 * Direction color configurations.
 * Matches the original trade badge colors exactly.
 */
const DIRECTION_COLORS = {
  up: {
    normal: {
      background: "rgba(47, 213, 117, 0.15)",
      text: "#2FD575",
      icon: "#2FD575",
    },
    dim: {
      background: "rgba(47, 213, 117, 0.15)",
      text: "#2FD575",
      icon: "#2FD575",
    },
  },
  down: {
    normal: {
      background: "rgba(255, 92, 122, 0.15)",
      text: "#FF5C7A",
      icon: "#FF5C7A",
    },
    dim: {
      background: "rgba(255, 92, 122, 0.15)",
      text: "#FF5C7A",
      icon: "#FF5C7A",
    },
  },
  neutral: {
    normal: {
      background: Colors.background.overlay,
      text: Colors.text.secondary,
      icon: Colors.text.muted,
    },
    dim: {
      background: Colors.background.raised,
      text: Colors.text.muted,
      icon: Colors.text.muted,
    },
  },
};

/**
 * Icon mapping for each direction.
 * Uses arrow icons to match original trade badge styling.
 */
const DIRECTION_ICONS: Record<TagDirection, IconName> = {
  up: "arrow-up",
  down: "arrow-down",
  neutral: "minus",
};

/**
 * Props for the Tag component.
 */
export type TagProps = {
  /** Direction indicator (up/down/neutral) */
  direction: TagDirection;
  /** Optional label text (e.g., "BUY", "SELL") */
  label?: string;
  /** Whether to show the direction icon */
  showIcon?: boolean;
  /** Color intensity - dim for subtle indicators, normal for emphasis */
  intensity?: Intensity;
  /** Size variant */
  size?: Size;
  /** Whether the component is in loading state */
  loading?: boolean;
  /** Additional style overrides */
  style?: ViewStyle;
};

/**
 * A directional indicator tag component for buy/sell signals.
 *
 * @remarks
 * Tag displays directional indicators with optional labels.
 * Uses dim intensity colors by default for subtle UI integration.
 * Perfect for trade direction indicators, price change badges, etc.
 *
 * @example Basic usage
 * ```tsx
 * <Tag direction="up" label="BUY" />
 * <Tag direction="down" label="SELL" />
 * ```
 *
 * @example Icon only
 * ```tsx
 * <Tag direction="up" />
 * ```
 *
 * @example Normal intensity
 * ```tsx
 * <Tag direction="up" label="LONG" intensity={Intensity.Normal} />
 * ```
 */
export function Tag({
  direction,
  label,
  showIcon = true,
  intensity = Intensity.Dim,
  size = Size.Small,
  loading: loadingProp = false,
  style,
}: TagProps) {
  const parentLoading = useLoading();
  const loading = loadingProp || parentLoading;

  const sizeConfig = SIZE_MAP[size];
  const intensityKey = intensity === Intensity.Dim ? "dim" : "normal";
  const colors = DIRECTION_COLORS[direction][intensityKey];
  const iconName = DIRECTION_ICONS[direction];

  // Loading state
  if (loading) {
    const estimatedWidth = showIcon && label
      ? sizeConfig.paddingH * 2 + sizeConfig.iconSize + sizeConfig.gap + (label.length * 6)
      : showIcon
        ? sizeConfig.paddingH * 2 + sizeConfig.iconSize
        : sizeConfig.paddingH * 2 + ((label?.length || 4) * 6);

    return (
      <Skeleton
        width={estimatedWidth}
        height={sizeConfig.paddingV * 2 + 16}
        borderRadius={sizeConfig.borderRadius}
        style={style}
      />
    );
  }

  const containerStyle: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: sizeConfig.paddingH,
    paddingVertical: sizeConfig.paddingV,
    borderRadius: sizeConfig.borderRadius,
    backgroundColor: colors.background,
    gap: sizeConfig.gap,
    ...style,
  };

  return (
    <View style={containerStyle}>
      {showIcon && (
        <Icon
          name={iconName}
          customSize={sizeConfig.iconSize}
          color={colors.icon}
        />
      )}
      {label && (
        <Text
          size={sizeConfig.fontSize}
          weight="semibold"
          style={{ color: colors.text }}
        >
          {label}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
