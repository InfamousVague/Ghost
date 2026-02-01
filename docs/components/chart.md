# Chart (LightweightChart)

A chart component using TradingView's lightweight-charts library for rendering financial data.

## Import

```tsx
import { LightweightChart } from 'ghost/components';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `ChartDataPoint[]` | required | Chart data points |
| `type` | `"area" \| "line"` | `area` | Chart type |
| `width` | `number \| string` | `"100%"` | Chart width |
| `height` | `number` | `200` | Chart height in pixels |
| `isPositive` | `boolean` | `true` | Whether trend is positive (affects colors) |
| `showPriceScale` | `boolean` | `false` | Show price scale on right |
| `showTimeScale` | `boolean` | `false` | Show time scale at bottom |
| `showCrosshair` | `boolean` | `false` | Show crosshair on hover |
| `interactive` | `boolean` | `false` | Allow user interaction (zoom/pan) |
| `lineWidth` | `number` | `2` | Line width in pixels |
| `lineColor` | `string` | - | Custom line color (overrides isPositive) |
| `glow` | `boolean` | `true` | Enable glow effect |
| `glowIntensity` | `number` | `1.0` | Glow intensity multiplier |
| `style` | `ViewStyle` | - | Additional style overrides |

### ChartDataPoint

```tsx
type ChartDataPoint = {
  time: number;  // Unix timestamp
  value: number; // Price/value
};
```

## Basic Usage

```tsx
import { LightweightChart } from 'ghost/components';

const data = [
  { time: 1234567890, value: 100 },
  { time: 1234567900, value: 105 },
  { time: 1234567910, value: 102 },
  { time: 1234567920, value: 110 },
];

<LightweightChart data={data} height={200} />
```

## Chart Types

### Area Chart (Default)

```tsx
<LightweightChart
  data={data}
  type="area"
  isPositive={true}
/>
// Shows filled area under the line
```

### Line Chart

```tsx
<LightweightChart
  data={data}
  type="line"
  lineWidth={2}
/>
// Shows only the line, no fill
```

## Positive vs Negative Trend

```tsx
// Green colors for positive trend
<LightweightChart data={data} isPositive={true} />

// Red colors for negative trend
<LightweightChart data={data} isPositive={false} />
```

## Custom Colors

```tsx
<LightweightChart
  data={data}
  lineColor="#8B5CF6"
/>
```

## Interactive Chart

```tsx
<LightweightChart
  data={data}
  height={300}
  showPriceScale
  showTimeScale
  showCrosshair
  interactive
/>
// User can zoom, pan, and see values on hover
```

## Glow Effect

```tsx
// Default glow
<LightweightChart data={data} glow />

// Intense glow
<LightweightChart data={data} glow glowIntensity={2.0} />

// No glow
<LightweightChart data={data} glow={false} />
```

## Sizing

```tsx
// Fixed width
<LightweightChart data={data} width={400} height={200} />

// Full width (responsive)
<LightweightChart data={data} width="100%" height={200} />
```

## Complete Example

```tsx
import { View } from 'react-native';
import { LightweightChart, Card, Text, Currency, PercentChange } from 'ghost/components';

function PriceChart({ asset }) {
  const chartData = asset.priceHistory.map((price, index) => ({
    time: Date.now() / 1000 - (asset.priceHistory.length - index) * 3600,
    value: price,
  }));

  return (
    <Card>
      <View style={{ padding: 16 }}>
        <Text weight="semibold">{asset.name}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Currency value={asset.price} size={Size.Large} />
          <PercentChange value={asset.change24h} />
        </View>
      </View>
      <LightweightChart
        data={chartData}
        height={200}
        isPositive={asset.change24h >= 0}
        type="area"
        glow
      />
    </Card>
  );
}
```

## Platform Support

### Web
Full functionality with TradingView's lightweight-charts library:
- Interactive zoom and pan
- Crosshair with value display
- Smooth animations
- Glow effects via CSS filters

### Native (iOS/Android)
Renders a placeholder view. For native chart support, consider integrating a native chart library.

## TradingView Watermark

The component automatically removes the TradingView watermark/attribution. A MutationObserver watches for and removes any dynamically added watermarks.

## Performance Notes

- The chart efficiently updates when data changes
- Uses ResizeObserver for responsive sizing
- Cleans up resources properly on unmount
- Data updates use `setData()` for optimal performance
