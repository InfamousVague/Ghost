# Theme

The Theme enum defines color theme modes for the application.

## Values

| Value | String | Description |
|-------|--------|-------------|
| `Light` | `"light"` | Light backgrounds, dark text |
| `Dark` | `"dark"` | Dark backgrounds, light text |

## Usage

```tsx
import { Theme } from 'ghost/enums';
import { setCurrentTheme, getCurrentTheme } from 'ghost/tokens';

// Set the theme
setCurrentTheme(Theme.Dark);

// Get current theme
const theme = getCurrentTheme(); // Theme.Dark
```

## Theme-Aware Colors

Some appearance colors adapt based on the current theme. For example, the Ghost appearance:

```tsx
import { getAppearanceColor } from 'ghost/helpers';
import { Appearance } from 'ghost/enums';
import { setCurrentTheme, Theme } from 'ghost/tokens';

// In dark theme
setCurrentTheme(Theme.Dark);
const darkColors = getAppearanceColor(Appearance.Ghost);
// darkColors.text = "#F4F6FF" (light text)

// In light theme
setCurrentTheme(Theme.Light);
const lightColors = getAppearanceColor(Appearance.Ghost);
// lightColors.text = "#000000" (dark text)
```

## Storybook Integration

Ghost's Storybook setup includes a theme toggle in the toolbar:

```tsx
// .storybook/preview.ts
globalTypes: {
  theme: {
    toolbar: {
      items: [
        { value: Theme.Light, icon: "sun", title: "Light" },
        { value: Theme.Dark, icon: "moon", title: "Dark" },
      ],
    },
  },
},
```
