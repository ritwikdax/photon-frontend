import React, { useState } from "react";
import {
  Box,
  Typography,
  Chip,
  Stack,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
} from "@mui/material";
import {
  MoreVert,
  Edit,
  Delete,
  Payment,
  CloudUpload,
  Group,
  Image,
  Description,
  DriveFileMove,
  Assignment,
  MoreHoriz,
} from "@mui/icons-material";
import { Update as UpdateType } from "../interfaces/data/interface";
import { useDialog } from "../context/DialogContext";
import { useDeleteMutation } from "../mutations/useDeleteMutation";
import useUpdateMutation from "../mutations/useUpdateMutation";
import AddUpdateForm from "./forms/AddUpdateForm";

interface UpdateProps {
  update: UpdateType;
  onEdit?: (update: UpdateType) => void;
  onDelete?: (id: string) => void;
}

const UpdateTypeLabels: Record<UpdateType["updateType"]["type"], string> = {
  payment: "Payment",
  drive_backup: "Drive Backup",
  team_breafing: "Team Briefing",
  drive_uplaod: "Drive Upload",
  image_transfer: "Image Transfer",
  sheet_update: "Sheet Update",
  contract_signing: "Contract Signing",
  other: "Other",
};

const UpdateTypeIcons: Record<UpdateType["updateType"]["type"], React.ReactElement> = {
  payment: <Payment />,
  drive_backup: <CloudUpload />,
  team_breafing: <Group />,
  drive_uplaod: <DriveFileMove />,
  image_transfer: <Image />,
  sheet_update: <Description />,
  contract_signing: <Assignment />,
  other: <MoreHoriz />,
};

const StatusConfig = {
  incomplete: {
    label: "Incomplete",
    color: "default" as const,
  },
  not_started: {
    label: "Not Started",
    color: "default" as const,
  },
  in_progress: {
    label: "In Progress",
    color: "primary" as const,
  },
  completed: {
    label: "Completed",
    color: "success" as const,
  },
  on_hold: {
    label: "On Hold",
    color: "warning" as const,
  },
  cancelled: {
    label: "Cancelled",
    color: "error" as const,
  },
  unknown: {
    label: "Unknown",
    color: "default" as const,
  },
};

export default function Update({ update, onEdit, onDelete }: UpdateProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { openDialog, closeDialog } = useDialog();
  const deleteMutation = useDeleteMutation("updates");
  const updateMutation = useUpdateMutation("updates", `id=${update.id}`);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleMenuClose();
    openDialog(
      <AddUpdateForm
        update={update}
        onSubmit={async (data) => {
          await updateMutation.mutateAsync(data);
          closeDialog();
        }}
        onCancel={closeDialog}
        isLoading={updateMutation.isPending}
      />,
      { maxWidth: "md", fullWidth: true }
    );
    if (onEdit) {
      onEdit(update);
    }
  };

  const handleDelete = async () => {
    handleMenuClose();
    if (window.confirm(`Are you sure you want to delete "${update.title}"?`)) {
      await deleteMutation.mutateAsync(update.id);
      if (onDelete) {
        onDelete(update.id);
      }
    }
  };

  return (
    <Box
      sx={{
        border: "1px solid",
        borderRadius: 1,
        backgroundColor: "background.paper",
        borderColor: "divider",
      }}
    >
      <CardContent>
        {/* Update Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 2,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" component="h3" gutterBottom>
              {update.title}
            </Typography>
            
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 , mt: 3}}>
              <Chip
                icon={UpdateTypeIcons[update.updateType.type]}
                label={UpdateTypeLabels[update.updateType.type]}
                size="medium"
                variant="outlined"
                color="primary"
              />
              <Chip
                label={StatusConfig[update.updateType.status].label}
                size="medium"
                color={StatusConfig[update.updateType.status].color}
              />
            </Stack>
          </Box>

          {/* Context Menu */}
          <Box>
            <IconButton
              aria-label="more"
              aria-controls={open ? "update-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleMenuOpen}
            >
              <MoreVert />
            </IconButton>
            <Menu
              id="update-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleEdit}>
                <ListItemIcon>
                  <Edit fontSize="small" />
                </ListItemIcon>
                <ListItemText>Edit</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleDelete}>
                <ListItemIcon>
                  <Delete fontSize="small" color="error" />
                </ListItemIcon>
                <ListItemText>Delete</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        {/* Update Description */}
        {update.description && (
          <Box
            sx={{
              bgcolor: "grey.50",
              p: 2,
              borderRadius: 1,
              border: "1px solid",
              borderColor: "grey.200",
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ whiteSpace: "pre-wrap" }}
            >
              {update.description}
            </Typography>
          </Box>
        )}

        {/* Metadata Footer */}
        <Box
          sx={{
            mt: 2,
            pt: 2,
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <Stack direction="row" spacing={2}>
            <Typography variant="caption" color="text.secondary">
              Created: {new Date(update.createdAt).toLocaleDateString()}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Updated: {new Date(update.updatedAt).toLocaleDateString()}
            </Typography>
          </Stack>
        </Box>
      </CardContent>
    </Box>
  );
}
