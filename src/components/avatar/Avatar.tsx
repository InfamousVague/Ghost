import React from "react";
import {
  View,
  Image,
  StyleSheet,
  type ViewStyle,
  type ImageSourcePropType,
} from "react-native";
import { Size, TextAppearance } from "../../enums";
import { Colors } from "../../tokens";
import { Text } from "../text/Text";
import { Skeleton } from "../skeleton/Skeleton";
import { useLoading } from "../card/Card";

/**
 * Size to pixel mapping.
 */
const SIZE_MAP: Record<Size, { diameter: number; fontSize: Size }> = {
  [Size.TwoXSmall]: { diameter: 24, fontSize: Size.TwoXSmall },
  [Size.ExtraSmall]: { diameter: 28, fontSize: Size.ExtraSmall },
  [Size.Small]: { diameter: 32, fontSize: Size.Small },
  [Size.Medium]: { diameter: 40, fontSize: Size.Medium },
  [Size.Large]: { diameter: 48, fontSize: Size.Large },
  [Size.ExtraLarge]: { diameter: 56, fontSize: Size.ExtraLarge },
  [Size.TwoXLarge]: { diameter: 64, fontSize: Size.TwoXLarge },
};

/**
 * Status indicator colors.
 */
const STATUS_COLORS = {
  online: Colors.status.success,
  offline: Colors.text.muted,
  busy: Colors.status.danger,
  away: Colors.status.warning,
};

export type AvatarStatus = keyof typeof STATUS_COLORS;

/**
 * Props for the Avatar component.
 */
export type AvatarProps = {
  /** Image source */
  source?: ImageSourcePropType;
  /** Image URI (alternative to source) */
  uri?: string;
  /** Fallback initials when no image */
  initials?: string;
  /** Size variant */
  size?: Size;
  /** Status indicator */
  status?: AvatarStatus;
  /** Whether the component is in loading state */
  loading?: boolean;
  /** Additional style overrides */
  style?: ViewStyle;
};

/**
 * An avatar component with image and initials fallback.
 *
 * @example Basic usage
 * ```tsx
 * <Avatar uri="https://example.com/photo.jpg" />
 * ```
 *
 * @example With initials
 * ```tsx
 * <Avatar initials="TA" />
 * ```
 *
 * @example With status
 * ```tsx
 * <Avatar uri="..." status="online" />
 * ```
 */
export function Avatar({
  source,
  uri,
  initials,
  size = Size.Medium,
  status,
  loading: loadingProp = false,
  style,
}: AvatarProps) {
  const parentLoading = useLoading();
  const loading = loadingProp || parentLoading;

  const config = SIZE_MAP[size];
  const imageSource = source || (uri ? { uri } : undefined);

  // Loading state
  if (loading) {
    return (
      <Skeleton
        width={config.diameter}
        height={config.diameter}
        borderRadius={config.diameter / 2}
        style={style}
      />
    );
  }

  const containerStyle: ViewStyle = {
    width: config.diameter,
    height: config.diameter,
    borderRadius: config.diameter / 2,
    backgroundColor: Colors.background.overlay,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    ...style,
  };

  const statusSize = config.diameter * 0.25;
  const statusStyle: ViewStyle = {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: statusSize,
    height: statusSize,
    borderRadius: statusSize / 2,
    backgroundColor: status ? STATUS_COLORS[status] : "transparent",
    borderWidth: 2,
    borderColor: Colors.background.canvas,
  };

  return (
    <View style={{ position: "relative" }}>
      <View style={containerStyle}>
        {imageSource ? (
          <Image
            source={imageSource}
            style={styles.image}
            resizeMode="cover"
          />
        ) : initials ? (
          <Text
            size={config.fontSize}
            appearance={TextAppearance.Secondary}
            weight="semibold"
          >
            {initials.slice(0, 2).toUpperCase()}
          </Text>
        ) : null}
      </View>
      {status && <View style={statusStyle} />}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
});
