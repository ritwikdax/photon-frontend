"use client";
import React from "react";
import { Box, Container, Typography } from "@mui/material";
import MonthlyCalendar from "./MonthlyCalendar";
import { Event } from "../interfaces/data/interface";

/**
 * Example usage of the MonthlyCalendar component
 * This demonstrates how to use the calendar with sample event data
 */
export const MonthlyCalendarExample: React.FC = () => {
  // Sample events data
  const sampleEvents: Event[] = [
    {
      id: "1",
      projectId: "proj-001",
      startDateTime: new Date(2025, 9, 20, 10, 0), // Oct 20, 2025, 10:00 AM
      endDateTime: new Date(2025, 9, 20, 14, 0), // Oct 20, 2025, 2:00 PM
      venue: "Grand Hotel Ballroom",
      assignment: "Wedding Photography",
      team: [
        { employeeId: "emp-001", isLead: "true" },
        { employeeId: "emp-002", isLead: "false" },
      ],
      status: "upcoming",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      projectId: "proj-002",
      startDateTime: new Date(2025, 9, 20, 10, 0), // Oct 20, 2025, 10:00 AM
      endDateTime: new Date(2025, 9, 20, 14, 0), // Oct 20, 2025, 2:00 PM
      venue: "Beach Resort",
      assignment: "Pre-wedding Shoot",
      team: [{ employeeId: "emp-003", isLead: "true" }],
      status: "in_progress",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "3",
      projectId: "proj-003",
      startDateTime: new Date(2025, 9, 20, 10, 0), // Oct 20, 2025, 10:00 AM
      endDateTime: new Date(2025, 9, 20, 14, 0), // Oct 20, 2025, 2:00 PM
      venue: "Corporate Office",
      assignment: "Corporate Event",
      team: [
        { employeeId: "emp-001", isLead: "true" },
        { employeeId: "emp-004", isLead: "false" },
      ],
      status: "upcoming",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "4",
      projectId: "proj-004",
      startDateTime: new Date(2025, 9, 20, 10, 0), // Oct 20, 2025, 10:00 AM
      endDateTime: new Date(2025, 9, 20, 14, 0), // Oct 20, 2025, 2:00 PM
      venue: "City Park",
      assignment: "Birthday Party",
      team: [{ employeeId: "emp-002", isLead: "true" }],
      status: "done",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "5",
      projectId: "proj-005",
      startDateTime: new Date(2025, 9, 28, 10, 0), // Oct 28, 2025, 10:00 AM
      endDateTime: new Date(2025, 9, 29, 14, 0), // Oct 29, 2025, 2:00 PM (Multi-day event)
      venue: "Mountain Resort",
      assignment: "Destination Wedding",
      team: [
        { employeeId: "emp-001", isLead: "true" },
        { employeeId: "emp-002", isLead: "false" },
        { employeeId: "emp-003", isLead: "false" },
      ],
      status: "upcoming",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "6",
      projectId: "proj-006",
      startDateTime: new Date(2025, 9, 18, 8, 0), // Oct 18, 2025, 8:00 AM
      endDateTime: new Date(2025, 9, 18, 10, 0), // Oct 18, 2025, 10:00 AM
      venue: "Studio A",
      assignment: "Product Shoot",
      team: [{ employeeId: "emp-004", isLead: "true" }],
      status: "cancelled",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  // Handle event click
  const handleEventClick = (event: Event) => {
    console.log("Event clicked:", event);
    // You can open a dialog, navigate to event details, etc.
    alert(`Event: ${event.assignment}\nVenue: ${event.venue}\nStatus: ${event.status}`);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Event Calendar
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        View and manage all your events in a monthly calendar view
      </Typography>
      
      <MonthlyCalendar events={sampleEvents} onEventClick={handleEventClick} />
    </Container>
  );
};

export default MonthlyCalendarExample;
