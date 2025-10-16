'use client';
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
        <Button>Add Deloverables</Button>
        <Typography variant="h6" color="text.secondary">
          No deliverables found
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        width: "100%",
        maxHeight: "calc(100vh - 200px)",
        overflowY: "auto",
      }}
    >
        <Button>Add Deloverables</Button>
      {deliverables.map((deliverable) => (
        <Box key={deliverable.id}>
          <Deliverable deliverable={deliverable} />
        </Box>
      ))}
    </Box>
  );
}
