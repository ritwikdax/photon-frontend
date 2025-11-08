import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";

interface CounterInputProps {
  label: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export default function CounterInput({
  label,
  value,
  onIncrement,
  onDecrement,
}: CounterInputProps) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        p: 2,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1,
      }}>
      <Typography variant="body1">{label}</Typography>
      <Box display="flex" alignItems="center" gap={2}>
        <IconButton
          size="small"
          onClick={onDecrement}
          sx={{
            border: "1px solid",
            borderColor: "divider",
          }}>
          <RemoveIcon fontSize="small" />
        </IconButton>
        <Typography
          variant="h6"
          sx={{ minWidth: "40px", textAlign: "center" }}>
          {value}
        </Typography>
        <IconButton
          size="small"
          onClick={onIncrement}
          sx={{
            border: "1px solid",
            borderColor: "divider",
          }}>
          <AddIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}
