import React from "react";
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogContent,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { ADD_MENU_ITEMS } from "./constants";
import AddProjectDeliverableForm from "../forms/AddProjectDeliverableForm";

export default function AddMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const router = useRouter();

  const handleAddMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAddMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleAddMenuItem = (item: typeof ADD_MENU_ITEMS[0]) => {
    handleAddMenuClose();
    
    // Check if this is the "Deliverable (Project Level)" item
    if (item.text === "Deliverable (Project Level)") {
      handleDialogOpen();
      return;
    }
    
    if (item.onClick) {
      item.onClick();
    } else if (item.path) {
      router.push(item.path);
    }
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
        {ADD_MENU_ITEMS.map((item, index) => (
          <MenuItem key={item.path || `menu-item-${index}`} onClick={() => handleAddMenuItem(item)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.text}</ListItemText>
          </MenuItem>
        ))}
      </Menu>

      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          <AddProjectDeliverableForm
            onCancel={handleDialogClose}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
