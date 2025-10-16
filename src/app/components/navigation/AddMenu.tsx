import React from "react";
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { ADD_MENU_ITEMS } from "./constants";

export default function AddMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const router = useRouter();

  const handleAddMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAddMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAddMenuItem = (path: string) => {
    handleAddMenuClose();
    router.push(path);
  };

  return (
    <>
      <Button
        sx={{ marginLeft: "20px", backgroundColor: "#b70058ff" }}
        variant="contained"
        startIcon={<Add />}
        onClick={handleAddMenuOpen}
      >
        Add
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleAddMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {ADD_MENU_ITEMS.map((item) => (
          <MenuItem key={item.path} onClick={() => handleAddMenuItem(item.path)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.text}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
