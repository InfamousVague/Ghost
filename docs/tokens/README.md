# Tokens

Design tokens are the foundational values that define Ghost's visual language. They provide a consistent, centralized way to manage colors, spacing, typography, and other design properties.

## Overview

Ghost includes the following token categories:

| Token | Description |
|-------|-------------|
| [Colors](colors.md) | Color palette for backgrounds, text, borders, and status |
| [Spacing](spacing.md) | Consistent spacing scale for padding and margins |
| [Typography](typography.md) | Font sizes, weights, and line heights |
| [Radii](radii.md) | Border radius values for corner rounding |
| [Shadow](shadow.md) | Glow and shadow effect configuration |

## Usage

Import tokens directly from the tokens module:

```tsx
import { Colors, Spacing, Typography, Radii, Shadow } from 'ghost/tokens';
```

## Runtime Functions

Ghost also provides runtime functions for dynamic token values:

```tsx
import {
  setCurrentTheme,
  getCurrentTheme,
  setGlowMultiplier,
  getGlowMultiplier
} from 'ghost/tokens';
```

## Token Structure

All tokens are exported as `const` objects with full TypeScript type inference:

```tsx
// Colors is deeply nested
Colors.background.surface  // "#0B0E15"
Colors.text.primary        // "#F4F6FF"
Colors.status.success      // "#2FD575"

// Spacing is flat
Spacing.md  // "1rem"
Spacing.lg  // "1.25rem"

// Typography is grouped
Typography.fontSize.md     // "1rem"
Typography.fontWeight.bold // "700"
Typography.lineHeight.normal // "1.5"
```

## Customization

Tokens are defined as JavaScript constants, so to customize them you would fork the library or use CSS variables to override values at runtime.
