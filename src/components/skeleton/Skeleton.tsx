import React, { useEffect, useRef } from "react";
import {
  View,
  Animated,
  StyleSheet,
  Platform,
  type ViewStyle,
} from "react-native";
import { Colors } from "../../tokens";
import { Shape } from "../../enums";
import { getShapeRadius } from "../../helpers";

const SKELETON_BG = Colors.background.raised;

/**
 * Props for the Skeleton component.
 */
export type SkeletonProps = {
  /** Width of the skeleton */
  width: number | string;
  /** Height of the skeleton */
  height: number | string;
  /** Border radius style */
  shape?: Shape;
  /** Custom border radius (overrides shape) */
  borderRadius?: number;
  /** Animation duration in milliseconds */
  duration?: number;
  /** Additional style overrides */
  style?: ViewStyle;
};

/**
 * A skeleton loading placeholder with subtle pulse animation.
 *
 * @remarks
 * The Skeleton component displays a subtle pulsing placeholder that
 * gently brightens and dims to indicate loading state.
 *
 * @example Basic usage
 * ```tsx
 * <Skeleton width={200} height={24} />
 * ```
 *
 * @example With shape
 * ```tsx
 * <Skeleton width={100} height={40} shape={Shape.Pill} />
 * ```
 */
export function Skeleton({
  width,
  height,
  shape = Shape.Rounded,
  borderRadius: customBorderRadius,
  duration = 2000,
  style,
}: SkeletonProps) {
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: duration / 2,
          useNativeDriver: Platform.OS !== "web",
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: duration / 2,
          useNativeDriver: Platform.OS !== "web",
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [pulseAnim, duration]);

  const borderRadius =
    customBorderRadius !== undefined
      ? customBorderRadius
      : parseFloat(getShapeRadius(shape)) || 8;

  const containerStyle: ViewStyle = {
    width: width as ViewStyle["width"],
    height: height as ViewStyle["height"],
    borderRadius,
    backgroundColor: SKELETON_BG,
    overflow: "hidden",
    ...style,
  };

  // For web, use CSS animation with global keyframes
  if (Platform.OS === "web") {
    return (
      <View style={containerStyle}>
        <View
          style={[
            styles.pulseLayer,
            {
              animationName: "skeleton-pulse",
              animationDuration: `${duration}ms`,
              animationIterationCount: "infinite",
              animationTimingFunction: "ease-in-out",
            } as any,
          ]}
        />
      </View>
    );
  }

  // Native implementation
  const opacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.08],
  });

  return (
    <View style={containerStyle}>
      <Animated.View
        style={[
          styles.nativePulse,
          { opacity },
        ]}
      />
    </View>
  );
}

/**
 * Props for the TextSkeleton component.
 */
export type TextSkeletonProps = {
  /** Number of lines to show */
  lines?: number;
  /** Width of the last line (percentage or number) */
  lastLineWidth?: number | string;
  /** Line height matching the text size */
  lineHeight: number;
  /** Font size for accurate height calculation */
  fontSize: number;
  /** Gap between lines */
  gap?: number;
  /** Animation duration in milliseconds */
  duration?: number;
  /** Additional style overrides */
  style?: ViewStyle;
};

/**
 * A skeleton specifically designed for text loading states.
 *
 * @example
 * ```tsx
 * <TextSkeleton lineHeight={24} fontSize={16} lines={3} lastLineWidth="60%" />
 * ```
 */
export function TextSkeleton({
  lines = 1,
  lastLineWidth = "60%",
  lineHeight,
  fontSize,
  gap = 8,
  duration = 2000,
  style,
}: TextSkeletonProps) {
  const skeletonHeight = fontSize * 0.75;

  return (
    <View style={[{ gap }, style]}>
      {Array.from({ length: lines }).map((_, index) => (
        <View
          key={index}
          style={{
            height: lineHeight,
            justifyContent: "center",
          }}
        >
          <Skeleton
            width={index === lines - 1 && lines > 1 ? lastLineWidth : "100%"}
            height={skeletonHeight}
            shape={Shape.Soft}
            duration={duration}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  pulseLayer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
  },
  nativePulse: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
});
