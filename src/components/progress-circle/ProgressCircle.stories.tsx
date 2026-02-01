import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { View, StyleSheet } from "react-native";
import { ProgressCircle } from "./ProgressCircle";
import { Text } from "../text/Text";
import { TextAppearance, Size, Brightness } from "../../enums";

const meta: Meta<typeof ProgressCircle> = {
  title: "Components/ProgressCircle",
  component: ProgressCircle,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ProgressCircle>;

export const Default: Story = {
  render: () => <ProgressCircle value={78} max={100} showValue label="YOUR SCORE" />,
};

export const Values: Story = {
  render: () => (
    <View style={styles.row}>
      <ProgressCircle value={0} max={100} showValue size={Size.Medium} />
      <ProgressCircle value={25} max={100} showValue size={Size.Medium} />
      <ProgressCircle value={50} max={100} showValue size={Size.Medium} />
      <ProgressCircle value={75} max={100} showValue size={Size.Medium} />
      <ProgressCircle value={100} max={100} showValue size={Size.Medium} />
    </View>
  ),
};

export const Appearances: Story = {
  render: () => (
    <View style={styles.row}>
      <View style={styles.item}>
        <ProgressCircle value={78} appearance={TextAppearance.Primary} size={Size.Medium} />
        <Text appearance={TextAppearance.Muted} size={Size.ExtraSmall}>Primary</Text>
      </View>
      <View style={styles.item}>
        <ProgressCircle value={78} appearance={TextAppearance.Link} size={Size.Medium} />
        <Text appearance={TextAppearance.Muted} size={Size.ExtraSmall}>Link</Text>
      </View>
      <View style={styles.item}>
        <ProgressCircle value={78} appearance={TextAppearance.Success} size={Size.Medium} />
        <Text appearance={TextAppearance.Muted} size={Size.ExtraSmall}>Success</Text>
      </View>
      <View style={styles.item}>
        <ProgressCircle value={78} appearance={TextAppearance.Warning} size={Size.Medium} />
        <Text appearance={TextAppearance.Muted} size={Size.ExtraSmall}>Warning</Text>
      </View>
      <View style={styles.item}>
        <ProgressCircle value={78} appearance={TextAppearance.Danger} size={Size.Medium} />
        <Text appearance={TextAppearance.Muted} size={Size.ExtraSmall}>Danger</Text>
      </View>
    </View>
  ),
};

export const Sizes: Story = {
  render: () => (
    <View style={styles.row}>
      <View style={styles.item}>
        <ProgressCircle value={78} size={Size.TwoXSmall} showValue={false} />
        <Text appearance={TextAppearance.Muted} size={Size.ExtraSmall}>2XS</Text>
      </View>
      <View style={styles.item}>
        <ProgressCircle value={78} size={Size.ExtraSmall} showValue={false} />
        <Text appearance={TextAppearance.Muted} size={Size.ExtraSmall}>XS</Text>
      </View>
      <View style={styles.item}>
        <ProgressCircle value={78} size={Size.Small} showValue />
        <Text appearance={TextAppearance.Muted} size={Size.ExtraSmall}>SM</Text>
      </View>
      <View style={styles.item}>
        <ProgressCircle value={78} size={Size.Medium} showValue />
        <Text appearance={TextAppearance.Muted} size={Size.ExtraSmall}>MD</Text>
      </View>
      <View style={styles.item}>
        <ProgressCircle value={78} size={Size.Large} showValue />
        <Text appearance={TextAppearance.Muted} size={Size.ExtraSmall}>LG</Text>
      </View>
      <View style={styles.item}>
        <ProgressCircle value={78} size={Size.ExtraLarge} showValue />
        <Text appearance={TextAppearance.Muted} size={Size.ExtraSmall}>XL</Text>
      </View>
      <View style={styles.item}>
        <ProgressCircle value={78} size={Size.TwoXLarge} showValue label="SCORE" />
        <Text appearance={TextAppearance.Muted} size={Size.ExtraSmall}>2XL</Text>
      </View>
    </View>
  ),
};

export const WithLabel: Story = {
  name: "With Label",
  render: () => (
    <View style={styles.row}>
      <ProgressCircle value={78} showValue label="YOUR SCORE" size={Size.Large} />
      <ProgressCircle value={92} showValue label="ACCURACY" size={Size.Large} appearance={TextAppearance.Success} />
      <ProgressCircle value={45} showValue label="COMPLETE" size={Size.Large} appearance={TextAppearance.Warning} />
    </View>
  ),
};

export const WithGlow: Story = {
  name: "With Glow",
  render: () => (
    <View style={styles.row}>
      <View style={styles.item}>
        <ProgressCircle value={78} showValue brightness={Brightness.None} />
        <Text appearance={TextAppearance.Muted} size={Size.ExtraSmall}>None</Text>
      </View>
      <View style={styles.item}>
        <ProgressCircle value={78} showValue brightness={Brightness.Soft} />
        <Text appearance={TextAppearance.Muted} size={Size.ExtraSmall}>Soft</Text>
      </View>
      <View style={styles.item}>
        <ProgressCircle value={78} showValue brightness={Brightness.Base} />
        <Text appearance={TextAppearance.Muted} size={Size.ExtraSmall}>Base</Text>
      </View>
      <View style={styles.item}>
        <ProgressCircle value={78} showValue brightness={Brightness.Bright} />
        <Text appearance={TextAppearance.Muted} size={Size.ExtraSmall}>Bright</Text>
      </View>
    </View>
  ),
};

export const GlowVariants: Story = {
  name: "Glow Variants",
  render: () => (
    <View style={styles.row}>
      <View style={styles.item}>
        <ProgressCircle value={92} showValue label="SCORE" appearance={TextAppearance.Success} brightness={Brightness.Bright} />
        <Text appearance={TextAppearance.Muted} size={Size.ExtraSmall}>Success</Text>
      </View>
      <View style={styles.item}>
        <ProgressCircle value={78} showValue label="PROGRESS" appearance={TextAppearance.Link} brightness={Brightness.Bright} />
        <Text appearance={TextAppearance.Muted} size={Size.ExtraSmall}>Link</Text>
      </View>
      <View style={styles.item}>
        <ProgressCircle value={45} showValue label="WARNING" appearance={TextAppearance.Warning} brightness={Brightness.Bright} />
        <Text appearance={TextAppearance.Muted} size={Size.ExtraSmall}>Warning</Text>
      </View>
      <View style={styles.item}>
        <ProgressCircle value={25} showValue label="CRITICAL" appearance={TextAppearance.Danger} brightness={Brightness.Bright} />
        <Text appearance={TextAppearance.Muted} size={Size.ExtraSmall}>Danger</Text>
      </View>
    </View>
  ),
};

export const Loading: Story = {
  name: "Loading State",
  render: () => (
    <View style={styles.row}>
      <View style={styles.item}>
        <ProgressCircle loading size={Size.Small} />
        <Text appearance={TextAppearance.Muted} size={Size.ExtraSmall}>Loading</Text>
      </View>
      <View style={styles.item}>
        <ProgressCircle loading size={Size.Medium} />
        <Text appearance={TextAppearance.Muted} size={Size.ExtraSmall}>Loading</Text>
      </View>
      <View style={styles.item}>
        <ProgressCircle loading size={Size.Large} />
        <Text appearance={TextAppearance.Muted} size={Size.ExtraSmall}>Loading</Text>
      </View>
      <View style={styles.item}>
        <ProgressCircle value={78} showValue size={Size.Large} />
        <Text appearance={TextAppearance.Muted} size={Size.ExtraSmall}>Loaded</Text>
      </View>
    </View>
  ),
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 24,
  },
  item: {
    alignItems: "center",
    gap: 8,
  },
});
