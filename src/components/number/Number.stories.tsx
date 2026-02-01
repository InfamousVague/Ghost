import type { Meta, StoryObj } from "@storybook/react-vite";
import { View, StyleSheet } from "react-native";
import { Number } from "./Number";
import { Text } from "../text/Text";
import { TextAppearance, Size, Brightness } from "../../enums";

const meta: Meta<typeof Number> = {
  title: "Components/Number",
  component: Number,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Number>;

export const Default: Story = {
  args: {
    value: 3376,
  },
};

export const LeadingZeros: Story = {
  name: "Intelligent Leading Zeros",
  render: () => (
    <View style={styles.column}>
      <View style={styles.row}>
        <View style={styles.item}>
          <Text appearance={TextAppearance.Muted} size={Size.Small}>
            Partial thousands (aesthetic)
          </Text>
          <Number value={3376} size={Size.TwoXLarge} weight="bold" />
        </View>
        <View style={styles.item}>
          <Text appearance={TextAppearance.Muted} size={Size.Small}>
            Full thousands (no leading zero)
          </Text>
          <Number value={13376} size={Size.TwoXLarge} weight="bold" />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.item}>
          <Text appearance={TextAppearance.Muted} size={Size.Small}>
            Percentage (0-100)
          </Text>
          <Number
            value={7}
            format={{ type: "percent", suffix: "%" }}
            size={Size.TwoXLarge}
            weight="bold"
          />
        </View>
        <View style={styles.item}>
          <Text appearance={TextAppearance.Muted} size={Size.Small}>
            Score with max
          </Text>
          <Number
            value={78}
            format={{ type: "score", max: 100 }}
            size={Size.TwoXLarge}
            weight="bold"
          />
        </View>
      </View>
    </View>
  ),
};

export const Percentages: Story = {
  render: () => (
    <View style={styles.column}>
      <View style={styles.row}>
        <Number
          value={7}
          format={{ type: "percent", suffix: "%" }}
          size={Size.ExtraLarge}
          weight="semibold"
        />
        <Number
          value={42}
          format={{ type: "percent", suffix: "%" }}
          size={Size.ExtraLarge}
          weight="semibold"
        />
        <Number
          value={100}
          format={{ type: "percent", suffix: "%" }}
          size={Size.ExtraLarge}
          weight="semibold"
        />
      </View>
    </View>
  ),
};

export const CurrencyFormatting: Story = {
  name: "Currency Formatting",
  render: () => (
    <View style={styles.column}>
      <View style={styles.item}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>
          Trailing zeros are dimmed
        </Text>
        <Number
          value={48654}
          format={{ prefix: "$", separator: ",", decimals: 2 }}
          size={Size.TwoXLarge}
          weight="bold"
        />
      </View>
      <View style={styles.row}>
        <View style={styles.item}>
          <Text appearance={TextAppearance.Muted} size={Size.Small}>
            Mixed decimals
          </Text>
          <Number
            value={1234.50}
            format={{ prefix: "$", separator: ",", decimals: 2 }}
            size={Size.ExtraLarge}
            weight="semibold"
          />
        </View>
        <View style={styles.item}>
          <Text appearance={TextAppearance.Muted} size={Size.Small}>
            No trailing zeros
          </Text>
          <Number
            value={99.99}
            format={{ prefix: "$", separator: ",", decimals: 2 }}
            size={Size.ExtraLarge}
            weight="semibold"
          />
        </View>
      </View>
      <View style={styles.row}>
        <Number
          value={-14}
          format={{ prefix: "- $", decimals: 2 }}
          appearance={TextAppearance.Danger}
          size={Size.Large}
          weight="medium"
        />
        <Number
          value={24.6}
          format={{ prefix: "+ $", decimals: 2 }}
          appearance={TextAppearance.Success}
          size={Size.Large}
          weight="medium"
        />
      </View>
    </View>
  ),
};

