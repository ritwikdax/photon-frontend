"use client";
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Avatar,
  Box,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import AddMenu from "./AddMenu";
import AutoCompleteDropdown from "../forms/Autocomplete";
import { useSession, signOut } from "next-auth/react";
import { useMerchantDetails } from "@/app/queries/useMerchantDetails";

interface AppHeaderProps {
  onMenuClick: () => void;
}

export default function AppHeader({ onMenuClick }: AppHeaderProps) {
  const { data: session } = useSession();
  const {data: merchant} = useMerchantDetails();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/signin" });
  };

  // Extract first name from full name
  const getFirstName = (fullName: string | null | undefined) => {
    if (!fullName) return "";
    return fullName.split(" ")[0];
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "#001c3dff",
        boxShadow: "none",
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
            onClick={onMenuClick}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          {merchant?.merchantDetails?.logo ? (
            <Box
              component="img"
              src={merchant.merchantDetails.logo}
              alt={merchant.merchantDetails.businessName || "Logo"}
              sx={{
                height: 40,
                maxWidth: 150,
                objectFit: "contain",
              }}
            />
          ) : (
            <Typography variant="h6" noWrap component="div">
              {merchant?.merchantDetails?.businessName || "Photon"}
            </Typography>
          )}
        </div>
        <AutoCompleteDropdown />
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <AddMenu />
          {session?.user && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Avatar
                src={session.user.image || undefined}
                alt={session.user.name || "User"}
                sx={{ 
                  width: 36, 
                  height: 36,
                  border: "2px solid rgba(255, 255, 255, 0.2)",
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: "white",
                  fontWeight: 500,
                  display: { xs: "none", sm: "block" },
                }}
              >
                {getFirstName(session.user.name)}
              </Typography>
              <Tooltip title="Sign out">
                <IconButton
                  color="inherit"
                  onClick={handleSignOut}
                  size="small"
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  <LogoutIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
