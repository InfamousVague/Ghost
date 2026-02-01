import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["tests/**/*.test.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/**/*.ts"],
      exclude: ["src/**/*.stories.tsx", "src/**/index.ts"],
    },
  },
  resolve: {
    alias: {
      "react-native": "react-native-web",
    },
  },
});
