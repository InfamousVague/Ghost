# Size

The Size enum defines component size variants that affect padding and font size.

## Values

| Value | String | Description |
|-------|--------|-------------|
| `TwoXSmall` | `"2xs"` | Extra extra small |
| `ExtraSmall` | `"xs"` | Extra small |
| `Small` | `"sm"` | Small |
| `Medium` | `"md"` | Medium (default) |
| `Large` | `"lg"` | Large |
| `ExtraLarge` | `"xl"` | Extra large |
| `TwoXLarge` | `"2xl"` | Extra extra large |

## Usage

```tsx
import { Size } from 'ghost/enums';

<Button size={Size.Small} label="Compact" />
<Button size={Size.Medium} label="Default" />
<Button size={Size.Large} label="Prominent" />
```

## Style Mapping

Each size maps to specific styles via `getSizeStyles`:

| Size | Vertical Padding | Horizontal Padding | Font Size |
|------|------------------|-------------------|-----------|
| TwoXSmall | 4px | 8px | 10px |
| ExtraSmall | 4px | 12px | 12px |
| Small | 8px | 12px | 14px |
| Medium | 8px | 16px | 16px |
| Large | 12px | 20px | 18px |
| ExtraLarge | 16px | 24px | 20px |
| TwoXLarge | 20px | 32px | 24px |

## Example

```tsx
import { getSizeStyles } from 'ghost/helpers';
import { Size } from 'ghost/enums';

const largeStyles = getSizeStyles(Size.Large);
// {
//   paddingVertical: "0.75rem",
//   paddingHorizontal: "1.25rem",
//   fontSize: "1.125rem"
// }
```
