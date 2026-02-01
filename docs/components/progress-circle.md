# ProgressCircle

A circular progress indicator with optional value display and glow effect.

## Import

```tsx
import { ProgressCircle } from 'ghost/components';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `0` | Progress value |
| `max` | `number` | `100` | Maximum value |
| `size` | `Size` | `Large` | Size variant |
| `appearance` | `TextAppearance` | `Link` | Color appearance |
| `brightness` | `Brightness` | `None` | Glow intensity |
| `showValue` | `boolean` | `true` | Show value inside circle |
| `label` | `string` | - | Label text below the value |
| `loading` | `boolean` | `false` | Loading state |
| `style` | `ViewStyle` | - | Additional style overrides |

## Basic Usage

```tsx
import { ProgressCircle } from 'ghost/components';

<ProgressCircle value={78} />
// Shows a circle 78% filled with "78" displayed inside
```

## With Label

```tsx
<ProgressCircle value={78} label="YOUR SCORE" />
// Shows "78" with "YOUR SCORE" below
```

## Without Value Display

```tsx
<ProgressCircle value={65} showValue={false} />
// Shows only the circular progress, no text
```

## Sizes

```tsx
import { Size } from 'ghost/enums';

<ProgressCircle value={50} size={Size.Small} />      // 64px diameter
<ProgressCircle value={50} size={Size.Medium} />     // 80px diameter
<ProgressCircle value={50} size={Size.Large} />      // 96px diameter (default)
<ProgressCircle value={50} size={Size.ExtraLarge} /> // 120px diameter
<ProgressCircle value={50} size={Size.TwoXLarge} />  // 144px diameter
```

## Color Appearances

```tsx
import { TextAppearance } from 'ghost/enums';

<ProgressCircle value={75} appearance={TextAppearance.Primary} />
<ProgressCircle value={75} appearance={TextAppearance.Success} />
<ProgressCircle value={75} appearance={TextAppearance.Warning} />
<ProgressCircle value={75} appearance={TextAppearance.Danger} />
<ProgressCircle value={75} appearance={TextAppearance.Info} />
<ProgressCircle value={75} appearance={TextAppearance.Link} />
```

## Glow Effect

```tsx
import { Brightness } from 'ghost/enums';

<ProgressCircle value={78} brightness={Brightness.Soft} />
<ProgressCircle value={78} brightness={Brightness.Base} />
<ProgressCircle value={78} brightness={Brightness.Bright} />
```

## Custom Max Value

```tsx
<ProgressCircle value={7} max={10} label="7 OF 10" />
// Shows "007" with intelligent leading zeros
```

## Loading State

```tsx
<ProgressCircle loading />
// Renders a circular skeleton
```

## Complete Example

```tsx
import { View } from 'react-native';
import { ProgressCircle, Card, CardGlow, CardBorder } from 'ghost/components';
import { TextAppearance, Brightness, Size } from 'ghost/enums';

function FearGreedIndex({ value }) {
  const getAppearance = (v) => {
    if (v <= 25) return TextAppearance.Danger;
    if (v <= 45) return TextAppearance.Warning;
    if (v <= 55) return TextAppearance.Primary;
    if (v <= 75) return TextAppearance.Success;
    return TextAppearance.Success;
  };

  return (
    <Card border={CardBorder.Gradient} glow={CardGlow.Blue}>
      <ProgressCircle
        value={value}
        max={100}
        appearance={getAppearance(value)}
        brightness={Brightness.Base}
        size={Size.ExtraLarge}
        showValue
        label="FEAR & GREED"
      />
    </Card>
  );
}
```

## Use Cases

- Score displays
- Fear & Greed index
- Completion percentage
- Rating indicators
- Health/energy meters
- Timer countdowns
