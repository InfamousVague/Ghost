import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "react-native": "react-native-web",
      // Polyfill buffer for react-native-svg compatibility
      buffer: "buffer/",
    },
    extensions: [".web.tsx", ".web.ts", ".web.js", ".tsx", ".ts", ".js"],
  },
  define: {
    // Provide global Buffer for react-native-svg
    global: "globalThis",
  },
  optimizeDeps: {
    esbuildOptions: {
      mainFields: ["module", "main"],
      resolveExtensions: [".web.js", ".js", ".ts", ".tsx"],
    },
    include: ["buffer"],
  },
});
