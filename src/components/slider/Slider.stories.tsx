import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import { Slider } from "./Slider";
import { Size, TextAppearance, Brightness } from "../../enums";
import { Text } from "../text/Text";

const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
    size: {
      control: "select",
      options: Object.values(Size),
    },
    appearance: {
      control: "select",
      options: Object.values(TextAppearance),
    },
    brightness: {
      control: "select",
      options: Object.values(Brightness),
    },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <View style={{ width: 300, padding: 20 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Slider>;

/** Interactive slider with value display */
function InteractiveSlider(props: React.ComponentProps<typeof Slider>) {
  const [value, setValue] = useState(props.value ?? 50);
  return (
    <View style={{ gap: 12 }}>
      <Slider {...props} value={value} onChange={setValue} />
      <Text size={Size.Small} appearance={TextAppearance.Muted}>
        Value: {value}
      </Text>
    </View>
  );
}

export const Default: Story = {
  render: (args) => <InteractiveSlider {...args} />,
  args: {
    value: 50,
    min: 0,
    max: 100,
    step: 1,
    size: Size.Medium,
    appearance: TextAppearance.Primary,
    brightness: Brightness.None,
  },
};

export const WithGlow: Story = {
  render: (args) => <InteractiveSlider {...args} />,
  args: {
    value: 70,
    appearance: TextAppearance.Success,
    brightness: Brightness.Bright,
  },
};

export const CustomRange: Story = {
  render: (args) => <InteractiveSlider {...args} />,
  args: {
    value: 200,
    min: 100,
    max: 400,
    step: 10,
  },
};

export const Small: Story = {
  render: (args) => <InteractiveSlider {...args} />,
  args: {
    value: 30,
    size: Size.Small,
  },
};

export const Large: Story = {
  render: (args) => <InteractiveSlider {...args} />,
  args: {
    value: 60,
    size: Size.Large,
  },
};

export const Disabled: Story = {
  render: (args) => <InteractiveSlider {...args} />,
  args: {
    value: 40,
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

/** All appearance colors */
export const Appearances: Story = {
  render: () => (
    <View style={{ gap: 24, width: 300 }}>
      {Object.values(TextAppearance).map((appearance) => (
        <View key={appearance} style={{ gap: 4 }}>
          <Text size={Size.TwoXSmall} appearance={TextAppearance.Muted}>
            {appearance}
          </Text>
          <Slider value={60} appearance={appearance} brightness={Brightness.Base} />
        </View>
      ))}
    </View>
  ),
};

/** All sizes */
export const Sizes: Story = {
  render: () => (
    <View style={{ gap: 24, width: 300 }}>
      {Object.values(Size).map((size) => (
        <View key={size} style={{ gap: 4 }}>
          <Text size={Size.TwoXSmall} appearance={TextAppearance.Muted}>
            {size}
          </Text>
          <Slider value={50} size={size} />
        </View>
      ))}
    </View>
  ),
};

/** All brightness levels */
export const BrightnessLevels: Story = {
  render: () => (
    <View style={{ gap: 24, width: 300 }}>
      {Object.values(Brightness).map((brightness) => (
        <View key={brightness} style={{ gap: 4 }}>
          <Text size={Size.TwoXSmall} appearance={TextAppearance.Muted}>
            {brightness}
          </Text>
          <Slider value={70} appearance={TextAppearance.Info} brightness={brightness} />
        </View>
      ))}
    </View>
  ),
};
