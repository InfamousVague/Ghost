import React, { createContext, useContext } from "react";
import {
  View,
  StyleSheet,
  Platform,
  useWindowDimensions,
  type ViewStyle,
  type ViewProps,
} from "react-native";
import { LinearGradient } from "./LinearGradient";
import { Shape } from "../../enums";
import { getShapeRadius } from "../../helpers";
import { useThemeColors } from "../../context/ThemeContext";

const MOBILE_BREAKPOINT = 480;

/**
 * Context for cascading loading state to child components.
 */
export const LoadingContext = createContext<boolean>(false);

/**
 * Hook to check if parent component is in loading state.
 */
export function useLoading(): boolean {
  return useContext(LoadingContext);
}

/**
 * Border style variants for the Card component.
 */
export enum CardBorder {
  /** No visible border */
  None = "none",
  /** Solid subtle border */
  Solid = "solid",
  /** Gradient border with a shiny effect */
  Gradient = "gradient",
}

/**
 * Preset glow color options for the Card component.
 */
export enum CardGlow {
  /** Subtle silver/white glow */
  Silver = "silver",
  /** Tech blue glow */
  Blue = "blue",
  /** Violet purple glow */
  Purple = "purple",
  /** Teal green glow */
  Green = "green",
  /** Warm amber glow */
  Amber = "amber",
  /** Magenta pink glow */
  Pink = "pink",
  /** Red-pink coral glow */
  Coral = "coral",
  /** Aqua cyan glow */
  Cyan = "cyan",
  /** Multi-color aurora blend */
  Aurora = "aurora",
  /** Multi-color sunset blend */
  Sunset = "sunset",
}

/**
 * Card visual variant.
 */
export enum CardVariant {
  /** Default - same background as canvas (for fancy borders/glows) */
  Default = "default",
  /** Raised - slightly lighter background for simple cards */
  Raised = "raised",
  /** Surface - subtle background difference */
  Surface = "surface",
}

/**
 * Props for the Card component.
 */
export type CardProps = {
  /** Card content */
  children: React.ReactNode;
  /** Visual variant controlling background color */
  variant?: CardVariant;
  /** Border radius style */
  shape?: Shape;
  /** Border style */
  border?: CardBorder;
  /** Preset glow color */
  glow?: CardGlow;
  /** Seed for deterministic glow/border placement */
  seed?: number;
  /** Padding inside the card */
  padding?: number;
  /** Whether the card is in loading state (cascades to children) */
  loading?: boolean;
  /** Edge-to-edge on mobile: no padding, no border radius, no side borders */
  fullBleed?: boolean;
  /** Additional style overrides */
  style?: ViewStyle;
} & Omit<ViewProps, "style">;

/** Get background color by variant from theme colors */
function getVariantBackground(variant: CardVariant, themeColors: ReturnType<typeof useThemeColors>): string {
  switch (variant) {
    case CardVariant.Default:
      return themeColors.background.canvas;
    case CardVariant.Surface:
      return themeColors.background.surface;
    case CardVariant.Raised:
      return themeColors.background.raised;
    default:
      return themeColors.background.canvas;
  }
}

/** Border thickness for gradient borders */
const GRADIENT_BORDER_WIDTH = 2;

/**
 * Glow color definitions for each preset.
 */
const GLOW_COLORS: Record<CardGlow, { primary: string; secondary?: string; tertiary?: string }> = {
  [CardGlow.Silver]: { primary: "rgba(255, 255, 255, 0.20)" },
  [CardGlow.Blue]: { primary: "rgba(60, 130, 255, 0.26)" },
  [CardGlow.Purple]: { primary: "rgba(147, 51, 234, 0.26)" },
  [CardGlow.Green]: { primary: "rgba(34, 197, 94, 0.24)" },
  [CardGlow.Amber]: { primary: "rgba(251, 191, 36, 0.24)" },
  [CardGlow.Pink]: { primary: "rgba(236, 72, 153, 0.24)" },
  [CardGlow.Coral]: { primary: "rgba(251, 113, 133, 0.24)" },
  [CardGlow.Cyan]: { primary: "rgba(34, 211, 238, 0.24)" },
  [CardGlow.Aurora]: {
    primary: "rgba(34, 211, 238, 0.20)",
    secondary: "rgba(147, 51, 234, 0.16)",
    tertiary: "rgba(34, 197, 94, 0.14)",
  },
  [CardGlow.Sunset]: {
    primary: "rgba(251, 113, 133, 0.20)",
    secondary: "rgba(251, 191, 36, 0.16)",
    tertiary: "rgba(236, 72, 153, 0.14)",
  },
};

