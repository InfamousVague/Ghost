import React from "react";
import {
  View,
  Text as RNText,
  StyleSheet,
  type TextStyle,
  type TextProps as RNTextProps,
} from "react-native";
import { TextAppearance, Brightness, Size } from "../../enums";
import { Typography, Colors } from "../../tokens";
import { getTextAppearanceColor } from "../../helpers";
import { Number, type NumberFormat } from "../number/Number";
import { Skeleton } from "../skeleton/Skeleton";
import { useLoading } from "../card/Card";

/**
 * Currency code to symbol mapping.
 */
const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  CNY: "¥",
  KRW: "₩",
  INR: "₹",
  BTC: "₿",
  ETH: "Ξ",
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
 * Props for the Currency component.
 */
export type CurrencyProps = {
  /** The numeric value to display */
  value: number;
  /** Currency code (e.g., "USD", "EUR") or custom symbol */
  currency?: string;
  /** Whether to show the sign for positive values */
  showPositiveSign?: boolean;
  /** Number of decimal places (defaults to 2) */
  decimals?: number;
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
  /** Width for skeleton when loading */
  skeletonWidth?: number;
  /** Additional style overrides */
  style?: TextStyle;
} & Omit<RNTextProps, "style" | "children">;

/**
 * Get the currency symbol from a currency code or return the input if it's already a symbol.
 */
function getCurrencySymbol(currency: string): string {
  return CURRENCY_SYMBOLS[currency.toUpperCase()] || currency;
}

/**
 * A currency display component built on top of Number.
 *
 * @remarks
 * The Currency component provides specialized formatting for monetary values:
 * - Automatic currency symbol lookup from codes (USD -> $)
 * - Currency symbol displayed smaller and slightly lower than the numbers
 * - Symbol uses primary accent color by default
 * - Default 2 decimal places
 * - Optional positive/negative sign display
 * - Thousands separators
 *
 * @example Basic usage
 * ```tsx
 * <Currency value={1234.56} currency="USD" />
 * // Renders: $1,234.56
 * ```
 *
 * @example With sign
 * ```tsx
 * <Currency value={24.60} currency="USD" showPositiveSign appearance={TextAppearance.Success} />
 * // Renders: +$24.60 (in green)
 * ```
 *
 * @example Negative value
 * ```tsx
 * <Currency value={-14.00} currency="USD" appearance={TextAppearance.Danger} />
 * // Renders: -$14.00 (in red)
 * ```
 */
export function Currency({
  value,
  currency = "USD",
  showPositiveSign = false,
  decimals = 2,
  appearance = TextAppearance.Primary,
  size = Size.Medium,
  brightness = Brightness.None,
  weight = "regular",
  loading: loadingProp = false,
  skeletonWidth,
  style,
  ...props
}: CurrencyProps) {
  const parentLoading = useLoading();
  const loading = loadingProp || parentLoading;

  const symbol = getCurrencySymbol(currency);
  const fontSize = SIZE_MAP[size];
  const fontWeight = WEIGHT_MAP[weight];
  const lineHeight = fontSize * 1.5;

  // Symbol is slightly smaller and uses primary accent color by default
  const symbolFontSize = fontSize * 0.85;
  const symbolColor = appearance === TextAppearance.Primary
    ? Colors.accent.primary
    : getTextAppearanceColor(appearance);

  // Loading state
  if (loading) {
    const estimatedWidth = skeletonWidth ?? fontSize * 5;
    return (
      <View style={[styles.container, { height: lineHeight }]}>
        <Skeleton
          width={estimatedWidth}
          height={fontSize * 0.75}
          borderRadius={4}
        />
      </View>
    );
  }

  // Build sign
  let sign = "";
  if (showPositiveSign && value > 0) {
    sign = "+";
  } else if (value < 0) {
    sign = "-";
  }

  const format: NumberFormat = {
    separator: ",",
    decimals,
  };

  const symbolTextStyle: TextStyle = {
    fontSize: symbolFontSize,
    fontWeight,
    fontFamily: Typography.fontFamily.base,
    color: symbolColor,
  };

  return (
    <View style={styles.row}>
      {sign && (
        <RNText style={symbolTextStyle}>{sign}</RNText>
      )}
      <RNText style={symbolTextStyle}>{symbol}</RNText>
      <Number
        value={Math.abs(value)}
        format={format}
        appearance={appearance}
        size={size}
        brightness={brightness}
        weight={weight}
        style={style}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "baseline",
  },
});
