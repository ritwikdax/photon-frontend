import { FC } from "react";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import { Typography, Paper, Box } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import ErrorIcon from "@mui/icons-material/Error";
import BlockIcon from "@mui/icons-material/Block";

export type UpdateType = "info" | "error" | "blocked";

export interface Update {
  title: string;
  description: string;
  createdAt: string;
  type: UpdateType;
}

interface ProjectUpdatesProps {
  updates: Update[];
}

const getStatusIcon = (type: UpdateType) => {
  switch (type) {
    case "info":
      return <InfoIcon />;
    case "error":
      return <ErrorIcon />;
    case "blocked":
      return <BlockIcon />;
  }
};

const getStatusColor = (type: UpdateType) => {
  switch (type) {
    case "info":
      return "primary";
    case "error":
      return "error";
    case "blocked":
      return "warning";
  }
};

const ProjectUpdates: FC<ProjectUpdatesProps> = ({ updates }) => {
  return (
    <Box
      sx={{
        maxHeight: "70vh",
        overflowY: "auto",
        overflowX: "hidden",
        position: "relative",
        left: 0,
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-track": {
          background: "#f1f1f1",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#888",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: "#555",
        },
      }}>
      <Timeline
        position="right"
        sx={{
          p: 0,
          [`& .MuiTimelineItem-root::before`]: {
            flex: 0,
            padding: 0,
          },
        }}>
        {updates?.map((update, index) => (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineDot color={getStatusColor(update.type)}>
                {getStatusIcon(update.type)}
              </TimelineDot>
              {index < updates.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={0} sx={{ p: 2, mb: 2, maxWidth: "400px" }}>
                <Typography variant="h6" component="h3">
                  {update.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {update.description}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block", mt: 1 }}>
                  {new Date(update.createdAt).toLocaleString()}
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
};

export default ProjectUpdates;
