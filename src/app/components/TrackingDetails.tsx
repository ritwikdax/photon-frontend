"use client";

import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import CopyUrlText from "./CopyUrlText";
import { useProjectSelected } from "../hooks/useProjectSelected";
import { useTrackingUrl } from "../queries/useTrackingUrl";

export default function TrackingDetails() {
  const { selectedProject } = useProjectSelected();
  const {data: url} = useTrackingUrl(selectedProject?.id || "" );

  const trackingUrls = [
    {
      url: url?.track,
      label: "Deliverables Tracking URL",
    },
    {
      url: url?.selection,
      label: "Image Selection URL",
    },
  ];
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
      }}
    >
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
          overflow: "auto",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Tracking Details
        </Typography>

        <Stack spacing={2} sx={{ width: "100%" }}>
          {trackingUrls.map((item, index) => (
            <Box key={index} sx={{ width: "100%", minWidth: 0 }}>
              {item.label && (
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ marginBottom: 0.5, display: "block" }}
                >
                  {item.label}
                </Typography>
              )}
              <CopyUrlText text={item.url ?? "Loading..."} />
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
