import { useQuery } from "@tanstack/react-query";
import { http } from "../utils/http";

export function useTrackingUrl(projectId: string | undefined) {
  return useQuery({
    queryKey: ["trackingUrl", projectId],
    queryFn: async () => {
      return await fetchTrackingUrl(projectId!);
    },
    enabled: !!projectId,
  });
}

async function fetchTrackingUrl(projectId: string) {
  const { data } = await http.get<{ track: string, selection: string }>(
    `/api/url?projectId=${projectId}`
  );
  return data;
}
