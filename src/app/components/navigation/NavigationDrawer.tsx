import React from "react";
import { Box, Drawer } from "@mui/material";
import { DRAWER_WIDTH } from "./constants";
import DrawerContent from "./DrawerContent";

interface NavigationDrawerProps {
  mobileOpen: boolean;
  onDrawerToggle: () => void;
  desktopOpen: boolean;
}

export default function NavigationDrawer({
  mobileOpen,
  onDrawerToggle,
  desktopOpen,
}: NavigationDrawerProps) {
  return (
    <Box
      component="nav"
      sx={{ 
        width: { xs: 0, sm: desktopOpen ? DRAWER_WIDTH : 0 }, 
        flexShrink: { sm: 0 } 
      }}
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
        variant="persistent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            transition: (theme) => theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          },
        }}
        open={desktopOpen}
      >
        <DrawerContent />
      </Drawer>
    </Box>
  );
}
