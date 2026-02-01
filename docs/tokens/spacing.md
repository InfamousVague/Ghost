# Spacing

The spacing token system provides a consistent scale for padding, margins, and gaps.

## Scale

| Token | Value | Pixels |
|-------|-------|--------|
| `none` | `0` | 0px |
| `xxs` | `0.25rem` | 4px |
| `xs` | `0.5rem` | 8px |
| `sm` | `0.75rem` | 12px |
| `md` | `1rem` | 16px |
| `lg` | `1.25rem` | 20px |
| `xl` | `1.5rem` | 24px |
| `xxl` | `2rem` | 32px |

## Usage

```tsx
import { Spacing } from 'ghost/tokens';

const styles = StyleSheet.create({
  container: {
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  section: {
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  compact: {
    padding: Spacing.xs,
  },
});
```

## Size to Spacing Mapping

The Size enum maps to spacing values through the `getSizeStyles` helper:

| Size | Vertical Padding | Horizontal Padding |
|------|------------------|-------------------|
| TwoXSmall | `xxs` (4px) | `xs` (8px) |
| ExtraSmall | `xxs` (4px) | `sm` (12px) |
| Small | `xs` (8px) | `sm` (12px) |
| Medium | `xs` (8px) | `md` (16px) |
| Large | `sm` (12px) | `lg` (20px) |
| ExtraLarge | `md` (16px) | `xl` (24px) |
| TwoXLarge | `lg` (20px) | `xxl` (32px) |
