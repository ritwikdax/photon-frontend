import useProjects from "@/app/queries/useProjects";
import { Autocomplete, TextField, Box } from "@mui/material";
import { useProjectContext } from "@/app/context/all";

import { useEffect, useRef, useState } from "react";
import PhotoCameraFrontIcon from '@mui/icons-material/PhotoCameraFront';

export default function AutoCompleteDropdown() {
  const { data: projects, isLoading } = useProjects();
  const { selectedProject, setSelectedProject } = useProjectContext();
  const projectList = projects || [];
  const autocompleteRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && projectList.length > 0 && !selectedProject) {
      setSelectedProject(projectList[0]);
    }
  }, [isLoading, projectList, selectedProject, setSelectedProject]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "/" && autocompleteRef.current) {
        event.preventDefault();
        autocompleteRef.current.focus();
        setOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        width: "100%",
      }}>
        <PhotoCameraFrontIcon sx={{marginRight: '20px'}}/>
      {!isLoading && (
        <Autocomplete
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          value={selectedProject}
          onChange={(_e, value) => {
            setSelectedProject(value);
          }}
          getOptionLabel={(option) => option?.name || ""}
          isOptionEqualToValue={(option, value) => option?.id === value?.id}
          defaultValue={projectList[0] || null}
          size="small"
          sx={{
            width: 500,
            color: "white",
            "& .MuiInputBase-input": {
              color: "white",
            },
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "& .MuiSvgIcon-root": {
              color: "white",
            },
          }}
          options={projectList}
          renderInput={(params) => (
            <TextField
              {...params}
              inputRef={autocompleteRef}
              InputLabelProps={{ style: { color: "white" } }}
              sx={{
                "& .MuiInputBase-input": {
                  color: "white",
                },
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                "& .MuiSvgIcon-root": {
                  color: "white",
                },
                label: { color: "white" },
              }}
            />
          )}
        />
      )}
    </Box>
  );
}
