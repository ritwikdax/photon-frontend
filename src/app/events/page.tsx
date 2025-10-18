"use client";
import React, { use, useState } from "react";
import {
  Box,
} from "@mui/material";
import { useRouter } from "next/navigation";

import { Event } from "../interfaces/data/interface";
import MonthlyCalendar from "../components/MonthlyCalendar";
import useGenericQueries from "../queries/useGenericQueries";
import { useProjectContext } from "../context/all";

export default function EventsPage() {
  const { data: events } = useGenericQueries<Event[]>("events");
  const { data: projects } = useGenericQueries<any[]>("projects");
  const { setSelectedProject } = useProjectContext();
  const router = useRouter();

  const handleEventClick = (event: Event) => {
    console.log("Event clicked:", event);
    
    // Find the project associated with this event
    const project = projects?.find((p) => p.id === event.projectId);
    
    if (project) {
      // Set the selected project in context
      setSelectedProject(project);
      
      // Redirect to the project page
      router.push("/project");
    } else {
      console.warn("Project not found for event:", event.projectId);
    }
  };

  return (
    <Box 
      sx={{ 
        height: "calc(100vh - 112px)", // 64px toolbar + 48px padding (24px top + 24px bottom)
        width: "100%",
        overflow: "auto",
        position: "relative",
      }}
    >
      <MonthlyCalendar 
        events={events ?? []} 
        onEventClick={handleEventClick}
      />
    </Box>
  );

}
