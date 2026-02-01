import type { Meta, StoryObj } from "@storybook/react-vite";
import { View, Text as RNText, StyleSheet } from "react-native";
import { Card, CardBorder, CardGlow } from "./Card";
import { Text } from "../text/Text";
import { Number } from "../number/Number";
import { Skeleton } from "../skeleton/Skeleton";
import { Shape, TextAppearance, Size, Brightness } from "../../enums";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

const CardContent = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <View>
    <RNText style={styles.title}>{title}</RNText>
    {subtitle && <RNText style={styles.subtitle}>{subtitle}</RNText>}
  </View>
);

export const Default: Story = {
  args: {
    children: <CardContent title="Default Card" subtitle="Jet black with subtle border" />,
  },
};

export const BorderStyles: Story = {
  render: () => (
    <View style={styles.grid}>
      <Card border={CardBorder.None}>
        <CardContent title="No Border" subtitle="Clean look" />
      </Card>
      <Card border={CardBorder.Solid}>
        <CardContent title="Solid Border" subtitle="Subtle edge" />
      </Card>
      <Card border={CardBorder.Gradient} glow={CardGlow.Silver}>
        <CardContent title="Gradient Shine" subtitle="Silver shine" />
      </Card>
    </View>
  ),
};

export const GlowColors: Story = {
  name: "Glow Presets",
  render: () => (
    <View style={styles.grid}>
      <Card border={CardBorder.Gradient} glow={CardGlow.Silver} padding={20}>
        <CardContent title="Silver" subtitle="Subtle white glow" />
      </Card>
      <Card border={CardBorder.Gradient} glow={CardGlow.Blue} padding={20}>
        <CardContent title="Blue" subtitle="Tech blue glow" />
      </Card>
      <Card border={CardBorder.Gradient} glow={CardGlow.Purple} padding={20}>
        <CardContent title="Purple" subtitle="Violet glow" />
      </Card>
      <Card border={CardBorder.Gradient} glow={CardGlow.Green} padding={20}>
        <CardContent title="Green" subtitle="Teal glow" />
      </Card>
      <Card border={CardBorder.Gradient} glow={CardGlow.Amber} padding={20}>
        <CardContent title="Amber" subtitle="Warm glow" />
      </Card>
      <Card border={CardBorder.Gradient} glow={CardGlow.Pink} padding={20}>
        <CardContent title="Pink" subtitle="Magenta glow" />
      </Card>
      <Card border={CardBorder.Gradient} glow={CardGlow.Coral} padding={20}>
        <CardContent title="Coral" subtitle="Red-pink glow" />
      </Card>
      <Card border={CardBorder.Gradient} glow={CardGlow.Cyan} padding={20}>
        <CardContent title="Cyan" subtitle="Aqua glow" />
      </Card>
    </View>
  ),
};

export const MultiColorGlows: Story = {
  name: "Multi-Color Glows",
  render: () => (
    <View style={styles.grid}>
      <Card border={CardBorder.Gradient} glow={CardGlow.Aurora} padding={24}>
        <CardContent title="Aurora" subtitle="Cyan, purple, green blend" />
      </Card>
      <Card border={CardBorder.Gradient} glow={CardGlow.Sunset} padding={24}>
        <CardContent title="Sunset" subtitle="Coral, amber, pink blend" />
      </Card>
    </View>
  ),
};

export const SeededGlow: Story = {
  name: "Seeded Glow (Deterministic)",
  render: () => (
    <View style={styles.grid}>
      <Card border={CardBorder.Gradient} glow={CardGlow.Blue} seed={1} padding={20}>
        <CardContent title="Seed: 1" subtitle="Same seed = same positions" />
      </Card>
      <Card border={CardBorder.Gradient} glow={CardGlow.Blue} seed={1} padding={20}>
        <CardContent title="Seed: 1" subtitle="Identical to above" />
      </Card>
      <Card border={CardBorder.Gradient} glow={CardGlow.Blue} seed={42} padding={20}>
        <CardContent title="Seed: 42" subtitle="Different positions" />
      </Card>
      <Card border={CardBorder.Gradient} glow={CardGlow.Blue} seed={123} padding={20}>
        <CardContent title="Seed: 123" subtitle="Different positions" />
      </Card>
    </View>
  ),
};

export const Shapes: Story = {
  render: () => (
    <View style={styles.grid}>
      <Card shape={Shape.Soft} border={CardBorder.Gradient} glow={CardGlow.Blue}>
        <CardContent title="Soft" />
      </Card>
      <Card shape={Shape.Rounded} border={CardBorder.Gradient} glow={CardGlow.Blue}>
        <CardContent title="Rounded" />
      </Card>
      <Card shape={Shape.Pill} border={CardBorder.Gradient} glow={CardGlow.Blue} padding={24}>
        <CardContent title="Pill" />
      </Card>
    </View>
  ),
};