/**
 * Border gradient color definitions for each preset.
 */
const BORDER_COLORS: Record<CardGlow, string> = {
  [CardGlow.Silver]: "rgba(255, 255, 255, 0.28)",
  [CardGlow.Blue]: "rgba(60, 130, 255, 0.44)",
  [CardGlow.Purple]: "rgba(147, 51, 234, 0.38)",
  [CardGlow.Green]: "rgba(34, 197, 94, 0.36)",
  [CardGlow.Amber]: "rgba(251, 191, 36, 0.36)",
  [CardGlow.Pink]: "rgba(236, 72, 153, 0.36)",
  [CardGlow.Coral]: "rgba(251, 113, 133, 0.36)",
  [CardGlow.Cyan]: "rgba(34, 211, 238, 0.36)",
  [CardGlow.Aurora]: "rgba(34, 211, 238, 0.34)",
  [CardGlow.Sunset]: "rgba(251, 113, 133, 0.34)",
};

/**
 * A card component with organic glows and gradient borders.
 *
 * @example Basic with glow
 * ```tsx
 * <Card glow={CardGlow.Blue} border={CardBorder.Gradient}>
 *   <Text>Content</Text>
 * </Card>
 * ```
 */
export function Card({
  children,
  variant = CardVariant.Default,
  shape = Shape.Rounded,
  border = CardBorder.Solid,
  glow,
  seed,
  padding = 16,
  loading = false,
  fullBleed = false,
  style,
  ...props
}: CardProps) {
  const themeColors = useThemeColors();
  const { width } = useWindowDimensions();
  const isMobile = width <= MOBILE_BREAKPOINT;

  // Apply fullBleed adjustments on mobile
  const effectivePadding = fullBleed && isMobile ? 0 : padding;
  const effectiveBorderRadius = fullBleed && isMobile ? 0 : (parseFloat(getShapeRadius(shape)) || 12);
  const fullBleedBorderStyle: ViewStyle = fullBleed && isMobile
    ? { borderLeftWidth: 0, borderRightWidth: 0 }
    : {};

  const borderRadius = effectiveBorderRadius;
  const backgroundColor = getVariantBackground(variant, themeColors);
  const borderSubtle = themeColors.border.subtle;

  // Get aligned glow config (position + matching border gradient)
  const glowConfig = getGlowConfig(seed);

  // Build glow gradient string
  const glowGradient = glow ? buildGlowGradient(glow, glowConfig.position, seed) : null;
  const borderGradientColor = glow ? BORDER_COLORS[glow] : "rgba(255, 255, 255, 0.12)";

  // Base card style
  const cardStyle: ViewStyle = {
    backgroundColor,
    borderRadius,
    padding: effectivePadding,
    overflow: "hidden",
    ...fullBleedBorderStyle,
    ...style,
  };

  // Solid border style
  const solidBorderStyle: ViewStyle = {
    borderWidth: 1,
    borderColor: borderSubtle,
  };

  // For gradient borders
  if (border === CardBorder.Gradient) {
    const gradientStyle: ViewStyle = {
      padding: GRADIENT_BORDER_WIDTH,
      borderRadius: borderRadius + GRADIENT_BORDER_WIDTH,
    };

    return (
      <LoadingContext.Provider value={loading}>
        <View style={styles.gradientWrapper} {...props}>
          <LinearGradient
            colors={[borderGradientColor, "transparent"]}
            locations={[0, 0.3]}
            start={glowConfig.gradientStart}
            end={glowConfig.gradientEnd}
            style={gradientStyle}
          >
            <View style={cardStyle}>
              {glowGradient && (
                <GlowOverlay gradient={glowGradient} borderRadius={borderRadius} />
              )}
              <View style={styles.contentWrapper}>{children}</View>
            </View>
          </LinearGradient>
        </View>
      </LoadingContext.Provider>
    );
  }

  // No border or solid border
  return (
    <LoadingContext.Provider value={loading}>
      <View
        style={[cardStyle, border === CardBorder.Solid && solidBorderStyle]}
        {...props}
      >
        {glowGradient && (
          <GlowOverlay gradient={glowGradient} borderRadius={borderRadius} />
        )}
        <View style={styles.contentWrapper}>{children}</View>
      </View>
    </LoadingContext.Provider>
  );
}

/**
 * Build CSS gradient string for glow effect.
 */
