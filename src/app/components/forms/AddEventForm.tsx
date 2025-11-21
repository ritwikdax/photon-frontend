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
  Grid,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import dayjs, { Dayjs } from "dayjs";
import useEmployees from "@/app/queries/useEmployees";
import { Employee } from "@/app/interfaces/data/interface";
import CounterInput from "./CounterInput";
import useAddMutataion from "@/app/mutations/useAddMutataion";
import useUpdateMutation from "@/app/mutations/useUpdateMutation";
import { useProjectSelected } from "@/app/hooks/useProjectSelected";
import useOccupiedUserIds from "@/app/queries/analytics/useOccupiedUserIds";
import { useQueryClient } from "@tanstack/react-query";

interface TeamMember {
  employeeId: string;
  isLead: string;
}

interface AddEventFormData {
  projectId: string;
  eventDate: Dayjs | null;
  eventStartTime: Dayjs | null;
  venue: string;
  assignment: string;
  photographerCount: number;
  videographerCount: number;
  droneOperatorCount: number;
  lightmanCount: number;
  helperCount: number;
  team: TeamMember[];
  status: "upcoming" | "done" | "cancelled" | "postponed" | "in_progress";
}

interface EventInitialData {
  projectId: string;
  eventDate: Date;
  eventStartTime: string;
  venue: string;
  assignment: string;
  photographerCount: number;
  videographerCount: number;
  droneOperatorCount: number;
  lightmanCount: number;
  helperCount: number;
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

export default function AddEventForm({
  onCancel,
  mode = "add",
  eventId,
  initialData,
}: AddEventFormProps) {
  const { selectedProject } = useProjectSelected();
  const clinet = useQueryClient();
  const { data: employees, isLoading: isLoadingEmployees } = useEmployees();
  const addMutation = useAddMutataion("events", false);
  const isEditMode = mode === "edit";

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<AddEventFormData>({
    defaultValues:
      isEditMode && initialData
        ? {
            projectId: initialData.projectId,
            eventDate: dayjs(initialData.eventDate),
            eventStartTime: dayjs(`1970-01-01T${initialData.eventStartTime}`),
            venue: initialData.venue,
            assignment: initialData.assignment,
            photographerCount: initialData.photographerCount || 0,
            videographerCount: initialData.videographerCount || 0,
            droneOperatorCount: initialData.droneOperatorCount || 0,
            lightmanCount: initialData.lightmanCount || 0,
            helperCount: initialData.helperCount || 0,
            team: initialData.team,
            status: initialData.status,
          }
        : {
            projectId: selectedProject?.id || "",
            eventDate: null,
            eventStartTime: null,
            venue: "",
            assignment: "",
            photographerCount: 0,
            videographerCount: 0,
            droneOperatorCount: 0,
            lightmanCount: 0,
            helperCount: 0,
            team: [],
            status: "upcoming",
          },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "team",
  });

  const eventDate = watch("eventDate");
  const eventStartTime = watch("eventStartTime");

  // Combine date and time for occupied users query
  const startDateTimeValue = React.useMemo(() => {
    if (!eventDate || !eventStartTime) return "";
    const date = eventDate.format("YYYY-MM-DD");
    const time = eventStartTime.format("HH:mm");
    return dayjs(`${date}T${time}`).toISOString();
  }, [eventDate, eventStartTime]);

  const endDateTimeValue = React.useMemo(() => {
    if (!eventDate || !eventStartTime) return "";
    const date = eventDate.format("YYYY-MM-DD");
    const time = eventStartTime.format("HH:mm");
    return dayjs(`${date}T${time}`).add(4, "hour").toISOString();
  }, [eventDate, eventStartTime]);

  const { data: occupiedIds } = useOccupiedUserIds(
    startDateTimeValue,
    endDateTimeValue
  );
  const updateMutation = useUpdateMutation(
    "events",
    eventId ? `id=${eventId}` : "",
    () =>
      clinet.invalidateQueries({
        queryKey: ["occupiedUserIds", startDateTimeValue, endDateTimeValue],
      })
  );
  const mutation = isEditMode ? updateMutation : addMutation;

  React.useEffect(() => {
    if (mutation.isSuccess) {
      reset();
      if (onCancel) {
        onCancel();
      }
    }
  }, [mutation.isSuccess, reset, onCancel]);

  const onSubmit = (data: AddEventFormData) => {
    const projectIdToUse = isEditMode
      ? initialData?.projectId
      : selectedProject?.id;

    if (!projectIdToUse) {
      console.error("No project selected");
      return;
    }

    if (!data.eventDate || !data.eventStartTime) {
      console.error("Date and time are required");
      return;
    }

    // Extract date and time
    const eventDate = data.eventDate.format("YYYY-MM-DD");
    const eventStartTime = data.eventStartTime.format("HH:mm");

    const eventData = {
      projectId: projectIdToUse,
      eventDate,
      eventStartTime,
      venue: data.venue,
      assignment: data.assignment,
      photographerCount: data.photographerCount,
      videographerCount: data.videographerCount,
      droneOperatorCount: data.droneOperatorCount,
      lightmanCount: data.lightmanCount,
      helperCount: data.helperCount,
      team: data.team,
      status: data.status,
    };

    console.log(`${isEditMode ? "Updating" : "Submitting"} event:`, eventData);

    mutation.mutate(eventData);
  };

  const handleAddTeamMember = () => {
    append({ employeeId: "", isLead: "false" });
  };

  const currentProject = isEditMode
    ? { id: initialData?.projectId, name: "Current Project" }
    : selectedProject;

  if (!currentProject && !isEditMode) {
    return (
      <Box p={3}>
        <Alert severity="error">
          <strong>No project selected!</strong> Please select a project first to
          add an event.
        </Alert>
      </Box>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ p: 3, minWidth: 600 }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          {isEditMode ? "Edit Event" : "Add Event to Project"}
        </Typography>

        {!isEditMode && currentProject && (
          <Alert severity="info" sx={{ mb: 3 }}>
            Adding event to:{" "}
            <strong>{currentProject.name || currentProject.id}</strong>
          </Alert>
        )}

        {mutation.isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Failed to {isEditMode ? "update" : "add"} event. Error:{" "}
            {mutation.error?.message || "Unknown error"}
          </Alert>
        )}

        {mutation.isSuccess && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Event {isEditMode ? "updated" : "added"} successfully!
          </Alert>
        )}

