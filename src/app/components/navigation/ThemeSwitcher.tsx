"use client";
import React, { useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
  Tooltip,
} from "@mui/material";
// import Brightness4Icon from "@mui/icons-material/Brightness4";
// import Brightness7Icon from "@mui/icons-material/Brightness7";
import PaletteIcon from "@mui/icons-material/Palette";
import CheckIcon from "@mui/icons-material/Check";
import { useThemeContext, ColorTheme } from "@/app/context/ThemeContext";

const colorThemeOptions: { value: ColorTheme; label: string; color: string }[] = [
  { value: "mini_dark", label: "Minimalist Dark", color: "#000000ff" },
  { value: "mini_light", label: "Minimalist Light", color: "#e0e0e0ff" },
  { value: "neon_dark", label: "Neon Dark", color: "#000000ff" },
  { value: "neon_light", label: "Neon Light", color: "#e0e0e0ff" },
  { value: "slack_dark", label: "Slack Dark", color: "#000000ff" },
  { value: "slack_light", label: "Slack Light", color: "#e0e0e0ff" },
  { value: "blue", label: "Blue Theme", color: "#1976d2ff" },
  { value: "apple_light", label: "Apple Light", color: "#e8e8e8ff" },
  { value: "apple_dark", label: "Apple Dark", color: "#1a1a1aff" },

];

export default function ThemeSwitcher() {
  const { mode, colorTheme, toggleMode, setColorTheme } = useThemeContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeChange = (theme: ColorTheme) => {
    setColorTheme(theme);
  };

  const handleModeToggle = () => {
    toggleMode();
  };

  return (
    <>
      <Tooltip title="Theme settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{
            color: "inherit",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          <PaletteIcon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            minWidth: 220,
            mt: 1,
          },
        }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "text.secondary" }}>
            Theme Settings
          </Typography>
        </Box>
        <Divider />
        
        {/* Dark/Light Mode Toggle
        <MenuItem onClick={handleModeToggle}>
          <ListItemIcon>
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </ListItemIcon>
          <ListItemText>
            {mode === "dark" ? "Light Mode" : "Dark Mode"}
          </ListItemText>
        </MenuItem> */}
        
        {/* <Divider /> */}
        
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="caption" sx={{ fontWeight: 600, color: "text.secondary" }}>
            Choose Theme
          </Typography>
        </Box>
        
        {/* Color Theme Options */}
        {colorThemeOptions.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => handleThemeChange(option.value)}
            selected={colorTheme === option.value}
          >
            <ListItemIcon>
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: option.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {colorTheme === option.value && (
                  <CheckIcon sx={{ fontSize: 16, color: "white" }} />
                )}
              </Box>
            </ListItemIcon>
            <ListItemText>{option.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
