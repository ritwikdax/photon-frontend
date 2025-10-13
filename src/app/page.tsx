"use client";
import Image from "next/image";
import Button from "@mui/material/Button";
//import styles from "./page.module.css";
import { ThemeProvider } from "@emotion/react";
import { createTheme, Stack } from "@mui/material";
import { ThemeOptions } from "@mui/material/styles";

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
    <ThemeProvider theme={theme}>
      <div>
        <main>
          <Button variant="contained">Click Me</Button>
          <Stack spacing={2} direction="row">
            <Button variant="text">Text</Button>
            <Button variant="contained">Contained</Button>
            <Button variant="outlined">Outlined</Button>
          </Stack>
        </main>
        <footer></footer>
      </div>
    </ThemeProvider>
  );
}
