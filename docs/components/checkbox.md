# Checkbox

A checkbox component with optional label and indeterminate state support.

## Import

```tsx
import { Checkbox } from 'ghost/components';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `false` | Whether the checkbox is checked |
| `indeterminate` | `boolean` | `false` | Whether in indeterminate state |
| `onValueChange` | `(checked: boolean) => void` | - | Callback when state changes |
| `size` | `Size` | `Medium` | Size variant |
| `label` | `string` | - | Label text |
| `disabled` | `boolean` | `false` | Disabled state |
| `loading` | `boolean` | `false` | Loading state |
| `style` | `ViewStyle` | - | Additional style overrides |

## Basic Usage

```tsx
import { Checkbox } from 'ghost/components';
import { useState } from 'react';

function Example() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      checked={checked}
      onValueChange={setChecked}
    />
  );
}
```

## With Label

```tsx
<Checkbox
  label="Accept terms and conditions"
  checked={accepted}
  onValueChange={setAccepted}
/>
```

## Indeterminate State

Used when a parent checkbox has some but not all children checked:

```tsx
<Checkbox
  indeterminate={someSelected && !allSelected}
  checked={allSelected}
  onValueChange={handleSelectAll}
  label="Select All"
/>
```

## Sizes

```tsx
import { Size } from 'ghost/enums';

<Checkbox size={Size.Small} label="Small" />
<Checkbox size={Size.Medium} label="Medium" />
<Checkbox size={Size.Large} label="Large" />
```

## Disabled State

```tsx
<Checkbox disabled label="Can't click me" />
<Checkbox disabled checked label="Disabled checked" />
```

## Loading State

```tsx
<Checkbox loading label="Loading..." />
```

## Complete Example

```tsx
import { Checkbox } from 'ghost/components';
import { Size } from 'ghost/enums';
import { useState } from 'react';

function TermsCheckbox() {
  const [accepted, setAccepted] = useState(false);

  return (
    <Checkbox
      checked={accepted}
      onValueChange={setAccepted}
      size={Size.Medium}
      label="I agree to the Terms of Service"
    />
  );
}
```

## Accessibility

The Checkbox component:
- Responds to press events for toggling
- Shows visual feedback for checked, unchecked, and indeterminate states
- Displays reduced opacity when disabled
