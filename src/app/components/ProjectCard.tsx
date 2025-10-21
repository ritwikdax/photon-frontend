import React from "react";
import { Chip, Button, Typography, Card, CardContent, Stack, Box } from "@mui/material";
import { Project } from "../interfaces/data/interface";

interface ProjectCardProps {
  project: Project;
  onDetailsClick?: (project: Project) => void;
}

const statusColors: Record<string, "success" | "error" | "warning" | "default"> = {
  open: "success",
  close: "error",
  reopen: "warning",
  withdrawn: "default",
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onDetailsClick }) => {
  return (
    <Box sx={{ minWidth: 300, borderRadius: 1, backgroundColor: "background.paper"}}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom fontWeight={600}>
          {project.name}
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center" mb={1}>
          <Typography variant="body2" color="text.secondary">
            📞 {project.phone}
          </Typography>
          <Chip
            label={project.status}
            color={statusColors[project.status] || "default"}
            size="small"
            sx={{ textTransform: "capitalize" }}
          />
          <Chip
            label={project.bookingCategory.replace(/_/g, " ")}
            color="primary"
            size="small"
            sx={{ textTransform: "capitalize" }}
          />
        </Stack>
        <Button
          variant="text"
          size="small"
          onClick={() => onDetailsClick && onDetailsClick(project)}
          sx={{ mt: 1 }}
        >
          Details
        </Button>
      </CardContent>
    </Box>
  );
};

export default ProjectCard;
