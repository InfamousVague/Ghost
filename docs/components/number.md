# Number

A number display component with intelligent leading zeros, formatting options, and glow effects.

## Import

```tsx
import { Number } from 'ghost/components';
import { TextAppearance, Size, Brightness } from 'ghost/enums';
```

## Usage

### Basic

```tsx
<Number value={3376} />
// Renders: 03,376 (aesthetic leading zero for partial thousands)
```

### Percentages

```tsx
<Number
  value={7}
  format={{ type: "percent", suffix: "%" }}
  size={Size.ExtraLarge}
/>
// Renders: 07%
```

### Score with Max

```tsx
<Number
  value={78}
  format={{ type: "score", max: 100 }}
  size={Size.TwoXLarge}
  weight="bold"
/>
// Renders: 078
```

### Currency

```tsx
<Number
  value={48654}
  format={{ prefix: "$", separator: ",", decimals: 2 }}
  size={Size.TwoXLarge}
  weight="bold"
/>
// Renders: $48,654.00
```

### With Glow

```tsx
<Number
  value={3376}
  appearance={TextAppearance.Link}
  brightness={Brightness.Base}
  size={Size.ExtraLarge}
  weight="bold"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | Required | The numeric value to display |
| `format` | `NumberFormat` | `{}` | Format options (see below) |
| `appearance` | `TextAppearance` | `Primary` | Text color appearance |
| `size` | `Size` | `Medium` | Font size |
| `brightness` | `Brightness` | `None` | Glow intensity |
| `weight` | `"regular" \| "medium" \| "semibold" \| "bold"` | `"regular"` | Font weight |
| `style` | `TextStyle` | - | Additional style overrides |

## NumberFormat Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `type` | `"default" \| "percent" \| "score"` | `"default"` | Number type for intelligent leading zero detection |
| `max` | `number` | - | Maximum value (used for leading zero calculation) |
| `minDigits` | `number` | - | Minimum digits to display (pads with leading zeros) |
| `decimals` | `number` | - | Number of decimal places |
| `separator` | `string` | `","` | Thousands separator |
| `prefix` | `string` | `""` | Prefix (e.g., "$", "+") |
| `suffix` | `string` | `""` | Suffix (e.g., "%", "pts") |

## Intelligent Leading Zeros

The Number component automatically adds leading zeros based on context:

### Percentages (type: "percent")
Values 0-99 are padded to 2 digits, 100+ to 3 digits:
- `7` → `07`
- `42` → `42`
- `100` → `100`

### Scores (type: "score")
Pads to match the maximum value's digit count:
- `value={78} max={100}` → `078`
- `value={5} max={10}` → `05`

### Default (aesthetic)
Adds leading zeros for partial thousands groups to create visual balance:
- `3376` → `03,376` (partial 10k group)
- `13376` → `13,376` (complete 10k group, no padding)

## Appearances

```tsx
<Number value={1234} appearance={TextAppearance.Primary} />
<Number value={1234} appearance={TextAppearance.Secondary} />
<Number value={1234} appearance={TextAppearance.Link} />
<Number value={1234} appearance={TextAppearance.Success} />
<Number value={1234} appearance={TextAppearance.Warning} />
<Number value={1234} appearance={TextAppearance.Danger} />
<Number value={1234} appearance={TextAppearance.Info} />
```

## Sizes

```tsx
<Number value={3376} size={Size.TwoXSmall} />  // 10px
<Number value={3376} size={Size.ExtraSmall} /> // 12px
<Number value={3376} size={Size.Small} />      // 14px
<Number value={3376} size={Size.Medium} />     // 16px
<Number value={3376} size={Size.Large} />      // 18px
<Number value={3376} size={Size.ExtraLarge} /> // 20px
<Number value={3376} size={Size.TwoXLarge} />  // 24px
```

## Glow Effects

Glow effects are applied below the text (like button shadows) and don't affect layout:

```tsx
<Number
  value={3376}
  appearance={TextAppearance.Link}
  brightness={Brightness.None}   // No glow
/>
<Number
  value={3376}
  appearance={TextAppearance.Link}
  brightness={Brightness.Soft}   // Subtle glow
/>
<Number
  value={3376}
  appearance={TextAppearance.Link}
  brightness={Brightness.Base}   // Standard glow
/>
<Number
  value={3376}
  appearance={TextAppearance.Link}
  brightness={Brightness.Bright} // Intense glow
/>
```

Glows are available for these appearances:
- `TextAppearance.Link` - Blue glow
- `TextAppearance.Success` - Green glow
- `TextAppearance.Warning` - Amber glow
- `TextAppearance.Danger` - Red glow
- `TextAppearance.Info` - Cyan glow

## Dashboard Example

```tsx
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
    </View>
  </View>
</View>
```

## Typography

The Number component uses tabular (monospace) numbers via `fontVariant: ["tabular-nums"]` for proper alignment in tables and data displays.
