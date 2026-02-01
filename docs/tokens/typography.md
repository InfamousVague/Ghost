# Typography

The typography token system provides consistent values for font sizes, weights, and line heights.

## Font Size Scale

| Token | Value | Pixels |
|-------|-------|--------|
| `xxs` | `0.625rem` | 10px |
| `xs` | `0.75rem` | 12px |
| `sm` | `0.875rem` | 14px |
| `md` | `1rem` | 16px |
| `lg` | `1.125rem` | 18px |
| `xl` | `1.25rem` | 20px |
| `xxl` | `1.5rem` | 24px |

## Font Weight Scale

| Token | Value | Description |
|-------|-------|-------------|
| `normal` | `400` | Normal weight |
| `medium` | `500` | Medium weight |
| `semibold` | `600` | Semibold weight |
| `bold` | `700` | Bold weight |

## Line Height Scale

| Token | Value | Description |
|-------|-------|-------------|
| `tight` | `1.25` | Tight line height |
| `normal` | `1.5` | Normal line height |
| `relaxed` | `1.75` | Relaxed line height |

## Usage

```tsx
import { Typography } from 'ghost/tokens';

const styles = StyleSheet.create({
  heading: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    lineHeight: Typography.lineHeight.tight,
  },
  body: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.normal,
    lineHeight: Typography.lineHeight.normal,
  },
  caption: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.normal,
    lineHeight: Typography.lineHeight.relaxed,
  },
});
```

## Size to Typography Mapping

The Size enum maps to font sizes through the `getSizeStyles` helper:

| Size | Font Size |
|------|-----------|
| TwoXSmall | `xxs` (10px) |
| ExtraSmall | `xs` (12px) |
| Small | `sm` (14px) |
| Medium | `md` (16px) |
| Large | `lg` (18px) |
| ExtraLarge | `xl` (20px) |
| TwoXLarge | `xxl` (24px) |
