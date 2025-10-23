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
} from "@mui/material";
import {
  BookingType,
  LeadType,
  ProjectStatus,
} from "@/app/interfaces/data/interface";
import useClients from "@/app/queries/useClients";

interface AddProjectFormData {
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

interface AddProjectFormProps {
  onSubmit: (data: AddProjectFormData) => void;
  isLoading?: boolean;
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
];

export default function AddProjectForm({
  onSubmit,
  isLoading = false,
}: AddProjectFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddProjectFormData>({
    defaultValues: {
      name: "",
      phone: "",
      alternatePhone: "",
      email: "",
      leadSource: "instagram",
      bookingCategory: "wedding",
      dateOfBooking: new Date().toISOString().split("T")[0],
      status: "open",
      discussionSummary: "",
      details: "",
      clientId: "",
    },
  });

  const { data: clients, isLoading: isLoadingClients } = useClients();

  const handleFormSubmit = (data: AddProjectFormData) => {
    onSubmit(data);
  };

  return (
    <Box
      sx={{
        p: 4,
        maxWidth: 1400,
        mx: "auto",
        mt: 4,
        mb: 4,
        bgcolor: "white",
        borderRadius: 2,
      }}>
      <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
        Add New Project
      </Typography>

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

          {/* Submit and Reset Buttons */}
          <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              onClick={() => reset()}
              disabled={isLoading}>
              Reset
            </Button>
            <Button type="submit" variant="contained" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Project"}
            </Button>
          </Box>
        </Stack>
      </form>
    </Box>
  );
}
