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
  ListItemIcon,
  AppBar,
  Typography,
  IconButton,
  Select,
  Button,
  Fab,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Add } from "@mui/icons-material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventIcon from "@mui/icons-material/Event";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PeopleIcon from "@mui/icons-material/People";
import BusinessIcon from "@mui/icons-material/Business";
import AutoCompleteDropdown from "./forms/autocomplete";
import AllContextProviders from "../context/all";
import { useRouter, usePathname } from "next/navigation";
const drawerWidth = 240;

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const navigate = useRouter();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: "Project", path: "/project", icon: <DashboardIcon /> },
    { text: "Events", path: "/events", icon: <EventIcon /> },
    { text: "Deliverables", path: "/deliverables", icon: <AssignmentIcon /> },
    { text: "Employees", path: "/employees", icon: <PeopleIcon /> },
    { text: "Clients", path: "/clients", icon: <BusinessIcon /> },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const drawer = (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Toolbar />
      <List>
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                selected={isActive}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  textDecoration: "none",
                  width: "100%",
                  "&.Mui-selected": {
                    backgroundColor: "action.selected",
                    "&:hover": {
                      backgroundColor: "action.selected",
                    },
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
        <Fab
          variant="extended"
          sx={{
            backgroundColor: "#b70058ff",
            color: "white",
            width: "100%",
            "&:hover": {
              backgroundColor: "#950047",
            },
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

  return (
    <AllContextProviders>
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <CssBaseline />

        {/* Top App Bar */}
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: "#001c3dff", // Custom background color
            boxShadow: "none", // Remove drop shadow
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton
                color="inherit"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                Photon
              </Typography>
            </div>
            <AutoCompleteDropdown />
            <Button
              sx={{ marginLeft: "20px", backgroundColor: "#b70058ff" }}
              variant="contained"
              startIcon={<Add />}
            >
              {" "}
              Add
            </Button>
          </Toolbar>
        </AppBar>

        {/* Side Drawer */}
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          {/* Mobile Drawer */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": { width: drawerWidth },
            }}
          >
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
            open
          >
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
          }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    </AllContextProviders>
  );
}
