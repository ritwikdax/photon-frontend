import React from "react";
import {
  Chip,
  Button,
  Typography,
  Card,
  CardContent,
  Stack,
  Box,
  Alert,
} from "@mui/material";
import { Project, Update } from "../interfaces/data/interface";
import useGenericQueries from "../queries/useGenericQueries";

interface ProjectCardProps {
  project: Project;
  onDetailsClick?: (project: Project) => void;
}

const statusColors: Record<
  string,
  "success" | "error" | "warning" | "default"
> = {
  open: "success",
  close: "error",
  reopen: "warning",
  withdrawn: "default",
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onDetailsClick,
}) => {
  const { data: driveBackupUpdates, isLoading } = useGenericQueries<Update[]>(
    "updates",
    "updateType.type=drive_backup"
  );

  function getDriveBackupUpdates(projectId: string, updates: Update[]) {
    const driveStatus = updates
      .filter((update) => update.projectId === projectId)
      .map((update, index) => (
        <Box key={index} sx={{ padding: "24px"}}>
          <Typography variant="subtitle2" fontWeight={600}>
            {update.title}
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center" mt={1}>
            <Chip
              label={update.updateType.status.replace(/_/g, " ")}
              size="small"
              color={
                update.updateType.status === "completed"
                  ? "success"
                  : update.updateType.status === "in_progress"
                  ? "primary"
                  : update.updateType.status === "cancelled"
                  ? "error"
                  : update.updateType.status === "on_hold"
                  ? "warning"
                  : "default"
              }
              sx={{ textTransform: "capitalize" }}
            />
          </Stack>
        </Box>
      ));

    if (driveStatus.length === 0)
      return (
        <Alert severity="error" sx={{ m: 2 }}>
          No drive backup updates found.
        </Alert>
      );

    return driveStatus;
  }

  return (
    <Box
      sx={{
        minWidth: 300,
        width: "100%",
        height: "100%",
        borderRadius: 1,
        backgroundColor: "background.paper",
        display: "flex",
        flexDirection: "column",
      }}
    >
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
      <Stack direction="column" sx={{ flexGrow: 1, overflow: "auto" }}>
        {!isLoading &&
          getDriveBackupUpdates(project.id, driveBackupUpdates || [])}
      </Stack>
    </Box>
  );
};

export default ProjectCard;