function buildGlowGradient(glow: CardGlow, primaryPos: GlowPosition, seed?: number): string {
  const colors = GLOW_COLORS[glow];
  const gradients: string[] = [];

  // Primary glow - uses the aligned position
  gradients.push(
    `radial-gradient(ellipse 120% 100% at ${primaryPos.x} ${primaryPos.y}, ${colors.primary} 0%, transparent 50%)`
  );

  // Secondary glow (for multi-color presets) - offset from primary
  if (colors.secondary) {
    const secondaryConfig = getGlowConfig(seed !== undefined ? seed + 50 : undefined);
    gradients.push(
      `radial-gradient(ellipse 100% 80% at ${secondaryConfig.position.x} ${secondaryConfig.position.y}, ${colors.secondary} 0%, transparent 50%)`
    );
  }

  // Tertiary glow (for multi-color presets) - offset from primary
  if (colors.tertiary) {
    const tertiaryConfig = getGlowConfig(seed !== undefined ? seed + 100 : undefined);
    gradients.push(
      `radial-gradient(ellipse 80% 70% at ${tertiaryConfig.position.x} ${tertiaryConfig.position.y}, ${colors.tertiary} 0%, transparent 50%)`
    );
  }

  return gradients.join(", ");
}

/**
 * Simple seeded random number generator.
 */
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

type GlowPosition = { x: string; y: string };

/**
 * Glow configurations - each entry has a glow position and opposite border gradient points.
 * The border gradient originates from the opposite side to create a glass refraction effect.
 * Positions favor corners but aren't perfectly centered on them.
 */
const GLOW_CONFIGS: Array<{
  position: GlowPosition;
  gradientStart: { x: number; y: number };
  gradientEnd: { x: number; y: number };
}> = [
  // Top-left corner glow -> bottom-right border shine
  { position: { x: "-10%", y: "-10%" }, gradientStart: { x: 1, y: 1 }, gradientEnd: { x: 0, y: 0 } },
  // Top-left leaning upper -> bottom-right border shine
  { position: { x: "-8%", y: "20%" }, gradientStart: { x: 1, y: 0.8 }, gradientEnd: { x: 0, y: 0.2 } },
  // Top-right corner glow -> bottom-left border shine
  { position: { x: "110%", y: "-10%" }, gradientStart: { x: 0, y: 1 }, gradientEnd: { x: 1, y: 0 } },
  // Top-right leaning upper -> bottom-left border shine
  { position: { x: "108%", y: "25%" }, gradientStart: { x: 0, y: 0.75 }, gradientEnd: { x: 1, y: 0.25 } },
  // Bottom-left corner glow -> top-right border shine
  { position: { x: "-10%", y: "110%" }, gradientStart: { x: 1, y: 0 }, gradientEnd: { x: 0, y: 1 } },
  // Bottom-left leaning lower -> top-right border shine
  { position: { x: "-8%", y: "80%" }, gradientStart: { x: 1, y: 0.2 }, gradientEnd: { x: 0, y: 0.8 } },
  // Bottom-right corner glow -> top-left border shine
  { position: { x: "110%", y: "110%" }, gradientStart: { x: 0, y: 0 }, gradientEnd: { x: 1, y: 1 } },
  // Bottom-right leaning lower -> top-left border shine
  { position: { x: "108%", y: "75%" }, gradientStart: { x: 0, y: 0.25 }, gradientEnd: { x: 1, y: 0.75 } },
];

/**
 * Get aligned glow config based on seed.
 */
function getGlowConfig(seed?: number): typeof GLOW_CONFIGS[0] {
  const index = seed !== undefined
    ? Math.floor(seededRandom(seed) * GLOW_CONFIGS.length)
    : Math.floor(Math.random() * GLOW_CONFIGS.length);
  return GLOW_CONFIGS[index];
}

/**
 * Renders the inner glow effect.
 */
function GlowOverlay({
  gradient,
  borderRadius,
}: {
  gradient: string;
  borderRadius: number;
}) {
  if (Platform.OS !== "web") {
    // Simplified glow for native
    return (
      <View
        style={[
          styles.glowNative,
          { borderRadius },
        ]}
      />
    );
  }

  return (
    <View
      style={[
        styles.glowOverlay,
        {
          borderRadius,
          // @ts-expect-error - Web-specific style
          background: gradient,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  gradientWrapper: {},
  contentWrapper: {
    position: "relative",
    zIndex: 1,
    flex: 1,
  },
  glowOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: "none",
  },
  glowNative: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 20,
    borderColor: "rgba(255, 255, 255, 0.05)",
    opacity: 0.3,
  },
});
