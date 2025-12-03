import React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  ListSubheader,
} from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import { NAVIGATION_MENU_GROUPS } from "./constants";

export default function NavigationMenu() {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <>
      {NAVIGATION_MENU_GROUPS.map((group, groupIndex) => (
        <List
          key={groupIndex}
          subheader={
            group.heading ? (
              <ListSubheader
                component="div"
                sx={{
                  bgcolor: "transparent",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  color: "text.secondary",
                  lineHeight: "32px",
                }}
              >
                {group.heading}
              </ListSubheader>
            ) : undefined
          }
          sx={{ pt: groupIndex === 0 ? 0 : 1 }}
        >
          {group.items.map((item) => {
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
      ))}
    </>
  );
}
