"use client";
import Deliverables from "../components/Deliverables";
import { Deliverable } from "../interfaces/data/interface";
import useGenericQueries from "../queries/useGenericQueries";

export default function DeliverablesPage() {
  const { data } = useGenericQueries<Deliverable[]>("deliverables");
  console.log(data);
  return (
    <div>
      <Deliverables deliverables={data ?? []} />
    </div>
  );
}
