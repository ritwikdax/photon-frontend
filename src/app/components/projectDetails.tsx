import React from "react";
import { Box, Typography, Chip, Stack } from "@mui/material";
import {
  Phone,
  PhoneAndroid,
  Email,
  Label,
  CalendarToday,
  Link as LinkIcon,
  Chat,
  Info,
} from "@mui/icons-material";

// Remove MUI Tabs imports, import ProjectTabsCard instead
import EditableTypography from "./EditableTypography";

interface ProjectDetailsProps {
  name: string;
  phone: string;
  alternatePhone?: string;
  email: string;
  bookingCategory?: string;
  dateOfBooking?: string;
  leadSource?: string;
  discussionSummary?: string;
  details?: string;
  status?: "open" | "close";
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  name,
  phone,
  alternatePhone,
  email,
  bookingCategory,
  dateOfBooking,
  leadSource,
  discussionSummary,
  details,
  status,
}) => {
  const statusColor =
    status === "open" ? "success" : status === "close" ? "error" : "default";
  const statusLabel =
    status === "open" ? "Open" : status === "close" ? "Closed" : "Unknown";

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
      }}>
      {status && (
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
              value={phone}
              onSave={() => {}}
              variant="body1"
              color="text.primary"
              component="span"
              sx={{ display: "inline" }}
            />
          </Box>
        </Stack>

        {alternatePhone && (
          <Stack direction="row" spacing={1} alignItems="center">
            <PhoneAndroid sx={{ color: "text.secondary" }} />
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Typography variant="body1" color="text.primary" component="span">
                <strong>Alternate Phone:</strong>
              </Typography>
              <EditableTypography
                value={alternatePhone}
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
              value={email}
              onSave={() => {}}
              variant="body1"
              color="text.primary"
              component="span"
              sx={{ display: "inline" }}
            />
          </Box>
        </Stack>

        {bookingCategory && (
          <Stack direction="row" spacing={1} alignItems="center">
            <Label sx={{ color: "text.secondary" }} />
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Typography variant="body1" color="text.primary" component="span">
                <strong>Booking Category:</strong>
              </Typography>
              <EditableTypography
                value={bookingCategory}
                onSave={() => {}}
                variant="body1"
                color="text.primary"
                component="span"
                sx={{ display: "inline" }}
              />
            </Box>
          </Stack>
        )}

        {dateOfBooking && (
          <Stack direction="row" spacing={1} alignItems="center">
            <CalendarToday sx={{ color: "text.secondary" }} />
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Typography variant="body1" color="text.primary" component="span">
                <strong>Date of Booking:</strong>
              </Typography>
              <EditableTypography
                value={dateOfBooking}
                onSave={() => {}}
                variant="body1"
                color="text.primary"
                component="span"
                sx={{ display: "inline" }}
              />
            </Box>
          </Stack>
        )}

        {leadSource && (
          <Stack direction="row" spacing={1} alignItems="center">
            <LinkIcon sx={{ color: "text.secondary" }} />
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Typography variant="body1" color="text.primary" component="span">
                <strong>Lead Source:</strong>
              </Typography>
              <EditableTypography
                value={leadSource}
                onSave={() => {}}
                variant="body1"
                color="text.primary"
                component="span"
                sx={{ display: "inline" }}
              />
            </Box>
          </Stack>
        )}

        {discussionSummary && (
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
            <Chat sx={{ color: "primary.main" }} />
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Typography
                variant="body1"
                color="primary.main"
                component="span"
                sx={{ fontStyle: "italic" }}>
                <strong>Discussion Summary:</strong>
              </Typography>
              <EditableTypography
                value={discussionSummary}
                onSave={() => {}}
                variant="body1"
                color="primary.main"
                component="span"
                sx={{ display: "inline", fontStyle: "italic" }}
              />
            </Box>
          </Stack>
        )}

        {details && (
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1.5 }}>
            <Info sx={{ color: "text.secondary" }} />
            <EditableTypography
              value={details}
              onSave={() => {}}
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



