import React, { createContext, useContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

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
  return (
    <QueryClientProvider client={client}>
      <ProjectProvider>{children}</ProjectProvider>
    </QueryClientProvider>
  );
}
