import { Box, Typography } from "@mui/material";

interface TrackCountProps {
  icon: React.ReactNode;
  title: string;
  total: number;
  lastTracked: string;
  isLoading?: boolean;
}

export default function TrackCount({
  icon,
  title,
  total,
  lastTracked,
  isLoading,
}: TrackCountProps) {
  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        borderRadius: 1,
        border: 1,
        borderColor: "divider",
        p: 2,
      }}>
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 48,
              height: 48,
              borderRadius: 2,
              color: "primary.main",
              mr: 2,
            }}>
            {icon}
          </Box>
          <Box>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              {isLoading ? "..." : total}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {lastTracked
              ? `Last Tracked: ${lastTracked}`
              : "No tracking data available"}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
