# getAppearanceColor

Returns a complete color set for an appearance variant.

## Signature

```tsx
function getAppearanceColor(
  appearance: Appearance,
  brightnessMultiplier?: number
): AppearanceColorSet
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `appearance` | `Appearance` | required | The appearance variant |
| `brightnessMultiplier` | `number` | `1` | Optional glow intensity multiplier |

## Return Type

```tsx
type AppearanceColorSet = {
  background: string;
  backgroundHover: string;
  backgroundActive: string;
  text: string;
  border: string;
  shadow: string;
};
```

## Usage

```tsx
import { getAppearanceColor } from 'ghost/helpers';
import { Appearance } from 'ghost/enums';

const colors = getAppearanceColor(Appearance.Primary);

const style = {
  backgroundColor: colors.background,
  color: colors.text,
  borderColor: colors.border,
  boxShadow: colors.shadow,
};
```

## With Brightness

```tsx
import { getBrightnessMultiplier } from 'ghost/helpers';
import { Brightness } from 'ghost/enums';

const multiplier = getBrightnessMultiplier(Brightness.Bright);
const colors = getAppearanceColor(Appearance.Primary, multiplier);
// colors.shadow will have intensified glow

// No glow
const noGlow = getAppearanceColor(Appearance.Primary, 0);
// noGlow.shadow = "none"
```

## Theme Awareness

The text color for `Appearance.Ghost` adapts to the current theme:

```tsx
import { setCurrentTheme, Theme } from 'ghost/tokens';

setCurrentTheme(Theme.Light);
const light = getAppearanceColor(Appearance.Ghost);
// light.text = "#000000"

setCurrentTheme(Theme.Dark);
const dark = getAppearanceColor(Appearance.Ghost);
// dark.text = "#F4F6FF"
```
