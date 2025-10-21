"use client";
import React, { useMemo, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Chip,
  Tooltip,
  Stack,
  useTheme,
  alpha,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Event } from "../interfaces/data/interface";

interface MonthlyCalendarProps {
  events: Event[];
  onEventClick?: (event: Event) => void;
}

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  events: Event[];
}

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const STATUS_COLORS: Record<Event["status"], string> = {
  upcoming: "#2196F3",
  in_progress: "#FF9800",
  done: "#4CAF50",
  cancelled: "#F44336",
  postponed: "#9E9E9E",
};

export const MonthlyCalendar: React.FC<MonthlyCalendarProps> = ({
  events,
  onEventClick,
}) => {
  const theme = useTheme();
  const [currentDate, setCurrentDate] = useState(new Date());

  // Navigate to previous month
  const handlePreviousMonth = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  // Navigate to next month
  const handleNextMonth = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  // Check if an event occurs on a specific day
  const getEventsForDay = (day: Date): Event[] => {
    const dayStart = new Date(day);
    dayStart.setHours(0, 0, 0, 0);

    const dayEnd = new Date(day);
    dayEnd.setHours(23, 59, 59, 999);

    return events.filter((event) => {
      const eventStart = new Date(event.startDateTime);
      const eventEnd = new Date(event.endDateTime);

      // Event starts on this day
      const startsOnDay =
        eventStart >= dayStart && eventStart <= dayEnd;

      // Event ends on this day
      const endsOnDay =
        eventEnd >= dayStart && eventEnd <= dayEnd;

      // Event spans across this day
      const spansDay =
        eventStart < dayStart && eventEnd > dayEnd;

      return startsOnDay || endsOnDay || spansDay;
    });
  };

  // Get calendar days for the current month
  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);

    // Days to show from previous month
    const startDayOfWeek = firstDay.getDay();
    // Days to show from next month
    const endDayOfWeek = lastDay.getDay();

    const days: CalendarDay[] = [];

    // Add days from previous month
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonthLastDay - i);
      days.push({
        date,
        isCurrentMonth: false,
        events: getEventsForDay(date),
      });
    }

    // Add days from current month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      days.push({
        date,
        isCurrentMonth: true,
        events: getEventsForDay(date),
      });
    }

    // Add days from next month to complete the grid
    const remainingDays = 42 - days.length; // 6 rows * 7 days
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(year, month + 1, day);
      days.push({
        date,
        isCurrentMonth: false,
        events: getEventsForDay(date),
      });
    }

    return days;
  }, [currentDate, events]);

  // Check if a date is today
  const isToday = (date: Date): boolean => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Format month and year for header
  const monthYearText = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  // Format time
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 3,
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
        borderRadius: 3,
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        width: "100%",
        minWidth: "800px", // Ensures calendar has minimum width for proper display
      }}
    >
      {/* Calendar Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          px: 1,
        }}
      >
        <IconButton 
          onClick={handlePreviousMonth} 
          size="large"
          sx={{
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            "&:hover": {
              bgcolor: alpha(theme.palette.primary.main, 0.2),
              transform: "scale(1.05)",
            },
            transition: "all 0.2s ease-in-out",
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
        <Box sx={{ textAlign: "center" }}>
          <Typography 
            variant="h4" 
            fontWeight="700"
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {monthYearText}
          </Typography>
        </Box>
        <IconButton 
          onClick={handleNextMonth} 
          size="large"
          sx={{
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            "&:hover": {
              bgcolor: alpha(theme.palette.primary.main, 0.2),
              transform: "scale(1.05)",
            },
            transition: "all 0.2s ease-in-out",
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>

      {/* Days of Week Header */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          mb: 2,
          px: 0.5,
        }}
      >
        {DAYS_OF_WEEK.map((day) => (
          <Box
            key={day}
            sx={{
              textAlign: "center",
              py: 1.5,
              borderRadius: 1,
            }}
          >
            <Typography 
              variant="subtitle2" 
              fontWeight="700"
              sx={{
                color: theme.palette.primary.main,
                textTransform: "uppercase",
                letterSpacing: 1,
                fontSize: "0.75rem",
              }}
            >
              {day}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Calendar Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 1,
          gridAutoRows: "minmax(110px, auto)",
        }}
      >
        {calendarDays.map((day, index) => {
          const today = isToday(day.date);
          const hasEvents = day.events.length > 0;

          return (
            <Box
              key={index}
              sx={{
                minHeight: 110,
                borderRadius: 2,
                overflow: "hidden",
                position: "relative",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.15)}`,
                },
              }}
            >
              <Box
                sx={{
                  p: 1,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  bgcolor: day.isCurrentMonth
                    ? "background.paper"
                    : alpha(theme.palette.action.disabledBackground, 0.2),
                  boxShadow: hasEvents 
                    ? `0 2px 8px ${alpha(theme.palette.primary.main, 0.08)}`
                    : "none",
                }}
              >
                {/* Day Number */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    mb: 0.5,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: today ? "800" : day.isCurrentMonth ? "600" : "400",
                      bgcolor: today
                        ? theme.palette.primary.main
                        : hasEvents && day.isCurrentMonth
                        ? alpha(theme.palette.primary.main, 0.1)
                        : "transparent",
                      color: today
                        ? theme.palette.primary.contrastText
                        : day.isCurrentMonth
                        ? theme.palette.text.primary
                        : theme.palette.text.disabled,
                      borderRadius: "50%",
                      width: 28,
                      height: 28,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.875rem",
                      boxShadow: today 
                        ? `0 2px 8px ${alpha(theme.palette.primary.main, 0.4)}`
                        : "none",
                    }}
                  >
                    {day.date.getDate()}
                  </Typography>
                </Box>

                {/* Events */}
                <Stack spacing={0.5} sx={{ flex: 1, overflow: "hidden" }}>
                  {day.events.map((event, eventIndex) => {
                    const eventStart = new Date(event.startDateTime);
                    const eventEnd = new Date(event.endDateTime);
                    const isMultiDay =
                      eventStart.toDateString() !== eventEnd.toDateString();

                    return (
                      <Tooltip
                        key={event.id}
                        title={
                          <Box sx={{ p: 0.5 }}>
                            <Typography variant="body2" fontWeight="bold" sx={{ mb: 0.5 }}>
                              {event.assignment || "Event"}
                            </Typography>
                            <Typography variant="caption" sx={{ display: "block", mb: 0.5 }}>
                              ⏰ {formatTime(eventStart)} - {formatTime(eventEnd)}
                            </Typography>
                            <Typography variant="caption" sx={{ display: "block", mb: 0.5 }}>
                              📍 {event.venue}
                            </Typography>
                            <Chip 
                              label={event.status}
                              size="small"
                              sx={{
                                height: 18,
                                fontSize: "0.65rem",
                                bgcolor: alpha(STATUS_COLORS[event.status], 0.2),
                                color: STATUS_COLORS[event.status],
                                mt: 0.5,
                              }}
                            />
                          </Box>
                        }
                        arrow
                        placement="top"
                      >
                        <Box
                          onClick={() => onEventClick?.(event)}
                          sx={{
                            fontSize: "0.7rem",
                            py: 0.5,
                            px: 0.75,
                            bgcolor: alpha(STATUS_COLORS[event.status], 0.15),
                            color: STATUS_COLORS[event.status],
                            borderLeft: `3px solid ${STATUS_COLORS[event.status]}`,
                            borderRadius: 1,
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            fontWeight: 600,
                            "&:hover": {
                              bgcolor: alpha(STATUS_COLORS[event.status], 0.25),
                              transform: "translateX(2px)",
                              boxShadow: `0 2px 6px ${alpha(STATUS_COLORS[event.status], 0.3)}`,
                            },
                          }}
                        >
                          {event.assignment || "Event"}
                        </Box>
                      </Tooltip>
                    );
                  })}
                  {/* {day.events.length > 3 && (
                    <Box
                      sx={{
                        textAlign: "center",
                        py: 0.5,
                        px: 0.75,
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        borderRadius: 1,
                        border: `1px dashed ${alpha(theme.palette.primary.main, 0.3)}`,
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          color: theme.palette.primary.main,
                          fontSize: "0.7rem",
                          fontWeight: 600,
                        }}
                      >
                        +{day.events.length - 3} more
                      </Typography>
                    </Box>
                  )} */}
                </Stack>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
};

export default MonthlyCalendar;
