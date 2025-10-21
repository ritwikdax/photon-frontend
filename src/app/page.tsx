"use client";
import { Box, createTheme, Stack, Typography, Alert } from "@mui/material";
import useGenericQueries from "./queries/useGenericQueries";
import { Project } from "./interfaces/data/interface";
import ProjectCard from "./components/ProjectCard";
import { useProjectSelected } from "./hooks/useProjectSelected";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: projects } = useGenericQueries<Project[]>("projects");
  const { setSelectedProject } = useProjectSelected();
  const router = useRouter();
  return (
    <Box>
      <Alert severity="warning" sx={{ mb: 2 }}>
        More analytics will be added here based on requirement.
      </Alert>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          height: "calc(100vh - 150px)",
          overflow: "auto",
          pb: 2,
          alignItems: "stretch",
          alignContent: "flex-start",
        }}
      >
        {projects?.map((project) => (
          <Box
            key={project.id}
            sx={{
              display: "flex",
              flex: "1 1 300px",
              minWidth: "300px",
              maxWidth: "calc(50% - 8px)",
            }}
          >
            <ProjectCard
              project={project}
              onDetailsClick={(p) => {
                if (p) {
                  // Set the selected project in context
                  setSelectedProject(p);
                  // Redirect to the project page
                  router.push("/project");
                } else {
                  console.warn("Project not found for event:");
                }
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
