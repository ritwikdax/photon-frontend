"use client";

import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  FormControlLabel,
  Checkbox,
  CircularProgress,
} from "@mui/material";

interface EditClientFormData {
  id: string;
  name: string;
  phone: string;
  alternatePhone: string;
  email: string;
  address: string;
  isPremiumClient: boolean;
  additionalDetails?: string;
}

interface EditClientFormProps {
  client: EditClientFormData;
  onSubmit: (data: EditClientFormData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export default function EditClientForm({ 
  client, 
  onSubmit, 
  onCancel,
  isLoading = false 
}: EditClientFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditClientFormData>({
    defaultValues: {
      id: client.id,
      name: client.name || "",
      phone: client.phone || "",
      alternatePhone: client.alternatePhone || "",
      email: client.email || "",
      address: client.address || "",
      isPremiumClient: client.isPremiumClient || false,
      additionalDetails: client.additionalDetails || "",
    },
  });

  const handleFormSubmit = (data: EditClientFormData) => {
    onSubmit(data);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
        Edit Client
      </Typography>
      
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Stack spacing={3}>
          {/* Name */}
          <Controller
            name="name"
            control={control}
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Client Name"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
                required
              />
            )}
          />

          {/* Email and Phone */}
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
          </Stack>

          {/* Alternate Phone */}
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

          {/* Address */}
          <Controller
            name="address"
            control={control}
            rules={{ required: "Address is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Address"
                fullWidth
                multiline
                rows={3}
                error={!!errors.address}
                helperText={errors.address?.message}
                required
              />
            )}
          />

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
                placeholder="Any additional information about the client..."
              />
            )}
          />

          {/* Premium Client Checkbox */}
          <Controller
            name="isPremiumClient"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    checked={field.value}
                  />
                }
                label="Premium Client"
              />
            )}
          />

          {/* Submit and Cancel Buttons */}
          <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
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
              startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {isLoading ? "Updating..." : "Update Client"}
            </Button>
          </Box>
        </Stack>
      </form>
    </Box>
  );
}
