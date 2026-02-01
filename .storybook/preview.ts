import { createElement } from "react";
import { View, type ViewProps } from "react-native";
import type { Preview, Decorator } from "@storybook/react-vite";
import { Theme } from "../src/enums";
import { setGlowMultiplier, setCurrentTheme } from "../src/tokens";

const withTheme: Decorator = (Story, context) => {
  const theme = (context.globals.theme as Theme) ?? Theme.Dark;
  const backgroundColor = theme === Theme.Light ? "#ffffff" : "#000000";

  setGlowMultiplier(1);
  setCurrentTheme(theme);

  if (typeof document !== "undefined") {
    document.documentElement.style.backgroundColor = backgroundColor;
    document.documentElement.style.backgroundImage = "none";
    document.body.style.backgroundColor = backgroundColor;
    document.body.style.backgroundImage = "none";
    document.body.style.margin = "0";
  }

  const viewProps: ViewProps & { dataSet?: Record<string, string> } = {
    dataSet: { theme },
    style: {
      backgroundColor,
      padding: 32,
      flex: 1,
      width: "100%",
    },
  };

  return createElement(View, viewProps, createElement(Story));
};

const preview: Preview = {
  parameters: {
    layout: "centered",
    backgrounds: { disabled: true },
  },
  globalTypes: {
    theme: {
      description: "Global theme for components",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: Theme.Light, icon: "sun", title: "Light" },
          { value: Theme.Dark, icon: "moon", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [withTheme],
};

export default preview;
