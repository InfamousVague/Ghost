import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  View,
  Text as RNText,
  StyleSheet,
  Animated,
  Platform,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import { TextAppearance, Brightness, Size } from "../../enums";
import { getBrightnessMultiplier } from "../../helpers";
import { useThemeColors } from "../../context/ThemeContext";
import { getThemedTextColor } from "../../helpers/useThemedColor";
import { Typography, Shadow, getGlowMultiplier } from "../../tokens";
import { useLoading } from "../card/Card";

/**
 * Props for the AnimatedNumber component.
 */
export type AnimatedNumberProps = {
  /** The numeric value to display */
  value: number;
  /** Number of decimal places */
  decimals?: number;
  /** Thousands separator */
  separator?: string;
  /** Prefix (e.g., "$", "+") */
  prefix?: string;
  /** Suffix (e.g., "%") */
  suffix?: string;
  /** Enable slot machine animation on value changes */
  animate?: boolean;
  /** Animation duration in ms */
  animationDuration?: number;
  /** Text color appearance */
  appearance?: TextAppearance;
  /** Text size */
  size?: Size;
  /** Glow intensity */
  brightness?: Brightness;
  /** Font weight */
  weight?: "regular" | "medium" | "semibold" | "bold";
  /** Whether the component is in loading state */
  loading?: boolean;
  /** Additional style overrides */
  style?: TextStyle;
  /** Container style */
  containerStyle?: ViewStyle;
};

/**
 * Size to font size mapping.
 */
const SIZE_MAP: Record<Size, number> = {
  [Size.TwoXSmall]: 10,
  [Size.ExtraSmall]: 12,
  [Size.Small]: 14,
  [Size.Medium]: 16,
  [Size.Large]: 18,
  [Size.ExtraLarge]: 20,
  [Size.TwoXLarge]: 24,
};

/**
 * Weight mapping.
 */
const WEIGHT_MAP: Record<string, TextStyle["fontWeight"]> = {
  regular: Typography.fontWeight.normal as TextStyle["fontWeight"],
  medium: Typography.fontWeight.medium as TextStyle["fontWeight"],
  semibold: Typography.fontWeight.semibold as TextStyle["fontWeight"],
  bold: Typography.fontWeight.bold as TextStyle["fontWeight"],
};

/**
 * Glow color mapping for text appearances.
 */
const GLOW_COLORS: Partial<Record<TextAppearance, string>> = {
  [TextAppearance.Link]: "#5A9BFF",
  [TextAppearance.Success]: "#34C759",
  [TextAppearance.Warning]: "#FF9F0A",
  [TextAppearance.Danger]: "#FF453A",
  [TextAppearance.Info]: "#5AC8FA",
};

// All characters that can appear (digits, separators, decimal point)
const DIGIT_CHARS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

/**
 * Format a number for display.
 */
function formatNumber(
  value: number,
  decimals: number,
  separator: string
): string {
  const fixed = Math.abs(value).toFixed(decimals);
  const [intPart, decPart] = fixed.split(".");
  const withSeparators = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  return decPart ? `${withSeparators}.${decPart}` : withSeparators;
}

/**
 * Single animated digit with slot machine effect.
 */
function AnimatedDigit({
  digit,
  fontSize,
  color,
  fontWeight,
  duration,
  isDigit,
}: {
  digit: string;
  fontSize: number;
  color: string;
  fontWeight: TextStyle["fontWeight"];
  duration: number;
  isDigit: boolean;
}) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [displayDigit, setDisplayDigit] = useState(digit);
  const prevDigit = useRef(digit);
  const lineHeight = fontSize * 1.2;

  useEffect(() => {
    if (digit !== prevDigit.current && isDigit) {
      // Animate through random digits before settling
      const fromDigit = parseInt(prevDigit.current) || 0;
      const toDigit = parseInt(digit) || 0;

      // Reset animation
      animatedValue.setValue(0);

      // Calculate steps for the roll animation
      const steps = 8 + Math.abs(toDigit - fromDigit);
      let step = 0;

      const interval = setInterval(() => {
        step++;
        if (step < steps) {
          // Show random intermediate digits
          setDisplayDigit(DIGIT_CHARS[Math.floor(Math.random() * 10)]);
        } else {
          // Final digit
          setDisplayDigit(digit);
          clearInterval(interval);
        }
      }, duration / steps);

      // Animate the Y position for a rolling effect
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: duration * 0.3,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: duration * 0.7,
          useNativeDriver: true,
        }),
      ]).start();

      prevDigit.current = digit;

      return () => clearInterval(interval);
    } else if (digit !== prevDigit.current) {
      // Non-digit characters just update immediately
      setDisplayDigit(digit);
      prevDigit.current = digit;
    }
  }, [digit, isDigit, duration, animatedValue]);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -lineHeight * 0.3, 0],
  });

  const opacity = animatedValue.interpolate({
    inputRange: [0, 0.3, 0.7, 1],
    outputRange: [1, 0.7, 0.7, 1],
  });

  const textStyle: TextStyle = {
    fontSize,
    fontWeight,
    fontFamily: Typography.fontFamily.base,
    fontVariant: ["tabular-nums"],
    color,
    lineHeight,
    textAlign: "center",
  };

  // For non-animating characters, just render directly
  if (!isDigit) {
    return <RNText style={textStyle}>{displayDigit}</RNText>;
  }

  // NOTE: No whitespace between elements to avoid text node errors in react-native-web
  return (<View style={{ height: lineHeight, overflow: "hidden", justifyContent: "center" }}><Animated.Text style={[textStyle, { transform: [{ translateY }], opacity }]}>{displayDigit}</Animated.Text></View>);
}

