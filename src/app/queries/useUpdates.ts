import { useQuery } from "@tanstack/react-query";
import { http } from "../utils/http";

export default function useProjectUpdates(projectId: string) {
  return useQuery({
    queryKey: ["updates", projectId],
    queryFn: async () => {
      return await fetchProjectUpdates(projectId);
    },
    enabled: !!projectId,
  });
}

async function fetchProjectUpdates(id: string) {
  // Replace with actual API call
  const { data } = await http.get(`/api/updates?projectId=${id}`);
  console.log(data);
  return data;
}
