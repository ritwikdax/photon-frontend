import { useQuery } from "@tanstack/react-query";
import { http } from "../utils/http";
import { Employee } from "../interfaces/data/interface";

export default function useEmployees() {
  return useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  });
}

async function fetchEmployees(): Promise<Employee[]> {
  const { data } = await http.get("/api/employees");
  return data;
}