/**
 * An animated number display with slot machine effect.
 *
 * @remarks
 * When `animate` is true, each digit rolls through random values
 * before settling on the final number, creating a slot machine effect.
 *
 * @example Basic usage
 * ```tsx
 * <AnimatedNumber value={1234.56} animate />
 * ```
 *
 * @example With currency prefix
 * ```tsx
 * <AnimatedNumber value={42150.25} prefix="$" decimals={2} animate />
 * ```
 */
export function AnimatedNumber({
  value,
  decimals = 2,
  separator = ",",
  prefix = "",
  suffix = "",
  animate = true,
  animationDuration = 300,
  appearance = TextAppearance.Primary,
  size = Size.Medium,
  brightness = Brightness.None,
  weight = "regular",
  loading: loadingProp = false,
  style,
  containerStyle,
}: AnimatedNumberProps) {
  const parentLoading = useLoading();
  const loading = loadingProp || parentLoading;
  const themeColors = useThemeColors();

  const color = getThemedTextColor(themeColors, appearance);
  const fontSize = SIZE_MAP[size];
  const fontWeight = WEIGHT_MAP[weight];
  const lineHeight = fontSize * 1.5;

  // Calculate glow
  const brightnessMultiplier = getBrightnessMultiplier(brightness);
  const glowColor = GLOW_COLORS[appearance];
  const hasGlow = glowColor && brightnessMultiplier > 0;

  // Format the number
  const isNegative = value < 0;
  const formattedNumber = formatNumber(value, decimals, separator);
  const fullPrefix = isNegative ? `${prefix}-` : prefix;

  // Split into individual characters
  const chars = useMemo(() => {
    const result: { char: string; isDigit: boolean; key: string }[] = [];

    // Add prefix characters
    for (let i = 0; i < fullPrefix.length; i++) {
      result.push({ char: fullPrefix[i], isDigit: false, key: `prefix-${i}` });
    }

    // Add number characters with position-based keys for stable animation
    const numberChars = formattedNumber.split("");
    for (let i = 0; i < numberChars.length; i++) {
      const char = numberChars[i];
      const isDigit = /\d/.test(char);
      result.push({
        char,
        isDigit,
        key: `num-${formattedNumber.length - i}`, // Key from right for stable positioning
      });
    }

    // Add suffix characters
    for (let i = 0; i < suffix.length; i++) {
      result.push({ char: suffix[i], isDigit: false, key: `suffix-${i}` });
    }

    return result;
  }, [fullPrefix, formattedNumber, suffix]);

  // Web glow style
  const glowStyle: TextStyle = {};
  if (hasGlow && Platform.OS === "web") {
    const runtimeMultiplier = Math.min(
      Math.max(getGlowMultiplier(), Shadow.glow.minMultiplier),
      Shadow.glow.maxMultiplier
    );
    const opacity = Math.min(
      Shadow.glow.defaultOpacity * brightnessMultiplier * runtimeMultiplier,
      1
    );
    const blur = Shadow.glow.blur * runtimeMultiplier * 0.75;
    const yOffset = Shadow.glow.y * runtimeMultiplier;
    // @ts-expect-error - textShadow is valid on web
    glowStyle.textShadow = `0 ${yOffset}px ${blur}px rgba(${hexToRgb(glowColor)}, ${opacity})`;
  }

  // Loading state
  if (loading) {
    const estimatedWidth = fontSize * 5;
    return (
      <View style={[styles.skeletonContainer, { height: lineHeight }, containerStyle]}>
        <View
          style={[
            styles.skeleton,
            {
              width: estimatedWidth,
              height: fontSize * 0.75,
              borderRadius: 4,
            },
          ]}
        />
      </View>
    );
  }

  // Non-animated mode - just render as text
  if (!animate) {
    const textStyle: TextStyle = {
      fontSize,
      fontWeight,
      fontFamily: Typography.fontFamily.base,
      fontVariant: ["tabular-nums"],
      color,
      lineHeight,
      ...glowStyle,
      ...style,
    };

    // NOTE: No whitespace between elements to avoid text node errors in react-native-web
    return (<View style={[styles.row, containerStyle]}><RNText style={textStyle}>{fullPrefix}{formattedNumber}{suffix}</RNText></View>);
  }

  // Animated mode - render each character separately
  // NOTE: No whitespace between elements to avoid text node errors in react-native-web
  return (<View style={[styles.row, containerStyle]}>{chars.map(({ char, isDigit, key }) => (<AnimatedDigit key={key} digit={char} fontSize={fontSize} color={color} fontWeight={fontWeight} duration={animationDuration} isDigit={isDigit} />))}</View>);
}

/**
 * Convert hex color to RGB string.
 */
function hexToRgb(hex: string): string {
  const normalized = hex.replace("#", "");
  const bigint = parseInt(normalized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r}, ${g}, ${b}`;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  skeletonContainer: {
    justifyContent: "center",
  },
  skeleton: {
    backgroundColor: "rgba(128, 128, 128, 0.2)",
  },
});
