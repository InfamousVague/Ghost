# Colors

The color token system provides a comprehensive palette organized by semantic categories.

## Categories

### Background

Colors for page and container backgrounds:

| Token | Value | Usage |
|-------|-------|-------|
| `canvas` | `#050608` | Deepest background, page canvas |
| `surface` | `#0B0E15` | Standard surface background |
| `raised` | `#131824` | Elevated/raised elements |
| `overlay` | `#1B2233` | Modal/overlay backgrounds |
| `subtle` | `#080A11` | Subtle background variation |

### Surface

Interactive surface colors:

| Token | Value | Usage |
|-------|-------|-------|
| `primary` | `#0F1623` | Primary interactive surface |
| `secondary` | `#101828` | Secondary interactive surface |
| `tertiary` | `#1A2133` | Tertiary interactive surface |

### Text

Typography colors:

| Token | Value | Usage |
|-------|-------|-------|
| `primary` | `#F4F6FF` | Primary text - highest contrast |
| `secondary` | `#C5CADB` | Secondary text - medium contrast |
| `muted` | `#9096AB` | Muted text - low contrast |
| `link` | `#5A9BFF` | Link/interactive text |
| `inverse` | `#0B0E15` | Inverse text for colored backgrounds |

### Border

Border and divider colors:

| Token | Value | Usage |
|-------|-------|-------|
| `subtle` | `#1F2433` | Subtle border - low contrast |
| `strong` | `#2A3142` | Strong border - higher contrast |
| `focus` | `#3D8BFF` | Focus ring color |

### Accent

Brand and interactive accent colors:

| Token | Value | Usage |
|-------|-------|-------|
| `primary` | `#3C82FF` | Primary accent color |
| `primaryHover` | `#4F8FFF` | Primary accent hover state |
| `primaryActive` | `#2E6DFF` | Primary accent active state |
| `secondary` | `#031226` | Secondary accent color |
| `highlight` | `#6F7CFF` | Highlight accent color |

### Status

Semantic status colors:

| Token | Value | Usage |
|-------|-------|-------|
| `success` | `#2FD575` | Success/positive |
| `successSurface` | `#102820` | Success surface/background |
| `warning` | `#F6C94C` | Warning/caution |
| `warningSurface` | `#2A210F` | Warning surface/background |
| `danger` | `#FF5C7A` | Danger/error |
| `dangerSurface` | `#2C151D` | Danger surface/background |
| `info` | `#4CC3FF` | Info/informational |
| `infoSurface` | `#102431` | Info surface/background |

### Utility

Utility colors for specific use cases:

| Token | Value | Usage |
|-------|-------|-------|
| `chartPositive` | `#3BD184` | Positive chart color |
| `chartNegative` | `#5F7BFF` | Negative chart color |
| `chartNeutral` | `#2F3B52` | Neutral chart color |
| `shadowSoft` | `rgba(6, 9, 14, 0.45)` | Soft shadow |
| `shadowStrong` | `rgba(0, 0, 0, 0.65)` | Strong shadow |

## Usage

```tsx
import { Colors } from 'ghost/tokens';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background.surface,
    borderColor: Colors.border.subtle,
  },
  title: {
    color: Colors.text.primary,
  },
  subtitle: {
    color: Colors.text.muted,
  },
  successBadge: {
    backgroundColor: Colors.status.successSurface,
    color: Colors.status.success,
  },
});
```
