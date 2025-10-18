import React, { createContext, useContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "./SnackbarContext";
import { DialogProvider } from "./DialogContext";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Project Context
type ProjectContextType = {
  selectedProject: any | null;
  setSelectedProject: (project: any | null) => void;
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function useProjectContext() {
  const ctx = useContext(ProjectContext);
  if (!ctx)
    throw new Error("useProjectContext must be used within ProjectProvider");
  return ctx;
}

function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  return (
    <ProjectContext.Provider value={{ selectedProject, setSelectedProject }}>
      {children}
    </ProjectContext.Provider>
  );
}

export default function AllContextProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("Rendering AllContextProviders");

  const themeOptions: ThemeOptions = {
    // palette: {
    //   mode: "dark",
    //   primary: {
    //     main: "#5893df",
    //   },
    //   secondary: {
    //     main: "#2ec5d3",
    //   },
    //   background: {
    //     default: "#03050aff",
    //     paper: "#000000ff",
    //   },
    // },
  };
  const theme = createTheme(themeOptions);
  return (
    <QueryClientProvider client={client}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <ProjectProvider>
            <DialogProvider>{children}</DialogProvider>
          </ProjectProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
