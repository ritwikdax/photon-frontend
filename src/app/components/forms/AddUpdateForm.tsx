"use client";

import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  Typography,
  Stack,
  Alert,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Update as UpdateType } from "@/app/interfaces/data/interface";
import { useProjectSelected } from "@/app/hooks/useProjectSelected";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

interface AddUpdateFormData {
  projectId: string;
  title: string;
  description: string;
  updateType: {
    type:
      | "payment"
      | "drive_backup"
      | "team_breafing"
      | "drive_uplaod"
      | "image_transfer"
      | "sheet_update"
      | "contract_signing"
      | "other";
    status:
      | "incomplete"
      | "not_started"
      | "in_progress"
      | "completed"
      | "on_hold"
      | "cancelled"
      | "unknown";
  };
}

interface AddUpdateFormProps {
  onSubmit: (data: AddUpdateFormData) => Promise<void>;
  onCancel?: () => void;
  update?: UpdateType;
  isLoading?: boolean;
}

const updateTypeOptions = [
  { value: "payment", label: "Payment" },
  { value: "drive_backup", label: "Drive Backup" },
  { value: "team_breafing", label: "Team Briefing" },
  { value: "drive_uplaod", label: "Drive Upload" },
  { value: "image_transfer", label: "Image Transfer" },
  { value: "sheet_update", label: "Sheet Update" },
  { value: "contract_signing", label: "Contract Signing" },
  { value: "other", label: "Other" },
] as const;

const updateTemplates: Record<string, { title: string; description: string }> = {
  payment: {
    title: "Payment Received/Processed",
    description: "Payment details:\n- Amount: [Amount]\n- Payment method: [Method]\n- Transaction ID: [ID]\n- Date: [Date]\n- Notes: [Additional notes]",
  },
  drive_backup: {
    title: "Drive Backup Completed",
    description: "Backup details:\n- Files backed up: [Number/Types]\n- Backup location: [Drive folder/path]\n- Size: [Total size]\n- Completion time: [Time]\n- Notes: [Additional notes]",
  },
  team_breafing: {
    title: "Team Briefing Conducted",
    description: "Briefing details:\n- Date: [Date]\n- Attendees: [Team members]\n- Topics discussed: [Topics]\n- Action items: [Items]\n- Next meeting: [Date/Time]",
  },
  drive_uplaod: {
    title: "Files Uploaded to Drive",
    description: "Upload details:\n- Files uploaded: [File names/types]\n- Upload location: [Drive folder/path]\n- Total size: [Size]\n- Purpose: [Purpose]\n- Access: [Permissions/sharing]",
  },
  image_transfer: {
    title: "Images Transferred",
    description: "Transfer details:\n- Number of images: [Count]\n- From: [Source]\n- To: [Destination]\n- Format: [Format]\n- Total size: [Size]\n- Notes: [Additional notes]",
  },
  sheet_update: {
    title: "Spreadsheet Updated",
    description: "Update details:\n- Sheet name: [Name]\n- Changes made: [Description]\n- Rows/columns affected: [Range]\n- Updated by: [Name]\n- Date: [Date]",
  },
  contract_signing: {
    title: "Contract Signed",
    description: "Contract details:\n- Contract type: [Type]\n- Parties involved: [Names]\n- Signing date: [Date]\n- Effective date: [Date]\n- Key terms: [Summary]\n- Document location: [Path/link]",
  },
  other: {
    title: "",
    description: "",
  },
};

const statusOptions = [
  { value: "incomplete", label: "Incomplete" },
  { value: "not_started", label: "Not Started" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "on_hold", label: "On Hold" },
  { value: "cancelled", label: "Cancelled" },
  { value: "unknown", label: "Unknown" },
] as const;

