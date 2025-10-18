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
        // <Box
        //   sx={{
        //     backgroundColor:"ButtonFace",
        //     display: "flex",
        //     flexDirection: "column",
        //     gap: 2,
        //     height: "calc(100vh - 600px)",
        //     overflow: "scroll",
        //   }}
        // >
        //   {events.map((event, index) => (
        //     <Event
        //       key={event.id}
        //       id={event.id}
        //       projectId={event.projectId}
        //       startDateTime={event.startDateTime}
        //       endDateTime={event.endDateTime}
        //       venue={event.venue}
        //       assignment={event.assignment}
        //       team={event.team}
        //       status={event.status}
        //       employees={employees}
        //     />
        //   ))}
        // </Box>
          <Box
          // sx={{
          //   backgroundColor:"ButtonFace",
          //   display: "flex",
          //   flexDirection: "column",
          //   gap: 2,
          //   height: "calc(100vh - 600px)",
          //   overflow: "scroll",
          // }}
                    sx={{
            // display: "flex",
            // flexDirection: "column",
            // gap: 2,
            height: "calc(100vh - 200px)",
            overflow: "scroll",
          }}
        >
          {events.map((event, index) => (
            <Event
              key={event.id}
              id={event.id}
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
