"use client";
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Stack,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PeopleIcon from "@mui/icons-material/People";

interface EventProps {
  date: string;
  venue: string;
  usersAssigned: string[];
  assignment: string;
}

interface EventsProps {
  events: EventProps[];
}

export const Event: React.FC<EventProps> = ({
  date,
  venue,
  usersAssigned,
  assignment,
}) => {
  // Parse date to display in calendar format
  const parseDate = (dateString: string) => {
    const dateObj = new Date(dateString);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleDateString("en-US", { month: "short" });
    const year = dateObj.getFullYear();
    return { day, month, year };
  };

  const { day, month, year } = parseDate(date);

  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        aspectRatio: "1",
        width: "200px",
        minWidth: "250px",
        flex: "0 1 auto",
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, height: "100%" }}>
          {/* Date - Calendar Style */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "primary.main",
              color: "white",
              borderRadius: 1,
              p: 1,
              minHeight: "80px",
            }}
          >
            <Typography variant="caption" sx={{ fontSize: "0.7rem" }}>
              {month} {year}
            </Typography>
            <Typography variant="h3" fontWeight="bold" sx={{ lineHeight: 1 }}>
              {day}
            </Typography>
          </Box>

          {/* Venue */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LocationOnIcon color="secondary" fontSize="small" />
            <Typography variant="body2" color="text.secondary" noWrap>
              {venue}
            </Typography>
          </Box>

          {/* Assignment */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AssignmentIcon color="action" fontSize="small" />
            <Typography variant="body2" noWrap>
              {assignment}
            </Typography>
          </Box>

          {/* Users Assigned */}
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <PeopleIcon color="action" fontSize="small" />
              <Typography variant="body2" fontWeight="bold">
                Assigned:
              </Typography>
            </Box>
            <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
              {usersAssigned.slice(0, 3).map((user, index) => (
                <Chip
                  key={index}
                  label={user}
                  size="medium"
                  color="primary"
                  variant="outlined"
                  sx={{ fontSize: "0.75rem", height: "24px" }}
                />
              ))}
              {usersAssigned.length > 3 && (
                <Chip
                  label={`+${usersAssigned.length - 3}`}
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: "0.75rem", height: "24px" }}
                />
              )}
            </Stack>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export const Events: React.FC<EventsProps> = ({ events }) => {
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
              date={event.date}
              venue={event.venue}
              usersAssigned={event.usersAssigned}
              assignment={event.assignment}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Events;
