import React from "react";
import { View, StyleSheet, type ViewStyle } from "react-native";
import { Colors } from "../../tokens";
import { TextAppearance } from "../../enums";
import { Text } from "../text/Text";
import { Size } from "../../enums";

export type ChartProps = {
  /** Chart title */
  title?: string;
  /** Chart data points for preview line */
  data?: number[];
  /** Width of the chart */
  width?: number | string;
  /** Height of the chart */
  height?: number;
  /** Whether the trend is positive */
  isPositive?: boolean;
  /** Additional style */
  style?: ViewStyle;
};

/**
 * Placeholder chart component.
 * Will be replaced with TradingView integration.
 */
export function Chart({
  title,
  data = [],
  width = "100%",
  height = 200,
  isPositive = true,
  style,
}: ChartProps) {
  const lineColor = isPositive ? Colors.status.success : Colors.status.danger;
  const gradientColor = isPositive
    ? "rgba(34, 197, 94, 0.1)"
    : "rgba(239, 68, 68, 0.1)";

  // Generate SVG path from data
  const generatePath = () => {
    if (!data || data.length < 2) return "";

    const minVal = Math.min(...data);
    const maxVal = Math.max(...data);
    const range = maxVal - minVal || 1;
    const padding = 10;
    const chartHeight = height - padding * 2;
    const chartWidth = 100; // percentage based

    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * chartWidth;
      const y = padding + chartHeight - ((value - minVal) / range) * chartHeight;
      return `${x},${y}`;
    });

    return `M ${points.join(" L ")}`;
  };

  const path = generatePath();
  const areaPath = path
    ? `${path} L 100,${height - 10} L 0,${height - 10} Z`
    : "";

  return (
    <View style={[styles.container, { width, height }, style]}>
      {title && (
        <Text
          size={Size.ExtraSmall}
          appearance={TextAppearance.Muted}
          style={styles.title}
        >
          {title}
        </Text>
      )}

      <View style={styles.chartArea}>
        {data.length >= 2 ? (
          <svg
            width="100%"
            height={height}
            viewBox={`0 0 100 ${height}`}
            preserveAspectRatio="none"
            style={{ display: "block" }}
          >
            <defs>
              <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={lineColor} stopOpacity="0.3" />
                <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={areaPath} fill="url(#chartGradient)" />
            <path
              d={path}
              fill="none"
              stroke={lineColor}
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        ) : (
          <View style={styles.placeholder}>
            <Text size={Size.ExtraSmall} appearance={TextAppearance.Muted}>
              Chart placeholder
            </Text>
            <Text size={Size.TwoXSmall} appearance={TextAppearance.Muted}>
              TradingView integration coming soon
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  title: {
    position: "absolute",
    top: 8,
    left: 8,
    zIndex: 1,
  },
  chartArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    borderRadius: 8,
    gap: 4,
  },
});
