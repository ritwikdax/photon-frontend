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
  Chip,
  OutlinedInput,
  Rating,
  Stack,
  CircularProgress,
} from "@mui/material";
import { EmployeeRoleType, EmployeeStatusType, EmploymentType } from "@/app/interfaces/data/interface";

interface EditEmployeeFormData {
  id: string;
  name: string;
  doj: string;
  expertise: string[];
  address: string;
  phone: string;
  alternatePhone: string;
  email: string;
  rating: number;
  employmentType: EmploymentType;
  status: EmployeeStatusType;
  role: EmployeeRoleType;
}

interface EditEmployeeFormProps {
  employee: EditEmployeeFormData;
  onSubmit: (data: EditEmployeeFormData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

const expertiseOptions = [
  "Photography",
  "Videography",
  "Photo Editing",
  "Video Editing",
  "Drone Operation",
  "Lighting",
  "Sound Recording",
  "Direction",
  "Production",
  "Post Production",
  "Color Grading",
  "Animation",
  "Graphic Design",
];

const employmentTypeOptions: { value: EmploymentType; label: string }[] = [
  { value: "full_time", label: "Full Time" },
  { value: "part_time", label: "Part Time" },
  { value: "freelancer", label: "Freelancer" },
];

const statusOptions: { value: EmployeeStatusType; label: string }[] = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "on_leave", label: "On Leave" },
];

const roleOptions: { value: EmployeeRoleType; label: string }[] = [
  { value: "admin", label: "Admin" },
  { value: "manager", label: "Manager" },
  { value: "employee", label: "Employee" },
];

export default function EditEmployeeForm({ 
  employee, 
  onSubmit, 
  onCancel,
  isLoading = false 
}: EditEmployeeFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditEmployeeFormData>({
    defaultValues: {
      id: employee.id,
      name: employee.name || "",
      doj: employee.doj ? new Date(employee.doj).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
      expertise: employee.expertise || [],
      address: employee.address || "",
      phone: employee.phone || "",
      alternatePhone: employee.alternatePhone || "",
      email: employee.email || "",
      rating: employee.rating || 0,
      employmentType: employee.employmentType || "full_time",
      status: employee.status || "active",
      role: employee.role || "employee",
    },
  });

  const handleFormSubmit = (data: EditEmployeeFormData) => {
    onSubmit(data);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
        Edit Employee
      </Typography>
      
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Stack spacing={3}>
          {/* Name and Date of Joining */}
          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Full Name"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  required
                />
              )}
            />
            <Controller
              name="doj"
              control={control}
              rules={{ required: "Date of joining is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Date of Joining"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.doj}
                  helperText={errors.doj?.message}
                  required
                />
              )}
            />
          </Stack>

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

          {/* Alternate Phone and Address */}
          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
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
                  rows={1}
                  error={!!errors.address}
                  helperText={errors.address?.message}
                  required
                />
              )}
            />
          </Stack>

          {/* Expertise */}
          <Controller
            name="expertise"
            control={control}
            rules={{ 
              required: "At least one expertise is required",
              validate: (value) => value.length > 0 || "At least one expertise is required"
            }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.expertise}>
                <InputLabel id="expertise-label">Expertise *</InputLabel>
                <Select
                  {...field}
                  labelId="expertise-label"
                  multiple
                  input={<OutlinedInput label="Expertise *" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  {expertiseOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                {errors.expertise && (
                  <FormHelperText>{errors.expertise.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />

          {/* Employment Type, Status, and Role */}
          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            <Controller
              name="employmentType"
              control={control}
              rules={{ required: "Employment type is required" }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.employmentType}>
                  <InputLabel id="employment-type-label">Employment Type *</InputLabel>
                  <Select
                    {...field}
                    labelId="employment-type-label"
                    label="Employment Type *"
                  >
                    {employmentTypeOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.employmentType && (
                    <FormHelperText>{errors.employmentType.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />
            <Controller
              name="status"
              control={control}
              rules={{ required: "Status is required" }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.status}>
                  <InputLabel id="status-label">Status *</InputLabel>
                  <Select
                    {...field}
                    labelId="status-label"
                    label="Status *"
                  >
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
            <Controller
              name="role"
              control={control}
              rules={{ required: "Role is required" }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.role}>
                  <InputLabel id="role-label">Role *</InputLabel>
                  <Select
                    {...field}
                    labelId="role-label"
                    label="Role *"
                  >
                    {roleOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.role && (
                    <FormHelperText>{errors.role.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </Stack>

          {/* Rating */}
          <Controller
            name="rating"
            control={control}
            render={({ field }) => (
              <Box>
                <Typography component="legend">Rating</Typography>
                <Rating
                  {...field}
                  value={field.value}
                  onChange={(_, value) => field.onChange(value || 0)}
                  precision={0.5}
                  size="large"
                />
              </Box>
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
              {isLoading ? "Updating..." : "Update Employee"}
            </Button>
          </Box>
        </Stack>
      </form>
    </Box>
  );
}
