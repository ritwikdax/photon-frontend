import { Box, Typography, Button } from "@mui/material";
import { Download as DownloadIcon } from "@mui/icons-material";
import { SelectedImage } from "../interfaces/data/interface";

interface SelectedImagesSummaryProps {
  selectedImages: SelectedImage[];
  maxSelectionCount?: number;
  projectName?: string;
  onDownload: () => void;
}

export default function SelectedImagesSummary({
  selectedImages,
  maxSelectionCount,
  projectName,
  onDownload,
}: SelectedImagesSummaryProps) {
  const selectedCount = selectedImages?.length || 0;
  const isOverLimit = maxSelectionCount
    ? selectedCount > maxSelectionCount
    : false;

  return (
    <Box
      sx={{
        mt: 3,
        p: 3,
        borderColor: "divider",
        borderRadius: 1,
        textAlign: "center",
      }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 300,
          color: isOverLimit ? "error.main" : "primary.main",
          mb: 0.5,
          letterSpacing: "-0.02em",
        }}>
        <strong>
          {selectedCount} / {maxSelectionCount ?? "∞"}
        </strong>
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
          fontWeight: 400,
          fontSize: "0.875rem",
          mb: 2,
        }}>
        photos selected for editing
      </Typography>

      {selectedCount > 0 && (
        <Button
          variant="outlined"
          size="small"
          startIcon={<DownloadIcon />}
          onClick={onDownload}
          sx={{
            borderColor: "grey.300",
            color: "text.secondary",
            "&:hover": {
              borderColor: "primary.main",
              color: "primary.main",
              backgroundColor: "primary.50",
            },
          }}>
          Download List
        </Button>
      )}
    </Box>
  );
}
