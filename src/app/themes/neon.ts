import { ThemeOptions } from "@mui/material";

export const NEON_DARK: ThemeOptions = {
  palette: {
    mode: "dark",

    primary: {
      main: "#8B82FF",
      light: "#A59CFF",
      dark: "#4F46E5",
      contrastText: "#ffffff",
    },

    secondary: {
      main: "#22D3EE",
      light: "#67E8F9",
      dark: "#0E7490",
      contrastText: "#0B0F19",
    },

    background: {
      default: "#0B0F19", // Deep space blue-black
      paper: "rgba(22, 26, 41, 0.55)", // Glassmorphism on dark
    },

    text: {
      primary: "#F5F7FA",
      secondary: "#A5AEC0",
    },

    success: { main: "#34D399" },
    error: { main: "#F87171" },
    warning: { main: "#FBBF24" },
    info: { main: "#60A5FA" },
  },

  shape: { borderRadius: 16 },

  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: {
      fontSize: "3rem",
      fontWeight: 800,
      letterSpacing: "-1px",
      color: "#F5F7FA",
    },
    h2: {
      fontSize: "2.4rem",
      fontWeight: 700,
      color: "#F5F7FA",
    },
    h3: {
      fontSize: "1.9rem",
      fontWeight: 700,
      color: "#F5F7FA",
    },
    body1: {
      fontSize: "1.05rem",
      lineHeight: 1.6,
      color: "#CBD2E0",
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  shadows: [
    "none",
    "0px 4px 12px rgba(139,130,255,0.18)",
    "0px 8px 24px rgba(34,211,238,0.20)",
    ...Array(22).fill("0px 4px 16px rgba(0,0,0,0.25)"),
  ] as any,

  components: {
    // ---------------------
    // GLASS SURFACES
    // ---------------------
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(20px)",
          backgroundImage: "none",
          border: "1px solid rgba(255,255,255,0.12)",
        },
      },
    },

    // ---------------------
    // CARDS
    // ---------------------
    MuiCard: {
      styleOverrides: {
        root: {
          padding: 20,
          borderRadius: 20,
          background: "rgba(22,26,41,0.45)",
          backdropFilter: "blur(24px)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
        },
      },
    },

    // ---------------------
    // BUTTONS
    // ---------------------
    MuiButton: {
      variants: [
        {
          props: { variant: "gradient" } as any,
          style: {
            background: "linear-gradient(135deg, #8B82FF, #22D3EE)",
            color: "#fff",
            borderRadius: 12,
            padding: "10px 24px",
            boxShadow: "0 8px 24px rgba(139,130,255,0.35)",
            "&:hover": {
              filter: "brightness(1.2)",
            },
          },
        },
      ],

      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: "8px 20px",
        },
      },
    },

    // ---------------------
    // TEXT FIELDS (Glass Inputs)
    // ---------------------
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 14,
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(12px)",
            color: "#F5F7FA",

            "& fieldset": {
              borderColor: "rgba(255,255,255,0.14)",
            },

            "&:hover fieldset": {
              borderColor: "#8B82FF",
            },

            "&.Mui-focused fieldset": {
              borderColor: "#8B82FF",
              borderWidth: 2,
            },
          },
        },
      },
    },

    // ---------------------
    // NAVBAR (Glass)
    // ---------------------
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "rgba(22, 26, 41, 0.5)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
        },
      },
    },

    // ---------------------
    // CHIPS
    // ---------------------
    MuiChip: {
      styleOverrides: {
        root: ({ ownerState }: any) => ({
          borderRadius: 10,
          padding: "6px 10px",
          ...(ownerState.color === "default" && {
            background: "rgba(139,130,255,0.12)",
            color: "#E4E7EE",
          }),
        }),
      },
    },
  },
};

export const NEON_LIGHT: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#4F46E5", // Indigo
      light: "#8B82FF",
      dark: "#312E81",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#06B6D4", // Cyan
      light: "#67E8F9",
      dark: "#0E7490",
      contrastText: "#ffffff",
    },
    background: {
      default: "#F3F3FB", // Soft off-white
      paper: "rgba(255,255,255,0.55)", // Glassmorphism
    },
    success: { main: "#10B981" },
    error: { main: "#EF4444" },
    warning: { main: "#F59E0B" },
    info: { main: "#3B82F6" },
    text: {
      primary: "#1E1E28",
      secondary: "#4B4B5A",
    },
    // gradient: {
    //   main: "linear-gradient(135deg, #4F46E5 0%, #06B6D4 100%)",
    // },
  },

  shape: {
    borderRadius: 16, // Unique rounded UI
  },

  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: {
      fontSize: "3rem",
      fontWeight: 800,
      letterSpacing: "-1px",
    },
    h2: {
      fontSize: "2.4rem",
      fontWeight: 700,
    },
    h3: {
      fontSize: "1.9rem",
      fontWeight: 700,
    },
    body1: {
      fontSize: "1.05rem",
      lineHeight: 1.6,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  shadows: [
    "none",
    "0px 4px 12px rgba(79,70,229,0.08)",
    "0px 8px 24px rgba(6,182,212,0.12)",
    ...Array(22).fill("0px 4px 16px rgba(0,0,0,0.06)"),
  ] as any,

  components: {
    // ----------------------------------------------------
    // GLOBAL DEFAULTS
    // ----------------------------------------------------
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(16px)",
          backgroundImage: "none",
          border: "1px solid rgba(255,255,255,0.25)",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          padding: 20,
          borderRadius: 20,
          background: "rgba(255,255,255,0.45)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 4px 24px rgba(79,70,229,0.08)",
        },
      },
    },

    MuiButton: {
      variants: [
        {
          props: { variant: "gradient" } as any,
          style: {
            background: "linear-gradient(135deg, #4F46E5, #06B6D4)",
            color: "#fff",
            borderRadius: 12,
            padding: "10px 24px",
            boxShadow: "0 6px 20px rgba(79,70,229,0.25)",
            "&:hover": {
              filter: "brightness(1.15)",
            },
          },
        },
      ],

      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: "8px 20px",
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 14,
            background: "rgba(255,255,255,0.65)",
            backdropFilter: "blur(10px)",
            "& fieldset": {
              borderColor: "rgba(0,0,0,0.12)",
            },
            "&:hover fieldset": {
              borderColor: "#4F46E5",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#4F46E5",
              borderWidth: 2,
            },
          },
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "#4F46E5",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(255,255,255,0.3)",
          boxShadow: "0 4px 20px rgba(79,70,229,0.08)",
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: ({ ownerState }: any) => ({
          borderRadius: 10,
          padding: "6px 10px",
          ...(ownerState.color === "default" && {
            background: "rgba(79,70,229,0.08)",
          }),
        }),
      },
    },
  },
};
