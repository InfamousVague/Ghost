# Components

Ghost provides React Native components that work seamlessly on both native platforms and web through react-native-web.

## Available Components

| Component | Description |
|-----------|-------------|
| [Button](button.md) | Interactive button with appearance, size, shape variants |
| [Card](card.md) | Container with organic glows and gradient borders |
| [Currency](currency.md) | Currency display with automatic symbol lookup and formatting |
| [Number](number.md) | Number display with intelligent leading zeros and formatting |
| [Skeleton](skeleton.md) | Loading placeholder with shimmer animation |
| [Text](text.md) | Text with appearance, size, weight, and glow effects |

## Usage

Import components from the components module:

```tsx
import { Button } from 'ghost/components';
```

## Cross-Platform

All components are built with React Native primitives (`View`, `Text`, `Pressable`) and work on:
- iOS
- Android
- Web (via react-native-web)

## Styling Philosophy

Components accept enum-based props for styling rather than direct style props. This ensures consistency and makes it easy to maintain a unified design language:

```tsx
// Good: Use enum props
<Button
  appearance={Appearance.Primary}
  size={Size.Large}
  shape={Shape.Rounded}
/>

// Components handle the token mapping internally
```

## Accessibility

Components include appropriate accessibility attributes:
- `accessibilityRole` for semantic meaning
- `accessibilityState` for disabled state
- Touch targets meet minimum size requirements
