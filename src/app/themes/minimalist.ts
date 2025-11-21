import { ThemeOptions } from "@mui/material";

export const MINIMALIST_DARK: ThemeOptions = {
  palette: {
    mode: "dark",

    primary: {
      main: "#8AB4F8", // Soft elegant blue
      light: "#AFC9FF",
      dark: "#4C6FBF",
      contrastText: "#0D1117",
    },

    secondary: {
      main: "#9BA3AF", // Subtle, neutral gray
    },

    background: {
      default: "#0D1117", // Github/Raycast-like deep charcoal
      paper: "#161B22", // Slightly lighter matte surface
    },

    text: {
      primary: "#E6EAF0", // Premium off-white
      secondary: "#9BA3AF", // Clean neutral gray
      disabled: "#6B7280",
    },

    divider: "rgba(255,255,255,0.08)",

    success: { main: "#34D399" },
    error: { main: "#F87171" },
    warning: { main: "#FBBF24" },
    info: { main: "#60A5FA" },
  },

  shape: {
    borderRadius: 10,
  },

  typography: {
    fontFamily: "'Inter', 'Roboto', sans-serif",
    h1: {
      fontSize: "2.4rem",
      fontWeight: 700,
      letterSpacing: "-0.5px",
      color: "#E6EAF0",
    },
    h2: {
      fontSize: "1.9rem",
      fontWeight: 600,
      color: "#E6EAF0",
    },
    h3: {
      fontSize: "1.6rem",
      fontWeight: 600,
      color: "#E6EAF0",
    },
    body1: {
      fontSize: "1.05rem",
      color: "#E6EAF0",
    },
    body2: {
      fontSize: "0.95rem",
      color: "#9BA3AF",
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },

  shadows: [
    "none",
    "0px 2px 6px rgba(0,0,0,0.6)",
    "0px 4px 12px rgba(0,0,0,0.65)",
    ...Array(22).fill("0px 2px 8px rgba(0,0,0,0.55)"),
  ] as any,

  components: {
    // ---------------------------
    // PAPER SURFACES
    // ---------------------------
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#161B22",
          borderRadius: 10,
          boxShadow: "0px 2px 8px rgba(0,0,0,0.55)",
          border: "1px solid rgba(255,255,255,0.05)",
        },
      },
    },

    // ---------------------------
    // CARDS
    // ---------------------------
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: 16,
          backgroundColor: "#161B22",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.65)",
          border: "1px solid rgba(255,255,255,0.06)",
        },
      },
    },

    // ---------------------------
    // BUTTONS
    // ---------------------------
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "8px 18px",
          fontWeight: 500,
          boxShadow: "none",
        },

        contained: {
          boxShadow: "none",
          backgroundColor: "#8AB4F8",
          color: "#0D1117",
          "&:hover": {
            backgroundColor: "#A1C3FF",
          },
        },

        outlined: {
          borderColor: "rgba(255,255,255,0.18)",
          "&:hover": {
            borderColor: "rgba(255,255,255,0.35)",
          },
        },
      },
    },

    // ---------------------------
    // TEXT FIELDS
    // ---------------------------
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,

            "& fieldset": {
              borderColor: "rgba(255,255,255,0.15)",
            },

            "&:hover fieldset": {
              borderColor: "#8AB4F8",
            },

            "&.Mui-focused fieldset": {
              borderColor: "#8AB4F8",
              borderWidth: 2,
            },
          },
        },
      },
    },

    // ---------------------------
    // APP BAR (Minimal, classy)
    // ---------------------------
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#161B22",
          color: "#E6EAF0",
          boxShadow: "0px 2px 4px rgba(0,0,0,0.45)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 0,
        },
      },
    },

    // ---------------------------
    // TABLE HEADERS
    // ---------------------------
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#1C222A",
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        },
      },
    },

    // ---------------------------
    // CHIP
    // ---------------------------
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          background: "#1C222A",
          color: "#9BA3AF",
        },
      },
    },

    // ---------------------------
    // TOOLTIP
    // ---------------------------
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "0.75rem",
          backgroundColor: "#333",
        },
      },
    },
  },
};

export const MINIMALIST_LIGHT: ThemeOptions = {
  palette: {
    mode: "light",

    primary: {
      main: "#1A73E8", // Subtle blue (Google-like elegance)
      light: "#4D9FFF",
      dark: "#0F4FB2",
      contrastText: "#ffffff",
    },

    secondary: {
      main: "#5F6368", // Clean neutral gray
    },

    background: {
      default: "#F7F8FA", // Soft, premium gray-white
      paper: "#FFFFFF", // Clean white slabs
    },

    text: {
      primary: "#1A1D1F", // Deep professional black
      secondary: "#5F6368", // Elegant neutral gray
      disabled: "#9AA0A6",
    },

    divider: "rgba(0,0,0,0.08)",

    success: { main: "#1B873F" },
    error: { main: "#D93025" },
    warning: { main: "#F9AB00" },
    info: { main: "#1A73E8" },
  },

  shape: {
    borderRadius: 10, // Professional rounding
  },

  typography: {
    fontFamily: "'Inter', 'Roboto', sans-serif",
    h1: {
      fontSize: "2.4rem",
      fontWeight: 700,
      letterSpacing: "-0.5px",
    },
    h2: {
      fontSize: "1.9rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.6rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1.05rem",
      color: "#1A1D1F",
    },
    body2: {
      fontSize: "0.95rem",
      color: "#5F6368",
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
      fontSize: "0.95rem",
    },
  },

  shadows: [
    "none",
    "0px 2px 6px rgba(0,0,0,0.05)",
    "0px 4px 12px rgba(0,0,0,0.06)",
    ...Array(22).fill("0px 2px 8px rgba(0,0,0,0.04)"),
  ] as any,

  components: {
    // ---------------------------
    // PAPER + CARDS (Flat + clean)
    // ---------------------------
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0px 2px 8px rgba(0,0,0,0.04)",
          borderRadius: 10,
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0px 4px 12px rgba(0,0,0,0.06)",
          padding: 16,
        },
      },
    },

    // ---------------------------
    // BUTTONS (Minimalistic)
    // ---------------------------
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "8px 18px",
          fontWeight: 500,
          boxShadow: "none",
        },

        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
            backgroundColor: "#1669d8",
          },
        },

        outlined: {
          borderColor: "rgba(0,0,0,0.15)",
          "&:hover": {
            borderColor: "rgba(0,0,0,0.25)",
          },
        },
      },
    },

    // ---------------------------
    // TEXT FIELD (Clean inputs)
    // ---------------------------
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            "& fieldset": {
              borderColor: "rgba(0,0,0,0.15)",
            },
            "&:hover fieldset": {
              borderColor: "#1A73E8",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#1A73E8",
              borderWidth: 2,
            },
          },
        },
      },
    },

    // ---------------------------
    // APP BAR (White, flat, enterprise)
    // ---------------------------
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          color: "#1A1D1F",
          boxShadow: "0px 2px 4px rgba(0,0,0,0.05)",
          borderRadius: 0,
        },
      },
    },

    // ---------------------------
    // TABLES (Enterprise clean)
    // ---------------------------
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#F1F3F4",
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid rgba(0,0,0,0.08)",
        },
      },
    },

    // ---------------------------
    // CHIPS (subtle)
    // ---------------------------
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          background: "#F1F3F4",
          color: "#5F6368",
        },
      },
    },

    // ---------------------------
    // TOOLTIP (professional)
    // ---------------------------
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "0.75rem",
          backgroundColor: "#333",
        },
      },
    },
  },
};
