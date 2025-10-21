import { useQueryClient, useQuery } from "@tanstack/react-query";
import { Project } from "../interfaces/data/interface";
import useGenericQueries from "../queries/useGenericQueries";
import { useEffect } from "react";


const SELECTED_PROJECT_QUERY_KEY = ["selectedProject"];

export function useProjectSelected() {
  const client = useQueryClient();
  const { data: projects, isLoading } = useGenericQueries<Project[]>("projects");
  
  // Use React Query to manage selected project state
  const { data: selectedProject } = useQuery<Project | null>({
    queryKey: SELECTED_PROJECT_QUERY_KEY,
    queryFn: () => {
      // This will never actually be called since we use setQueryData
      return null;
    },
    initialData: null,
    staleTime: Infinity, // Never refetch
  });

  // Initialize selected project only once when projects are loaded
  useEffect(() => {
    const currentSelected = client.getQueryData<Project | null>(SELECTED_PROJECT_QUERY_KEY);
    if (!isLoading && projects && projects.length > 0 && !currentSelected) {
      console.log("Initializing first project as selected:", projects[0]);
      client.setQueryData(SELECTED_PROJECT_QUERY_KEY, projects[0]);
    }
  }, [projects, isLoading, client]);

  console.log("Projects in useProjectSelected:", projects);
  console.log("Selected project:", selectedProject);
  
  function setSelectedProject(project: Project | null) {
    console.log("Setting selected project:", project);
    client.setQueryData(SELECTED_PROJECT_QUERY_KEY, project);
  }

  return {
    projects,
    isLoading,
    setSelectedProject,
    selectedProject,
  };
}
