"use client";

import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  TextField,
  Paper,
  Typography,
  Stack,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

interface AddClientFormData {
  name: string;
  phone: string;
  alternatePhone: string;
  email: string;
  address: string;
  isPremiumClient: boolean;
  additionalDetails?: string;
}

interface AddClientFormProps {
  onSubmit: (data: AddClientFormData) => void;
  isLoading?: boolean;
}

export default function AddClientForm({ onSubmit, isLoading = false }: AddClientFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddClientFormData>({
    defaultValues: {
      name: "",
      phone: "",
      alternatePhone: "",
      email: "",
      address: "",
      isPremiumClient: false,
      additionalDetails: "",
    },
  });

  const handleFormSubmit = (data: AddClientFormData) => {
    onSubmit(data);
  };

  return (
    <Box sx={{ p: 4, maxWidth: 900, mx: "auto", mt: 4, mb: 4}}>
      <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
        Add New Client
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

          {/* Submit and Reset Buttons */}
          <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              onClick={() => reset()}
              disabled={isLoading}
            >
              Reset
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add Client"}
            </Button>
          </Box>
        </Stack>
      </form>
    </Box>
  );
}
