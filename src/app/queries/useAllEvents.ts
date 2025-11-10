import { useQuery } from "@tanstack/react-query";
import { http } from "../utils/http";

export default function useAllEvents() {
  return useQuery({
    queryKey: ["all_events"],
    queryFn: fetchEvents,
  });
}

async function fetchEvents() {
  const { data } = await http.get("/api/events");
  return data;
}
