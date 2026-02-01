# Radii

The radii token system provides consistent border radius values for corner rounding.

## Values

| Token | Value | Description |
|-------|-------|-------------|
| `none` | `0` | No rounding |
| `soft` | `4px` | Subtle rounding |
| `rounded` | `8px` | Standard rounding |
| `pill` | `9999px` | Pill/capsule shape |
| `circle` | `50%` | Perfect circle |

## Usage

```tsx
import { Radii } from 'ghost/tokens';

const styles = StyleSheet.create({
  card: {
    borderRadius: Radii.rounded,
  },
  tag: {
    borderRadius: Radii.pill,
  },
  avatar: {
    borderRadius: Radii.circle,
  },
});
```

## Shape to Radii Mapping

The Shape enum maps to radii values through the `getShapeRadius` helper:

| Shape | Radii Token |
|-------|-------------|
| Soft | `soft` (4px) |
| Rounded | `rounded` (8px) |
| Pill | `pill` (9999px) |
| Circle | `circle` (50%) |

## Example

```tsx
import { getShapeRadius } from 'ghost/helpers';
import { Shape } from 'ghost/enums';

const radius = getShapeRadius(Shape.Pill);
// "9999px"
```
