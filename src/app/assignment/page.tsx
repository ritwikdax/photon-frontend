"use client";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import ThreeDayCalendar from "../components/ThreeDayCalendar";
import { Event } from "../interfaces/data/interface";
import useGenericQueries from "../queries/useGenericQueries";
import { useProjectSelected } from "../hooks/useProjectSelected";

export default function TeamAssignmentPage() {
    const { data: projects } = useGenericQueries<any[]>("projects");
    const { setSelectedProject } = useProjectSelected();
    const router = useRouter();

    const handleEventClick = (event: Event) => {
        console.log("Event clicked:", event);
        
        // Find the project associated with this event
        const project = projects?.find((p) => p.id === event.projectId);
        
        if (project) {
            // Set the selected project in context
            setSelectedProject(project);
            
            // Redirect to the project page
            router.push(`/project#${event.id}`);
        } else {
            console.warn("Project not found for event:", event.projectId);
        }
    };

    return (
        <Box sx={{ 
            height: 'calc(100vh - 100px)',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
        }}>
            <ThreeDayCalendar onEventClick={handleEventClick} />
        </Box>
    );
}