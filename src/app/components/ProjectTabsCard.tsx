import React, { useState } from "react";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ProjectUpdates, { Update } from "./ProjectUpdates";
import Events from "./events";
import useProjectUpdates from "../queries/useUpdates";
import useProjectEvents from "../queries/useEvents";
import { useProjectDeliverables } from "../queries/useProjectDeliverables";
import ProjectDeliverables from "./ProjectDeliverables";
import { useProjectSelected } from "../hooks/useProjectSelected";

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
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
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
  console.log(projectUpdates);
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
      </Tabs>
      <CardContent sx={{ p: 0 }}>
        <TabPanel value={value} index={0}>
          <Events events={projectEvents || []} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ProjectDeliverables deliverables={projectDeliverables ?? []} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ProjectUpdates
            updates={projectUpdates?.map((update: Update) => {
              return {
                title: update.title,
                description: update.description,
                createdAt: update.createdAt,
                type: update.type,
              };
            })}
          />
        </TabPanel>
      </CardContent>
    </Box>
  );
};

export default ProjectTabsCard;
