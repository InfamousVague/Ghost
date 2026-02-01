# Getting Started

Ghost is a React Native design system that provides a comprehensive token-based approach to styling components. It works seamlessly on both native platforms and web through react-native-web.

## Prerequisites

- React 18+ or React 19
- React Native 0.70+ (for native) or react-native-web (for web)
- TypeScript 5.0+ (recommended)

## Installation

```bash
npm install ghost
```

## Basic Usage

### Using Components

```tsx
import { Button } from 'ghost/components';
import { Appearance, Size, Shape } from 'ghost/enums';

<Button
  label="Click me"
  appearance={Appearance.Primary}
  size={Size.Medium}
  shape={Shape.Rounded}
  onPress={() => console.log('Pressed!')}
/>
```

### Using Tokens Directly

```tsx
import { Colors, Spacing, Typography } from 'ghost/tokens';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background.surface,
    padding: Spacing.md,
  },
  text: {
    color: Colors.text.primary,
    fontSize: Typography.fontSize.md,
  },
});
```

### Using Helper Functions

```tsx
import { getAppearanceColor, getSizeStyles } from 'ghost/helpers';
import { Appearance, Size } from 'ghost/enums';

const colors = getAppearanceColor(Appearance.Success);
const dimensions = getSizeStyles(Size.Large);
```

## Theme Support

Ghost supports light and dark themes:

```tsx
import { setCurrentTheme, Theme } from 'ghost/tokens';

// Switch to light theme
setCurrentTheme(Theme.Light);

// Switch to dark theme
setCurrentTheme(Theme.Dark);
```

## Next Steps

- Learn about [Tokens](../tokens/) for customizing your design system
- Explore [Enums](../enums/) for type-safe styling options
- Check out [Helpers](../helpers/) for utility functions
- Browse [Components](../components/) for ready-to-use UI elements
