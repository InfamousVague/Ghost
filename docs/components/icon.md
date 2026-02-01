# Icon

An icon component with a built-in library of common icons using SVG.

## Import

```tsx
import { Icon } from 'ghost/components';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `IconName` | required | The icon to display |
| `size` | `Size` | `Medium` | Icon size |
| `customSize` | `number` | - | Custom size in pixels (overrides size) |
| `appearance` | `TextAppearance` | `Primary` | Icon color appearance |
| `color` | `string` | - | Custom color (overrides appearance) |
| `loading` | `boolean` | `false` | Loading state |
| `style` | `ViewStyle` | - | Additional style overrides |

## Available Icons

```
search, calendar, chevron-down, chevron-up, chevron-left, chevron-right,
check, close, plus, minus, filter, settings, user, bell, upload, download,
arrow-up, arrow-down, star, star-filled, heart, heart-filled, home, menu,
more-horizontal, more-vertical, edit, trash, copy, external-link, eye,
eye-off, lock, unlock, info, warning, error, success, sun, moon, grid, list
```

## Basic Usage

```tsx
import { Icon } from 'ghost/components';

<Icon name="search" />
<Icon name="settings" />
<Icon name="user" />
```

## Sizes

```tsx
import { Size } from 'ghost/enums';

<Icon name="star" size={Size.TwoXSmall} />  // 12px
<Icon name="star" size={Size.ExtraSmall} /> // 14px
<Icon name="star" size={Size.Small} />      // 16px
<Icon name="star" size={Size.Medium} />     // 20px (default)
<Icon name="star" size={Size.Large} />      // 24px
<Icon name="star" size={Size.ExtraLarge} /> // 28px
<Icon name="star" size={Size.TwoXLarge} />  // 32px

// Or use custom size
<Icon name="star" customSize={48} />
```

## Color Appearances

```tsx
import { TextAppearance } from 'ghost/enums';

<Icon name="check" appearance={TextAppearance.Primary} />
<Icon name="check" appearance={TextAppearance.Success} />
<Icon name="close" appearance={TextAppearance.Danger} />
<Icon name="warning" appearance={TextAppearance.Warning} />
<Icon name="info" appearance={TextAppearance.Info} />
<Icon name="star" appearance={TextAppearance.Muted} />
```

## Custom Color

```tsx
<Icon name="heart" color="#FF69B4" />
<Icon name="star" color="gold" />
```

## Icon Categories

### Navigation
```tsx
<Icon name="chevron-left" />
<Icon name="chevron-right" />
<Icon name="chevron-up" />
<Icon name="chevron-down" />
<Icon name="arrow-up" />
<Icon name="arrow-down" />
<Icon name="home" />
<Icon name="menu" />
```

### Actions
```tsx
<Icon name="search" />
<Icon name="filter" />
<Icon name="edit" />
<Icon name="trash" />
<Icon name="copy" />
<Icon name="upload" />
<Icon name="download" />
<Icon name="external-link" />
```

### Status
```tsx
<Icon name="check" />
<Icon name="close" />
<Icon name="info" />
<Icon name="warning" />
<Icon name="error" />
<Icon name="success" />
```

### Toggle States
```tsx
<Icon name="star" />
<Icon name="star-filled" />
<Icon name="heart" />
<Icon name="heart-filled" />
<Icon name="eye" />
<Icon name="eye-off" />
<Icon name="lock" />
<Icon name="unlock" />
<Icon name="sun" />
<Icon name="moon" />
```

### UI Elements
```tsx
<Icon name="plus" />
<Icon name="minus" />
<Icon name="more-horizontal" />
<Icon name="more-vertical" />
<Icon name="settings" />
<Icon name="user" />
<Icon name="bell" />
<Icon name="calendar" />
<Icon name="grid" />
<Icon name="list" />
```

## Loading State

```tsx
<Icon name="star" loading />
// Renders a square skeleton
```

## Complete Example

```tsx
import { View } from 'react-native';
import { Icon } from 'ghost/components';
import { Size, TextAppearance } from 'ghost/enums';

<View style={{ flexDirection: 'row', gap: 8 }}>
  <Icon name="heart-filled" size={Size.Large} color="#FF69B4" />
  <Icon name="star-filled" size={Size.Large} color="gold" />
  <Icon name="check" size={Size.Large} appearance={TextAppearance.Success} />
</View>
```
