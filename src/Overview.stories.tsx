import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { View, StyleSheet, ScrollView } from "react-native";

// Components
import { Text } from "./components/text/Text";
import { Button } from "./components/button/Button";
import { Card, CardBorder, CardGlow } from "./components/card/Card";
import { Input } from "./components/input/Input";
import { Toggle } from "./components/toggle/Toggle";
import { Checkbox } from "./components/checkbox/Checkbox";
import { Badge } from "./components/badge/Badge";
import { Avatar } from "./components/avatar/Avatar";
import { Icon, type IconName } from "./components/icon/Icon";
import { Divider } from "./components/divider/Divider";
import { ProgressBar } from "./components/progress-bar/ProgressBar";
import { ProgressCircle } from "./components/progress-circle/ProgressCircle";
import { Number } from "./components/number/Number";
import { Currency } from "./components/currency/Currency";
import { Skeleton, TextSkeleton } from "./components/skeleton/Skeleton";

// Enums
import { Size, TextAppearance, Shape, Brightness, Appearance } from "./enums";
import { Colors } from "./tokens";

const meta: Meta = {
  title: "Overview",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text size={Size.Large} weight="bold" style={styles.sectionTitle}>
        {title}
      </Text>
      <View style={styles.sectionContent}>{children}</View>
    </View>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.subSection}>
      <Text size={Size.Small} appearance={TextAppearance.Muted} style={styles.subSectionTitle}>
        {title}
      </Text>
      {children}
    </View>
  );
}

