# Appearance

The Appearance enum defines visual appearance variants for interactive components like buttons and badges.

## Values

| Value | String | Description |
|-------|--------|-------------|
| `Primary` | `"primary"` | Primary brand color, main actions |
| `Secondary` | `"secondary"` | Subtle style, alternative actions |
| `Success` | `"success"` | Green, success states and confirmations |
| `Warning` | `"warning"` | Yellow/amber, warnings and caution |
| `Danger` | `"danger"` | Red, errors and destructive actions |
| `Info` | `"info"` | Blue, informational elements |
| `Ghost` | `"ghost"` | Transparent, subtle/text-like buttons |

## Usage

```tsx
import { Appearance } from 'ghost/enums';

<Button appearance={Appearance.Primary} label="Submit" />
<Button appearance={Appearance.Danger} label="Delete" />
<Button appearance={Appearance.Ghost} label="Cancel" />
```

## Color Mapping

Each appearance maps to a set of colors via `getAppearanceColor`:

| Appearance | Background | Text | Border |
|------------|------------|------|--------|
| Primary | `accent.primary` | `text.primary` | `accent.primary` |
| Secondary | `accent.secondary` | `accent.primary` | `accent.secondary` |
| Success | `status.success` | `text.primary` | `status.success` |
| Warning | `status.warning` | `text.primary` | `status.warning` |
| Danger | `status.danger` | `text.primary` | `status.danger` |
| Info | `status.info` | `text.primary` | `status.info` |
| Ghost | `transparent` | theme-aware | `transparent` |

## Example

```tsx
import { getAppearanceColor } from 'ghost/helpers';
import { Appearance } from 'ghost/enums';

const successColors = getAppearanceColor(Appearance.Success);
// {
//   background: "#2FD575",
//   backgroundHover: "#2FD575",
//   backgroundActive: "#2FD575",
//   text: "#F4F6FF",
//   border: "#2FD575",
//   shadow: "0 8px 18px 0px rgba(...)"
// }
```
