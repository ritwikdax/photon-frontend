"use client";
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Stack,
  Button,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PeopleIcon from "@mui/icons-material/People";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Event as EventInterface } from "../interfaces/data/interface";

interface EventProps extends Omit<EventInterface, 'id' | 'createdAt' | 'updatedAt'> {
  employees?: Map<string, { name: string }>;
}

export const Event: React.FC<EventProps> = ({
  projectId,
  startDateTime,
  endDateTime,
  venue,
  assignment,
  team,
  status,
  employees,
}) => {
  // Parse date to display in calendar format
  const parseDate = (date: Date) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleDateString("en-US", { month: "short" });
    const year = dateObj.getFullYear();
    return { day, month, year };
  };

  // Format time to display (e.g., "10:00 AM")
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "info";
      case "in_progress":
        return "warning";
      case "done":
        return "success";
      case "cancelled":
        return "error";
      case "postponed":
        return "default";
      default:
        return "default";
    }
  };

  // Get status label
  const getStatusLabel = (status: string) => {
    return status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const { day, month, year } = parseDate(startDateTime);
  const startTime = formatTime(startDateTime);
  const endTime = formatTime(endDateTime);

  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        width: "200px",
        minWidth: "250px",
        flex: "0 1 auto",
        position: "relative",
        height: "auto",
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Status Badge */}
          <Box sx={{ position: "absolute", top: 8, right: 8 }}>
            <Chip
              label={getStatusLabel(status)}
              color={getStatusColor(status)}
              size="small"
              sx={{ fontSize: "0.65rem", height: "20px" }}
            />
          </Box>

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

          {/* Time Range */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AccessTimeIcon color="action" fontSize="small" />
            <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
              {startTime} - {endTime}
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

          {/* Team Assigned */}
          <Box>
            {team?.length === 0 ? (
              <Button
                variant="outlined"
                color="primary"
                size="small"
                fullWidth
                sx={{ mt: 1 }}
              >
                Assign Team
              </Button>
            ) : (
              <>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <PeopleIcon color="action" fontSize="small" />
                  <Typography variant="body2" fontWeight="bold">
                    Team:
                  </Typography>
                </Box>
                <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                  {team?.slice(0, 3).map((member, index) => {
                    const employeeName = employees?.get(member.employeeId)?.name || member.employeeId;
                    const isLead = member.isLead === "true" || member.isLead === "1";
                    return (
                      <Chip
                        key={index}
                        label={isLead ? `${employeeName} (Lead)` : employeeName}
                        size="medium"
                        color={isLead ? "secondary" : "primary"}
                        variant="outlined"
                        sx={{ fontSize: "0.75rem", height: "24px" }}
                      />
                    );
                  })}
                  {team?.length > 3 && (
                    <Chip
                      label={`+${team.length - 3}`}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: "0.75rem", height: "24px" }}
                    />
                  )}
                </Stack>
              </>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Event;
