import { ThemeOptions } from "@mui/material";

export const SLACK_LIGHT: ThemeOptions = {
  palette: {
    mode: "light",

    primary: {
      main: "#532755", // Slack-like plum purple
      light: "#7A3B7E",
      dark: "#38173A",
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: "#F9F1FF", // Light lavender surface
    },

    background: {
      default: "#FCFFFC", // Soft mint-white
      paper: "#FFFFFF", // Clean white cards
    },

    text: {
      primary: "#1A1A1A", // Dark gray-black
      secondary: "#5A5A5A", // Slack-style muted text
    },

    divider: "rgba(0,0,0,0.08)",

    success: { main: "#2EB67D" }, // Slack green
    error: { main: "#E01E5A" }, // Slack red
    warning: { main: "#ECB22E" }, // Slack yellow
    info: { main: "#36C5F0" }, // Slack teal
  },

  shape: {
    borderRadius: 12, // softer Slack-like UI rounding
  },

  typography: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",

    h1: {
      fontSize: "2.2rem",
      fontWeight: 700,
      letterSpacing: "-0.5px",
    },

    h2: {
      fontSize: "1.8rem",
      fontWeight: 600,
    },

    h3: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },

    body1: {
      fontSize: "1rem",
      color: "#1A1A1A",
    },

    body2: {
      fontSize: "0.92rem",
      color: "#5A5A5A",
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
      fontSize: "0.95rem",
    },
  },

  shadows: [
    "none",
    "0px 2px 6px rgba(0,0,0,0.04)",
    "0px 4px 10px rgba(0,0,0,0.06)",
    ...Array(22).fill("0px 2px 8px rgba(0,0,0,0.04)"),
  ] as any,

  components: {
    // ---------------------------
    // PAPER & CARDS
    // ---------------------------
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          borderRadius: 12,
          boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          padding: 18,
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.06)",
        },
      },
    },

    // ---------------------------
    // BUTTON DESIGN
    // ---------------------------
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "8px 18px",
          fontWeight: 600,
          boxShadow: "none",
        },

        containedPrimary: {
          backgroundColor: "#532755",
          "&:hover": {
            backgroundColor: "#6B2E6D",
          },
        },

        outlined: {
          borderColor: "rgba(0,0,0,0.2)",
          "&:hover": {
            borderColor: "#532755",
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
            borderRadius: 10,
            background: "#FFFFFF",

            "& fieldset": {
              borderColor: "rgba(0,0,0,0.15)",
            },

            "&:hover fieldset": {
              borderColor: "#532755",
            },

            "&.Mui-focused fieldset": {
              borderColor: "#532755",
              borderWidth: 2,
            },
          },
        },
      },
    },

    // ---------------------------
    // SLACK-LIKE APP BAR
    // ---------------------------
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#532755",
          color: "#FFFFFF",
          boxShadow: "0px 2px 10px rgba(0,0,0,0.15)",
          borderRadius: 0,
        },
      },
    },

    // ---------------------------
    // TABLES
    // ---------------------------
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#F9F1FF",
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
    // CHIP
    // ---------------------------
    MuiChip: {
      styleOverrides: {
        root: ({ ownerState }: any) => ({
          borderRadius: 6,
          fontWeight: 600,
          ...(ownerState.color === "default" && {
            background: "#F9F1FF",
            color: "#532755",
          }),
        }),
      },
    },

    // ---------------------------
    // TOOLTIP
    // ---------------------------
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "0.78rem",
          backgroundColor: "#532755",
          color: "#FFFFFF",
        },
      },
    },
  },
};

export const SLACK_DARK: ThemeOptions = {
  palette: {
    mode: "dark",

    // Slack's signature deep purple
    primary: {
      main: "#BEA2C2", // Soft plum-accent for dark mode
      light: "#CDB0D2",
      dark: "#8D6F95",
      contrastText: "#0D0A0E",
    },

    // Secondary lavender BG
    secondary: {
      main: "#3B2C4A", // Dark lavender panel (Slack-inspired)
    },

    background: {
      default: "#1A1D21", // Slack dark gray background
      paper: "#232529", // Slightly lighter panel
    },

    text: {
      primary: "#F4F6F8",
      secondary: "#C0C4C9",
      disabled: "rgba(255,255,255,0.35)",
    },

    divider: "rgba(255,255,255,0.1)",

    // Slack branding colors
    success: { main: "#2EB67D" },
    error: { main: "#E01E5A" },
    warning: { main: "#ECB22E" },
    info: { main: "#36C5F0" },
  },

  shape: {
    borderRadius: 12,
  },

  typography: {
    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",

    h1: {
      fontSize: "2.2rem",
      fontWeight: 700,
      letterSpacing: "-0.5px",
      color: "#F4F6F8",
    },
    h2: {
      fontSize: "1.8rem",
      fontWeight: 600,
      color: "#F4F6F8",
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 600,
      color: "#F4F6F8",
    },
    body1: {
      fontSize: "1rem",
      color: "#F4F6F8",
    },
    body2: {
      fontSize: "0.92rem",
      color: "#C0C4C9",
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
      fontSize: "0.93rem",
    },
  },

  shadows: [
    "none",
    "0px 2px 6px rgba(0,0,0,0.5)",
    "0px 4px 12px rgba(0,0,0,0.55)",
    ...Array(22).fill("0px 2px 6px rgba(0,0,0,0.4)"),
  ] as any,

  components: {
    // --------------------------------------
    // PANELS & CARDS (Slack-like dark matte)
    // --------------------------------------
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#232529",
          borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.05)",
          boxShadow: "0px 2px 6px rgba(0,0,0,0.45)",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#232529",
          borderRadius: 14,
          padding: 18,
          border: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.55)",
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
          fontWeight: 600,
          boxShadow: "none",
        },

        containedPrimary: {
          backgroundColor: "#8D6F95",
          color: "#0D0A0E",
          "&:hover": {
            backgroundColor: "#A685AE",
          },
        },

        outlined: {
          borderColor: "rgba(255,255,255,0.18)",
          "&:hover": {
            borderColor: "#BEA2C2",
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
            borderRadius: 10,
            background: "#2A2D31",
            color: "#F4F6F8",

            "& fieldset": {
              borderColor: "rgba(255,255,255,0.15)",
            },

            "&:hover fieldset": {
              borderColor: "#BEA2C2",
            },

            "&.Mui-focused fieldset": {
              borderColor: "#BEA2C2",
              borderWidth: 2,
            },
          },
        },
      },
    },

    // ---------------------------
    // SLACK-LIKE APP BAR
    // ---------------------------
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#532755", // deep plum
          color: "#FFFFFF",
          boxShadow: "0px 2px 10px rgba(0,0,0,0.3)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 0,
        },
      },
    },

    // ---------------------------
    // TABLE
    // ---------------------------
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#2A2D31",
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          color: "#F4F6F8",
        },
      },
    },

    // ---------------------------
    // CHIP
    // ---------------------------
    MuiChip: {
      styleOverrides: {
        root: ({ ownerState }: any) => ({
          borderRadius: 6,
          fontWeight: 600,
          ...(ownerState.color === "default" && {
            background: "#3B2C4A",
            color: "#E2D6ED",
          }),
        }),
      },
    },

    // ---------------------------
    // TOOLTIP
    // ---------------------------
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "0.78rem",
          backgroundColor: "#532755",
          color: "#FFFFFF",
        },
      },
    },
  },
};
