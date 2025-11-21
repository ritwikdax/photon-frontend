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
  ListItemIcon,
  ListItemText,
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
  LocalShipping,
  CloudUpload,
  ExpandMore,
  MoreVert,
  Edit,
  Delete,
} from "@mui/icons-material";
import { Deliverable as DeliverablesType } from "../interfaces/data/interface";
import { useDialog } from "../context/DialogContext";
import { useDeleteMutation } from "../mutations/useDeleteMutation";
import AddDeliverableForm from "./forms/AddDeliverableForm";
import useUpdateMutation from "../mutations/useUpdateMutation";

interface DeliverableProps {
  deliverable: DeliverablesType;
  onEdit?: (deliverable: DeliverablesType) => void;
  onDelete?: (id: string) => void;
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

export default function Deliverable({ deliverable, onEdit, onDelete }: DeliverableProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { openDialog, closeDialog } = useDialog();
  const deleteMutation = useDeleteMutation("deliverables");
  const updateMutation = useUpdateMutation("deliverables", `id=${deliverable.id}`);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleMenuClose();
    openDialog(
      <AddDeliverableForm
        deliverable={deliverable}
        onSubmit={async (data) => {
          await updateMutation.mutateAsync(data);
          closeDialog();
        }}
        isLoading={updateMutation.isPending}
      />,
      { maxWidth: "md", fullWidth: true }
    );
    if (onEdit) {
      onEdit(deliverable);
    }
  };

  const handleDelete = async () => {
    handleMenuClose();
    if (window.confirm(`Are you sure you want to delete "${deliverable.displayName}"?`)) {
      await deleteMutation.mutateAsync(deliverable.id);
      if (onDelete) {
        onDelete(deliverable.id);
      }
    }
  };

  return (
    <Box
      sx={{
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
          <Stack direction="row" spacing={2} alignItems="center" sx={{marginTop: '24px'}}>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <AccessTime fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {deliverable.deliveryTime} days
              </Typography>
            </Stack>
            <p>{deliverable.assetType}</p>
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
        
        {/* Context Menu */}
        <Box>
          <IconButton
            aria-label="more"
            aria-controls={open ? 'deliverable-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleMenuOpen}
          >
            <MoreVert />
          </IconButton>
          <Menu
            id="deliverable-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
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

      {/* Timeline for Delivery Updates */}
      {deliverable.updateTemplates.length > 0 ? (
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
                Delivery Timeline ({deliverable.updateTemplates.length})
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
                {deliverable.updateTemplates.map((update, index) => (
                  <TimelineItem key={`index-${index}`}>
                    <TimelineSeparator>
                      <TimelineDot
                        color={StatusConfig[update.status].dotColor}
                        sx={{ my: 0.5 }}
                      />
                      {index < deliverable.updateTemplates.length - 1 && (
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
