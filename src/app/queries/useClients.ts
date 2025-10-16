import { useQuery } from "@tanstack/react-query";
import { http } from "../utils/http";
import { Client } from "../interfaces/data/interface";

export default function useClients() {
  return useQuery({
    queryKey: ["clients"],
    queryFn: fetchClients,
  });
}

async function fetchClients(): Promise<Client[]> {
  const { data } = await http.get("/api/clients");
  return data;
}
