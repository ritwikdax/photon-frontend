"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import { Notifications } from "@mui/icons-material";
import { Update as UpdateType } from "../interfaces/data/interface";
import Update from "./Update";
import useGenericQueries from "../queries/useGenericQueries";
import { useProjectSelected } from "../hooks/useProjectSelected";


export default function Updates() {
  const { selectedProject } = useProjectSelected();
  const { data: updates } = useGenericQueries<UpdateType[]>(
    "updates",
    `projectId=${selectedProject?.id}`
  );
  if (!updates || updates.length === 0) {
    return (
      <Box
        sx={{
          textAlign: "center",
          py: 8,
          px: 2,
        }}
      >
        <Notifications sx={{ fontSize: 64, color: "text.disabled", mb: 2 }} />
        <Typography variant="h6" color="text.secondary">
          No updates found
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: "calc(100vh - 200px)",
        overflow: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {updates.map((update) => (
          <Update key={update.id} update={update} />
        ))}
      </Box>
    </Box>
  );
}
