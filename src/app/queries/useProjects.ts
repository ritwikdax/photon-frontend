import { useQuery } from "@tanstack/react-query";
import { http } from "../utils/http";
import { projectsData } from "./data";

export default function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });
}

async function fetchProjects() {
  // Replace with actual API call
  const { data } = await http.get("/api/projects");
  console.log(data);
  return data;
}
