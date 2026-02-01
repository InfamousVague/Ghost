# getSizeStyles

Returns padding and font size values for a size variant.

## Signature

```tsx
function getSizeStyles(size: Size): SizeStyles
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `size` | `Size` | The size variant |

## Return Type

```tsx
type SizeStyles = {
  paddingVertical: string;
  paddingHorizontal: string;
  fontSize: string;
};
```

## Usage

```tsx
import { getSizeStyles } from 'ghost/helpers';
import { Size } from 'ghost/enums';

const styles = getSizeStyles(Size.Large);
// {
//   paddingVertical: "0.75rem",
//   paddingHorizontal: "1.25rem",
//   fontSize: "1.125rem"
// }
```

## Converting to Pixels

For React Native, convert rem values to pixels:

```tsx
const styles = getSizeStyles(Size.Medium);
const paddingVertical = parseFloat(styles.paddingVertical) * 16; // 8
const paddingHorizontal = parseFloat(styles.paddingHorizontal) * 16; // 16
const fontSize = parseFloat(styles.fontSize) * 16; // 16
```

## All Sizes

| Size | paddingVertical | paddingHorizontal | fontSize |
|------|-----------------|-------------------|----------|
| TwoXSmall | 0.25rem | 0.5rem | 0.625rem |
| ExtraSmall | 0.25rem | 0.75rem | 0.75rem |
| Small | 0.5rem | 0.75rem | 0.875rem |
| Medium | 0.5rem | 1rem | 1rem |
| Large | 0.75rem | 1.25rem | 1.125rem |
| ExtraLarge | 1rem | 1.5rem | 1.25rem |
| TwoXLarge | 1.25rem | 2rem | 1.5rem |
