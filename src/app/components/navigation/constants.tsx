import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventIcon from "@mui/icons-material/Event";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PeopleIcon from "@mui/icons-material/People";
import BusinessIcon from "@mui/icons-material/Business";
import UpdateIcon from "@mui/icons-material/Update";
import TaskIcon from "@mui/icons-material/Task";

export const DRAWER_WIDTH = 240;

export interface MenuItem {
  text: string;
  path: string;
  icon: React.ReactElement;
}

export const NAVIGATION_MENU_ITEMS: MenuItem[] = [
  { text: "Project", path: "/project", icon: <DashboardIcon /> },
  { text: "Events", path: "/events", icon: <EventIcon /> },
  { text: "Deliverables", path: "/deliverables", icon: <AssignmentIcon /> },
  { text: "Employees", path: "/employees", icon: <PeopleIcon /> },
  { text: "Clients", path: "/clients", icon: <BusinessIcon /> },
];

export interface AddMenuItem {
  text: string;
  path?: string;
  icon: React.ReactElement;
  onClick?: () => void;
}

export const ADD_MENU_ITEMS: AddMenuItem[] = [
  {
    text: "Project",
    path: "/project/add",
    icon: <DashboardIcon fontSize="small" />,
  },
  {
    text: "Event (Project Level)",
    path: "/events/add",
    icon: <EventIcon fontSize="small" />,
  },
  {
    text: "Deliverable",
    path: "/deliverables/add",
    icon: <AssignmentIcon fontSize="small" />,
  },
  {
    text: "Deliverable (Project Level)",
    path: "/deliverables/project/add",
    icon: <TaskIcon fontSize="small" />,
  },
  {
    text: "Update (Project Level)",
    path: "/updates/add",
    icon: <UpdateIcon fontSize="small" />,
  },
  {
    text: "Employee",
    path: "/employees/add",
    icon: <PeopleIcon fontSize="small" />,
  },
  {
    text: "Client",
    path: "/clients/add",
    icon: <BusinessIcon fontSize="small" />,
  },
];
