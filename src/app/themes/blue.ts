import { ThemeOptions } from "@mui/material";

export const BLUE_THEME : ThemeOptions = {
  palette: {
    mode: "dark",

    background: {
      default: "#0F172A",   // Deep navy page background
      paper: "#1E293B",     // Slightly lighter cards/sections
    },

    primary: {
      main: "#3B82F6",      // Bright blue CTA button
      light: "#60A5FA",
      dark: "#2563EB",
      contrastText: "#ffffff",
    },

    secondary: {
      main: "#475569",      // Muted slate-gray for secondary actions
    },

    text: {
      primary: "#FFFFFF",       // Strong white headings
      secondary: "#CBD5E1",     // Muted gray body copy
      disabled: "rgba(255,255,255,0.4)",
    },

    divider: "rgba(255,255,255,0.12)",

    success: { main: "#22C55E" },
    error:   { main: "#EF4444" },
    warning: { main: "#F59E0B" },
    info:    { main: "#3B82F6" },
  },

  shape: {
    borderRadius: 12,       // clean modern rounding like screenshot
  },

  typography: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",

    h1: {
      fontSize: "3rem",
      fontWeight: 800,
      lineHeight: 1.2,
      color: "#FFFFFF",
    },
    h2: {
      fontSize: "2.2rem",
      fontWeight: 700,
      color: "#FFFFFF",
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 600,
      color: "#E2E8F0",
    },

    body1: {
      fontSize: "1.05rem",
      lineHeight: 1.6,
      color: "#CBD5E1",
    },

    body2: {
      fontSize: "0.95rem",
      lineHeight: 1.5,
      color: "#94A3B8",
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
      fontSize: "0.95rem",
    },
  },

  shadows: [
    "none",
    "0px 2px 8px rgba(0,0,0,0.35)",
    "0px 4px 16px rgba(0,0,0,0.45)",
    ...Array(22).fill("0px 4px 20px rgba(0,0,0,0.35)"),
  ] as any,

  components: {
    // --------------------------------------
    // NAVBAR (matches screenshot)
    // --------------------------------------
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#0F172A",
          color: "#FFFFFF",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "0px 2px 10px rgba(0,0,0,0.4)",
        },
      },
    },

    // --------------------------------------
    // PAPER/CARDS
    // --------------------------------------
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#1E293B",
          borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.05)",
          boxShadow: "0px 4px 16px rgba(0,0,0,0.45)",
        },
      },
    },

    // --------------------------------------
    // BUTTONS – strong blue, clean shape
    // --------------------------------------
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "10px 22px",
          fontWeight: 600,
        },

        containedPrimary: {
          backgroundColor: "#3B82F6",
          "&:hover": { backgroundColor: "#2563EB" },
        },

        outlined: {
          borderColor: "rgba(255,255,255,0.2)",
          color: "#CBD5E1",
          "&:hover": {
            borderColor: "#3B82F6",
            color: "#FFFFFF",
          },
        },
      },
    },

    // --------------------------------------
    // INPUTS
    // --------------------------------------
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            background: "#0F172A",
            borderRadius: 10,
            color: "#FFFFFF",

            "& fieldset": {
              borderColor: "rgba(255,255,255,0.2)",
            },

            "&:hover fieldset": {
              borderColor: "#3B82F6",
            },

            "&.Mui-focused fieldset": {
              borderColor: "#3B82F6",
              borderWidth: 2,
            },
          },
        },
      },
    },

    // --------------------------------------
    // CHIPS
    // --------------------------------------
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          backgroundColor: "#1E293B",
          color: "#E2E8F0",
          border: "1px solid rgba(255,255,255,0.1)",
        },
      },
    },

    // --------------------------------------
    // TOOLTIP
    // --------------------------------------
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "0.75rem",
          backgroundColor: "#1E293B",
          color: "#F1F5F9",
          border: "1px solid rgba(255,255,255,0.1)",
        },
      },
    },
  },
}