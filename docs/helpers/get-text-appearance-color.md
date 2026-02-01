# getTextAppearanceColor

Returns the text color for a text appearance variant.

## Signature

```tsx
function getTextAppearanceColor(appearance: TextAppearance): string
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `appearance` | `TextAppearance` | The text appearance variant |

## Return Value

Returns a hex color string.

## Usage

```tsx
import { getTextAppearanceColor } from 'ghost/helpers';
import { TextAppearance } from 'ghost/enums';

const primaryColor = getTextAppearanceColor(TextAppearance.Primary);
// "#F4F6FF"

const dangerColor = getTextAppearanceColor(TextAppearance.Danger);
// "#FF5C7A"
```

## All Text Appearances

| TextAppearance | Return Value |
|----------------|--------------|
| Primary | `#F4F6FF` |
| Secondary | `#C5CADB` |
| Muted | `#9096AB` |
| Link | `#5A9BFF` |
| Inverse | `#0B0E15` |
| Success | `#2FD575` |
| Warning | `#F6C94C` |
| Danger | `#FF5C7A` |
| Info | `#4CC3FF` |

## Example: Text Component

```tsx
import { Text } from 'react-native';
import { getTextAppearanceColor } from 'ghost/helpers';
import { TextAppearance } from 'ghost/enums';

function StyledText({ appearance, children }) {
  return (
    <Text style={{ color: getTextAppearanceColor(appearance) }}>
      {children}
    </Text>
  );
}

// Usage
<StyledText appearance={TextAppearance.Primary}>Main text</StyledText>
<StyledText appearance={TextAppearance.Muted}>Hint text</StyledText>
<StyledText appearance={TextAppearance.Danger}>Error message</StyledText>
```
