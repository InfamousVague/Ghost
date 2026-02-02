# Intensity

Color intensity levels for semantic colors, controlling saturation and brightness.

## Import

```tsx
import { Intensity } from 'ghost/enums';
```

## Values

| Value | Description |
|-------|-------------|
| `Dim` | Softer, subdued colors - ideal for background indicators |
| `Normal` | Standard color intensity (default for most components) |
| `Vivid` | More saturated, vibrant colors - for emphasis |

## Usage

### With Tag Component

```tsx
import { Tag } from 'ghost/components';
import { Intensity } from 'ghost/enums';

// Dim intensity (default for subtle trade indicators)
<Tag direction="up" label="BUY" intensity={Intensity.Dim} />

// Normal intensity for more prominent indicators
<Tag direction="up" label="BUY" intensity={Intensity.Normal} />
```

### With getAppearanceColor

```tsx
import { getAppearanceColor } from 'ghost/helpers';
import { Appearance, Intensity } from 'ghost/enums';

// Get dim Success colors
const dimColors = getAppearanceColor(Appearance.Success, 1, Intensity.Dim);
// {
//   background: Colors.status.successDimSurface,
//   text: Colors.status.successDim,
//   ...
// }

// Get normal Success colors
const normalColors = getAppearanceColor(Appearance.Success, 1, Intensity.Normal);
// {
//   background: Colors.status.success,
//   text: Colors.text.primary,
//   ...
// }
```

## Color Tokens

The Intensity enum works with dim color variants in the Colors token:

```typescript
Colors.status.success         // Normal: #2FD575
Colors.status.successDim      // Dim: #4CAF82
Colors.status.successSurface  // Normal surface: #102820
Colors.status.successDimSurface // Dim surface: #0D201A

Colors.status.danger          // Normal: #FF5C7A
Colors.status.dangerDim       // Dim: #E57A8C
Colors.status.dangerSurface   // Normal surface: #2C151D
Colors.status.dangerDimSurface // Dim surface: #231519
```

## Use Cases

| Intensity | Use Case |
|-----------|----------|
| `Dim` | Trade direction badges, subtle status indicators |
| `Normal` | Primary action buttons, important alerts |
| `Vivid` | Critical warnings, emphasis states |

## TypeScript

```typescript
export enum Intensity {
  Dim = "dim",
  Normal = "normal",
  Vivid = "vivid",
}
```
