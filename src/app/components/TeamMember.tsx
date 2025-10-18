"use client";
import React from "react";
import { Box, Typography, Chip, Stack } from "@mui/material";
import { Employee } from "../interfaces/data/interface";
import useGenericQueries from "../queries/useGenericQueries";
import StarIcon from "@mui/icons-material/Star";

interface TeamMemberProps {
  employeeId: string;
  isLead: boolean;
}

export default function TeamMember({ employeeId, isLead }: TeamMemberProps) {
  const { data: employees } = useGenericQueries<Employee[]>("employees", `fields=name,expertise&id=${employeeId}`);
  
  const employee = employees && employees[0];
  console.log("TeamMember employee:", employee);

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
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
          <Typography variant="subtitle2" fontWeight={600}>
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
        <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap sx={{marginTop: "8px"}}>
          {employee?.expertise?.map((skill, index) => (
            <Chip
              key={index}
              label={skill}
              size="small"
              variant="outlined"
              sx={{ height: 22, fontSize: "0.75rem", margin: "4px"}}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}