export const Appearances: Story = {
  render: () => (
    <View style={styles.column}>
      <Number value={1234} appearance={TextAppearance.Primary} size={Size.Large} />
      <Number value={1234} appearance={TextAppearance.Secondary} size={Size.Large} />
      <Number value={1234} appearance={TextAppearance.Link} size={Size.Large} />
      <Number value={1234} appearance={TextAppearance.Success} size={Size.Large} />
      <Number value={1234} appearance={TextAppearance.Warning} size={Size.Large} />
      <Number value={1234} appearance={TextAppearance.Danger} size={Size.Large} />
      <Number value={1234} appearance={TextAppearance.Info} size={Size.Large} />
    </View>
  ),
};

export const Sizes: Story = {
  render: () => (
    <View style={styles.column}>
      <Number value={3376} size={Size.TwoXSmall} />
      <Number value={3376} size={Size.ExtraSmall} />
      <Number value={3376} size={Size.Small} />
      <Number value={3376} size={Size.Medium} />
      <Number value={3376} size={Size.Large} />
      <Number value={3376} size={Size.ExtraLarge} />
      <Number value={3376} size={Size.TwoXLarge} />
    </View>
  ),
};

export const GlowEffects: Story = {
  name: "Glow Effects",
  render: () => (
    <View style={styles.column}>
      <View style={styles.row}>
        <Number
          value={3376}
          appearance={TextAppearance.Link}
          brightness={Brightness.None}
          size={Size.ExtraLarge}
          weight="bold"
        />
        <Number
          value={3376}
          appearance={TextAppearance.Link}
          brightness={Brightness.Soft}
          size={Size.ExtraLarge}
          weight="bold"
        />
        <Number
          value={3376}
          appearance={TextAppearance.Link}
          brightness={Brightness.Base}
          size={Size.ExtraLarge}
          weight="bold"
        />
        <Number
          value={3376}
          appearance={TextAppearance.Link}
          brightness={Brightness.Bright}
          size={Size.ExtraLarge}
          weight="bold"
        />
      </View>
    </View>
  ),
};

export const DashboardExample: Story = {
  name: "Dashboard Example",
  render: () => (
    <View style={styles.dashboard}>
      <View style={styles.card}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>
          TOTAL BALANCE
        </Text>
        <Number
          value={48654}
          format={{ prefix: "$", separator: ",", decimals: 2 }}
          appearance={TextAppearance.Primary}
          size={Size.TwoXLarge}
          weight="bold"
        />
      </View>
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
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
        </View>
        <View style={styles.statCard}>
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
        </View>
      </View>
    </View>
  ),
};

export const Loading: Story = {
  name: "Loading State",
  render: () => (
    <View style={styles.column}>
      <View style={styles.row}>
        <View style={styles.item}>
          <Text appearance={TextAppearance.Muted} size={Size.Small}>
            Loading
          </Text>
          <Number
            value={0}
            loading
            skeletonWidth={80}
            size={Size.TwoXLarge}
            weight="bold"
          />
        </View>
        <View style={styles.item}>
          <Text appearance={TextAppearance.Muted} size={Size.Small}>
            Loaded
          </Text>
          <Number
            value={3376}
            appearance={TextAppearance.Link}
            brightness={Brightness.Base}
            size={Size.TwoXLarge}
            weight="bold"
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.item}>
          <Text appearance={TextAppearance.Muted} size={Size.Small}>
            Currency Loading
          </Text>
          <Number
            value={0}
            loading
            skeletonWidth={100}
            format={{ prefix: "$", decimals: 2 }}
            size={Size.ExtraLarge}
          />
        </View>
        <View style={styles.item}>
          <Text appearance={TextAppearance.Muted} size={Size.Small}>
            Currency Loaded
          </Text>
          <Number
            value={1234.56}
            format={{ prefix: "$", separator: ",", decimals: 2 }}
            size={Size.ExtraLarge}
          />
        </View>
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
    gap: 24,
    flexWrap: "wrap",
    alignItems: "center",
  },
  item: {
    gap: 4,
  },
  dashboard: {
    gap: 16,
    maxWidth: 400,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    padding: 20,
    borderRadius: 12,
    gap: 8,
  },
  statsRow: {
    flexDirection: "row",
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    padding: 16,
    borderRadius: 12,
    gap: 4,
  },
});
