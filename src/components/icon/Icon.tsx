import React from "react";
import { View, StyleSheet, type ViewStyle } from "react-native";
import Svg, { Path, Circle, Rect, Line, Polyline } from "react-native-svg";
import { Size, TextAppearance } from "../../enums";
import { useThemedTextColor } from "../../helpers";
import { Colors } from "../../tokens";
import { Skeleton } from "../skeleton/Skeleton";
import { useLoading } from "../card/Card";

/**
 * Available icon names.
 */
export type IconName =
  | "search"
  | "calendar"
  | "chevron-down"
  | "chevron-up"
  | "chevron-left"
  | "chevron-right"
  | "check"
  | "check-circle"
  | "close"
  | "plus"
  | "minus"
  | "filter"
  | "settings"
  | "user"
  | "bell"
  | "upload"
  | "download"
  | "arrow-up"
  | "arrow-down"
  | "arrow-up-down"
  | "star"
  | "star-filled"
  | "heart"
  | "heart-filled"
  | "home"
  | "menu"
  | "more-horizontal"
  | "more-vertical"
  | "edit"
  | "trash"
  | "copy"
  | "external-link"
  | "eye"
  | "eye-off"
  | "lock"
  | "unlock"
  | "info"
  | "warning"
  | "error"
  | "success"
  | "sun"
  | "moon"
  | "grid"
  | "list"
  | "skull"
  | "wifi-off"
  | "trending-up"
  | "trending-down"
  | "activity"
  | "bar-chart-2"
  | "zap"
  | "layers"
  | "database"
  | "clock"
  | "coins"
  | "building-2"
  | "pie-chart"
  | "power"
  | "turtle"
  | "rabbit"
  | "scale";

/**
 * Size to pixel mapping.
 */
const SIZE_MAP: Record<Size, number> = {
  [Size.TwoXSmall]: 12,
  [Size.ExtraSmall]: 14,
  [Size.Small]: 16,
  [Size.Medium]: 20,
  [Size.Large]: 24,
  [Size.ExtraLarge]: 28,
  [Size.TwoXLarge]: 32,
};

/**
 * Props for the Icon component.
 */
export type IconProps = {
  /** The icon to display */
  name: IconName;
  /** Icon size */
  size?: Size;
  /** Custom size in pixels (overrides size prop) */
  customSize?: number;
  /** Icon color appearance */
  appearance?: TextAppearance;
  /** Custom color (overrides appearance) */
  color?: string;
  /** Whether the component is in loading state */
  loading?: boolean;
  /** Additional style overrides */
  style?: ViewStyle;
};

/**
 * An icon component with a built-in icon library.
 *
 * @example Basic usage
 * ```tsx
 * <Icon name="search" />
 * ```
 *
 * @example With size and color
 * ```tsx
 * <Icon name="check" size={Size.Large} appearance={TextAppearance.Success} />
 * ```
 */
export function Icon({
  name,
  size = Size.Medium,
  customSize,
  appearance = TextAppearance.Primary,
  color: customColor,
  loading: loadingProp = false,
  style,
}: IconProps) {
  const parentLoading = useLoading();
  const loading = loadingProp || parentLoading;
  const getThemedColor = useThemedTextColor();

  const pixelSize = customSize ?? SIZE_MAP[size];
  const color = customColor ?? getThemedColor(appearance);

  // Loading state
  if (loading) {
    return (
      <Skeleton
        width={pixelSize}
        height={pixelSize}
        borderRadius={pixelSize / 4}
      />
    );
  }

  return (
    <View style={[{ width: pixelSize, height: pixelSize }, style]}>
      <Svg
        width={pixelSize}
        height={pixelSize}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {renderIcon(name, color)}
      </Svg>
    </View>
  );
}

/**
 * Render the SVG paths for a given icon name.
 */
