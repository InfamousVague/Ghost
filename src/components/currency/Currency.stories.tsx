import type { Meta, StoryObj } from "@storybook/react-vite";
import { View, StyleSheet } from "react-native";
import { Currency } from "./Currency";
import { Text } from "../text/Text";
import { TextAppearance, Size, Brightness } from "../../enums";

const meta: Meta<typeof Currency> = {
  title: "Components/Currency",
  component: Currency,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Currency>;

export const Default: Story = {
  args: {
    value: 1234.56,
    currency: "USD",
  },
};

export const Currencies: Story = {
  name: "Different Currencies",
  render: () => (
    <View style={styles.column}>
      <View style={styles.row}>
        <View style={styles.item}>
          <Text appearance={TextAppearance.Muted} size={Size.Small}>USD</Text>
          <Currency value={1234.56} currency="USD" size={Size.Large} weight="semibold" />
        </View>
        <View style={styles.item}>
          <Text appearance={TextAppearance.Muted} size={Size.Small}>EUR</Text>
          <Currency value={1234.56} currency="EUR" size={Size.Large} weight="semibold" />
        </View>
        <View style={styles.item}>
          <Text appearance={TextAppearance.Muted} size={Size.Small}>GBP</Text>
          <Currency value={1234.56} currency="GBP" size={Size.Large} weight="semibold" />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.item}>
          <Text appearance={TextAppearance.Muted} size={Size.Small}>JPY</Text>
          <Currency value={12345} currency="JPY" decimals={0} size={Size.Large} weight="semibold" />
        </View>
        <View style={styles.item}>
          <Text appearance={TextAppearance.Muted} size={Size.Small}>BTC</Text>
          <Currency value={0.04532} currency="BTC" decimals={5} size={Size.Large} weight="semibold" />
        </View>
        <View style={styles.item}>
          <Text appearance={TextAppearance.Muted} size={Size.Small}>ETH</Text>
          <Currency value={1.2345} currency="ETH" decimals={4} size={Size.Large} weight="semibold" />
        </View>
      </View>
    </View>
  ),
};

export const SignedValues: Story = {
  name: "Positive and Negative",
  render: () => (
    <View style={styles.column}>
      <View style={styles.row}>
        <View style={styles.item}>
          <Text appearance={TextAppearance.Muted} size={Size.Small}>Positive (no sign)</Text>
          <Currency
            value={24.60}
            currency="USD"
            size={Size.Large}
            weight="semibold"
          />
        </View>
        <View style={styles.item}>
          <Text appearance={TextAppearance.Muted} size={Size.Small}>Positive (with sign)</Text>
          <Currency
            value={24.60}
            currency="USD"
            showPositiveSign
            appearance={TextAppearance.Success}
            brightness={Brightness.Base}
            size={Size.Large}
            weight="semibold"
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.item}>
          <Text appearance={TextAppearance.Muted} size={Size.Small}>Negative</Text>
          <Currency
            value={-14.00}
            currency="USD"
            appearance={TextAppearance.Danger}
            brightness={Brightness.Base}
            size={Size.Large}
            weight="semibold"
          />
        </View>
        <View style={styles.item}>
          <Text appearance={TextAppearance.Muted} size={Size.Small}>Zero</Text>
          <Currency
            value={0}
            currency="USD"
            size={Size.Large}
            weight="semibold"
          />
        </View>
      </View>
    </View>
  ),
};

export const TrailingZeros: Story = {
  name: "Trailing Zeros (Dimmed)",
  render: () => (
    <View style={styles.column}>
      <View style={styles.row}>
        <View style={styles.item}>
          <Text appearance={TextAppearance.Muted} size={Size.Small}>$48,654.00</Text>
          <Currency
            value={48654.00}
            currency="USD"
            size={Size.TwoXLarge}
            weight="bold"
          />
        </View>
        <View style={styles.item}>
          <Text appearance={TextAppearance.Muted} size={Size.Small}>$1,234.50</Text>
          <Currency
            value={1234.50}
            currency="USD"
            size={Size.TwoXLarge}
            weight="bold"
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.item}>
          <Text appearance={TextAppearance.Muted} size={Size.Small}>$99.99</Text>
          <Currency
            value={99.99}
            currency="USD"
            size={Size.TwoXLarge}
            weight="bold"
          />
        </View>
        <View style={styles.item}>
          <Text appearance={TextAppearance.Muted} size={Size.Small}>$10.10</Text>
          <Currency
            value={10.10}
            currency="USD"
            size={Size.TwoXLarge}
            weight="bold"
          />
        </View>
      </View>
    </View>
  ),
};

export const Appearances: Story = {
  render: () => (
    <View style={styles.column}>
      <Currency value={1234.56} appearance={TextAppearance.Primary} size={Size.Large} />
      <Currency value={1234.56} appearance={TextAppearance.Secondary} size={Size.Large} />
      <Currency value={1234.56} showPositiveSign appearance={TextAppearance.Success} size={Size.Large} />
      <Currency value={-1234.56} appearance={TextAppearance.Danger} size={Size.Large} />
      <Currency value={1234.56} appearance={TextAppearance.Link} size={Size.Large} />
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
        <Currency
          value={48654.00}
          currency="USD"
          size={Size.TwoXLarge}
          weight="bold"
        />
      </View>
      <View style={styles.row}>
        <View style={[styles.card, styles.flex]}>
          <Text appearance={TextAppearance.Muted} size={Size.Small}>
            INCOME
          </Text>
          <Currency
            value={2450.00}
            currency="USD"
            showPositiveSign
            appearance={TextAppearance.Success}
            brightness={Brightness.Base}
            size={Size.Large}
            weight="semibold"
          />
        </View>
        <View style={[styles.card, styles.flex]}>
          <Text appearance={TextAppearance.Muted} size={Size.Small}>
            EXPENSES
          </Text>
          <Currency
            value={-1280.50}
            currency="USD"
            appearance={TextAppearance.Danger}
            brightness={Brightness.Base}
            size={Size.Large}
            weight="semibold"
          />
        </View>
      </View>
      <View style={styles.card}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>
          TRANSACTIONS
        </Text>
        <View style={styles.transaction}>
          <Text size={Size.Medium}>Spotify</Text>
          <Currency
            value={-14.00}
            currency="USD"
            appearance={TextAppearance.Danger}
            size={Size.Medium}
            weight="medium"
          />
        </View>
        <View style={styles.transaction}>
          <Text size={Size.Medium}>Figma</Text>
          <Currency
            value={24.60}
            currency="USD"
            showPositiveSign
            appearance={TextAppearance.Success}
            size={Size.Medium}
            weight="medium"
          />
        </View>
      </View>
    </View>
  ),
};

export const Loading: Story = {
  name: "Loading State",
  render: () => (
    <View style={styles.row}>
      <View style={styles.item}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>Loading</Text>
        <Currency
          value={0}
          loading
          skeletonWidth={100}
          size={Size.TwoXLarge}
          weight="bold"
        />
      </View>
      <View style={styles.item}>
        <Text appearance={TextAppearance.Muted} size={Size.Small}>Loaded</Text>
        <Currency
          value={48654.00}
          currency="USD"
          size={Size.TwoXLarge}
          weight="bold"
        />
      </View>
    </View>
  ),
};

const styles = StyleSheet.create({
  column: {
    gap: 24,
  },
  row: {
    flexDirection: "row",
    gap: 32,
    flexWrap: "wrap",
  },
  item: {
    gap: 4,
  },
  flex: {
    flex: 1,
  },
  dashboard: {
    gap: 16,
    maxWidth: 400,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  transaction: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.06)",
  },
});
