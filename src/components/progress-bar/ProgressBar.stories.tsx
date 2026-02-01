import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { View, StyleSheet } from "react-native";
import { ProgressBar } from "./ProgressBar";
import { Text } from "../text/Text";
import { TextAppearance, Size, Brightness } from "../../enums";

const meta: Meta<typeof ProgressBar> = {
  title: "Components/ProgressBar",
  component: ProgressBar,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  render: () => (
    <View style={styles.container}>
      <ProgressBar value={65} max={100} />
    </View>
  ),
};

export const Values: Story = {
  render: () => (
    <View style={styles.column}>
      <View style={styles.item}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>0%</Text>
        <ProgressBar value={0} max={100} />
      </View>
      <View style={styles.item}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>25%</Text>
        <ProgressBar value={25} max={100} />
      </View>
      <View style={styles.item}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>50%</Text>
        <ProgressBar value={50} max={100} />
      </View>
      <View style={styles.item}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>75%</Text>
        <ProgressBar value={75} max={100} />
      </View>
      <View style={styles.item}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>100%</Text>
        <ProgressBar value={100} max={100} />
      </View>
    </View>
  ),
};

export const Appearances: Story = {
  render: () => (
    <View style={styles.column}>
      <View style={styles.item}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>Primary</Text>
        <ProgressBar value={65} appearance={TextAppearance.Primary} />
      </View>
      <View style={styles.item}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>Link</Text>
        <ProgressBar value={65} appearance={TextAppearance.Link} />
      </View>
      <View style={styles.item}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>Success</Text>
        <ProgressBar value={65} appearance={TextAppearance.Success} />
      </View>
      <View style={styles.item}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>Warning</Text>
        <ProgressBar value={65} appearance={TextAppearance.Warning} />
      </View>
      <View style={styles.item}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>Danger</Text>
        <ProgressBar value={65} appearance={TextAppearance.Danger} />
      </View>
      <View style={styles.item}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>Info</Text>
        <ProgressBar value={65} appearance={TextAppearance.Info} />
      </View>
    </View>
  ),
};

export const Sizes: Story = {
  render: () => (
    <View style={styles.column}>
      <View style={styles.item}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>2XS</Text>
        <ProgressBar value={65} size={Size.TwoXSmall} />
      </View>
      <View style={styles.item}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>XS</Text>
        <ProgressBar value={65} size={Size.ExtraSmall} />
      </View>
      <View style={styles.item}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>SM</Text>
        <ProgressBar value={65} size={Size.Small} />
      </View>
      <View style={styles.item}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>MD</Text>
        <ProgressBar value={65} size={Size.Medium} />
      </View>
      <View style={styles.item}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>LG</Text>
        <ProgressBar value={65} size={Size.Large} />
      </View>
      <View style={styles.item}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>XL</Text>
        <ProgressBar value={65} size={Size.ExtraLarge} />
      </View>
      <View style={styles.item}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>2XL</Text>
        <ProgressBar value={65} size={Size.TwoXLarge} />
      </View>
    </View>
  ),
};

export const WithLabel: Story = {
  name: "With Label",
  render: () => (
    <View style={styles.column}>
      <View style={styles.labeledItem}>
        <View style={styles.labelRow}>
          <Text size={Size.Small}>Storage Used</Text>
          <Text size={Size.Small} appearance={TextAppearance.Muted}>65 / 100 GB</Text>
        </View>
        <ProgressBar value={65} max={100} appearance={TextAppearance.Link} />
      </View>
      <View style={styles.labeledItem}>
        <View style={styles.labelRow}>
          <Text size={Size.Small}>Upload Progress</Text>
          <Text size={Size.Small} appearance={TextAppearance.Muted}>78%</Text>
        </View>
        <ProgressBar value={78} max={100} appearance={TextAppearance.Success} />
      </View>
      <View style={styles.labeledItem}>
        <View style={styles.labelRow}>
          <Text size={Size.Small}>Quota Limit</Text>
          <Text size={Size.Small} appearance={TextAppearance.Danger}>95%</Text>
        </View>
        <ProgressBar value={95} max={100} appearance={TextAppearance.Danger} />
      </View>
    </View>
  ),
};

export const WithGlow: Story = {
  name: "With Glow",
  render: () => (
    <View style={styles.column}>
      <View style={styles.item}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>None</Text>
        <ProgressBar value={65} appearance={TextAppearance.Link} brightness={Brightness.None} />
      </View>
      <View style={styles.item}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>Soft</Text>
        <ProgressBar value={65} appearance={TextAppearance.Link} brightness={Brightness.Soft} />
      </View>
      <View style={styles.item}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>Base</Text>
        <ProgressBar value={65} appearance={TextAppearance.Link} brightness={Brightness.Base} />
      </View>
      <View style={styles.item}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>Bright</Text>
        <ProgressBar value={65} appearance={TextAppearance.Link} brightness={Brightness.Bright} />
      </View>
      <View style={styles.item}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>Success Glow</Text>
        <ProgressBar value={75} appearance={TextAppearance.Success} brightness={Brightness.Bright} size={Size.Large} />
      </View>
      <View style={styles.item}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>Danger Glow</Text>
        <ProgressBar value={95} appearance={TextAppearance.Danger} brightness={Brightness.Bright} size={Size.Large} />
      </View>
    </View>
  ),
};

export const Loading: Story = {
  name: "Loading State",
  render: () => (
    <View style={styles.column}>
      <View style={styles.item}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>Loading (SM)</Text>
        <ProgressBar loading size={Size.Small} />
      </View>
      <View style={styles.item}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>Loading (MD)</Text>
        <ProgressBar loading size={Size.Medium} />
      </View>
      <View style={styles.item}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>Loaded</Text>
        <ProgressBar value={65} size={Size.Medium} />
      </View>
    </View>
  ),
};

const styles = StyleSheet.create({
  container: {
    width: 300,
  },
  column: {
    width: 300,
    gap: 20,
  },
  item: {
    gap: 6,
  },
  labeledItem: {
    gap: 8,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
