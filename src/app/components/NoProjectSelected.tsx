import { Box, Button, Typography } from "@mui/material";

export default function NoProjectSelected() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 200px)",
        textAlign: "center",
        px: 3,
      }}
    >
      <Box
        sx={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          backgroundColor: "action.hover",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 3,
        }}
      >
        <Typography variant="h1" sx={{ fontSize: 60, opacity: 0.3 }}>
          📋
        </Typography>
      </Box>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
        No Project Selected
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500 }}>
        Please select a project from the navigation menu to view its details, analytics, and manage deliverables.
      </Typography>
      <Button
        variant="contained"
        size="large"
        onClick={() => window.location.href = '/project/add'}
        sx={{ textTransform: "none" }}
      >
        Create New Project
      </Button>
    </Box>
  );
}
