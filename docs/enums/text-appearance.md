# TextAppearance

The TextAppearance enum defines text color variants for typography.

## Values

| Value | String | Description |
|-------|--------|-------------|
| `Primary` | `"primary"` | Primary text, highest contrast |
| `Secondary` | `"secondary"` | Secondary text, medium contrast |
| `Muted` | `"muted"` | Muted text, low contrast |
| `Link` | `"link"` | Link text, accent color |
| `Inverse` | `"inverse"` | Inverse text, for colored backgrounds |
| `Success` | `"success"` | Success text, green |
| `Warning` | `"warning"` | Warning text, yellow |
| `Danger` | `"danger"` | Danger text, red |
| `Info` | `"info"` | Info text, blue |

## Usage

```tsx
import { TextAppearance } from 'ghost/enums';
import { getTextAppearanceColor } from 'ghost/helpers';

const mutedColor = getTextAppearanceColor(TextAppearance.Muted);
```

## Color Mapping

| TextAppearance | Color Token |
|----------------|-------------|
| Primary | `text.primary` (#F4F6FF) |
| Secondary | `text.secondary` (#C5CADB) |
| Muted | `text.muted` (#9096AB) |
| Link | `text.link` (#5A9BFF) |
| Inverse | `text.inverse` (#0B0E15) |
| Success | `status.success` (#2FD575) |
| Warning | `status.warning` (#F6C94C) |
| Danger | `status.danger` (#FF5C7A) |
| Info | `status.info` (#4CC3FF) |

## Example

```tsx
import { getTextAppearanceColor } from 'ghost/helpers';
import { TextAppearance } from 'ghost/enums';

const styles = StyleSheet.create({
  title: {
    color: getTextAppearanceColor(TextAppearance.Primary),
  },
  subtitle: {
    color: getTextAppearanceColor(TextAppearance.Secondary),
  },
  hint: {
    color: getTextAppearanceColor(TextAppearance.Muted),
  },
  error: {
    color: getTextAppearanceColor(TextAppearance.Danger),
  },
});
```
