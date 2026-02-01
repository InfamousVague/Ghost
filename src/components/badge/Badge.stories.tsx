import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { View, StyleSheet } from "react-native";
import { Badge } from "./Badge";
import { Text } from "../text/Text";
import { TextAppearance, Size } from "../../enums";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  render: () => <Badge label="Badge" />,
};

export const Variants: Story = {
  render: () => (
    <View style={styles.row}>
      <Badge label="Default" variant="default" />
      <Badge label="Primary" variant="primary" />
      <Badge label="Success" variant="success" />
      <Badge label="Warning" variant="warning" />
      <Badge label="Danger" variant="danger" />
      <Badge label="Info" variant="info" />
      <Badge label="Outline" variant="outline" />
    </View>
  ),
};

export const WithIcons: Story = {
  name: "With Icons",
  render: () => (
    <View style={styles.row}>
      <Badge label="Verified" icon="check" variant="success" />
      <Badge label="Warning" icon="warning" variant="warning" />
      <Badge label="Error" icon="error" variant="danger" />
      <Badge label="Info" icon="info" variant="info" />
      <Badge label="New" icon="star" variant="primary" />
    </View>
  ),
};

export const Sizes: Story = {
  render: () => (
    <View style={styles.row}>
      <View style={styles.item}>
        <Badge label="2XS" size={Size.TwoXSmall} />
        <Text appearance={TextAppearance.Muted} size={Size.ExtraSmall}>2XS</Text>
      </View>
      <View style={styles.item}>
        <Badge label="XS" size={Size.ExtraSmall} />
        <Text appearance={TextAppearance.Muted} size={Size.ExtraSmall}>XS</Text>
      </View>
      <View style={styles.item}>
        <Badge label="SM" size={Size.Small} />
        <Text appearance={TextAppearance.Muted} size={Size.ExtraSmall}>SM</Text>
      </View>
      <View style={styles.item}>
        <Badge label="MD" size={Size.Medium} />
        <Text appearance={TextAppearance.Muted} size={Size.ExtraSmall}>MD</Text>
      </View>
      <View style={styles.item}>
        <Badge label="LG" size={Size.Large} />
        <Text appearance={TextAppearance.Muted} size={Size.ExtraSmall}>LG</Text>
      </View>
      <View style={styles.item}>
        <Badge label="XL" size={Size.ExtraLarge} />
        <Text appearance={TextAppearance.Muted} size={Size.ExtraSmall}>XL</Text>
      </View>
    </View>
  ),
};

export const StatusDots: Story = {
  name: "Status Dots",
  render: () => (
    <View style={styles.column}>
      <View style={styles.statusRow}>
        <Badge dot variant="success" label="" />
        <Text size={Size.Small}>Online</Text>
      </View>
      <View style={styles.statusRow}>
        <Badge dot variant="warning" label="" />
        <Text size={Size.Small}>Away</Text>
      </View>
      <View style={styles.statusRow}>
        <Badge dot variant="danger" label="" />
        <Text size={Size.Small}>Busy</Text>
      </View>
      <View style={styles.statusRow}>
        <Badge dot variant="default" label="" />
        <Text size={Size.Small}>Offline</Text>
      </View>
    </View>
  ),
};

export const UseCases: Story = {
  name: "Use Cases",
  render: () => (
    <View style={styles.column}>
      <View style={styles.useCase}>
        <Text size={Size.Medium}>Notifications</Text>
        <Badge label="12" variant="danger" size={Size.Small} />
      </View>
      <View style={styles.useCase}>
        <Text size={Size.Medium}>Status</Text>
        <Badge label="Active" variant="success" size={Size.Small} icon="check" />
      </View>
      <View style={styles.useCase}>
        <Text size={Size.Medium}>Category</Text>
        <Badge label="Design" variant="outline" size={Size.Small} />
      </View>
      <View style={styles.useCase}>
        <Text size={Size.Medium}>Feature</Text>
        <Badge label="Beta" variant="info" size={Size.Small} />
      </View>
      <View style={styles.useCase}>
        <Text size={Size.Medium}>Priority</Text>
        <Badge label="High" variant="warning" size={Size.Small} />
      </View>
    </View>
  ),
};

export const Loading: Story = {
  name: "Loading State",
  render: () => (
    <View style={styles.row}>
      <View style={styles.item}>
        <Badge loading label="" dot />
        <Text appearance={TextAppearance.Muted} size={Size.ExtraSmall}>Dot Loading</Text>
      </View>
      <View style={styles.item}>
        <Badge loading label="Loading" size={Size.Small} />
        <Text appearance={TextAppearance.Muted} size={Size.ExtraSmall}>Badge Loading</Text>
      </View>
      <View style={styles.item}>
        <Badge label="Loaded" variant="success" size={Size.Small} />
        <Text appearance={TextAppearance.Muted} size={Size.ExtraSmall}>Loaded</Text>
      </View>
    </View>
  ),
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
  },
  column: {
    gap: 16,
  },
  item: {
    alignItems: "center",
    gap: 8,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  useCase: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 200,
  },
});
