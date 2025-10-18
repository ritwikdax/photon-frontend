"use client";

import React from "react";
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
  Autocomplete,
  CircularProgress,
  Alert,
  IconButton,
  Paper,
  Divider,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import dayjs, { Dayjs } from "dayjs";
import useEmployees from "@/app/queries/useEmployees";
import { Employee } from "@/app/interfaces/data/interface";
import useAddMutataion from "@/app/mutations/useAddMutataion";
import useUpdateMutation from "@/app/mutations/useUpdateMutation";
import { useProjectContext } from "@/app/context/all";

interface TeamMember {
  employeeId: string;
  isLead: string;
}

interface AddEventFormData {
  projectId: string;
  startDateTime: Dayjs | null;
  endDateTime: Dayjs | null;
  venue: string;
  assignment: string;
  team: TeamMember[];
  status: "upcoming" | "done" | "cancelled" | "postponed" | "in_progress";
}

interface EventInitialData {
  projectId: string;
  startDateTime: Date;
  endDateTime: Date;
  venue: string;
  assignment: string;
  team: TeamMember[];
  status: "upcoming" | "done" | "cancelled" | "postponed" | "in_progress";
}

interface AddEventFormProps {
  onCancel?: () => void;
  mode?: "add" | "edit";
  eventId?: string;
  initialData?: EventInitialData;
}

const statusOptions = [
  { value: "upcoming", label: "Upcoming" },
  { value: "in_progress", label: "In Progress" },
  { value: "done", label: "Done" },
  { value: "cancelled", label: "Cancelled" },
  { value: "postponed", label: "Postponed" },
] as const;

