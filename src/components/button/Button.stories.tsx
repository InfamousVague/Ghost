import type { Meta, StoryObj } from "@storybook/react-vite";
import { View } from "react-native";
import { Button } from "./Button";
import { Appearance, Brightness, Shape, Size } from "../../enums";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    appearance: {
      control: "select",
      options: Object.values(Appearance),
    },
    size: {
      control: "select",
      options: Object.values(Size),
    },
    shape: {
      control: "select",
      options: Object.values(Shape),
    },
    brightness: {
      control: "select",
      options: Object.values(Brightness),
    },
  },
  args: {
    label: "Click me",
    appearance: Appearance.Primary,
    size: Size.Medium,
    shape: Shape.Rounded,
    brightness: Brightness.Base,
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const AllAppearances: Story = {
  render: () => (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
      {Object.values(Appearance).map((appearance) => (
        <Button key={appearance} label={appearance} appearance={appearance} />
      ))}
    </View>
  ),
};

export const AllBrightness: Story = {
  render: () => (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
      {Object.values(Brightness).map((level) => (
        <Button
          key={level}
          label={level === Brightness.None ? "No glow" : `${level.charAt(0).toUpperCase()}${level.slice(1)} glow`}
          brightness={level}
        />
      ))}
    </View>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
      {Object.values(Size).map((size) => (
        <Button key={size} label={size} size={size} />
      ))}
    </View>
  ),
};

export const AllShapes: Story = {
  render: () => (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
      {Object.values(Shape).map((shape) => (
        <Button key={shape} label={shape} shape={shape} />
      ))}
    </View>
  ),
};

export const Loading: Story = {
  name: "Loading State",
  render: () => (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
      <Button label="Submit" loading />
      <Button label="Save" size={Size.Large} loading />
      <Button label="Delete" appearance={Appearance.Danger} loading />
      <Button label="Confirm" shape={Shape.Pill} loading />
    </View>
  ),
};
