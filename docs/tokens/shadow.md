# Shadow

The shadow token system provides configuration values for glow and shadow effects.

## Glow Configuration

| Property | Value | Description |
|----------|-------|-------------|
| `blur` | `18` | Blur radius in pixels |
| `spread` | `0` | Spread radius in pixels |
| `y` | `8` | Vertical offset in pixels |
| `defaultOpacity` | `0.45` | Default opacity (0-1) |
| `defaultMix` | `0.42` | Default color mix strength |
| `minMultiplier` | `0.25` | Minimum brightness multiplier |
| `maxMultiplier` | `3` | Maximum brightness multiplier |

## Usage

Shadow values are typically used internally by the `getAppearanceColor` helper to generate glow effects:

```tsx
import { getAppearanceColor } from 'ghost/helpers';
import { Appearance } from 'ghost/enums';

const colors = getAppearanceColor(Appearance.Primary);
// colors.shadow = "0 8px 18px 0px rgba(25, 53, 102, 0.45)"
```

## Runtime Glow Control

You can adjust glow intensity at runtime:

```tsx
import { setGlowMultiplier, getGlowMultiplier } from 'ghost/tokens';

// Increase glow intensity
setGlowMultiplier(2);

// Disable glow
setGlowMultiplier(0);

// Get current multiplier
const current = getGlowMultiplier(); // 2
```

## Brightness Levels

The Brightness enum provides preset multiplier values:

| Brightness | Multiplier |
|------------|------------|
| None | `0` |
| Soft | `0.8` |
| Base | `1.2` |
| Bright | `1.8` |

```tsx
import { getBrightnessMultiplier } from 'ghost/helpers';
import { Brightness } from 'ghost/enums';

const multiplier = getBrightnessMultiplier(Brightness.Bright);
// 1.8
```
