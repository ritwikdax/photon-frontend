"use client";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useProjectContext } from "../context/all";
import ProjectDetails from "../components/projectDetails";
import ProjectTabsCard from "../components/projectTabsCard";
import { ContentCopy } from "@mui/icons-material";
export default function Dashboard() {
  const { selectedProject } = useProjectContext();
  return (
    <Box>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Box sx={{ width: "40%" }}>
          <Stack direction="row">
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
              {selectedProject?.name || "No Project Selected"}
            </Typography>
            <Box sx={{ marginLeft: "20px" }}>
              <Button variant="outlined" startIcon={<ContentCopy />}>
                Track
              </Button>
            </Box>
          </Stack>
          <ProjectDetails
            name={selectedProject?.name || "No Name"}
            phone={selectedProject?.phone || "No Phone"}
            alternatePhone={
              selectedProject?.alternatePhone || "No Alternate Phone"
            }
            email={selectedProject?.email || "No Email"}
            bookingCategory={
              selectedProject?.bookingCategory || "No Booking Category"
            }
            dateOfBooking={
              selectedProject?.dateOfBooking || "No Date of Booking"
            }
            leadSource={selectedProject?.leadSource || "No Lead Source"}
            discussionSummary={
              selectedProject?.discussionSummary || "No Discussion Summary"
            }
            details={selectedProject?.details || "No Details"}
            status={selectedProject?.status || "No Status"}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <ProjectTabsCard />
        </Box>
      </Box>
    </Box>
  );
}
