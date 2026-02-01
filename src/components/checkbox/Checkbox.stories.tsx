import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { View, StyleSheet } from "react-native";
import { Checkbox } from "./Checkbox";
import { Text } from "../text/Text";
import { TextAppearance, Size } from "../../enums";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

function InteractiveCheckbox({ label, size = Size.Medium }: { label?: string; size?: Size }) {
  const [checked, setChecked] = useState(false);
  return <Checkbox checked={checked} onValueChange={setChecked} label={label} size={size} />;
}

export const Default: Story = {
  render: () => <InteractiveCheckbox />,
};

export const WithLabel: Story = {
  name: "With Label",
  render: () => <InteractiveCheckbox label="Accept terms and conditions" />,
};

export const States: Story = {
  render: () => (
    <View style={styles.column}>
      <View style={styles.row}>
        <Checkbox checked={false} />
        <Text appearance={TextAppearance.Muted} size={Size.Small}>Unchecked</Text>
      </View>
      <View style={styles.row}>
        <Checkbox checked={true} />
        <Text appearance={TextAppearance.Muted} size={Size.Small}>Checked</Text>
      </View>
      <View style={styles.row}>
        <Checkbox indeterminate />
        <Text appearance={TextAppearance.Muted} size={Size.Small}>Indeterminate</Text>
      </View>
      <View style={styles.row}>
        <Checkbox checked={false} disabled />
        <Text appearance={TextAppearance.Muted} size={Size.Small}>Disabled (Unchecked)</Text>
      </View>
      <View style={styles.row}>
        <Checkbox checked={true} disabled />
        <Text appearance={TextAppearance.Muted} size={Size.Small}>Disabled (Checked)</Text>
      </View>
    </View>
  ),
};

export const Sizes: Story = {
  render: () => (
    <View style={styles.column}>
      <View style={styles.row}>
        <Checkbox checked size={Size.TwoXSmall} />
        <Text appearance={TextAppearance.Muted} size={Size.Small}>2XS</Text>
      </View>
      <View style={styles.row}>
        <Checkbox checked size={Size.ExtraSmall} />
        <Text appearance={TextAppearance.Muted} size={Size.Small}>XS</Text>
      </View>
      <View style={styles.row}>
        <Checkbox checked size={Size.Small} />
        <Text appearance={TextAppearance.Muted} size={Size.Small}>SM</Text>
      </View>
      <View style={styles.row}>
        <Checkbox checked size={Size.Medium} />
        <Text appearance={TextAppearance.Muted} size={Size.Small}>MD</Text>
      </View>
      <View style={styles.row}>
        <Checkbox checked size={Size.Large} />
        <Text appearance={TextAppearance.Muted} size={Size.Small}>LG</Text>
      </View>
      <View style={styles.row}>
        <Checkbox checked size={Size.ExtraLarge} />
        <Text appearance={TextAppearance.Muted} size={Size.Small}>XL</Text>
      </View>
      <View style={styles.row}>
        <Checkbox checked size={Size.TwoXLarge} />
        <Text appearance={TextAppearance.Muted} size={Size.Small}>2XL</Text>
      </View>
    </View>
  ),
};

export const CheckboxGroup: Story = {
  name: "Checkbox Group",
  render: () => {
    const [selected, setSelected] = useState<string[]>(["email"]);

    const toggle = (id: string) => {
      setSelected((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
    };

    return (
      <View style={styles.group}>
        <Text size={Size.Medium} weight="semibold">Notifications</Text>
        <Checkbox
          label="Email notifications"
          checked={selected.includes("email")}
          onValueChange={() => toggle("email")}
        />
        <Checkbox
          label="Push notifications"
          checked={selected.includes("push")}
          onValueChange={() => toggle("push")}
        />
        <Checkbox
          label="SMS notifications"
          checked={selected.includes("sms")}
          onValueChange={() => toggle("sms")}
        />
        <Checkbox
          label="Weekly digest"
          checked={selected.includes("digest")}
          onValueChange={() => toggle("digest")}
        />
      </View>
    );
  },
};

export const Loading: Story = {
  name: "Loading State",
  render: () => (
    <View style={styles.column}>
      <View style={styles.row}>
        <Checkbox loading />
        <Text appearance={TextAppearance.Muted} size={Size.Small}>Loading</Text>
      </View>
      <View style={styles.row}>
        <Checkbox loading label="With label" />
        <Text appearance={TextAppearance.Muted} size={Size.Small}>Loading with label</Text>
      </View>
      <View style={styles.row}>
        <Checkbox checked />
        <Text appearance={TextAppearance.Muted} size={Size.Small}>Loaded</Text>
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
    alignItems: "center",
    gap: 16,
  },
  group: {
    width: 250,
    gap: 12,
  },
});