function renderIcon(name: IconName, color: string) {
  switch (name) {
    case "search":
      return (
        <>
          <Circle cx="11" cy="11" r="8" />
          <Line x1="21" y1="21" x2="16.65" y2="16.65" />
        </>
      );

    case "calendar":
      return (
        <>
          <Rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <Line x1="16" y1="2" x2="16" y2="6" />
          <Line x1="8" y1="2" x2="8" y2="6" />
          <Line x1="3" y1="10" x2="21" y2="10" />
        </>
      );

    case "chevron-down":
      return <Polyline points="6 9 12 15 18 9" />;

    case "chevron-up":
      return <Polyline points="18 15 12 9 6 15" />;

    case "chevron-left":
      return <Polyline points="15 18 9 12 15 6" />;

    case "chevron-right":
      return <Polyline points="9 18 15 12 9 6" />;

    case "check":
      return <Polyline points="20 6 9 17 4 12" />;

    case "close":
      return (
        <>
          <Line x1="18" y1="6" x2="6" y2="18" />
          <Line x1="6" y1="6" x2="18" y2="18" />
        </>
      );

    case "plus":
      return (
        <>
          <Line x1="12" y1="5" x2="12" y2="19" />
          <Line x1="5" y1="12" x2="19" y2="12" />
        </>
      );

    case "minus":
      return <Line x1="5" y1="12" x2="19" y2="12" />;

    case "filter":
      return <Polyline points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />;

    case "settings":
      return (
        <>
          <Circle cx="12" cy="12" r="3" />
          <Path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </>
      );

    case "user":
      return (
        <>
          <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <Circle cx="12" cy="7" r="4" />
        </>
      );

    case "bell":
      return (
        <>
          <Path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <Path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </>
      );

    case "upload":
      return (
        <>
          <Path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <Polyline points="17 8 12 3 7 8" />
          <Line x1="12" y1="3" x2="12" y2="15" />
        </>
      );

    case "download":
      return (
        <>
          <Path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <Polyline points="7 10 12 15 17 10" />
          <Line x1="12" y1="15" x2="12" y2="3" />
        </>
      );

    case "arrow-up":
      return (
        <>
          <Line x1="12" y1="19" x2="12" y2="5" />
          <Polyline points="5 12 12 5 19 12" />
        </>
      );

    case "arrow-down":
      return (
        <>
          <Line x1="12" y1="5" x2="12" y2="19" />
          <Polyline points="19 12 12 19 5 12" />
        </>
      );

    case "star":
      return (
        <Path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      );

    case "star-filled":
      return (
        <Path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          fill={color}
        />
      );

    case "heart":
      return (
        <Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      );

    case "heart-filled":
      return (
        <Path
          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
          fill={color}
        />
      );

    case "home":
      return (
        <>
          <Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <Polyline points="9 22 9 12 15 12 15 22" />
        </>
      );

    case "menu":
      return (
        <>
          <Line x1="3" y1="12" x2="21" y2="12" />
          <Line x1="3" y1="6" x2="21" y2="6" />
          <Line x1="3" y1="18" x2="21" y2="18" />
        </>
      );

    case "more-horizontal":
      return (
        <>
          <Circle cx="12" cy="12" r="1" fill={color} />
          <Circle cx="19" cy="12" r="1" fill={color} />
          <Circle cx="5" cy="12" r="1" fill={color} />
        </>
      );

    case "more-vertical":
      return (
        <>
          <Circle cx="12" cy="12" r="1" fill={color} />
          <Circle cx="12" cy="5" r="1" fill={color} />
          <Circle cx="12" cy="19" r="1" fill={color} />
        </>
      );

    case "edit":
      return (
        <>
          <Path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <Path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </>
      );

    case "trash":
      return (
        <>
          <Polyline points="3 6 5 6 21 6" />
          <Path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <Line x1="10" y1="11" x2="10" y2="17" />
          <Line x1="14" y1="11" x2="14" y2="17" />
        </>
      );

    case "copy":
      return (
        <>
          <Rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <Path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </>
      );

    case "external-link":
      return (
        <>
          <Path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <Polyline points="15 3 21 3 21 9" />
          <Line x1="10" y1="14" x2="21" y2="3" />
        </>
      );

    case "eye":
      return (
        <>
          <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <Circle cx="12" cy="12" r="3" />
        </>
      );

    case "eye-off":
      return (
        <>
          <Path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
          <Line x1="1" y1="1" x2="23" y2="23" />
        </>
      );

    case "lock":
      return (
        <>
          <Rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <Path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </>
      );

    case "unlock":
      return (
        <>
          <Rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <Path d="M7 11V7a5 5 0 0 1 9.9-1" />
        </>
      );

    case "info":
      return (
        <>
          <Circle cx="12" cy="12" r="10" />
          <Line x1="12" y1="16" x2="12" y2="12" />
          <Line x1="12" y1="8" x2="12.01" y2="8" />
        </>
      );

    case "warning":
      return (
        <>
          <Path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <Line x1="12" y1="9" x2="12" y2="13" />
          <Line x1="12" y1="17" x2="12.01" y2="17" />
        </>
      );

    case "error":
      return (
        <>
          <Circle cx="12" cy="12" r="10" />
          <Line x1="15" y1="9" x2="9" y2="15" />
          <Line x1="9" y1="9" x2="15" y2="15" />
        </>
      );

    case "success":
      return (
        <>
          <Circle cx="12" cy="12" r="10" />
          <Polyline points="9 12 11 14 15 10" />
        </>
      );

    case "sun":
      return (
        <>
          <Circle cx="12" cy="12" r="5" />
          <Line x1="12" y1="1" x2="12" y2="3" />
          <Line x1="12" y1="21" x2="12" y2="23" />
          <Line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <Line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <Line x1="1" y1="12" x2="3" y2="12" />
          <Line x1="21" y1="12" x2="23" y2="12" />
          <Line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <Line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </>
      );

    case "moon":
      return (
        <Path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      );

    case "grid":
      return (
        <>
          <Rect x="3" y="3" width="7" height="7" />
          <Rect x="14" y="3" width="7" height="7" />
          <Rect x="14" y="14" width="7" height="7" />
          <Rect x="3" y="14" width="7" height="7" />
        </>
      );

    case "list":
      return (
        <>
          <Line x1="8" y1="6" x2="21" y2="6" />
          <Line x1="8" y1="12" x2="21" y2="12" />
          <Line x1="8" y1="18" x2="21" y2="18" />
          <Line x1="3" y1="6" x2="3.01" y2="6" />
          <Line x1="3" y1="12" x2="3.01" y2="12" />
          <Line x1="3" y1="18" x2="3.01" y2="18" />
        </>
      );

    case "arrow-up-down":
      return (
        <>
          <Path d="m21 16-4 4-4-4" />
          <Path d="M17 20V4" />
          <Path d="m3 8 4-4 4 4" />
          <Path d="M7 4v16" />
        </>
      );

    case "skull":
      // Cute skull with X eyes - used for offline/dead state
      return (
        <>
          {/* Skull head shape */}
          <Path d="M12 2C8 2 4 5.6 4 10c0 2.5 1 4.5 2.5 6v4.5a1.5 1.5 0 0 0 1.5 1.5h8a1.5 1.5 0 0 0 1.5-1.5V16c1.5-1.5 2.5-3.5 2.5-6 0-4.4-4-8-8-8z" />
          {/* Left X eye */}
          <Line x1="7.5" y1="9" x2="10.5" y2="12" />
          <Line x1="10.5" y1="9" x2="7.5" y2="12" />
          {/* Right X eye */}
          <Line x1="13.5" y1="9" x2="16.5" y2="12" />
          <Line x1="16.5" y1="9" x2="13.5" y2="12" />
          {/* Nose hole */}
          <Path d="M12 14v2" />
          {/* Teeth lines */}
          <Line x1="9" y1="18" x2="9" y2="22" />
          <Line x1="12" y1="18" x2="12" y2="22" />
          <Line x1="15" y1="18" x2="15" y2="22" />
        </>
      );

    case "wifi-off":
      // Wifi disconnected - alternative offline indicator
      return (
        <>
          <Line x1="1" y1="1" x2="23" y2="23" />
          <Path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />
          <Path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />
          <Path d="M10.71 5.05A16 16 0 0 1 22.58 9" />
          <Path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />
          <Path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
          <Line x1="12" y1="20" x2="12.01" y2="20" />
        </>
      );

    case "trending-up":
      // Upward trend line - for area charts
      return (
        <Polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      );

    case "trending-down":
      // Downward trend line
      return (
        <Polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
      );

    case "activity":
      // Activity/pulse line - for line charts
      return (
        <Polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      );

    case "bar-chart-2":
      // Bar chart - for candlestick charts
      return (
        <>
          <Line x1="18" y1="20" x2="18" y2="10" />
          <Line x1="12" y1="20" x2="12" y2="4" />
          <Line x1="6" y1="20" x2="6" y2="14" />
        </>
      );

    case "zap":
      // Lightning bolt / zap
      return (
        <Path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      );

    case "layers":
      // Stacked layers
      return (
        <>
          <Path d="M12 2L2 7l10 5 10-5-10-5z" />
          <Polyline points="2 17 12 22 22 17" />
          <Polyline points="2 12 12 17 22 12" />
        </>
      );

    case "database":
      // Database cylinder
      return (
        <>
          <Path d="M12 2C6.48 2 2 4.24 2 7s4.48 5 10 5 10-2.24 10-5-4.48-5-10-5z" />
          <Path d="M2 7v10c0 2.76 4.48 5 10 5s10-2.24 10-5V7" />
          <Path d="M2 12c0 2.76 4.48 5 10 5s10-2.24 10-5" />
        </>
      );

    case "clock":
      // Clock face
      return (
        <>
          <Circle cx="12" cy="12" r="10" />
          <Polyline points="12 6 12 12 16 14" />
        </>
      );

    case "check-circle":
      // Checkmark in circle
      return (
        <>
          <Path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <Polyline points="22 4 12 14.01 9 11.01" />
        </>
      );

    case "coins":
      // Stack of coins - for crypto
      return (
        <>
          <Circle cx="8" cy="8" r="6" />
          <Path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
          <Line x1="7" y1="6" x2="7.01" y2="6" />
          <Line x1="9" y1="10" x2="9.01" y2="10" />
        </>
      );

    case "building-2":
      // Office building - for stocks
      return (
        <>
          <Path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
          <Path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
          <Path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
          <Path d="M10 6h4" />
          <Path d="M10 10h4" />
          <Path d="M10 14h4" />
          <Path d="M10 18h4" />
        </>
      );

    case "pie-chart":
      // Pie chart - for ETFs
      return (
        <>
          <Path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
          <Path d="M22 12A10 10 0 0 0 12 2v10z" />
        </>
      );

    case "power":
      // Power button - circle with line at top
      return (
        <>
          <Path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
          <Line x1="12" y1="2" x2="12" y2="12" />
        </>
      );

    case "turtle":
      // Turtle - slow mode indicator (Lucide icon)
      return (
        <>
          <Path d="m12 10 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a8 8 0 1 0-16 0v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3l2-4h4Z" />
          <Path d="M4.82 7.9 8 10" />
          <Path d="M15.18 7.9 12 10" />
          <Path d="M16.93 10H20a2 2 0 0 1 0 4H2" />
        </>
      );

    case "rabbit":
      // Rabbit - fast mode indicator (Lucide icon)
      return (
        <>
          <Path d="M13 16a3 3 0 0 1 2.24 5" />
          <Path d="M18 12h.01" />
          <Path d="M18 21h-8a4 4 0 0 1-4-4 7 7 0 0 1 7-7h.2L9.6 6.4a1 1 0 1 1 2.8-2.8L15.8 7h.2c3.3 0 6 2.7 6 6v1a2 2 0 0 1-2 2h-1a3 3 0 0 0-3 3" />
          <Path d="M20 8.54V4a2 2 0 1 0-4 0v3" />
          <Path d="M7.612 12.524a3 3 0 1 0-1.6 4.3" />
        </>
      );

    case "scale":
      // Balance scale - balanced mode indicator (Lucide icon)
      return (
        <>
          <Path d="M12 3v18" />
          <Path d="M19 8l3 8a5 5 0 0 1-6 0z" />
          <Path d="M5 8l-3 8a5 5 0 0 0 6 0z" />
          <Path d="M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1" />
          <Path d="M7 21h10" />
        </>
      );

    default:
      return null;
  }
}

const styles = StyleSheet.create({});
