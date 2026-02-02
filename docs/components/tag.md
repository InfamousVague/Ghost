# Tag

A directional indicator component for buy/sell signals and trade direction badges.

## Import

```tsx
import { Tag } from 'ghost/components';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `"up" \| "down" \| "neutral"` | required | Direction indicator |
| `label` | `string` | - | Optional label text (e.g., "BUY", "SELL") |
| `showIcon` | `boolean` | `true` | Whether to show the direction icon |
| `intensity` | `Intensity` | `Dim` | Color intensity level |
| `size` | `Size` | `Small` | Size variant |
| `loading` | `boolean` | `false` | Loading state |
| `style` | `ViewStyle` | - | Additional style overrides |

## Basic Usage

```tsx
import { Tag } from 'ghost/components';

<Tag direction="up" label="BUY" />
<Tag direction="down" label="SELL" />
```

## Directions

```tsx
<Tag direction="up" label="BUY" />      // Green with arrow-up icon
<Tag direction="down" label="SELL" />   // Red with arrow-down icon
<Tag direction="neutral" label="HOLD" /> // Gray with minus icon
```

## Icon Only

```tsx
// Shows just the directional arrow
<Tag direction="up" />
<Tag direction="down" />
```

## Hide Icon

```tsx
<Tag direction="up" label="LONG" showIcon={false} />
```

## Sizes

```tsx
import { Size } from 'ghost/enums';

<Tag direction="up" label="BUY" size={Size.TwoXSmall} />
<Tag direction="up" label="BUY" size={Size.Small} />
<Tag direction="up" label="BUY" size={Size.Medium} />
<Tag direction="up" label="BUY" size={Size.Large} />
```

## Intensity

The `intensity` prop controls color saturation. Both `Dim` and `Normal` use the same vibrant colors by default for trade indicators:

```tsx
import { Intensity } from 'ghost/enums';

<Tag direction="up" label="BUY" intensity={Intensity.Dim} />     // Default
<Tag direction="up" label="BUY" intensity={Intensity.Normal} />  // Same colors
```

## Loading State

```tsx
<Tag direction="up" label="BUY" loading />
// Renders a skeleton with matching border radius
```

## Trade Indicator Example

Replace custom trade badges with the Tag component:

```tsx
// Before (custom implementation)
<View style={[styles.tradeBadge, styles.buyBadge]}>
  <Icon name="arrow-up" color="#2FD575" />
  <Text style={styles.buyText}>BUY</Text>
</View>

// After (using Tag)
<Tag direction="up" label="BUY" size={Size.TwoXSmall} />
```

## Styling

The Tag component uses consistent styling that matches the original trade badge design:

- **Border Radius:** 4px (rectangular with soft corners, not pill-shaped)
- **Colors:**
  - Up: Green (`#2FD575`) with `rgba(47, 213, 117, 0.15)` background
  - Down: Red (`#FF5C7A`) with `rgba(255, 92, 122, 0.15)` background
- **Icons:** `arrow-up`, `arrow-down`, `minus`

## Complete Example

```tsx
import { Tag } from 'ghost/components';
import { Size } from 'ghost/enums';

function TradeIndicator({ direction }: { direction?: "up" | "down" }) {
  if (!direction) {
    return <Text>—</Text>;
  }

  return (
    <Tag
      direction={direction}
      label={direction === "up" ? "BUY" : "SELL"}
      size={Size.TwoXSmall}
    />
  );
}
```
