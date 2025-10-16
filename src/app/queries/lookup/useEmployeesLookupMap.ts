import { useQuery } from "@tanstack/react-query";
import { Deliverable, Employee } from "../../interfaces/data/interface";
import useGenericQueries from "../useGenericQueries";

export function useEmployeesLookupMap() {
  const { data } = useGenericQueries<Employee[]>("employees");
  return useQuery({
    queryKey: ["deliverableLookup"],
    queryFn: () => {
      return new Map(data?.map((employee) => [employee.id, employee]));
    },
    enabled: data !== undefined,
  });
}
