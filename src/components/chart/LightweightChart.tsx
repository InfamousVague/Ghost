import React, { useEffect, useRef, useCallback } from "react";
import { View, Platform, StyleSheet, type ViewStyle, type DimensionValue } from "react-native";
import {
  createChart,
  AreaSeries,
  LineSeries,
  CrosshairMode,
  type IChartApi,
  type AreaData,
  type LineData,
  type DeepPartial,
  type ChartOptions,
  type AreaSeriesPartialOptions,
  type LineSeriesPartialOptions,
  type LineWidth,
} from "lightweight-charts";
import { Colors, Shadow } from "../../tokens";
import { useThemeColors } from "../../context/ThemeContext";

/**
 * Data point for area/line charts.
 */
export type ChartDataPoint = {
  time: number;
  value: number;
};

/**
 * Chart type variants.
 */
export type ChartType = "area" | "line";

/**
 * Props for the LightweightChart component.
 */
export type LightweightChartProps = {
  /** Chart data points */
  data: ChartDataPoint[];
  /** Chart type */
  type?: ChartType;
  /** Chart width (defaults to 100%) */
  width?: number | string;
  /** Chart height in pixels */
  height?: number;
  /** Whether the trend is positive (affects colors) */
  isPositive?: boolean;
  /** Show price scale on right */
  showPriceScale?: boolean;
  /** Show time scale at bottom */
  showTimeScale?: boolean;
  /** Show crosshair on hover */
  showCrosshair?: boolean;
  /** Allow user interaction (zoom/pan) */
  interactive?: boolean;
  /** Line width */
  lineWidth?: number;
  /** Custom line color (overrides isPositive) */
  lineColor?: string;
  /** Enable glow effect on the chart line */
  glow?: boolean;
  /** Glow intensity multiplier (default 1.0) */
  glowIntensity?: number;
  /** Additional style overrides */
  style?: ViewStyle;
};

const WATERMARK_TITLE = "Charting by TradingView";

/**
 * Remove TradingView watermark from chart container.
 */
function removeTradingViewWatermark(container: HTMLElement) {
  const watermarkTargets = container.querySelectorAll(`[title="${WATERMARK_TITLE}"]`);
  const svgTitles = container.querySelectorAll("svg title");

  watermarkTargets.forEach((node) => {
    const removable = node.closest("a") ?? node.closest("svg") ?? node;
    removable.remove();
  });

  svgTitles.forEach((titleNode) => {
    if (titleNode.textContent?.trim() === WATERMARK_TITLE) {
      const removable = titleNode.closest("a") ?? titleNode.closest("svg") ?? titleNode;
      removable.remove();
    }
  });
}

/**
 * A chart component using TradingView's lightweight-charts library.
 *
 * @remarks
 * This component only works on web. On native platforms, it renders nothing.
 *
 * @example Basic usage
 * ```tsx
 * <LightweightChart
 *   data={[{ time: 1234567890, value: 100 }, { time: 1234567900, value: 105 }]}
 *   height={200}
 *   isPositive={true}
 * />
 * ```
 */
