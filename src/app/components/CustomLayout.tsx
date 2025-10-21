"use client";
import React from "react";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import AllContextProviders from "../context/all";
import AppHeader from "./navigation/AppHeader";
import NavigationDrawer from "./navigation/NavigationDrawer";
import { DRAWER_WIDTH } from "./navigation/constants";

export default function CustomLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AllContextProviders>
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          overflow: "hidden",
        }}>
        <CssBaseline />

        {/* Top App Bar */}
        <AppHeader onMenuClick={handleDrawerToggle} />

        {/* Side Drawer */}
        <NavigationDrawer
          mobileOpen={mobileOpen}
          onDrawerToggle={handleDrawerToggle}
        />

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
            backgroundColor: "#f5f5f5",
            minHeight: "100vh",
          }}>
          <Toolbar />
          {children}
        </Box>
      </Box>
    </AllContextProviders>
  );
}
