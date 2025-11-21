import React from "react";
import { Box, Toolbar, Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import NavigationMenu from "./NavigationMenu";

export default function DrawerContent() {
  const navigate = useRouter();

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Toolbar />
      <NavigationMenu />
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
        <Fab
          variant="extended"
          color="primary"
          sx={{
            width: "100%",
          }}
          onClick={() => {
            navigate.push("/project/add");
          }}
        >
          <Add sx={{ mr: 1 }} />
          Add Project
        </Fab>
      </Box>
    </div>
  );
}