export function LightweightChart({
  data,
  type = "area",
  width = "100%",
  height = 200,
  isPositive = true,
  showPriceScale = false,
  showTimeScale = false,
  showCrosshair = false,
  interactive = false,
  lineWidth = 2,
  lineColor,
  glow = true,
  glowIntensity = 1.0,
  style,
}: LightweightChartProps) {
  const themeColors = useThemeColors();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ReturnType<IChartApi["addSeries"]> | null>(null);
  const watermarkObserverRef = useRef<MutationObserver | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const color = lineColor ?? (isPositive ? Colors.status.success : Colors.status.danger);
  const topColor = isPositive
    ? "rgba(34, 197, 94, 0.35)"
    : "rgba(239, 68, 68, 0.35)";
  const bottomColor = isPositive
    ? "rgba(34, 197, 94, 0.02)"
    : "rgba(239, 68, 68, 0.02)";

  // Calculate glow filter
  const glowBlur = Shadow.glow.blur * 0.6 * glowIntensity;
  const glowOpacity = Shadow.glow.defaultOpacity * glowIntensity;
  const glowFilter = glow ? `drop-shadow(0 0 ${glowBlur}px ${color})` : "none";

  const syncChartDimensions = useCallback(() => {
    const container = containerRef.current;
    const chart = chartRef.current;
    if (!container || !chart) return;

    const containerWidth = container.clientWidth || 300;
    chart.resize(containerWidth, height);
    chart.timeScale().fitContent();
  }, [height]);

  useEffect(() => {
    if (Platform.OS !== "web") return;

    const container = containerRef.current;
    if (!container) return;

    // Clean up existing chart
    chartRef.current?.remove();

    const initialWidth = container.clientWidth || 300;

    const chartOptions: DeepPartial<ChartOptions> = {
      width: initialWidth,
      height,
      layout: {
        background: { color: "transparent" },
        textColor: themeColors.text.muted,
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { visible: false },
      },
      crosshair: {
        mode: showCrosshair ? CrosshairMode.Normal : CrosshairMode.Hidden,
      },
      handleScroll: interactive,
      handleScale: interactive,
      rightPriceScale: {
        visible: showPriceScale,
        borderVisible: false,
        scaleMargins: { top: 0.1, bottom: 0.1 },
      },
      leftPriceScale: {
        visible: false,
        borderVisible: false,
      },
      timeScale: {
        visible: showTimeScale,
        borderVisible: false,
        rightOffset: 0,
        fixLeftEdge: true,
        fixRightEdge: true,
      },
    };

    const chart = createChart(container, chartOptions);

    // Add series based on type
    if (type === "area") {
      const areaOptions: AreaSeriesPartialOptions = {
        lineColor: color,
        topColor,
        bottomColor,
        lineWidth: lineWidth as LineWidth,
        priceLineVisible: false,
        lastValueVisible: false,
        crosshairMarkerVisible: showCrosshair,
      };
      const series = chart.addSeries(AreaSeries, areaOptions);
      series.setData(data as AreaData[]);
      seriesRef.current = series;
    } else {
      const lineOptions: LineSeriesPartialOptions = {
        color,
        lineWidth: lineWidth as LineWidth,
        priceLineVisible: false,
        lastValueVisible: false,
        crosshairMarkerVisible: showCrosshair,
      };
      const series = chart.addSeries(LineSeries, lineOptions);
      series.setData(data as LineData[]);
      seriesRef.current = series;
    }

    chart.timeScale().fitContent();

    // Remove watermark
    removeTradingViewWatermark(container);

    // Watch for watermark re-additions
    watermarkObserverRef.current?.disconnect();
    watermarkObserverRef.current = new MutationObserver(() => {
      if (containerRef.current) {
        removeTradingViewWatermark(containerRef.current);
      }
    });
    watermarkObserverRef.current.observe(container, {
      subtree: true,
      childList: true,
      attributes: true,
    });

    // Handle resize
    resizeObserverRef.current?.disconnect();
    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(() => syncChartDimensions());
      observer.observe(container);
      resizeObserverRef.current = observer;
    }

    chartRef.current = chart;

    return () => {
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
      watermarkObserverRef.current?.disconnect();
      watermarkObserverRef.current = null;
      resizeObserverRef.current?.disconnect();
      resizeObserverRef.current = null;
    };
  }, [
    data,
    type,
    height,
    color,
    topColor,
    bottomColor,
    lineWidth,
    showPriceScale,
    showTimeScale,
    showCrosshair,
    interactive,
    themeColors.text.muted,
    syncChartDimensions,
  ]);

  // Update data when it changes
  useEffect(() => {
    if (seriesRef.current && data.length > 0) {
      if (type === "area") {
        seriesRef.current.setData(data as AreaData[]);
      } else {
        seriesRef.current.setData(data as LineData[]);
      }
      chartRef.current?.timeScale().fitContent();
    }
  }, [data, type]);

  // Don't render on native
  if (Platform.OS !== "web") {
    return <View style={[styles.placeholder, { width: width as DimensionValue, height }, style]} />;
  }

  const containerStyle: React.CSSProperties = {
    width: typeof width === "number" ? width : width,
    height,
    filter: glowFilter,
  };

  return <div ref={containerRef} style={containerStyle} />;
}

const styles = StyleSheet.create({
  placeholder: {
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    borderRadius: 8,
  },
});