export const AllComponents: StoryObj = {
  name: "All Components",
  render: () => {
    const [toggleValue, setToggleValue] = useState(false);
    const [darkMode, setDarkMode] = useState(true);
    const [checkboxValue, setCheckboxValue] = useState(false);
    const [inputValue, setInputValue] = useState("");

    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text size={Size.TwoXLarge} weight="bold">
            Ghost Design System
          </Text>
          <Text appearance={TextAppearance.Muted} size={Size.Medium}>
            A comprehensive component library for React Native
          </Text>
        </View>

        {/* Typography */}
        <Section title="Typography">
          <SubSection title="Text Sizes">
            <View style={styles.row}>
              <Text size={Size.TwoXSmall}>2XS Text</Text>
              <Text size={Size.ExtraSmall}>XS Text</Text>
              <Text size={Size.Small}>Small Text</Text>
              <Text size={Size.Medium}>Medium Text</Text>
              <Text size={Size.Large}>Large Text</Text>
              <Text size={Size.ExtraLarge}>XL Text</Text>
              <Text size={Size.TwoXLarge}>2XL Text</Text>
            </View>
          </SubSection>
          <SubSection title="Text Appearances">
            <View style={styles.row}>
              <Text appearance={TextAppearance.Primary}>Primary</Text>
              <Text appearance={TextAppearance.Secondary}>Secondary</Text>
              <Text appearance={TextAppearance.Muted}>Muted</Text>
              <Text appearance={TextAppearance.Link}>Link</Text>
              <Text appearance={TextAppearance.Success}>Success</Text>
              <Text appearance={TextAppearance.Warning}>Warning</Text>
              <Text appearance={TextAppearance.Danger}>Danger</Text>
              <Text appearance={TextAppearance.Info}>Info</Text>
            </View>
          </SubSection>
        </Section>

        {/* Numbers & Currency */}
        <Section title="Numbers & Currency">
          <SubSection title="Number Formats">
            <View style={styles.row}>
              <Number value={3376} size={Size.Large} />
              <Number value={78} format={{ type: "score", max: 100 }} size={Size.Large} />
              <Number value={7} format={{ type: "percent", suffix: "%" }} size={Size.Large} />
            </View>
          </SubSection>
          <SubSection title="Currency">
            <View style={styles.row}>
              <Currency value={1234.56} size={Size.Large} />
              <Currency value={24.60} showPositiveSign appearance={TextAppearance.Success} size={Size.Large} />
              <Currency value={-14.00} appearance={TextAppearance.Danger} size={Size.Large} />
            </View>
          </SubSection>
          <SubSection title="With Glow">
            <View style={styles.row}>
              <Number value={98} format={{ type: "score", max: 100 }} appearance={TextAppearance.Success} brightness={Brightness.Bright} size={Size.ExtraLarge} weight="bold" />
              <Currency value={2456.78} appearance={TextAppearance.Link} brightness={Brightness.Bright} size={Size.ExtraLarge} weight="bold" />
            </View>
          </SubSection>
        </Section>

        {/* Buttons */}
        <Section title="Buttons">
          <SubSection title="Appearances">
            <View style={styles.row}>
              <Button label="Primary" appearance={Appearance.Primary} />
              <Button label="Secondary" appearance={Appearance.Secondary} />
              <Button label="Ghost" appearance={Appearance.Ghost} />
              <Button label="Danger" appearance={Appearance.Danger} />
            </View>
          </SubSection>
          <SubSection title="Sizes">
            <View style={styles.row}>
              <Button label="Small" size={Size.Small} />
              <Button label="Medium" size={Size.Medium} />
              <Button label="Large" size={Size.Large} />
            </View>
          </SubSection>
          <SubSection title="Shapes">
            <View style={styles.row}>
              <Button label="Soft" shape={Shape.Soft} />
              <Button label="Rounded" shape={Shape.Rounded} />
              <Button label="Pill" shape={Shape.Pill} />
            </View>
          </SubSection>
        </Section>

        {/* Inputs */}
        <Section title="Inputs">
          <SubSection title="Input Variants">
            <View style={styles.inputColumn}>
              <Input placeholder="Basic input" value={inputValue} onChangeText={setInputValue} />
              <Input placeholder="With leading icon" leadingIcon="search" />
              <Input placeholder="With trailing icon" trailingIcon="calendar" />
              <Input placeholder="With error" error />
              <Input placeholder="Disabled" disabled />
            </View>
          </SubSection>
        </Section>

        {/* Toggle & Checkbox */}
        <Section title="Toggle & Checkbox">
          <SubSection title="Toggle">
            <View style={styles.row}>
              <Toggle value={toggleValue} onValueChange={setToggleValue} />
              <Toggle value={true} disabled />
              <Toggle value={false} disabled />
            </View>
          </SubSection>
          <SubSection title="Toggle with Icons (Light/Dark Mode)">
            <View style={styles.row}>
              <Toggle
                value={darkMode}
                onValueChange={setDarkMode}
                leftIcon="sun"
                rightIcon="moon"
                size={Size.Large}
              />
              <Text appearance={TextAppearance.Muted} size={Size.Small}>
                {darkMode ? "Dark Mode" : "Light Mode"}
              </Text>
            </View>
          </SubSection>
          <SubSection title="Checkbox">
            <View style={styles.row}>
              <Checkbox checked={checkboxValue} onValueChange={setCheckboxValue} label="Accept terms" />
              <Checkbox checked={true} label="Checked" />
              <Checkbox indeterminate label="Indeterminate" />
            </View>
          </SubSection>
        </Section>

        {/* Progress */}
        <Section title="Progress Indicators">
          <SubSection title="Progress Bar">
            <View style={styles.progressColumn}>
              <ProgressBar value={25} appearance={TextAppearance.Primary} />
              <ProgressBar value={50} appearance={TextAppearance.Link} />
              <ProgressBar value={75} appearance={TextAppearance.Success} />
              <ProgressBar value={95} appearance={TextAppearance.Danger} />
            </View>
          </SubSection>
          <SubSection title="Progress Circle">
            <View style={styles.row}>
              <ProgressCircle value={78} showValue label="SCORE" size={Size.Large} />
              <ProgressCircle value={92} showValue appearance={TextAppearance.Success} size={Size.Large} />
              <ProgressCircle value={45} showValue appearance={TextAppearance.Warning} size={Size.Large} />
            </View>
          </SubSection>
        </Section>

        {/* Avatars & Badges */}
        <Section title="Avatars & Badges">
          <SubSection title="Avatars">
            <View style={styles.row}>
              <Avatar uri="https://i.pravatar.cc/150?img=1" size={Size.Medium} />
              <Avatar uri="https://i.pravatar.cc/150?img=2" size={Size.Medium} status="online" />
              <Avatar uri="https://i.pravatar.cc/150?img=3" size={Size.Medium} status="busy" />
              <Avatar initials="JD" size={Size.Medium} />
              <Avatar initials="AB" size={Size.Medium} status="away" />
            </View>
          </SubSection>
          <SubSection title="Badges">
            <View style={styles.row}>
              <Badge label="Default" />
              <Badge label="Primary" variant="primary" />
              <Badge label="Success" variant="success" icon="check" />
              <Badge label="Warning" variant="warning" />
              <Badge label="Danger" variant="danger" />
              <Badge label="Info" variant="info" />
              <Badge label="Outline" variant="outline" />
            </View>
          </SubSection>
        </Section>

        {/* Icons */}
        <Section title="Icons">
          <SubSection title="Icon Gallery">
            <View style={styles.iconGrid}>
              {(["search", "calendar", "settings", "user", "bell", "home", "star", "heart", "edit", "trash", "copy", "eye", "lock", "info", "warning", "error", "success", "sun", "moon", "menu", "plus", "minus", "check", "close"] as IconName[]).map((name) => (
                <View key={name} style={styles.iconItem}>
                  <Icon name={name} size={Size.Large} />
                  <Text size={Size.TwoXSmall} appearance={TextAppearance.Muted}>{name}</Text>
                </View>
              ))}
            </View>
          </SubSection>
        </Section>

        {/* Cards */}
        <Section title="Cards">
          <SubSection title="Card Variants">
            <View style={styles.cardRow}>
              <Card style={styles.card}>
                <Text weight="semibold">Default Card</Text>
                <Text size={Size.Small} appearance={TextAppearance.Muted}>Basic card container</Text>
              </Card>
              <Card style={styles.card} border={CardBorder.Gradient}>
                <Text weight="semibold">With Border</Text>
                <Text size={Size.Small} appearance={TextAppearance.Muted}>Subtle gradient border</Text>
              </Card>
              <Card style={styles.card} glow={CardGlow.Blue}>
                <Text weight="semibold">With Glow</Text>
                <Text size={Size.Small} appearance={TextAppearance.Muted}>Ambient glow effect</Text>
              </Card>
            </View>
          </SubSection>
        </Section>

        {/* Dividers */}
        <Section title="Dividers">
          <SubSection title="Horizontal">
            <View style={styles.dividerContainer}>
              <Text size={Size.Small}>Content above</Text>
              <Divider spacing={12} />
              <Text size={Size.Small}>Content below</Text>
            </View>
          </SubSection>
          <SubSection title="With Label">
            <View style={styles.dividerContainer}>
              <Divider label="OR" />
            </View>
          </SubSection>
        </Section>

        {/* Loading States */}
        <Section title="Loading States">
          <SubSection title="Skeleton Loaders">
            <View style={styles.skeletonRow}>
              <Skeleton width={100} height={20} />
              <Skeleton width={150} height={20} />
              <Skeleton width={80} height={20} />
            </View>
            <View style={styles.skeletonRow}>
              <Skeleton width={40} height={40} borderRadius={20} />
              <View style={styles.skeletonColumn}>
                <Skeleton width={120} height={14} />
                <Skeleton width={80} height={12} />
              </View>
            </View>
          </SubSection>
          <SubSection title="Component Loading States">
            <View style={styles.row}>
              <Button label="Button" loading />
              <Toggle loading size={Size.Large} />
              <Avatar loading size={Size.Large} />
              <Badge loading label="Badge" />
            </View>
          </SubSection>
        </Section>

        <View style={styles.footer}>
          <Text appearance={TextAppearance.Muted} size={Size.Small}>
            Ghost Design System v1.0
          </Text>
        </View>
      </ScrollView>
    );
  },
};

