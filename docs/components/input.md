# Input

A text input component with icon support and focus states.

## Import

```tsx
import { Input } from 'ghost/components';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Input value |
| `placeholder` | `string` | - | Placeholder text |
| `leadingIcon` | `IconName` | - | Icon before the input |
| `trailingIcon` | `IconName` | - | Icon after the input |
| `size` | `Size` | `Medium` | Size variant |
| `shape` | `Shape` | `Rounded` | Border radius style |
| `error` | `boolean` | `false` | Error state |
| `disabled` | `boolean` | `false` | Disabled state |
| `loading` | `boolean` | `false` | Loading state |
| `onChangeText` | `(text: string) => void` | - | Value change callback |
| `onTrailingIconPress` | `() => void` | - | Trailing icon press callback |
| `style` | `ViewStyle` | - | Additional style overrides |

Also accepts all standard `TextInputProps` from React Native.

## Basic Usage

```tsx
import { Input } from 'ghost/components';
import { useState } from 'react';

function Example() {
  const [value, setValue] = useState('');

  return (
    <Input
      placeholder="Enter text..."
      value={value}
      onChangeText={setValue}
    />
  );
}
```

## With Leading Icon

```tsx
<Input
  placeholder="Search..."
  leadingIcon="search"
  value={search}
  onChangeText={setSearch}
/>
```

## With Trailing Icon

```tsx
<Input
  placeholder="Password"
  trailingIcon="eye"
  secureTextEntry={!showPassword}
  onTrailingIconPress={() => setShowPassword(!showPassword)}
/>
```

## Sizes

```tsx
import { Size } from 'ghost/enums';

<Input size={Size.Small} placeholder="Small" />      // 36px height
<Input size={Size.Medium} placeholder="Medium" />    // 40px height
<Input size={Size.Large} placeholder="Large" />      // 44px height
<Input size={Size.ExtraLarge} placeholder="XL" />    // 48px height
```

## Shapes

```tsx
import { Shape } from 'ghost/enums';

<Input shape={Shape.Soft} placeholder="Soft corners" />
<Input shape={Shape.Rounded} placeholder="Rounded corners" />
<Input shape={Shape.Pill} placeholder="Pill shape" />
```

## Error State

```tsx
<Input
  value={email}
  onChangeText={setEmail}
  error={!isValidEmail}
  placeholder="Email address"
/>
```

## Disabled State

```tsx
<Input
  value="Can't edit this"
  disabled
/>
```

## Loading State

```tsx
<Input loading placeholder="Loading..." />
// Renders a full-width skeleton
```

## Complete Example

```tsx
import { Input } from 'ghost/components';
import { Size, Shape } from 'ghost/enums';
import { useState } from 'react';

function SearchInput() {
  const [query, setQuery] = useState('');

  return (
    <Input
      value={query}
      onChangeText={setQuery}
      placeholder="Search cryptocurrencies..."
      leadingIcon="search"
      trailingIcon={query ? "close" : undefined}
      onTrailingIconPress={() => setQuery('')}
      size={Size.Large}
      shape={Shape.Pill}
    />
  );
}
```

## Focus Behavior

The Input component:
- Shows a subtle border by default
- Highlights with `Colors.border.focus` when focused
- Shows `Colors.status.danger` border when `error` is true
