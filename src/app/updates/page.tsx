"use client";
import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import Updates from "../components/Updates";
import { useDialog } from "../context/DialogContext";
import AddUpdateForm from "../components/forms/AddUpdateForm";
import useAddMutataion from "../mutations/useAddMutataion";

export default function UpdatesPage() {
  const { openDialog, closeDialog } = useDialog();
  const addMutation = useAddMutataion("updates", false);

  const handleAddUpdate = () => {
    openDialog(
      <AddUpdateForm
        onSubmit={async (data) => {
          await addMutation.mutateAsync(data);
          closeDialog();
        }}
        onCancel={closeDialog}
        isLoading={addMutation.isPending}
      />,
      { maxWidth: "md", fullWidth: true }
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" component="h1">
          Updates
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddUpdate}
          sx={{
            backgroundColor: "#b70058ff",
            "&:hover": {
              backgroundColor: "#8a0043ff",
            },
          }}
        >
          Add Update
        </Button>
      </Box>
      <Updates />
    </Box>
  );
}
