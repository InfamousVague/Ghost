import React from "react";
import {
  View,
  Pressable,
  StyleSheet,
  type ViewStyle,
} from "react-native";
import Svg, { Path, Line } from "react-native-svg";
import { Size } from "../../enums";
import { Colors } from "../../tokens";
import { Text } from "../text/Text";
import { Skeleton } from "../skeleton/Skeleton";
import { useLoading } from "../card/Card";

/**
 * Size configurations for the checkbox.
 */
const SIZE_MAP: Record<Size, { box: number; stroke: number }> = {
  [Size.TwoXSmall]: { box: 14, stroke: 1.5 },
  [Size.ExtraSmall]: { box: 16, stroke: 1.5 },
  [Size.Small]: { box: 18, stroke: 2 },
  [Size.Medium]: { box: 20, stroke: 2 },
  [Size.Large]: { box: 22, stroke: 2 },
  [Size.ExtraLarge]: { box: 24, stroke: 2.5 },
  [Size.TwoXLarge]: { box: 28, stroke: 2.5 },
};

/**
 * Props for the Checkbox component.
 */
export type CheckboxProps = {
  /** Whether the checkbox is checked */
  checked?: boolean;
  /** Whether the checkbox is in indeterminate state */
  indeterminate?: boolean;
  /** Callback when the checkbox changes */
  onValueChange?: (checked: boolean) => void;
  /** Size variant */
  size?: Size;
  /** Label text */
  label?: string;
  /** Whether the checkbox is disabled */
  disabled?: boolean;
  /** Whether the component is in loading state */
  loading?: boolean;
  /** Additional style overrides */
  style?: ViewStyle;
};

/**
 * A checkbox component with optional label.
 *
 * @example Basic usage
 * ```tsx
 * <Checkbox checked={isChecked} onValueChange={setIsChecked} />
 * ```
 *
 * @example With label
 * ```tsx
 * <Checkbox label="Accept terms" checked={accepted} onValueChange={setAccepted} />
 * ```
 */
export function Checkbox({
  checked = false,
  indeterminate = false,
  onValueChange,
  size = Size.Medium,
  label,
  disabled = false,
  loading: loadingProp = false,
  style,
}: CheckboxProps) {
  const parentLoading = useLoading();
  const loading = loadingProp || parentLoading;

  const sizeConfig = SIZE_MAP[size];

  const handlePress = () => {
    if (!disabled && onValueChange) {
      onValueChange(!checked);
    }
  };

  // Loading state
  if (loading) {
    return (
      <View style={[styles.container, style]}>
        <Skeleton
          width={sizeConfig.box}
          height={sizeConfig.box}
          borderRadius={4}
        />
        {label && (
          <Skeleton
            width={80}
            height={sizeConfig.box * 0.8}
            borderRadius={4}
          />
        )}
      </View>
    );
  }

  const isActive = checked || indeterminate;

  const boxStyle: ViewStyle = {
    width: sizeConfig.box,
    height: sizeConfig.box,
    borderRadius: 4,
    borderWidth: isActive ? 0 : 2,
    borderColor: Colors.border.subtle,
    backgroundColor: isActive ? Colors.accent.primary : "transparent",
    alignItems: "center",
    justifyContent: "center",
    opacity: disabled ? 0.5 : 1,
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={[styles.container, style]}
    >
      <View style={boxStyle}>
        {checked && !indeterminate && (
          <Svg
            width={sizeConfig.box * 0.65}
            height={sizeConfig.box * 0.65}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth={sizeConfig.stroke * 1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <Path d="M20 6L9 17L4 12" />
          </Svg>
        )}
        {indeterminate && (
          <Svg
            width={sizeConfig.box * 0.6}
            height={sizeConfig.box * 0.6}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth={sizeConfig.stroke * 1.5}
            strokeLinecap="round"
          >
            <Line x1="5" y1="12" x2="19" y2="12" />
          </Svg>
        )}
      </View>
      {label && (
        <Text size={size} style={{ opacity: disabled ? 0.5 : 1 }}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
