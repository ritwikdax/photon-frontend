"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import { CalendarMonth } from "@mui/icons-material";
import { Event as EventInterface } from "../interfaces/data/interface";
import Event from "./Event";

interface EventsProps {
  events: EventInterface[];
}

export const Events: React.FC<EventsProps> = ({ events }) => {
  return (
    <Box>
      {events.length === 0 ? (
        <Box
          sx={{
            backgroundColor: "background.paper",
            textAlign: "center",
            border: 1,
            borderRadius: 1,
            borderColor: "divider",
            p: 8,
          }}>
          <CalendarMonth sx={{ fontSize: 64, color: "text.disabled", mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No events has been added yet
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            height: "calc(100vh - 200px)",
            overflow: "scroll",
          }}>
          {events.map((event) => (
            <Event key={event.id} event={event} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Events;
