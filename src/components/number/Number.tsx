import React from "react";
import {
  Text as RNText,
  View,
  Platform,
  StyleSheet,
  type TextStyle,
  type TextProps as RNTextProps,
} from "react-native";
import { TextAppearance, Brightness, Size } from "../../enums";
import { getBrightnessMultiplier } from "../../helpers";
import { useThemeColors, type ThemeColors } from "../../context/ThemeContext";
import { getThemedTextColor } from "../../helpers/useThemedColor";
import { Typography, Shadow, getGlowMultiplier } from "../../tokens";
import { useLoading } from "../card/Card";

/**
 * Format options for the Number component.
 */
export type NumberFormat = {
  /** Type of number for intelligent leading zero detection */
  type?: "default" | "percent" | "score";
  /** Maximum value (used for leading zero calculation) */
  max?: number;
  /** Minimum digits to display (pads with leading zeros) */
  minDigits?: number;
  /** Number of decimal places */
  decimals?: number;
  /** Thousands separator */
  separator?: string;
  /** Prefix (e.g., "$", "+") */
  prefix?: string;
  /** Suffix (e.g., "%", "pts") */
  suffix?: string;
};

/**
 * Props for the Number component.
 */
export type NumberProps = {
  /** The numeric value to display */
  value: number;
  /** Format options */
  format?: NumberFormat;
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
  /** Width for skeleton when loading (defaults to auto-calculated based on expected digits) */
  skeletonWidth?: number;
  /** Additional style overrides */
  style?: TextStyle;
} & Omit<RNTextProps, "style" | "children">;

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

/**
 * Calculate the number of digits needed for leading zeros.
 */
function calculateMinDigits(value: number, format: NumberFormat): number {
  // If explicitly set, use that
  if (format.minDigits !== undefined) {
    return format.minDigits;
  }

  // For percentages, use 2 digits (00-99, or 3 for 100)
  if (format.type === "percent") {
    const max = format.max ?? 100;
    return max >= 100 ? 3 : 2;
  }

  // For scores with known max, match the max digit count
  if (format.type === "score" && format.max !== undefined) {
    return String(Math.floor(format.max)).length;
  }

  // For aesthetic leading zeros: if the number breaks into thousands
  // but doesn't fill the highest group, add a leading zero
  // e.g., 3,376 -> 03,376 (looks more balanced)
  if (format.type === "default" || format.type === undefined) {
    const absValue = Math.abs(Math.floor(value));

    // Check if number is in a "partial" thousands group
    // 1,000 - 9,999 -> could use leading zero for balance
    if (absValue >= 1000 && absValue < 10000) {
      return 5; // 0X,XXX
    }
    // 100,000 - 999,999 -> could use leading zero
    if (absValue >= 100000 && absValue < 1000000) {
      return 7; // 0XX,XXX or 0,XXX,XXX
    }
  }

  return 0; // No leading zeros
}

/**
 * Result of formatting a number with leading/trailing zeros separated.
 */
type FormattedNumber = {
  /** Leading zeros (to be displayed at reduced opacity) */
  leadingZeros: string;
  /** Main number content (integer part without leading zeros) */
  mainContent: string;
  /** Decimal separator and significant digits */
  decimalContent: string;
  /** Trailing zeros in decimal (to be displayed at reduced opacity) */
  trailingZeros: string;
  /** Full prefix (including sign for negative numbers) */
  prefix: string;
  /** Suffix */
  suffix: string;
};

/**
 * Format a number with the specified options, separating leading zeros.
 */
function formatNumber(value: number, format: NumberFormat = {}): FormattedNumber {
  const {
    decimals,
    separator = ",",
    prefix = "",
    suffix = "",
  } = format;

  const minDigits = calculateMinDigits(value, format);

  // Handle decimals
  let numStr: string;
  if (decimals !== undefined) {
    numStr = Math.abs(value).toFixed(decimals);
  } else {
    numStr = String(Math.abs(value));
  }

  // Split into integer and decimal parts
  const [intPart, decPart] = numStr.split(".");

  // Calculate leading zeros count
  const leadingZerosCount = Math.max(0, minDigits - intPart.length);
  const leadingZeros = "0".repeat(leadingZerosCount);

  // Add thousands separators to the padded integer
  const paddedInt = intPart.padStart(minDigits, "0");
  const withSeparators = paddedInt.replace(/\B(?=(\d{3})+(?!\d))/g, separator);

  // Find where leading zeros end in the formatted string
  let leadingZerosFormatted = "";
  let mainFormatted = withSeparators;

  if (leadingZerosCount > 0) {
    // Count how many characters are leading zeros (including separators within them)
    let zeroCount = 0;
    let splitIndex = 0;
    for (let i = 0; i < withSeparators.length; i++) {
      if (withSeparators[i] === "0") {
        zeroCount++;
        if (zeroCount <= leadingZerosCount) {
          splitIndex = i + 1;
        }
      } else if (withSeparators[i] !== separator) {
        break;
      } else if (zeroCount < leadingZerosCount) {
        // Include separator if it's between leading zeros
        splitIndex = i + 1;
      }
    }
    leadingZerosFormatted = withSeparators.slice(0, splitIndex);
    mainFormatted = withSeparators.slice(splitIndex);
  }

  // For values < 1, the integer part is "0" which should also be dimmed
  // This makes prices like $0.0025 show the leading 0 as muted
  if (mainFormatted === "0" && decPart) {
    leadingZerosFormatted = leadingZerosFormatted + "0";
    mainFormatted = "";
  }

  // Process decimal part - separate trailing zeros
  let decimalContent = "";
  let trailingZeros = "";

  if (decPart) {
    // Find trailing zeros
    const trailingZeroMatch = decPart.match(/0+$/);
    if (trailingZeroMatch) {
      const trailingCount = trailingZeroMatch[0].length;
      const significantPart = decPart.slice(0, -trailingCount);
      if (significantPart.length > 0) {
        decimalContent = `.${significantPart}`;
        trailingZeros = "0".repeat(trailingCount);
      } else {
        // All zeros after decimal
        decimalContent = ".";
        trailingZeros = decPart;
      }
    } else {
      // No trailing zeros
      decimalContent = `.${decPart}`;
    }
  }

  // Handle negative sign in prefix
  const fullPrefix = value < 0 ? `${prefix}-` : prefix;

  return {
    leadingZeros: leadingZerosFormatted,
    mainContent: mainFormatted,
    decimalContent,
    trailingZeros,
    prefix: fullPrefix,
    suffix,
  };
}

