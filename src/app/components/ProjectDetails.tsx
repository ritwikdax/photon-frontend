import React, { useState } from "react";
import {
  Box,
  Typography,
  Chip,
  Stack,
  Popover,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Phone,
  PhoneAndroid,
  Email,
  Label,
  CalendarToday,
  Link as LinkIcon,
  Chat,
  Info,
  CheckCircle,
  OpenWith,
  ForkLeft,
  Lightbulb,
  Check,
  Person,
  CancelOutlined,
} from "@mui/icons-material";

// Remove MUI Tabs imports, import ProjectTabsCard instead
import EditableTypography from "./EditableTypography";
import useUpdateMutation from "../mutations/useUpdateMutation";
import { Client, Project } from "../interfaces/data/interface";
import useGenericQueries from "../queries/useGenericQueries";
import { BOOKING_CATEGORY_LABELS, LEAD_SOURCE_LABELS } from "../constants/projectOptions";

interface ProjectDetailsProps {
  project: Project;
  onEdit?: () => void;
}

const PROJECT_STATUS_COLORS = {
  open: "success",
  close: "error",
  reopen: "warning",
  withdrawn: "default",
  on_hold: "default",
  unknown: "default",
} as const;

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project, onEdit }) => {
  const updateMutation = useUpdateMutation("projects", `id=${project?.id}`);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { data: client } = useGenericQueries<Client[]>(
    "clients",
    `id=${project?.clientId}`
  );

  const statusColor =
    PROJECT_STATUS_COLORS[project?.status || "unknown"] || "default";

  const statusLabel = project?.status
    ? project.status.replace("_", " ").toUpperCase()
    : "UNKNOWN";

  const handleStatusClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleStatusClose = () => {
    setAnchorEl(null);
  };

  const handleStatusChange = (newStatus: string) => {
    updateMutation.mutate({ status: newStatus });
    handleStatusClose();
  };

  const open = Boolean(anchorEl);

  return (
    <Box
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: 1,
        p: 3,
        bgcolor: "background.paper",
        position: "relative",
        m: "1rem auto",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {project?.status && (
        <>
          <Chip
            label={statusLabel}
            color={statusColor}
            onClick={handleStatusClick}
            sx={{
              position: "absolute",
              top: 18,
              right: 18,
              fontWeight: 600,
              letterSpacing: 0.5,
              textTransform: "uppercase",
              cursor: "pointer",
              "&:hover": {
                opacity: 0.8,
              },
            }}
          />
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleStatusClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={() => handleStatusChange("open")}>
              <ListItemIcon>
                <Check fontSize="small" color="success" />
              </ListItemIcon>
              <ListItemText>Open</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => handleStatusChange("close")}>
              <ListItemIcon>
                <CancelOutlined fontSize="small" color="error" />
              </ListItemIcon>
              <ListItemText>Closed</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => handleStatusChange("reopen")}>
              <ListItemIcon>
                <OpenWith fontSize="small" color="warning" />
              </ListItemIcon>
              <ListItemText>Re Open</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => handleStatusChange("withdrawn")}>
              <ListItemIcon>
                <ForkLeft fontSize="small" color="info" />
              </ListItemIcon>
              <ListItemText>Withdrawn</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => handleStatusChange("on_hold")}>
              <ListItemIcon>
                <Lightbulb fontSize="small" color="warning" />
              </ListItemIcon>
              <ListItemText>On Hold</ListItemText>
            </MenuItem>
          </Popover>
        </>
      )}

      <Stack spacing={1}>
        {project?.clientId && (
          <Stack direction="row" spacing={1} alignItems="center">
            <Person sx={{ color: "text.secondary" }} />
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Typography variant="body1" color="text.primary" component="span">
                <strong>Client Name:</strong>
              </Typography>
              <Typography
                variant="body1"
                color="text.primary"
                component="span"
                sx={{ display: "inline" }}
              >
                {client && client.length > 0 ? client[0].name : "N/A"}
              </Typography>
            </Box>
          </Stack>
        )}
        <Stack direction="row" spacing={1} alignItems="center">
          <Phone sx={{ color: "text.secondary" }} />
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Typography variant="body1" color="text.primary" component="span">
              <strong>Phone:</strong>
            </Typography>
            <EditableTypography
              value={project?.phone}
              onSave={(val) => {
                updateMutation.mutate({ phone: val });
              }}
              variant="body1"
              color="text.primary"
              component="span"
              sx={{ display: "inline" }}
            />
          </Box>
        </Stack>

        {project?.alternatePhone && (
          <Stack direction="row" spacing={1} alignItems="center">
            <PhoneAndroid sx={{ color: "text.secondary" }} />
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Typography variant="body1" color="text.primary" component="span">
                <strong>Alternate Phone:</strong>
              </Typography>
              <EditableTypography
                value={project?.alternatePhone}
                onSave={(val) => {
                  updateMutation.mutate({ alternatePhone: val });
                }}
                variant="body1"
                color="text.primary"
                component="span"
                sx={{ display: "inline" }}
              />
            </Box>
          </Stack>
        )}

        <Stack direction="row" spacing={1} alignItems="center">
          <Email sx={{ color: "text.secondary" }} />
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Typography variant="body1" color="text.primary" component="span">
              <strong>Email:</strong>
            </Typography>
            <EditableTypography
              value={project?.email}
              onSave={(val) => {
                updateMutation.mutate({ email: val });
              }}
              variant="body1"
              color="text.primary"
              component="span"
              sx={{ display: "inline" }}
            />
          </Box>
        </Stack>

        {project?.bookingCategory && (
          <Stack direction="row" spacing={1} alignItems="center">
            <Label sx={{ color: "text.secondary" }} />
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Typography variant="body1" color="text.primary" component="span">
                <strong>Booking Category:</strong>
              </Typography>
              <EditableTypography
                value={BOOKING_CATEGORY_LABELS[project?.bookingCategory]}
                onSave={(val) => {
                  updateMutation.mutate({ bookingCategory: val });
                }}
                variant="body1"
                color="text.primary"
                component="span"
                sx={{ display: "inline" }}
              />
            </Box>
          </Stack>
        )}

        {project?.dateOfBooking && (
          <Stack direction="row" spacing={1} alignItems="center">
            <CalendarToday sx={{ color: "text.secondary" }} />
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Typography variant="body1" color="text.primary" component="span">
                <strong>Date of Booking:</strong>
              </Typography>
              <Typography
                variant="body1"
                color="text.primary"
                component="span"
                sx={{ display: "inline" }}
              >
                {new Date(
                  project?.dateOfBooking ?? new Date()
                ).toLocaleDateString()}
              </Typography>
            </Box>
          </Stack>
        )}

        {project?.leadSource && (
          <Stack direction="row" spacing={1} alignItems="center">
            <LinkIcon sx={{ color: "text.secondary" }} />
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Typography variant="body1" color="text.primary" component="span">
                <strong>Lead Source:</strong>
              </Typography>
              <EditableTypography
                value={LEAD_SOURCE_LABELS[project?.leadSource]}
                onSave={(val) => {
                  updateMutation.mutate({ leadSource: val });
                }}
                variant="body1"
                color="text.primary"
                component="span"
                sx={{ display: "inline" }}
              />
            </Box>
          </Stack>
        )}

        {project?.discussionSummary && (
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
            <Chat sx={{ color: "primary.main" }} />
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Typography
                variant="body1"
                color="primary.main"
                component="span"
                sx={{ fontStyle: "italic" }}
              >
                <strong>Discussion Summary:</strong>
              </Typography>
              <EditableTypography
                value={project?.discussionSummary}
                onSave={(val) => {
                  updateMutation.mutate({ discussionSummary: val });
                }}
                variant="body1"
                color="primary.main"
                component="span"
                sx={{ display: "inline", fontStyle: "italic" }}
              />
            </Box>
          </Stack>
        )}

        {project?.details && (
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ mt: 1.5 }}
          >
            <Info sx={{ color: "text.secondary" }} />
            <EditableTypography
              value={project?.details}
              onSave={(val) => {
                updateMutation.mutate({ details: val });
              }}
              variant="body2"
              color="text.secondary"
              component="span"
              sx={{ display: "inline" }}
            />
          </Stack>
        )}
      </Stack>
    </Box>
  );
};

export default ProjectDetails;
