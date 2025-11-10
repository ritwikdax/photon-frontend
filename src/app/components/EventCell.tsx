import { Box, Typography, Chip, Paper, IconButton, Popover, TextField, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import type { Event, Employee } from "../interfaces/data/interface";
import { useEmployeesLookupMap } from "../queries/lookup/useEmployeesLookupMap";
import useEmployees from "../queries/useEmployees";

interface EventCellProps {
    event: Event | null;
    isToday: boolean;
    onAddTeamMember?: (eventId: string, employeeId: string) => void;
    onRemoveTeamMember?: (eventId: string, employeeId: string) => void;
    allEventsForDay?: Event[]; // All events for the same day
    onEventClick?: (event: Event) => void;
}

const getStatusColor = (status: string) => {
    switch (status) {
        case 'upcoming': return 'primary';
        case 'in_progress': return 'warning';
        case 'done': return 'success';
        case 'cancelled': return 'error';
        case 'postponed': return 'default';
        default: return 'default';
    }
};

const formatTimeTo12Hour = (time24: string): string => {
    if (!time24) return '';
    
    // Parse the time (handles formats like "20:00", "20:00:00", or "8:00")
    const timeParts = time24.split(':');
    let hours = parseInt(timeParts[0], 10);
    const minutes = timeParts[1] || '00';
    
    // Determine AM/PM
    const period = hours >= 12 ? 'PM' : 'AM';
    
    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12
    
    return `${hours}:${minutes} ${period}`;
};

export default function EventCell({ event, isToday, onAddTeamMember, onRemoveTeamMember, allEventsForDay = [], onEventClick }: EventCellProps) {
    const { data: employeeLookup } = useEmployeesLookupMap();
    const { data: allEmployees } = useEmployees();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [removingEmployeeId, setRemovingEmployeeId] = useState<string | null>(null);
    
    if (!event) return null;

    // Get team member names
    const teamMembers = event.team?.map(member => {
        const employee = employeeLookup?.get(member.employeeId);
        return employee ? {
            id: member.employeeId,
            name: employee.name,
            isLead: member.isLead === 'true' || member.isLead === '1'
        } : null;
    }).filter(Boolean) || [];

    // Get IDs of employees already assigned to ANY event on this day
    const assignedEmployeeIdsForDay = new Set<string>();
    allEventsForDay.forEach((dayEvent: Event) => {
        dayEvent.team?.forEach(member => {
            assignedEmployeeIdsForDay.add(member.employeeId);
        });
    });

    // Filter employees based on search query and exclude already assigned for the day
    const filteredEmployees = allEmployees?.filter((emp: Employee) => 
        !assignedEmployeeIdsForDay.has(emp.id) &&
        emp.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation(); // Prevent triggering the cell click
        setAnchorEl(event.currentTarget);
    };

    const handleClosePopover = () => {
        setAnchorEl(null);
        setSearchQuery("");
    };

    const handleSelectEmployee = (employeeId: string, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent triggering the cell click
        if (onAddTeamMember) {
            onAddTeamMember(event.id, employeeId);
        }
        handleClosePopover();
    };

    const handleRemoveEmployee = async (employeeId: string, e?: React.MouseEvent) => {
        e?.stopPropagation(); // Prevent triggering the cell click
        if (onRemoveTeamMember && !removingEmployeeId) {
            setRemovingEmployeeId(employeeId);
            try {
                await onRemoveTeamMember(event.id, employeeId);
            } finally {
                // Reset after a short delay to allow the UI to update
                setTimeout(() => setRemovingEmployeeId(null), 500);
            }
        }
    };

    const handleCellClick = () => {
        if (onEventClick && event) {
            onEventClick(event);
        }
    };

    const open = Boolean(anchorEl);

    return (
        <Paper 
            elevation={2}
            onClick={handleCellClick}
            sx={{ 
                p: 1,
                borderLeft: 3,
                borderLeftColor: `${getStatusColor(event.status)}.main`,
                position: 'relative',
                cursor: onEventClick ? 'pointer' : 'default',
                '&:hover': onEventClick ? {
                    boxShadow: 4,
                    transform: 'translateY(-1px)',
                    transition: 'all 0.2s ease-in-out'
                } : {}
            }}
        >
            <IconButton
                size="small"
                onClick={handleOpenPopover}
                sx={{
                    position: 'absolute',
                    bottom: 4,
                    right: 4,
                    width: 20,
                    height: 20,
                    padding: 0,
                    backgroundColor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: 'primary.dark'
                    }
                }}
            >
                <AddIcon sx={{ fontSize: 14 }} />
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    {formatTimeTo12Hour(event.eventStartTime)}
                </Typography>
                <Chip 
                    label={event.status}
                    color={getStatusColor(event.status) as any}
                    size="small"
                    sx={{ height: 18, fontSize: '0.6rem', fontWeight: 500 }}
                />
            </Box>
            {event.assignment && (
                <Typography variant="caption" sx={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, mb: 0.5 }}>
                    {event.assignment}
                </Typography>
            )}
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontSize: '0.7rem' }}>
                {event.venue}
            </Typography>
            {teamMembers.length > 0 && (
                <Box sx={{ mt: 0.5 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem', display: 'block', mb: 0.25 }}>
                        Team:
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {teamMembers.map((member: any, index: number) => (
                            <Chip
                                key={index}
                                label={member.name}
                                size="small"
                                color={member.isLead ? "primary" : "default"}
                                variant={member.isLead ? "filled" : "outlined"}
                                onDelete={(e) => handleRemoveEmployee(member.id, e)}
                                disabled={removingEmployeeId === member.id}
                                sx={{ 
                                    height: 20, 
                                    fontSize: '0.65rem',
                                    opacity: removingEmployeeId === member.id ? 0.5 : 1,
                                    transition: 'opacity 0.2s'
                                }}
                            />
                        ))}
                    </Box>
                </Box>
            )}
            <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                {event.photographerCount > 0 && (
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
                        P: {event.photographerCount}
                    </Typography>
                )}
                {event.videographerCount > 0 && (
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
                        V: {event.videographerCount}
                    </Typography>
                )}
                {event.droneOperatorCount > 0 && (
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
                        D: {event.droneOperatorCount}
                    </Typography>
                )}
                {event.lightmanCount > 0 && (
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
                        L: {event.lightmanCount}
                    </Typography>
                )}
                {event.helperCount > 0 && (
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
                        H: {event.helperCount}
                    </Typography>
                )}
            </Box>
            
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClosePopover}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <Box sx={{ p: 2, width: 300, maxHeight: 400 }} onClick={(e) => e.stopPropagation()}>
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="Search employees..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                        sx={{ mb: 1 }}
                    />
                    <List sx={{ maxHeight: 300, overflow: 'auto' }}>
                        {filteredEmployees.length > 0 ? (
                            filteredEmployees.map((employee: Employee) => (
                                <ListItem key={employee.id} disablePadding>
                                    <ListItemButton onClick={(e) => handleSelectEmployee(employee.id, e)}>
                                        <ListItemText 
                                            primary={employee.name}
                                            secondary={employee.expertise?.join(', ')}
                                            primaryTypographyProps={{ fontSize: '0.875rem' }}
                                            secondaryTypographyProps={{ fontSize: '0.75rem' }}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            ))
                        ) : (
                            <ListItem>
                                <ListItemText 
                                    primary="No employees found"
                                    primaryTypographyProps={{ fontSize: '0.875rem', color: 'text.secondary' }}
                                />
                            </ListItem>
                        )}
                    </List>
                </Box>
            </Popover>
        </Paper>
    );
}
