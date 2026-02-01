# Brightness

The Brightness enum defines glow/shadow intensity levels for components.

## Values

| Value | String | Multiplier | Description |
|-------|--------|------------|-------------|
| `None` | `"none"` | `0` | No glow effect |
| `Soft` | `"soft"` | `0.8` | Subtle glow |
| `Base` | `"base"` | `1.2` | Standard glow |
| `Bright` | `"bright"` | `1.8` | Intense glow |

## Usage

```tsx
import { Brightness } from 'ghost/enums';

<Button brightness={Brightness.Bright} label="Glowing" />
<Button brightness={Brightness.None} label="No glow" />
```

## Multiplier Values

The brightness multiplier affects the glow opacity and blur:

```tsx
import { getBrightnessMultiplier } from 'ghost/helpers';
import { Brightness } from 'ghost/enums';

getBrightnessMultiplier(Brightness.None);   // 0
getBrightnessMultiplier(Brightness.Soft);   // 0.8
getBrightnessMultiplier(Brightness.Base);   // 1.2
getBrightnessMultiplier(Brightness.Bright); // 1.8
```

## With getAppearanceColor

The brightness multiplier is passed to `getAppearanceColor` to control glow intensity:

```tsx
import { getAppearanceColor, getBrightnessMultiplier } from 'ghost/helpers';
import { Appearance, Brightness } from 'ghost/enums';

const multiplier = getBrightnessMultiplier(Brightness.Bright);
const colors = getAppearanceColor(Appearance.Primary, multiplier);
// colors.shadow will have intensified glow
```

## Visual Guide

- **None**: Flat appearance, no glow effect
- **Soft**: Subtle glow for hover states
- **Base**: Default glow intensity
- **Bright**: Eye-catching glow for emphasis
