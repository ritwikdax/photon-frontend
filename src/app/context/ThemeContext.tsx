"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
  Theme,
} from "@mui/material";
import { PaletteMode } from "@mui/material";
import { THEME } from "../themes";

// Available color themes
export type ColorTheme = "neon_dark" | "neon_light" | "slack_light" | "slack_dark" | "mini_dark" | "mini_light";

// Theme context type
type ThemeContextType = {
  mode: PaletteMode;
  colorTheme: ColorTheme;
  toggleMode: () => void;
  setColorTheme: (theme: ColorTheme) => void;
};

// Create context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme provider component
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize from localStorage or use defaults
  const [mode, setMode] = useState<PaletteMode>(() => {
    if (typeof window !== "undefined") {
      const savedMode = localStorage.getItem("themeMode");
      return (savedMode as PaletteMode) || "light";
    }
    return "light";
  });

  const [colorTheme, setColorThemeState] = useState<ColorTheme>(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("colorTheme");
      return (savedTheme as ColorTheme) || "mini_dark";
    }
    return "mini_light";
  });

  // Save to localStorage when changed
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("themeMode", mode);
    }
  }, [mode]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("colorTheme", colorTheme);
    }
  }, [colorTheme]);

  // Toggle between light and dark mode
  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  // Set color theme
  const setColorTheme = (theme: ColorTheme) => {
    setColorThemeState(theme);
  };

  // Create MUI theme based on mode and color theme
  const theme = useMemo(() => {
    //const colors = colorThemes[colorTheme][mode];
    return createTheme(THEME[`${colorTheme}`]);
  }, [mode, colorTheme]);

  const contextValue: ThemeContextType = {
    mode,
    colorTheme,
    toggleMode,
    setColorTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
    </ThemeContext.Provider>
  );
}

// Hook to use theme context
export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
}
