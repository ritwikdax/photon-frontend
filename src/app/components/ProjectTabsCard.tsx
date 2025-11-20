import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Events from "./Events";
import useProjectUpdates from "../queries/useUpdates";
import useProjectEvents from "../queries/useEventsByProjectId";
import { useProjectDeliverables } from "../queries/useProjectDeliverables";
import ProjectDeliverables from "./ProjectDeliverables";
import { useProjectSelected } from "../hooks/useProjectSelected";
import Updates from "./Updates";
import ImageSelection from "./ImageSelection";
import useImageSelectionsDetails from "../queries/useImageSelectionDetails";
import TrackingDetails from "./TrackingDetails";

function TabPanel(props: {
  children?: React.ReactNode;
  index: number;
  value: number;
}) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`mui-tabpanel-${index}`}
      aria-labelledby={`mui-tab-${index}`}
      {...other}
      style={{ width: "100%" }}
    >
      {value === index && <Box sx={{pt: 1}}>{children}</Box>}
    </div>
  );
}

const ProjectTabsCard: React.FC = () => {
  const [value, setValue] = useState(0);
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const { selectedProject } = useProjectSelected();
  const { data: projectUpdates } = useProjectUpdates(selectedProject?.id || "");
  const { data: projectEvents } = useProjectEvents(selectedProject?.id || "");
  const projectDeliverables = useProjectDeliverables(selectedProject?.id || "");
  const { data: imageSelectionDetails } = useImageSelectionsDetails(
    selectedProject?.id || ""
  );

  // Check if there's an event ID in the URL hash and switch to Events tab
  React.useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      setValue(0); // Switch to Events tab (index 0)
    }
  }, []);
  return (
    <Box>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="project tabs"
        variant="standard"
      >
        <Tab label="Events" id="mui-tab-0" aria-controls="mui-tabpanel-0" />
        <Tab
          label="Deliverables"
          id="mui-tab-1"
          aria-controls="mui-tabpanel-1"
        />
        <Tab label="Updates" id="mui-tab-2" aria-controls="mui-tabpanel-2" />
        <Tab
          label="Image Selections"
          id="mui-tab-2"
          aria-controls="mui-tabpanel-2"
        />
        <Tab label="Trackings" id="mui-tab-2" aria-controls="mui-tabpanel-2" />
      </Tabs>
      <Box>
        <TabPanel value={value} index={0}>
          <Events events={projectEvents || []} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ProjectDeliverables deliverables={projectDeliverables ?? []} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Updates />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <ImageSelection
            imageSelection={
              imageSelectionDetails && imageSelectionDetails?.length > 0
                ? imageSelectionDetails[0]
                : undefined
            }
          />
        </TabPanel>
        <TabPanel value={value} index={4}>
          {/* Tracking Details Component */}
          <TrackingDetails />
        </TabPanel>
      </Box>
    </Box>
  );
};

export default ProjectTabsCard;
