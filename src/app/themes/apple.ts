import { ThemeOptions } from "@mui/material";

export const APPLE_DARK: ThemeOptions = {
  palette: {
    mode: "dark",

    primary: {
      main: "#0A84FF",      // Apple's signature blue
      light: "#409CFF",
      dark: "#0066CC",
      contrastText: "#ffffff",
    },

    secondary: {
      main: "#FF9F0A",      // Apple's orange accent
      light: "#FFB340",
      dark: "#FF8800",
      contrastText: "#1C1C1E",
    },

    background: {
      default: "#000000",                    // Pure black base
      paper: "rgba(28, 28, 30, 0.72)",      // Frosted glass material
    },

    text: {
      primary: "#FFFFFF",
      secondary: "rgba(235, 235, 245, 0.6)",
      disabled: "rgba(235, 235, 245, 0.3)",
    },

    divider: "rgba(255, 255, 255, 0.08)",

    success: { main: "#30D158" },   // Apple green
    error: { main: "#FF453A" },     // Apple red
    warning: { main: "#FF9F0A" },   // Apple orange
    info: { main: "#64D2FF" },      // Apple cyan
  },

  shape: {
    borderRadius: 18,    // Apple's characteristic smooth corners
  },

  typography: {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', sans-serif",

    h1: {
      fontSize: "3.5rem",
      fontWeight: 700,
      letterSpacing: "-1.5px",
      color: "#FFFFFF",
    },
    h2: {
      fontSize: "2.75rem",
      fontWeight: 700,
      letterSpacing: "-1px",
      color: "#FFFFFF",
    },
    h3: {
      fontSize: "2rem",
      fontWeight: 600,
      letterSpacing: "-0.5px",
      color: "#FFFFFF",
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
      color: "#FFFFFF",
    },
    body1: {
      fontSize: "1.0625rem",
      lineHeight: 1.5,
      color: "#FFFFFF",
    },
    body2: {
      fontSize: "0.9375rem",
      lineHeight: 1.43,
      color: "rgba(235, 235, 245, 0.6)",
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
      fontSize: "1rem",
    },
  },

  shadows: [
    "none",
    "0px 1px 3px rgba(0, 0, 0, 0.5)",
    "0px 2px 8px rgba(0, 0, 0, 0.6)",
    "0px 4px 16px rgba(0, 0, 0, 0.7)",
    ...Array(21).fill("0px 8px 32px rgba(0, 0, 0, 0.8)"),
  ] as any,

  components: {
    // --------------------------------------
    // FROSTED GLASS SURFACES
    // --------------------------------------
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(28, 28, 30, 0.72)",
          backdropFilter: "saturate(180%) blur(20px)",
          WebkitBackdropFilter: "saturate(180%) blur(20px)",
          border: "0.5px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.7)",
          borderRadius: 18,
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(28, 28, 30, 0.72)",
          backdropFilter: "saturate(180%) blur(20px)",
          WebkitBackdropFilter: "saturate(180%) blur(20px)",
          border: "0.5px solid rgba(255, 255, 255, 0.1)",
          borderRadius: 20,
          padding: 24,
          boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.7)",
        },
      },
    },

    // --------------------------------------
    // BUTTONS - Apple's Pill Style
    // --------------------------------------
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          padding: "10px 28px",
          fontWeight: 500,
          fontSize: "1rem",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        },

        contained: {
          backgroundColor: "#0A84FF",
          color: "#FFFFFF",
          boxShadow: "0px 2px 8px rgba(10, 132, 255, 0.3)",
          "&:hover": {
            backgroundColor: "#409CFF",
            boxShadow: "0px 4px 16px rgba(10, 132, 255, 0.4)",
            transform: "translateY(-1px)",
          },
          "&:active": {
            transform: "translateY(0px)",
          },
        },

        containedPrimary: {
          backgroundColor: "#0A84FF",
          "&:hover": {
            backgroundColor: "#409CFF",
          },
        },

        outlined: {
          borderColor: "rgba(255, 255, 255, 0.16)",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
          color: "#FFFFFF",
          "&:hover": {
            borderColor: "rgba(255, 255, 255, 0.3)",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
        },

        text: {
          color: "#0A84FF",
          "&:hover": {
            backgroundColor: "rgba(10, 132, 255, 0.1)",
          },
        },
      },
    },

    // --------------------------------------
    // TEXT FIELDS - Frosted Input
    // --------------------------------------
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "rgba(58, 58, 60, 0.4)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            borderRadius: 12,
            color: "#FFFFFF",
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",

            "& fieldset": {
              borderColor: "rgba(255, 255, 255, 0.12)",
              borderWidth: 0.5,
            },

            "&:hover": {
              backgroundColor: "rgba(58, 58, 60, 0.5)",
              "& fieldset": {
                borderColor: "rgba(255, 255, 255, 0.2)",
              },
            },

            "&.Mui-focused": {
              backgroundColor: "rgba(58, 58, 60, 0.6)",
              "& fieldset": {
                borderColor: "#0A84FF",
                borderWidth: 1.5,
              },
            },
          },

          "& .MuiInputLabel-root": {
            color: "rgba(235, 235, 245, 0.6)",
            "&.Mui-focused": {
              color: "#0A84FF",
            },
          },
        },
      },
    },

    // --------------------------------------
    // APP BAR - Translucent Navigation
    // --------------------------------------
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(28, 28, 30, 0.8)",
          backdropFilter: "saturate(180%) blur(20px)",
          WebkitBackdropFilter: "saturate(180%) blur(20px)",
          color: "#FFFFFF",
          borderBottom: "0.5px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.5)",
        },
      },
    },

    // --------------------------------------
    // CHIPS - Pill Badges
    // --------------------------------------
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundColor: "rgba(58, 58, 60, 0.6)",
          backdropFilter: "blur(10px)",
          color: "#FFFFFF",
          border: "0.5px solid rgba(255, 255, 255, 0.1)",
          fontWeight: 500,
        },

        filled: {
          backgroundColor: "rgba(10, 132, 255, 0.2)",
          color: "#0A84FF",
        },
      },
    },

    // --------------------------------------
    // TABLES
    // --------------------------------------
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(44, 44, 46, 0.5)",
          backdropFilter: "blur(10px)",
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "0.5px solid rgba(255, 255, 255, 0.08)",
          color: "#FFFFFF",
        },
        head: {
          fontWeight: 600,
          color: "rgba(235, 235, 245, 0.6)",
          fontSize: "0.875rem",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        },
      },
    },

    // --------------------------------------
    // TOOLTIP - Frosted Overlay
    // --------------------------------------
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "rgba(44, 44, 46, 0.85)",
          backdropFilter: "blur(20px)",
          color: "#FFFFFF",
          fontSize: "0.8125rem",
          borderRadius: 8,
          border: "0.5px solid rgba(255, 255, 255, 0.12)",
          boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.6)",
        },
      },
    },

    // --------------------------------------
    // DIALOG - Glass Modal
    // --------------------------------------
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: "rgba(28, 28, 30, 0.85)",
          backdropFilter: "saturate(180%) blur(30px)",
          WebkitBackdropFilter: "saturate(180%) blur(30px)",
          border: "0.5px solid rgba(255, 255, 255, 0.12)",
          borderRadius: 24,
          boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.8)",
        },
      },
    },

    // --------------------------------------
    // SWITCH - Apple Toggle
    // --------------------------------------
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 51,
          height: 31,
          padding: 0,
        },
        switchBase: {
          padding: 2,
          "&.Mui-checked": {
            transform: "translateX(20px)",
            color: "#fff",
            "& + .MuiSwitch-track": {
              backgroundColor: "#30D158",
              opacity: 1,
            },
          },
        },
        thumb: {
          width: 27,
          height: 27,
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
        },
        track: {
          borderRadius: 31 / 2,
          backgroundColor: "rgba(58, 58, 60, 0.6)",
          opacity: 1,
        },
      },
    },

    // --------------------------------------
    // DRAWER - Sidebar Glass
    // --------------------------------------
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "rgba(28, 28, 30, 0.85)",
          backdropFilter: "saturate(180%) blur(20px)",
          WebkitBackdropFilter: "saturate(180%) blur(20px)",
          borderRight: "0.5px solid rgba(255, 255, 255, 0.1)",
        },
      },
    },

    // --------------------------------------
    // MENU - Dropdown Glass
    // --------------------------------------
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: "rgba(44, 44, 46, 0.85)",
          backdropFilter: "saturate(180%) blur(20px)",
          WebkitBackdropFilter: "saturate(180%) blur(20px)",
          border: "0.5px solid rgba(255, 255, 255, 0.12)",
          borderRadius: 14,
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.7)",
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: "4px 8px",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.08)",
          },
          "&.Mui-selected": {
            backgroundColor: "rgba(10, 132, 255, 0.15)",
            "&:hover": {
              backgroundColor: "rgba(10, 132, 255, 0.2)",
            },
          },
        },
      },
    },
  },
};

