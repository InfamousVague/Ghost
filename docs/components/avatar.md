# Avatar

An avatar component for displaying user images with initials fallback and status indicators.

## Import

```tsx
import { Avatar } from 'ghost/components';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `source` | `ImageSourcePropType` | - | Image source object |
| `uri` | `string` | - | Image URI (alternative to source) |
| `initials` | `string` | - | Fallback initials when no image |
| `size` | `Size` | `Medium` | Size variant |
| `status` | `AvatarStatus` | - | Status indicator (online, offline, busy, away) |
| `loading` | `boolean` | `false` | Loading state |
| `style` | `ViewStyle` | - | Additional style overrides |

## Basic Usage

```tsx
import { Avatar } from 'ghost/components';

<Avatar uri="https://example.com/photo.jpg" />
```

## With Initials Fallback

When no image is provided, the avatar displays initials:

```tsx
<Avatar initials="JD" />
<Avatar initials="Alice" /> // Displays "AL"
```

## Sizes

```tsx
import { Size } from 'ghost/enums';

<Avatar uri="..." size={Size.TwoXSmall} />  // 24px
<Avatar uri="..." size={Size.ExtraSmall} /> // 28px
<Avatar uri="..." size={Size.Small} />      // 32px
<Avatar uri="..." size={Size.Medium} />     // 40px (default)
<Avatar uri="..." size={Size.Large} />      // 48px
<Avatar uri="..." size={Size.ExtraLarge} /> // 56px
<Avatar uri="..." size={Size.TwoXLarge} />  // 64px
```

## Status Indicators

Show user availability with status dots:

```tsx
<Avatar uri="..." status="online" />  // Green dot
<Avatar uri="..." status="offline" /> // Gray dot
<Avatar uri="..." status="busy" />    // Red dot
<Avatar uri="..." status="away" />    // Yellow dot
```

## Loading State

```tsx
<Avatar loading />
// Renders a circular skeleton
```

## Complete Example

```tsx
import { Avatar } from 'ghost/components';
import { Size } from 'ghost/enums';

<Avatar
  uri="https://example.com/user.jpg"
  initials="JD"
  size={Size.Large}
  status="online"
/>
```

## Accessibility

The Avatar component:
- Uses `Image` with `resizeMode="cover"` for proper image display
- Displays initials in a readable format when no image is available
