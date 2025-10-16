import React from "react";
import { Box, Drawer } from "@mui/material";
import { DRAWER_WIDTH } from "./constants";
import DrawerContent from "./DrawerContent";

interface NavigationDrawerProps {
  mobileOpen: boolean;
  onDrawerToggle: () => void;
}

export default function NavigationDrawer({
  mobileOpen,
  onDrawerToggle,
}: NavigationDrawerProps) {
  return (
    <Box
      component="nav"
      sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
    >
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { width: DRAWER_WIDTH },
        }}
      >
        <DrawerContent />
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
          },
        }}
        open
      >
        <DrawerContent />
      </Drawer>
    </Box>
  );
}
