# Button

A customizable button component with support for multiple appearances, sizes, and shapes.

## Import

```tsx
import { Button } from 'ghost/components';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | required | Button text |
| `appearance` | `Appearance` | `Primary` | Visual style |
| `size` | `Size` | `Medium` | Size variant |
| `shape` | `Shape` | `Rounded` | Border radius style |
| `brightness` | `Brightness` | `Base` | Glow intensity |
| `onPress` | `() => void` | - | Press handler |
| `disabled` | `boolean` | `false` | Disabled state |
| `loading` | `boolean` | `false` | Loading state (shows skeleton) |
| `iconLeft` | `IconName` | - | Icon before label |
| `iconRight` | `IconName` | - | Icon after label |
| `backgroundOpacity` | `number` | - | Background opacity (0-1), enables soft color mode |

## Basic Usage

```tsx
import { Button } from 'ghost/components';

<Button label="Click me" onPress={() => console.log('Pressed!')} />
```

## Appearances

```tsx
import { Appearance } from 'ghost/enums';

<Button appearance={Appearance.Primary} label="Primary" />
<Button appearance={Appearance.Secondary} label="Secondary" />
<Button appearance={Appearance.Success} label="Success" />
<Button appearance={Appearance.Warning} label="Warning" />
<Button appearance={Appearance.Danger} label="Danger" />
<Button appearance={Appearance.Info} label="Info" />
<Button appearance={Appearance.Ghost} label="Ghost" />
```

## Sizes

```tsx
import { Size } from 'ghost/enums';

<Button size={Size.TwoXSmall} label="2XS" />
<Button size={Size.ExtraSmall} label="XS" />
<Button size={Size.Small} label="Small" />
<Button size={Size.Medium} label="Medium" />
<Button size={Size.Large} label="Large" />
<Button size={Size.ExtraLarge} label="XL" />
<Button size={Size.TwoXLarge} label="2XL" />
```

## Shapes

```tsx
import { Shape } from 'ghost/enums';

<Button shape={Shape.Soft} label="Soft" />
<Button shape={Shape.Rounded} label="Rounded" />
<Button shape={Shape.Pill} label="Pill" />
<Button shape={Shape.Circle} label="+" />
```

## Brightness (Glow)

```tsx
import { Brightness } from 'ghost/enums';

<Button brightness={Brightness.None} label="No glow" />
<Button brightness={Brightness.Soft} label="Soft glow" />
<Button brightness={Brightness.Base} label="Base glow" />
<Button brightness={Brightness.Bright} label="Bright glow" />
```

## Disabled State

```tsx
<Button label="Disabled" disabled />
```

## Semi-Transparent Background

Use `backgroundOpacity` for soft-colored buttons like trade indicators. When set, the background becomes semi-transparent and the text/icon color matches the appearance color.

```tsx
import { Appearance } from 'ghost/enums';

// Soft green button (like trade tags)
<Button
  label="Gainers"
  iconLeft="trending-up"
  appearance={Appearance.Success}
  backgroundOpacity={0.15}
/>

// Soft red button
<Button
  label="Losers"
  iconLeft="trending-down"
  appearance={Appearance.Danger}
  backgroundOpacity={0.15}
/>
```

## With Icons

```tsx
<Button label="Back" iconLeft="arrow-left" appearance={Appearance.Ghost} />
<Button label="Next" iconRight="arrow-right" />
<Button label="Download" iconLeft="download" iconRight="external-link" />
```

## Complete Example

```tsx
import { Button } from 'ghost/components';
import { Appearance, Size, Shape, Brightness } from 'ghost/enums';

<Button
  label="Submit"
  appearance={Appearance.Success}
  size={Size.Large}
  shape={Shape.Pill}
  brightness={Brightness.Bright}
  onPress={() => handleSubmit()}
/>
```

## Accessibility

The Button component includes:
- `accessibilityRole="button"` for screen readers
- `accessibilityState={{ disabled }}` when disabled
- Visual opacity change when disabled (0.5)
