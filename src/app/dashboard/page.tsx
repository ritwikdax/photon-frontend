"use client";
import { Box, createTheme, Stack, Typography } from "@mui/material";
import { ThemeOptions } from "@mui/material/styles";

export default function Dashboard() {
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
      <Typography>Dashboard</Typography>
    </Box>
  );
}
