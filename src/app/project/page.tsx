"use client";
import { Box, Grid } from "@mui/material";
import ProjectAnalyticsCards from "../components/ProjectAnalyticsCards";
import { useProjectSelected } from "../hooks/useProjectSelected";
import ProjectDetails from "../components/ProjectDetails";
import ProjectTabsCard from "../components/ProjectTabsCard";
import NoProjectSelected from "../components/NoProjectSelected";
import ProjectSelector from "../components/ProjectSelector";

export default function Dashboard() {
  const { selectedProject } = useProjectSelected();

  if (!selectedProject) {
    return <NoProjectSelected />;
  }
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid size={5}>
          <ProjectSelector />
          <Box
            sx={{
              height: "calc(100vh - 200px)",
              overflowY: "auto",
              overflowX: "hidden",
            }}>
            <ProjectDetails
              project={selectedProject as any}
              onEdit={() => {}}
            />
            {selectedProject?.id && (
              <ProjectAnalyticsCards projectId={selectedProject.id} />
            )}
          </Box>
        </Grid>
        <Grid size={7}>
          <ProjectTabsCard />
        </Grid>
      </Grid>
    </Box>
  );
}
