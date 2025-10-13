"use client";
import { Box, Typography } from "@mui/material";
import { useProjectContext } from "../context/all";
import ProjectDetails from "../components/projectDetails";
import ProjectTabsCard from "../components/ProjectTabsCard";

export default function Dashboard() {
  const { selectedProject } = useProjectContext();
  console.log(selectedProject);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        {selectedProject?.name || "No Project Selected"}
      </Typography>
      <ProjectDetails
        name={selectedProject?.name || "No Name"}
        phone={selectedProject?.phone || "No Phone"}
        alternatePhone={selectedProject?.alternatePhone || "No Alternate Phone"}
        email={selectedProject?.email || "No Email"}
        bookingCategory={
          selectedProject?.bookingCategory || "No Booking Category"
        }
        dateOfBooking={selectedProject?.dateOfBooking || "No Date of Booking"}
        leadSource={selectedProject?.leadSource || "No Lead Source"}
        discussionSummary={
          selectedProject?.discussionSummary || "No Discussion Summary"
        }
        details={selectedProject?.details || "No Details"}
        status={selectedProject?.status || "No Status"}
      />
      <Box sx={{ width: "100%", mt: 2 }}>
        <ProjectTabsCard />
      </Box>
    </Box>
  );
}
