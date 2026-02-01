# Text

A text component with support for text appearance, size, weight, and glow effects.

## Import

```tsx
import { Text } from 'ghost/components';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | required | Text content |
| `appearance` | `TextAppearance` | `Primary` | Text color appearance |
| `size` | `Size` | `Medium` | Text size |
| `brightness` | `Brightness` | `None` | Glow intensity |
| `weight` | `"regular" \| "medium" \| "semibold" \| "bold"` | `"regular"` | Font weight |
| `style` | `TextStyle` | - | Additional style overrides |

## Basic Usage

```tsx
import { Text } from 'ghost/components';

<Text>Default text</Text>
```

## Appearances

The `TextAppearance` enum controls text color:

```tsx
import { TextAppearance } from 'ghost/enums';

// Text hierarchy
<Text appearance={TextAppearance.Primary}>Main content</Text>
<Text appearance={TextAppearance.Secondary}>Supporting content</Text>
<Text appearance={TextAppearance.Muted}>De-emphasized content</Text>

// Interactive
<Text appearance={TextAppearance.Link}>Interactive link</Text>

// Semantic
<Text appearance={TextAppearance.Success}>Positive message</Text>
<Text appearance={TextAppearance.Warning}>Caution message</Text>
<Text appearance={TextAppearance.Danger}>Error message</Text>
<Text appearance={TextAppearance.Info}>Informational message</Text>
```

## Sizes

```tsx
import { Size } from 'ghost/enums';

<Text size={Size.TwoXSmall}>2XS (10px)</Text>
<Text size={Size.ExtraSmall}>XS (12px)</Text>
<Text size={Size.Small}>Small (14px)</Text>
<Text size={Size.Medium}>Medium (16px)</Text>
<Text size={Size.Large}>Large (18px)</Text>
<Text size={Size.ExtraLarge}>XL (20px)</Text>
<Text size={Size.TwoXLarge}>2XL (24px)</Text>
```

## Weights

```tsx
<Text weight="regular">Regular weight (400)</Text>
<Text weight="medium">Medium weight (500)</Text>
<Text weight="semibold">Semibold weight (600)</Text>
<Text weight="bold">Bold weight (700)</Text>
```

## Glow Effects

Semantic text appearances (Link, Success, Warning, Danger, Info) support glow effects via the `brightness` prop:

```tsx
import { Brightness } from 'ghost/enums';

<Text appearance={TextAppearance.Link} brightness={Brightness.None}>
  No glow
</Text>
<Text appearance={TextAppearance.Link} brightness={Brightness.Soft}>
  Soft glow
</Text>
<Text appearance={TextAppearance.Link} brightness={Brightness.Base}>
  Base glow
</Text>
<Text appearance={TextAppearance.Link} brightness={Brightness.Bright}>
  Bright glow
</Text>
```

### Layout Consistency

Glows are rendered using `textShadow` on web and do not affect the physical space the component occupies. This ensures consistent layouts when mixing glowing and non-glowing text:

```tsx
<View style={{ gap: 8 }}>
  <Text>Regular text</Text>
  <Text appearance={TextAppearance.Link} brightness={Brightness.Bright}>
    Glowing text (same height)
  </Text>
  <Text>Regular text</Text>
</View>
```

## Combined Example

```tsx
import { Text } from 'ghost/components';
import { TextAppearance, Size, Brightness } from 'ghost/enums';

<Text
  appearance={TextAppearance.Link}
  size={Size.Large}
  weight="semibold"
  brightness={Brightness.Bright}
>
  Large Glowing Link
</Text>
```

## Platform Support

- **Web**: Uses CSS `text-shadow` for glow effects
- **iOS/Android**: Uses native shadow properties

## Accessibility

The Text component uses the standard React Native `Text` component internally, preserving all accessibility features:

```tsx
<Text accessibilityRole="header" accessibilityLabel="Welcome message">
  Welcome!
</Text>
```
