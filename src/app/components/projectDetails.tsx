import React from "react";
import { Box, Typography, Chip, Stack, IconButton } from "@mui/material";
import {
  Phone,
  PhoneAndroid,
  Email,
  Label,
  CalendarToday,
  Link as LinkIcon,
  Chat,
  Info,
  Edit,
} from "@mui/icons-material";

// Remove MUI Tabs imports, import ProjectTabsCard instead
import EditableTypography from "./EditableTypography";
import useUpdateMutation from "../mutations/useUpdateMutation";
import { Project } from "../interfaces/data/interface";

interface ProjectDetailsProps {
  project: Project;
  onEdit?: () => void;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project, onEdit }) => {
  // const {
  //   phone="123456780",
  //   alternatePhone,
  //   email,
  //   bookingCategory,
  //   dateOfBooking,
  //   leadSource,
  //   discussionSummary,
  //   details,
  //   status,
  // } = project;
  const updateMutation = useUpdateMutation("projects", `id=${project?.id}`);
  const statusColor =
    project?.status === "open" ? "success" : project?.status === "close" ? "error" : "default";
  const statusLabel =
    project?.status === "open" ? "Open" : project?.status === "close" ? "Closed" : "Unknown";

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
        <Chip
          label={statusLabel}
          color={statusColor}
          sx={{
            position: "absolute",
            top: 18,
            right: 18,
            fontWeight: 600,
            letterSpacing: 0.5,
            textTransform: "uppercase",
          }}
        />
      )}

      <Stack spacing={1}>
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
                onSave={() => {}}
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
              onSave={() => {}}
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
                value={project?.bookingCategory}
                onSave={() => {}}
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
              <EditableTypography
                value={new Date(project?.dateOfBooking?? new Date()).toLocaleDateString()}
                onSave={() => {}}
                variant="body1"
                color="text.primary"
                component="span"
                sx={{ display: "inline" }}
              />
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
                value={project?.leadSource}
                onSave={() => {}}
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
                onSave={() => {}}
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
              onSave={() => {}}
              variant="body2"
              color="text.secondary"
              component="span"
              sx={{ display: "inline" }}
            />
          </Stack>
        )}
      </Stack>

      {/* Edit Button */}
      <Box
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
        }}
      >
        <IconButton onClick={onEdit} color="primary">
          <Edit />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ProjectDetails;