/** Opacity for leading zeros */
const LEADING_ZERO_OPACITY = 0.33;

/**
 * A number display component with intelligent leading zeros and glow effects.
 *
 * @remarks
 * The Number component intelligently adds leading zeros based on context:
 * - Percentages: Pads to match max (e.g., 07% for values 0-99)
 * - Scores: Pads to match the maximum possible value
 * - Default: Adds aesthetic leading zeros for partial thousands groups
 *
 * Leading zeros are displayed at 33% opacity for visual hierarchy.
 *
 * @example Basic usage
 * ```tsx
 * <Number value={3376} />
 * // Renders: 03,376 (with leading zero at 33% opacity)
 * ```
 *
 * @example Percentage
 * ```tsx
 * <Number value={7} format={{ type: "percent", suffix: "%" }} />
 * // Renders: 07%
 * ```
 *
 * @example Score with max
 * ```tsx
 * <Number value={78} format={{ type: "score", max: 100 }} />
 * // Renders: 078
 * ```
 *
 * @example Loading state
 * ```tsx
 * <Number value={0} loading size={Size.Large} />
 * ```
 */
export function Number({
  value,
  format = {},
  appearance = TextAppearance.Primary,
  size = Size.Medium,
  brightness = Brightness.None,
  weight = "regular",
  loading: loadingProp = false,
  skeletonWidth,
  style,
  ...props
}: NumberProps) {
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
  const formatted = formatNumber(value, format);

  const baseTextStyle: TextStyle = {
    color,
    fontSize,
    fontWeight,
    lineHeight,
    fontFamily: Typography.fontFamily.base,
    // Use tabular (monospace) numbers for alignment
    fontVariant: ["tabular-nums"],
  };

  const textStyle: TextStyle = {
    ...baseTextStyle,
    ...style,
  };

  const dimmedStyle: TextStyle = {
    ...baseTextStyle,
    opacity: LEADING_ZERO_OPACITY,
  };

  // Symbols use primary color when appearance is default (Primary)
  const symbolColor = appearance === TextAppearance.Primary
    ? getThemedTextColor(themeColors, TextAppearance.Primary)
    : color;

  const symbolStyle: TextStyle = {
    ...baseTextStyle,
    color: symbolColor,
  };

  // Add text shadow for glow effect on web (positioned below like button shadows)
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
    textStyle.textShadow = `0 ${yOffset}px ${blur}px rgba(${hexToRgb(glowColor)}, ${opacity})`;
  }

  // Loading state - show skeleton
  if (loading) {
    // Calculate approximate width based on expected content
    const estimatedWidth = skeletonWidth ?? fontSize * 4;
    return (
      <View style={[styles.skeletonContainer, { height: lineHeight }]}>
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

  // Render content with leading/trailing zeros at reduced opacity
  const renderContent = () => (
    <>
      {formatted.prefix && (
        <RNText style={symbolStyle}>{formatted.prefix}</RNText>
      )}
      {formatted.leadingZeros && (
        <RNText style={dimmedStyle}>{formatted.leadingZeros}</RNText>
      )}
      <RNText style={textStyle}>{formatted.mainContent}</RNText>
      {formatted.decimalContent && (
        <RNText style={textStyle}>{formatted.decimalContent}</RNText>
      )}
      {formatted.trailingZeros && (
        <RNText style={dimmedStyle}>{formatted.trailingZeros}</RNText>
      )}
      {formatted.suffix && (
        <RNText style={symbolStyle}>{formatted.suffix}</RNText>
      )}
    </>
  );

  // For native with glow, use shadow properties
  if (hasGlow && Platform.OS !== "web") {
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

    // Calculate full formatted value for ghost layer
    const fullValue = `${formatted.prefix}${formatted.leadingZeros}${formatted.mainContent}${formatted.decimalContent}${formatted.trailingZeros}${formatted.suffix}`;

    return (
      <View style={styles.wrapper}>
        <View
          style={[
            styles.glowLayer,
            {
              shadowColor: glowColor,
              shadowOffset: { width: 0, height: yOffset },
              shadowOpacity: opacity,
              shadowRadius: blur,
            },
          ]}
        >
          <RNText style={[textStyle, { opacity: 0 }]} {...props}>
            {fullValue}
          </RNText>
        </View>
        <View style={styles.row} {...props}>
          {renderContent()}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.row} {...props}>
      {renderContent()}
    </View>
  );
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
  wrapper: {
    position: "relative",
  },
  glowLayer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
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
