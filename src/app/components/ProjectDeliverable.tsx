import React, { useState } from "react";
import {
  Box,
  Typography,
  Chip,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Menu,
  MenuItem,
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
import useUpdateMutation from "../mutations/useUpdateMutation";

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

type StatusType = "not_started" | "in_progress" | "done";

export default function Deliverable({ deliverable }: DeliverableProps) {
  const deleteMutation = useDeleteMutation("projectDeliverables");
  const [deliveryUpdates, setDeliveryUpdates] = useState(
    deliverable.deliveryUpdates
  );
  const [isDelivered, setIsDelivered] = useState(deliverable.isDelivered);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [deliveryStatusAnchorEl, setDeliveryStatusAnchorEl] =
    useState<null | HTMLElement>(null);
  const [selectedUpdateIndex, setSelectedUpdateIndex] = useState<number | null>(
    null
  );
  const updateMutation = useUpdateMutation(
    "projectDeliverables",
    `id=${deliverable.id}`
  );

  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete "${deliverable.displayName}"?`
      )
    ) {
      deleteMutation.mutate(deliverable.id);
    }
  };

  const handleChipClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    console.log("Chip clicked, index:", index);
    setAnchorEl(event.currentTarget);
    setSelectedUpdateIndex(index);
  };

  const handleMenuClose = () => {
    console.log("Menu closed");
    setAnchorEl(null);
    setSelectedUpdateIndex(null);
  };

  const handleStatusChange = (newStatus: StatusType) => {
    if (selectedUpdateIndex !== null) {
      const updatedDeliveryUpdates = deliveryUpdates.map((update, index) =>
        index === selectedUpdateIndex
          ? { ...update, status: newStatus, lastUpdatedOn: new Date() }
          : update
      );

      setDeliveryUpdates(updatedDeliveryUpdates);

      // Console log the payload
      console.log("Updated Delivery Updates Payload:", {
        projectDeliverableId: deliverable.id,
        deliveryUpdates: updatedDeliveryUpdates,
      });
      updateMutation.mutate({
        deliveryUpdates: updatedDeliveryUpdates,
      });
    }

    handleMenuClose();
  };

  const handleDeliveryStatusClick = (event: React.MouseEvent<HTMLElement>) => {
    setDeliveryStatusAnchorEl(event.currentTarget);
  };

  const handleDeliveryStatusMenuClose = () => {
    setDeliveryStatusAnchorEl(null);
  };

  const handleDeliveryStatusChange = (newIsDelivered: boolean) => {
    setIsDelivered(newIsDelivered);

    console.log("Updated Delivery Status Payload:", {
      projectDeliverableId: deliverable.id,
      isDelivered: newIsDelivered,
    });

    updateMutation.mutate({
      isDelivered: newIsDelivered,
    });

    handleDeliveryStatusMenuClose();
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
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ marginTop: "24px" }}
          >
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
            label={isDelivered ? "Delivered" : "Pending"}
            color={isDelivered ? "success" : "warning"}
            icon={isDelivered ? <CheckCircle /> : <Pending />}
            onClick={handleDeliveryStatusClick}
            sx={{ cursor: "pointer" }}
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
      {deliveryUpdates.length > 0 ? (
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
                Delivery Timeline ({deliveryUpdates.length})
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
                {deliveryUpdates.map((update, index) => (
                  <TimelineItem key={`${update.id}-${index}`}>
                    <TimelineSeparator>
                      <TimelineDot
                        color={StatusConfig[update.status].dotColor}
                        sx={{ my: 0.5 }}
                      />
                      {index < deliveryUpdates.length - 1 && (
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
                          clickable={update.status !== "done"}
                          label={StatusConfig[update.status].label}
                          size="small"
                          color={StatusConfig[update.status].color}
                          onClick={(e) => {
                            if (update.status !== "done") {
                              handleChipClick(e, index);
                            }
                          }}
                          sx={{ cursor: update.status === "done" ? "default" : "pointer" }}
                        />
                        {update.status === "not_started" ? null : (
                          <Typography variant="caption" color="text.secondary">
                            {new Date(update.lastUpdatedOn).toLocaleString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: true,
                              }
                            )}
                          </Typography>
                        )}
                      </Box>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </AccordionDetails>
          </Accordion>

          {/* Status Change Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem
              onClick={() => {
                console.log("Not Started MenuItem clicked");
                handleStatusChange("not_started");
              }}
            >
              <Chip
                label={StatusConfig.not_started.label}
                size="small"
                color={StatusConfig.not_started.color}
                sx={{ pointerEvents: "none" }}
              />
            </MenuItem>
            <MenuItem
              onClick={() => {
                console.log("In Progress MenuItem clicked");
                handleStatusChange("in_progress");
              }}
            >
              <Chip
                label={StatusConfig.in_progress.label}
                size="small"
                color={StatusConfig.in_progress.color}
                sx={{ pointerEvents: "none" }}
              />
            </MenuItem>
            <MenuItem
              onClick={() => {
                console.log("Done MenuItem clicked");
                handleStatusChange("done");
              }}
            >
              <Chip
                label={StatusConfig.done.label}
                size="small"
                color={StatusConfig.done.color}
                sx={{ pointerEvents: "none" }}
              />
            </MenuItem>
          </Menu>

          {/* Delivery Status Menu */}
          <Menu
            anchorEl={deliveryStatusAnchorEl}
            open={Boolean(deliveryStatusAnchorEl)}
            onClose={handleDeliveryStatusMenuClose}
          >
            <MenuItem onClick={() => handleDeliveryStatusChange(false)}>
              <Chip
                label="Pending"
                size="small"
                color="warning"
                icon={<Pending />}
                sx={{ pointerEvents: "none" }}
              />
            </MenuItem>
            <MenuItem onClick={() => handleDeliveryStatusChange(true)}>
              <Chip
                label="Delivered"
                size="small"
                color="success"
                icon={<CheckCircle />}
                sx={{ pointerEvents: "none" }}
              />
            </MenuItem>
          </Menu>
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
