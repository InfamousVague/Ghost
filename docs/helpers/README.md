# Helpers

Helper functions provide the bridge between enums and design tokens, returning the appropriate style values for each variant.

## Available Helpers

| Helper | Description |
|--------|-------------|
| [getAppearanceColor](get-appearance-color.md) | Returns color set for an appearance |
| [getSizeStyles](get-size-styles.md) | Returns padding and font size for a size |
| [getShapeRadius](get-shape-radius.md) | Returns border radius for a shape |
| [getTextAppearanceColor](get-text-appearance-color.md) | Returns color for text appearance |
| [getBrightnessMultiplier](get-brightness-multiplier.md) | Returns multiplier for brightness level |

## Usage

Import helpers from the helpers module:

```tsx
import {
  getAppearanceColor,
  getSizeStyles,
  getShapeRadius,
  getTextAppearanceColor,
  getBrightnessMultiplier
} from 'ghost/helpers';
```

## Example: Building a Custom Component

```tsx
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Appearance, Size, Shape, Brightness } from 'ghost/enums';
import {
  getAppearanceColor,
  getSizeStyles,
  getShapeRadius,
  getBrightnessMultiplier
} from 'ghost/helpers';

function CustomButton({ appearance, size, shape, brightness, label }) {
  const multiplier = getBrightnessMultiplier(brightness);
  const colors = getAppearanceColor(appearance, multiplier);
  const dimensions = getSizeStyles(size);
  const radius = getShapeRadius(shape);

  const styles = StyleSheet.create({
    button: {
      backgroundColor: colors.background,
      borderColor: colors.border,
      borderRadius: parseFloat(radius),
      paddingVertical: parseFloat(dimensions.paddingVertical) * 16,
      paddingHorizontal: parseFloat(dimensions.paddingHorizontal) * 16,
    },
    text: {
      color: colors.text,
      fontSize: parseFloat(dimensions.fontSize) * 16,
    },
  });

  return (
    <Pressable style={styles.button}>
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
}
```
