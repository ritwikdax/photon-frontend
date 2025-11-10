"use client";

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
  Autocomplete,
  CircularProgress,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  BookingType,
  LeadType,
  ProjectStatus,
  Project,
} from "../../interfaces/data/interface";
import useClients from "../../queries/useClients";
import useUpdateMutation from "../../mutations/useUpdateMutation";
import { useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "../../context/SnackbarContext";

interface EditProjectFormData {
  name: string;
  phone: string;
  alternatePhone: string;
  email: string;
  leadSource: LeadType;
  bookingCategory: BookingType;
  dateOfBooking: string;
  status: ProjectStatus;
  discussionSummary: string;
  details: string;
  clientId?: string;
}

interface EditProjectFormProps {
  project: Project;
  onClose: () => void;
}

const leadSourceOptions: { value: LeadType; label: string }[] = [
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "friends", label: "Friends" },
  { value: "wordofmouth", label: "Word of Mouth" },
  { value: "referrel", label: "Referral" },
  { value: "other", label: "Other" },
];

const bookingCategoryOptions: { value: BookingType; label: string }[] = [
  { value: "wedding", label: "Wedding" },
  { value: "pre_wedding", label: "Pre Wedding" },
  { value: "post_wedding", label: "Post Wedding" },
  { value: "anniversary", label: "Anniversary" },
  { value: "birthday", label: "Birthday" },
  { value: "corporate_shoot", label: "Corporate Shoot" },
  { value: "baby_bump", label: "Baby Bump" },
  { value: "rice_cereony", label: "Rice Ceremony" },
  { value: "other", label: "Other" },
];

const statusOptions: { value: ProjectStatus; label: string }[] = [
  { value: "open", label: "Open" },
  { value: "close", label: "Close" },
  { value: "reopen", label: "Reopen" },
  { value: "withdrawn", label: "Withdrawn" },
  { value: "on_hold", label: "On Hold" },
  { value: "unknown", label: "Unknown" },
];

export default function EditProjectForm({
  project,
  onClose,
}: EditProjectFormProps) {
  const queryClient = useQueryClient();
  const { success, error: showError } = useSnackbar();
  const { mutate: updateProject, isPending } = useUpdateMutation(
    "projects",
    `id=${project.id}`
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<EditProjectFormData>({
    defaultValues: {
      name: project.name,
      phone: project.phone,
      alternatePhone: project.alternatePhone,
      email: project.email,
      leadSource: project.leadSource,
      bookingCategory: project.bookingCategory,
      dateOfBooking: new Date(project.dateOfBooking).toISOString().split("T")[0],
      status: project.status,
      discussionSummary: project.discussionSummary,
      details: project.details,
      clientId: project.clientId || "",
    },
  });

  const { data: clients, isLoading: isLoadingClients } = useClients();

  const handleFormSubmit = (data: EditProjectFormData) => {
    updateProject(
      {
        ...data,
        dateOfBooking: new Date(data.dateOfBooking),
      },
      {
        onSuccess: () => {
          success("Project updated successfully");
          queryClient.invalidateQueries({ queryKey: ["projects"] });
          onClose();
        },
        onError: (err: any) => {
          showError(
            `Failed to update project: ${err?.message || "Unknown error"}`
          );
        },
      }
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" component="h2" fontWeight={600}>
          Edit Project
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Stack spacing={3}>
          {/* Row 1: Name, Phone, Alternate Phone */}
          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Project Name"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  required
                />
              )}
            />
            <Controller
              name="phone"
              control={control}
              rules={{
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Phone number must be 10 digits",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Phone Number"
                  fullWidth
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  required
                />
              )}
            />
            <Controller
              name="alternatePhone"
              control={control}
              rules={{
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Alternate phone must be 10 digits",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Alternate Phone Number"
                  fullWidth
                  error={!!errors.alternatePhone}
                  helperText={errors.alternatePhone?.message}
                />
              )}
            />
          </Stack>

          {/* Row 2: Email, Lead Source, Booking Category */}
          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  type="email"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  required
                />
              )}
            />
            <Controller
              name="leadSource"
              control={control}
              rules={{ required: "Lead source is required" }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.leadSource}>
                  <InputLabel id="lead-source-label">Lead Source *</InputLabel>
                  <Select
                    {...field}
                    labelId="lead-source-label"
                    label="Lead Source *">
                    {leadSourceOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.leadSource && (
                    <FormHelperText>{errors.leadSource.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />
            <Controller
              name="bookingCategory"
              control={control}
              rules={{ required: "Booking category is required" }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.bookingCategory}>
                  <InputLabel id="booking-category-label">
                    Booking Category *
                  </InputLabel>
                  <Select
                    {...field}
                    labelId="booking-category-label"
                    label="Booking Category *">
                    {bookingCategoryOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.bookingCategory && (
                    <FormHelperText>
                      {errors.bookingCategory.message}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </Stack>

          {/* Row 3: Client, Date of Booking, Status */}
          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            <Controller
              name="clientId"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  options={clients || []}
                  getOptionLabel={(option) =>
                    typeof option === "string"
                      ? clients?.find((c) => c.id === option)?.name || ""
                      : option.name
                  }
                  value={clients?.find((c) => c.id === value) || null}
                  onChange={(_, newValue) => {
                    onChange(newValue?.id || "");
                    // Auto-fill phone, alternatePhone, and email when client is selected
                    if (newValue) {
                      setValue("phone", newValue.phone);
                      setValue("alternatePhone", newValue.alternatePhone);
                      setValue("email", newValue.email);
                    }
                  }}
                  loading={isLoadingClients}
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Client (Optional)"
                      error={!!errors.clientId}
                      helperText={errors.clientId?.message}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {isLoadingClients ? (
                              <CircularProgress color="inherit" size={20} />
                            ) : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                />
              )}
            />
            <Controller
              name="dateOfBooking"
              control={control}
              rules={{ required: "Date of booking is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Date of Booking"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.dateOfBooking}
                  helperText={errors.dateOfBooking?.message}
                  required
                />
              )}
            />
            <Controller
              name="status"
              control={control}
              rules={{ required: "Status is required" }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.status}>
                  <InputLabel id="status-label">Status *</InputLabel>
                  <Select {...field} labelId="status-label" label="Status *">
                    {statusOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.status && (
                    <FormHelperText>{errors.status.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </Stack>

          {/* Row 4: Discussion Summary and Details */}
          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            <Controller
              name="discussionSummary"
              control={control}
              rules={{ required: "Discussion summary is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Discussion Summary"
                  fullWidth
                  multiline
                  rows={3}
                  error={!!errors.discussionSummary}
                  helperText={errors.discussionSummary?.message}
                  required
                />
              )}
            />
            <Controller
              name="details"
              control={control}
              rules={{ required: "Details are required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Details"
                  fullWidth
                  multiline
                  rows={3}
                  error={!!errors.details}
                  helperText={errors.details?.message}
                  required
                />
              )}
            />
          </Stack>

          {/* Submit and Cancel Buttons */}
          <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
            <Button variant="outlined" onClick={onClose} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" disabled={isPending}>
              {isPending ? "Updating..." : "Update Project"}
            </Button>
          </Box>
        </Stack>
      </form>
    </Box>
  );
}
