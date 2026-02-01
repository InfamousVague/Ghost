# Badge

A badge component for displaying labels, statuses, and counts with various visual variants.

## Import

```tsx
import { Badge } from 'ghost/components';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | required | Badge text content |
| `variant` | `BadgeVariant` | `default` | Visual variant |
| `size` | `Size` | `Small` | Size variant |
| `icon` | `IconName` | - | Icon to display before the label |
| `dot` | `boolean` | `false` | Show as a dot (no text) |
| `loading` | `boolean` | `false` | Loading state |
| `style` | `ViewStyle` | - | Additional style overrides |

## Basic Usage

```tsx
import { Badge } from 'ghost/components';

<Badge label="New" />
```

## Variants

```tsx
<Badge label="Default" variant="default" />
<Badge label="Primary" variant="primary" />
<Badge label="Success" variant="success" />
<Badge label="Warning" variant="warning" />
<Badge label="Danger" variant="danger" />
<Badge label="Info" variant="info" />
<Badge label="Outline" variant="outline" />
```

## With Icons

```tsx
<Badge label="Verified" icon="check" variant="success" />
<Badge label="Error" icon="error" variant="danger" />
<Badge label="Settings" icon="settings" />
```

## Sizes

```tsx
import { Size } from 'ghost/enums';

<Badge label="2XS" size={Size.TwoXSmall} />
<Badge label="XS" size={Size.ExtraSmall} />
<Badge label="Small" size={Size.Small} />
<Badge label="Medium" size={Size.Medium} />
<Badge label="Large" size={Size.Large} />
```

## Status Dot

Use the `dot` prop to display a simple status indicator:

```tsx
<Badge dot variant="success" />  // Green dot
<Badge dot variant="danger" />   // Red dot
<Badge dot variant="warning" />  // Yellow dot
```

## Loading State

```tsx
<Badge label="Loading" loading />
// Renders a pill-shaped skeleton
```

## Complete Example

```tsx
import { Badge } from 'ghost/components';
import { Size } from 'ghost/enums';

<Badge
  label="Pro"
  variant="primary"
  size={Size.Medium}
  icon="star"
/>
```
