"use client";
import { Box, createTheme, Stack, Typography } from "@mui/material";
import { ThemeOptions } from "@mui/material/styles";
import { useProjectContext } from "../context/all";

export default function Dashboard() {
  const c = useProjectContext();
  console.log(c.selectedProject);
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
