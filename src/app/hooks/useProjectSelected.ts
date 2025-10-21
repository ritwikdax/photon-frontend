import { useQueryClient, useQuery } from "@tanstack/react-query";
import { Project } from "../interfaces/data/interface";
import useGenericQueries from "../queries/useGenericQueries";
import { useEffect } from "react";


const SELECTED_PROJECT_QUERY_KEY = ["selectedProject"];

export function useProjectSelected() {
  const client = useQueryClient();
  const { data: projects, isLoading } = useGenericQueries<Project[]>("projects");
  
  // Use React Query to manage selected project state with dependency on projects
  const { data: selectedProject } = useQuery<Project | null>({
    queryKey: SELECTED_PROJECT_QUERY_KEY,
    queryFn: () => {
      const currentSelected = client.getQueryData<Project | null>(SELECTED_PROJECT_QUERY_KEY);
      
      // If we have a selected project ID and projects data, find the updated project
      if (currentSelected?.id && projects && projects.length > 0) {
        const updatedProject = projects.find(p => p.id === currentSelected.id);
        return updatedProject || currentSelected;
      }
      
      return currentSelected || null;
    },
    initialData: null,
    staleTime: Infinity, // Never refetch automatically
    enabled: !!projects, // Only run when projects data is available
  });

  // Initialize selected project only once when projects are loaded
  useEffect(() => {
    const currentSelected = client.getQueryData<Project | null>(SELECTED_PROJECT_QUERY_KEY);
    if (!isLoading && projects && projects.length > 0 && !currentSelected) {
      console.log("Initializing first project as selected:", projects[0]);
      client.setQueryData(SELECTED_PROJECT_QUERY_KEY, projects[0]);
    }
  }, [projects, isLoading, client]);

  // Update selected project data when projects list changes
  useEffect(() => {
    if (!isLoading && projects && projects.length > 0 && selectedProject?.id) {
      const updatedProject = projects.find(p => p.id === selectedProject.id);
      if (updatedProject && JSON.stringify(updatedProject) !== JSON.stringify(selectedProject)) {
        console.log("Updating selected project with fresh data:", updatedProject);
        client.setQueryData(SELECTED_PROJECT_QUERY_KEY, updatedProject);
      }
    }
  }, [projects, isLoading, client, selectedProject]);

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
