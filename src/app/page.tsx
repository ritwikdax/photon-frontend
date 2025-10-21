"use client";
import { Box, createTheme, Stack, Typography } from "@mui/material";
import { ThemeOptions } from "@mui/material/styles";
import { QueryClient } from "@tanstack/react-query";

const client = new QueryClient();

export default function Home() {
  const themeOptions: ThemeOptions = {
    palette: {
      mode: "dark",
      primary: {
        main: "#5893df",
      },
      secondary: {
        main: "#2ec5d3",
      },
      background: {
        default: "#192231",
        paper: "#24344d",
      },
    },
  };
  const theme = createTheme(themeOptions);
  return (
    <Box>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
        Your central hub for managing projects, events, and deliverables with
        ease.
      </Typography>
    </Box>
  );
}
