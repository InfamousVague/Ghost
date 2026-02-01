# Toggle

A toggle switch component with optional icons and labels for binary choices.

## Import

```tsx
import { Toggle } from 'ghost/components';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `boolean` | `false` | Whether the toggle is on |
| `onValueChange` | `(value: boolean) => void` | - | Value change callback |
| `size` | `Size` | `Medium` | Size variant |
| `disabled` | `boolean` | `false` | Disabled state |
| `loading` | `boolean` | `false` | Loading state |
| `leftIcon` | `IconName` | - | Icon on the left (off) side |
| `rightIcon` | `IconName` | - | Icon on the right (on) side |
| `leftLabel` | `string` | - | Label on the left side |
| `rightLabel` | `string` | - | Label on the right side |
| `style` | `ViewStyle` | - | Additional style overrides |

## Basic Usage

```tsx
import { Toggle } from 'ghost/components';
import { useState } from 'react';

function Example() {
  const [isOn, setIsOn] = useState(false);

  return (
    <Toggle value={isOn} onValueChange={setIsOn} />
  );
}
```

## With Icons (Light/Dark Mode)

```tsx
<Toggle
  value={isDarkMode}
  onValueChange={setIsDarkMode}
  leftIcon="sun"
  rightIcon="moon"
/>
// Sun icon visible when OFF (light mode)
// Moon icon visible when ON (dark mode)
```

## With Labels

```tsx
<Toggle
  value={isEnabled}
  onValueChange={setIsEnabled}
  leftLabel="Off"
  rightLabel="On"
/>
```

## Sizes

```tsx
import { Size } from 'ghost/enums';

<Toggle value={on} size={Size.TwoXSmall} />  // 28x16px
<Toggle value={on} size={Size.Small} />      // 36x20px
<Toggle value={on} size={Size.Medium} />     // 44x24px (default)
<Toggle value={on} size={Size.Large} />      // 52x28px
<Toggle value={on} size={Size.ExtraLarge} /> // 60x32px
```

## Disabled State

```tsx
<Toggle value={false} disabled />
<Toggle value={true} disabled />
```

## Loading State

```tsx
<Toggle loading />
// Renders a pill-shaped skeleton
```

## Complete Example

```tsx
import { View } from 'react-native';
import { Toggle, Text, Card } from 'ghost/components';
import { Size } from 'ghost/enums';
import { useState } from 'react';

function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  return (
    <Card>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text>Dark Mode</Text>
        <Toggle
          value={isDark}
          onValueChange={setIsDark}
          leftIcon="sun"
          rightIcon="moon"
          size={Size.Medium}
        />
      </View>
    </Card>
  );
}
```

## Visual Behavior

- **OFF state**: Track is gray (`Colors.background.overlay`), knob is on the left
- **ON state**: Track is accent color (`Colors.accent.primary`), knob is on the right
- Icons fade in/out based on toggle position:
  - Left icon is visible when ON (knob moved right)
  - Right icon is visible when OFF (knob moved left)
- Smooth animated transition between states

## Accessibility

The Toggle component:
- Uses Pressable for touch/click handling
- Animates position changes smoothly
- Shows clear visual distinction between on/off states
- Reduces opacity when disabled

## Use Cases

- Dark/light mode switching
- Feature toggles
- Setting preferences
- On/off switches
- Binary options
