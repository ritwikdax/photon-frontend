"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Chip,
  Stack,
  Tooltip,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AssignmentIcon from "@mui/icons-material/Assignment";

interface EventData {
  date: string;
  venue: string;
  usersAssigned: string[];
  assignment: string;
}

// Sample events data - replace with your actual data source
const sampleEvents: EventData[] = [
  {
    date: "2025-10-15",
    venue: "Grand Ballroom",
    usersAssigned: ["John Doe", "Jane Smith"],
    assignment: "Wedding Photography",
  },
  {
    date: "2025-10-20",
    venue: "City Park",
    usersAssigned: ["Mike Johnson", "Sarah Lee"],
    assignment: "Pre-Wedding Shoot",
  },
  {
    date: "2025-10-25",
    venue: "Beach Resort",
    usersAssigned: ["Tom Brown", "Emily White", "Chris Green"],
    assignment: "Corporate Event",
  },
];

export default function EventsPage() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Get the first day of the month
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  };

  // Get the last day of the month
  const getLastDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  };

  // Get days to display in calendar
  const getCalendarDays = () => {
    const firstDay = getFirstDayOfMonth(currentDate);
    const lastDay = getLastDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    const startDayOfWeek = firstDay.getDay();
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
    }

    return days;
  };

  // Get events for a specific date
  const getEventsForDate = (date: Date | null) => {
    if (!date) return [];
    const dateStr = date.toISOString().split("T")[0];
    return sampleEvents.filter((event) => event.date === dateStr);
  };

  // Navigate to previous month
  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  // Navigate to next month
  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  // Check if date is today
  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const calendarDays = getCalendarDays();
  const monthName = currentDate.toLocaleDateString("en-US", { month: "long" });
  const year = currentDate.getFullYear();

  return (
    <Box sx={{ p: 3, maxWidth: "1400px", margin: "0 auto" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Events Calendar
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton onClick={handlePrevMonth} color="primary">
            <ChevronLeftIcon />
          </IconButton>
          <Typography variant="h6" sx={{ minWidth: "200px", textAlign: "center" }}>
            {monthName} {year}
          </Typography>
          <IconButton onClick={handleNextMonth} color="primary">
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Calendar Grid */}
      <Paper elevation={0} sx={{ p: 2 }}>
        {/* Days of week header */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 1,
            mb: 1,
          }}
        >
          {daysOfWeek.map((day) => (
            <Box
              key={day}
              sx={{
                textAlign: "center",
                py: 1,
                fontWeight: "bold",
                color: "text.secondary",
              }}
            >
              <Typography variant="subtitle2">{day}</Typography>
            </Box>
          ))}
        </Box>

        {/* Calendar days */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 1,
          }}
        >
          {calendarDays.map((day, index) => {
            const events = getEventsForDate(day);
            const hasEvents = events.length > 0;

            return (
              <Paper
                key={index}
                elevation={0}
                sx={{
                  minHeight: "80px",
                  p: 0.5,
                  border: "1px solid",
                  borderColor: day ? "divider" : "transparent",
                  bgcolor: day ? (isToday(day) ? "primary.50" : "background.paper") : "transparent",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {day && (
                  <>
                    {/* Date number */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        bgcolor: isToday(day) ? "primary.main" : "transparent",
                        color: isToday(day) ? "white" : "text.primary",
                        mb: 0.5,
                      }}
                    >
                      <Typography variant="caption" fontWeight={isToday(day) ? "bold" : "normal"}>
                        {day.getDate()}
                      </Typography>
                    </Box>

                    {/* Events */}
                    {hasEvents && (
                      <Stack spacing={0.3} sx={{ flex: 1, overflow: "hidden" }}>
                        {events.map((event, eventIndex) => (
                          <Tooltip
                            key={eventIndex}
                            title={
                              <Box>
                                <Typography variant="body2" fontWeight="bold">
                                  {event.assignment}
                                </Typography>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.5 }}>
                                  <LocationOnIcon fontSize="small" />
                                  <Typography variant="caption">{event.venue}</Typography>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.5 }}>
                                  <AssignmentIcon fontSize="small" />
                                  <Typography variant="caption">
                                    {event.usersAssigned.join(", ")}
                                  </Typography>
                                </Box>
                              </Box>
                            }
                            arrow
                          >
                            <Chip
                              label={event.assignment}
                              size="small"
                              color="primary"
                              sx={{
                                fontSize: "0.65rem",
                                height: "18px",
                                "& .MuiChip-label": {
                                  px: 0.5,
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                },
                              }}
                            />
                          </Tooltip>
                        ))}
                      </Stack>
                    )}
                  </>
                )}
              </Paper>
            );
          })}
        </Box>
      </Paper>

      {/* Legend */}
      <Box sx={{ mt: 3, display: "flex", gap: 3, justifyContent: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              bgcolor: "primary.main",
            }}
          />
          <Typography variant="body2">Today</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Chip label="Event" size="small" color="primary" />
          <Typography variant="body2">Scheduled Events</Typography>
        </Box>
      </Box>
    </Box>
  );
}
