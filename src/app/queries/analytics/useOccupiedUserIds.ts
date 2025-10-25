import { http } from "@/app/utils/http";
import { useQuery } from "@tanstack/react-query";

export default function useOccupiedUserIds(
  givenStartDateTime: string,
  givenEndDateTime: string
) {
  return useQuery({
    queryKey: ["occupiedUserIds", givenStartDateTime, givenEndDateTime],
    queryFn: async () => {
      const { data } = await http.post<{ occupiedEmployeeIds: string[] }>(
        "/analytics/getOccupiedIds",
        {
          startDateTime: new Date(givenStartDateTime).toISOString(),
          endDateTime: new Date(givenEndDateTime).toISOString(),
        }
      );
      return data;
    },
    enabled: !!givenStartDateTime && !!givenEndDateTime,
  });
}
