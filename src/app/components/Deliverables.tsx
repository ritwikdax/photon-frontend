import React from "react";
import { Box, List, ListItem, Typography } from "@mui/material";
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
    <List
      sx={{
        width: "100%",
        maxHeight: "calc(100vh - 200px)",
        overflowY: "auto",
      }}
    >
      {deliverables.map((deliverable) => (
        <ListItem key={deliverable.id} sx={{ px: 0, py: 1.5 }}>
          <Deliverable deliverable={deliverable} />
        </ListItem>
      ))}
    </List>
  );
}
