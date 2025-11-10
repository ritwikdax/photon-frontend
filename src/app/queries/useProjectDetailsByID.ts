import { useQuery } from "@tanstack/react-query";
import { http } from "../utils/http";
import { Project } from "../interfaces/data/interface";

export default function useProjectDetailsById(projectId: string) {
  return useQuery({
    queryKey: ["projectDetails", projectId],
    queryFn: async () => {
      return await fetchProjectDetails(projectId);
    },
    enabled: !!projectId,
  });
}

async function fetchProjectDetails(id: string) {
  // Replace with actual API call
  const { data } = await http.get<Project[]>(`/api/projects?id=${id}`);
  const projectDetails = data && data.length > 0 ? data[0] : null;
  return projectDetails;
}
