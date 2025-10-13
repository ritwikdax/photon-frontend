import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ProjectUpdates, { Update } from "./ProjectUpdates";

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
      style={{ width: "100%" }}>
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

const ProjectTabsCard: React.FC = () => {
  const [value, setValue] = useState(0);
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%", mt: 3 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="project tabs"
        variant="standard">
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
          No events yet.
        </TabPanel>
        <TabPanel value={value} index={1}>
          No deliverables yet.
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ProjectUpdates
            updates={
              [
                {
                  title: "Photographer & Videographer Assigned",
                  description: "Initial project skeleton and repo created.",
                  createdAt: new Date(
                    Date.now() - 1000 * 60 * 60 * 24 * 3
                  ).toISOString(),
                  type: "info",
                },
                {
                  title: "Assignment Completed by Team Lead",
                  description: "Successfully completed the shoot at the venue.",
                  createdAt: new Date(
                    Date.now() - 1000 * 60 * 60 * 24 * 1
                  ).toISOString(),
                  type: "error",
                },
                {
                  title: "Photo Transferred",
                  description: "Deployment paused until hotfix is approved.",
                  createdAt: new Date(
                    Date.now() - 1000 * 60 * 60 * 2
                  ).toISOString(),
                  type: "blocked",
                },
              ] as Update[]
            }
          />
        </TabPanel>
      </CardContent>
    </Box>
  );
};

export default ProjectTabsCard;
