# Skeleton

A loading placeholder component with shimmer animation that matches the glow aesthetic of the design system.

## Import

```tsx
import { Skeleton, TextSkeleton } from 'ghost/components';
import { Shape } from 'ghost/enums';
```

## Usage

### Basic Skeleton

```tsx
<Skeleton width={200} height={24} />
```

### With Shape

```tsx
<Skeleton width={100} height={40} shape={Shape.Rounded} />
<Skeleton width={100} height={40} shape={Shape.Pill} />
<Skeleton width={40} height={40} shape={Shape.Circle} />
```

### Custom Border Radius

```tsx
<Skeleton width={100} height={40} borderRadius={0} />
<Skeleton width={40} height={40} borderRadius={20} />
```

### Text Skeleton

For text loading states with proper line heights:

```tsx
<TextSkeleton lineHeight={24} fontSize={16} />
<TextSkeleton lineHeight={24} fontSize={16} lines={3} />
<TextSkeleton lineHeight={24} fontSize={16} lines={3} lastLineWidth="60%" />
```

## Props

### Skeleton

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | `number \| string` | Required | Width of the skeleton |
| `height` | `number \| string` | Required | Height of the skeleton |
| `shape` | `Shape` | `Rounded` | Border radius style |
| `borderRadius` | `number` | - | Custom border radius (overrides shape) |
| `duration` | `number` | `1500` | Animation duration in ms |
| `style` | `ViewStyle` | - | Additional style overrides |

### TextSkeleton

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `lines` | `number` | `1` | Number of lines to show |
| `lastLineWidth` | `number \| string` | `"60%"` | Width of the last line |
| `lineHeight` | `number` | Required | Line height matching text size |
| `fontSize` | `number` | Required | Font size for accurate height calculation |
| `gap` | `number` | `8` | Gap between lines |
| `duration` | `number` | `1500` | Animation duration in ms |
| `style` | `ViewStyle` | - | Additional style overrides |

## Component Loading States

All major components support a `loading` prop that shows an appropriate skeleton:

### Text

```tsx
<Text loading skeletonWidth={120}>Content</Text>
<Text loading skeletonLines={3}>Multi-line content</Text>
```

### Number

```tsx
<Number value={0} loading skeletonWidth={80} />
```

### Currency

```tsx
<Currency value={0} loading skeletonWidth={100} />
```

### Button

```tsx
<Button label="Submit" loading />
```

## Cascading Loading (Card Context)

Cards can cascade their loading state to child components using React Context:

```tsx
<Card loading>
  <Text>Label</Text>
  <Number value={3376} />
  {/* Both show skeletons automatically */}
</Card>
```

This is powered by the `LoadingContext`:

```tsx
import { LoadingContext, useLoading } from 'ghost/components';

// In your custom component:
function MyComponent() {
  const isLoading = useLoading();
  if (isLoading) {
    return <Skeleton width={100} height={20} />;
  }
  return <View>...</View>;
}
```

## Shimmer Animation

The skeleton uses a subtle shimmer animation that sweeps from left to right, using a glow-like effect that matches the design system's aesthetic:

- On web: CSS animation for optimal performance
- On native: React Native Animated API

The shimmer color is a subtle blue tint (`rgba(90, 155, 255, 0.06)`) that complements the glow effects on other components.

## Layout Consistency

Skeletons are designed to occupy the exact same space as loaded content to prevent layout shift:

```tsx
// These occupy the same space:
<Text size={Size.Large}>Loaded text</Text>
<Text size={Size.Large} loading skeletonWidth={100}>Placeholder</Text>
```

## Content Placeholders

Use Skeleton to build complex loading states:

```tsx
<View style={styles.card}>
  {/* Avatar */}
  <Skeleton width={48} height={48} shape={Shape.Circle} />

  {/* Text content */}
  <View style={styles.content}>
    <Skeleton width={120} height={16} shape={Shape.Soft} />
    <Skeleton width={180} height={12} shape={Shape.Soft} />
  </View>
</View>
```
