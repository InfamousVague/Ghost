import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { View, StyleSheet } from "react-native";
import { Divider } from "./Divider";
import { Text } from "../text/Text";
import { TextAppearance, Size } from "../../enums";

const meta: Meta<typeof Divider> = {
  title: "Components/Divider",
  component: Divider,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  render: () => (
    <View style={styles.container}>
      <Divider />
    </View>
  ),
};

export const WithLabel: Story = {
  name: "With Label",
  render: () => (
    <View style={styles.container}>
      <Divider label="OR" />
    </View>
  ),
};

export const Sizes: Story = {
  render: () => (
    <View style={styles.column}>
      <View style={styles.item}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>2XS</Text>
        <Divider size={Size.TwoXSmall} />
      </View>
      <View style={styles.item}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>SM</Text>
        <Divider size={Size.Small} />
      </View>
      <View style={styles.item}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>MD</Text>
        <Divider size={Size.Medium} />
      </View>
      <View style={styles.item}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>LG</Text>
        <Divider size={Size.Large} />
      </View>
      <View style={styles.item}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>XL</Text>
        <Divider size={Size.ExtraLarge} />
      </View>
      <View style={styles.item}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>2XL</Text>
        <Divider size={Size.TwoXLarge} />
      </View>
    </View>
  ),
};

export const Vertical: Story = {
  render: () => (
    <View style={styles.horizontalContainer}>
      <Text size={Size.Small}>Left</Text>
      <Divider orientation="vertical" spacing={12} />
      <Text size={Size.Small}>Center</Text>
      <Divider orientation="vertical" spacing={12} />
      <Text size={Size.Small}>Right</Text>
    </View>
  ),
};

export const WithSpacing: Story = {
  name: "With Spacing",
  render: () => (
    <View style={styles.container}>
      <Text size={Size.Small}>Above content</Text>
      <Divider spacing={16} />
      <Text size={Size.Small}>Below content</Text>
    </View>
  ),
};

export const InContext: Story = {
  name: "In Context",
  render: () => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text size={Size.Medium} weight="semibold">Account Settings</Text>
      </View>
      <Divider />
      <View style={styles.cardSection}>
        <Text size={Size.Small}>Profile Information</Text>
        <Text size={Size.ExtraSmall} appearance={TextAppearance.Muted}>Update your personal details</Text>
      </View>
      <Divider />
      <View style={styles.cardSection}>
        <Text size={Size.Small}>Security</Text>
        <Text size={Size.ExtraSmall} appearance={TextAppearance.Muted}>Manage your password and 2FA</Text>
      </View>
      <Divider />
      <View style={styles.cardSection}>
        <Text size={Size.Small}>Notifications</Text>
        <Text size={Size.ExtraSmall} appearance={TextAppearance.Muted}>Configure email preferences</Text>
      </View>
    </View>
  ),
};

export const LoginForm: Story = {
  name: "Login Form Example",
  render: () => (
    <View style={styles.formContainer}>
      <View style={styles.formButton}>
        <Text size={Size.Small}>Continue with Google</Text>
      </View>
      <View style={styles.formButton}>
        <Text size={Size.Small}>Continue with GitHub</Text>
      </View>
      <Divider label="OR" spacing={16} />
      <View style={styles.formButton}>
        <Text size={Size.Small}>Continue with Email</Text>
      </View>
    </View>
  ),
};

export const Loading: Story = {
  name: "Loading State",
  render: () => (
    <View style={styles.column}>
      <View style={styles.item}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>Horizontal Loading</Text>
        <Divider loading />
      </View>
      <View style={styles.item}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>Loaded</Text>
        <Divider />
      </View>
      <View style={styles.horizontalContainer}>
        <Text size={Size.Small}>Left</Text>
        <Divider orientation="vertical" loading spacing={12} />
        <Text size={Size.Small}>Loading</Text>
        <Divider orientation="vertical" spacing={12} />
        <Text size={Size.Small}>Loaded</Text>
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
    gap: 24,
  },
  item: {
    gap: 8,
  },
  horizontalContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
  },
  card: {
    width: 300,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderRadius: 12,
    overflow: "hidden",
  },
  cardHeader: {
    padding: 16,
  },
  cardSection: {
    padding: 16,
    gap: 4,
  },
  formContainer: {
    width: 280,
    gap: 12,
  },
  formButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 8,
    alignItems: "center",
  },
});
