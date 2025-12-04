import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import useSelectedImages from "../queries/useSelectedImages";

interface SelectedImageNotesProps {
  projectId: string;
}

const SelectedImageNotes: React.FC<SelectedImageNotesProps> = ({
  projectId,
}) => {
  const {
    data: selectedImages,
    isLoading,
    error,
  } = useSelectedImages(projectId);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={2}>
        <Typography color="error">
          Error loading notes:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </Typography>
      </Box>
    );
  }

  // Filter out images where note is null or undefined
  const imagesWithNotes =
    selectedImages?.filter(
      (image) =>
        image.note !== null &&
        image.note !== undefined &&
        image.note.trim() !== ""
    ) || [];

  if (imagesWithNotes.length === 0) {
    return (
      <Box p={2}>
        <Typography color="text.secondary">
          No notes available for selected images.
        </Typography>
      </Box>
    );
  }

  return (
    <Paper sx={{ marginTop: 2 }}>
      <Box p={2}>
        <Typography variant="h6" gutterBottom>
          Selected Image Notes
        </Typography>
        <List>
          {imagesWithNotes.map((image) => (
            <ListItem
              key={image.id}
              sx={{
                borderBottom: "1px solid",
                borderColor: "divider",
                "&:last-child": {
                  borderBottom: "none",
                },
              }}>
              <ListItemText
                primary={image.note}
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.secondary">
                      Image: {image.imageFileName}
                    </Typography>
                    <br />
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.secondary">
                      Folder: {image.folderName}
                    </Typography>
                  </>
                }
                primaryTypographyProps={{
                  variant: "body1",
                  fontWeight: 500,
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  );
};

export default SelectedImageNotes;
