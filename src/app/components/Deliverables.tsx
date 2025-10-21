"use client";
import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { LocalShipping } from "@mui/icons-material";
import { Deliverable as DeliverablesType } from "../interfaces/data/interface";
import Deliverable from "./Deliverable";

interface DeliverablesProps {
  deliverables: DeliverablesType[];
}

export default function Deliverables({ deliverables }: DeliverablesProps) {
  if (!deliverables || deliverables.length === 0) {
    return (
      <Box
        sx={{
          textAlign: "center",
          py: 8,
          px: 2,
        }}
      >
        <LocalShipping sx={{ fontSize: 64, color: "text.disabled", mb: 2 }} />
        <Typography variant="h6" color="text.secondary">
          No deliverables found
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxHeight: "calc(100vh - 200px)",
        overflow: "auto",
        mb: 3,
      }}
    >
      <Box
        sx={{
          columnCount: 2,
          columnGap: 2,
          px: 2,
        }}
      >
        {deliverables.map((deliverable) => (
          <Box
            key={deliverable.id}
            sx={{
              breakInside: "avoid",
              marginBottom: 2,
              display: "inline-block",
              width: "100%",
            }}
          >
            <Deliverable deliverable={deliverable} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
