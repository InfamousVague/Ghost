# Ghost

A React Native design system with comprehensive token-based styling.

## Features

- Cross-platform components (React Native + Web via react-native-web)
- Comprehensive design token system (colors, spacing, typography, radii)
- Type-safe enums for appearance, size, shape, and more
- Helper functions for consistent style generation
- Dark and light theme support
- Configurable glow/shadow effects
- Full TypeScript support

## Quick Install

```bash
npm install ghost
```

## Quick Start

```tsx
import { Button } from 'ghost/components';
import { Appearance, Size, Shape } from 'ghost/enums';

function App() {
  return (
    <Button
      label="Get Started"
      appearance={Appearance.Primary}
      size={Size.Large}
      shape={Shape.Rounded}
      onPress={() => console.log('Pressed!')}
    />
  );
}
```

## Documentation

- [Getting Started](getting-started/)
- [Tokens](tokens/)
- [Enums](enums/)
- [Helpers](helpers/)
- [Components](components/)
