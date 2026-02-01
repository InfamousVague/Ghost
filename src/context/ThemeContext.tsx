import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { Platform } from "react-native";

export type ThemeMode = "dark" | "light";

export type ThemeColors = {
  background: {
    canvas: string;
    surface: string;
    raised: string;
    overlay: string;
  };
  text: {
    primary: string;
    secondary: string;
    muted: string;
  };
  border: {
    subtle: string;
    strong: string;
  };
  accent: {
    primary: string;
  };
  status: {
    success: string;
    warning: string;
    danger: string;
    info: string;
  };
};

const darkColors: ThemeColors = {
  background: {
    canvas: "#050608",
    surface: "#0B0E15",
    raised: "#131824",
    overlay: "#1B2233",
  },
  text: {
    primary: "#F4F6FF",
    secondary: "#C5CADB",
    muted: "#9096AB",
  },
  border: {
    subtle: "#1F2433",
    strong: "#2A3142",
  },
  accent: {
    primary: "#A78BFA",
  },
  status: {
    success: "#2FD575",
    warning: "#F6C94C",
    danger: "#FF5C7A",
    info: "#4CC3FF",
  },
};

const lightColors: ThemeColors = {
  background: {
    canvas: "#f8fafc",
    surface: "#ffffff",
    raised: "#f1f5f9",
    overlay: "#e2e8f0",
  },
  text: {
    primary: "#0f172a",
    secondary: "#334155",
    muted: "#64748b",
  },
  border: {
    subtle: "#e2e8f0",
    strong: "#cbd5e1",
  },
  accent: {
    primary: "#8B5CF6",
  },
  status: {
    success: "#16a34a",
    warning: "#ca8a04",
    danger: "#dc2626",
    info: "#0284c7",
  },
};

type ThemeContextType = {
  mode: ThemeMode;
  colors: ThemeColors;
  isDark: boolean;
  setMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  mode: "dark",
  colors: darkColors,
  isDark: true,
  setMode: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function useThemeColors() {
  const { colors } = useContext(ThemeContext);
  return colors;
}

type GhostThemeProviderProps = {
  children: ReactNode;
  mode?: ThemeMode;
  onModeChange?: (mode: ThemeMode) => void;
};

export function GhostThemeProvider({
  children,
  mode: controlledMode,
  onModeChange,
}: GhostThemeProviderProps) {
  const [internalMode, setInternalMode] = useState<ThemeMode>("dark");

  // Use controlled mode if provided, otherwise use internal state
  const mode = controlledMode ?? internalMode;
  const colors = mode === "dark" ? darkColors : lightColors;
  const isDark = mode === "dark";

  const setMode = (newMode: ThemeMode) => {
    if (onModeChange) {
      onModeChange(newMode);
    } else {
      setInternalMode(newMode);
    }
  };

  // Sync with CSS variables on web for components that might use them
  useEffect(() => {
    if (Platform.OS === "web" && typeof document !== "undefined") {
      document.documentElement.setAttribute("data-ghost-theme", mode);
    }
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, colors, isDark, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Export color palettes for direct access if needed
export { darkColors, lightColors };
