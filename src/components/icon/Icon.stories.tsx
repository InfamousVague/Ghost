import type { Meta, StoryObj } from "@storybook/react-vite";
import { View, StyleSheet } from "react-native";
import { Icon, type IconName } from "./Icon";
import { Text } from "../text/Text";
import { TextAppearance, Size } from "../../enums";

const meta: Meta<typeof Icon> = {
  title: "Components/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

const ALL_ICONS: IconName[] = [
  "search",
  "calendar",
  "chevron-down",
  "chevron-up",
  "chevron-left",
  "chevron-right",
  "check",
  "close",
  "plus",
  "minus",
  "filter",
  "settings",
  "user",
  "bell",
  "upload",
  "download",
  "arrow-up",
  "arrow-down",
  "star",
  "star-filled",
  "heart",
  "heart-filled",
  "home",
  "menu",
  "more-horizontal",
  "more-vertical",
  "edit",
  "trash",
  "copy",
  "external-link",
  "eye",
  "eye-off",
  "lock",
  "unlock",
  "info",
  "warning",
  "error",
  "success",
];

export const Default: Story = {
  args: {
    name: "search",
  },
};

export const AllIcons: Story = {
  name: "Icon Library",
  render: () => (
    <View style={styles.grid}>
      {ALL_ICONS.map((name) => (
        <View key={name} style={styles.iconItem}>
          <Icon name={name} size={Size.Large} />
          <Text size={Size.ExtraSmall} appearance={TextAppearance.Muted}>
            {name}
          </Text>
        </View>
      ))}
    </View>
  ),
};

export const Sizes: Story = {
  render: () => (
    <View style={styles.row}>
      <View style={styles.sizeItem}>
        <Icon name="star" size={Size.TwoXSmall} />
        <Text size={Size.ExtraSmall} appearance={TextAppearance.Muted}>2XS</Text>
      </View>
      <View style={styles.sizeItem}>
        <Icon name="star" size={Size.ExtraSmall} />
        <Text size={Size.ExtraSmall} appearance={TextAppearance.Muted}>XS</Text>
      </View>
      <View style={styles.sizeItem}>
        <Icon name="star" size={Size.Small} />
        <Text size={Size.ExtraSmall} appearance={TextAppearance.Muted}>SM</Text>
      </View>
      <View style={styles.sizeItem}>
        <Icon name="star" size={Size.Medium} />
        <Text size={Size.ExtraSmall} appearance={TextAppearance.Muted}>MD</Text>
      </View>
      <View style={styles.sizeItem}>
        <Icon name="star" size={Size.Large} />
        <Text size={Size.ExtraSmall} appearance={TextAppearance.Muted}>LG</Text>
      </View>
      <View style={styles.sizeItem}>
        <Icon name="star" size={Size.ExtraLarge} />
        <Text size={Size.ExtraSmall} appearance={TextAppearance.Muted}>XL</Text>
      </View>
      <View style={styles.sizeItem}>
        <Icon name="star" size={Size.TwoXLarge} />
        <Text size={Size.ExtraSmall} appearance={TextAppearance.Muted}>2XL</Text>
      </View>
    </View>
  ),
};

export const Appearances: Story = {
  render: () => (
    <View style={styles.row}>
      <Icon name="heart-filled" size={Size.Large} appearance={TextAppearance.Primary} />
      <Icon name="heart-filled" size={Size.Large} appearance={TextAppearance.Secondary} />
      <Icon name="heart-filled" size={Size.Large} appearance={TextAppearance.Muted} />
      <Icon name="heart-filled" size={Size.Large} appearance={TextAppearance.Link} />
      <Icon name="heart-filled" size={Size.Large} appearance={TextAppearance.Success} />
      <Icon name="heart-filled" size={Size.Large} appearance={TextAppearance.Warning} />
      <Icon name="heart-filled" size={Size.Large} appearance={TextAppearance.Danger} />
      <Icon name="heart-filled" size={Size.Large} appearance={TextAppearance.Info} />
    </View>
  ),
};

export const StatusIcons: Story = {
  name: "Status Icons",
  render: () => (
    <View style={styles.row}>
      <View style={styles.statusItem}>
        <Icon name="success" size={Size.Large} appearance={TextAppearance.Success} />
        <Text size={Size.Small} appearance={TextAppearance.Success}>Success</Text>
      </View>
      <View style={styles.statusItem}>
        <Icon name="warning" size={Size.Large} appearance={TextAppearance.Warning} />
        <Text size={Size.Small} appearance={TextAppearance.Warning}>Warning</Text>
      </View>
      <View style={styles.statusItem}>
        <Icon name="error" size={Size.Large} appearance={TextAppearance.Danger} />
        <Text size={Size.Small} appearance={TextAppearance.Danger}>Error</Text>
      </View>
      <View style={styles.statusItem}>
        <Icon name="info" size={Size.Large} appearance={TextAppearance.Info} />
        <Text size={Size.Small} appearance={TextAppearance.Info}>Info</Text>
      </View>
    </View>
  ),
};

export const Loading: Story = {
  name: "Loading State",
  render: () => (
    <View style={styles.row}>
      <View style={styles.sizeItem}>
        <Icon name="search" size={Size.Small} loading />
        <Text size={Size.ExtraSmall} appearance={TextAppearance.Muted}>Loading</Text>
      </View>
      <View style={styles.sizeItem}>
        <Icon name="search" size={Size.Medium} loading />
        <Text size={Size.ExtraSmall} appearance={TextAppearance.Muted}>Loading</Text>
      </View>
      <View style={styles.sizeItem}>
        <Icon name="search" size={Size.Large} loading />
        <Text size={Size.ExtraSmall} appearance={TextAppearance.Muted}>Loading</Text>
      </View>
      <View style={styles.sizeItem}>
        <Icon name="search" size={Size.Large} />
        <Text size={Size.ExtraSmall} appearance={TextAppearance.Muted}>Loaded</Text>
      </View>
    </View>
  ),
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 24,
    maxWidth: 600,
  },
  iconItem: {
    width: 80,
    alignItems: "center",
    gap: 8,
  },
  row: {
    flexDirection: "row",
    gap: 24,
    alignItems: "center",
  },
  sizeItem: {
    alignItems: "center",
    gap: 8,
  },
  statusItem: {
    alignItems: "center",
    gap: 8,
  },
});