export const DashboardExample: Story = {
  render: () => (
    <View style={styles.dashboard}>
      <Card border={CardBorder.Gradient} glow={CardGlow.Blue} seed={1} padding={20}>
        <RNText style={styles.label}>Total Balance</RNText>
        <RNText style={styles.value}>$48,654.00</RNText>
        <View style={styles.row}>
          <View style={[styles.badge, styles.primaryBadge]}>
            <RNText style={styles.badgeText}>Transfer</RNText>
          </View>
          <View style={[styles.badge, styles.secondaryBadge]}>
            <RNText style={styles.badgeText}>Withdraw</RNText>
          </View>
        </View>
      </Card>
      <View style={styles.dashboardRow}>
        <Card border={CardBorder.Gradient} glow={CardGlow.Blue} seed={2} padding={16} style={styles.flex}>
          <RNText style={styles.label}>Total Followers</RNText>
          <RNText style={[styles.value, styles.accentText]}>3,376</RNText>
          <RNText style={styles.subtitle}>+0.8% past 7 days</RNText>
        </Card>
        <Card border={CardBorder.Gradient} glow={CardGlow.Green} seed={3} padding={16} style={styles.flex}>
          <RNText style={styles.label}>Your Score</RNText>
          <RNText style={[styles.value, styles.successText]}>78</RNText>
          <RNText style={styles.subtitle}>Great progress!</RNText>
        </Card>
      </View>
      <Card border={CardBorder.Gradient} glow={CardGlow.Silver} seed={4} padding={16}>
        <RNText style={styles.title}>Recent Transaction</RNText>
        <View style={styles.transactionRow}>
          <RNText style={styles.transactionLabel}>Spotify</RNText>
          <RNText style={styles.dangerText}>- $14.00</RNText>
        </View>
        <View style={styles.transactionRow}>
          <RNText style={styles.transactionLabel}>Figma</RNText>
          <RNText style={styles.successText}>+ $24.60</RNText>
        </View>
      </Card>
    </View>
  ),
};

export const Loading: Story = {
  name: "Loading State",
  render: () => (
    <View style={styles.grid}>
      <Card border={CardBorder.Gradient} glow={CardGlow.Blue} padding={20}>
        <View style={{ gap: 8 }}>
          <Skeleton width={80} height={12} shape={Shape.Soft} />
          <Skeleton width={120} height={24} shape={Shape.Soft} />
        </View>
      </Card>
      <Card border={CardBorder.Gradient} glow={CardGlow.Blue} padding={20}>
        <CardContent title="Loaded" subtitle="Content visible" />
      </Card>
    </View>
  ),
};

export const CascadingLoading: Story = {
  name: "Cascading Loading (Context)",
  render: () => (
    <View style={styles.dashboard}>
      <View style={styles.dashboardRow}>
        <Card
          border={CardBorder.Gradient}
          glow={CardGlow.Blue}
          padding={16}
          loading
          style={styles.flex}
        >
          <Text appearance={TextAppearance.Muted} size={Size.Small}>
            TOTAL FOLLOWERS
          </Text>
          <Number
            value={3376}
            appearance={TextAppearance.Link}
            brightness={Brightness.Base}
            size={Size.TwoXLarge}
            weight="bold"
          />
          <Text appearance={TextAppearance.Muted} size={Size.Small}>
            +0.8% past 7 days
          </Text>
        </Card>
        <Card
          border={CardBorder.Gradient}
          glow={CardGlow.Green}
          padding={16}
          style={styles.flex}
        >
          <Text appearance={TextAppearance.Muted} size={Size.Small}>
            YOUR SCORE
          </Text>
          <Number
            value={78}
            format={{ type: "score", max: 100 }}
            appearance={TextAppearance.Success}
            brightness={Brightness.Base}
            size={Size.TwoXLarge}
            weight="bold"
          />
          <Text appearance={TextAppearance.Muted} size={Size.Small}>
            Great progress!
          </Text>
        </Card>
      </View>
      <RNText style={styles.subtitle}>
        Left card has loading=true, children auto-show skeletons
      </RNText>
    </View>
  ),
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    maxWidth: 700,
  },
  title: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  subtitle: {
    color: "#888888",
    fontSize: 14,
    marginTop: 4,
  },
  label: {
    color: "#888888",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  value: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "700",
    marginVertical: 8,
  },
  accentText: {
    color: "#3C82FF",
  },
  successText: {
    color: "#34C759",
  },
  dangerText: {
    color: "#FF453A",
  },
  row: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
  badge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  primaryBadge: {
    backgroundColor: "#3C82FF",
  },
  secondaryBadge: {
    backgroundColor: "#1a1a1a",
  },
  badgeText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
  },
  dashboard: {
    gap: 16,
    maxWidth: 400,
  },
  dashboardRow: {
    flexDirection: "row",
    gap: 16,
  },
  flex: {
    flex: 1,
  },
  transactionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.08)",
  },
  transactionLabel: {
    color: "#ffffff",
    fontSize: 14,
  },
});
