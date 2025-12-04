import {
  Box,
  Typography,
  Chip,
  Stack,
  IconButton,
  TextField,
  Switch,
  Slider,
  Button,
  FormControlLabel,
  FormControl,
  Alert,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { ImageSelectionEntry } from "../interfaces/data/interface";
import useAddMuttion from "../mutations/useAddMutataion";
import useUpdateMutation from "../mutations/useUpdateMutation";
import { useProjectSelected } from "../hooks/useProjectSelected";
import useSelectedImages from "../queries/useSelectedImages";
import { downloadImageList } from "../utils/utils";
import SelectedImagesSummary from "./SelectedImagesSummary";

interface ImageSelectionProps {
  imageSelection?: ImageSelectionEntry;
}

interface FormData {
  folderIds: Array<{ value: string }>;
  isSelectionAllowed: boolean;
  maxSelectionCount: number;
}

export default function ImageSelection({
  imageSelection,
}: ImageSelectionProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showWarning, setShowWarning] = useState(true);
  const createMutation = useAddMuttion("imageSelections");
  const updateMutation = useUpdateMutation(
    "imageSelections",
    `projectId=${imageSelection?.projectId}`
  );
  const { selectedProject } = useProjectSelected();
  const { data: selectedImages } = useSelectedImages(
    imageSelection?.projectId || ""
  );

  const { control, handleSubmit, reset, watch } = useForm<FormData>({
    defaultValues: {
      folderIds: imageSelection?.folderIds.map((id) => ({ value: id })) || [],
      isSelectionAllowed: imageSelection?.isSelectionAllowed || false,
      maxSelectionCount: imageSelection?.maxSelectionCount || 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "folderIds",
  });

  const watchedMaxCount = watch("maxSelectionCount");

  const onSubmit = (data: FormData) => {
    const formattedData = {
      projectId: selectedProject?.id || "",
      folderIds: data.folderIds.map((item) => item.value),
      isSelectionAllowed: data.isSelectionAllowed,
      maxSelectionCount: data.maxSelectionCount,
    };

    if (!imageSelection) {
      createMutation.mutate(formattedData);
    } else {
      updateMutation.mutate({ id: imageSelection.id, ...formattedData });
    }
    console.log("Form Data:", formattedData);
    setIsEditMode(false);
  };

  const handleEdit = () => {
    setIsEditMode(true);
    setShowWarning(true); // Reset warning visibility when entering edit mode

    // If no imageSelection data exists, ensure we have at least one folder field
    if (!imageSelection && fields.length === 0) {
      append({ value: "" });
    }
  };

  const handleCancel = () => {
    reset();
    setIsEditMode(false);
  };

  const addFolderId = () => {
    append({ value: "" });
  };

  const handleDownloadImageList = () => {
    downloadImageList(selectedImages || [], selectedProject?.name);
  };

  if (!imageSelection && !isEditMode) {
    return (
      <Box
        sx={{
          border: "1px solid",
          borderRadius: 1,
          backgroundColor: "background.paper",
          borderColor: "divider",
          p: 2,
        }}>
        <Stack spacing={2} alignItems="center">
          <Typography variant="body2" color="text.secondary">
            No image selection data available
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleEdit}
            size="small">
            Add
          </Button>
        </Stack>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        border: "1px solid",
        borderRadius: 1,
        backgroundColor: "background.paper",
        borderColor: "divider",
        p: 2,
      }}>
      {/* Warning Alert - Only show in edit mode */}
      {isEditMode && showWarning && (
        <Alert
          severity="warning"
          onClose={() => setShowWarning(false)}
          sx={{ mb: 2 }}>
          Make sure you have shared Google Drive Folders with our service
          account
        </Alert>
      )}

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}>
        <Typography variant="h6">Image Selection Details</Typography>
        {!isEditMode ? (
          <IconButton onClick={handleEdit} size="small">
            <EditIcon />
          </IconButton>
        ) : (
          <Stack direction="row" spacing={1}>
            <IconButton
              onClick={handleSubmit(onSubmit)}
              size="small"
              color="primary">
              <SaveIcon />
            </IconButton>
            <IconButton onClick={handleCancel} size="small" color="secondary">
              <CancelIcon />
            </IconButton>
          </Stack>
        )}
      </Stack>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {/* Folder IDs */}
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              <strong>Folder IDs:</strong>
            </Typography>
            {!isEditMode ? (
              <Stack direction="row" flexWrap="wrap" sx={{ margin: "-4px" }}>
                {imageSelection?.folderIds.map((folderId, index) => (
                  <Chip
                    sx={{ margin: "8px" }}
                    key={index}
                    label={folderId}
                    size="small"
                    variant="outlined"
                  />
                )) || (
                  <Typography variant="body2" color="text.secondary">
                    No folder IDs
                  </Typography>
                )}
              </Stack>
            ) : (
              <Stack spacing={1}>
                {fields.map((field, index) => (
                  <Stack
                    key={field.id}
                    direction="row"
                    spacing={1}
                    alignItems="center">
                    <Controller
                      name={`folderIds.${index}.value`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          size="small"
                          placeholder="Enter folder ID"
                          fullWidth
                        />
                      )}
                    />
                    <IconButton
                      onClick={() => remove(index)}
                      size="small"
                      color="error"
                      disabled={fields.length === 1}>
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                ))}
                <Button
                  startIcon={<AddIcon />}
                  onClick={addFolderId}
                  variant="outlined"
                  size="small"
                  sx={{ alignSelf: "flex-start" }}>
                  Add Folder ID
                </Button>
              </Stack>
            )}
          </Box>

          {/* Selection Allowed */}
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              <strong>Selection Allowed:</strong>
            </Typography>
            {!isEditMode ? (
              <Chip
                label={imageSelection?.isSelectionAllowed ? "Yes" : "No"}
                color={imageSelection?.isSelectionAllowed ? "success" : "error"}
                size="small"
              />
            ) : (
              <Controller
                name="isSelectionAllowed"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Switch
                        checked={field.value}
                        onChange={field.onChange}
                        color="primary"
                      />
                    }
                    label={field.value ? "Allowed" : "Not Allowed"}
                  />
                )}
              />
            )}
          </Box>

          {/* Max Selection Count */}
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              <strong>Max Selection Count:</strong>
            </Typography>
            {!isEditMode ? (
              <Typography variant="body1">
                {imageSelection?.maxSelectionCount || 0}
              </Typography>
            ) : (
              <FormControl fullWidth>
                <Controller
                  name="maxSelectionCount"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        Value: {watchedMaxCount}
                      </Typography>
                      <Slider
                        {...field}
                        min={0}
                        max={1000}
                        step={25}
                        marks={[
                          { value: 0, label: "0" },
                          { value: 250, label: "250" },
                          { value: 500, label: "500" },
                          { value: 750, label: "750" },
                          { value: 1000, label: "1000" },
                        ]}
                        valueLabelDisplay="auto"
                        sx={{ mt: 2 }}
                      />
                    </>
                  )}
                />
              </FormControl>
            )}
          </Box>

          {/* Selected Images Count - Hidden in edit mode */}
          {!isEditMode && (
            <SelectedImagesSummary
              selectedImages={selectedImages || []}
              maxSelectionCount={imageSelection?.maxSelectionCount}
              projectName={selectedProject?.name}
              onDownload={handleDownloadImageList}
            />
          )}
        </Stack>
      </form>
    </Box>
  );
}
