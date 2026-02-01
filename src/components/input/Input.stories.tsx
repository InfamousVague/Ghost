import type { Meta, StoryObj } from "@storybook/react-vite";
import { View, StyleSheet } from "react-native";
import { Input } from "./Input";
import { Text } from "../text/Text";
import { TextAppearance, Size, Shape } from "../../enums";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
  render: (args) => (
    <View style={styles.container}>
      <Input {...args} />
    </View>
  ),
};

export const WithIcons: Story = {
  name: "With Icons",
  render: () => (
    <View style={styles.column}>
      <View style={styles.inputWrapper}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>Search</Text>
        <Input
          placeholder="Search..."
          leadingIcon="search"
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>Password</Text>
        <Input
          placeholder="Enter password"
          leadingIcon="lock"
          trailingIcon="eye-off"
          secureTextEntry
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>Calendar</Text>
        <Input
          placeholder="Select date"
          trailingIcon="calendar"
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>Email</Text>
        <Input
          placeholder="Enter email"
          leadingIcon="user"
          trailingIcon="check"
        />
      </View>
    </View>
  ),
};

export const Sizes: Story = {
  render: () => (
    <View style={styles.column}>
      <View style={styles.inputWrapper}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>Extra Small</Text>
        <Input placeholder="Extra small" size={Size.ExtraSmall} leadingIcon="search" />
      </View>
      <View style={styles.inputWrapper}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>Small</Text>
        <Input placeholder="Small" size={Size.Small} leadingIcon="search" />
      </View>
      <View style={styles.inputWrapper}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>Medium (default)</Text>
        <Input placeholder="Medium" size={Size.Medium} leadingIcon="search" />
      </View>
      <View style={styles.inputWrapper}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>Large</Text>
        <Input placeholder="Large" size={Size.Large} leadingIcon="search" />
      </View>
      <View style={styles.inputWrapper}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>Extra Large</Text>
        <Input placeholder="Extra large" size={Size.ExtraLarge} leadingIcon="search" />
      </View>
    </View>
  ),
};

export const Shapes: Story = {
  render: () => (
    <View style={styles.column}>
      <View style={styles.inputWrapper}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>Soft</Text>
        <Input placeholder="Soft corners" shape={Shape.Soft} leadingIcon="search" />
      </View>
      <View style={styles.inputWrapper}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>Rounded (default)</Text>
        <Input placeholder="Rounded corners" shape={Shape.Rounded} leadingIcon="search" />
      </View>
      <View style={styles.inputWrapper}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>Pill</Text>
        <Input placeholder="Pill shape" shape={Shape.Pill} leadingIcon="search" />
      </View>
    </View>
  ),
};

export const States: Story = {
  render: () => (
    <View style={styles.column}>
      <View style={styles.inputWrapper}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>Default</Text>
        <Input placeholder="Default state" leadingIcon="user" />
      </View>
      <View style={styles.inputWrapper}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>With Value</Text>
        <Input value="john@example.com" leadingIcon="user" />
      </View>
      <View style={styles.inputWrapper}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>Error</Text>
        <Input value="invalid-email" leadingIcon="user" error />
      </View>
      <View style={styles.inputWrapper}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>Disabled</Text>
        <Input value="Disabled input" leadingIcon="lock" disabled />
      </View>
    </View>
  ),
};

export const Loading: Story = {
  name: "Loading State",
  render: () => (
    <View style={styles.column}>
      <View style={styles.row}>
        <View style={[styles.inputWrapper, { flex: 1 }]}>
          <Text appearance={TextAppearance.Muted} size={Size.Small}>Loading</Text>
          <Input placeholder="Loading..." loading />
        </View>
        <View style={[styles.inputWrapper, { flex: 1 }]}>
          <Text appearance={TextAppearance.Muted} size={Size.Small}>Loaded</Text>
          <Input placeholder="Search..." leadingIcon="search" />
        </View>
      </View>
      <View style={styles.row}>
        <View style={[styles.inputWrapper, { flex: 1 }]}>
          <Text appearance={TextAppearance.Muted} size={Size.Small}>Loading (Large)</Text>
          <Input placeholder="Loading..." size={Size.Large} loading />
        </View>
        <View style={[styles.inputWrapper, { flex: 1 }]}>
          <Text appearance={TextAppearance.Muted} size={Size.Small}>Loading (Pill)</Text>
          <Input placeholder="Loading..." shape={Shape.Pill} loading />
        </View>
      </View>
    </View>
  ),
};

const styles = StyleSheet.create({
  container: {
    width: 300,
  },
  column: {
    gap: 16,
    width: 350,
  },
  row: {
    flexDirection: "row",
    gap: 16,
  },
  inputWrapper: {
    gap: 6,
  },
});
