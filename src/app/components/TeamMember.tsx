"use client";
import React, { useState } from "react";
import { Box, Typography, Chip, Stack, Popover } from "@mui/material";
import { Employee } from "../interfaces/data/interface";
import useGenericQueries from "../queries/useGenericQueries";
import StarIcon from "@mui/icons-material/Star";

interface TeamMemberProps {
  employeeId: string;
  isLead: boolean;
}

export default function TeamMember({ employeeId, isLead }: TeamMemberProps) {
  const { data: employees } = useGenericQueries<Employee[]>("employees", `fields=name,expertise&id=${employeeId}`);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  
  const employee = employees && employees[0];
  console.log("TeamMember employee:", employee);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  if (!employee) {
    return (
      <Box sx={{ p: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Employee not found
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        p: 1,
        bgcolor: "background.paper",
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Box 
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        >
          <Typography 
            variant="subtitle2" 
            fontWeight={600}
            sx={{ cursor: "pointer" }}
          >
            {employee?.name}
          </Typography>
          {isLead && (
            <Chip
              icon={<StarIcon sx={{ fontSize: 16 }} />}
              label="Lead"
              size="small"
              color="primary"
              sx={{ height: 20 }}
            />
          )}
        </Box>
        
        <Popover
          sx={{
            pointerEvents: "none",
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Box sx={{ p: 2, maxWidth: 300 }}>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: "block" }}>
              Skills & Expertise
            </Typography>
            <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
              {employee?.expertise?.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  size="small"
                  variant="outlined"
                  sx={{ height: 22, fontSize: "0.75rem", margin: "2px" }}
                />
              ))}
            </Stack>
          </Box>
        </Popover>
      </Box>
    </Box>
  );
}