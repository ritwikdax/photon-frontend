"use client";
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  DialogTitle,
  DialogActions,
  Grid,
  Alert,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import WarningIcon from "@mui/icons-material/Warning";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Event as EventInterface } from "../interfaces/data/interface";
import TeamMember from "./TeamMember";
import { useDialog } from "../context/DialogContext";
import AddEventForm from "./forms/AddEventForm";
import { useDeleteMutation } from "../mutations/useDeleteMutation";
import CalendarEvent from "./CalendarEvent";

interface EventProps {
  event: EventInterface;
}

export const Event: React.FC<EventProps> = ({ event }) => {
  const {
    id,
    projectId,
    eventDate,
    eventStartTime,
    venue,
    assignment,
    team,
    status,
    photographerCount,
    videographerCount,
    droneOperatorCount,
    lightmanCount,
    helperCount,
  } = event;
  const { openDialog, closeDialog } = useDialog();
  const deleteMutation = useDeleteMutation("events");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  
  // Scroll into view if this event is in the URL hash
  const eventRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (hash === id && eventRef.current) {
        setTimeout(() => {
          eventRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300); // Small delay to ensure the page and tabs are rendered
      }
    }
  }, [id]);

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
          eventDate,
          eventStartTime,
          venue,
          assignment,
          photographerCount,
          videographerCount,
          droneOperatorCount,
          lightmanCount,
          helperCount,
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

  // Helper function to combine eventDate and eventStartTime into a Date object
  const getEventDateTime = () => {
    const date = new Date(eventDate);
    const [hours, minutes] = eventStartTime.split(':');
    date.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
    return date;
  };

  // For now, assume event duration of 4 hours (can be adjusted)
  const getEventEndDateTime = () => {
    const startDate = getEventDateTime();
    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + 4); // Add 4 hours
    return endDate;
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
      ref={eventRef}
      id={`event-${id}`}
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        width: "100%",
        position: "relative",
        mb: 2,
        scrollMarginTop: "20px", // Add some spacing when scrolled to
      }}
    >
      <CardContent
        sx={{ display: "flex", p: 2, "&:last-child": { pb: 2 } }}
      >
        <Box sx={{ display: "flex", width: "100%", gap: 3 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                lineHeight: 1.3,
              }}
            >
              {assignment}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <CalendarEvent
                startDateTime={getEventDateTime()}
                endDateTime={getEventEndDateTime()}
                venue={venue}
              />
            </Box>

            {/* Team Composition Counts */}
            {(photographerCount > 0 ||
              videographerCount > 0 ||
              droneOperatorCount > 0 ||
              lightmanCount > 0 ||
              helperCount > 0) && (
              <Box sx={{ mt: 2 }}>
                <Typography
                  variant="body2"
                  fontWeight="600"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  Team Composition
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {photographerCount > 0 && (
                    <Chip
                      label={`${photographerCount} Photographer${
                        photographerCount > 1 ? "s" : ""
                      }`}
                      size="small"
                      variant="outlined"
                    />
                  )}
                  {videographerCount > 0 && (
                    <Chip
                      label={`${videographerCount} Videographer${
                        videographerCount > 1 ? "s" : ""
                      }`}
                      size="small"
                      variant="outlined"
                    />
                  )}
                  {droneOperatorCount > 0 && (
                    <Chip
                      label={`${droneOperatorCount} Drone Operator${
                        droneOperatorCount > 1 ? "s" : ""
                      }`}
                      size="small"
                      variant="outlined"
                    />
                  )}
                  {lightmanCount > 0 && (
                    <Chip
                      label={`${lightmanCount} Lightm${
                        lightmanCount > 1 ? "en" : "an"
                      }`}
                      size="small"
                      variant="outlined"
                    />
                  )}
                  {helperCount > 0 && (
                    <Chip
                      label={`${helperCount} Helper${
                        helperCount > 1 ? "s" : ""
                      }`}
                      size="small"
                      variant="outlined"
                    />
                  )}
                </Box>
              </Box>
            )}

            <Box>
              <Box>
                {team?.length === 0 ? (
                  <Alert severity="warning" sx={{ mt: 2 }}>
                    No team has been assigned
                  </Alert>
                ) : (
                  <>
                    <Box sx={{ mt: 2 }}>
                      <Box
                        sx={{ display: "flex", flexDirection: "row", gap: 1.5 }}
                      >
                        <PeopleIcon color="action" fontSize="small" />
                        <Typography variant="body2" fontWeight="600">
                          Team ({team?.length})
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap", mt: 1.5 }}>
                      {team?.map((member, index) => {
                        const isLead =
                          member.isLead === "true" || member.isLead === "1";
                        return (
                          <React.Fragment key={index}>
                            <TeamMember
                              employeeId={member.employeeId}
                              isLead={isLead}
                            />
                            {index < team.length - 1 && (
                              <FiberManualRecordIcon 
                                sx={{ 
                                  fontSize: 8, 
                                  color: "primary"
                                }} 
                              />
                            )}
                          </React.Fragment>
                        );
                      })}
                    </Box>
                  </>
                )}
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              display: "flex",
              gap: 0.5,
              alignItems: "center",
            }}
          >
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
