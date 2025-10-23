"use client";
import AddProjectForm from "@/app/components/forms/AddProjectForm";
import useAddMuttion from "@/app/mutations/useAddMutataion";
import { Box } from "@mui/material";

export default function AddProject() {
  const addProjectMutation = useAddMuttion("projects");

  return (
    <Box sx={{ overflow: "scroll", height: "calc(100vh - 150px)" }}>
      <AddProjectForm
        onSubmit={(data) => {
          addProjectMutation.mutate(data);
        }}
        isLoading={false}
      />
    </Box>
  );
}
