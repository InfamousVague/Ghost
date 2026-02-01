# Enums

Ghost uses TypeScript enums to provide type-safe styling options. Enums ensure consistency and enable IDE autocompletion.

## Available Enums

| Enum | Description |
|------|-------------|
| [Appearance](appearance.md) | Visual appearance variants (Primary, Success, etc.) |
| [Size](size.md) | Component size variants (Small, Medium, Large, etc.) |
| [Shape](shape.md) | Border radius shape variants (Rounded, Pill, etc.) |
| [Theme](theme.md) | Color theme modes (Light, Dark) |
| [TextAppearance](text-appearance.md) | Text color variants |
| [Brightness](brightness.md) | Glow intensity levels |

## Usage

Import enums from the enums module:

```tsx
import { Appearance, Size, Shape, Theme, TextAppearance, Brightness } from 'ghost/enums';
```

## With Components

```tsx
import { Button } from 'ghost/components';
import { Appearance, Size, Shape, Brightness } from 'ghost/enums';

<Button
  label="Submit"
  appearance={Appearance.Success}
  size={Size.Large}
  shape={Shape.Pill}
  brightness={Brightness.Bright}
/>
```

## With Helpers

```tsx
import { getAppearanceColor, getSizeStyles, getShapeRadius } from 'ghost/helpers';
import { Appearance, Size, Shape } from 'ghost/enums';

const colors = getAppearanceColor(Appearance.Primary);
const dimensions = getSizeStyles(Size.Medium);
const radius = getShapeRadius(Shape.Rounded);
```
