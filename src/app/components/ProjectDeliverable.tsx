import React from "react";
import {
  Box,
  Typography,
  Chip,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import {
  AccessTime,
  CheckCircle,
  Pending,
  LocalShipping,
  CloudUpload,
  ExpandMore,
  Delete,
} from "@mui/icons-material";
import {
  Deliverable as DeliverablesType,
  ProjectDeliverable,
} from "../interfaces/data/interface";
import { useDeleteMutation } from "../mutations/useDeleteMutation";

interface DeliverableProps {
  deliverable: ProjectDeliverable;
}

const DeliverableTypeLabels: Record<DeliverablesType["type"], string> = {
  raw_photos: "Raw Photos",
  raw_videoes: "Raw Videos",
  album: "Album",
  pendrive: "Pendrive",
  hard_drive: "Hard Drive",
  teaser: "Teaser",
  reels: "Reels",
  edited_photos: "Edited Photos",
  full_video: "Full Video",
  other: "Other",
};

const StatusConfig = {
  not_started: {
    label: "Not Started",
    color: "default" as const,
    dotColor: "grey" as const,
  },
  in_progress: {
    label: "In Progress",
    color: "primary" as const,
    dotColor: "primary" as const,
  },
  done: {
    label: "Done",
    color: "success" as const,
    dotColor: "success" as const,
  },
};

export default function Deliverable({ deliverable }: DeliverableProps) {
  console.log("Rendering Deliverable:", deliverable);
  const deleteMutation = useDeleteMutation("projectDeliverables");

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${deliverable.displayName}"?`)) {
      deleteMutation.mutate(deliverable.id);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "white",
        p: 3,
        borderRadius: 1,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      {/* Deliverable Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 2,
        }}
      >
        <Box>
          <Typography variant="h6" component="h3" gutterBottom>
            {deliverable.displayName}
          </Typography>
          <Typography variant="body2" component="h3" gutterBottom>
            {deliverable.additionalDetails}
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center" sx={{marginTop: "24px"}}>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <AccessTime fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {deliverable.deliveryTime} days
              </Typography>
            </Stack>
            <Chip
              label={deliverable.assetType}
              size="medium"
              icon={
                deliverable.assetType === "digital" ? (
                  <CloudUpload />
                ) : (
                  <LocalShipping />
                )
              }
              variant="outlined"
            />
          </Stack>
        </Box>
        <Stack direction="row" spacing={1} alignItems="center">
          <Chip
            label={deliverable.isDelivered ? "Delivered" : "Pending"}
            color={deliverable.isDelivered ? "success" : "warning"}
            icon={deliverable.isDelivered ? <CheckCircle /> : <Pending />}
          />
          <IconButton
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            color="error"
            size="small"
            aria-label="delete deliverable"
          >
            <Delete />
          </IconButton>
        </Stack>
      </Box>

      {/* Timeline for Delivery Updates */}
      {deliverable.deliveryUpdates.length > 0 ? (
        <Box>
          <Accordion
            defaultExpanded={false}
            sx={{
              boxShadow: "none",
              "&:before": { display: "none" },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              sx={{
                minHeight: "48px",
                "&.Mui-expanded": {
                  minHeight: "48px",
                },
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                Delivery Timeline ({deliverable.deliveryUpdates.length})
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ pt: 0 }}>
              <Timeline
                sx={{
                  p: 0,
                  m: 0,
                  "& .MuiTimelineItem-root": {
                    minHeight: "auto",
                    "&:before": {
                      flex: 0,
                      padding: 0,
                    },
                  },
                  "& .MuiTimelineContent-root": {
                    py: 0.5,
                  },
                }}
              >
                {deliverable.deliveryUpdates.map((update, index) => (
                  <TimelineItem key={update.id}>
                    <TimelineSeparator>
                      <TimelineDot
                        color={StatusConfig[update.status].dotColor}
                        sx={{ my: 0.5 }}
                      />
                      {index < deliverable.deliveryUpdates.length - 1 && (
                        <TimelineConnector sx={{ minHeight: 20 }} />
                      )}
                    </TimelineSeparator>
                    <TimelineContent>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                        }}
                      >
                        <Typography variant="body1">{update.title}</Typography>
                        <Chip
                          label={StatusConfig[update.status].label}
                          size="small"
                          color={StatusConfig[update.status].color}
                        />
                      </Box>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </AccordionDetails>
          </Accordion>
        </Box>
      ) : (
        <Box
          sx={{
            textAlign: "center",
            py: 4,
            color: "text.disabled",
          }}
        >
          <Typography variant="body2">No delivery updates yet</Typography>
        </Box>
      )}
    </Box>
  );
}
