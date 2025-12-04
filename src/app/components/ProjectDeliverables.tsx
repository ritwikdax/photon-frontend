import React from "react";
import { Box, List, ListItem, Typography } from "@mui/material";
import { LocalShipping } from "@mui/icons-material";
import {
  Deliverable as DeliverablesType,
  ProjectDeliverable,
} from "../interfaces/data/interface";
import Deliverable from "./ProjectDeliverable";

interface DeliverablesProps {
  deliverables: ProjectDeliverable[];
}

export default function ProjectDeliverables({
  deliverables,
}: DeliverablesProps) {
  if (!deliverables || deliverables.length === 0) {
    return (
      <Box
        sx={{
          backgroundColor: "background.paper",
          textAlign: "center",
          border: 1,
          borderRadius: 1,
          borderColor: "divider",
          p: 8,
        }}>
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
        p: 0,
      }}>
      {deliverables.map((deliverable) => (
        <ListItem key={deliverable.id} sx={{ px: 0, py: 0 }}>
          <Deliverable deliverable={deliverable} />
        </ListItem>
      ))}
    </List>
  );
}