export default function AddEventForm({ onCancel, mode = "add", eventId, initialData }: AddEventFormProps) {
  const { selectedProject } = useProjectContext();
  const { data: employees, isLoading: isLoadingEmployees } = useEmployees();
  const addMutation = useAddMutataion("events");
  const updateMutation = useUpdateMutation("events", eventId ? `id=${eventId}` : "");

  const isEditMode = mode === "edit";
  const mutation = isEditMode ? updateMutation : addMutation;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddEventFormData>({
    defaultValues: isEditMode && initialData
      ? {
          projectId: initialData.projectId,
          startDateTime: dayjs(initialData.startDateTime),
          endDateTime: dayjs(initialData.endDateTime),
          venue: initialData.venue,
          assignment: initialData.assignment,
          team: initialData.team,
          status: initialData.status,
        }
      : {
          projectId: selectedProject?.id || "",
          startDateTime: null,
          endDateTime: null,
          venue: "",
          assignment: "",
          team: [],
          status: "upcoming",
        },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "team",
  });

  React.useEffect(() => {
    if (mutation.isSuccess) {
      reset();
      if (onCancel) {
        setTimeout(() => {
          onCancel();
        }, 1500);
      }
    }
  }, [mutation.isSuccess, reset, onCancel]);

  const onSubmit = (data: AddEventFormData) => {
    const projectIdToUse = isEditMode ? initialData?.projectId : selectedProject?.id;
    
    if (!projectIdToUse) {
      console.error("No project selected");
      return;
    }

    const eventData = {
      projectId: projectIdToUse,
      startDateTime: data.startDateTime?.toISOString() || new Date().toISOString(),
      endDateTime: data.endDateTime?.toISOString() || new Date().toISOString(),
      venue: data.venue,
      assignment: data.assignment,
      team: data.team,
      status: data.status,
    };

    console.log(`${isEditMode ? "Updating" : "Submitting"} event:`, eventData);
    mutation.mutate(eventData);
  };

  const handleAddTeamMember = () => {
    append({ employeeId: "", isLead: "false" });
  };

  const currentProject = isEditMode ? { id: initialData?.projectId, name: "Current Project" } : selectedProject;

  if (!currentProject && !isEditMode) {
    return (
      <Box p={3}>
        <Alert severity="error">
          <strong>No project selected!</strong> Please select a project first to add an event.
        </Alert>
      </Box>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 3, minWidth: 600 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          {isEditMode ? "Edit Event" : "Add Event to Project"}
        </Typography>

        {!isEditMode && currentProject && (
          <Alert severity="info" sx={{ mb: 3 }}>
            Adding event to: <strong>{currentProject.name || currentProject.id}</strong>
          </Alert>
        )}

        {mutation.isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Failed to {isEditMode ? "update" : "add"} event. Error: {mutation.error?.message || "Unknown error"}
          </Alert>
        )}

        {mutation.isSuccess && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Event {isEditMode ? "updated" : "added"} successfully!
          </Alert>
        )}

        <Stack spacing={3}>
          {/* Start Date Time */}
          <Controller
            name="startDateTime"
            control={control}
            rules={{ required: "Start date and time is required" }}
            render={({ field }) => (
              <DateTimePicker
                label="Start Date & Time"
                value={field.value}
                onChange={(newValue) => field.onChange(newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.startDateTime,
                    helperText: errors.startDateTime?.message,
                  },
                }}
              />
            )}
          />

          {/* End Date Time */}
          <Controller
            name="endDateTime"
            control={control}
            rules={{ required: "End date and time is required" }}
            render={({ field }) => (
              <DateTimePicker
                label="End Date & Time"
                value={field.value}
                onChange={(newValue) => field.onChange(newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.endDateTime,
                    helperText: errors.endDateTime?.message,
                  },
                }}
              />
            )}
          />

          {/* Venue */}
          <Controller
            name="venue"
            control={control}
            rules={{ required: "Venue is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Venue"
                fullWidth
                error={!!errors.venue}
                helperText={errors.venue?.message}
                placeholder="Enter event venue"
              />
            )}
          />

          {/* Assignment */}
          <Controller
            name="assignment"
            control={control}
            rules={{ required: "Assignment is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Assignment"
                fullWidth
                multiline
                rows={3}
                error={!!errors.assignment}
                helperText={errors.assignment?.message}
                placeholder="Describe the assignment details"
              />
            )}
          />

          {/* Status */}
          <Controller
            name="status"
            control={control}
            rules={{ required: "Status is required" }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.status}>
                <InputLabel>Status</InputLabel>
                <Select {...field} label="Status">
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

          {/* Team Members */}
          <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="subtitle1" fontWeight="medium">
                Team Members
              </Typography>
              <Button
                startIcon={<AddIcon />}
                onClick={handleAddTeamMember}
                variant="outlined"
                size="small"
              >
                Add Team Member
              </Button>
            </Box>

            {fields.length === 0 && (
              <Alert severity="info" sx={{ mb: 2 }}>
                No team members added yet. Click "Add Team Member" to assign employees to this event.
              </Alert>
            )}

            <Stack spacing={2}>
              {fields.map((field, index) => (
                <Paper key={field.id} elevation={1} sx={{ p: 2 }}>
                  <Box display="flex" gap={2} alignItems="flex-start">
                    <Box flex={1}>
                      <Controller
                        name={`team.${index}.employeeId`}
                        control={control}
                        rules={{ required: "Employee is required" }}
                        render={({ field: employeeField }) => (
                          <Autocomplete
                            {...employeeField}
                            options={employees || []}
                            getOptionLabel={(option: Employee) => option.name}
                            loading={isLoadingEmployees}
                            onChange={(_, value) => employeeField.onChange(value?.id || "")}
                            value={
                              employees?.find((emp) => emp.id === employeeField.value) || null
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Employee"
                                error={!!errors.team?.[index]?.employeeId}
                                helperText={errors.team?.[index]?.employeeId?.message}
                                InputProps={{
                                  ...params.InputProps,
                                  endAdornment: (
                                    <>
                                      {isLoadingEmployees ? (
                                        <CircularProgress color="inherit" size={20} />
                                      ) : null}
                                      {params.InputProps.endAdornment}
                                    </>
                                  ),
                                }}
                              />
                            )}
                            renderOption={(props, option: Employee) => (
                              <li {...props} key={option.id}>
                                <Box>
                                  <Typography variant="body1">{option.name}</Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {option?.expertise?.join(", ")}
                                  </Typography>
                                </Box>
                              </li>
                            )}
                          />
                        )}
                      />
                    </Box>

                    <Controller
                      name={`team.${index}.isLead`}
                      control={control}
                      render={({ field: leadField }) => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={leadField.value === "true"}
                              onChange={(e) => leadField.onChange(e.target.checked ? "true" : "false")}
                            />
                          }
                          label="Lead"
                          sx={{ mt: 1 }}
                        />
                      )}
                    />

                    <IconButton
                      color="error"
                      onClick={() => remove(index)}
                      sx={{ mt: 1 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Paper>
              ))}
            </Stack>
          </Box>

          <Divider />

          {/* Action Buttons */}
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            {onCancel && (
              <Button
                variant="outlined"
                onClick={onCancel}
                disabled={mutation.isPending}
              >
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              variant="contained"
              disabled={mutation.isPending}
              sx={{
                backgroundColor: "#b70058ff",
                "&:hover": {
                  backgroundColor: "#8a0043ff",
                },
              }}
            >
              {mutation.isPending ? (isEditMode ? "Updating..." : "Adding...") : (isEditMode ? "Update Event" : "Add Event")}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </LocalizationProvider>
  );
}
