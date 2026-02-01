# Shape

The Shape enum defines border radius variants for component corners.

## Values

| Value | String | Description |
|-------|--------|-------------|
| `Soft` | `"soft"` | Subtle rounding (4px) |
| `Rounded` | `"rounded"` | Standard rounding (8px) |
| `Pill` | `"pill"` | Fully rounded ends (9999px) |
| `Circle` | `"circle"` | Perfect circle (50%) |

## Usage

```tsx
import { Shape } from 'ghost/enums';

<Button shape={Shape.Rounded} label="Default" />
<Button shape={Shape.Pill} label="Tag" />
<Button shape={Shape.Circle} label="+" />
```

## Radius Mapping

Each shape maps to a border-radius value via `getShapeRadius`:

| Shape | Radius Value |
|-------|--------------|
| Soft | `4px` |
| Rounded | `8px` |
| Pill | `9999px` |
| Circle | `50%` |

## Example

```tsx
import { getShapeRadius } from 'ghost/helpers';
import { Shape } from 'ghost/enums';

const pillRadius = getShapeRadius(Shape.Pill);
// "9999px"
```

## Visual Guide

- **Soft**: Use for cards and containers where you want subtle rounding
- **Rounded**: Default for buttons and interactive elements
- **Pill**: Great for tags, badges, and pill-shaped buttons
- **Circle**: Perfect for icon buttons and avatars