export const APPLE_LIGHT: ThemeOptions = {
  palette: {
    mode: "light",

    primary: {
      main: "#007AFF",      // Apple's light mode blue
      light: "#5AC8FA",
      dark: "#0051D5",
      contrastText: "#ffffff",
    },

    secondary: {
      main: "#FF9500",      // Apple's orange
      light: "#FFCC00",
      dark: "#FF6B00",
      contrastText: "#ffffff",
    },

    background: {
      default: "#F2F2F7",                    // Apple's light gray
      paper: "rgba(255, 255, 255, 0.72)",   // Frosted white glass
    },

    text: {
      primary: "#000000",
      secondary: "rgba(60, 60, 67, 0.6)",
      disabled: "rgba(60, 60, 67, 0.3)",
    },

    divider: "rgba(0, 0, 0, 0.08)",

    success: { main: "#34C759" },   // Apple green light
    error: { main: "#FF3B30" },     // Apple red light
    warning: { main: "#FF9500" },   // Apple orange light
    info: { main: "#5AC8FA" },      // Apple cyan light
  },

  shape: {
    borderRadius: 18,
  },

  typography: {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', sans-serif",

    h1: {
      fontSize: "3.5rem",
      fontWeight: 700,
      letterSpacing: "-1.5px",
      color: "#000000",
    },
    h2: {
      fontSize: "2.75rem",
      fontWeight: 700,
      letterSpacing: "-1px",
      color: "#000000",
    },
    h3: {
      fontSize: "2rem",
      fontWeight: 600,
      letterSpacing: "-0.5px",
      color: "#000000",
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
      color: "#000000",
    },
    body1: {
      fontSize: "1.0625rem",
      lineHeight: 1.5,
      color: "#000000",
    },
    body2: {
      fontSize: "0.9375rem",
      lineHeight: 1.43,
      color: "rgba(60, 60, 67, 0.6)",
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
      fontSize: "1rem",
    },
  },

  shadows: [
    "none",
    "0px 1px 3px rgba(0, 0, 0, 0.08)",
    "0px 2px 8px rgba(0, 0, 0, 0.12)",
    "0px 4px 16px rgba(0, 0, 0, 0.16)",
    ...Array(21).fill("0px 8px 32px rgba(0, 0, 0, 0.18)"),
  ] as any,

  components: {
    // --------------------------------------
    // FROSTED GLASS SURFACES (LIGHT)
    // --------------------------------------
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.72)",
          backdropFilter: "saturate(180%) blur(20px)",
          WebkitBackdropFilter: "saturate(180%) blur(20px)",
          border: "0.5px solid rgba(0, 0, 0, 0.08)",
          boxShadow: "0px 2px 16px rgba(0, 0, 0, 0.12)",
          borderRadius: 18,
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.72)",
          backdropFilter: "saturate(180%) blur(20px)",
          WebkitBackdropFilter: "saturate(180%) blur(20px)",
          border: "0.5px solid rgba(0, 0, 0, 0.08)",
          borderRadius: 20,
          padding: 24,
          boxShadow: "0px 2px 16px rgba(0, 0, 0, 0.12)",
        },
      },
    },

    // --------------------------------------
    // BUTTONS - Light Mode
    // --------------------------------------
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          padding: "10px 28px",
          fontWeight: 500,
          fontSize: "1rem",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        },

        contained: {
          backgroundColor: "#007AFF",
          color: "#FFFFFF",
          boxShadow: "0px 2px 8px rgba(0, 122, 255, 0.25)",
          "&:hover": {
            backgroundColor: "#0051D5",
            boxShadow: "0px 4px 16px rgba(0, 122, 255, 0.35)",
            transform: "translateY(-1px)",
          },
          "&:active": {
            transform: "translateY(0px)",
          },
        },

        containedPrimary: {
          backgroundColor: "#007AFF",
          "&:hover": {
            backgroundColor: "#0051D5",
          },
        },

        outlined: {
          borderColor: "rgba(0, 0, 0, 0.12)",
          backgroundColor: "rgba(0, 0, 0, 0.02)",
          backdropFilter: "blur(10px)",
          color: "#007AFF",
          "&:hover": {
            borderColor: "rgba(0, 0, 0, 0.2)",
            backgroundColor: "rgba(0, 0, 0, 0.05)",
          },
        },

        text: {
          color: "#007AFF",
          "&:hover": {
            backgroundColor: "rgba(0, 122, 255, 0.08)",
          },
        },
      },
    },

    // --------------------------------------
    // TEXT FIELDS - Light Glass Input
    // --------------------------------------
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "rgba(242, 242, 247, 0.6)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            borderRadius: 12,
            color: "#000000",
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",

            "& fieldset": {
              borderColor: "rgba(0, 0, 0, 0.1)",
              borderWidth: 0.5,
            },

            "&:hover": {
              backgroundColor: "rgba(242, 242, 247, 0.8)",
              "& fieldset": {
                borderColor: "rgba(0, 0, 0, 0.15)",
              },
            },

            "&.Mui-focused": {
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              "& fieldset": {
                borderColor: "#007AFF",
                borderWidth: 1.5,
              },
            },
          },

          "& .MuiInputLabel-root": {
            color: "rgba(60, 60, 67, 0.6)",
            "&.Mui-focused": {
              color: "#007AFF",
            },
          },
        },
      },
    },

    // --------------------------------------
    // APP BAR - Light Translucent Nav
    // --------------------------------------
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "saturate(180%) blur(20px)",
          WebkitBackdropFilter: "saturate(180%) blur(20px)",
          color: "#000000",
          borderBottom: "0.5px solid rgba(0, 0, 0, 0.08)",
          boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.08)",
        },
      },
    },

    // --------------------------------------
    // CHIPS - Light Badges
    // --------------------------------------
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundColor: "rgba(242, 242, 247, 0.8)",
          backdropFilter: "blur(10px)",
          color: "#000000",
          border: "0.5px solid rgba(0, 0, 0, 0.08)",
          fontWeight: 500,
        },

        filled: {
          backgroundColor: "rgba(0, 122, 255, 0.15)",
          color: "#007AFF",
        },
      },
    },

    // --------------------------------------
    // TABLES
    // --------------------------------------
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(242, 242, 247, 0.6)",
          backdropFilter: "blur(10px)",
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "0.5px solid rgba(0, 0, 0, 0.08)",
          color: "#000000",
        },
        head: {
          fontWeight: 600,
          color: "rgba(60, 60, 67, 0.6)",
          fontSize: "0.875rem",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        },
      },
    },

    // --------------------------------------
    // TOOLTIP
    // --------------------------------------
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(20px)",
          color: "#000000",
          fontSize: "0.8125rem",
          borderRadius: 8,
          border: "0.5px solid rgba(0, 0, 0, 0.1)",
          boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.15)",
        },
      },
    },

    // --------------------------------------
    // DIALOG
    // --------------------------------------
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "saturate(180%) blur(30px)",
          WebkitBackdropFilter: "saturate(180%) blur(30px)",
          border: "0.5px solid rgba(0, 0, 0, 0.1)",
          borderRadius: 24,
          boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.2)",
        },
      },
    },

    // --------------------------------------
    // SWITCH
    // --------------------------------------
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 51,
          height: 31,
          padding: 0,
        },
        switchBase: {
          padding: 2,
          "&.Mui-checked": {
            transform: "translateX(20px)",
            color: "#fff",
            "& + .MuiSwitch-track": {
              backgroundColor: "#34C759",
              opacity: 1,
            },
          },
        },
        thumb: {
          width: 27,
          height: 27,
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.15)",
        },
        track: {
          borderRadius: 31 / 2,
          backgroundColor: "rgba(120, 120, 128, 0.32)",
          opacity: 1,
        },
      },
    },

    // --------------------------------------
    // DRAWER
    // --------------------------------------
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "saturate(180%) blur(20px)",
          WebkitBackdropFilter: "saturate(180%) blur(20px)",
          borderRight: "0.5px solid rgba(0, 0, 0, 0.08)",
        },
      },
    },

    // --------------------------------------
    // MENU
    // --------------------------------------
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "saturate(180%) blur(20px)",
          WebkitBackdropFilter: "saturate(180%) blur(20px)",
          border: "0.5px solid rgba(0, 0, 0, 0.1)",
          borderRadius: 14,
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)",
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: "4px 8px",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.05)",
          },
          "&.Mui-selected": {
            backgroundColor: "rgba(0, 122, 255, 0.12)",
            "&:hover": {
              backgroundColor: "rgba(0, 122, 255, 0.18)",
            },
          },
        },
      },
    },
  },
};
