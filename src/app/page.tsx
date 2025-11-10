"use client";
import { Box, Typography, Stack } from "@mui/material";
import useGenericQueries from "./queries/useGenericQueries";
import { Project } from "./interfaces/data/interface";
import ProjectsDataGrid from "./components/ProjectsDataGrid";
import { useRouter } from "next/navigation";
import { useDialog } from "./context/DialogContext";
import EditProjectForm from './components/forms/EditProjectForm';

export default function Home() {
  const { data: projects, isLoading } = useGenericQueries<Project[]>("projects");
  const router = useRouter();
  const { openDialog, closeDialog } = useDialog();

  const handleViewProject = (id: string) => {
    router.push(`/project?id=${id}`);
  };

  const handleEditProject = (id: string) => {
    const project = projects?.find((p) => p.id === id);
    if (project) {
      openDialog(
        <EditProjectForm
          project={project}
          onClose={closeDialog}
        />,
        { maxWidth: "lg", fullWidth: true }
      );
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Stack spacing={2}>
        <ProjectsDataGrid
          projects={projects || []}
          loading={isLoading}
          onViewProject={handleViewProject}
          onEditProject={handleEditProject}
        />
      </Stack>
    </Box>
  );
}
