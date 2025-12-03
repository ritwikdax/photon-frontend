"use client";
import React, { useRef } from "react";
import {
  Box,
  Button,
  Stack,
  Tooltip,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { Download } from "@mui/icons-material";
import { CONTRACT_CLASSIC } from "../../templates/contracts/classic";
import { copyToClipboard } from "@/app/utils/utils";

// Create classic MUI default theme
const classicTheme = createTheme();

export default function ContractTemplatePage() {
  const contractRef = useRef<HTMLDivElement>(null);

  const handleGetEditedContent = () => {
    if (!contractRef.current) return;

    // Get the complete HTML including DOCTYPE, html, head, and body tags
    const editedHTML = contractRef.current.innerHTML;

    // Wrap with proper HTML structure if needed
    const completeHTML = `<!DOCTYPE html>
<html lang="en">
${editedHTML}
</html>`;

    copyToClipboard(completeHTML);
    console.log("Edited HTML:", completeHTML);
    return completeHTML;
  };

  return (
    <Box sx={{ display: "flex", gap: 3, p: 2 }}>
      {/* First Column - Controls */}
      <Box sx={{ width: 300, flexShrink: 0 }}>
        <Stack spacing={2}>
          {/* <FormControl size="small" fullWidth>
            <InputLabel id="pdf-mode-label">PDF Generation Mode</InputLabel>
            <Select
              labelId="pdf-mode-label"
              id="pdf-mode-select"
              value={pdfMode}
              label="PDF Generation Mode"
              onChange={(e) => setPdfMode(e.target.value as PdfMode)}
            >
              <MenuItem value="text">Text-Based PDF</MenuItem>
              <MenuItem value="original">Keep Original Styling</MenuItem>
            </Select>
          </FormControl> */}

          <Tooltip title="Save Changes">
            <Button
              onClick={handleGetEditedContent}
              variant="contained"
              fullWidth
            >
              Save Changes
            </Button>
          </Tooltip>

          <Tooltip title="Reset Modification">
            <Button
              onClick={() => {}}
              variant="outlined"
              startIcon={<Download />}
              fullWidth
            >
              Reset Modification
            </Button>
          </Tooltip>
        </Stack>
      </Box>

      {/* Second Column - HTML Content */}
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          maxHeight: "calc(100vh - 64px)",
        }}
      >
        <ThemeProvider theme={classicTheme}>
          <Box
            sx={{
              maxWidth: "850px",
            }}
          >
            <div
              ref={contractRef}
              contentEditable
              dangerouslySetInnerHTML={{ __html: CONTRACT_CLASSIC }}
            ></div>
          </Box>
        </ThemeProvider>
      </Box>
    </Box>
  );
}