export const LoadingStates: StoryObj = {
  name: "Loading States Comparison",
  render: () => (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text size={Size.TwoXLarge} weight="bold">
          Loading States
        </Text>
        <Text appearance={TextAppearance.Muted} size={Size.Medium}>
          Every component with skeleton loading support
        </Text>
      </View>

      <Section title="Side by Side Comparison">
        <View style={styles.comparisonGrid}>
          <View style={styles.comparisonColumn}>
            <Text size={Size.Small} appearance={TextAppearance.Muted} style={styles.columnHeader}>Loading</Text>
            <Button label="Button" loading />
            <Input placeholder="Input" loading />
            <Toggle loading size={Size.Medium} />
            <Toggle loading size={Size.Large} leftIcon="sun" rightIcon="moon" />
            <Checkbox loading label="Checkbox" />
            <Avatar loading size={Size.Large} />
            <Badge loading label="Badge" />
            <View style={{ width: 200 }}>
              <ProgressBar loading />
            </View>
            <ProgressCircle loading size={Size.Medium} />
            <View style={{ width: 200 }}>
              <Divider loading />
            </View>
            <Currency loading value={0} />
            <Number loading value={0} />
          </View>

          <View style={styles.comparisonColumn}>
            <Text size={Size.Small} appearance={TextAppearance.Muted} style={styles.columnHeader}>Loaded</Text>
            <Button label="Button" />
            <Input placeholder="Input" />
            <Toggle value={true} size={Size.Medium} />
            <Toggle value={true} size={Size.Large} leftIcon="sun" rightIcon="moon" />
            <Checkbox checked label="Checkbox" />
            <Avatar uri="https://i.pravatar.cc/150?img=1" size={Size.Large} />
            <Badge label="Badge" variant="success" />
            <View style={{ width: 200 }}>
              <ProgressBar value={65} />
            </View>
            <ProgressCircle value={78} showValue size={Size.Medium} />
            <View style={{ width: 200 }}>
              <Divider />
            </View>
            <Currency value={1234.56} />
            <Number value={3376} />
          </View>
        </View>
      </Section>
    </ScrollView>
  ),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.canvas,
  },
  header: {
    padding: 32,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.subtle,
  },
  section: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.subtle,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  sectionContent: {
    gap: 24,
  },
  subSection: {
    gap: 12,
  },
  subSectionTitle: {
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 16,
  },
  inputColumn: {
    gap: 12,
    maxWidth: 300,
  },
  progressColumn: {
    gap: 12,
    maxWidth: 300,
  },
  iconGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  iconItem: {
    alignItems: "center",
    gap: 4,
    width: 60,
  },
  cardRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  card: {
    padding: 16,
    gap: 4,
    width: 180,
  },
  dividerContainer: {
    width: 300,
    gap: 8,
  },
  skeletonRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  skeletonColumn: {
    gap: 6,
  },
  footer: {
    padding: 32,
    alignItems: "center",
  },
  comparisonGrid: {
    flexDirection: "row",
    gap: 48,
  },
  comparisonColumn: {
    gap: 16,
    alignItems: "flex-start",
  },
  columnHeader: {
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
