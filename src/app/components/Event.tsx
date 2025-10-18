"use client";
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Stack,
  Button,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PeopleIcon from "@mui/icons-material/People";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import WarningIcon from "@mui/icons-material/Warning";
import { Event as EventInterface } from "../interfaces/data/interface";
import TeamMember from "./TeamMember";
import { useDialog } from "../context/DialogContext";
import AddEventForm from "./forms/AddEventForm";
import { useDeleteMutation } from "../mutations/useDeleteMutation";

interface EventProps extends Omit<EventInterface, 'createdAt' | 'updatedAt'> {
  employees?: Map<string, { name: string }>;
}

export const Event: React.FC<EventProps> = ({
  id,
  projectId,
  startDateTime,
  endDateTime,
  venue,
  assignment,
  team,
  status,
  employees,
}) => {
  const { openDialog, closeDialog } = useDialog();
  const deleteMutation = useDeleteMutation("events");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleMenuClose();
    openDialog(
      <AddEventForm
        mode="edit"
        eventId={id}
        initialData={{
          projectId,
          startDateTime,
          endDateTime,
          venue,
          assignment,
          team,
          status,
        }}
        onCancel={closeDialog}
      />,
      { maxWidth: "md", fullWidth: true }
    );
  };

  const handleDelete = () => {
    handleMenuClose();
    
    const confirmDelete = () => {
      deleteMutation.mutate(id);
      closeDialog();
    };

    openDialog(
      <>
        <DialogTitle sx={{ pb: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <WarningIcon color="warning" />
            <Typography variant="h6">Delete Event</Typography>
          </Box>
        </DialogTitle>
        <Box sx={{ px: 3, pb: 1 }}>
          <Typography variant="body1" gutterBottom>
            Are you sure you want to delete this event?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This action cannot be undone.
          </Typography>
        </Box>
        <DialogActions sx={{ px: 3, pb: 2, pt: 1 }}>
          <Button onClick={closeDialog} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={confirmDelete}
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </DialogActions>
      </>,
      { maxWidth: "xs", fullWidth: true }
    );
  };

  // Parse date to display in calendar format
  const parseDate = (date: Date) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleDateString("en-US", { month: "short" });
    const year = dateObj.getFullYear();
    return { day, month, year };
  };

  // Format time to display (e.g., "10:00 AM")
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "info";
      case "in_progress":
        return "warning";
      case "done":
        return "success";
      case "cancelled":
        return "error";
      case "postponed":
        return "default";
      default:
        return "default";
    }
  };

  // Get status label
  const getStatusLabel = (status: string) => {
    return status?.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const { day, month, year } = parseDate(startDateTime);
  const startTime = formatTime(startDateTime);
  const endTime = formatTime(endDateTime);

  // Format full date string
  const formatFullDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        width: "100%",
        position: "relative",
        marginTop: "8px",
        //display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ flex: 1, display: "flex", p: 2, "&:last-child": { pb: 2 } }}>
        <Box sx={{ display: "flex", width: "100%", gap: 3 }}>
          {/* Left Section - Date Display */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "primary.main",
              color: "white",
              borderRadius: 2,
              p: 2,
              minWidth: "120px",
              //height: "100%",
            }}
          >
            <Typography variant="caption" sx={{ fontSize: "0.75rem", opacity: 0.9 }}>
              {month.toUpperCase()}
            </Typography>
            <Typography variant="h2" fontWeight="bold" sx={{ lineHeight: 1, my: 0.5 }}>
              {day}
            </Typography>
            <Typography variant="caption" sx={{ fontSize: "0.75rem", opacity: 0.9 }}>
              {year}
            </Typography>
          </Box>

          {/* Middle Section - Event Details */}
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1.5, minWidth: 0 }}>
            {/* Date and Time */}
            <Box>
              <Typography variant="h6" fontWeight="600" gutterBottom>
                {assignment}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                <AccessTimeIcon color="action" fontSize="small" />
                <Typography variant="body2" color="text.secondary">
                  {formatFullDate(startDateTime)}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: 4 }}>
                <Typography variant="body2" fontWeight="500">
                  {startTime} - {endTime}
                </Typography>
              </Box>
            </Box>

            {/* Venue */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <LocationOnIcon color="secondary" fontSize="small" />
              <Typography variant="body2" color="text.secondary" noWrap>
                {venue}
              </Typography>
            </Box>
          </Box>

          {/* Right Section - Team Members */}
          <Box sx={{ minWidth: "300px", maxWidth: "400px", display: "flex", flexDirection: "column" }}>
            {team?.length === 0 ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  p: 2,
                  bgcolor: "warning.lighter",
                  borderRadius: 1,
                  border: "1px solid",
                  borderColor: "warning.light",
                  mt: 5,
                }}
              >
                <WarningIcon color="warning" fontSize="small" />
                <Typography variant="body2" color="warning.dark">
                  No team has been assigned
                </Typography>
              </Box>
            ) : (
              <>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <PeopleIcon color="action" fontSize="small" />
                  <Typography variant="body2" fontWeight="600">
                    Team ({team?.length})
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                  {team?.map((member, index) => {
                    const isLead = member.isLead === "true" || member.isLead === "1";
                    return (
                      <Box key={index} sx={{ flex: "1 1 auto", minWidth: "140px" }}>
                        <TeamMember
                          employeeId={member.employeeId}
                          isLead={isLead}
                        />
                      </Box>
                    );
                  })}
                  {/* {team?.length > 2 && (
                    <Chip
                      label={`+${team.length - 2} more`}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: "0.75rem", height: "28px", alignSelf: "center" }}
                    />
                  )} */}
                </Box>
              </>
            )}
          </Box>

          {/* Status Badge and Menu Button */}
          <Box sx={{ position: "absolute", top: 12, right: 12, display: "flex", gap: 0.5, alignItems: "center" }}>
            <Chip
              label={getStatusLabel(status)}
              color={getStatusColor(status)}
              size="small"
              sx={{ fontSize: "0.7rem", height: "24px" }}
            />
            <IconButton
              size="small"
              onClick={handleMenuOpen}
              sx={{
                bgcolor: "background.paper",
                "&:hover": { bgcolor: "action.hover" },
              }}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Context Menu */}
          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleEdit}>
              <ListItemIcon>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Edit</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
              <ListItemIcon>
                <DeleteIcon fontSize="small" color="error" />
              </ListItemIcon>
              <ListItemText>Delete</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Event;
