import React, { useRef, useEffect } from "react";
import {
  View,
  Pressable,
  Animated,
  StyleSheet,
  Platform,
  type ViewStyle,
} from "react-native";
import { Size, TextAppearance } from "../../enums";
import { Skeleton } from "../skeleton/Skeleton";
import { useLoading } from "../card/Card";
import { useThemeColors } from "../../context/ThemeContext";
import { Icon, type IconName } from "../icon/Icon";
import { Text } from "../text/Text";

/**
 * Size configurations for the toggle.
 */
const SIZE_MAP: Record<Size, { width: number; height: number; knobSize: number; iconSize: number }> = {
  [Size.TwoXSmall]: { width: 28, height: 16, knobSize: 12, iconSize: 10 },
  [Size.ExtraSmall]: { width: 32, height: 18, knobSize: 14, iconSize: 12 },
  [Size.Small]: { width: 36, height: 20, knobSize: 16, iconSize: 12 },
  [Size.Medium]: { width: 44, height: 24, knobSize: 20, iconSize: 14 },
  [Size.Large]: { width: 52, height: 28, knobSize: 24, iconSize: 16 },
  [Size.ExtraLarge]: { width: 60, height: 32, knobSize: 28, iconSize: 18 },
  [Size.TwoXLarge]: { width: 68, height: 36, knobSize: 32, iconSize: 20 },
};

/**
 * Props for the Toggle component.
 */
export type ToggleProps = {
  /** Whether the toggle is on */
  value?: boolean;
  /** Callback when the toggle changes */
  onValueChange?: (value: boolean) => void;
  /** Size variant */
  size?: Size;
  /** Whether the toggle is disabled */
  disabled?: boolean;
  /** Whether the component is in loading state */
  loading?: boolean;
  /** Icon to show on the left (off) side */
  leftIcon?: IconName;
  /** Icon to show on the right (on) side */
  rightIcon?: IconName;
  /** Label to show on the left side */
  leftLabel?: string;
  /** Label to show on the right side */
  rightLabel?: string;
  /** Additional style overrides */
  style?: ViewStyle;
};

/**
 * A toggle switch component with optional icons and labels.
 *
 * @example Basic usage
 * ```tsx
 * <Toggle value={isOn} onValueChange={setIsOn} />
 * ```
 *
 * @example With icons for light/dark mode
 * ```tsx
 * <Toggle
 *   value={isDarkMode}
 *   onValueChange={setIsDarkMode}
 *   leftIcon="sun"
 *   rightIcon="moon"
 * />
 * ```
 *
 * @example With labels
 * ```tsx
 * <Toggle
 *   value={isOn}
 *   onValueChange={setIsOn}
 *   leftLabel="Off"
 *   rightLabel="On"
 * />
 * ```
 */
export function Toggle({
  value = false,
  onValueChange,
  size = Size.Medium,
  disabled = false,
  loading: loadingProp = false,
  leftIcon,
  rightIcon,
  leftLabel,
  rightLabel,
  style,
}: ToggleProps) {
  const parentLoading = useLoading();
  const loading = loadingProp || parentLoading;
  const themeColors = useThemeColors();

  const translateAnim = useRef(new Animated.Value(value ? 1 : 0)).current;

  const sizeConfig = SIZE_MAP[size];
  const hasIcons = leftIcon || rightIcon;
  const hasLabels = leftLabel || rightLabel;

  // Calculate expanded width when icons or labels are present
  // The icon needs to fit in the exposed area when the knob is on the opposite side
  // Available space in base toggle = (width - knobSize - padding*2) which may be tight
  // Add just enough to comfortably fit the icon with minimal padding
  const iconPadding = 4; // padding on each side of icon
  const availableSpace = sizeConfig.width - sizeConfig.knobSize - 4; // base available space
  const neededSpace = sizeConfig.iconSize + iconPadding * 2;
  const iconSpace = hasIcons ? Math.max(0, neededSpace - availableSpace) : 0;
  const labelSpace = hasLabels ? 20 : 0; // Approximate label space
  const expandedWidth = sizeConfig.width + Math.max(iconSpace, labelSpace);

  const knobPadding = 2;
  const translateDistance = expandedWidth - sizeConfig.knobSize - knobPadding * 2;

  useEffect(() => {
    Animated.timing(translateAnim, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: Platform.OS !== "web",
    }).start();
  }, [value, translateAnim]);

  const handlePress = () => {
    if (!disabled && onValueChange) {
      onValueChange(!value);
    }
  };

  // Loading state
  if (loading) {
    return (
      <Skeleton
        width={expandedWidth}
        height={sizeConfig.height}
        borderRadius={sizeConfig.height / 2}
        style={style}
      />
    );
  }

  const knobTranslate = translateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [knobPadding, translateDistance + knobPadding],
  });

  const trackColor = translateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [themeColors.background.overlay, themeColors.accent.primary],
  });

  // Opacity animations for icons/labels
  // When OFF (0): left is covered (dim), right is exposed (bright)
  // When ON (1): left is exposed (bright), right is covered (dim)
  const leftOpacity = translateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  const rightOpacity = translateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.3],
  });

  const containerStyle: ViewStyle = {
    width: expandedWidth,
    height: sizeConfig.height,
    borderRadius: sizeConfig.height / 2,
    justifyContent: "center",
    opacity: disabled ? 0.5 : 1,
    ...style,
  };

  const iconContainerSize = sizeConfig.knobSize - 2;

  return (
    <Pressable onPress={handlePress} disabled={disabled}>
      <Animated.View
        style={[
          containerStyle,
          { backgroundColor: trackColor as unknown as string },
        ]}
      >
        {/* Left icon/label - visible when ON (knob is on right) */}
        {(leftIcon || leftLabel) && (
          <Animated.View
            style={[
              styles.iconContainer,
              {
                left: knobPadding + 4,
                opacity: leftOpacity as unknown as number,
              },
            ]}
          >
            {leftIcon && (
              <Icon
                name={leftIcon}
                customSize={sizeConfig.iconSize}
                color="#FFFFFF"
              />
            )}
            {leftLabel && (
              <Text
                size={Size.TwoXSmall}
                style={{ color: "#FFFFFF", marginLeft: leftIcon ? 2 : 0 }}
              >
                {leftLabel}
              </Text>
            )}
          </Animated.View>
        )}

        {/* Right icon/label - visible when OFF (knob is on left) */}
        {(rightIcon || rightLabel) && (
          <Animated.View
            style={[
              styles.iconContainer,
              {
                right: knobPadding + 4,
                opacity: rightOpacity as unknown as number,
              },
            ]}
          >
            {rightLabel && (
              <Text
                size={Size.TwoXSmall}
                style={{ color: "#FFFFFF", marginRight: rightIcon ? 2 : 0 }}
              >
                {rightLabel}
              </Text>
            )}
            {rightIcon && (
              <Icon
                name={rightIcon}
                customSize={sizeConfig.iconSize}
                color="#FFFFFF"
              />
            )}
          </Animated.View>
        )}

        {/* Knob */}
        <Animated.View
          style={[
            styles.knob,
            {
              width: sizeConfig.knobSize,
              height: sizeConfig.knobSize,
              borderRadius: sizeConfig.knobSize / 2,
              transform: [{ translateX: knobTranslate as unknown as number }],
            },
          ]}
        />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  knob: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  iconContainer: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    zIndex: 0,
  },
});
