'use client';

import { 
    Box, 
    IconButton, 
    Typography, 
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Skeleton
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useState, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useProjects from "../queries/useAllProjects";
import useAllEvents from "../queries/useAllEvents";
import useUpdateMutationById from "../mutations/useUpdateMutationById";
import EventCell from "./EventCell";
import type { Project, Event } from "../interfaces/data/interface";

interface ThreeDayCalendarProps {
    onDateRangeChange?: (startDate: Date, endDate: Date) => void;
    onEventClick?: (event: Event) => void;
}

interface ProjectWithEvents {
    project: Project;
    events: Event[];
}

export default function ThreeDayCalendar({ onDateRangeChange, onEventClick }: ThreeDayCalendarProps) {
    const [startDate, setStartDate] = useState<Date>(new Date());
    const { data: projects, isLoading: projectsLoading } = useProjects();
    const { data: allEvents, isLoading: eventsLoading } = useAllEvents();
    const queryClient = useQueryClient();
    
    const updateEventMutation = useUpdateMutationById("events", () => {
        // Invalidate all events queries on success
        queryClient.invalidateQueries({ queryKey: ["all_events"] });
    });

    const handleAddTeamMember = async (eventId: string, employeeId: string) => {
        // Find the event to get its current team
        const event = allEvents?.find((e: Event) => e.id === eventId);
        if (!event) return;

        // Add the new team member to the team array
        const updatedTeam = [
            ...(event.team || []),
            { employeeId, isLead: 'false' }
        ];

        // Update the event with the new team
        try {
            await updateEventMutation.mutateAsync({
                id: eventId,
                team: updatedTeam
            });
        } catch (error) {
            console.error('Failed to add team member:', error);
        }
    };

    const handleRemoveTeamMember = async (eventId: string, employeeId: string) => {
        // Find the event to get its current team
        const event = allEvents?.find((e: Event) => e.id === eventId);
        if (!event) return;

        // Remove the team member from the team array
        const updatedTeam = (event.team || []).filter(
            (member: { employeeId: string; isLead: string }) => member.employeeId !== employeeId
        );

        // Update the event with the new team
        try {
            await updateEventMutation.mutateAsync({
                id: eventId,
                team: updatedTeam
            });
        } catch (error) {
            console.error('Failed to remove team member:', error);
        }
    };

    // Get array of 3 consecutive days starting from startDate
    const getDays = () => {
        const days = [];
        for (let i = 0; i < 3; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            days.push(date);
        }
        return days;
    };

    const handlePrevious = () => {
        const newDate = new Date(startDate);
        newDate.setDate(startDate.getDate() - 1);
        setStartDate(newDate);
        if (onDateRangeChange) {
            const endDate = new Date(newDate);
            endDate.setDate(newDate.getDate() + 2);
            onDateRangeChange(newDate, endDate);
        }
    };

    const handleNext = () => {
        const newDate = new Date(startDate);
        newDate.setDate(startDate.getDate() + 1);
        setStartDate(newDate);
        if (onDateRangeChange) {
            const endDate = new Date(newDate);
            endDate.setDate(newDate.getDate() + 2);
            onDateRangeChange(newDate, endDate);
        }
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
        });
    };

    const isToday = (date: Date) => {
        const today = new Date();
        return date.toDateString() === today.toDateString();
    };

    const isSameDay = (date1: Date, date2: Date) => {
        return date1.toDateString() === date2.toDateString();
    };

    const days = getDays();

    // Filter projects and events based on the selected date range
    const filteredData = useMemo((): ProjectWithEvents[] => {
        if (!projects || !allEvents) return [];

        const startDateOnly = new Date(startDate);
        startDateOnly.setHours(0, 0, 0, 0);
        
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 2);
        endDate.setHours(23, 59, 59, 999);

        // Filter events that fall within the date range
        const eventsInRange = allEvents.filter((event: Event) => {
            const eventDate = new Date(event.eventDate);
            eventDate.setHours(0, 0, 0, 0);
            return eventDate >= startDateOnly && eventDate <= endDate;
        });

        // Group events by projectId
        const eventsByProject = eventsInRange.reduce((acc: Record<string, Event[]>, event: Event) => {
            if (!acc[event.projectId]) {
                acc[event.projectId] = [];
            }
            acc[event.projectId].push(event);
            return acc;
        }, {});

        // Filter projects that have events in the date range
        const projectsWithEvents = projects.filter((project: Project) => 
            eventsByProject[project.id]
        );

        return projectsWithEvents.map((project: Project): ProjectWithEvents => ({
            project,
            events: eventsByProject[project.id] || []
        }));
    }, [projects, allEvents, startDate]);

    // Get events for a specific project and day
    const getEventsForDay = (projectId: string, day: Date): Event[] => {
        const projectData = filteredData.find((data: ProjectWithEvents) => data.project.id === projectId);
        if (!projectData) return [];

        return projectData.events.filter((event: Event) => {
            const eventDate = new Date(event.eventDate);
            return isSameDay(eventDate, day);
        });
    };

    // Get ALL events for a specific day (across all projects)
    const getAllEventsForDay = (day: Date): Event[] => {
        if (!allEvents) return [];
        
        return allEvents.filter((event: Event) => {
            const eventDate = new Date(event.eventDate);
            return isSameDay(eventDate, day);
        });
    };

    if (projectsLoading || eventsLoading) {
        return (
            <Box sx={{ width: '100%', height: '100%', p: 2, display: 'flex', flexDirection: 'column' }}>
                <Skeleton variant="rectangular" height={60} sx={{ mb: 2 }} />
                <Skeleton variant="rectangular" sx={{ flex: 1 }} />
            </Box>
        );
    }

    return (
        <Box sx={{ 
            width: '100%', 
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            p: 2,
            overflow: 'hidden'
        }}>
            {/* Navigation Header */}
            <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mb: 2,
                gap: 2,
                flexShrink: 0
            }}>
                <IconButton 
                    onClick={handlePrevious}
                    sx={{ 
                        border: '1px solid',
                        borderColor: 'divider'
                    }}
                >
                    <ChevronLeft />
                </IconButton>
                
                <Typography variant="h6" sx={{ minWidth: 200, textAlign: 'center' }}>
                    {formatDate(days[0])} - {formatDate(days[2])}
                </Typography>
                
                <IconButton 
                    onClick={handleNext}
                    sx={{ 
                        border: '1px solid',
                        borderColor: 'divider'
                    }}
                >
                    <ChevronRight />
                </IconButton>
            </Box>

            {/* Table Structure */}
            <TableContainer 
                component={Paper} 
                elevation={0}
                sx={{ 
                    flex: 1,
                    overflow: 'auto',
                    border: '1px solid',
                    borderColor: 'divider',
                    maxHeight: 'calc(100vh - 120px)' // Ensure scrollability
                }}
            >
                <Table 
                    sx={{ 
                        minWidth: 650,
                        tableLayout: 'fixed'
                    }} 
                    stickyHeader
                    size="small"
                >
                    <TableHead>
                        <TableRow sx={{ backgroundColor: 'primary.main' }}>
                            <TableCell 
                                sx={{ 
                                    fontWeight: 'bold',
                                    color: 'white',
                                    minWidth: 250,
                                    width: '20%',
                                    borderRight: '1px solid rgba(224, 224, 224, 1)',
                                    backgroundColor: 'primary.main',
                                    position: 'sticky',
                                    top: 0,
                                    zIndex: 10
                                }}
                            >
                                Project
                            </TableCell>
                            {days.map((day, index) => (
                                <TableCell 
                                    key={index}
                                    align="center"
                                    sx={{ 
                                        fontWeight: 'bold',
                                        color: 'white',
                                        width: '26.67%',
                                        backgroundColor: isToday(day) ? 'primary.dark' : 'primary.main',
                                        borderRight: index < 2 ? '1px solid rgba(224, 224, 224, 1)' : 'none',
                                        position: 'sticky',
                                        top: 0,
                                        zIndex: 10
                                    }}
                                >
                                    <Box>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                            {formatDate(day)}
                                        </Typography>
                                        <Typography variant="h5">
                                            {day.getDate()}
                                        </Typography>
                                    </Box>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData && filteredData.length > 0 ? (
                            filteredData.map(({ project, events }: ProjectWithEvents) => (
                                <TableRow 
                                    key={project.id}
                                    sx={{ 
                                        '&:hover': { backgroundColor: 'action.hover' }
                                    }}
                                >
                                    <TableCell 
                                        component="th" 
                                        scope="row"
                                        sx={{ 
                                            borderRight: '1px solid',
                                            borderColor: 'divider',
                                            fontWeight: 'medium',
                                            width: '20%',
                                            verticalAlign: 'middle',
                                            py: 1.5,
                                            px: 2
                                        }}
                                    >
                                        <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>
                                            {project.name}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {project.bookingCategory}
                                        </Typography>
                                    </TableCell>
                                    {days.map((day, index) => {
                                        const dayEvents = getEventsForDay(project.id, day);
                                        const event = dayEvents[0]; // Only get the first event
                                        const allDayEvents = getAllEventsForDay(day); // Get all events for this day
                                        return (
                                            <TableCell 
                                                key={index}
                                                align="left"
                                                sx={{ 
                                                    backgroundColor: isToday(day) ? 'action.hover' : 'transparent',
                                                    borderRight: index < 2 ? '1px solid' : 'none',
                                                    borderColor: 'divider',
                                                    width: '26.67%',
                                                    verticalAlign: 'middle',
                                                    py: 1.5,
                                                    px: 2
                                                }}
                                            >
                                                <EventCell 
                                                    event={event} 
                                                    isToday={isToday(day)}
                                                    onAddTeamMember={handleAddTeamMember}
                                                    onRemoveTeamMember={handleRemoveTeamMember}
                                                    allEventsForDay={allDayEvents}
                                                    onEventClick={onEventClick}
                                                />
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                                    <Typography color="text.secondary">
                                        No projects with events in this date range
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
