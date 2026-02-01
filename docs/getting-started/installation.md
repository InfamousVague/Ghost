# Installation

## Requirements

- Node.js 18+
- React 18+ or React 19
- TypeScript 5.0+ (recommended)

## npm

```bash
npm install ghost
```

## yarn

```bash
yarn add ghost
```

## pnpm

```bash
pnpm add ghost
```

## Web Setup (react-native-web)

For web projects, you'll also need react-native-web:

```bash
npm install react-native-web
```

Configure your bundler to alias `react-native` to `react-native-web`. For Vite:

```ts
// vite.config.ts
export default defineConfig({
  resolve: {
    alias: {
      'react-native': 'react-native-web',
    },
  },
});
```

## TypeScript Configuration

Ghost is written in TypeScript and includes type definitions. For the best experience, ensure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "strict": true
  }
}
```

## Peer Dependencies

Ghost has the following peer dependencies:

- `react` >= 18.0.0
- `react-native` >= 0.70.0 (native) or `react-native-web` >= 0.19.0 (web)

## Verification

Verify your installation by importing a component:

```tsx
import { Button } from 'ghost/components';
import { Appearance } from 'ghost/enums';

<Button label="It works!" appearance={Appearance.Primary} />
```
