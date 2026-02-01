# Card

A versatile container component with organic glows and gradient borders for creating visually striking UI elements.

## Import

```tsx
import { Card, CardBorder, CardGlow } from 'ghost/components';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | required | Card content |
| `border` | `CardBorder` | `Solid` | Border style |
| `glow` | `CardGlow` | - | Preset glow color |
| `shape` | `Shape` | `Rounded` | Border radius style |
| `seed` | `number` | - | Seed for deterministic glow/border placement |
| `padding` | `number` | `16` | Inner padding |
| `style` | `ViewStyle` | - | Additional style overrides |

## Basic Usage

```tsx
import { Card } from 'ghost/components';
import { Text } from 'react-native';

<Card>
  <Text>Simple card with solid border</Text>
</Card>
```

## Border Styles

The `CardBorder` enum provides three border options:

```tsx
import { Card, CardBorder } from 'ghost/components';

// No border
<Card border={CardBorder.None}>
  <Text>Clean look</Text>
</Card>

// Solid subtle border (default)
<Card border={CardBorder.Solid}>
  <Text>Subtle edge</Text>
</Card>

// Gradient border with shine effect
<Card border={CardBorder.Gradient} glow={CardGlow.Blue}>
  <Text>Glowing glass effect</Text>
</Card>
```

## Glow Presets

The `CardGlow` enum provides preset glow colors that create an organic light effect bleeding into the card:

### Single Color Glows

```tsx
import { Card, CardBorder, CardGlow } from 'ghost/components';

<Card border={CardBorder.Gradient} glow={CardGlow.Silver}>Silver</Card>
<Card border={CardBorder.Gradient} glow={CardGlow.Blue}>Blue</Card>
<Card border={CardBorder.Gradient} glow={CardGlow.Purple}>Purple</Card>
<Card border={CardBorder.Gradient} glow={CardGlow.Green}>Green</Card>
<Card border={CardBorder.Gradient} glow={CardGlow.Amber}>Amber</Card>
<Card border={CardBorder.Gradient} glow={CardGlow.Pink}>Pink</Card>
<Card border={CardBorder.Gradient} glow={CardGlow.Coral}>Coral</Card>
<Card border={CardBorder.Gradient} glow={CardGlow.Cyan}>Cyan</Card>
```

### Multi-Color Glows

```tsx
// Aurora: Cyan, purple, and green blend
<Card border={CardBorder.Gradient} glow={CardGlow.Aurora}>
  <Text>Aurora effect</Text>
</Card>

// Sunset: Coral, amber, and pink blend
<Card border={CardBorder.Gradient} glow={CardGlow.Sunset}>
  <Text>Sunset effect</Text>
</Card>
```

## Shapes

```tsx
import { Shape } from 'ghost/enums';

<Card shape={Shape.Soft} glow={CardGlow.Blue}>Soft corners</Card>
<Card shape={Shape.Rounded} glow={CardGlow.Blue}>Rounded corners</Card>
<Card shape={Shape.Pill} glow={CardGlow.Blue}>Pill shape</Card>
```

## Deterministic Positioning

Use the `seed` prop to ensure consistent glow and border gradient placement across renders. Cards with the same seed will always have identical glow positions:

```tsx
// These two cards will have identical glow positions
<Card glow={CardGlow.Blue} seed={1}>Card A</Card>
<Card glow={CardGlow.Blue} seed={1}>Card B</Card>

// Different seed produces different positions
<Card glow={CardGlow.Blue} seed={42}>Card C</Card>
```

This is useful for:
- Dashboard layouts where you want consistent appearance
- Lists where each card should have a unique but stable glow position
- Preventing visual "jumping" on re-renders

## Dashboard Example

```tsx
import { View } from 'react-native';
import { Card, CardBorder, CardGlow } from 'ghost/components';

<View style={{ gap: 16 }}>
  <Card border={CardBorder.Gradient} glow={CardGlow.Blue} seed={1} padding={20}>
    <Text style={styles.label}>Total Balance</Text>
    <Text style={styles.value}>$48,654.00</Text>
  </Card>

  <View style={{ flexDirection: 'row', gap: 16 }}>
    <Card border={CardBorder.Gradient} glow={CardGlow.Blue} seed={2} padding={16}>
      <Text style={styles.label}>Followers</Text>
      <Text style={styles.value}>3,376</Text>
    </Card>

    <Card border={CardBorder.Gradient} glow={CardGlow.Green} seed={3} padding={16}>
      <Text style={styles.label}>Score</Text>
      <Text style={styles.value}>78</Text>
    </Card>
  </View>
</View>
```

## Platform Considerations

### Web
On web, the glow effect uses CSS radial gradients for smooth, performant rendering.

### Native (iOS/Android)
On native platforms, a simplified glow effect is rendered using border styles for better performance.

## Complete Example

```tsx
import { Card, CardBorder, CardGlow } from 'ghost/components';
import { Shape } from 'ghost/enums';

<Card
  border={CardBorder.Gradient}
  glow={CardGlow.Aurora}
  shape={Shape.Rounded}
  seed={42}
  padding={24}
  style={{ minWidth: 300 }}
>
  <Text style={{ color: '#fff', fontSize: 18 }}>
    Beautiful glowing card
  </Text>
</Card>
```
