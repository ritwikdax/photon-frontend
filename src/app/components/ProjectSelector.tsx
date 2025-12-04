"use client";
import { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Popover,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import { ArrowDropDown, Search } from "@mui/icons-material";
import { useProjectSelected } from "../hooks/useProjectSelected";
import { Project } from "../interfaces/data/interface";

export default function ProjectSelector() {
  const { selectedProject, projects, setSelectedProject } =
    useProjectSelected();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setSearchQuery("");
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
    setSearchQuery("");
  };

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    handleClosePopover();
  };

  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    if (!searchQuery.trim()) return projects;

    const query = searchQuery.toLowerCase();
    return projects.filter(
      (project) =>
        project.name.toLowerCase().includes(query) ||
        project.status.toLowerCase().includes(query)
    );
  }, [projects, searchQuery]);

  const open = Boolean(anchorEl);

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>
          {selectedProject?.name || "No Project Selected"}
        </Typography>
        <IconButton onClick={handleOpenPopover} size="small" sx={{ ml: 1 }}>
          <ArrowDropDown fontSize="large" />
        </IconButton>
      </Box>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}>
        <Box sx={{ width: 350 }}>
          <Box sx={{ p: 2, pb: 1 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              autoFocus
            />
          </Box>
          <List sx={{ maxHeight: 400, overflow: "auto" }}>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <ListItem key={project.id} disablePadding>
                  <ListItemButton
                    onClick={() => handleProjectSelect(project)}
                    selected={selectedProject?.id === project.id}>
                    <ListItemText
                      primary={project.name}
                      secondary={project.status
                        .replace(/_/g, " ")
                        .toUpperCase()}
                    />
                  </ListItemButton>
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText primary="No projects found" />
              </ListItem>
            )}
          </List>
        </Box>
      </Popover>
    </>
  );
}
