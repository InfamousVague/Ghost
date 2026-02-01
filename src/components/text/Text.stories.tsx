import type { Meta, StoryObj } from "@storybook/react-vite";
import { View, StyleSheet } from "react-native";
import { Text } from "./Text";
import { TextAppearance, Size, Brightness } from "../../enums";

const meta: Meta<typeof Text> = {
  title: "Components/Text",
  component: Text,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    children: "Default text",
  },
};

export const Appearances: Story = {
  render: () => (
    <View style={styles.column}>
      <Text appearance={TextAppearance.Primary}>Primary - Main content</Text>
      <Text appearance={TextAppearance.Secondary}>Secondary - Supporting content</Text>
      <Text appearance={TextAppearance.Muted}>Muted - De-emphasized content</Text>
      <Text appearance={TextAppearance.Link}>Link - Interactive text</Text>
      <Text appearance={TextAppearance.Success}>Success - Positive message</Text>
      <Text appearance={TextAppearance.Warning}>Warning - Caution message</Text>
      <Text appearance={TextAppearance.Danger}>Danger - Error message</Text>
      <Text appearance={TextAppearance.Info}>Info - Informational message</Text>
    </View>
  ),
};

export const Sizes: Story = {
  render: () => (
    <View style={styles.column}>
      <Text size={Size.TwoXSmall}>2XS - Extra extra small</Text>
      <Text size={Size.ExtraSmall}>XS - Extra small</Text>
      <Text size={Size.Small}>Small - Compact text</Text>
      <Text size={Size.Medium}>Medium - Default size</Text>
      <Text size={Size.Large}>Large - Emphasized text</Text>
      <Text size={Size.ExtraLarge}>XL - Extra large</Text>
      <Text size={Size.TwoXLarge}>2XL - Headlines</Text>
    </View>
  ),
};

export const Weights: Story = {
  render: () => (
    <View style={styles.column}>
      <Text weight="regular">Regular weight</Text>
      <Text weight="medium">Medium weight</Text>
      <Text weight="semibold">Semibold weight</Text>
      <Text weight="bold">Bold weight</Text>
    </View>
  ),
};

export const GlowEffects: Story = {
  name: "Glow Effects",
  render: () => (
    <View style={styles.column}>
      <View style={styles.row}>
        <Text appearance={TextAppearance.Link} brightness={Brightness.None}>
          Link (No glow)
        </Text>
        <Text appearance={TextAppearance.Link} brightness={Brightness.Soft}>
          Link (Soft)
        </Text>
        <Text appearance={TextAppearance.Link} brightness={Brightness.Base}>
          Link (Base)
        </Text>
        <Text appearance={TextAppearance.Link} brightness={Brightness.Bright}>
          Link (Bright)
        </Text>
      </View>
      <View style={styles.row}>
        <Text appearance={TextAppearance.Success} brightness={Brightness.Base}>
          Success glow
        </Text>
        <Text appearance={TextAppearance.Warning} brightness={Brightness.Base}>
          Warning glow
        </Text>
        <Text appearance={TextAppearance.Danger} brightness={Brightness.Base}>
          Danger glow
        </Text>
        <Text appearance={TextAppearance.Info} brightness={Brightness.Base}>
          Info glow
        </Text>
      </View>
    </View>
  ),
};

export const Combined: Story = {
  render: () => (
    <View style={styles.column}>
      <Text
        appearance={TextAppearance.Link}
        size={Size.Large}
        weight="semibold"
        brightness={Brightness.Bright}
      >
        Large Glowing Link
      </Text>
      <Text
        appearance={TextAppearance.Success}
        size={Size.ExtraLarge}
        weight="bold"
        brightness={Brightness.Base}
      >
        Success Headline
      </Text>
      <Text
        appearance={TextAppearance.Muted}
        size={Size.Small}
        weight="regular"
      >
        Small muted caption text
      </Text>
    </View>
  ),
};

export const LayoutConsistency: Story = {
  name: "Layout Consistency (Glow doesn't affect spacing)",
  render: () => (
    <View style={styles.column}>
      <View style={styles.box}>
        <Text appearance={TextAppearance.Primary}>No glow text</Text>
      </View>
      <View style={styles.box}>
        <Text appearance={TextAppearance.Link} brightness={Brightness.Bright}>
          Bright glow text
        </Text>
      </View>
      <View style={styles.box}>
        <Text appearance={TextAppearance.Primary}>No glow text</Text>
      </View>
    </View>
  ),
};

export const Loading: Story = {
  name: "Loading State",
  render: () => (
    <View style={styles.column}>
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text size={Size.Medium} loading skeletonWidth={120}>
            Placeholder
          </Text>
        </View>
        <Text size={Size.Medium}>Loaded text</Text>
      </View>
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text size={Size.Large} loading skeletonWidth={180}>
            Placeholder
          </Text>
        </View>
        <Text size={Size.Large}>Large loaded text</Text>
      </View>
      <View style={styles.box}>
        <Text size={Size.Medium} loading skeletonLines={3}>
          Multi-line placeholder
        </Text>
      </View>
    </View>
  ),
};

const styles = StyleSheet.create({
  column: {
    gap: 16,
  },
  row: {
    flexDirection: "row",
    gap: 24,
    flexWrap: "wrap",
  },
  box: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: 12,
    borderRadius: 8,
  },
});
