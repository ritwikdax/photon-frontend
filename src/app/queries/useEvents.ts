import { useQuery } from "@tanstack/react-query";
import { http } from "../utils/http";

export default function useProjectEvents(projectId: string) {
  return useQuery({
    queryKey: ["events", projectId],
    queryFn: async () => {
      return await fetchProjectEvents(projectId);
    },
    enabled: !!projectId,
  });
}

async function fetchProjectEvents(id: string) {
  // Replace with actual API call
  const { data } = await http.get(`/api/events?projectId=${id}`);
  console.log(data);
  return data;
}