        <Stack spacing={3}>
          {/* Event Date */}
          <Controller
            name="eventDate"
            control={control}
            rules={{ required: "Event date is required" }}
            render={({ field }) => (
              <DatePicker
                label="Event Date"
                value={field.value}
                onChange={(newValue) => field.onChange(newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.eventDate,
                    helperText: errors.eventDate?.message,
                  },
                }}
              />
            )}
          />

          {/* Event Start Time */}
          <Controller
            name="eventStartTime"
            control={control}
            rules={{ required: "Start time is required" }}
            render={({ field }) => (
              <TimePicker
                label="Start Time"
                value={field.value}
                onChange={(newValue) => field.onChange(newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.eventStartTime,
                    helperText: errors.eventStartTime?.message,
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

          {/* Team Composition Counters */}
          <Box>
            <Typography variant="subtitle1" fontWeight="medium" mb={2}>
              Team Composition
            </Typography>
            <Grid container spacing={2}>
              {/* Photographer Count */}
              <Grid size={6}>
                <Controller
                  name="photographerCount"
                  control={control}
                  render={({ field }) => (
                    <CounterInput
                      label="Photographers"
                      value={field.value}
                      onIncrement={() =>
                        setValue("photographerCount", field.value + 1)
                      }
                      onDecrement={() =>
                        setValue(
                          "photographerCount",
                          Math.max(0, field.value - 1)
                        )
                      }
                    />
                  )}
                />
              </Grid>

              {/* Videographer Count */}
              <Grid size={6}>
                <Controller
                  name="videographerCount"
                  control={control}
                  render={({ field }) => (
                    <CounterInput
                      label="Videographers"
                      value={field.value}
                      onIncrement={() =>
                        setValue("videographerCount", field.value + 1)
                      }
                      onDecrement={() =>
                        setValue(
                          "videographerCount",
                          Math.max(0, field.value - 1)
                        )
                      }
                    />
                  )}
                />
              </Grid>

              {/* Drone Operator Count */}
              <Grid size={6}>
                <Controller
                  name="droneOperatorCount"
                  control={control}
                  render={({ field }) => (
                    <CounterInput
                      label="Drone Operators"
                      value={field.value}
                      onIncrement={() =>
                        setValue("droneOperatorCount", field.value + 1)
                      }
                      onDecrement={() =>
                        setValue(
                          "droneOperatorCount",
                          Math.max(0, field.value - 1)
                        )
                      }
                    />
                  )}
                />
              </Grid>

              {/* Lightman Count */}
              <Grid size={6}>
                <Controller
                  name="lightmanCount"
                  control={control}
                  render={({ field }) => (
                    <CounterInput
                      label="Lightmen"
                      value={field.value}
                      onIncrement={() =>
                        setValue("lightmanCount", field.value + 1)
                      }
                      onDecrement={() =>
                        setValue("lightmanCount", Math.max(0, field.value - 1))
                      }
                    />
                  )}
                />
              </Grid>

              {/* Helper Count */}
              <Grid size={6}>
                <Controller
                  name="helperCount"
                  control={control}
                  render={({ field }) => (
                    <CounterInput
                      label="Helpers"
                      value={field.value}
                      onIncrement={() =>
                        setValue("helperCount", field.value + 1)
                      }
                      onDecrement={() =>
                        setValue("helperCount", Math.max(0, field.value - 1))
                      }
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>

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
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
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
                No team members added yet. Click "Add Team Member" to assign
                employees to this event.
              </Alert>
            )}

            <Stack spacing={2}>
              {fields.map((field, index) => (
                <Paper key={field.id} sx={{ p: 2, bgcolor: 'transparent', border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
                  <Box display="flex" gap={2} alignItems="flex-start">
                    <Box flex={1}>
                      <Controller
                        name={`team.${index}.employeeId`}
                        control={control}
                        rules={{ required: "Employee is required" }}
                        render={({ field: employeeField }) => (
                          <Autocomplete
                            key={String(JSON.stringify(occupiedIds))}
                            {...employeeField}
                            options={employees || []}
                            getOptionLabel={(option: Employee) => option.name}
                            loading={isLoadingEmployees}
                            onChange={(_, value) =>
                              employeeField.onChange(value?.id || "")
                            }
                            value={
                              employees?.find(
                                (emp) => emp.id === employeeField.value
                              ) || null
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Employee"
                                error={!!errors.team?.[index]?.employeeId}
                                helperText={
                                  errors.team?.[index]?.employeeId?.message
                                }
                                InputProps={{
                                  ...params.InputProps,
                                  endAdornment: (
                                    <>
                                      {isLoadingEmployees ? (
                                        <CircularProgress
                                          color="inherit"
                                          size={20}
                                        />
                                      ) : null}
                                      {params.InputProps.endAdornment}
                                    </>
                                  ),
                                }}
                              />
                            )}
                            renderOption={(props, option: Employee) => {
                              const isOccupied =
                                occupiedIds?.occupiedEmployeeIds?.includes(
                                  option.id
                                );

                              return (
                                <li
                                  {...props}
                                  key={option.id}
                                  aria-disabled={isOccupied}
                                >
                                  <Box>
                                    <Typography variant="body1">
                                      {option.name}
                                    </Typography>
                                    <Typography
                                      variant="caption"
                                      color="text.secondary"
                                    >
                                      {option?.expertise?.join(", ")}
                                    </Typography>
                                    {isOccupied ? (
                                      <Typography
                                        variant="caption"
                                        color="error"
                                        sx={{ display: "block" }}
                                      >
                                        Occupied
                                      </Typography>
                                    ) : null}
                                  </Box>
                                </li>
                              );
                            }}
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
                              onChange={(e) =>
                                leadField.onChange(
                                  e.target.checked ? "true" : "false"
                                )
                              }
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
            >
              {mutation.isPending
                ? isEditMode
                  ? "Updating..."
                  : "Adding..."
                : isEditMode
                ? "Update Event"
                : "Add Event"}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </LocalizationProvider>
  );
}
