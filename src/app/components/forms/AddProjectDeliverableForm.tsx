"use client";

import React from "react";
import {
  Box,
  Button,
  Typography,
  Stack,
  List,
  ListItem,
  ListItemText,
  Chip,
  CircularProgress,
  Alert,
  Divider,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { Deliverable } from "@/app/interfaces/data/interface";
import useGenericQueries from "@/app/queries/useGenericQueries";
import useAddMutataion from "@/app/mutations/useAddMutataion";
import { useProjectSelected } from "@/app/hooks/useProjectSelected";

interface AddProjectDeliverableFormProps {
  onCancel?: () => void;
}

export default function AddProjectDeliverableForm({
  onCancel,
}: AddProjectDeliverableFormProps) {
  const { selectedProject } = useProjectSelected();
  const { data: deliverables, isLoading, isError } = useGenericQueries<Deliverable[]>("deliverables");
  const addMutation = useAddMutataion("projectDeliverables", false);
  
  const projectId = selectedProject?.id;
  const [addingDeliverableId, setAddingDeliverableId] = React.useState<string | null>(null);

  // Debug: Monitor mutation state
  React.useEffect(() => {
    console.log("Mutation state:", {
      isPending: addMutation.isPending,
      isError: addMutation.isError,
      isSuccess: addMutation.isSuccess,
      error: addMutation.error,
    });
  }, [addMutation.isPending, addMutation.isError, addMutation.isSuccess, addMutation.error]);

  // Reset adding state when mutation completes
  React.useEffect(() => {
    if (!addMutation.isPending) {
      setAddingDeliverableId(null);
    }
  }, [addMutation.isPending]);

  const handleAddDeliverable = (deliverable: Deliverable, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    console.log("Add deliverable clicked", { deliverable, projectId, selectedProject });
    
    if (!projectId) {
      console.error("Project ID is required - selectedProject:", selectedProject);
      return;
    }

    // Set the specific deliverable being added
    setAddingDeliverableId(deliverable.id);

    const projectDeliverableData = {
      projectId: projectId,
      deliverableId: deliverable.id,
      deliveryUpdates: deliverable.updateTemplates || [],
      isDelivered: false,
    };

    console.log("Sending mutation with data:", projectDeliverableData);
    addMutation.mutate(projectDeliverableData);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box p={2}>
        <Alert severity="error">Failed to load deliverables</Alert>
      </Box>
    );
  }

  if (!deliverables || deliverables.length === 0) {
    return (
      <Box p={2}>
        <Alert severity="info">No deliverables available</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "70vh" }}>
      <Stack spacing={2} sx={{ flex: 0 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Select Deliverable to Add
        </Typography>

        {!selectedProject && (
          <Alert severity="error">
            <strong>No project selected!</strong> Please select a project first to add deliverables.
          </Alert>
        )}
        
        {selectedProject && !projectId && (
          <Alert severity="warning">
            <strong>Selected project has no ID!</strong> Project: {JSON.stringify(selectedProject)}
          </Alert>
        )}
        
        {selectedProject && projectId && (
          <Alert severity="info" sx={{ py: 1 }}>
            Adding to: <strong>{selectedProject.name || selectedProject.id}</strong>
          </Alert>
        )}
        
        {addMutation.isError && (
          <Alert severity="error">
            Failed to add deliverable. Error: {addMutation.error?.message || "Unknown error"}
          </Alert>
        )}
        
        {addMutation.isSuccess && (
          <Alert severity="success">
            Deliverable added successfully!
          </Alert>
        )}
      </Stack>

      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          mt: 2,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
        }}
      >
        <List sx={{ p: 0 }}>
          {deliverables.map((deliverable, index) => (
            <Box key={deliverable.id}>
              <ListItem
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  py: 2,
                  px: 2,
                }}
              >
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" fontWeight="medium">
                      {deliverable.displayName}
                    </Typography>
                  }
                  secondary={
                    <Stack spacing={1} mt={1}>
                      <Box display="flex" gap={1} flexWrap="wrap">
                        <Chip
                          label={deliverable.type.replace(/_/g, " ").toUpperCase()}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                        <Chip
                          label={deliverable.assetType}
                          size="small"
                          color="secondary"
                          variant="outlined"
                        />
                        <Chip
                          label={`${deliverable.deliveryTime} days`}
                          size="small"
                          variant="outlined"
                        />
                      </Box>
                      {deliverable.additionalDetails && (
                        <Typography variant="body2" color="text.secondary">
                          {deliverable.additionalDetails}
                        </Typography>
                      )}
                    </Stack>
                  }
                />
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  size="small"
                  onClick={(event) => handleAddDeliverable(deliverable, event)}
                  disabled={!projectId || (addMutation.isPending && addingDeliverableId === deliverable.id)}
                  sx={{ 
                    minWidth: "100px",
                    ml: 2,
                    flexShrink: 0,
                  }}
                >
                  {(addMutation.isPending && addingDeliverableId === deliverable.id) ? "Adding..." : "Add"}
                </Button>
              </ListItem>
              {index < deliverables.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      </Box>

      <Stack direction="row" spacing={2} justifyContent="flex-end" pt={2} sx={{ flex: 0 }}>
        {onCancel && (
          <Button
            variant="outlined"
            onClick={onCancel}
            disabled={addMutation.isPending}
          >
            Close
          </Button>
        )}
      </Stack>
    </Box>
  );
}
