"use client";
import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";

interface CalendarEventProps {
  startDateTime: Date;
  endDateTime: Date;
  venue: string;
  color?: string;
}

export const CalendarEvent: React.FC<CalendarEventProps> = ({
  startDateTime,
  endDateTime,
  venue,
  color = "#1976d2",
}) => {
  // Format date to readable format
  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  // Format time to 12-hour format
  const formatTime = (date: Date): string => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const hour12 = hours % 12 || 12;
    const minutesStr = minutes.toString().padStart(2, "0");
    return `${hour12}:${minutesStr} ${ampm}`;
  };

  // Calculate duration
  const calculateDuration = (): string => {
    const diffMs = endDateTime.getTime() - startDateTime.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays}d ${diffHours % 24}h`;
    } else if (diffHours > 0) {
      return `${diffHours}h ${diffMinutes}m`;
    } else {
      return `${diffMinutes}m`;
    }
  };

  // Check if it's a multi-day event
  const isMultiDay =
    startDateTime.toDateString() !== endDateTime.toDateString();

  // Get day of month for the calendar icon
  const getDayOfMonth = (date: Date): string => {
    return date.getDate().toString();
  };

  const getMonthShort = (date: Date): string => {
    return date.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
  };

  return (
    <Box sx={{ marginTop: "24px" }}>
      <Grid container spacing={2}>
        <Grid size={6}>
          {/* Start Date & Time */}
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
            <EventIcon sx={{ fontSize: 20, color: color, mt: 0.2 }} />
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  fontWeight: 600,
                  display: "block",
                  mb: 0.3,
                }}
              >
                Event Date
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.primary", fontWeight: 500 }}
              >
                {formatDate(startDateTime)}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: color, fontWeight: 600 }}
              >
                {formatTime(startDateTime)}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid size={6}>
          {/* Start Date & Time */}
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
            <LocationOnIcon sx={{ fontSize: 20, color: color }} />
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  fontWeight: 600,
                  display: "block",
                  mb: 0.3,
                }}
              >
                Location:
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.primary", fontWeight: 500 }}
              >
                {venue}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CalendarEvent;
