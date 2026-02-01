# getBrightnessMultiplier

Returns the glow multiplier for a brightness level.

## Signature

```tsx
function getBrightnessMultiplier(brightness: Brightness): number
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `brightness` | `Brightness` | The brightness level |

## Return Value

Returns a numeric multiplier.

## Usage

```tsx
import { getBrightnessMultiplier } from 'ghost/helpers';
import { Brightness } from 'ghost/enums';

const multiplier = getBrightnessMultiplier(Brightness.Bright);
// 1.8
```

## All Brightness Levels

| Brightness | Return Value |
|------------|--------------|
| None | `0` |
| Soft | `0.8` |
| Base | `1.2` |
| Bright | `1.8` |

## With getAppearanceColor

The multiplier is typically passed to `getAppearanceColor`:

```tsx
import { getAppearanceColor, getBrightnessMultiplier } from 'ghost/helpers';
import { Appearance, Brightness } from 'ghost/enums';

// Get bright glow
const brightMultiplier = getBrightnessMultiplier(Brightness.Bright);
const colors = getAppearanceColor(Appearance.Primary, brightMultiplier);

// Disable glow
const noGlowMultiplier = getBrightnessMultiplier(Brightness.None);
const flatColors = getAppearanceColor(Appearance.Primary, noGlowMultiplier);
// flatColors.shadow = "none"
```

## Multiplier Effects

The multiplier affects:
- Shadow opacity (higher = more visible)
- Shadow blur (higher = larger glow)
- Color mix strength (higher = more saturated glow)

At `0`, no shadow is rendered (`"none"`).
