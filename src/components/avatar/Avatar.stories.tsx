import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { View, StyleSheet } from "react-native";
import { Avatar } from "./Avatar";
import { Text } from "../text/Text";
import { TextAppearance, Size } from "../../enums";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

const SAMPLE_AVATAR = "https://i.pravatar.cc/150?img=1";

export const Default: Story = {
  render: () => <Avatar uri={SAMPLE_AVATAR} />,
};

export const WithInitials: Story = {
  name: "With Initials",
  render: () => (
    <View style={styles.row}>
      <Avatar initials="JD" />
      <Avatar initials="AB" />
      <Avatar initials="XY" />
      <Avatar initials="MN" />
    </View>
  ),
};

export const Sizes: Story = {
  render: () => (
    <View style={styles.row}>
      <View style={styles.item}>
        <Avatar uri={SAMPLE_AVATAR} size={Size.TwoXSmall} />
        <Text appearance={TextAppearance.Muted} size={Size.ExtraSmall}>2XS</Text>
      </View>
      <View style={styles.item}>
        <Avatar uri={SAMPLE_AVATAR} size={Size.ExtraSmall} />
        <Text appearance={TextAppearance.Muted} size={Size.ExtraSmall}>XS</Text>
      </View>
      <View style={styles.item}>
        <Avatar uri={SAMPLE_AVATAR} size={Size.Small} />
        <Text appearance={TextAppearance.Muted} size={Size.ExtraSmall}>SM</Text>
      </View>
      <View style={styles.item}>
        <Avatar uri={SAMPLE_AVATAR} size={Size.Medium} />
        <Text appearance={TextAppearance.Muted} size={Size.ExtraSmall}>MD</Text>
      </View>
      <View style={styles.item}>
        <Avatar uri={SAMPLE_AVATAR} size={Size.Large} />
        <Text appearance={TextAppearance.Muted} size={Size.ExtraSmall}>LG</Text>
      </View>
      <View style={styles.item}>
        <Avatar uri={SAMPLE_AVATAR} size={Size.ExtraLarge} />
        <Text appearance={TextAppearance.Muted} size={Size.ExtraSmall}>XL</Text>
      </View>
      <View style={styles.item}>
        <Avatar uri={SAMPLE_AVATAR} size={Size.TwoXLarge} />
        <Text appearance={TextAppearance.Muted} size={Size.ExtraSmall}>2XL</Text>
      </View>
    </View>
  ),
};

export const WithStatus: Story = {
  name: "With Status",
  render: () => (
    <View style={styles.row}>
      <View style={styles.item}>
        <Avatar uri={SAMPLE_AVATAR} status="online" size={Size.Large} />
        <Text appearance={TextAppearance.Muted} size={Size.ExtraSmall}>Online</Text>
      </View>
      <View style={styles.item}>
        <Avatar uri={SAMPLE_AVATAR} status="offline" size={Size.Large} />
        <Text appearance={TextAppearance.Muted} size={Size.ExtraSmall}>Offline</Text>
      </View>
      <View style={styles.item}>
        <Avatar uri={SAMPLE_AVATAR} status="busy" size={Size.Large} />
        <Text appearance={TextAppearance.Muted} size={Size.ExtraSmall}>Busy</Text>
      </View>
      <View style={styles.item}>
        <Avatar uri={SAMPLE_AVATAR} status="away" size={Size.Large} />
        <Text appearance={TextAppearance.Muted} size={Size.ExtraSmall}>Away</Text>
      </View>
    </View>
  ),
};

export const AvatarGroup: Story = {
  name: "Avatar Group",
  render: () => (
    <View style={styles.column}>
      <Text size={Size.Small} appearance={TextAppearance.Muted}>Team Members</Text>
      <View style={styles.avatarGroup}>
        <Avatar uri="https://i.pravatar.cc/150?img=1" size={Size.Medium} />
        <Avatar uri="https://i.pravatar.cc/150?img=2" size={Size.Medium} style={{ marginLeft: -12 }} />
        <Avatar uri="https://i.pravatar.cc/150?img=3" size={Size.Medium} style={{ marginLeft: -12 }} />
        <Avatar uri="https://i.pravatar.cc/150?img=4" size={Size.Medium} style={{ marginLeft: -12 }} />
        <Avatar initials="+3" size={Size.Medium} style={{ marginLeft: -12 }} />
      </View>
    </View>
  ),
};

export const UserCard: Story = {
  name: "User Card Example",
  render: () => (
    <View style={styles.userCard}>
      <Avatar uri={SAMPLE_AVATAR} size={Size.Large} status="online" />
      <View style={styles.userInfo}>
        <Text size={Size.Medium} weight="semibold">John Doe</Text>
        <Text size={Size.Small} appearance={TextAppearance.Muted}>Product Designer</Text>
      </View>
    </View>
  ),
};

export const Loading: Story = {
  name: "Loading State",
  render: () => (
    <View style={styles.row}>
      <View style={styles.item}>
        <Avatar loading size={Size.Small} />
        <Text appearance={TextAppearance.Muted} size={Size.ExtraSmall}>Loading</Text>
      </View>
      <View style={styles.item}>
        <Avatar loading size={Size.Medium} />
        <Text appearance={TextAppearance.Muted} size={Size.ExtraSmall}>Loading</Text>
      </View>
      <View style={styles.item}>
        <Avatar loading size={Size.Large} />
        <Text appearance={TextAppearance.Muted} size={Size.ExtraSmall}>Loading</Text>
      </View>
      <View style={styles.item}>
        <Avatar uri={SAMPLE_AVATAR} size={Size.Large} />
        <Text appearance={TextAppearance.Muted} size={Size.ExtraSmall}>Loaded</Text>
      </View>
    </View>
  ),
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 20,
  },
  item: {
    alignItems: "center",
    gap: 8,
  },
  column: {
    gap: 12,
  },
  avatarGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderRadius: 12,
  },
  userInfo: {
    gap: 2,
  },
});
