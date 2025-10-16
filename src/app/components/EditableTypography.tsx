import React, { useState, useRef, useEffect } from "react";
import { Typography, TextField, TypographyProps } from "@mui/material";

interface EditableTypographyProps extends TypographyProps {
  value: string;
  onSave: (newValue: string) => void;
  multiline?: boolean;
  placeholder?: string;
}

export default function EditableTypography({
  value,
  onSave,
  multiline = false,
  placeholder = "Double click to edit...",
  ...typographyProps
}: EditableTypographyProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  // Update editValue when value prop changes
  useEffect(() => {
    setEditValue(value);
  }, [value]);

  // Focus input when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    if (editValue.trim() !== value) {
      onSave(editValue.trim());
    } else {
      // Reset to original value if no change
      setEditValue(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !multiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === "Enter" && multiline && e.shiftKey) {
      // Allow Shift+Enter for new line in multiline mode
      return;
    } else if (e.key === "Enter" && multiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === "Escape") {
      // Cancel editing on Escape
      setEditValue(value);
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    handleSave();
  };

  if (isEditing) {
    return (
      <TextField
        inputRef={inputRef}
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        multiline={multiline}
        fullWidth
        variant="standard"
        size="small"
        sx={{
          "& .MuiInputBase-input": {
            fontSize: typographyProps.variant
              ? undefined
              : typographyProps.fontSize || "inherit",
            fontWeight: typographyProps.fontWeight || "inherit",
            padding: 0,
          },
        }}
      />
    );
  }

  return (
    <Typography
      {...typographyProps}
      onDoubleClick={handleDoubleClick}
      sx={{
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "action.hover",
        },
        ...typographyProps.sx,
      }}
    >
      {value || placeholder}
    </Typography>
  );
}
