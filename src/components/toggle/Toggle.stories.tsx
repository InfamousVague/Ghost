import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { View, StyleSheet } from "react-native";
import { Toggle } from "./Toggle";
import { Text } from "../text/Text";
import { TextAppearance, Size } from "../../enums";

const meta: Meta<typeof Toggle> = {
  title: "Components/Toggle",
  component: Toggle,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

function InteractiveToggle({ size = Size.Medium }: { size?: Size }) {
  const [value, setValue] = useState(false);
  return <Toggle value={value} onValueChange={setValue} size={size} />;
}

export const Default: Story = {
  render: () => <InteractiveToggle />,
};

export const States: Story = {
  render: () => (
    <View style={styles.column}>
      <View style={styles.row}>
        <Toggle value={false} />
        <Text appearance={TextAppearance.Muted} size={Size.Small}>Off</Text>
      </View>
      <View style={styles.row}>
        <Toggle value={true} />
        <Text appearance={TextAppearance.Muted} size={Size.Small}>On</Text>
      </View>
      <View style={styles.row}>
        <Toggle value={false} disabled />
        <Text appearance={TextAppearance.Muted} size={Size.Small}>Disabled (Off)</Text>
      </View>
      <View style={styles.row}>
        <Toggle value={true} disabled />
        <Text appearance={TextAppearance.Muted} size={Size.Small}>Disabled (On)</Text>
      </View>
    </View>
  ),
};

export const Sizes: Story = {
  render: () => (
    <View style={styles.column}>
      <View style={styles.row}>
        <InteractiveToggle size={Size.TwoXSmall} />
        <Text appearance={TextAppearance.Muted} size={Size.Small}>2XS</Text>
      </View>
      <View style={styles.row}>
        <InteractiveToggle size={Size.ExtraSmall} />
        <Text appearance={TextAppearance.Muted} size={Size.Small}>XS</Text>
      </View>
      <View style={styles.row}>
        <InteractiveToggle size={Size.Small} />
        <Text appearance={TextAppearance.Muted} size={Size.Small}>SM</Text>
      </View>
      <View style={styles.row}>
        <InteractiveToggle size={Size.Medium} />
        <Text appearance={TextAppearance.Muted} size={Size.Small}>MD</Text>
      </View>
      <View style={styles.row}>
        <InteractiveToggle size={Size.Large} />
        <Text appearance={TextAppearance.Muted} size={Size.Small}>LG</Text>
      </View>
      <View style={styles.row}>
        <InteractiveToggle size={Size.ExtraLarge} />
        <Text appearance={TextAppearance.Muted} size={Size.Small}>XL</Text>
      </View>
      <View style={styles.row}>
        <InteractiveToggle size={Size.TwoXLarge} />
        <Text appearance={TextAppearance.Muted} size={Size.Small}>2XL</Text>
      </View>
    </View>
  ),
};

export const WithLabels: Story = {
  name: "With Labels",
  render: () => {
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [autoSave, setAutoSave] = useState(true);

    return (
      <View style={styles.settingsList}>
        <View style={styles.settingItem}>
          <View>
            <Text size={Size.Medium}>Notifications</Text>
            <Text appearance={TextAppearance.Muted} size={Size.Small}>
              Receive push notifications
            </Text>
          </View>
          <Toggle value={notifications} onValueChange={setNotifications} />
        </View>
        <View style={styles.settingItem}>
          <View>
            <Text size={Size.Medium}>Dark Mode</Text>
            <Text appearance={TextAppearance.Muted} size={Size.Small}>
              Use dark theme
            </Text>
          </View>
          <Toggle value={darkMode} onValueChange={setDarkMode} />
        </View>
        <View style={styles.settingItem}>
          <View>
            <Text size={Size.Medium}>Auto-save</Text>
            <Text appearance={TextAppearance.Muted} size={Size.Small}>
              Automatically save changes
            </Text>
          </View>
          <Toggle value={autoSave} onValueChange={setAutoSave} />
        </View>
      </View>
    );
  },
};

export const WithIcons: Story = {
  name: "With Icons (Light/Dark Mode)",
  render: () => {
    const [isDarkMode, setIsDarkMode] = useState(true);

    return (
      <View style={styles.column}>
        <View style={styles.row}>
          <Toggle
            value={isDarkMode}
            onValueChange={setIsDarkMode}
            leftIcon="sun"
            rightIcon="moon"
            size={Size.Large}
          />
          <Text appearance={TextAppearance.Muted} size={Size.Small}>
            {isDarkMode ? "Dark Mode" : "Light Mode"}
          </Text>
        </View>
        <View style={styles.row}>
          <Toggle
            value={isDarkMode}
            onValueChange={setIsDarkMode}
            leftIcon="sun"
            rightIcon="moon"
            size={Size.Medium}
          />
          <Text appearance={TextAppearance.Muted} size={Size.Small}>Medium</Text>
        </View>
        <View style={styles.row}>
          <Toggle
            value={isDarkMode}
            onValueChange={setIsDarkMode}
            leftIcon="sun"
            rightIcon="moon"
            size={Size.ExtraLarge}
          />
          <Text appearance={TextAppearance.Muted} size={Size.Small}>Extra Large</Text>
        </View>
      </View>
    );
  },
};

export const WithIconsVariants: Story = {
  name: "Icon Toggle Variants",
  render: () => {
    const [sound, setSound] = useState(true);
    const [visibility, setVisibility] = useState(false);
    const [lock, setLock] = useState(true);

    return (
      <View style={styles.column}>
        <View style={styles.row}>
          <Toggle
            value={visibility}
            onValueChange={setVisibility}
            leftIcon="eye-off"
            rightIcon="eye"
            size={Size.Large}
          />
          <Text appearance={TextAppearance.Muted} size={Size.Small}>
            {visibility ? "Visible" : "Hidden"}
          </Text>
        </View>
        <View style={styles.row}>
          <Toggle
            value={lock}
            onValueChange={setLock}
            leftIcon="unlock"
            rightIcon="lock"
            size={Size.Large}
          />
          <Text appearance={TextAppearance.Muted} size={Size.Small}>
            {lock ? "Locked" : "Unlocked"}
          </Text>
        </View>
      </View>
    );
  },
};

export const Loading: Story = {
  name: "Loading State",
  render: () => (
    <View style={styles.column}>
      <View style={styles.row}>
        <Toggle loading size={Size.Small} />
        <Text appearance={TextAppearance.Muted} size={Size.Small}>Loading</Text>
      </View>
      <View style={styles.row}>
        <Toggle loading size={Size.Medium} />
        <Text appearance={TextAppearance.Muted} size={Size.Small}>Loading</Text>
      </View>
      <View style={styles.row}>
        <Toggle loading size={Size.Large} />
        <Text appearance={TextAppearance.Muted} size={Size.Small}>Loading</Text>
      </View>
      <View style={styles.row}>
        <Toggle loading size={Size.Large} leftIcon="sun" rightIcon="moon" />
        <Text appearance={TextAppearance.Muted} size={Size.Small}>Loading with Icons</Text>
      </View>
      <View style={styles.row}>
        <Toggle value={true} size={Size.Medium} />
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
  settingsList: {
    width: 300,
    gap: 16,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.06)",
  },
});
