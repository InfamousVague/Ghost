# ProgressBar

A horizontal progress bar component with optional glow effect.

## Import

```tsx
import { ProgressBar } from 'ghost/components';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `0` | Progress value |
| `max` | `number` | `100` | Maximum value |
| `size` | `Size` | `Medium` | Size/thickness variant |
| `appearance` | `TextAppearance` | `Primary` | Color appearance |
| `brightness` | `Brightness` | `None` | Glow intensity |
| `indeterminate` | `boolean` | `false` | Indeterminate loading state |
| `loading` | `boolean` | `false` | Loading state |
| `style` | `ViewStyle` | - | Additional style overrides |

## Basic Usage

```tsx
import { ProgressBar } from 'ghost/components';

<ProgressBar value={65} />
// Shows a bar filled to 65%
```

## With Custom Max

```tsx
<ProgressBar value={7} max={10} />
// Shows 70% filled

<ProgressBar value={150} max={200} />
// Shows 75% filled
```

## Sizes (Thickness)

```tsx
import { Size } from 'ghost/enums';

<ProgressBar value={50} size={Size.TwoXSmall} />  // 2px
<ProgressBar value={50} size={Size.Small} />      // 6px
<ProgressBar value={50} size={Size.Medium} />     // 8px (default)
<ProgressBar value={50} size={Size.Large} />      // 10px
<ProgressBar value={50} size={Size.TwoXLarge} />  // 16px
```

## Color Appearances

```tsx
import { TextAppearance } from 'ghost/enums';

<ProgressBar value={50} appearance={TextAppearance.Primary} />
<ProgressBar value={50} appearance={TextAppearance.Success} />
<ProgressBar value={50} appearance={TextAppearance.Warning} />
<ProgressBar value={50} appearance={TextAppearance.Danger} />
<ProgressBar value={50} appearance={TextAppearance.Info} />
```

## Glow Effect

```tsx
import { Brightness } from 'ghost/enums';

<ProgressBar value={75} brightness={Brightness.Soft} />
<ProgressBar value={75} brightness={Brightness.Base} />
<ProgressBar value={75} brightness={Brightness.Bright} />
```

## Loading State

```tsx
<ProgressBar loading />
// Renders a skeleton bar
```

## Complete Example

```tsx
import { View } from 'react-native';
import { ProgressBar, Text } from 'ghost/components';
import { TextAppearance, Brightness, Size } from 'ghost/enums';

function DownloadProgress({ bytesLoaded, totalBytes }) {
  const percent = (bytesLoaded / totalBytes) * 100;

  return (
    <View style={{ gap: 8 }}>
      <Text>Downloading... {percent.toFixed(0)}%</Text>
      <ProgressBar
        value={bytesLoaded}
        max={totalBytes}
        appearance={TextAppearance.Success}
        brightness={Brightness.Base}
        size={Size.Medium}
      />
    </View>
  );
}
```

## Use Cases

- File upload/download progress
- Form completion indicators
- Loading states
- Skill bars
- Storage usage
- Task progress
