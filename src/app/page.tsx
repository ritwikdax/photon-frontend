"use client";
import { Box, createTheme, Stack, Typography } from "@mui/material";
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
    <Box
      display="flex"
      justifyContent="start"
      height="calc(100vh - 150px)"
      flexWrap="wrap"
    >
      {projects?.map((project) => (
        <Box sx={{ margin: "8px" }}>
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
  );
}
