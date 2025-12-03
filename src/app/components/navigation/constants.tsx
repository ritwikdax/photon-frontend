import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventIcon from "@mui/icons-material/Event";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PeopleIcon from "@mui/icons-material/People";
import BusinessIcon from "@mui/icons-material/Business";
import UpdateIcon from "@mui/icons-material/Update";
import TaskIcon from "@mui/icons-material/Task";
import FolderIcon from "@mui/icons-material/Folder";
import DescriptionIcon from "@mui/icons-material/Description";
import GroupsIcon from "@mui/icons-material/Groups";
import GavelIcon from "@mui/icons-material/Gavel";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";

export const DRAWER_WIDTH = 240;

export interface MenuItem {
  text: string;
  path: string;
  icon: React.ReactElement;
}

export interface MenuGroup {
  heading?: string;
  items: MenuItem[];
}

export const NAVIGATION_MENU_GROUPS: MenuGroup[] = [
  {
    heading: "Main",
    items: [
      { text: "Dashboard", path: "/", icon: <DashboardIcon /> },
      { text: "Team Assignment", path: "/assignment", icon: <GroupsIcon /> },
      { text: "Events Calendar", path: "/events", icon: <EventIcon /> },
      { text: "Deliverables", path: "/deliverables", icon: <AssignmentIcon /> },
      { text: "Employees", path: "/employees", icon: <PeopleIcon /> },
      { text: "Clients", path: "/clients", icon: <BusinessIcon /> },
    ],
  },
  {
    heading: "Templates",
    items: [
      { text: "Contract", path: "/templates/contracts", icon: <GavelIcon /> },
      { text: "Quotation", path: "/templates/quotes", icon: <RequestQuoteIcon /> },
    ],
  },
];

// Legacy: Flat array for backwards compatibility
export const NAVIGATION_MENU_ITEMS: MenuItem[] = NAVIGATION_MENU_GROUPS.flatMap(
  (group) => group.items
);

export interface AddMenuItem {
  text: string;
  path?: string;
  icon: React.ReactElement;
  onClick?: () => void;
}

export const ROOT_LEVEL_ADD_ITEMS: AddMenuItem[] = [
  {
    text: "Project",
    path: "/project/add",
    icon: <FolderIcon fontSize="small" />,
  },
  {
    text: "Deliverable",
    path: "/deliverables/add",
    icon: <AssignmentIcon fontSize="small" />,
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

export const PROJECT_LEVEL_ADD_ITEMS: AddMenuItem[] = [
  {
    text: "Project Event",
    path: "/events/add",
    icon: <EventIcon fontSize="small" />,
  },
  {
    text: "Project Deliverable",
    path: "/deliverables/project/add",
    icon: <TaskIcon fontSize="small" />,
  },
  {
    text: "Project Update",
    path: "/updates/add",
    icon: <UpdateIcon fontSize="small" />,
  },
];

// Legacy: Combined array for backwards compatibility
export const ADD_MENU_ITEMS: AddMenuItem[] = [
  ...ROOT_LEVEL_ADD_ITEMS,
  ...PROJECT_LEVEL_ADD_ITEMS,
];
