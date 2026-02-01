# Divider

A divider component for separating content with optional label support.

## Import

```tsx
import { Divider } from 'ghost/components';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `"horizontal" \| "vertical"` | `horizontal` | Divider orientation |
| `size` | `Size` | `Small` | Thickness variant |
| `label` | `string` | - | Optional label text (horizontal only) |
| `color` | `string` | `Colors.border.subtle` | Divider color |
| `loading` | `boolean` | `false` | Loading state |
| `spacing` | `number` | `0` | Spacing around the divider |
| `style` | `ViewStyle` | - | Additional style overrides |

## Basic Usage

```tsx
import { Divider } from 'ghost/components';

<Text>Section 1</Text>
<Divider />
<Text>Section 2</Text>
```

## With Label

```tsx
<Divider label="OR" />
<Divider label="Continue with" />
```

## Vertical Divider

```tsx
import { View } from 'react-native';

<View style={{ flexDirection: 'row', alignItems: 'center', height: 40 }}>
  <Text>Left</Text>
  <Divider orientation="vertical" />
  <Text>Right</Text>
</View>
```

## Thickness (Size)

```tsx
import { Size } from 'ghost/enums';

<Divider size={Size.Small} />      // 1px
<Divider size={Size.Medium} />     // 1px
<Divider size={Size.Large} />      // 1.5px
<Divider size={Size.ExtraLarge} /> // 2px
```

## Custom Color

```tsx
<Divider color="#FF0000" />
<Divider color="rgba(255, 255, 255, 0.2)" />
```

## With Spacing

```tsx
<Divider spacing={16} />
// Adds marginVertical: 16 for horizontal
// Adds marginHorizontal: 16 for vertical
```

## Loading State

```tsx
<Divider loading />
```

## Complete Example

```tsx
import { View } from 'react-native';
import { Divider } from 'ghost/components';
import { Size } from 'ghost/enums';

<View>
  <Text>Sign in with email</Text>

  <Divider label="OR" spacing={20} />

  <Button label="Continue with Google" />
</View>
```
