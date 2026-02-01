import React, { createContext, useContext, useState, useCallback } from "react";
import { Theme } from "ghost/enums";
import { setCurrentTheme } from "ghost/tokens";
import { Colors } from "ghost/tokens";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  colors: {
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
  };
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(Theme.Dark);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === Theme.Dark ? Theme.Light : Theme.Dark;
    setTheme(newTheme);
    setCurrentTheme(newTheme);
  }, [theme]);

  const colors =
    theme === Theme.Dark
      ? {
          background: "#0a0a0a",
          surface: "#1a1a1a",
          text: "#ffffff",
          textSecondary: "#888888",
          border: "#333333",
        }
      : {
          background: "#ffffff",
          surface: "#f5f5f5",
          text: "#000000",
          textSecondary: "#666666",
          border: "#e0e0e0",
        };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
