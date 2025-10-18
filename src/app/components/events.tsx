"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import { Event as EventInterface } from "../interfaces/data/interface";
import Event from "./Event";

interface EventsProps {
  events: EventInterface[];
  employees?: Map<string, { name: string }>;
}

export const Events: React.FC<EventsProps> = ({ events, employees }) => {
  return (
    <Box sx={{ p: 2 }}>
      {/* <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Events
      </Typography> */}
      {events.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No events available.
        </Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {events.map((event, index) => (
            <Event
              key={index}
              projectId={event.projectId}
              startDateTime={event.startDateTime}
              endDateTime={event.endDateTime}
              venue={event.venue}
              assignment={event.assignment}
              team={event.team}
              status={event.status}
              employees={employees}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Events;
