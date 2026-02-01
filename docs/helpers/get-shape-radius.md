# getShapeRadius

Returns the border radius value for a shape variant.

## Signature

```tsx
function getShapeRadius(shape: Shape): string
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `shape` | `Shape` | The shape variant |

## Return Value

Returns a CSS border-radius string value.

## Usage

```tsx
import { getShapeRadius } from 'ghost/helpers';
import { Shape } from 'ghost/enums';

const radius = getShapeRadius(Shape.Rounded);
// "8px"

const pillRadius = getShapeRadius(Shape.Pill);
// "9999px"
```

## All Shapes

| Shape | Return Value |
|-------|--------------|
| Soft | `"4px"` |
| Rounded | `"8px"` |
| Pill | `"9999px"` |
| Circle | `"50%"` |

## With React Native

For React Native, parse the numeric value:

```tsx
const radius = getShapeRadius(Shape.Rounded);
const numericRadius = parseFloat(radius); // 8

// For Circle shape (50%), use a calculated value
const circleRadius = shape === Shape.Circle
  ? width / 2
  : parseFloat(getShapeRadius(shape));
```
