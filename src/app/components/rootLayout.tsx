"use client";
import React from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  AppBar,
  Typography,
  IconButton,
  Select,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {Add} from "@mui/icons-material"
import AutoCompleteDropdown from "./forms/autocomplete";
import AllContextProviders from "../context/all";
const drawerWidth = 240;

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {["Dashboard", "Users", "Settings", "Reports"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

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
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: "#001c3dff", // Custom background color
            boxShadow: "none", // Remove drop shadow
          }}>
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton
                color="inherit"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                Photon
              </Typography>
            </div>
            <AutoCompleteDropdown />
            <Button sx={{marginLeft:"20px" , backgroundColor: "#b70058ff"}} variant="contained" startIcon={<Add/>}> Add</Button>
          </Toolbar>
        </AppBar>

        {/* Side Drawer */}
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
          {/* Mobile Drawer */}
          <Drawer
            variant="persistent"
            open={false}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": { width: drawerWidth },
            }}>
            {drawer}
          </Drawer>

          {/* Desktop Drawer */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
            open>
            {drawer}
          </Drawer>
        </Box>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
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
