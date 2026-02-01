# SegmentedControl

A segmented control for switching between mutually exclusive options.

## Import

```tsx
import { SegmentedControl } from 'ghost/components';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `SegmentOption[]` | required | Available options |
| `value` | `string` | required | Currently selected value |
| `onChange` | `(value: string) => void` | required | Selection change callback |
| `size` | `Size` | `Medium` | Size variant |
| `disabled` | `boolean` | `false` | Disabled state |
| `loading` | `boolean` | `false` | Loading state |
| `style` | `ViewStyle` | - | Additional style overrides |

### SegmentOption

```tsx
type SegmentOption<T extends string = string> = {
  value: T;      // Unique identifier
  label: string; // Display text
  icon?: IconName; // Optional icon
};
```

## Basic Usage

```tsx
import { SegmentedControl } from 'ghost/components';
import { useState } from 'react';

function Example() {
  const [view, setView] = useState('list');

  return (
    <SegmentedControl
      options={[
        { value: 'list', label: 'List' },
        { value: 'grid', label: 'Grid' },
      ]}
      value={view}
      onChange={setView}
    />
  );
}
```

## With Icons

```tsx
<SegmentedControl
  options={[
    { value: 'list', label: 'List', icon: 'list' },
    { value: 'grid', label: 'Grid', icon: 'grid' },
  ]}
  value={view}
  onChange={setView}
/>
```

## Multiple Options

```tsx
<SegmentedControl
  options={[
    { value: 'day', label: 'Day' },
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' },
    { value: 'year', label: 'Year' },
  ]}
  value={period}
  onChange={setPeriod}
/>
```

## Sizes

```tsx
import { Size } from 'ghost/enums';

<SegmentedControl
  options={options}
  value={value}
  onChange={setValue}
  size={Size.Small}
/>

<SegmentedControl
  options={options}
  value={value}
  onChange={setValue}
  size={Size.Medium}
/>

<SegmentedControl
  options={options}
  value={value}
  onChange={setValue}
  size={Size.Large}
/>
```

## Disabled State

```tsx
<SegmentedControl
  options={options}
  value={value}
  onChange={setValue}
  disabled
/>
```

## Loading State

```tsx
<SegmentedControl
  options={options}
  value={value}
  onChange={setValue}
  loading
/>
```

## TypeScript Generic

The component supports type-safe values:

```tsx
type ViewMode = 'list' | 'grid' | 'table';

const [view, setView] = useState<ViewMode>('list');

<SegmentedControl<ViewMode>
  options={[
    { value: 'list', label: 'List' },
    { value: 'grid', label: 'Grid' },
    { value: 'table', label: 'Table' },
  ]}
  value={view}
  onChange={setView}
/>
```

## Complete Example

```tsx
import { View } from 'react-native';
import { SegmentedControl, Card, Text } from 'ghost/components';
import { Size } from 'ghost/enums';
import { useState } from 'react';

type ViewMode = 'list' | 'grid';

function Toolbar() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text>Assets</Text>
      <SegmentedControl<ViewMode>
        options={[
          { value: 'list', label: 'List', icon: 'list' },
          { value: 'grid', label: 'Grid', icon: 'grid' },
        ]}
        value={viewMode}
        onChange={setViewMode}
        size={Size.Small}
      />
    </View>
  );
}
```

## Visual Behavior

- Selected segment has a raised background
- Selected text is semibold, unselected is regular weight
- Selected icon/text uses secondary color, unselected uses muted
- Smooth visual transition between states
