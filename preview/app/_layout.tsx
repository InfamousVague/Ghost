import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider, useTheme } from "@/lib/theme";
import { setGlowMultiplier, setCurrentTheme } from "ghost/tokens";
import { Theme } from "ghost/enums";

// Initialize ghost tokens
setGlowMultiplier(1);
setCurrentTheme(Theme.Dark);

function RootLayoutNav() {
  const { colors, theme } = useTheme();

  return (
    <>
      <StatusBar style={theme === Theme.Dark ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontWeight: "600",
          },
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Ghost UI Kit",
          }}
        />
        <Stack.Screen
          name="components/[category]"
          options={{
            title: "Components",
          }}
        />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootLayoutNav />
    </ThemeProvider>
  );
}
