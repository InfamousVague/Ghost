/**
 * Tour Indicator Components
 *
 * Various indicator styles for onboarding tours and feature discovery.
 */

import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Platform, Easing } from "react-native";
import { Text } from "../text/Text";
import { Icon } from "../icon/Icon";
import { Size, TextAppearance } from "../../enums";

// ============================================================================
// PULSE INDICATOR - Simple pulsing dot
// ============================================================================

type PulseIndicatorProps = {
  /** Size of the indicator */
  size?: Size;
  /** Color of the pulse */
  color?: string;
  /** Whether the indicator is active */
  active?: boolean;
};

export function PulseIndicator({
  size = Size.Small,
  color = "#A78BFA",
  active = true,
}: PulseIndicatorProps) {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const sizeMap: Record<Size, number> = {
    [Size.TwoXSmall]: 6,
    [Size.ExtraSmall]: 8,
    [Size.Small]: 10,
    [Size.Medium]: 12,
    [Size.Large]: 14,
    [Size.ExtraLarge]: 16,
    [Size.TwoXLarge]: 20,
  };

  const dotSize = sizeMap[size] || 10;

  useEffect(() => {
    if (!active) return;

    const pulse = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(pulseAnim, {
            toValue: 2,
            duration: 1000,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0,
            duration: 1000,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 0,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    pulse.start();
    return () => pulse.stop();
  }, [active, pulseAnim, opacityAnim]);

  if (!active) return null;

  return (
    <View style={[styles.pulseContainer, { width: dotSize * 3, height: dotSize * 3 }]}>
      {/* Pulse ring */}
      <Animated.View
        style={[
          styles.pulseRing,
          {
            width: dotSize,
            height: dotSize,
            borderRadius: dotSize / 2,
            borderColor: color,
            transform: [{ scale: pulseAnim }],
            opacity: opacityAnim,
          },
        ]}
      />
      {/* Center dot */}
      <View
        style={[
          styles.pulseDot,
          {
            width: dotSize,
            height: dotSize,
            borderRadius: dotSize / 2,
            backgroundColor: color,
          },
        ]}
      />
    </View>
  );
}

// ============================================================================
// BEACON INDICATOR - Rippling beacon effect
// ============================================================================

type BeaconIndicatorProps = {
  /** Size of the indicator */
  size?: Size;
  /** Color of the beacon */
  color?: string;
  /** Whether the indicator is active */
  active?: boolean;
  /** Number of ripple rings */
  rings?: number;
};

export function BeaconIndicator({
  size = Size.Medium,
  color = "#A78BFA",
  active = true,
  rings = 3,
}: BeaconIndicatorProps) {
  const animations = useRef(
    Array.from({ length: rings }, () => ({
      scale: new Animated.Value(1),
      opacity: new Animated.Value(0.6),
    }))
  ).current;

  const sizeMap: Record<Size, number> = {
    [Size.TwoXSmall]: 16,
    [Size.ExtraSmall]: 20,
    [Size.Small]: 24,
    [Size.Medium]: 32,
    [Size.Large]: 40,
    [Size.ExtraLarge]: 48,
    [Size.TwoXLarge]: 56,
  };

  const beaconSize = sizeMap[size] || 32;
  const dotSize = beaconSize * 0.3;

  useEffect(() => {
    if (!active) return;

    const animationSequences = animations.map((anim, index) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(index * 400),
          Animated.parallel([
            Animated.timing(anim.scale, {
              toValue: 3,
              duration: 1200,
              easing: Easing.out(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(anim.opacity, {
              toValue: 0,
              duration: 1200,
              easing: Easing.out(Easing.ease),
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(anim.scale, {
              toValue: 1,
              duration: 0,
              useNativeDriver: true,
            }),
            Animated.timing(anim.opacity, {
              toValue: 0.6,
              duration: 0,
              useNativeDriver: true,
            }),
          ]),
        ])
      );
    });

    animationSequences.forEach((anim) => anim.start());
    return () => animationSequences.forEach((anim) => anim.stop());
  }, [active, animations]);

  if (!active) return null;

  return (
    <View style={[styles.beaconContainer, { width: beaconSize * 3, height: beaconSize * 3 }]}>
      {/* Ripple rings */}
      {animations.map((anim, index) => (
        <Animated.View
          key={index}
          style={[
            styles.beaconRing,
            {
              width: beaconSize,
              height: beaconSize,
              borderRadius: beaconSize / 2,
              backgroundColor: color,
              transform: [{ scale: anim.scale }],
              opacity: anim.opacity,
            },
          ]}
        />
      ))}
      {/* Center dot */}
      <View
        style={[
          styles.beaconDot,
          {
            width: dotSize,
            height: dotSize,
            borderRadius: dotSize / 2,
            backgroundColor: color,
          },
        ]}
      />
    </View>
  );
}

// ============================================================================
// HOTSPOT INDICATOR - Exclamation point with pulse
// ============================================================================

type HotspotIndicatorProps = {
  /** Size of the indicator */
  size?: Size;
  /** Color of the hotspot */
  color?: string;
  /** Whether the indicator is active */
  active?: boolean;
  /** Icon to show (default: exclamation) */
  icon?: "!" | "?" | "i" | "new";
};

export function HotspotIndicator({
  size = Size.Medium,
  color = "#A78BFA",
  active = true,
  icon = "!",
}: HotspotIndicatorProps) {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0.3)).current;

  const sizeMap: Record<Size, number> = {
    [Size.TwoXSmall]: 16,
    [Size.ExtraSmall]: 20,
    [Size.Small]: 24,
    [Size.Medium]: 28,
    [Size.Large]: 32,
    [Size.ExtraLarge]: 40,
    [Size.TwoXLarge]: 48,
  };

  const hotspotSize = sizeMap[size] || 28;
  const fontSize = hotspotSize * 0.5;

  useEffect(() => {
    if (!active) return;

    const pulse = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(pulseAnim, {
            toValue: 1.15,
            duration: 600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: 0.6,
            duration: 600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: 0.3,
            duration: 600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    pulse.start();
    return () => pulse.stop();
  }, [active, pulseAnim, glowAnim]);

  if (!active) return null;

  const displayText = icon === "new" ? "NEW" : icon;

  return (
    <Animated.View
      style={[
        styles.hotspotContainer,
        {
          width: hotspotSize,
          height: hotspotSize,
          borderRadius: hotspotSize / 2,
          backgroundColor: color,
          transform: [{ scale: pulseAnim }],
          ...(Platform.OS === "web" && {
            boxShadow: `0 0 ${hotspotSize * 0.5}px ${color}`,
          }),
        },
      ]}
    >
      <Animated.View
        style={[
          styles.hotspotGlow,
          {
            width: hotspotSize,
            height: hotspotSize,
            borderRadius: hotspotSize / 2,
            backgroundColor: color,
            opacity: glowAnim,
            transform: [{ scale: 1.5 }],
          },
        ]}
      />
      <Text
        size={icon === "new" ? Size.TwoXSmall : Size.Small}
        weight="bold"
        style={[styles.hotspotText, { fontSize: icon === "new" ? fontSize * 0.6 : fontSize }]}
      >
        {displayText}
      </Text>
    </Animated.View>
  );
}

// ============================================================================
// BADGE INDICATOR - Numbered badge
// ============================================================================

type BadgeIndicatorProps = {
  /** Number to display (0 shows dot only) */
  count?: number;
  /** Size of the badge */
  size?: Size;
  /** Color of the badge */
  color?: string;
  /** Whether to animate */
  animate?: boolean;
  /** Max number to display before showing "9+" */
  max?: number;
};

export function BadgeIndicator({
  count = 1,
  size = Size.Small,
  color = "#EF4444",
  animate = true,
  max = 9,
}: BadgeIndicatorProps) {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(1)).current;

  const sizeMap: Record<Size, { height: number; minWidth: number; fontSize: number }> = {
    [Size.TwoXSmall]: { height: 14, minWidth: 14, fontSize: 9 },
    [Size.ExtraSmall]: { height: 16, minWidth: 16, fontSize: 10 },
    [Size.Small]: { height: 18, minWidth: 18, fontSize: 11 },
    [Size.Medium]: { height: 20, minWidth: 20, fontSize: 12 },
    [Size.Large]: { height: 24, minWidth: 24, fontSize: 14 },
    [Size.ExtraLarge]: { height: 28, minWidth: 28, fontSize: 16 },
    [Size.TwoXLarge]: { height: 32, minWidth: 32, fontSize: 18 },
  };

  const { height, minWidth, fontSize } = sizeMap[size] || sizeMap[Size.Small];

  useEffect(() => {
    // Entry animation
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      tension: 100,
      useNativeDriver: true,
    }).start();
  }, [scaleAnim]);

  useEffect(() => {
    if (!animate) return;

    // Bounce animation on count change
    Animated.sequence([
      Animated.timing(bounceAnim, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(bounceAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();
  }, [count, animate, bounceAnim]);

  const displayText = count > max ? `${max}+` : count.toString();
  const showNumber = count > 0;

  return (
    <Animated.View
      style={[
        styles.badgeContainer,
        {
          height,
          minWidth: showNumber ? minWidth : height * 0.6,
          borderRadius: height / 2,
          backgroundColor: color,
          transform: [{ scale: Animated.multiply(scaleAnim, bounceAnim) }],
          paddingHorizontal: showNumber ? 4 : 0,
        },
      ]}
    >
      {showNumber && (
        <Text weight="bold" style={[styles.badgeText, { fontSize, color: "#FFFFFF" }]}>
          {displayText}
        </Text>
      )}
    </Animated.View>
  );
}

// ============================================================================
// SPOTLIGHT RING - Animated ring around element
// ============================================================================

type SpotlightRingProps = {
  /** Size of the ring (diameter) */
  size?: number;
  /** Color of the ring */
  color?: string;
  /** Whether the indicator is active */
  active?: boolean;
  /** Ring thickness */
  thickness?: number;
};

export function SpotlightRing({
  size = 60,
  color = "#A78BFA",
  active = true,
  thickness = 2,
}: SpotlightRingProps) {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!active) return;

    const rotate = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    rotate.start();
    pulse.start();

    return () => {
      rotate.stop();
      pulse.stop();
    };
  }, [active, rotateAnim, pulseAnim]);

  if (!active) return null;

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View
      style={[
        styles.spotlightRing,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: thickness,
          borderColor: color,
          borderStyle: "dashed",
          transform: [{ rotate: rotation }, { scale: pulseAnim }],
        },
      ]}
    />
  );
}

