# Currency

A specialized currency display component built on top of Number with automatic symbol lookup and monetary formatting.

## Import

```tsx
import { Currency } from 'ghost/components';
import { TextAppearance, Size, Brightness } from 'ghost/enums';
```

## Usage

### Basic

```tsx
<Currency value={1234.56} currency="USD" />
// Renders: $1,234.56
```

### Different Currencies

```tsx
<Currency value={1234.56} currency="USD" />  // $1,234.56
<Currency value={1234.56} currency="EUR" />  // €1,234.56
<Currency value={1234.56} currency="GBP" />  // £1,234.56
<Currency value={12345} currency="JPY" decimals={0} />  // ¥12,345
<Currency value={0.04532} currency="BTC" decimals={5} />  // ₿0.04532
```

### Positive and Negative Values

```tsx
// Positive with sign
<Currency
  value={24.60}
  currency="USD"
  showPositiveSign
  appearance={TextAppearance.Success}
/>
// Renders: +$24.60

// Negative
<Currency
  value={-14.00}
  currency="USD"
  appearance={TextAppearance.Danger}
/>
// Renders: -$14.00
```

### With Glow

```tsx
<Currency
  value={48654.00}
  currency="USD"
  appearance={TextAppearance.Success}
  brightness={Brightness.Base}
  size={Size.TwoXLarge}
  weight="bold"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | Required | The numeric value to display |
| `currency` | `string` | `"USD"` | Currency code or symbol |
| `showPositiveSign` | `boolean` | `false` | Show + sign for positive values |
| `decimals` | `number` | `2` | Number of decimal places |
| `appearance` | `TextAppearance` | `Primary` | Text color appearance |
| `size` | `Size` | `Medium` | Font size |
| `brightness` | `Brightness` | `None` | Glow intensity |
| `weight` | `"regular" \| "medium" \| "semibold" \| "bold"` | `"regular"` | Font weight |
| `loading` | `boolean` | `false` | Show skeleton placeholder |
| `skeletonWidth` | `number` | - | Width for skeleton when loading |
| `style` | `TextStyle` | - | Additional style overrides |

## Supported Currency Codes

| Code | Symbol |
|------|--------|
| `USD` | $ |
| `EUR` | € |
| `GBP` | £ |
| `JPY` | ¥ |
| `CNY` | ¥ |
| `KRW` | ₩ |
| `INR` | ₹ |
| `BTC` | ₿ |
| `ETH` | Ξ |

You can also pass a custom symbol directly:

```tsx
<Currency value={100} currency="Ξ" />
```

## Visual Features

### Trailing Zeros

Trailing zeros in decimal places are displayed at 33% opacity for visual hierarchy:

```tsx
<Currency value={48654.00} currency="USD" />
// The .00 is dimmed
```

### Symbol Color

The currency symbol uses the primary text color for better visual hierarchy, while the number uses the specified appearance color.

## Dashboard Example

```tsx
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
    <View style={styles.card}>
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
    <View style={styles.card}>
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
</View>
```

## Loading State

The component supports loading state which cascades from parent Card components:

```tsx
<Currency value={0} loading skeletonWidth={100} />
```

Or automatically when inside a loading Card:

```tsx
<Card loading>
  <Currency value={48654.00} currency="USD" />
  {/* Shows skeleton automatically */}
</Card>
```
