import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import { SegmentedControl } from "./SegmentedControl";
import { Size, TextAppearance } from "../../enums";
import { Text } from "../text/Text";

const meta: Meta<typeof SegmentedControl> = {
  title: "Components/SegmentedControl",
  component: SegmentedControl,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: "select",
      options: Object.values(Size),
    },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 20 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SegmentedControl>;

/** Interactive segmented control */
function InteractiveControl<T extends string>(
  props: React.ComponentProps<typeof SegmentedControl<T>>
) {
  const [value, setValue] = useState(props.value);
  return (
    <View style={{ gap: 12 }}>
      <SegmentedControl {...props} value={value} onChange={setValue} />
      <Text size={Size.Small} appearance={TextAppearance.Muted}>
        Selected: {value}
      </Text>
    </View>
  );
}

export const Default: Story = {
  render: () => (
    <InteractiveControl
      options={[
        { value: "list", label: "List", icon: "list" },
        { value: "grid", label: "Grid", icon: "grid" },
      ]}
      value="list"
      onChange={() => {}}
    />
  ),
};

export const WithoutIcons: Story = {
  render: () => (
    <InteractiveControl
      options={[
        { value: "day", label: "Day" },
        { value: "week", label: "Week" },
        { value: "month", label: "Month" },
      ]}
      value="week"
      onChange={() => {}}
    />
  ),
};

export const ThreeOptions: Story = {
  render: () => (
    <InteractiveControl
      options={[
        { value: "all", label: "All", icon: "menu" },
        { value: "active", label: "Active", icon: "check" },
        { value: "completed", label: "Done", icon: "success" },
      ]}
      value="all"
      onChange={() => {}}
    />
  ),
};

export const Small: Story = {
  render: () => (
    <InteractiveControl
      options={[
        { value: "list", label: "List", icon: "list" },
        { value: "grid", label: "Grid", icon: "grid" },
      ]}
      value="list"
      size={Size.Small}
      onChange={() => {}}
    />
  ),
};

export const Large: Story = {
  render: () => (
    <InteractiveControl
      options={[
        { value: "list", label: "List", icon: "list" },
        { value: "grid", label: "Grid", icon: "grid" },
      ]}
      value="list"
      size={Size.Large}
      onChange={() => {}}
    />
  ),
};

export const Disabled: Story = {
  render: () => (
    <SegmentedControl
      options={[
        { value: "list", label: "List", icon: "list" },
        { value: "grid", label: "Grid", icon: "grid" },
      ]}
      value="list"
      onChange={() => {}}
      disabled
    />
  ),
};

export const Loading: Story = {
  render: () => (
    <SegmentedControl
      options={[
        { value: "list", label: "List" },
        { value: "grid", label: "Grid" },
      ]}
      value="list"
      onChange={() => {}}
      loading
    />
  ),
};

/** All sizes comparison */
export const Sizes: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      {Object.values(Size).map((size) => (
        <View key={size} style={{ gap: 4 }}>
          <Text size={Size.TwoXSmall} appearance={TextAppearance.Muted}>
            {size}
          </Text>
          <SegmentedControl
            options={[
              { value: "list", label: "List", icon: "list" },
              { value: "grid", label: "Grid", icon: "grid" },
            ]}
            value="list"
            size={size}
            onChange={() => {}}
          />
        </View>
      ))}
    </View>
  ),
};
