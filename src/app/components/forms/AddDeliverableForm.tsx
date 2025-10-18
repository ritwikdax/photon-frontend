"use client";

import { useForm, Controller, useFieldArray } from "react-hook-form";
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
  Card,
  CardContent,
  IconButton,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { DeliverableType, Deliverable } from "@/app/interfaces/data/interface";

interface DeliveryUpdateFormData {
  title: string;
  status?: "not_started" | "done" | "in_progress";
  lastUpdatedOn?: string;
}

interface AddDeliverableFormData {
  type: DeliverableType;
  displayName: string;
  additionalDetails: string;
  deliveryTime: number;
  assetType: "physical" | "digital";
  updateTemplates: DeliveryUpdateFormData[];
}

interface AddDeliverableFormProps {
  onSubmit: (data: AddDeliverableFormData) => void;
  isLoading?: boolean;
  deliverable?: Deliverable;
}

const deliverableTypeOptions: { value: DeliverableType; label: string }[] = [
  { value: "raw_photos", label: "Raw Photos" },
  { value: "raw_videoes", label: "Raw Videos" },
  { value: "album", label: "Album" },
  { value: "pendrive", label: "Pendrive" },
  { value: "hard_drive", label: "Hard Drive" },
  { value: "teaser", label: "Teaser" },
  { value: "reels", label: "Reels" },
  { value: "edited_photos", label: "Edited Photos" },
  { value: "full_video", label: "Full Video" },
  { value: "other", label: "Other" },
];

const assetTypeOptions: { value: "physical" | "digital"; label: string }[] = [
  { value: "physical", label: "Physical" },
  { value: "digital", label: "Digital" },
];

export default function AddDeliverableForm({ onSubmit, isLoading = false, deliverable }: AddDeliverableFormProps) {
  const isEditMode = !!deliverable;
  
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddDeliverableFormData>({
    defaultValues: deliverable ? {
      type: deliverable.type,
      displayName: deliverable.displayName,
      additionalDetails: deliverable.additionalDetails,
      deliveryTime: deliverable.deliveryTime,
      assetType: deliverable.assetType,
      updateTemplates: deliverable.updateTemplates.map(template => ({
        title: template.title,
        status: template.status,
        lastUpdatedOn: template.lastUpdatedOn?.toString(),
      })),
    } : {
      type: "edited_photos",
      displayName: "",
      additionalDetails: "",
      deliveryTime: 0,
      assetType: "digital",
      updateTemplates: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "updateTemplates",
  });

  const handleFormSubmit = (data: AddDeliverableFormData) => {
    // Add status and lastUpdatedOn to each update template
    const formattedData = {
      ...data,
      updateTemplates: data.updateTemplates.map(template => ({
        ...template,
        status: template.status || ("not_started" as const),
        lastUpdatedOn: template.lastUpdatedOn || new Date().toISOString(),
      })),
    };
    onSubmit(formattedData);
  };

  const handleAddUpdateTemplate = () => {
    append({
      title: "",
    });
  };

  return (
    <Box sx={{ 
      p: 4, 
      maxWidth: 900, 
      mx: "auto", 
      mt: 4, 
      mb: 4, 
      bgcolor: "white", 
      borderRadius: 2,
      maxHeight: "calc(100vh - 120px)",
      overflow: "auto"
    }}>
      <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
        {isEditMode ? "Edit Deliverable" : "Add New Deliverable"}
      </Typography>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Stack spacing={3}>
          {/* Deliverable Type and Display Name */}
          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            <Controller
              name="type"
              control={control}
              rules={{ required: "Deliverable type is required" }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.type}>
                  <InputLabel id="type-label">Deliverable Type *</InputLabel>
                  <Select {...field} labelId="type-label" label="Deliverable Type *">
                    {deliverableTypeOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.type && <FormHelperText>{errors.type.message}</FormHelperText>}
                </FormControl>
              )}
            />
            <Controller
              name="displayName"
              control={control}
              rules={{ required: "Display name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Display Name"
                  fullWidth
                  error={!!errors.displayName}
                  helperText={errors.displayName?.message}
                  required
                />
              )}
            />
          </Stack>

          {/* Asset Type and Delivery Time */}
          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            <Controller
              name="assetType"
              control={control}
              rules={{ required: "Asset type is required" }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.assetType}>
                  <InputLabel id="asset-type-label">Asset Type *</InputLabel>
                  <Select {...field} labelId="asset-type-label" label="Asset Type *">
                    {assetTypeOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.assetType && <FormHelperText>{errors.assetType.message}</FormHelperText>}
                </FormControl>
              )}
            />
            <Controller
              name="deliveryTime"
              control={control}
              rules={{
                required: "Delivery time is required",
                min: { value: 0, message: "Delivery time must be at least 0 days" },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Delivery Time (in days)"
                  type="number"
                  fullWidth
                  error={!!errors.deliveryTime}
                  helperText={errors.deliveryTime?.message}
                  required
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                />
              )}
            />
          </Stack>

          {/* Additional Details */}
          <Controller
            name="additionalDetails"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Additional Details"
                fullWidth
                multiline
                rows={3}
                error={!!errors.additionalDetails}
                helperText={errors.additionalDetails?.message}
              />
            )}
          />

          <Divider sx={{ my: 2 }} />

          {/* Update Templates Section */}
          <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              <Typography variant="h6" component="h3">
                Update Templates
              </Typography>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={handleAddUpdateTemplate}
                size="small"
              >
                Add Update Template
              </Button>
            </Stack>

            {fields.length === 0 && (
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", py: 2 }}>
                No update templates added yet. Click &quot;Add Update Template&quot; to create one.
              </Typography>
            )}

            <Stack spacing={2}>
              {fields.map((field, index) => (
                <Card key={field.id} variant="outlined">
                  <CardContent>
                    <Stack spacing={2}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="subtitle1" fontWeight="bold">
                          Update Template #{index + 1}
                        </Typography>
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => remove(index)}
                          aria-label="delete"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Stack>

                      {/* Update Title */}
                      <Controller
                        name={`updateTemplates.${index}.title`}
                        control={control}
                        rules={{ required: "Title is required" }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Update Title"
                            fullWidth
                            error={!!errors.updateTemplates?.[index]?.title}
                            helperText={errors.updateTemplates?.[index]?.title?.message}
                            required
                          />
                        )}
                      />
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>

          {/* Submit and Reset Buttons */}
          <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
            <Button variant="outlined" onClick={() => reset()} disabled={isLoading}>
              Reset
            </Button>
            <Button type="submit" variant="contained" disabled={isLoading}>
              {isLoading ? (isEditMode ? "Updating..." : "Adding...") : (isEditMode ? "Update Deliverable" : "Add Deliverable")}
            </Button>
          </Box>
        </Stack>
      </form>
    </Box>
  );
}
