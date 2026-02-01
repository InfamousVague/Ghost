# PercentChange

A component for displaying percent changes with automatic coloring and directional arrows.

## Import

```tsx
import { PercentChange } from 'ghost/components';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | required | The percent change value |
| `decimals` | `number` | `2` | Number of decimal places |
| `size` | `Size` | `Small` | Component size |
| `weight` | `"regular" \| "medium" \| "semibold" \| "bold"` | `medium` | Font weight |
| `showArrow` | `boolean` | `true` | Whether to show directional arrow |
| `showPercent` | `boolean` | `true` | Whether to show % suffix |
| `loading` | `boolean` | `false` | Loading state |
| `style` | `ViewStyle` | - | Additional style overrides |

## Basic Usage

```tsx
import { PercentChange } from 'ghost/components';

<PercentChange value={2.45} />
// Renders: ↑ 2.45% (in green)

<PercentChange value={-1.23} />
// Renders: ↓ 1.23% (in red)

<PercentChange value={0} />
// Renders: 0.00% (in muted color, no arrow)
```

## Without Arrow

```tsx
<PercentChange value={5.67} showArrow={false} />
// Renders: 5.67% (in green, no arrow)
```

## Without Percent Symbol

```tsx
<PercentChange value={12.5} showPercent={false} />
// Renders: ↑ 12.50
```

## Decimal Places

```tsx
<PercentChange value={3.14159} decimals={0} />
// Renders: ↑ 3%

<PercentChange value={3.14159} decimals={4} />
// Renders: ↑ 3.1416%
```

## Sizes

```tsx
import { Size } from 'ghost/enums';

<PercentChange value={5.5} size={Size.ExtraSmall} />
<PercentChange value={5.5} size={Size.Small} />
<PercentChange value={5.5} size={Size.Medium} />
<PercentChange value={5.5} size={Size.Large} />
```

## Font Weights

```tsx
<PercentChange value={2.5} weight="regular" />
<PercentChange value={2.5} weight="medium" />
<PercentChange value={2.5} weight="semibold" />
<PercentChange value={2.5} weight="bold" />
```

## Loading State

```tsx
<PercentChange value={0} loading />
// Renders a skeleton placeholder
```

## Color Behavior

The component automatically applies colors based on value:

| Value | Color | Arrow |
|-------|-------|-------|
| Positive (> 0) | Success (green) | Up arrow |
| Negative (< 0) | Danger (red) | Down arrow |
| Zero (= 0) | Muted (gray) | No arrow |

## Complete Example

```tsx
import { View } from 'react-native';
import { PercentChange, Text, Currency } from 'ghost/components';
import { Size } from 'ghost/enums';

function PriceDisplay({ price, change }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <Currency value={price} size={Size.Large} />
      <PercentChange value={change} size={Size.Small} />
    </View>
  );
}

<PriceDisplay price={45000} change={2.45} />
// Shows: $45,000.00 ↑ 2.45%
```
