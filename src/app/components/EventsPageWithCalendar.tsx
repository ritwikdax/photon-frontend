"use client";
import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Paper,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ViewListIcon from "@mui/icons-material/ViewList";
import MonthlyCalendar from "../components/MonthlyCalendar";
import { Event } from "../components/Event";
import useGenericQueries from "../queries/useGenericQueries";
import { Event as EventInterface } from "../interfaces/data/interface";

/**
 * Events page with Calendar and List view toggle
 * This demonstrates integration of MonthlyCalendar with existing events functionality
 */
export default function EventsPageWithCalendar() {
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar");
  
  // Fetch events and employees data
  const { data: events = [], isLoading: eventsLoading } = useGenericQueries<EventInterface[]>("events");

  const handleViewChange = (
    event: React.MouseEvent<HTMLElement>,
    newView: "calendar" | "list" | null
  ) => {
    if (newView !== null) {
      setViewMode(newView);
    }
  };

  const handleEventClick = (event: EventInterface) => {
    // You can implement custom logic here
    // For example: open a dialog with event details
    console.log("Event clicked:", event);
  };

  const isLoading = eventsLoading;

  if (isLoading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography>Loading events...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Page Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" gutterBottom>
            Events
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {events.length} event{events.length !== 1 ? "s" : ""} scheduled
          </Typography>
        </Box>

        {/* View Toggle */}
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={handleViewChange}
          aria-label="view mode"
          size="small"
        >
          <ToggleButton value="calendar" aria-label="calendar view">
            <CalendarMonthIcon sx={{ mr: 1 }} />
            Calendar
          </ToggleButton>
          <ToggleButton value="list" aria-label="list view">
            <ViewListIcon sx={{ mr: 1 }} />
            List
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Content */}
      {viewMode === "calendar" ? (
        <MonthlyCalendar events={events} onEventClick={handleEventClick} />
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {events.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: "center" }}>
              <Typography color="text.secondary">
                No events scheduled
              </Typography>
            </Paper>
          ) : (
            events.map((event: EventInterface) => (
              <Event key={event.id} event={event} />
            ))
          )}
        </Box>
      )}
    </Container>
  );
}
