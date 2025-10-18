import React from "react";
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  MenuList,
  ListSubheader,
  Divider,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { ROOT_LEVEL_ADD_ITEMS, PROJECT_LEVEL_ADD_ITEMS } from "./constants";
import AddProjectDeliverableForm from "../forms/AddProjectDeliverableForm";
import AddEventForm from "../forms/AddEventForm";
import { useDialog } from "@/app/context/DialogContext";

export default function AddMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const router = useRouter();
  const { openDialog, closeDialog } = useDialog();

  const handleAddMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAddMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAddMenuItem = (item: typeof ROOT_LEVEL_ADD_ITEMS[0]) => {
    handleAddMenuClose();
    
    // Check if this is the "Deliverable (Project Level)" item
    if (item.text === "Project Deliverable") {
      openDialog(<AddProjectDeliverableForm onCancel={closeDialog} />);
      return;
    }
    
    // Check if this is the "Event" item (Project Level)
    if (item.text === "Project Event") {
      openDialog(<AddEventForm onCancel={closeDialog} />);
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
        slotProps={{
          paper: {
            sx: {
              minWidth: 280,
            },
          },
        }}
      >
        <MenuList>
          <ListSubheader>Root Level</ListSubheader>
          {ROOT_LEVEL_ADD_ITEMS.map((item, index) => (
            <MenuItem key={item.path || `root-item-${index}`} onClick={() => handleAddMenuItem(item)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>{item.text}</ListItemText>
            </MenuItem>
          ))}
          
          <Divider sx={{ my: 1 }} />
          
          <ListSubheader>Project Level</ListSubheader>
          {PROJECT_LEVEL_ADD_ITEMS.map((item, index) => (
            <MenuItem key={item.path || `project-item-${index}`} onClick={() => handleAddMenuItem(item)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>{item.text}</ListItemText>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  );
}