// ============================================================================
// TOOLTIP ARROW - Arrow pointer for tooltips
// ============================================================================

type TooltipArrowProps = {
  /** Direction the arrow points */
  direction: "up" | "down" | "left" | "right";
  /** Size of the arrow */
  size?: number;
  /** Color of the arrow */
  color?: string;
};

export function TooltipArrow({
  direction,
  size = 10,
  color = "#1B2233",
}: TooltipArrowProps) {
  const getArrowStyle = () => {
    const base = {
      width: 0,
      height: 0,
      backgroundColor: "transparent",
      borderStyle: "solid" as const,
    };

    switch (direction) {
      case "up":
        return {
          ...base,
          borderLeftWidth: size,
          borderRightWidth: size,
          borderBottomWidth: size,
          borderLeftColor: "transparent",
          borderRightColor: "transparent",
          borderBottomColor: color,
        };
      case "down":
        return {
          ...base,
          borderLeftWidth: size,
          borderRightWidth: size,
          borderTopWidth: size,
          borderLeftColor: "transparent",
          borderRightColor: "transparent",
          borderTopColor: color,
        };
      case "left":
        return {
          ...base,
          borderTopWidth: size,
          borderBottomWidth: size,
          borderRightWidth: size,
          borderTopColor: "transparent",
          borderBottomColor: "transparent",
          borderRightColor: color,
        };
      case "right":
        return {
          ...base,
          borderTopWidth: size,
          borderBottomWidth: size,
          borderLeftWidth: size,
          borderTopColor: "transparent",
          borderBottomColor: "transparent",
          borderLeftColor: color,
        };
    }
  };

  return <View style={getArrowStyle()} />;
}

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  // Pulse Indicator
  pulseContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  pulseRing: {
    position: "absolute",
    borderWidth: 2,
  },
  pulseDot: {},

  // Beacon Indicator
  beaconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  beaconRing: {
    position: "absolute",
  },
  beaconDot: {},

  // Hotspot Indicator
  hotspotContainer: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
  },
  hotspotGlow: {
    position: "absolute",
  },
  hotspotText: {
    color: "#FFFFFF",
    textAlign: "center",
  },

  // Badge Indicator
  badgeContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    textAlign: "center",
    lineHeight: 14,
  },

  // Spotlight Ring
  spotlightRing: {
    position: "absolute",
  },
});
