"use client";

import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import CopyUrlText from "./CopyUrlText";
import { useProjectSelected } from "../hooks/useProjectSelected";
import { SELECT_APP_URL, TRACKER_APP_URL } from "../utils/env";

export default function TrackingDetails() {
  const { selectedProject } = useProjectSelected();
  const trackingUrls = [
    {
      url: `${TRACKER_APP_URL}/${selectedProject?.id}`,
      label: "Deliverables Tracking URL",
    },
    {
      url: `${SELECT_APP_URL}/${selectedProject?.id}`,
      label: "Image Selection URL",
    },
  ];
  return (
    <Box
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: 1,
        p: 3,
        bgcolor: "background.paper",
        position: "relative",
        m: "1rem auto",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Tracking Details
      </Typography>

      <Stack spacing={2}>
        {trackingUrls.map((item, index) => (
          <Box key={index}>
            {item.label && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ marginBottom: 0.5, display: "block" }}
              >
                {item.label}
              </Typography>
            )}
            <CopyUrlText text={item.url} />
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
