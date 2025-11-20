"use client";
import { Box, Typography, Stack } from "@mui/material";
import { useState, useMemo } from "react";
import useGenericQueries from "./queries/useGenericQueries";
import { Project } from "./interfaces/data/interface";
import ProjectsDataGrid from "./components/ProjectsDataGrid";
import { useRouter } from "next/navigation";
import { useDialog } from "./context/DialogContext";
import EditProjectForm from './components/forms/EditProjectForm';
import { useProjectSelected } from "./hooks/useProjectSelected";

export default function Home() {
  const { data: projects, isLoading } = useGenericQueries<Project[]>("projects");
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const { openDialog, closeDialog } = useDialog();
  const { setSelectedProject } = useProjectSelected();

  const filteredProjects = useMemo(() => {
    if (!projects || !searchTerm) return projects || [];
    
    const lowerSearch = searchTerm.toLowerCase();
    return projects.filter((project) => {
      return (
        project.name.toLowerCase().includes(lowerSearch) ||
        project.email.toLowerCase().includes(lowerSearch) ||
        project.phone.toLowerCase().includes(lowerSearch)
      );
    });
  }, [projects, searchTerm]);

  const handleViewProject = (project: Project) => {
    setSelectedProject(project);
    router.push(`/project?id=${project.id}`);
  };

  const handleEditProject = (project: Project) => {
    openDialog(
      <EditProjectForm
        project={project}
        onClose={closeDialog}
      />,
      { maxWidth: "lg", fullWidth: true }
    );
  };

  return (
    <Box sx={{ p: 1 }}>
      <Stack spacing={2}>
        <ProjectsDataGrid
          projects={filteredProjects}
          loading={isLoading}
          onViewProject={handleViewProject}
          onEditProject={handleEditProject}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </Stack>
    </Box>
  );
}