export default function AddUpdateForm({
  onSubmit,
  onCancel,
  update,
  isLoading = false,
}: AddUpdateFormProps) {
  const isEditMode = !!update;
  const { selectedProject } = useProjectSelected();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<AddUpdateFormData>({
    defaultValues: isEditMode && update
      ? {
          projectId: update.projectId,
          title: update.title,
          description: update.description,
          updateType: {
            type: update.updateType.type,
            status: update.updateType.status,
          },
        }
      : {
          projectId: selectedProject?.id || "",
          title: "",
          description: "",
          updateType: {
            type: "other",
            status: "not_started",
          },
        },
  });

  const selectedUpdateType = watch("updateType.type");

  // Apply template when update type changes (only in add mode)
  useEffect(() => {
    if (!isEditMode && selectedUpdateType) {
      const template = updateTemplates[selectedUpdateType];
      if (template && template.title) {
        setValue("title", template.title);
        setValue("description", template.description);
      }
    }
  }, [selectedUpdateType, isEditMode, setValue]);

  const applyTemplate = () => {
    if (selectedUpdateType) {
      const template = updateTemplates[selectedUpdateType];
      if (template && template.title) {
        setValue("title", template.title);
        setValue("description", template.description);
      }
    }
  };

  const handleFormSubmit = async (data: AddUpdateFormData) => {
    try {
      const projectIdToUse = isEditMode ? update?.projectId : selectedProject?.id;
      
      if (!projectIdToUse) {
        console.error("No project selected");
        return;
      }

      const submitData = {
        ...data,
        projectId: projectIdToUse,
      };

      await onSubmit(submitData);
      if (!isEditMode) {
        reset();
      }
    } catch (error) {
      console.error("Error submitting update:", error);
    }
  };

  const currentProject = isEditMode
    ? { id: update?.projectId, name: "Current Project" }
    : selectedProject;

  if (!currentProject && !isEditMode) {
    return (
      <Box p={3}>
        <Alert severity="error">
          <strong>No project selected!</strong> Please select a project first to
          add an update.
        </Alert>
      </Box>
    );
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
      sx={{ p: 3, minWidth: 600 }}
    >
      <Typography variant="h6" component="h2" gutterBottom>
        {isEditMode ? "Edit Update" : "Add New Update"}
      </Typography>

      {!isEditMode && currentProject && (
        <Alert severity="info" sx={{ mb: 3 }}>
          Adding update to:{" "}
          <strong>{currentProject.name || currentProject.id}</strong>
        </Alert>
      )}

      {!isEditMode && selectedUpdateType && updateTemplates[selectedUpdateType]?.title && (
        <Alert severity="success" sx={{ mb: 2 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="body2">
              Template auto-applied for <strong>{updateTypeOptions.find(opt => opt.value === selectedUpdateType)?.label}</strong>
            </Typography>
            <Tooltip title="Reapply template">
              <IconButton size="small" onClick={applyTemplate} sx={{ ml: 1 }}>
                <AutoFixHighIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Alert>
      )}

      <Stack spacing={3} sx={{ mt: 3 }}>
        {/* Title */}
        <Controller
          name="title"
          control={control}
          rules={{
            required: "Title is required",
            minLength: {
              value: 3,
              message: "Title must be at least 3 characters",
            },
            maxLength: {
              value: 100,
              message: "Title must not exceed 100 characters",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Title"
              fullWidth
              error={!!errors.title}
              helperText={errors.title?.message}
              placeholder="Enter update title"
            />
          )}
        />

        {/* Description */}
        <Controller
          name="description"
          control={control}
          rules={{
            required: "Description is required",
            minLength: {
              value: 10,
              message: "Description must be at least 10 characters",
            },
            maxLength: {
              value: 1000,
              message: "Description must not exceed 1000 characters",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Description"
              fullWidth
              multiline
              rows={4}
              error={!!errors.description}
              helperText={errors.description?.message}
              placeholder="Provide detailed description of the update"
            />
          )}
        />

        {/* Update Type */}
        <Controller
          name="updateType.type"
          control={control}
          rules={{ required: "Update type is required" }}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.updateType?.type}>
              <InputLabel>Update Type</InputLabel>
              <Select {...field} label="Update Type">
                {updateTypeOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              {errors.updateType?.type && (
                <FormHelperText>
                  {errors.updateType.type.message}
                </FormHelperText>
              )}
            </FormControl>
          )}
        />

        {/* Status */}
        <Controller
          name="updateType.status"
          control={control}
          rules={{ required: "Status is required" }}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.updateType?.status}>
              <InputLabel>Status</InputLabel>
              <Select {...field} label="Status">
                {statusOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              {errors.updateType?.status && (
                <FormHelperText>
                  {errors.updateType.status.message}
                </FormHelperText>
              )}
            </FormControl>
          )}
        />

        <Divider />

        {/* Action Buttons */}
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          {onCancel && (
            <Button
              variant="outlined"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
          >
            {isLoading
              ? isEditMode
                ? "Updating..."
                : "Adding..."
              : isEditMode
              ? "Update"
              : "Add Update"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
