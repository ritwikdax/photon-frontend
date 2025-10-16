import React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import { NAVIGATION_MENU_ITEMS } from "./constants";

export default function NavigationMenu() {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <List>
      {NAVIGATION_MENU_ITEMS.map((item) => {
        const isActive = pathname === item.path;
        return (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={isActive}
              onClick={() => handleNavigation(item.path)}
              sx={{
                textDecoration: "none",
                width: "100%",
                "&.Mui-selected": {
                  backgroundColor: "action.selected",
                  "&:hover": {
                    backgroundColor: "action.selected",
                  },
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
