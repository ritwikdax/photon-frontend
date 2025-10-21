"use client";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import ProjectAnalyticsCards from "../components/ProjectAnalyticsCards";
import { ContentCopy } from "@mui/icons-material";
import { useProjectSelected } from "../hooks/useProjectSelected";
import ProjectDetails from "../components/ProjectDetails";
import ProjectTabsCard from "../components/ProjectTabsCard";
export default function Dashboard() {
  const { selectedProject } = useProjectSelected();
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid size={5}>
          <Stack direction="row">
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
              {selectedProject?.name || "No Project Selected"}
            </Typography>
            <Box sx={{ marginLeft: "20px" }}>
              <Button variant="outlined" startIcon={<ContentCopy />}>
                Track
              </Button>
            </Box>
          </Stack>
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
