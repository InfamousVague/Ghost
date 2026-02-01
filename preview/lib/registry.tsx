import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "ghost/components/button/Button";
import { Card, CardBorder, CardGlow } from "ghost/components/card/Card";
import { Appearance, Size, Shape, Brightness } from "ghost/enums";

/**
 * Component variant configuration
 */
export type ComponentVariant = {
  name: string;
  render: () => React.ReactNode;
};

/**
 * Component entry in the registry
 */
export type ComponentEntry = {
  name: string;
  description: string;
  variants: ComponentVariant[];
};

/**
 * Category containing multiple components
 */
export type ComponentCategory = {
  name: string;
  slug: string;
  icon: string;
  description: string;
  components: ComponentEntry[];
};

/**
 * Registry of all Ghost UI components organized by category.
 * Add new components here as they are created.
 */
export const componentRegistry: ComponentCategory[] = [
  {
    name: "Actions",
    slug: "actions",
    icon: "cursor-click",
    description: "Interactive components for user actions",
    components: [
      {
        name: "Button",
        description: "A customizable button with multiple appearances, sizes, and shapes",
        variants: [
          // Appearances
          {
            name: "Appearances",
            render: () => (
              <View style={styles.variantGroup}>
                <Text style={styles.variantLabel}>Appearances</Text>
                <View style={styles.row}>
                  <Button label="Primary" appearance={Appearance.Primary} />
                </View>
                <View style={styles.row}>
                  <Button label="Secondary" appearance={Appearance.Secondary} />
                </View>
                <View style={styles.row}>
                  <Button label="Success" appearance={Appearance.Success} />
                </View>
                <View style={styles.row}>
                  <Button label="Warning" appearance={Appearance.Warning} />
                </View>
                <View style={styles.row}>
                  <Button label="Danger" appearance={Appearance.Danger} />
                </View>
                <View style={styles.row}>
                  <Button label="Info" appearance={Appearance.Info} />
                </View>
                <View style={styles.row}>
                  <Button label="Ghost" appearance={Appearance.Ghost} />
                </View>
              </View>
            ),
          },
          // Sizes
          {
            name: "Sizes",
            render: () => (
              <View style={styles.variantGroup}>
                <Text style={styles.variantLabel}>Sizes</Text>
                <View style={styles.row}>
                  <Button label="2XS" size={Size.TwoXSmall} />
                </View>
                <View style={styles.row}>
                  <Button label="XS" size={Size.ExtraSmall} />
                </View>
                <View style={styles.row}>
                  <Button label="Small" size={Size.Small} />
                </View>
                <View style={styles.row}>
                  <Button label="Medium" size={Size.Medium} />
                </View>
                <View style={styles.row}>
                  <Button label="Large" size={Size.Large} />
                </View>
                <View style={styles.row}>
                  <Button label="XL" size={Size.ExtraLarge} />
                </View>
                <View style={styles.row}>
                  <Button label="2XL" size={Size.TwoXLarge} />
                </View>
              </View>
            ),
          },
          // Shapes
          {
            name: "Shapes",
            render: () => (
              <View style={styles.variantGroup}>
                <Text style={styles.variantLabel}>Shapes</Text>
                <View style={styles.row}>
                  <Button label="Soft" shape={Shape.Soft} />
                </View>
                <View style={styles.row}>
                  <Button label="Rounded" shape={Shape.Rounded} />
                </View>
                <View style={styles.row}>
                  <Button label="Pill" shape={Shape.Pill} />
                </View>
                <View style={styles.row}>
                  <Button label="Circle" shape={Shape.Circle} />
                </View>
              </View>
            ),
          },
          // Brightness
          {
            name: "Brightness",
            render: () => (
              <View style={styles.variantGroup}>
                <Text style={styles.variantLabel}>Brightness (Glow)</Text>
                <View style={styles.row}>
                  <Button label="None" brightness={Brightness.None} />
                </View>
                <View style={styles.row}>
                  <Button label="Soft" brightness={Brightness.Soft} />
                </View>
                <View style={styles.row}>
                  <Button label="Base" brightness={Brightness.Base} />
                </View>
                <View style={styles.row}>
                  <Button label="Bright" brightness={Brightness.Bright} />
                </View>
              </View>
            ),
          },
          // States
          {
            name: "States",
            render: () => (
              <View style={styles.variantGroup}>
                <Text style={styles.variantLabel}>States</Text>
                <View style={styles.row}>
                  <Button label="Enabled" />
                </View>
                <View style={styles.row}>
                  <Button label="Disabled" disabled />
                </View>
              </View>
            ),
          },
        ],
      },
    ],
  },
  // Future categories
  {
    name: "Forms",
    slug: "forms",
    icon: "document-text",
    description: "Input components for data collection",
    components: [],
  },
  {
    name: "Layout",
    slug: "layout",
    icon: "view-grid",
    description: "Structural components for page layout",
    components: [
      {
        name: "Card",
        description: "A versatile container with glows, gradients, and shiny borders",
        variants: [
          {
            name: "Glow Presets",
            render: () => (
              <View style={styles.variantGroup}>
                <Text style={styles.variantLabel}>Natural Glow Colors</Text>
                <View style={styles.cardRow}>
                  <Card border={CardBorder.Gradient} glow={CardGlow.Blue} style={styles.cardDemo}>
                    <Text style={styles.cardTitle}>Blue</Text>
                    <Text style={styles.cardSubtitle}>Tech blue glow</Text>
                  </Card>
                </View>
                <View style={styles.cardRow}>
                  <Card border={CardBorder.Gradient} glow={CardGlow.Purple} style={styles.cardDemo}>
                    <Text style={styles.cardTitle}>Purple</Text>
                    <Text style={styles.cardSubtitle}>Violet glow</Text>
                  </Card>
                </View>
                <View style={styles.cardRow}>
                  <Card border={CardBorder.Gradient} glow={CardGlow.Green} style={styles.cardDemo}>
                    <Text style={styles.cardTitle}>Green</Text>
                    <Text style={styles.cardSubtitle}>Teal glow</Text>
                  </Card>
                </View>
                <View style={styles.cardRow}>
                  <Card border={CardBorder.Gradient} glow={CardGlow.Amber} style={styles.cardDemo}>
                    <Text style={styles.cardTitle}>Amber</Text>
                    <Text style={styles.cardSubtitle}>Warm glow</Text>
                  </Card>
                </View>
                <View style={styles.cardRow}>
                  <Card border={CardBorder.Gradient} glow={CardGlow.Pink} style={styles.cardDemo}>
                    <Text style={styles.cardTitle}>Pink</Text>
                    <Text style={styles.cardSubtitle}>Magenta glow</Text>
                  </Card>
                </View>
                <View style={styles.cardRow}>
                  <Card border={CardBorder.Gradient} glow={CardGlow.Cyan} style={styles.cardDemo}>
                    <Text style={styles.cardTitle}>Cyan</Text>
                    <Text style={styles.cardSubtitle}>Aqua glow</Text>
                  </Card>
                </View>
              </View>
            ),
          },
          {
            name: "Multi-Color Glows",
            render: () => (
              <View style={styles.variantGroup}>
                <Text style={styles.variantLabel}>Gradient Blends</Text>
                <View style={styles.cardRow}>
                  <Card border={CardBorder.Gradient} glow={CardGlow.Aurora} style={styles.cardDemo}>
                    <Text style={styles.cardTitle}>Aurora</Text>
                    <Text style={styles.cardSubtitle}>Cyan, purple, green</Text>
                  </Card>
                </View>
                <View style={styles.cardRow}>
                  <Card border={CardBorder.Gradient} glow={CardGlow.Sunset} style={styles.cardDemo}>
                    <Text style={styles.cardTitle}>Sunset</Text>
                    <Text style={styles.cardSubtitle}>Coral, amber, pink</Text>
                  </Card>
                </View>
              </View>
            ),
          },
          {
            name: "Seeded Positions",
            render: () => (
              <View style={styles.variantGroup}>
                <Text style={styles.variantLabel}>Deterministic Placement</Text>
                <View style={styles.cardRow}>
                  <Card border={CardBorder.Gradient} glow={CardGlow.Blue} seed={1} style={styles.cardDemo}>
                    <Text style={styles.cardTitle}>Seed: 1</Text>
                    <Text style={styles.cardSubtitle}>Consistent position</Text>
                  </Card>
                </View>
                <View style={styles.cardRow}>
                  <Card border={CardBorder.Gradient} glow={CardGlow.Blue} seed={42} style={styles.cardDemo}>
                    <Text style={styles.cardTitle}>Seed: 42</Text>
                    <Text style={styles.cardSubtitle}>Different position</Text>
                  </Card>
                </View>
              </View>
            ),
          },
        ],
      },
    ],
  },
  {
    name: "Feedback",
    slug: "feedback",
    icon: "information-circle",
    description: "Components for user feedback and notifications",
    components: [],
  },
  {
    name: "Navigation",
    slug: "navigation",
    icon: "menu",
    description: "Components for app navigation",
    components: [],
  },
  {
    name: "Data Display",
    slug: "data-display",
    icon: "table",
    description: "Components for displaying data and content",
    components: [],
  },
];

/**
 * Get a category by its slug
 */
export function getCategoryBySlug(slug: string): ComponentCategory | undefined {
  return componentRegistry.find((cat) => cat.slug === slug);
}

/**
 * Get all categories with at least one component
 */
export function getActiveCategories(): ComponentCategory[] {
  return componentRegistry.filter((cat) => cat.components.length > 0);
}

/**
 * Get all categories (including empty ones for future use)
 */
export function getAllCategories(): ComponentCategory[] {
  return componentRegistry;
}

const styles = StyleSheet.create({
  variantGroup: {
    marginBottom: 24,
  },
  variantLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#888888",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  row: {
    marginBottom: 12,
    alignItems: "flex-start",
  },
  cardRow: {
    marginBottom: 16,
  },
  cardDemo: {
    minWidth: 280,
  },
  cardTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  cardSubtitle: {
    color: "#888888",
    fontSize: 14,
    marginTop: 4,
  },
});
