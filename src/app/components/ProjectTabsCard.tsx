import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Events from "./Events";
import useProjectEvents from "../queries/useEventsByProjectId";
import { useProjectDeliverables } from "../queries/useProjectDeliverables";
import ProjectDeliverables from "./ProjectDeliverables";
import { useProjectSelected } from "../hooks/useProjectSelected";
import Updates from "./Updates";
import ImageSelection from "./ImageSelection";
import useImageSelectionsDetails from "../queries/useImageSelectionDetails";
import TrackingDetails from "./TrackingDetails";
import SelectedImageNotes from "./SelectedImageNotes";

const ProjectTabsCard: React.FC = () => {
  const [value, setValue] = useState("0");
  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const { selectedProject } = useProjectSelected();
  const { data: projectEvents } = useProjectEvents(selectedProject?.id || "");
  const projectDeliverables = useProjectDeliverables(selectedProject?.id || "");
  const { data: imageSelectionDetails } = useImageSelectionsDetails(
    selectedProject?.id || ""
  );

  // Check if there's an event ID in the URL hash and switch to Events tab
  React.useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      setValue("0"); // Switch to Events tab (index 0)
    }
  }, []);
  return (
    <TabContext value={value}>
      <Box>
        <TabList
          onChange={handleChange}
          aria-label="project tabs"
          variant="standard"
          TabIndicatorProps={{ style: { display: "none" } }}
          sx={{
            "& .MuiTab-root": {
              transition: "background-color 0.3s",
              borderRadius: 1,
              padding: "6px 12px",
              minHeight: "40px",
            },
            "& .MuiTab-root.Mui-selected": {
              backgroundColor: "action.selected",
              borderRadius: 5,
            },
          }}>
          <Tab label="Events" value="0" />
          <Tab label="Deliverables" value="1" />
          <Tab label="Updates" value="2" />
          <Tab label="Image Selections" value="3" />
          <Tab label="Trackings" value="4" />
        </TabList>
      </Box>
      <TabPanel value="0" sx={{ p: 0, pt: 1 }}>
        <Events events={projectEvents || []} />
      </TabPanel>
      <TabPanel value="1" sx={{ p: 0, pt: 1 }}>
        <ProjectDeliverables deliverables={projectDeliverables ?? []} />
      </TabPanel>
      <TabPanel value="2" sx={{ p: 0, pt: 1 }}>
        <Updates />
      </TabPanel>
      <TabPanel value="3" sx={{ p: 0, pt: 1 }}>
        <Box
          sx={{
            width: "100%",
            maxHeight: "calc(100vh - 200px)",
            overflowY: "auto",
          }}>
          <ImageSelection
            imageSelection={
              imageSelectionDetails && imageSelectionDetails?.length > 0
                ? imageSelectionDetails[0]
                : undefined
            }
          />
          <SelectedImageNotes projectId={selectedProject?.id || ""} />
        </Box>
      </TabPanel>
      <TabPanel value="4" sx={{ p: 0, pt: 1 }}>
        {/* Tracking Details Component */}
        <TrackingDetails />
      </TabPanel>
    </TabContext>
  );
};

export default ProjectTabsCard;
