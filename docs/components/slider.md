# Slider

A range slider component with optional glow effect for value selection.

## Import

```tsx
import { Slider } from 'ghost/components';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `50` | Current value |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `step` | `number` | `1` | Step increment |
| `size` | `Size` | `Medium` | Size variant |
| `appearance` | `TextAppearance` | `Primary` | Color appearance |
| `brightness` | `Brightness` | `None` | Glow intensity |
| `disabled` | `boolean` | `false` | Disabled state |
| `loading` | `boolean` | `false` | Loading state |
| `onChange` | `(value: number) => void` | - | Value change callback |
| `style` | `ViewStyle` | - | Additional style overrides |

## Basic Usage

```tsx
import { Slider } from 'ghost/components';
import { useState } from 'react';

function Example() {
  const [value, setValue] = useState(50);

  return (
    <Slider value={value} onChange={setValue} />
  );
}
```

## Custom Range

```tsx
<Slider
  value={size}
  min={100}
  max={400}
  onChange={setSize}
/>
```

## Step Increment

```tsx
<Slider
  value={volume}
  min={0}
  max={100}
  step={10}
  onChange={setVolume}
/>
// Values snap to 0, 10, 20, 30... 100
```

## Sizes

```tsx
import { Size } from 'ghost/enums';

<Slider value={50} size={Size.Small} />      // 4px track, 14px thumb
<Slider value={50} size={Size.Medium} />     // 5px track, 16px thumb
<Slider value={50} size={Size.Large} />      // 6px track, 18px thumb
<Slider value={50} size={Size.ExtraLarge} /> // 8px track, 22px thumb
```

## Color Appearances

```tsx
import { TextAppearance } from 'ghost/enums';

<Slider value={50} appearance={TextAppearance.Primary} />
<Slider value={50} appearance={TextAppearance.Success} />
<Slider value={50} appearance={TextAppearance.Warning} />
<Slider value={50} appearance={TextAppearance.Danger} />
<Slider value={50} appearance={TextAppearance.Info} />
```

## Glow Effect

```tsx
import { Brightness } from 'ghost/enums';

<Slider value={75} brightness={Brightness.Soft} />
<Slider value={75} brightness={Brightness.Base} />
<Slider value={75} brightness={Brightness.Bright} />
```

## Disabled State

```tsx
<Slider value={50} disabled />
```

## Loading State

```tsx
<Slider loading />
// Renders a skeleton bar
```

## Complete Example

```tsx
import { View } from 'react-native';
import { Slider, Text, Number } from 'ghost/components';
import { TextAppearance, Brightness, Size } from 'ghost/enums';
import { useState } from 'react';

function CardSizeSlider() {
  const [cardSize, setCardSize] = useState(220);

  return (
    <View style={{ gap: 8 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text>Card Size</Text>
        <Number value={cardSize} format={{ suffix: 'px' }} />
      </View>
      <Slider
        value={cardSize}
        min={140}
        max={400}
        step={10}
        onChange={setCardSize}
        appearance={TextAppearance.Primary}
        brightness={Brightness.Soft}
      />
    </View>
  );
}
```

## Platform Notes

### Web
On web, the component uses a native `<input type="range">` overlaid with custom styling for the best user experience, including:
- Full keyboard accessibility
- Native drag behavior
- Custom styled thumb and track

### Native (iOS/Android)
On native platforms, the component renders a visual track. For full interactivity, consider using a gesture handler library.

## Use Cases

- Volume controls
- Brightness adjustment
- Size/scale controls
- Range selection
- Numeric input with visual feedback
